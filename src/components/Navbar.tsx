"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Read the role from the user's metadata (Client Side)
  const role = user?.publicMetadata?.role as string | undefined;

  // Determine the correct dashboard link based on role
  let dashboardLink = "/dashboard"; // Default (Student)
  let dashboardLabel = "Dashboard";

  if (role === 'admin') {
    dashboardLink = "/admin";
    dashboardLabel = "Admin Panel";
  } else if (role === 'teacher') {
    dashboardLink = "/teacher/dashboard";
    dashboardLabel = "Teacher Console";
  }

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1D1D1F]">
          Maestro<span className="text-blue-600">.</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Explore
          </Link>
          
          {/* DYNAMIC DASHBOARD LINK (Only shows if logged in) */}
          {isSignedIn && (
            <Link href={dashboardLink} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              {dashboardLabel}
            </Link>
          )}
          
          {isSignedIn ? (
            <div className="pl-4 border-l border-gray-200">
               <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <button className="text-sm font-medium text-gray-600 hover:text-black">Log in</button>
              </Link>
              <Link href="/sign-up">
                <button className="text-sm font-medium px-4 py-2 bg-[#1D1D1F] text-white rounded-full hover:bg-gray-800 transition-colors">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link href="/explore" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50">
                Explore Mentors
            </Link>
            
            {isSignedIn && (
                <Link href={dashboardLink} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-blue-600 py-2 border-b border-gray-50">
                    {dashboardLabel}
                </Link>
            )}
            
            {isSignedIn ? (
                <div className="flex items-center gap-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-gray-500 text-sm font-medium">Manage Account</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3 mt-2">
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-700">Log in</button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-3 rounded-xl bg-[#1D1D1F] text-white font-bold">Sign up</button>
                    </Link>
                </div>
            )}
        </div>
      )}
    </nav>
  );
}