import { serve } from "@upstash/workflow/nextjs"
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";
import { db } from "@/database/drizzle";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
}

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async(email: string) : Promise<UserState> => {
  const user = await db 
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  
  if (user.length === 0) return "non-active";

  const lastAcyivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date(); 
  const timeDifference = now.getTime() - lastAcyivityDate.getTime();

  if( 
    timeDifference > THREE_DAY_IN_MS && 
    timeDifference < ONE_MONTH_IN_MS 
  ) {
    return "non-active";
  }
  return "active"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  //welcome email
  await context.run("new-signup", async () => {
    await sendEmail({ email, subject: "Welcome to My Library", message: `Welcome {fullName}`})
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)
  let retries = 0;
  const MAX_RETRIES = 12;

  while (retries < MAX_RETRIES) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({ email, subject: "We miss you!", message: `Hey ${fullName}, we miss you!` });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({ email, subject: "Welcome back!", message: `Welcome back ${fullName}!` });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})

