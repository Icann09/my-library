export const bookReturnConfirmation = (studentName: string, bookTitle: string) => `
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
      Thank You for Returning ${bookTitle}!
    </h1>

    <!-- Greeting -->
    <p style="font-size: 16px; margin-bottom: 16px;">
      Hi ${studentName},
    </p>

    <!-- Body -->
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      We've successfully received your return of ${bookTitle}. Thank you for returning it on time.
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Looking for your next read? Browse our collection and borrow your next favorite book!
    </p>

    <!-- Call-to-action Button -->
    <a href="https://my-library-dun.vercel.app/search" 
       style="display: inline-block; padding: 12px 24px; background-color: #F3D6A2; 
              color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Explore New Books
    </a>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 16px;">
      Happy exploring,<br />
      The BookWise Team
    </p>
  </div>
</div>
`;
