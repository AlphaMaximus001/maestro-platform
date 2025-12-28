'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-lg mx-auto w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {/* Minimal Search Icon */}
        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input 
        type="text" 
        placeholder="Find a mentor (e.g. Design, Coding)..." 
        className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                   text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-300"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}