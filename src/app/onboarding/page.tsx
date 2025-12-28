import Link from 'next/link';
import Navbar from '@/components/Navbar'; // Optional if you want the nav here, but usually onboarding is standalone

const categories = [
  { 
    id: 'coding', 
    name: 'Coding & Development', 
    desc: 'Python, React, Java, AI & Machine Learning',
    icon: '💻', 
    color: 'border-blue-200 bg-blue-50 text-blue-600' 
  },
  { 
    id: 'music', 
    name: 'Music & Arts', 
    desc: 'Guitar, Piano, Vocals, Music Theory',
    icon: '🎹', 
    color: 'border-purple-200 bg-purple-50 text-purple-600' 
  },
  { 
    id: 'business', 
    name: 'Business & Finance', 
    desc: 'Marketing, Accounting, Stock Market, MBA',
    icon: '📊', 
    color: 'border-green-200 bg-green-50 text-green-600' 
  },
  { 
    id: 'design', 
    name: 'Design & Creative', 
    desc: 'UI/UX, Graphic Design, Video Editing',
    icon: '🎨', 
    color: 'border-pink-200 bg-pink-50 text-pink-600' 
  },
];

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-white grid lg:grid-cols-2">
      
      {/* LEFT SIDE: Interaction Area */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-12 relative">
        
        {/* Step Indicator */}
        <div className="absolute top-10 left-8 md:left-20 flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-bold text-sm">1</span>
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Personalize</span>
        </div>

        <div className="max-w-lg w-full mx-auto lg:mx-0 mt-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            What do you want to master?
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            We'll curate the top 1% of mentors based on your learning goals. You can change this later.
          </p>

          <div className="grid gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/explore?q=${cat.name.split(' ')[0]}`} className="group">
                <button className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-200 flex items-center gap-5 group-active:scale-[0.99]">
                  
                  {/* Icon Box */}
                  <div className={`h-14 w-14 shrink-0 rounded-xl ${cat.color} border flex items-center justify-center text-2xl shadow-sm`}>
                    {cat.icon}
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="font-bold text-[#1D1D1F] text-lg group-hover:text-blue-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Arrow (Visible on Hover) */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500 font-bold text-xl">
                    →
                  </div>
                </button>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to Home
            </Link>
            <Link href="/explore" className="text-sm font-medium text-[#1D1D1F] hover:underline">
              I'm just browsing
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Visual Context (Hidden on Mobile) */}
      <div className="hidden lg:block relative bg-[#F5F5F7]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
          alt="Students collaborating" 
          className="h-full w-full object-cover"
        />
        
        {/* Overlay Quote */}
        <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex gap-1 mb-4">
             {[1,2,3,4,5].map(i => <span key={i} className="text-orange-400 text-xl">★</span>)}
          </div>
          <p className="text-xl font-medium text-[#1D1D1F] leading-relaxed mb-4">
            "I found a Python tutor within 5 minutes. The 1-on-1 attention helped me crack my first developer job interview."
          </p>
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="h-full w-full object-cover"/>
             </div>
             <div>
                <p className="text-sm font-bold text-[#1D1D1F]">Riya Sharma</p>
                <p className="text-xs text-gray-500">Placed at Microsoft</p>
             </div>
          </div>
        </div>
      </div>

    </main>
  );
}