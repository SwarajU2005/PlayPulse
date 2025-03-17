import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";
import Login from "../account/Login";
import LoginAowner from "../account/LoginAowner";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showAlogin, setShowAlogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <Calendar className="w-8 h-8 text-blue-600 hover:text-blue-700 transition-colors" />
            <span className="text-2xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors">
              PulsePlay
            </span>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Arena Owner Button */}
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowAlogin(true)}
            >
              Arena Owner
            </button>

            {/* Profile Icon */}
            <button onClick={() => setShowLogin(true)} className="focus:outline-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" // Updated icon URL
                alt="Profile"
                className="w-10 h-10 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl leading-tight">
          Book Your Perfect{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sports Arena
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto">
          Find and book sports facilities in your area. Quick, easy, and secure.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex justify-center">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3 hover:shadow-xl transition-shadow duration-300">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for sports arenas..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Search
            </button>
          </div>
        </div>
      </main>

      {/* Render Login Component Conditionally */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showAlogin && <LoginAowner onClose={() => setShowAlogin(false)} />}
    </div>
  );
}

export default Home;
