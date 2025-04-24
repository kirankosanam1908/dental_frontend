import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast notifications CSS

const DentistDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirection after logout

  const getRequests = async () => {
    setLoading(true);
    try {
      const res = await API.get("/dentist/requests");
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch requests. Please try again.");
      setLoading(false);
      toast.error("Failed to fetch requests. Please try again."); // Toast notification
    }
  };

  const handleUpload = async (checkupId) => {
    const formData = new FormData();
    const imgs = selectedImages[checkupId] || [];
    const checkupNotes = notes[checkupId] || [];

    if (imgs.length === 0) {
      toast.error("Please select images before uploading.");
      return;
    }

    for (const img of imgs) {
      formData.append("images", img);
    }

    formData.append("notes", JSON.stringify(checkupNotes));
    formData.append("checkupId", checkupId);

    setLoading(true);
    try {
      await API.post("/dentist/upload", formData);
      toast.success("Upload successful!"); // Success toast notification
      localStorage.setItem("checkupUpdated", "true");
      getRequests();
      setLoading(false);
    } catch (err) {
      setError("Error uploading checkup results. Please try again.");
      setLoading(false);
      toast.error("Error uploading checkup results. Please try again.");
    }
  };

  const handleNoteChange = (checkupId, idx, value) => {
    setNotes((prevNotes) => {
      const updatedNotes = { ...prevNotes };
      updatedNotes[checkupId] = updatedNotes[checkupId] || [];
      updatedNotes[checkupId][idx] = value;
      return updatedNotes;
    });
  };

  const handleImageSelect = (checkupId, files) => {
    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [checkupId]: [...files],
    }));
    setNotes((prevNotes) => ({
      ...prevNotes,
      [checkupId]: new Array(files.length).fill(""),
    }));
  };

  const handleLogout = () => {
    // Clear session data (localStorage, cookies)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("checkupUpdated");

    // Redirect to login page using navigate
    navigate("/login");
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 flex justify-between items-center text-white shadow-lg transition-all">
        <h1 className="text-xl font-semibold">Dentist Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Checkup Requests
        </h2>
        {loading && (
          <div className="text-center">
            <div className="spinner-border animate-spin border-4 border-green-600 border-t-transparent rounded-full h-8 w-8"></div>
          </div>
        )}
        {requests.length === 0 && !loading && (
          <div className="text-center text-gray-500">No requests found</div>
        )}
        {requests.map((r) => (
          <div
            key={r._id}
            className="max-w-lg mx-auto mb-6 p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Patient: {r.patient.name}
            </h2>

            <div className="mb-4">
              <input
                type="file"
                multiple
                className="file-input p-2 w-full border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                onChange={(e) => handleImageSelect(r._id, e.target.files)}
              />
            </div>

            {(selectedImages[r._id] || []).map((file, idx) => (
              <div key={idx} className="mb-2">
                <input
                  placeholder={`Note for ${file.name}`}
                  className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  onChange={(e) => handleNoteChange(r._id, idx, e.target.value)}
                />
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => handleUpload(r._id)}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border animate-spin border-4 border-white border-t-transparent rounded-full h-5 w-5"></div>
                ) : (
                  "Upload Results"
                )}
              </button>
              <button
                className="text-green-600 hover:text-green-800 focus:outline-none"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        ))}
        <ToastContainer /> {/* Toast notifications container */}
      </div>
    </div>
  );
};

export default DentistDashboard;
