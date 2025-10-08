"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login(email);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign In</button>
      </form>
    </div>
  );
}
