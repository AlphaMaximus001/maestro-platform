import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const bookings = await prisma.booking.findMany({
    where: { studentId: "user_pravek_123" },
    include: { teacher: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-[#1D1D1F]">
              My Bookings
            </h1>
            <p className="text-gray-500 mt-2">Manage your upcoming sessions.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
             👤 Logged in as: Pravek
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg mb-4">You haven't booked any lessons yet.</p>
            <Link href="/">
              <button className="bg-[#0071E3] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0077ED] transition-all">
                Find a Mentor
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="group bg-white p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-500 border border-transparent hover:border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Left: Teacher Info */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-400 group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-500">
                    {booking.teacher.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F]">{booking.teacher.name}</h3>
                    <p className="text-gray-500 font-medium">{booking.teacher.subject}</p>
                  </div>
                </div>

                {/* Right: Booking Details */}
                <div className="flex flex-col md:items-end gap-1 w-full md:w-auto text-left md:text-right">
                  <div className="text-[#1D1D1F] font-medium text-lg">
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'short', month: 'short', day: 'numeric' 
                    })}
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-1 md:justify-end">
                    📍 {booking.address}
                  </div>
                  
                  <div className="mt-3 flex items-center gap-3 md:justify-end">
                    <span className="text-sm font-bold text-gray-400">₹{booking.totalPrice}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border
                      ${booking.status === 'CONFIRMED' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-yellow-50 text-yellow-600 border-yellow-100'}
                    `}>
                      {booking.status}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}