"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
        },
      });

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
    }

    fetchUser();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </main>
  );
}
