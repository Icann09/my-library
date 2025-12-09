export const bookReceiptGenerated = (studentName: string, borrowDate: string, dueDate: string, bookTitle: string) => `
<div style="padding: 40px; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: auto; background-color: #151821; border-radius: 12px; padding: 40px; color: #E5E7EB;">
    <!-- Logo -->
    <div style="font-size: 28px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 32px;">📚</span>
      <span>My Library</span>
    </div>

    <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

    <!-- Title -->
    <h1 style="font-size: 28px; color: white; margin: 0 0 16px;">
      Your Receipt for ${bookTitle} is Ready!
    </h1>

    <!-- Greeting -->
    <p style="font-size: 16px; margin-bottom: 16px;">
      Hi ${studentName},
    </p>

    <!-- Body -->
    <div style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      <p>Your receipt for borrowing ${bookTitle} has been generated. Here are the details:</p>
      <ul>
        <li>Borrowed on: ${borrowDate}</li>
        <li>Due Date: ${dueDate}</li>
      </ul>
    </div>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      You can download the receipt here:
    </p>

    <!-- Call-to-action Button -->
    <a href="https://my-library-dun.vercel.app/receipt" 
       style="display: inline-block; padding: 12px 24px; background-color: #F3D6A2; 
              color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Download Receipt
    </a>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 16px;">
      Keep the pages turning,<br />
      The My Library Team
    </p>
  </div>
</div>
`;