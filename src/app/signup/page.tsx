'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATE SIGNUP LOGIC
    // In a real app, you would send this to your API (e.g., /api/register)
    setTimeout(() => {
      // 1. Create a Fake User ID
      const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      
      // 2. Save session to browser
      localStorage.setItem('userId', newUserId);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);

      // 3. Redirect to Onboarding (to pick interests)
      router.push('/onboarding');
    }, 1500);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      
      {/* Left: Sign Up Form */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#1D1D1F] mb-12 block">
            Maestro<span className="text-blue-500">.</span>
          </Link>

          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-3">Create account</h1>
          <p className="text-gray-500 mb-8">Start your learning journey today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Pravek"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <p className="text-xs text-gray-400 mt-2">Must be at least 8 characters.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1D1D1F] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg shadow-black/20 mt-4 flex justify-center"
            >
              {loading ? 'Creating Account...' : 'Sign Up Free'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Right: Inspirational Image */}
      <div className="hidden lg:block relative bg-[#F5F5F7]">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" 
          alt="Students learning together" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-lg">
          <div className="flex gap-1 mb-4">
             {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xl">★</span>)}
          </div>
          <p className="text-3xl font-bold leading-tight mb-4">"Maestro helped me find a mentor who completely changed my career trajectory."</p>
          <p className="text-white/90 font-medium">— Ananya R., Product Designer</p>
        </div>
      </div>

    </main>
  );
}