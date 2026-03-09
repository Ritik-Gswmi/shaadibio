function EducationForm({ biodata, setBiodata }) {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Education Details</h2>

      <input
        type="text"
        placeholder="Highest Qualification"
        className="border p-2 w-full rounded"
        value={biodata.educationProfession?.education || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            educationProfession: { ...prev.educationProfession, education: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="College / University"
        className="border p-2 w-full rounded"
        value={biodata.educationProfession?.college || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            educationProfession: { ...prev.educationProfession, college: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Occupation"
        className="border p-2 w-full rounded"
        value={biodata.educationProfession?.occupation || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            educationProfession: { ...prev.educationProfession, occupation: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Annual Income"
        className="border p-2 w-full rounded"
        value={biodata.educationProfession?.income || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            educationProfession: { ...prev.educationProfession, income: e.target.value }
          }))
        }
      />

    </div>
  );
}

export default EducationForm;