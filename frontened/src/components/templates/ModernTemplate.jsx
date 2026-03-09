
function ModernTemplate({ biodata, theme }) {


  const themeColors = {
  blue: "text-blue-700",
  maroon: "text-red-800",
  gold: "text-yellow-600",
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      
      <h2 className={`text-2xl font-semibold text-center mb-8 ${themeColors[theme]}`}>
        Modern Biodata
      </h2>
      
      <div className="grid grid-cols-3 gap-8">

       <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
    {/* Profile Photo */}
      {biodata.photo ? (
        <img
          src={biodata.photo}
          alt="profile"
          className="w-full h-full object-cover rounded-full border"
        />
      ) : (
       <p>No Photo</p>
      )}

  </div> 
    <div className="col-span-2 grid grid-cols-2 gap-y-3 gap-x-10">
        <p><b>Name:</b> {biodata.name || "-"}</p>
        <p><b>Age:</b> {biodata.age || "-"}</p>

        <p><b>Height:</b> {biodata.height || "-"}</p>
        <p><b>Religion:</b> {biodata.religion || "-"}</p>

        <p><b>Education:</b> {biodata.education || "-"}</p>
        <p><b>College:</b> {biodata.college || "-"}</p>

        <p><b>Occupation:</b> {biodata.occupation || "-"}</p>
        <p><b>Income:</b> {biodata.income || "-"}</p>

        <p><b>Father:</b> {biodata.father || "-"}</p>
        <p><b>Mother:</b> {biodata.mother || "-"}</p>

        <p><b>Rashi:</b> {biodata.rashi || "-"}</p>
        <p><b>Nakshatra:</b> {biodata.nakshatra || "-"}</p>
</div>
      </div>

    </div>
  );
}

export default ModernTemplate;