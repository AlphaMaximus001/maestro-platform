import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import LogClassForm from "@/components/LogClassForm";
import { updateBooking } from "@/app/actions/updateBooking";

export default async function TeacherDashboard() {
  const { userId } = await auth();

  // 1. Find the Teacher Profile associated with this Clerk User
  // (Assuming you manually linked them or are using the same ID. 
  // If you seeded data, you might need to find by email. For now, let's try finding by ID if you updated seed, 
  // or fallback to finding by email if your auth setup syncs emails.)
  
  // FAILSAFE: If no teacher found directly by ID, we look up by email (common in hybrid setups)
  // We need the user's email first
  const { sessionClaims } = await auth();
  const userEmail = sessionClaims?.email as string; // Make sure your session claims include email if needed
  
  // Simplified: Try finding teacher by the Clerk UserID if you synced them, 
  // OR just fetch the first teacher for testing if you are in "God Mode"
  // For production: const teacher = await prisma.teacher.findUnique({ where: { id: userId } });
  
  // FOR NOW (Development Mode): We'll fetch the specific teacher we seeded or the first one
  // In a real app, you'd sync the Clerk ID to the Teacher Table.
  const teacher = await prisma.teacher.findFirst(); 
  
  if (!teacher) return <div className="p-20">Teacher profile not found. Contact Admin.</div>;

  // 2. Fetch Active Students
  const subscriptions = await prisma.subscription.findMany({
    where: { teacherId: teacher.id, status: "ACTIVE" },
   orderBy: { startDate: 'desc' }
  });

  // 3. Fetch Pending Leads (Demos/Consultations)
  const leads = await prisma.booking.findMany({
    where: { teacherId: teacher.id, status: "PENDING" },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1D1D1F]">Teacher Dashboard</h1>
            <p className="text-gray-500">Welcome back, {teacher.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1: NEW LEADS (Priority) */}
            <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#1D1D1F]">New Leads</h2>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-bold">{leads.length} Pending</span>
                </div>

                {leads.length === 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 text-center text-gray-400 text-sm">
                        No new inquiries yet.
                    </div>
                )}

                {leads.map((lead) => (
                    <div key={lead.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        {lead.type === "DEMO" && <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>}
                        {lead.type === "CONSULTATION" && <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>}
                        
                        <div className="pl-3">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#1D1D1F]">{lead.studentName}</h3>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${lead.type === 'DEMO' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {lead.type}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">📞 {lead.studentPhone}</p>
                            {lead.message && <p className="text-xs text-gray-600 italic mb-4">"{lead.message}"</p>}

                            <div className="flex gap-2">
                                <a href={`tel:${lead.studentPhone}`} className="flex-1 text-center py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50">
                                    Call
                                </a>
                                <form action={updateBooking} className="flex-1">
                                    <input type="hidden" name="bookingId" value={lead.id} />
                                    <input type="hidden" name="status" value="CONTACTED" />
                                    <button className="w-full py-2 bg-[#1D1D1F] text-white rounded-lg text-xs font-bold hover:bg-black">
                                        Done
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* COLUMN 2 & 3: ACTIVE STUDENTS */}
            <div className="lg:col-span-2">
                <h2 className="text-lg font-bold text-[#1D1D1F] mb-6">Active Classroom</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {subscriptions.map((sub) => {
                        const progress = (sub.classesUsed / sub.totalClasses) * 100;
                        return (
                            <div key={sub.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1D1D1F]">{sub.studentName}</h3>
                                            <p className="text-xs text-gray-400">ID: {sub.studentId.slice(0,8)}...</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-[#1D1D1F]">{sub.classesUsed}/{sub.totalClasses}</div>
                                            <div className="text-[10px] text-gray-400 uppercase font-bold">Classes Done</div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                                        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>

                                {/* The Client Component for Logging */}
                                <LogClassForm subId={sub.id} studentName={sub.studentName} />
                            </div>
                        );
                    })}

                    {subscriptions.length === 0 && (
                        <div className="col-span-2 py-12 text-center text-gray-400 bg-white rounded-[2rem] border border-dashed border-gray-200">
                            No active students. Ask Admin to assign you one!
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}