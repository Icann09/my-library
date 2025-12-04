export const bookBorrowReceipt = (
  receiptId: string,
  issuedDate: string,
  bookTitle: string,
  bookAuthor: string,
  bookGenre: string,
  borrowDate: string,
  dueDate: string,
  duration: string
) => `
  <div style="padding: 40px; font-family: Arial, sans-serif; background-color: #0F1117;">
    <div style="
      max-width: 640px;
      margin: auto;
      background-color: #151821;
      border-radius: 14px;
      padding: 40px;
      color: #E5E7EB;
      border: 1px solid #1F2430;
    ">
      
      <!-- Logo -->
      <div style="font-size: 30px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 36px;">📖</span>
        <span>BookWise</span>
      </div>

      <h2 style="margin-top: 28px; font-size: 26px; color: #FFFFFF;">Borrow Receipt</h2>

      <!-- Receipt Meta -->
      <p style="margin: 6px 0; font-size: 16px;">
        <strong>Receipt ID:</strong> <span style="color: #D4B17A;">#${receiptId}</span>
      </p>
      <p style="margin: 6px 0 20px; font-size: 16px;">
        <strong>Date Issued:</strong> <span style="color: #D4B17A;">${issuedDate}</span>
      </p>

      <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

      <!-- Book Details -->
      <h3 style="font-size: 20px; margin-bottom: 16px; color: white;">Book Details:</h3>

      <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
        <li><strong>Title:</strong> ${bookTitle}</li>
        <li><strong>Author:</strong> ${bookAuthor}</li>
        <li><strong>Genre:</strong> ${bookGenre}</li>
        <li><strong>Borrowed On:</strong> ${borrowDate}</li>
        <li><strong>Due Date:</strong> ${dueDate}</li>
        <li><strong>Duration:</strong> ${duration}</li>
      </ul>

      <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

      <!-- Terms -->
      <h3 style="font-size: 20px; margin-bottom: 8px; color: white;">Terms</h3>

      <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
        <li>Please return the book by the due date.</li>
        <li>Lost or damaged books may incur replacement costs.</li>
      </ul>

      <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

      <!-- Footer -->
      <p style="margin-top: 20px; font-size: 16px;">
        Thank you for using <strong>BookWise</strong>!<br />
        Website: <a style="color: #D4B17A; text-decoration: none;" href="https://bookwise.example.com">bookwise.example.com</a><br />
        Email: <a style="color: #D4B17A; text-decoration: none;" href="mailto:support@bookwise.example.com">support@bookwise.example.com</a>
      </p>

    </div>
  </div>
`;
