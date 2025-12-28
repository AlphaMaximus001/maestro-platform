'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <--- Import Router

interface BookingCardProps {
  teacherId: string;
  hourly: number;
  daily: number;
  monthly: number;
}

export default function BookingCard({ teacherId, hourly, daily, monthly }: BookingCardProps) {
  const router = useRouter();
  const [plan, setPlan] = useState<'hourly' | 'daily' | 'monthly'>('hourly');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in when component loads
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setUserId(storedId);
  }, []);

  const getPrice = () => {
    if (plan === 'daily') return daily;
    if (plan === 'monthly') return monthly;
    return hourly;
  };

  const handleBooking = async () => {
    // 1. Security Check: Redirect if not logged in
    if (!userId) {
      // Save where they were trying to go (optional, good UX)
      // Then redirect to login
      router.push('/login'); 
      return;
    }

    if (!date) {
      alert("Please select a date first.");
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: userId, // <--- Use the REAL logged-in ID
          teacherId: teacherId,
          date: date,
          type: plan
        }),
      });

      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || "Booking failed");
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error: any) {
      alert(error.message); // Show the actual error
      setStatus('error');
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
      
      {/* Plan Toggles */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        {['hourly', 'daily', 'monthly'].map((type) => (
          <button
            key={type}
            onClick={() => setPlan(type as any)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
              plan === type ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="text-center mb-6 pb-6 border-b border-gray-100">
        <p className="text-gray-500 text-sm font-medium mb-1 capitalize">{plan} Rate</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-[#1D1D1F]">₹{getPrice().toLocaleString()}</span>
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Date</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <button 
        onClick={handleBooking}
        disabled={status === 'loading' || status === 'success'}
        className={`w-full font-medium py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2
          ${status === 'success' ? 'bg-green-500 text-white' : 
            status === 'error' ? 'bg-red-500 text-white' : 
            'bg-[#0071E3] hover:bg-[#0077ED] text-white'}`}
      >
        {status === 'loading' ? 'Processing...' : 
         status === 'success' ? 'Confirmed!' : 
         userId ? 'Book Session' : 'Log in to Book'} {/* Button Text Changes */}
      </button>
    </div>
  );
}