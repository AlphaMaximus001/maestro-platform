import Navbar from "@/components/Navbar";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold text-[#1D1D1F] mb-12">Help Center</h1>
        
        <div className="space-y-6">
            {[
                { q: "How do I book a session?", a: "Go to the 'Explore' page, choose a mentor, and click 'View Profile'. From there, fill out the booking request form." },
                { q: "Is the first session really free?", a: "Yes! Most of our mentors offer a free 15-minute discovery call or demo session to gauge compatibility." },
                { q: "How do I become a mentor?", a: "We are currently invite-only. You can send your portfolio to careers@maestro.com." },
                { q: "Can I get a refund?", a: "If a session is cancelled 24 hours in advance, you get a full refund. Contact support for disputes." },
            ].map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-[#1D1D1F] mb-2">{faq.q}</h3>
                    <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
        
        <div className="mt-12 bg-blue-50 p-8 rounded-2xl text-center">
            <h3 className="font-bold text-blue-900">Still need help?</h3>
            <p className="text-blue-700 mb-4">Our support team is available 24/7.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Contact Support</button>
        </div>
      </div>
    </main>
  );
}