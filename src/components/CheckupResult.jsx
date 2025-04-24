const CheckupResult = ({ result }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4">
        Checkup by Dr. {result.dentistName}
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {result.images.map((img, idx) => (
          <div key={idx} className="space-y-2">
            <img
              src={`http://localhost:5000/uploads/${img.filename}`}
              alt={`Result ${idx + 1}`}
              className="w-full h-60 object-cover rounded-md border"
            />
            <p className="text-gray-600">{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckupResult;
