import { prisma } from '@/lib/prisma'; 
import Navbar from '@/components/Navbar'; // <--- Added Navigation
import Link from 'next/link';

// Force the page to refresh every time (Disable Caching)
export const dynamic = 'force-dynamic';

export default async function TeacherDashboard() {
  
  // 1. Find the MOST RECENT Sarah Jenkins
  const teacher = await prisma.teacher.findFirst({
    where: { name: 'Sarah Jenkins' }, // Hardcoded for demo; in real app use session ID
    orderBy: { id: 'desc' }, 
    include: {
        bookings: true 
    }
  });

  if (!teacher) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Account Not Found</h2>
        <p className="text-gray-500 mb-4">Please run the seed script to generate data.</p>
        <Link href="/">
           <button className="text-blue-600 hover:underline">Go Home</button>
        </Link>
      </div>
    </div>
  );

  // 2. Get her bookings specifically (Including the Student info)
  const bookings = await prisma.booking.findMany({
    where: { teacherId: teacher.id },
    include: { 
      student: true 
    },
    orderBy: { date: 'desc' }
  });

  // 3. Calculate Earnings
  const totalEarnings = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* 1. Universal Navbar (Fixes "No way back") */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Instructor Portal</p>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">
                    Hello, {teacher.name.split(' ')[0]} 👋
                </h1>
                <p className="text-gray-500 mt-2">Here is what is happening with your classes today.</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Edit Profile
                </button>
                <button className="bg-[#1D1D1F] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-lg shadow-black/20">
                    + Create Slot
                </button>
            </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Earnings */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl">💰</span>
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Total Revenue</p>
                <p className="text-3xl font-bold text-[#1D1D1F] mt-2">₹{totalEarnings.toLocaleString()}</p>
                <div className="mt-4 text-xs font-medium text-green-600 bg-green-50 inline-block px-2 py-1 rounded-lg">
                    +12% from last month
                </div>
            </div>

            {/* Card 2: Bookings Count */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl">📅</span>
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Total Sessions</p>
                <p className="text-3xl font-bold text-[#1D1D1F] mt-2">{bookings.length}</p>
                <div className="mt-4 text-xs font-medium text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded-lg">
                    3 pending requests
                </div>
            </div>

            {/* Card 3: Rating (Static for now) */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl">⭐</span>
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Student Rating</p>
                <p className="text-3xl font-bold text-[#1D1D1F] mt-2">{teacher.rating}</p>
                <div className="mt-4 text-xs font-medium text-orange-600 bg-orange-50 inline-block px-2 py-1 rounded-lg">
                    Top 5% Instructor
                </div>
            </div>
        </div>

        {/* BOOKINGS SECTION */}
        <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center gap-2">
            Upcoming Classes 
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{bookings.length}</span>
        </h2>
        
        {bookings.length === 0 ? (
            <div className="p-12 bg-white text-center rounded-3xl border border-dashed border-gray-300">
                <div className="text-4xl mb-4">😴</div>
                <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
                <p className="text-gray-500">Your schedule is clear for now.</p>
            </div>
        ) : (
            <div className="grid gap-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Left: Student Info */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="h-14 w-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                        {booking.student.name?.[0] || '?'}
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1D1D1F] text-lg">{booking.student.name || 'Unknown Student'}</h3>
                        <p className="text-sm text-gray-500">{booking.student.email}</p>
                    </div>
                </div>

                {/* Middle: Details */}
                <div className="flex flex-wrap gap-8 w-full md:w-auto text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>🗓️</span>
                        <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>📍</span>
                        <span className="font-medium">{booking.address || 'Online Session'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>⏱️</span>
                        <span className="font-medium">{booking.durationHrs} Hours</span>
                    </div>
                </div>

                {/* Right: Price & Status */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <div className="text-right">
                        <p className="font-bold text-[#1D1D1F]">₹{booking.totalPrice}</p>
                        <p className="text-xs text-green-600 font-bold uppercase tracking-wide">Paid</p>
                    </div>
                    <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
                        Details
                    </button>
                </div>

                </div>
            ))}
            </div>
        )}
      </div>
    </main>
  );
}