import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1D1D1F] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Maestro<span className="text-blue-500">.</span>
            </Link>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Democratizing education by connecting students with the world's best mentors.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Jobs / Teach Column - REQUESTED FEATURE */}
          <div>
            <h3 className="font-bold mb-4">Work with us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  Become a Mentor
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">HOT</span>
                </Link>
              </li>
              <li><Link href="#" className="hover:text-white transition-colors">Affiliate Program</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Invest</Link></li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              {/* Social Icons (using text/emoji for simplicity, can be SVGs) */}
              <Link href="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                🐦
              </Link>
              <Link href="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                📸
              </Link>
              <Link href="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                💼
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              © 2025 Maestro Inc. <br/>Lucknow, India.
            </p>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>Terms of Service • Privacy Policy • Sitemap</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>English (India)</span>
             <span>₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}