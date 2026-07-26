import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#d9edf7] text-[#4b6a8f] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="text-5xl text-blue-600 font-bold">
                🩸
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-900">
                  LifeLink
                </h2>

                <p className="text-sm tracking-[4px] uppercase">
                  Blood Donation Portal
                </p>
              </div>
            </div>

            <p className="leading-9 font-semibold">
              LifeLink is a blood donation platform
              connecting donors and patients instantly.
              Our mission is to save lives by making
              blood available quickly during emergencies.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-6">
              Company
            </h3>

            <ul className="space-y-4 font-semibold">
              <li>About Us</li>
              <li>Services</li>
              <li>Features</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-6">
              Support
            </h3>

            <ul className="space-y-4 font-semibold">
              <li>FAQ's</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Support Center</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-6">
              Our Services
            </h3>

            <ul className="space-y-4 font-semibold">
              <li>Donor Registration</li>
              <li>Blood Requests</li>
              <li>Email Alerts</li>
              <li>Emergency Support</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-6">
              Address
            </h3>

            <div className="space-y-6 font-semibold">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-xl" />
                <p>
                  Coimbatore,
                  <br />
                  Tamil Nadu,
                  <br />
                  India - 641001
                </p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 text-xl" />
                <p>
                  support@lifelink.com
                </p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 text-xl" />
                <p>
                  +91 9876543210
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="w-11 h-11 border border-gray-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 border border-gray-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 border border-gray-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 border border-gray-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-300 py-5 text-center font-semibold text-black">
        © 2026 LifeLink Blood Donation Portal. All Rights Reserved.
      </div>
    </footer>
  );
}