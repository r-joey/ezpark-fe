import ezparkHero from './assets/ezpark-hero.png'; 
export default function App() { 
  return ( 
    <> 
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Reserve Your Parking Spot{' '}
            <span className="text-blue-600">Effortlessly</span>
          </h1>
          <p className="text-lg text-gray-600">
            Say goodbye to circling the block. EZ-Park lets you find and book parking in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
             
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Learn More
            </a>
          </div>
        </div>
        <img
          src={ezparkHero}
          alt="Illustration of car in a parking spot"
          className=" h-64 md:h-100 w-full md:w-1/2 rounded-lg shadow-lg mb-10 md:mb-0 object-cover"
        />
      </section>

      <section id="features" className="bg-gray-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose EZ-Park?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Real-Time Availability</h3>
            <p className="text-gray-600">
              See which spots are available in real-time so you never waste time searching.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">One-Tap Booking</h3>
            <p className="text-gray-600">
              Reserve a parking spot in just one tap—fast, easy, and reliable.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              Your reservations and payment info are protected with bank-level security.
            </p>
          </div>
        </div>
      </section> 
      </>
  );
}
