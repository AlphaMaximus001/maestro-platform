import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32 prose prose-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#1D1D1F]">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last Updated: January 2026</p>
        
        <div className="space-y-6 text-gray-600">
            <p>Your privacy is important to us. This policy explains how we handle your data.</p>
            
            <h3 className="font-bold text-black text-xl">1. Data Collection</h3>
            <p>We collect your name, email, and usage data to improve your experience. We do not store credit card details directly.</p>
            
            <h3 className="font-bold text-black text-xl">2. Data Sharing</h3>
            <p>We do not sell your personal data to third parties. Data is shared with mentors only as needed to facilitate sessions.</p>
            
            <h3 className="font-bold text-black text-xl">3. Cookies</h3>
            <p>We use cookies to keep you logged in and remember your preferences.</p>
        </div>
      </div>
    </main>
  );
}