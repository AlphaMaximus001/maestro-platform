'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // <--- Ensure this is imported

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATE LOGIN LOGIC
    setTimeout(() => {
      // 1. Save the User ID to browser storage
      localStorage.setItem('userId', 'user_pravek_123'); 
      localStorage.setItem('userEmail', email);

      // 2. Redirect back to where they came from (or Explore)
      router.push('/explore'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#1D1D1F] mb-12 block">
            Maestro<span className="text-blue-500">.</span>
          </Link>

          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-3">Welcome back</h1>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@maestro.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1D1D1F] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg shadow-black/20 flex justify-center"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            {/* FIXED LINK HERE */}
            <Link href="/signup" className="text-blue-600 font-bold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block relative bg-[#F5F5F7]">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" 
          alt="Login visual" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-lg">
          <p className="text-3xl font-bold leading-tight mb-4">"The beautiful thing about learning is that no one can take it away from you."</p>
          <p className="text-white/80">— B.B. King</p>
        </div>
      </div>

    </div>
  );
}