import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";
import { bookDueReminder } from "@/lib/emails/book-due-reminder";

type InitialData = {
  email: string;
  fullName: string;
  bookTitle: string;
  dueDate: string; // ISO
};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName, bookTitle, dueDate } = context.requestPayload;

  const due = new Date(dueDate);
  const now = new Date();

  // Fire at (dueDate - 1 day)
  const delay = Math.max(due.getTime() - now.getTime() - ONE_DAY_IN_MS, 0);

  await context.sleep("wait-until-1-day-before", delay / 1000);

  await context.run("send-due-reminder", async () => {
    await sendEmail({
      email,
      subject: "Reminder: Your book is due soon",
      message: bookDueReminder({
        studentName: fullName,
        bookTitle,
        dueDate,
      }),
    });
  });

  return { success: true };
});
