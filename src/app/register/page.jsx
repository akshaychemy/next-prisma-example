"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function register(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test User", email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Registered successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setMessage(data.error || "Registration failed");
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={register} className="flex flex-col gap-2 mb-2 w-64">
        <input
          type="email"
          placeholder="Email"
          className="border px-2 py-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Register
        </button>
      </form>

      <button
        onClick={() => router.push("/login")}
        className="text-blue-600 underline"
      >
        Already have an account? Login
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
