import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar'; // <--- Added Navbar for navigation

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const teachers = await prisma.teacher.findMany({
    where: {
      OR: [
        { name: { contains: query } }, 
        { subject: { contains: query } }
      ]
    }
  });

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* 1. Add Navigation so users aren't trapped */}
      <Navbar />

      {/* 2. Improved Header Section */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
           <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Discover Mentors</p>
           <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-6">
             Find the perfect <br/>
             <span className="text-gray-400">guide for your journey.</span>
           </h1>
           <div className="max-w-xl">
             <SearchBar />
           </div>
        </div>
      </div>

      {/* 3. Results Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {teachers.length === 0 ? (
            <div className="text-center py-24">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-bold text-[#1D1D1F]">No mentors found for "{query}"</h3>
                <p className="text-gray-500 mt-2">Try searching for "Coding", "Music", or "Spanish".</p>
                <Link href="/explore">
                    <button className="mt-6 text-blue-600 font-semibold hover:underline">Clear Filters</button>
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((t) => (
                <div key={t.id} className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden shadow-sm shrink-0 border border-gray-100">
                    <img 
                        src={t.image || "/placeholder.jpg"} 
                        alt={t.name}
                        className="object-cover h-full w-full"
                    />
                    </div>
                    <div>
                    <h2 className="text-lg font-bold text-[#1D1D1F] leading-tight group-hover:text-blue-600 transition-colors">{t.name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{t.subject} • 8 Yrs Exp</p>
                    <div className="flex items-center gap-1 mt-1 text-orange-400 text-xs font-bold">
                        <span>★</span> {t.rating} (120 reviews)
                    </div>
                    </div>
                </div>
                
                {/* Bio Snippet */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {t.bio}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div>
                        <span className="font-bold text-lg text-[#1D1D1F]">₹{t.hourlyRate}</span>
                        <span className="text-gray-400 text-xs font-normal">/hr</span>
                    </div>
                    
                    <Link href={`/teachers/${t.id}`}>
                    <button className="bg-[#1D1D1F] text-white hover:bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-black/10">
                        View Profile
                    </button>
                    </Link>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>

      {/* 4. Mini "Contact Us" Section (Since you asked for it on this page too) */}
      <div className="bg-white border-t border-gray-200 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-500 mb-8">Our team can help match you with a custom tutor based on your specific requirements.</p>
            
            <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                    📞 Talk to an Advisor
                </button>
                <button className="flex items-center gap-2 bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    💬 Chat Support
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}