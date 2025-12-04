export const checkInReminderCongrats = (studentName: string) => `
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
      Congratulations on Reaching a New Milestone!
    </h1>

    <!-- Greeting -->
    <p style="font-size: 16px; margin-bottom: 16px;">
      Hi ${studentName},
    </p>

    <!-- Body -->
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Great news! You've reached a new milestone in your reading journey with BookWise. 🎉 Whether it's finishing a challenging book, staying consistent with your reading goals, or exploring new genres, your dedication inspires us.
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Keep the momentum going—there are more exciting books and features waiting for you!
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Log in now to discover your next adventure:
    </p>

    <!-- Call-to-action Button -->
    <a href="https://my-library-dun.vercel.app/search" 
       style="display: inline-block; padding: 12px 24px; background-color: #F3D6A2; 
              color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Discover New Reads
    </a>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 16px;">
      Keep the pages turning,<br />
      The BookWise Team
    </p>
  </div>
</div>
`;