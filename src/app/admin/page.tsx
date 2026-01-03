import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { grantAccess } from "@/app/actions/grantAccess";
import { makeUserTeacher } from "@/app/actions/makeUserTeacher";

export default async function AdminDashboard() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as any)?.role;
  
  if (role !== 'admin') {
    redirect('/');
  }

  // Fetch data
  const bookings = await prisma.booking.findMany({
    include: { teacher: true },
    orderBy: { createdAt: 'desc' }
  });

  const teachers = await prisma.teacher.findMany({
    select: { id: true, name: true, subject: true }
  });

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F]">Admin Dashboard</h1>
                <p className="text-gray-500">Manage leads, subscriptions, and staff.</p>
            </div>
        </div>

        {/* TOP ROW: ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* 1. GRANT STUDENT ACCESS */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl mb-3">🎁</div>
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Grant Student Access</h3>
                    <p className="text-xs text-gray-500">Manually enroll a student.</p>
                </div>
                <form action={grantAccess} className="space-y-3">
                    <input name="email" type="email" required placeholder="Student Email" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-green-500"/>
                    <select name="teacherId" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-green-500">
                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>)}
                    </select>
                    <select name="plan" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-green-500">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <button className="w-full py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 text-xs">Confirm</button>
                </form>
            </div>

            {/* 2. ONBOARD NEW TEACHER (SIMPLIFIED) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl mb-3">👨‍🏫</div>
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Onboard Teacher</h3>
                    <p className="text-xs text-gray-500">Enable teacher dashboard for user.</p>
                </div>
                <form action={makeUserTeacher} className="space-y-3">
                    {/* Only asking for Email now */}
                    <input 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="User Email (Must be signed up)" 
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    
                    <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 text-xs">
                        Grant Teacher Role
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                        *User can edit their bio/subject later.
                    </p>
                </form>
            </div>

            {/* 3. STATS SUMMARY */}
            <div className="bg-[#1D1D1F] text-white rounded-[2rem] p-8 shadow-xl flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold opacity-80">Platform Stats</h3>
                    <div className="mt-6 space-y-4">
                        <div>
                            <div className="text-3xl font-bold">{bookings.length}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase">Total Leads</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{teachers.length}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase">Active Mentors</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* BOTTOM ROW: LEADS TABLE */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700">Recent Leads</h3>
                <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold border border-gray-200">{bookings.length} Records</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-50">
                        {bookings.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 font-bold text-[#1D1D1F]">{lead.studentName}</td>
                                <td className="p-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${lead.type === 'DEMO' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {lead.type}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{lead.studentPhone}</td>
                                <td className="p-4 text-sm font-bold text-gray-400">{lead.teacher.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </main>
  );
}