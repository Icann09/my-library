export const bookDueReminder = ({
  studentName,
  bookTitle,
  dueDate,
}: {
  studentName: string;
  bookTitle: string;
  dueDate: string;
}) =>`
<div style="padding: 40px; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: auto; background-color: #151821; border-radius: 12px; padding: 40px; color: #E5E7EB;">
    <!-- Logo -->
    <div style="font-size: 28px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 32px;">📚</span>
      <span>BookWise</span>
    </div>

    <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

    <!-- Title -->
    <h1 style="font-size: 28px; color: white; margin: 0 0 16px;">
      Reminder: ${bookTitle} is Due Soon!
    </h1>

    <!-- Greeting -->
    <p style="font-size: 16px; margin-bottom: 16px;">
      Hi ${studentName},
    </p>

    <!-- Body -->
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Just a reminder that ${bookTitle} is due for return on ${dueDate}. Kindly return it on time to avoid late fees.
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      If you're still reading, you can renew the book in your account.
    </p>

    <!-- Call-to-action Button -->
    <a href="https://my-library-dun.vercel.app/my-profile" 
       style="display: inline-block; padding: 12px 24px; background-color: #F3D6A2; 
              color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Renew Book Now
    </a>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 16px;">
      Keep reading,<br />
      The BookWise Team
    </p>
  </div>
</div>
`;
