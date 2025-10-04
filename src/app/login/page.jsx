"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function login(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save JWT in localStorage
      localStorage.setItem("token", data.token);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setMessage(data.error || "Login failed");
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={login} className="flex flex-col gap-2 mb-2 w-64">
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
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Login
        </button>
      </form>

      <button
        onClick={() => router.push("/register")}
        className="text-blue-600 underline"
      >
        Don’t have an account? Register
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
