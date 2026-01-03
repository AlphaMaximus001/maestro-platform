"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, LayoutDashboard, Compass } from "lucide-react";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Helper to check active state
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1D1D1F] flex items-center gap-1">
          Maestro<span className="text-blue-600">.</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/explore" 
            className={`text-sm font-medium transition-colors ${
              isActive('/explore') ? "text-blue-600" : "text-gray-600 hover:text-black"
            }`}
          >
            Explore
          </Link>
          
          {/* DYNAMIC DASHBOARD LINK (Only shows if logged in) */}
          {isLoaded && isSignedIn && (
            <Link 
              href={dashboardLink} 
              className={`text-sm font-medium transition-colors ${
                isActive(dashboardLink) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {dashboardLabel}
            </Link>
          )}
          
          {/* AUTH SECTION */}
          {!isLoaded ? (
            // Loading Skeleton (prevents flicker)
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          ) : isSignedIn ? (
            <div className="pl-4 border-l border-gray-200 flex items-center">
               <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* LOGIN BUTTON -> Points to /sign-in */}
              <Link href="/sign-in">
                <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Log in</button>
              </Link>
              
              {/* SIGN UP BUTTON -> Points to /sign-up */}
              <Link href="/sign-up">
                <button className="text-sm font-medium px-4 py-2 bg-[#1D1D1F] text-white rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
            <Link 
              href="/explore" 
              onClick={() => setIsMenuOpen(false)} 
              className="flex items-center gap-3 text-lg font-medium text-gray-800 py-3 border-b border-gray-50 active:bg-gray-50"
            >
                <Compass size={20} className="text-gray-500" />
                Explore Mentors
            </Link>
            
            {isLoaded && isSignedIn && (
                <Link 
                  href={dashboardLink} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center gap-3 text-lg font-medium text-blue-600 py-3 border-b border-gray-50 active:bg-blue-50"
                >
                    <LayoutDashboard size={20} />
                    {dashboardLabel}
                </Link>
            )}
            
            {isLoaded && isSignedIn ? (
                <div className="flex items-center gap-4 py-3">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-gray-600 text-sm font-medium">Manage Account</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3 mt-2">
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">Log in</button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-3 rounded-xl bg-[#1D1D1F] text-white font-bold hover:bg-gray-800 transition-colors shadow-lg">Sign up</button>
                    </Link>
                </div>
            )}
        </div>
      )}
    </nav>
  );
}