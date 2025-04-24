const DentistCard = ({ dentist, onRequest }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-lg">
        {dentist.name.charAt(0)}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">
        {dentist.name}
      </h3>
      <p className="text-gray-500 mb-4">
        {dentist.speciality || "General Dentist"}
      </p>
      <button
        onClick={() => onRequest(dentist._id)}
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Request Checkup
      </button>
    </div>
  );
};

export default DentistCard;
