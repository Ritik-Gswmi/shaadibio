import { useEffect } from "react";

function PersonalDetailsForm({ biodata, setBiodata }) {

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const dob = biodata.personalDetails?.dob;
    if (dob) {
      const age = calculateAge(dob);

      setBiodata(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, age }
      }));
    }
  }, [biodata.personalDetails?.dob]);

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Personal Details</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 w-full rounded"
        value={biodata.personalDetails?.name || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, name: e.target.value }
          }))
        }
      />

      <input
        type="date"
        className="border p-2 w-full rounded"
        value={biodata.personalDetails?.dob || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, dob: e.target.value }
          }))
        }
      />

      <input
        type="number"
        placeholder="Age (Auto Calculated)"
        className="border p-2 w-full rounded bg-gray-100"
        value={biodata.personalDetails?.age || ""}
        readOnly
      />

      <input
        type="text"
        placeholder="Height (eg: 5'8)"
        className="border p-2 w-full rounded"
        value={biodata.personalDetails?.height || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, height: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Religion"
        className="border p-2 w-full rounded"
        value={biodata.personalDetails?.religion || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, religion: e.target.value }
          }))
        }
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="public-toggle"
          checked={!!biodata.public}
          onChange={(e) =>
            setBiodata(prev => ({ ...prev, public: e.target.checked }))
          }
        />
        <label htmlFor="public-toggle">Make biodata public</label>
      </div>

    </div>
  );
}

export default PersonalDetailsForm;