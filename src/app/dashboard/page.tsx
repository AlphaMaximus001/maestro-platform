import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import CourseSwitcher from "@/components/CourseSwitcher";

// We receive searchParams to read the ?subId=... from the URL
export default async function StudentDashboard({ 
    searchParams 
}: { 
    searchParams: Promise<{ subId?: string }> 
}) {
  const { userId } = await auth();
  const { subId } = await searchParams; // Await the params (Next.js 15 requirement)

  // FALLBACK: Use "user_123" for testing if not logged in
  const currentUserId = userId || "user_123"; 

  // 1. Fetch ALL active subscriptions for this user
  const allSubscriptions = await prisma.subscription.findMany({
    where: { studentId: currentUserId, status: "ACTIVE" },
    include: { 
      teacher: true,
      sessions: {
        orderBy: { date: 'desc' }
      }
    }
  });

  // 2. Determine which subscription to display
  // If ?subId is in the URL, try to find it. Otherwise, default to the first one.
  const displayedSub = subId 
    ? allSubscriptions.find(s => s.id === subId) || allSubscriptions[0]
    : allSubscriptions[0];

  // 3. Prepare data for the current view
  const upcomingClass = displayedSub?.sessions.find(s => s.status === 'SCHEDULED');
  const pastClasses = displayedSub?.sessions.filter(s => s.status === 'COMPLETED') || [];
  
  const total = displayedSub?.totalClasses || 10;
  const used = displayedSub?.classesUsed || 0;
  const progressPercent = (used / total) * 100;

  // 4. Prepare simple list for the switcher component
  const switcherData = allSubscriptions.map(s => ({
      id: s.id,
      subject: s.teacher.subject,
      teacherName: s.teacher.name
  }));

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F]">Student Dashboard</h1>
                <p className="text-gray-500">Welcome back, {userId ? "Student" : "Pravek"}</p>
            </div>
            
            {/* Course Switcher Component */}
            {allSubscriptions.length > 0 && (
                <CourseSwitcher 
                    subscriptions={switcherData} 
                    currentId={displayedSub?.id || ""} 
                />
            )}
        </div>

        {!displayedSub ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
             <div className="text-4xl mb-4">🎓</div>
             <h3 className="text-xl font-bold text-gray-800">No Active Course Found</h3>
             <p className="text-gray-500 mt-2">Book a demo to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Stats & Next Class */}
            <div className="lg:col-span-2 space-y-6 animate-in fade-in">
                
                {/* Course Info Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
                    <img src={displayedSub.teacher.image || "/placeholder.jpg"} className="w-20 h-20 rounded-full object-cover border-2 border-gray-100" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <div>
                                <h2 className="text-xl font-bold text-[#1D1D1F]">{displayedSub.teacher.subject} Mastery</h2>
                                <p className="text-gray-500 text-sm">Mentor: {displayedSub.teacher.name}</p>
                             </div>
                             {/* Small Badge for Current Plan */}
                             <span className="hidden md:inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                {total === 4 ? "Beginner" : total === 8 ? "Intermediate" : "Advanced"}
                             </span>
                        </div>
                        
                        <div className="mt-4">
                            <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-gray-400">COURSE PROGRESS</span>
                                <span className="text-[#1D1D1F]">{used}/{total} Classes</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1D1D1F] rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Session Card */}
                <div className="bg-[#1D1D1F] text-white p-8 rounded-[2rem] shadow-xl shadow-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">UPCOMING SESSION</p>
                        {upcomingClass ? (
                            <>
                                <h3 className="text-3xl font-bold mb-2">{upcomingClass.topic}</h3>
                                <div className="flex items-center gap-4 text-gray-300 text-sm">
                                    <span>📅 {new Date(upcomingClass.date).toLocaleDateString()}</span>
                                    <span>⏰ {new Date(upcomingClass.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                                    Join Class Link
                                </button>
                            </>
                        ) : (
                            <div className="py-8 text-center text-gray-400 border border-dashed border-gray-700 rounded-xl">
                                No classes scheduled. <br/> Contact {displayedSub.teacher.name} to book one.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* History Timeline */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1D1D1F] mb-6">Class History</h3>
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                    {pastClasses.map((session) => (
                        <div key={session.id} className="relative pl-12">
                            <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full border-2 border-white ring-2 ring-green-100 bg-green-500 z-10"></div>
                            <h4 className="font-bold text-sm text-[#1D1D1F]">{session.topic}</h4>
                            <p className="text-xs text-gray-400 mt-1">{new Date(session.date).toLocaleDateString()}</p>
                            
                            <div className="flex gap-2 mt-2">
                                <div className="inline-block bg-gray-50 px-3 py-1 rounded-lg text-xs font-medium text-gray-600 border border-gray-100">
                                    ✅ Completed
                                </div>

                                {/* Resource Button (FIXED: Handles missing https://) */}
                                {/* @ts-ignore */}
                                {session.resourceUrl && (
                                    // @ts-ignore
                                    <a 
                                        href={session.resourceUrl.startsWith('http') ? session.resourceUrl : `https://${session.resourceUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block bg-blue-50 px-3 py-1 rounded-lg text-xs font-bold text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                                    >
                                        📂 Materials
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                    {pastClasses.length === 0 && <p className="pl-12 text-sm text-gray-400">No classes completed yet.</p>}
                </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}