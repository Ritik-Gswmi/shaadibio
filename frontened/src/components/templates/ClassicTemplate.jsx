
function ClassicTemplate({ biodata, theme }) {

  const themeColors = {
    blue: "text-blue-700",
    maroon: "text-red-800",
    gold: "text-yellow-600",
  };

  return (
    <div className="bg-white p-6 shadow rounded space-y-3">

      <h2 className={`text-xl font-bold text-center ${themeColors[theme]}`}>
        Classic Biodata
      </h2>

      {biodata.photo && (
    <div className="flex">
    <img
      src={biodata.photo}
      alt="Profile"
      className="w-20 h-20 object-cover rounded-full border"
    />
    </div>
    )}

      <p><b>Name:</b> {biodata.name || "-"}</p>
      <p><b>Age:</b> {biodata.age || "-"}</p>
      <p><b>Height:</b> {biodata.height || "-"}</p>
      <p><b>Religion:</b> {biodata.religion || "-"}</p>

      <hr/>

      <p><b>Education:</b> {biodata.education || "-"}</p>
      <p><b>College:</b> {biodata.college || "-"}</p>
      <p><b>Occupation:</b> {biodata.occupation || "-"}</p>
      <p><b>Income:</b> {biodata.income || "-"}</p>

      <hr/>

      <p><b>Father:</b> {biodata.father || "-"}</p>
      <p><b>Mother:</b> {biodata.mother || "-"}</p>

      <hr/>

      <p><b>Rashi:</b> {biodata.rashi || "-"}</p>
      <p><b>Nakshatra:</b> {biodata.nakshatra || "-"}</p>
      <p><b>Manglik:</b> {biodata.manglik || "-"}</p>

    </div>
  );
}

export default ClassicTemplate;