"use client";

import { logSession } from "@/app/actions/logSession";
import { useState } from "react";

export default function LogClassForm({ subId, studentName }: { subId: string, studentName: string }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="w-full py-2 bg-[#1D1D1F] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
            >
                Log Class
            </button>
        );
    }

    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase">Log for {studentName}</h4>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
            
            <form 
                action={async (formData) => {
                    // We await the action but ignore its return value to satisfy TypeScript
                    await logSession(formData);
                    setIsOpen(false);
                }} 
                className="space-y-3"
            >
                <input type="hidden" name="subscriptionId" value={subId} />
                
                <input 
                    name="topic" 
                    required 
                    placeholder="Topic Taught (e.g. Guitar Scales)" 
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    name="resourceUrl" 
                    placeholder="Drive/Notes Link (Optional)" 
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="w-full py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700">
                    ✅ Mark Completed
                </button>
            </form>
        </div>
    );
}