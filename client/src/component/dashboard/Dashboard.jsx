import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ownerData = localStorage.getItem("owner");
    if (ownerData) {
      setUser(JSON.parse(ownerData));
    } else {

    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome, {user?.name}</h2>
        <p className="mt-2 text-lg text-gray-600">Email: {user?.email}</p>
      </div>

      {/* Ticket Section */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Your Submitted Tickets</h3>
        <ul className="space-y-4">
          <li className="p-4 bg-gray-100 border-l-4 border-yellow-500 rounded-lg shadow-md">
            <span className="font-semibold">Road Repair</span> - <span className="text-yellow-600">Pending</span>
          </li>
          <li className="p-4 bg-gray-100 border-l-4 border-green-500 rounded-lg shadow-md">
            <span className="font-semibold">Water Supply Issue</span> - <span className="text-green-600">Resolved</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
