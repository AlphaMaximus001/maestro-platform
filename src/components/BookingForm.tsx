"use client";

import { useState } from "react";
// This import works now because Step 1 is error-free
import { submitLead } from "@/app/actions/submitLead";

export default function BookingForm({ teacherId }: { teacherId: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    // We attach the teacher's ID so we know who they want to book
    formData.append("teacherId", teacherId);
    
    await submitLead(formData);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center animate-in fade-in zoom-in duration-300">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="font-bold text-green-800">Request Sent!</h3>
        <p className="text-sm text-green-700 mt-1">Our academic counselor will call you shortly.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Your Name</label>
        <input 
          name="name" 
          required 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" 
          placeholder="e.g. Pravek" 
        />
      </div>
      
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
        <input 
          name="phone" 
          type="tel" 
          required 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" 
          placeholder="e.g. +91 98765 43210" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Message (Optional)</label>
        <textarea 
          name="message" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" 
          placeholder="I need help with..." 
          rows={3} 
        />
      </div>

      <button 
        disabled={status === "submitting"} 
        className="w-full bg-[#1D1D1F] hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-70 flex justify-center"
      >
        {status === "submitting" ? (
            <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Sending...
            </span>
        ) : "Book Free Demo Call"}
      </button>
      
      <p className="text-[10px] text-center text-gray-400">
        Secure & Confidential. No spam, we promise.
      </p>
    </form>
  );
}