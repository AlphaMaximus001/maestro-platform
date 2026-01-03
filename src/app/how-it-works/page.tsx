import Navbar from "@/components/Navbar";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1D1D1F] mb-6 text-center">
          From curious to <span className="text-blue-600">capable.</span>
        </h1>
        <p className="text-xl text-gray-500 text-center mb-16 max-w-2xl mx-auto">
           Maestro connects you with expert mentors for 1-on-1 live sessions. Here is exactly how the journey unfolds.
        </p>

        <div className="space-y-12 relative before:absolute before:left-8 md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-100">
            {[
                { title: "Create your Profile", desc: "Sign up as a student. Tell us your goals, your current skill level, and what you want to master.", icon: "📱" },
                { title: "Browse & Connect", desc: "Use our filters to find mentors who match your budget and schedule. Check their reviews and watch demo videos.", icon: "🔍" },
                { title: "Book a Session", desc: "Pick a time slot that works for you. Pay securely through the platform. No hidden fees.", icon: "📅" },
                { title: "Live 1-on-1 Learning", desc: "Join the video call via the dashboard. Get personalized feedback, ask questions, and grow.", icon: "🎓" },
            ].map((step, i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-center gap-8 group">
                    <div className="md:w-1/2 flex justify-start md:justify-end text-right">
                         <div className={`hidden md:block pr-8 ${i % 2 === 0 ? 'text-right' : 'order-last text-left pl-8 pr-0'}`}>
                             <h3 className="text-xl font-bold text-[#1D1D1F]">{step.title}</h3>
                             <p className="text-gray-500 mt-2">{step.desc}</p>
                         </div>
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center text-2xl z-10 shadow-sm group-hover:scale-110 transition-transform">
                        {step.icon}
                    </div>

                    <div className="pl-20 md:hidden">
                        <h3 className="text-xl font-bold text-[#1D1D1F]">{step.title}</h3>
                        <p className="text-gray-500 mt-2">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </main>
  );
}