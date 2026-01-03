"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SimpleSub {
  id: string;
  subject: string;
  teacherName: string;
}

export default function CourseSwitcher({ 
  subscriptions, 
  currentId 
}: { 
  subscriptions: SimpleSub[], 
  currentId: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSwitch = (subId: string) => {
    // Update the URL to show the selected course
    router.push(`/dashboard?subId=${subId}`);
    setIsOpen(false);
  };

  if (subscriptions.length === 0) return null;

  return (
    <div className="relative">
      {/* The Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span>Active Subscriptions ({subscriptions.length})</span>
        <span className="text-gray-400 text-xs">▼</span>
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-2">
                Switch Course
            </div>
            {subscriptions.map((sub) => (
                <button
                    key={sub.id}
                    onClick={() => handleSwitch(sub.id)}
                    className={`w-full text-left px-3 py-3 rounded-xl text-sm transition-colors flex flex-col gap-0.5 ${
                        sub.id === currentId 
                        ? "bg-blue-50 text-blue-700 font-bold" 
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                >
                    <span className="font-bold">{sub.subject}</span>
                    <span className="text-xs opacity-70">with {sub.teacherName}</span>
                </button>
            ))}
        </div>
      )}
    </div>
  );
}