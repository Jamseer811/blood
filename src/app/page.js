import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 text-gray-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-3xl font-extrabold text-red-600">
            🩸 LifeLink
          </Link>

          <div className="flex flex-wrap justify-center gap-6 font-semibold text-gray-700">
            <Link href="/donor-register" className="hover:text-red-600">
              Donor Register
            </Link>
            <Link href="/request-blood" className="hover:text-red-600">
              Request Blood
            </Link>
            <Link href="/admin-login" className="hover:text-red-600">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
            🚨 Emergency Blood Donor Matching
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-red-700 leading-tight">
            Donate Blood,
            <br />
            Save Lives.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
            LifeLink connects patients with nearby available blood donors in
            Coimbatore through smart area-based matching and instant email
            alerts.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/donor-register"
              className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-red-700 hover:scale-105 transition"
            >
              Become a Donor
            </Link>

            <Link
              href="/request-blood"
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-2xl font-bold shadow hover:bg-red-600 hover:text-white hover:scale-105 transition"
            >
              Request Blood
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-2xl font-black text-red-600">24/7</h3>
              <p className="text-sm text-gray-600">Support</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-2xl font-black text-red-600">Fast</h3>
              <p className="text-sm text-gray-600">Matching</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-2xl font-black text-red-600">Free</h3>
              <p className="text-sm text-gray-600">Service</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-200 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-300 rounded-full blur-2xl"></div>

          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 border border-red-100">
            <div className="text-center">
              <div className="text-8xl mb-4">🩸</div>

              <h2 className="text-3xl font-extrabold text-red-600">
                Emergency Request
              </h2>

              <p className="text-gray-600 mt-2">
                Find nearby donors instantly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-8">
              {["A+", "B+", "O+", "AB+"].map((blood) => (
                <div
                  key={blood}
                  className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-3xl p-6 text-center hover:shadow-lg transition"
                >
                  <h3 className="text-4xl font-black text-red-600">
                    {blood}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Donor Group
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-red-600 text-white rounded-3xl p-5 text-center shadow-lg">
              <h3 className="text-xl font-bold">Need Blood Urgently?</h3>
              <p className="text-red-100 mt-1">
                Submit a request and notify matching donors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-black text-center text-red-700 mb-4">
          Why Choose LifeLink?
        </h2>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A simple, fast, and reliable blood donation platform built to connect
          patients and donors during emergencies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 text-center hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Area Matching
            </h3>
            <p className="text-gray-700">
              Finds donors based on blood group and nearby Coimbatore
              locations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 text-center hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Email Alerts
            </h3>
            <p className="text-gray-700">
              Sends urgent blood request alerts to matching donors instantly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 text-center hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Save Lives
            </h3>
            <p className="text-gray-700">
              Helps patients contact donors quickly during emergency
              situations.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-red-600 text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            One Donation Can Save a Life
          </h2>

          <p className="text-red-100 text-lg mb-8">
            Register today and become a lifesaver in your city.
          </p>

          <Link
            href="/donor-register"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-50 transition"
          >
            Register as Donor
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}