import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

const OnBoardingEmailTemplate = (studentName: string) => `
<div style="background-color: #0f1117; padding: 40px; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: auto; background-color: #151821; border-radius: 12px; padding: 40px; color: #E5E7EB;">
    
    <!-- Logo -->
    <div style="font-size: 28px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 32px;">📚</span>
      <span>BookWise</span>
    </div>

    <hr style="border: 0; height: 1px; background: #2D3140; margin: 24px 0;" />

    <!-- Title -->
    <h1 style="font-size: 28px; color: white; margin: 0 0 16px;">
      Welcome to BookWise, Your Reading Companion!
    </h1>

    <!-- Greeting -->
    <p style="font-size: 16px; margin-bottom: 16px;">
      Hi ${studentName},
    </p>

    <!-- Body -->
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Welcome to BookWise! We're excited to have you join our community of book enthusiasts. 
      Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.
    </p>

    <!-- Call-to-action Button -->
    <a href="https://yourapp.com/login" 
       style="display: inline-block; padding: 12px 24px; background-color: #F3D6A2; 
              color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Login to BookWise
    </a>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 16px;">
      Happy reading,<br />
      The BookWise Team
    </p>
  </div>
</div>
`;


export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,

}: {
  email: string;
  subject: string;

}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "My Library <teknik09@ican09.com>",
      to: [email],
      subject,
      html: '<p style="font-size: 16px; margin-bottom: 16px; background-color: #0f1117; "> This is boarding workflow </p>',
    },
  });
};

// export const sendEmail = async ({
//   email,
//   subject,
//   studentName,
// }: {
//   email: string;
//   subject: string;
//   studentName: string;
// }) => {
//   const html = OnBoardingEmailTemplate(studentName);

//   await qstashClient.publishJSON({
//     api: {
//       name: "email",
//       provider: resend({ token: config.env.resendToken }),
//     },
//     body: {
//       from: "My Library <teknik09@ican09.com>",
//       to: [email],
//       subject,
//       html: "Selamat datang di welcome"
//     },
//   });
// };


