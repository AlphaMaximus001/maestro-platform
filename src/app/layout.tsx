import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar"; // Keep Navbar if you want it global (or remove if handled per page)
import Footer from "@/components/Footer"; // <--- IMPORT FOOTER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Maestro Platform",
  description: "Learn and Teach Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {/* Navbar is usually inside specific pages if you want different navs, 
            but for simple apps, keeping it here is fine. */}
        
        {children}

        <Footer /> {/* <--- ADD FOOTER HERE AT THE BOTTOM */}
      </body>
    </html>
  );
}