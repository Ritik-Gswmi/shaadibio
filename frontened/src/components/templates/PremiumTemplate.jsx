import { useContext } from "react";
import { BiodataContext } from "../../context/BiodataContext";


function PremiumTemplate({ biodata, theme }) {

  const { biodata: contextBiodata } = useContext(BiodataContext);

  const data = { ...contextBiodata, ...biodata };

 

  const themeColors = {
  blue: "text-blue-700",
  maroon: "text-red-800",
  gold: "text-yellow-600",
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

      <h2 className={`text-2xl font-semibold text-center mb-8 ${themeColors[theme]}`}>
        Premium Biodata
      </h2>

      {/* Profile Header */}

      <div className="flex items-center gap-6 mb-6">

        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

          {/* Profile Photo */}
      {data.photo ? (
        <img
          src={biodata.photo}
          alt="profile"
          className="w-32 h-32 object-cover rounded-lg"
        />
      ) : (
        <p>No Photo</p>
      )}

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            {biodata.name || "Your Name"}
          </h1>

          <p className="text-gray-600 mt-1">
            Age: {biodata.age || "-"} | Height: {biodata.height || "-"}
          </p>

          <p className="text-gray-600">
            Religion: {biodata.religion || "-"}
          </p>

        </div>

      </div>

      <hr className="mb-6"/>

      {/* Personal Details */}

      <h2 className={`text-xl font-semibold border-b-2 pb-1 ${themeColors[theme]}`}>
        Personal Details
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <p><b>Date of Birth:</b> {biodata.dob || "-"}</p>
        <p><b>Age:</b> {biodata.age || "-"}</p>

        <p><b>Height:</b> {biodata.height || "-"}</p>
        <p><b>Religion:</b> {biodata.religion || "-"}</p>

      </div>

      <hr className="mb-6"/>

      {/* Education */}

      <h2 className={`text-xl font-semibold border-b-2 pb-1 ${themeColors[theme]}`}>
        Education & Career
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <p><b>Highest Education:</b> {biodata.education || "-"}</p>
        <p><b>Profession:</b> {biodata.occupation || "-"}</p>

        <p><b>College:</b> {biodata.college || "-"}</p>
        <p><b>Income:</b> {biodata.income || "-"}</p>

      </div>

      <hr className="mb-6"/>

      {/* Family */}

      <h2 className={`text-xl font-semibold border-b-2 pb-1 ${themeColors[theme]}`}>
        Family Details
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <p><b>Father:</b> {biodata.father || "-"}</p>
        <p><b>Father Occupation:</b> {biodata.fatherOccupation || "-"}</p>

        <p><b>Mother:</b> {biodata.mother || "-"}</p>
        <p><b>Mother Occupation:</b> {biodata.motherOccupation || "-"}</p>

        <p><b>Siblings:</b> {biodata.siblings || "-"}</p>

      </div>

      <hr className="mb-6"/>

      {/* Horoscope */}

      <h2 className={`text-xl font-semibold border-b-2 pb-1 ${themeColors[theme]}`}>
        Horoscope Details
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <p><b>Rashi:</b> {biodata.rashi || "-"}</p>
        <p><b>Nakshatra:</b> {biodata.nakshatra || "-"}</p>

        <p><b>Manglik:</b> {biodata.manglik || "-"}</p>

      </div>

    </div>
  );
}

export default PremiumTemplate;