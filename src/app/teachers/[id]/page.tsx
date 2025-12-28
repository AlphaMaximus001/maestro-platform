import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingCard from '../../../components/BookingCard';
export default async function TeacherProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });

  if (!teacher) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* Navbar Placeholder */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
          <Link href="/explore" className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-2">
            ← Back to Mentors
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* LEFT SIDE: Teacher Info */}
        <div className="md:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start gap-8">
            <div className="h-32 w-32 shrink-0 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
              <img 
                src={teacher.image || "/placeholder.jpg"} 
                alt={teacher.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pt-2">
              <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">{teacher.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-50 text-[#0071E3] px-3 py-1 rounded-full text-sm font-semibold">
                  {teacher.subject}
                </span>
                <span className="flex items-center text-orange-400 font-bold text-sm">
                  ★ {teacher.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {teacher.bio}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Booking Card */}
        <div className="md:col-span-4 relative">
          
          {/* We pass the prices from the database to the Client Component */}
          <BookingCard 
          teacherId={teacher.id} // <--- ADD THIS LINE
            hourly={teacher.hourlyRate}
            daily={teacher.dailyRate || teacher.hourlyRate * 6}   // Fallback if DB is empty
            monthly={teacher.monthlyRate || teacher.hourlyRate * 100} 
          />
          
        </div>

      </div>
    </main>
  );
}