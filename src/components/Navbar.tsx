import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
          Maestro<span className="text-[#0071E3]">.</span>
        </Link>

        {/* Right Side: Auth Buttons Only (Admin Removed) */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Log in
            </button>
          </Link>
          
          <Link href="/signup">
            <button className="bg-[#1D1D1F] hover:bg-black text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-black/20">
              Sign up
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}