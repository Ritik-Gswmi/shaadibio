function FamilyDetailsForm({ biodata, setBiodata }) {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Family Details</h2>

      <input
        type="text"
        placeholder="Father's Name"
        className="border p-2 w-full rounded"
        value={biodata.familyDetails?.fatherName || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, fatherName: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Father's Occupation"
        className="border p-2 w-full rounded"
        value={biodata.familyDetails?.fatherOccupation || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, fatherOccupation: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Mother's Name"
        className="border p-2 w-full rounded"
        value={biodata.familyDetails?.motherName || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, motherName: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Mother's Occupation"
        className="border p-2 w-full rounded"
        value={biodata.familyDetails?.motherOccupation || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, motherOccupation: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Number of siblings"
        className="border p-2 w-full rounded"
        value={biodata.familyDetails?.siblings || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, siblings: e.target.value }
          }))
        }
      />

    </div>
  );
}

export default FamilyDetailsForm;