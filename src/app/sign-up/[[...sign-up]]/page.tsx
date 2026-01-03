import { SignUp } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="flex justify-center items-center py-20">
        <SignUp />
      </div>
    </main>
  );
}