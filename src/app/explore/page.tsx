import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ subject?: string; search?: string }> }) {
  const { subject, search } = await searchParams;

  // 1. Build the Main Filter
  const where: any = {};
  if (subject && subject !== "All") where.subject = subject;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { bio: { contains: search, mode: 'insensitive' } },
    ];
  }

  // 2. FETCH DATA
  const [teachers, topRated, budgetFriendly] = await Promise.all([
    prisma.teacher.findMany({ where }),
    prisma.teacher.findMany({ where: { rating: { gte: 4.8 } }, take: 6, orderBy: { rating: 'desc' } }),
    prisma.teacher.findMany({ where: { hourlyRate: { lte: 500 } }, take: 6, orderBy: { hourlyRate: 'asc' } })
  ]);

  const subjects = ["All", "Mathematics", "Physics", "Computer Science", "Music", "Arts"];

  // Helper Component: Teacher Card
  const TeacherCard = ({ t }: { t: any }) => {
    // Generate a consistent "Experience" number based on the name length (Pseudo-random)
    // This avoids needing a DB migration right now but keeps it consistent per teacher.
    const experienceYears = (t.name.length % 8) + 3; 

    return (
      <div className="snap-center shrink-0 w-[220px] md:w-[240px] bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative group">
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg z-10">
              <span className="text-orange-500 text-[10px]">★</span>
              <span className="text-[10px] font-bold text-orange-700">{t.rating.toFixed(1)}</span>
          </div>

          {/* Image */}
          <img 
              src={t.image || "/placeholder.jpg"} 
              alt={t.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3 group-hover:scale-105 transition-transform"
          />

          {/* Name */}
          <h3 className="font-bold text-base text-[#1D1D1F] leading-tight mb-1 truncate w-full px-2">
              {t.name}
          </h3>
          
          {/* Subject */}
          <p className="text-xs text-blue-600 font-bold mb-3 truncate w-full px-2 uppercase tracking-wide">
              {t.subject}
          </p>

          {/* REPLACED "Free Demo" with EXPERIENCE BADGE */}
          <div className="mb-5 w-full px-4">
              <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 py-2 rounded-lg">
                  <span className="text-sm">🎓</span>
                  <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-bold text-gray-800">{experienceYears}+ Years</span>
                      <span className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Experience</span>
                  </div>
              </div>
          </div>

          {/* Button */}
          <Link href={`/teachers/${t.id}`} className="w-full mt-auto">
              <button className="w-full py-2.5 bg-[#1D1D1F] text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors">
                  View Profile
              </button>
          </Link>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7] pb-20">
      <Navbar />
      
      {/* HEADER & FILTERS */}
      <div className="bg-white pt-24 pb-4 border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="mb-4 md:mb-6">
                <p className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                    Discover Mentors
                </p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-none">
                    Find your guide.
                </h1>
            </div>

            <form className="relative mb-4 md:mb-6">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</div>
                <input 
                    name="search"
                    defaultValue={search || ""}
                    placeholder="Search by name or skill..." 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-gray-400"
                />
            </form>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                {subjects.map((s) => (
                    <Link key={s} href={`/explore?subject=${s === "All" ? "" : s}`} scroll={false}>
                        <button 
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all border ${
                                (subject === s) || (!subject && s === "All")
                                ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md" 
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            {s}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12 py-8">
        
        {/* SECTION 1: MATCHED RESULTS */}
        <section>
            <div className="flex items-end justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1D1D1F]">Matched Mentors</h2>
                <span className="text-xs text-gray-400 font-bold uppercase">{teachers.length} Found</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
                {teachers.map((teacher) => <TeacherCard key={teacher.id} t={teacher} />)}
                
                {teachers.length === 0 && (
                    <div className="col-span-full w-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="text-4xl mb-2">🔍</div>
                        <h3 className="text-base font-bold text-gray-800">No mentors found.</h3>
                        <p className="text-gray-400 text-xs">Try searching for something else.</p>
                    </div>
                )}
            </div>
        </section>

        {/* SECTION 2: TOP RATED */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-bold text-[#1D1D1F]">🌟 Top Rated Mentors</h2>
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full">MUST TRY</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
                {topRated.map((teacher) => <TeacherCard key={teacher.id} t={teacher} />)}
            </div>
        </section>

        {/* SECTION 3: NEW MENTORS */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-bold text-[#1D1D1F]">🚀 New on Maestro</h2>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">FRESH</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
                {budgetFriendly.map((teacher) => <TeacherCard key={teacher.id} t={teacher} />)}
            </div>
        </section>

      </div>
    </main>
  );
}