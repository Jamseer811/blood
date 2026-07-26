"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();

  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  const [bloodFilter, setBloodFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLogin");

    if (isLoggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    fetchDonors();
    fetchRequests();
  }, [router]);

  const fetchDonors = async () => {
    const res = await fetch("/api/donors");
    const data = await res.json();
    setDonors(data.data || []);
  };

  const fetchRequests = async () => {
    const res = await fetch("/api/request-blood");
    const data = await res.json();
    setRequests(data.data || []);
  };

  const handleDeleteDonor = async (id) => {
    if (!confirm("Are you sure you want to delete this donor?")) return;

    const res = await fetch(`/api/donors?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      fetchDonors();
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!confirm("Are you sure you want to delete this blood request?")) return;

    const res = await fetch(`/api/request-blood?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      fetchRequests();
    }
  };

  const updateRequestStatus = async (id, status) => {
    const res = await fetch(`/api/request-blood?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.success) {
      fetchRequests();
    } else {
      alert(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    router.push("/admin-login");
  };

  const filteredDonors = donors.filter((donor) => {
    const matchBlood =
      bloodFilter === "" || donor.bloodGroup === bloodFilter;

    const matchArea =
      areaFilter === "" ||
      donor.area?.toLowerCase().includes(areaFilter.toLowerCase());

    const matchAvailable = !availableOnly || donor.available === true;

    return matchBlood && matchArea && matchAvailable;
  });

  return (
    <main className="min-h-screen bg-[#fff5f5] p-4 md:p-8 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Link
            href="/"
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-red-700"
          >
            ← Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-red-600">
            🩸 Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-black"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-600 font-semibold">Total Donors</h2>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {donors.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-600 font-semibold">Total Requests</h2>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {requests.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-600 font-semibold">Available Donors</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {donors.filter((d) => d.available).length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className="border p-3 rounded-xl text-black bg-white"
            >
              <option value="">All Blood Groups</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>

            <input
              type="text"
              placeholder="Filter Area"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="border p-3 rounded-xl text-black"
            />

            <label className="flex items-center gap-2 text-gray-700 font-semibold">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
              />
              Available Only
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-10 overflow-x-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Registered Donors
          </h2>

          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Area</th>
                <th className="p-3">Available</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-5 text-gray-500">
                    No donors found
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr
                    key={donor._id}
                    className="border-b text-center hover:bg-red-50"
                  >
                    <td className="p-3">{donor.name}</td>
                    <td className="p-3">{donor.email}</td>
                    <td className="p-3">{donor.phone}</td>
                    <td className="p-3 font-bold text-red-600">
                      {donor.bloodGroup}
                    </td>
                    <td className="p-3">{donor.area}</td>
                    <td className="p-3">
                      {donor.available ? (
                        <span className="text-green-600 font-bold">
                          Available
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">
                          Unavailable
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteDonor(donor._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 overflow-x-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Blood Requests
          </h2>

          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3">Patient</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Hospital</th>
                <th className="p-3">Area</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Matched Donors</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-5 text-gray-500">
                    No blood requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b text-center hover:bg-red-50"
                  >
                    <td className="p-3">{request.patientName}</td>

                    <td className="p-3 font-bold text-red-600">
                      {request.bloodGroup}
                    </td>

                    <td className="p-3">{request.hospital}</td>
                    <td className="p-3">{request.area}</td>
                    <td className="p-3">{request.contact}</td>

                    <td className="p-3 font-bold text-red-600">
                      {request.matchedDonors}
                    </td>

                    <td className="p-3">
                      <select
                        value={request.status || "Pending"}
                        onChange={(e) =>
                          updateRequestStatus(request._id, e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 text-black bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteRequest(request._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}