import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import { enrollStudent } from "@/app/actions/enrollStudent"; // Import the new server action

export default async function TeacherProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch teacher data
  const teacher = await prisma.teacher.findUnique({ 
    where: { id },
    include: { reviews: true } 
  });

  if (!teacher) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] font-sans pb-20">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Main Content (Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Header Section */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-md shrink-0 border-4 border-white ring-1 ring-gray-100">
              <img 
                src={teacher.image || "/placeholder.jpg"} 
                alt={teacher.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-3 mb-3">
                 <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    {teacher.subject}
                 </span>
                 <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    ★ {teacher.rating.toFixed(1)}
                 </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-4 tracking-tight">
                {teacher.name}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                {teacher.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-6 mt-8 pt-6 border-t border-gray-100">
                {teacher.linkedin && (
                  <Link href={`https://${teacher.linkedin}`} className="text-gray-400 hover:text-[#0077b5] flex items-center gap-2 text-sm font-semibold transition-colors">
                    <span className="text-xl">🔗</span> LinkedIn
                  </Link>
                )}
                {teacher.twitter && (
                  <Link href={`https://${teacher.twitter}`} className="text-gray-400 hover:text-[#1DA1F2] flex items-center gap-2 text-sm font-semibold transition-colors">
                    <span className="text-xl">🐦</span> Twitter
                  </Link>
                )}
                {teacher.website && (
                  <Link href={`https://${teacher.website}`} className="text-gray-400 hover:text-black flex items-center gap-2 text-sm font-semibold transition-colors">
                    <span className="text-xl">🌐</span> Website
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 2. Demo Video Section (Only shows if video exists) */}
          {teacher.demoVideoUrl && (
            <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative w-full pb-[56.25%] rounded-3xl overflow-hidden bg-black">
                    <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src={teacher.demoVideoUrl} 
                        title="Demo Class"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-[#1D1D1F]">Watch a Demo Class</h3>
                        <p className="text-gray-500 text-sm">Experience {teacher.name}'s teaching style.</p>
                    </div>
                    <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                       ▶
                    </div>
                </div>
            </div>
          )}

          {/* 3. Methodology Section */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-6">Teaching Methodology</h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>{teacher.teachingStyle || "I focus on a student-centric approach, tailoring my lessons to each individual's pace and learning style."}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-gray-200/50">
                    <h4 className="font-bold text-[#1D1D1F] mb-1">🎯 Structured Plan</h4>
                    <p className="text-sm text-gray-500">Custom roadmap for every student.</p>
                </div>
                <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-gray-200/50">
                    <h4 className="font-bold text-[#1D1D1F] mb-1">💬 Interactive</h4>
                    <p className="text-sm text-gray-500">Two-way communication, always.</p>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Booking & Enrollment Card (Span 4) */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100">
             
             {/* Header */}
             <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <span className="inline-block bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                    Available Now
                </span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Book a Session</h3>
                <p className="text-gray-500 text-sm mt-2">
                    Connect with {teacher.name} to start your journey.
                </p>
             </div>

             {/* 1. The Demo/Consultation Form */}
             <BookingForm teacherId={teacher.id} />

             {/* SEPARATOR */}
             <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400 font-bold uppercase">Or Skip to</span>
                <div className="h-px bg-gray-200 flex-1"></div>
             </div>

             {/* 2. MOCK PURCHASE BUTTON (The New Feature) */}
             <form action={enrollStudent}>
                 <input type="hidden" name="teacherId" value={teacher.id} />
                 {/* Defaulting to Beginner plan for the quick buy button */}
                 <input type="hidden" name="plan" value="Beginner" />
                 
                 <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <span>⚡</span> Enroll Instantly (Mock)
                 </button>
                 <p className="text-[10px] text-gray-400 text-center mt-2">
                    *Simulation: No payment required. Adds 4 classes immediately.
                 </p>
             </form>

             {/* Trust Footer */}
             <div className="mt-6 text-center space-y-2 pt-4 border-t border-gray-50">
               <Link href="/pricing" className="block text-xs text-gray-500 font-bold hover:text-black transition-colors">
                  View All Packages & Pricing →
               </Link>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}