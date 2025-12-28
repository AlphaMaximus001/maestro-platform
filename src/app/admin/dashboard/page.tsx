'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check if user has the admin "badge"
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!isAdmin) {
      router.push('/admin/login'); // Kick them out
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null; // Don't show anything while checking

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1D1D1F] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10 tracking-tight">Maestro<span className="text-blue-500">.</span></h2>
        <nav className="space-y-4 text-gray-400">
          <div className="bg-gray-800 text-white p-3 rounded-xl cursor-pointer">Overview</div>
          <div className="hover:text-white p-3 cursor-pointer">Teachers</div>
          <div className="hover:text-white p-3 cursor-pointer">Students</div>
          <div className="hover:text-white p-3 cursor-pointer">Financials</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('isAdmin');
              router.push('/');
            }}
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Log Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">Total Revenue</p>
            <p className="text-3xl font-bold text-[#1D1D1F] mt-2">₹12,450</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">Active Teachers</p>
            <p className="text-3xl font-bold text-[#1D1D1F] mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">Pending Approvals</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">2</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
           <div className="text-center py-10 text-gray-400">
             No recent bookings found.
           </div>
        </div>
      </main>
    </div>
  );
}