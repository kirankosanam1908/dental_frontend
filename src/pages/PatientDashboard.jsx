import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast notifications CSS

const PatientDashboard = () => {
  const [dentists, setDentists] = useState([]);
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataUpdated, setDataUpdated] = useState(false); // Track update status
  const navigate = useNavigate(); // For redirection after logout

  // Get list of available dentists
  const getDentists = async () => {
    setLoading(true);
    try {
      const res = await API.get("/user/dentists");
      setDentists(res.data);
    } catch (err) {}
    setLoading(false);
  };

  // Request checkup from the selected dentist
  const applyCheckup = async (dentistId) => {
    try {
      await API.post("/user/apply", { dentistId });
      toast.success("Checkup requested successfully!");
      setDataUpdated(true); // Trigger data update flag
    } catch (err) {}
  };

  // Get the list of checkups for the patient
  const getCheckups = async () => {
    setLoading(true);
    try {
      const res = await API.get("/user/results");
      setCheckups(res.data);
    } catch (err) {}
    setLoading(false);
  };

  // Download the checkup result as PDF
  const downloadPDF = async (id) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get token from localStorage
      const res = await API.get(`/user/export/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `checkup-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      toast.error("Error downloading the PDF. Please try again.");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear session data (localStorage, cookies)
    localStorage.removeItem("accessToken");

    // Redirect to login page
    navigate("/login");
  };

  // Fetch dentists and checkups when component mounts
  useEffect(() => {
    getDentists();
    getCheckups();
  }, []); // Only on initial mount

  // Only fetch checkups again if the data has been updated
  useEffect(() => {
    if (dataUpdated) {
      getCheckups();
      setDataUpdated(false); // Reset flag after fetching the data
    }
  }, [dataUpdated]); // Trigger checkup refetch only when dataUpdated is true

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-400 min-h-screen">
      {/* Navbar */}
      <nav className="bg-transparent p-6 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Patient Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </nav>

      <div className="container mx-auto p-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full border-t-4 border-blue-600 border-8 h-16 w-16 mx-auto"></div>
          </div>
        )}
        {/* Dentists List */}
        <h2 className="text-4xl font-semibold mb-8 text-center text-white drop-shadow-lg">
          Available Dentists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dentists.map((dentist) => (
            <div
              key={dentist._id}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {dentist.name}
              </h3>
              <p className="text-lg text-gray-500">{dentist.email}</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all"
                onClick={() => applyCheckup(dentist._id)}
              >
                Request Checkup
              </button>
            </div>
          ))}
        </div>
        {/* Checkup Results */}
        <h2 className="text-4xl font-semibold mt-12 mb-8 text-center text-white drop-shadow-lg">
          Checkup Results
        </h2>
        <div className="space-y-8">
          {checkups.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No checkup results available.
            </div>
          ) : (
            checkups.map((checkup) => (
              <div
                key={checkup._id}
                className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  From: {checkup.dentist.name}
                </h3>
                <div className="flex flex-wrap gap-6 mt-6">
                  {checkup.images.map((img, idx) => (
                    <div key={idx} className="w-48">
                      <img
                        src={`http://localhost:5000/uploads/${img}`}
                        alt="Checkup"
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                      />
                      <p className="text-sm mt-2 text-gray-600">
                        {checkup.notes[idx]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => downloadPDF(checkup._id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <ToastContainer /> {/* Toast notifications container */}
      </div>
    </div>
  );
};

export default PatientDashboard;
