"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { compare } from "bcryptjs"

export const signInWithCredentials = async (
  params: { email: string; password: string }
) => {
  const { email, password } = params

  // 🔒 Rate limit
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)
  if (!success) return redirect("/too-fast")

  // 🟢 Step 1: Check user
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (user.length === 0) {
    return { success: false, error: "Email does not exist" }
  }

  // 🟢 Step 2: Check password
  const isPasswordValid = await compare(password, user[0].password)
  if (!isPasswordValid) {
    return { success: false, error: "Wrong password" }
  }

  // 🟢 Step 3: Call NextAuth signIn()
  try {
    const result = await signIn("credentials", {
      id: user[0].id.toString(),
      email: user[0].email,
      name: user[0].fullName,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: "Signin failed" }
    }

    return { success: true }
  } catch (err) {
    console.error("Signin error:", err)
    return { success: false, error: "Signin error" }
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};