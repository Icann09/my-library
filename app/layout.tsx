import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local"
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";



const ibmPlexSans = localFont ({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal"},
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal"},
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal"},
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal"},
  ],
})

const bebasNeue = localFont ({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal"},
  ], 
  variable: "--bebas-neue",
})


export const metadata: Metadata = {
  metadataBase: new URL("https://my-library-dun.vercel.app"),
  title: {
    default: "My Library",
    template: "%s | My Library",
  },
  description:
    "My Library is a digital library platform that helps users browse, borrow, and manage books seamlessly with a modern, fast, and user-friendly experience.",
  keywords: [
              "digital library",
              "book management app",
              "online library system",
              "Next.js library app",
            ],
  authors: [{ name: "Muhammad Kaisan Farasdag" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "My Library | Your Library Companion",
    description:
      "My Library is a digital library platform that helps users browse, borrow, and manage books seamlessly with a modern, fast, and user-friendly experience.",
    url: "https://my-library-dun.vercel.app",
    siteName: "My Library",
    images: [
      {
        url: "https://my-library-dun.vercel.app/web-page.png",
        width: 1200,
        height: 630,
        alt: "My Library Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Library | Your Library Companion",
    description: "My Library is a digital library platform that helps users browse, borrow, and manage books seamlessly with a modern, fast, and user-friendly experience.",
    images: ["https://my-library-dun.vercel.app/web-page.png"],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased `}
        >
          {children}
          <Toaster />  
      </body>
      </SessionProvider>
    </html>
  );
}
