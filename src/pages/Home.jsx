import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Dental Checkup System
      </h1>

      {/* Buttons Container */}
      <div className="space-x-4 flex justify-center">
        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </Link>

        {/* Register Button */}
        <Link
          to="/register"
          className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
