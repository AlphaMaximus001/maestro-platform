import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-extrabold text-[#1D1D1F] mb-6 tracking-tight">
            Choose your <span className="text-blue-600">level.</span>
          </h1>
          <p className="text-xl text-gray-500">
             Structured learning paths designed for every stage of your journey.
             Cancel or upgrade anytime.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* 1. BEGINNER PACKAGE */}
            <div className="flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                {/* Colorful Banner */}
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-8 text-white">
                    <h3 className="text-lg font-bold uppercase tracking-widest opacity-90">Foundation</h3>
                    <div className="text-4xl font-extrabold mt-2">Beginner</div>
                    <p className="mt-2 text-emerald-100 font-medium">For those just starting out.</p>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                        <span className="text-5xl font-bold text-[#1D1D1F]">₹2,499</span>
                        <span className="text-gray-400 font-medium">/month</span>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">4 CLASSES</span>
                            <span className="text-gray-600 text-sm">1 session per week</span>
                        </div>
                        <hr className="border-dashed border-gray-200"/>
                        <ul className="space-y-3 text-gray-600 text-sm font-medium">
                            <li className="flex gap-3">
                                <span className="text-emerald-500">✓</span> 
                                <span>Core Fundamentals & Theory</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500">✓</span> 
                                <span>Standard Exercises</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500">✓</span> 
                                <span>Email Support from Mentor</span>
                            </li>
                        </ul>
                    </div>

                    <Link href="/sign-up">
                        <button className="w-full py-4 rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors">
                            Start Basics
                        </button>
                    </Link>
                </div>
            </div>

            {/* 2. INTERMEDIATE PACKAGE (Highlighted) */}
            <div className="flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-blue-900/10 overflow-hidden transform md:-translate-y-4 relative">
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                    MOST POPULAR
                </div>

                {/* Colorful Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                    <h3 className="text-lg font-bold uppercase tracking-widest opacity-90">Growth</h3>
                    <div className="text-4xl font-extrabold mt-2">Intermediate</div>
                    <p className="mt-2 text-blue-100 font-medium">Build skills & real projects.</p>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                        <span className="text-5xl font-bold text-[#1D1D1F]">₹5,999</span>
                        <span className="text-gray-400 font-medium">/month</span>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs">8 CLASSES</span>
                            <span className="text-gray-600 text-sm">2 sessions per week</span>
                        </div>
                        <hr className="border-dashed border-gray-200"/>
                        <ul className="space-y-3 text-gray-600 text-sm font-medium">
                            <li className="flex gap-3">
                                <span className="text-blue-500">✓</span> 
                                <span>Advanced Techniques</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500">✓</span> 
                                <span>Live Project Review</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500">✓</span> 
                                <span>Direct Chat Support</span>
                            </li>
                             <li className="flex gap-3">
                                <span className="text-blue-500">✓</span> 
                                <span>Access to Recorded Sessions</span>
                            </li>
                        </ul>
                    </div>

                    <Link href="/sign-up">
                        <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">
                            Level Up
                        </button>
                    </Link>
                </div>
            </div>

            {/* 3. ADVANCED PACKAGE */}
            <div className="flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                {/* Colorful Banner */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
                    <h3 className="text-lg font-bold uppercase tracking-widest opacity-90">Mastery</h3>
                    <div className="text-4xl font-extrabold mt-2">Advanced</div>
                    <p className="mt-2 text-purple-100 font-medium">Professional career guidance.</p>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                        <span className="text-5xl font-bold text-[#1D1D1F]">₹9,999</span>
                        <span className="text-gray-400 font-medium">/month</span>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs">12 CLASSES</span>
                            <span className="text-gray-600 text-sm">3 sessions per week</span>
                        </div>
                        <hr className="border-dashed border-gray-200"/>
                        <ul className="space-y-3 text-gray-600 text-sm font-medium">
                            <li className="flex gap-3">
                                <span className="text-purple-500">✓</span> 
                                <span>Industry-Level Portfolio</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-purple-500">✓</span> 
                                <span>Career & Internship Guidance</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-purple-500">✓</span> 
                                <span>Priority 24/7 Support</span>
                            </li>
                             <li className="flex gap-3">
                                <span className="text-purple-500">✓</span> 
                                <span>1-on-1 Mock Interviews</span>
                            </li>
                        </ul>
                    </div>

                    <Link href="/sign-up">
                        <button className="w-full py-4 rounded-xl border-2 border-purple-500 text-purple-600 font-bold hover:bg-purple-50 transition-colors">
                            Go Pro
                        </button>
                    </Link>
                </div>
            </div>

        </div>
        
        {/* Trust Footer */}
        <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">All plans include a 7-day money-back guarantee.</p>
        </div>

      </div>
    </main>
  );
}