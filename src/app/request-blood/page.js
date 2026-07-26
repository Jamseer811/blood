"use client";

import Link from "next/link";
import { useState } from "react";

const areas = [
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

export default function RequestBloodPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    bloodGroup: "",
    city: "Coimbatore",
    area: "",
    hospital: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/request-blood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setResult(data);

    if (data.success) {
      setFormData({
        patientName: "",
        patientEmail: "",
        bloodGroup: "",
        city: "Coimbatore",
        area: "",
        hospital: "",
        contact: "",
      });
    } else {
      alert(data.message);
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
              🚨 Emergency Blood Support
            </span>

            <h1 className="text-5xl font-black text-red-700 leading-tight">
              Request Blood Quickly
            </h1>

            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Submit patient details and LifeLink will search nearby matching
              donors based on blood group and area. Matching donors will receive
              email alerts instantly.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-red-100">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="font-bold text-red-600 text-xl">
                  Nearby Match
                </h3>
                <p className="text-gray-600 mt-2">
                  Finds donors near selected area.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-red-100">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-bold text-red-600 text-xl">
                  Email Alert
                </h3>
                <p className="text-gray-600 mt-2">
                  Sends alert to matching donors.
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
                Blood Request
              </h2>

              <p className="text-gray-600 mt-2">
                Fill patient details to find donors.
              </p>
            </div>

            <input
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <input
              name="patientEmail"
              type="email"
              placeholder="Patient Email"
              value={formData.patientEmail}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

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
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <input
              name="hospital"
              placeholder="Hospital Name"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-4 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <input
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-red-100 bg-red-50/40 p-4 rounded-2xl mb-5 text-black outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] transition"
            >
              {loading ? "Searching Donors..." : "Request Blood"}
            </button>

            {result && (
              <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <h3 className="font-bold text-red-600">
                  Request Submitted
                </h3>

                <p className="text-gray-700 mt-1">
                  Matched Donors:{" "}
                  <span className="font-bold">{result.matchedDonors}</span>
                </p>

                <p className="text-gray-700">
                  Donor Emails Sent:{" "}
                  <span className="font-bold">
                    {result.donorEmailsSent || 0}
                  </span>
                </p>

                <p className="text-gray-700">
                  Patient Email Sent:{" "}
                  <span className="font-bold">
                    {result.patientEmailSent || 0}
                  </span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}