import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="pt-28 pb-8 md:pt-40 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Live 1-on-1 Mentorship
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-[#1D1D1F] tracking-tight leading-tight">
            Master any skill, <br className="hidden md:block"/>
            <span className="text-blue-600">faster.</span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto md:mx-0">
            Learn directly from India's top educators. Coding, Music, Arts & more.
          </p>

          <div className="flex gap-3 justify-center md:justify-start pt-2">
            <Link href="/explore" className="flex-1 md:flex-none">
              <button className="w-full md:w-auto px-6 py-3.5 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm shadow-lg shadow-black/10 active:scale-95 transition-all">
                Start Learning
              </button>
            </Link>
            <Link href="/explore" className="flex-1 md:flex-none">
               <button className="w-full md:w-auto px-6 py-3.5 bg-white text-[#1D1D1F] border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all">
                Browse
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full mt-4 md:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[16/9] md:aspect-auto md:h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
              alt="Students learning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Horizontal Scroll) */}
      <section className="py-10 md:py-24 max-w-7xl mx-auto">
        <div className="px-6 mb-6 flex justify-between items-end">
            <div>
                <h2 className="text-2xl md:text-5xl font-bold text-[#1D1D1F]">Browse by Subject</h2>
                <p className="text-sm text-gray-500 mt-1">Find your perfect mentor.</p>
            </div>
            <Link href="/explore" className="hidden md:block text-blue-600 font-bold hover:underline">See all →</Link>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="flex overflow-x-auto gap-4 px-6 pb-4 -mx-6 md:mx-0 md:grid md:grid-cols-2 md:gap-8 snap-x snap-mandatory no-scrollbar">
            
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-[85vw] md:w-auto group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">💻</div>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500">Popular</span>
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">Coding & Dev</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">Python, React, Java, AI & Machine Learning. Build real projects.</p>
                <Link href="/explore?subject=Computer Science" className="block w-full text-center py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors">
                    Explore Mentors
                </Link>
            </div>

            {/* Card 2 */}
            <div className="snap-center shrink-0 w-[85vw] md:w-auto group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">🎹</div>
                    <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">New</span>
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">Music & Arts</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">Guitar, Piano, Vocals, Music Theory. Learn from artists.</p>
                <Link href="/explore?subject=Music" className="block w-full text-center py-2.5 rounded-lg bg-orange-50 text-orange-700 font-bold text-sm hover:bg-orange-100 transition-colors">
                    Explore Mentors
                </Link>
            </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS (Horizontal Scroll) */}
      <section className="bg-gray-50 py-10 md:py-24 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="px-6 mb-8 text-center md:text-left">
                <h2 className="text-2xl md:text-5xl font-bold text-[#1D1D1F]">How it works</h2>
                <p className="text-sm text-gray-500 mt-2">Your journey in 4 simple steps.</p>
            </div>

            <div className="flex overflow-x-auto gap-4 px-6 pb-8 -mx-6 md:mx-0 md:grid md:grid-cols-4 md:gap-8 snap-x snap-mandatory no-scrollbar">
                {[
                    { step: "01", title: "Register", desc: "Create your free profile in seconds.", icon: "📱" },
                    { step: "02", title: "Select Mentor", desc: "Browse top-rated tutors near you.", icon: "🔍" },
                    { step: "03", title: "Book & Pay", desc: "Secure your slot instantly.", icon: "💳" },
                    { step: "04", title: "Master It", desc: "Connect 1-on-1 and learn.", icon: "🎓" },
                ].map((item, i) => (
                    <div key={i} className="snap-center shrink-0 w-[200px] md:w-auto flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-4">
                            {item.icon}
                        </div>
                        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-2">
                            STEP {item.step}
                        </div>
                        <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
         </div>
      </section>
      
      {/* 4. PROFESSIONAL FOOTER */}
      <footer className="bg-[#1D1D1F] text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                
                {/* Brand Column */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white">
                        Maestro<span className="text-blue-500">.</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Democratizing education by connecting ambitious students with India's best mentors.
                    </p>
                </div>

                {/* Links Column 1 */}
                <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">Platform</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/explore" className="hover:text-white transition-colors">Browse Mentors</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                        <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                 {/* Socials Column */}
                 <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">Connect</h4>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">𝕏</div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">📸</div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">in</div>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© 2026 Maestro Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <span>Made with ❤️ in India</span>
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}