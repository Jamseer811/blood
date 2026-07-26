"use client";

import Link from "next/link";
import { useState } from "react";

const coimbatoreAreas = [
  "Gandhipuram",
  "RS Puram",
  "Peelamedu",
  "Singanallur",
  "Saibaba Colony",
  "Ukkadam",
  "Town Hall",
  "Ganapathy",
  "Ramanathapuram",
  "Hope College",
  "Saravanampatti",
  "Kovaipudur",
  "Sundarapuram",
  "Kuniyamuthur",
  "Podanur",
  "Perur",
  "Thudiyalur",
  "Kavundampalayam",
  "Vadavalli",
  "Marudamalai",
  "Kalapatti",
  "Neelambur",
  "Irugur",
  "Ondipudur",
  "Vilankurichi",
  "Race Course",
  "Puliyakulam",
  "Kurichi",
  "Madukkarai",
];

export default function DonorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "Coimbatore",
    area: "",
    age: "",
    gender: "",
    lastDonationDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/donors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        lastDonationDate: formData.lastDonationDate || null,
      }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        city: "Coimbatore",
        area: "",
        age: "",
        gender: "",
        lastDonationDate: "",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 py-10 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-6 text-red-600 font-bold">
          ← Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:block">
            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full text-sm font-bold mb-5">
              🩸 Become a Life Saver
            </span>

            <h1 className="text-5xl font-black text-red-700 leading-tight">
              Register as a Blood Donor
            </h1>

            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Your registration helps patients find matching blood donors
              quickly during emergencies. One donation can save many lives.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-red-100">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="font-bold text-red-600 text-xl">
                  Save Lives
                </h3>
                <p className="text-gray-600 mt-2">
                  Help patients during emergencies.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-red-100">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="font-bold text-red-600 text-xl">
                  Area Based
                </h3>
                <p className="text-gray-600 mt-2">
                  Match with nearby patients.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-md shadow-2xl rounded-[2rem] p-6 md:p-8 border border-red-100"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">🩸</div>

              <h2 className="text-3xl md:text-4xl font-black text-red-600">
                Donor Registration
              </h2>

              <p className="text-gray-600 mt-2">
                Fill your details to become a registered donor.
              </p>
            </div>

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>

            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            >
              <option value="">Select Area</option>
              {coimbatoreAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 font-bold mb-2">
              Last Donation Date
            </label>

            <input
              name="lastDonationDate"
              type="date"
              value={formData.lastDonationDate}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-5 text-black outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] transition"
            >
              {loading ? "Registering..." : "Register Donor"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}