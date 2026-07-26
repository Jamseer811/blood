"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.username === "admin" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("adminLogin", "true");
      router.push("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff5f5] flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          🩸 Admin Login
        </h1>

        <p className="text-gray-600 mb-6">
          Login to access admin dashboard.
        </p>

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl mb-4 text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl mb-5 text-black"
          required
        />

        <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold">
          Login
        </button>
      </form>
    </main>
  );
}