import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32 prose prose-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#1D1D1F]">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last Updated: January 2026</p>
        
        <div className="space-y-6 text-gray-600">
            <p>Welcome to Maestro. By using our website, you agree to these terms.</p>
            
            <h3 className="font-bold text-black text-xl">1. Usage</h3>
            <p>You agree to use Maestro only for lawful purposes and learning. Harassment of mentors or students will result in an immediate ban.</p>
            
            <h3 className="font-bold text-black text-xl">2. Payments</h3>
            <p>All payments are processed securely. Refunds are subject to our cancellation policy (24-hour notice required).</p>
            
            <h3 className="font-bold text-black text-xl">3. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
        </div>
      </div>
    </main>
  );
}