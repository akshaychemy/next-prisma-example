"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  // Add user function
  async function addUser(e) {
    e.preventDefault(); // prevent form submission reload

    if (!name || !email) return alert("Please fill in both fields");

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await fetch("/api/users");
    setUsers(await res.json());

    // Clear form
    setName("");
    setEmail("");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>

      {/* Form to add user */}
      <form onSubmit={addUser} className="my-4 flex flex-col gap-2 max-w-sm">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add User
        </button>
      </form>

      {/* User list */}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
