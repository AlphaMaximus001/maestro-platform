import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
           <div className="h-[500px] w-[500px] bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4">
           <div className="h-[400px] w-[400px] bg-blue-200 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold tracking-wide shadow-lg shadow-blue-500/30">
              NEW: LIVE 1-ON-1 MENTORSHIP
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
              Unlock your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                true potential.
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Learn directly from India's top educators. From Coding to Design, master any skill with personalized guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/onboarding"> 
                <button className="px-10 py-4 bg-[#1D1D1F] text-white text-lg font-semibold rounded-2xl shadow-xl shadow-black/20 hover:scale-105 transition-transform">
                  Start Learning
                </button>
              </Link>
              <Link href="/explore">
                <button className="px-10 py-4 bg-white border border-gray-200 text-[#1D1D1F] text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-colors">
                  View Mentors
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[3rem] rotate-6 opacity-20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
              alt="Happy students"
              className="relative rounded-[2.5rem] shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* 2. STATS BAR */}
      <div className="border-y border-gray-100 bg-gray-50/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">50M+</p>
            <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Learners</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#1D1D1F]">100+</p>
            <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Cities</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#1D1D1F]">10k+</p>
            <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Mentors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#1D1D1F]">4.8</p>
            <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Rating</p>
          </div>
        </div>
      </div>

      {/* 3. HOW IT WORKS (ChefKart Style) */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1D1D1F]">How it works</h2>
            <p className="text-gray-500 mt-4 text-lg">Your journey to mastery in 4 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>

            {/* Step 1 */}
            <div className="text-center bg-white p-4">
              <div className="h-24 w-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-blue-100">
                📱
              </div>
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-3">STEP 1</div>
              <h3 className="font-bold text-lg mb-2 text-[#1D1D1F]">Register on App</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Sign up and create your student profile in less than 2 minutes.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center bg-white p-4">
              <div className="h-24 w-24 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-purple-100">
                🔍
              </div>
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-3">STEP 2</div>
              <h3 className="font-bold text-lg mb-2 text-[#1D1D1F]">Select Mentor</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Browse top-rated mentors by subject, price, and reviews.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center bg-white p-4">
              <div className="h-24 w-24 mx-auto bg-green-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-green-100">
                💳
              </div>
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-3">STEP 3</div>
              <h3 className="font-bold text-lg mb-2 text-[#1D1D1F]">Book & Pay</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Choose a slot (Hourly/Daily) and pay securely.</p>
            </div>

            {/* Step 4 */}
            <div className="text-center bg-white p-4">
              <div className="h-24 w-24 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100">
                🎓
              </div>
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-3">STEP 4</div>
              <h3 className="font-bold text-lg mb-2 text-[#1D1D1F]">Master Your Craft</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Connect 1-on-1 and start your learning journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CONTACT US SECTION */}
      <div className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <div>
             <h2 className="text-4xl font-bold text-[#1D1D1F] mb-6">Get in touch</h2>
             <p className="text-gray-500 text-lg mb-10 leading-relaxed">
               Have questions about finding a mentor or joining as a teacher? We're here to help you 24/7.
             </p>

             <div className="space-y-8">
               <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl text-blue-600">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1D1D1F]">Headquarters</h3>
                    <p className="text-gray-500">Cyber Heights, Gomti Nagar<br/>Lucknow, Uttar Pradesh, 226010</p>
                  </div>
               </div>

               <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl text-purple-600">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1D1D1F]">Phone</h3>
                    <p className="text-gray-500">+91 98765 43210</p>
                    <p className="text-xs text-gray-400">Mon-Fri, 9am - 6pm</p>
                  </div>
               </div>

               <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl text-green-600">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1D1D1F]">Email</h3>
                    <p className="text-gray-500">support@maestro.com</p>
                  </div>
               </div>
             </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
             <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700">First Name</label>
                     <input type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700">Last Name</label>
                     <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700">Email Address</label>
                   <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700">Message</label>
                   <textarea rows={4} placeholder="How can we help you?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
                </div>

                <button className="w-full bg-[#1D1D1F] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-lg shadow-black/20">
                  Send Message
                </button>
             </form>
          </div>

        </div>
      </div>

    </main>
  );
}