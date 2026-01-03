import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maestro",
  description: "Master any skill with 1-on-1 mentorship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* ADD THIS PROP: suppressHydrationWarning */}
        <body className={inter.className} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}