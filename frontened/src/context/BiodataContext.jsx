import { createContext, useState } from "react";
import { API_URL, getAuthHeaders } from "../utils/api";

// eslint-disable-next-line react-refresh/only-export-components
export const BiodataContext = createContext();

export const BiodataProvider = ({ children }) => {

  // keep an empty template that mirrors the backend schema
  const emptyBiodata = {
    personalDetails: {
      name: "",
      dob: "",
      age: "",
      height: "",
      religion: ""
    },
    familyDetails: {
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      siblings: ""
    },
    educationProfession: {
      education: "",
      college: "",
      occupation: "",
      income: ""
    },
    horoscope: {
      rashi: "",
      nakshatra: "",
      manglik: ""
    },
    photo: "",
    public: false,
    template: "premium"
  };

  const [biodata, setBiodata] = useState(emptyBiodata);

  // Save biodata to backend
  const saveBiodata = async () => {
    // simple client validation - guard against the common missing-nested-fields bug
    if (!biodata.personalDetails?.name || !biodata.personalDetails?.dob) {
      alert("Please fill out name and DOB");
      return;
    }

    // before sending, strip out any empty-string properties so the server/db
    // doesn't end up persisting blank fields (e.g. manglik when user never set it)
    const clean = (obj) => {
      if (obj == null || typeof obj !== "object") return obj;
      const output = Array.isArray(obj) ? [] : {};
      Object.entries(obj).forEach(([k, v]) => {
        if (v === "" || v == null) return; // drop empty
        if (typeof v === "object") {
          const nested = clean(v);
          if (
            nested &&
            (Array.isArray(nested)
              ? nested.length > 0
              : Object.keys(nested).length > 0)
          ) {
            output[k] = nested;
          }
        } else {
          output[k] = v;
        }
      });
      return output;
    };
    let payload = clean(biodata);
    // modern template doesn't include manglik - always remove it
    if (payload.template === "modern" && payload.horoscope) {
      delete payload.horoscope.manglik;
      if (Object.keys(payload.horoscope).length === 0) {
        delete payload.horoscope;
      }
    }

    try {
      const res = await fetch(
        `${API_URL}/biodata/create`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Biodata saved successfully", data);
        alert("Biodata saved successfully");
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save biodata");
    }
  };


  // Fetch biodata from backend
  const fetchBiodata = async () => {

    try {

      const res = await fetch(
        `${API_URL}/biodata/user`,
        {
          headers: getAuthHeaders()
        }
      );

      const data = await res.json();

      if (res.ok) {
        // make sure we always have the full shape so forms won't blow up
        if (data && !data.personalDetails) {
          // convert flat document into nested format
          const normalized = {
            personalDetails: {
              name: data.name || "",
              dob: data.dob || "",
              age: data.age || "",
              height: data.height || "",
              religion: data.religion || ""
            },
            familyDetails: {
              fatherName: data.father || "",
              fatherOccupation: data.fatherOccupation || "",
              motherName: data.mother || "",
              motherOccupation: data.motherOccupation || "",
              siblings: data.siblings || ""
            },
            educationProfession: {
              education: data.education || "",
              occupation: data.occupation || "",
              income: data.income || ""
            },
            horoscope: {
              rashi: data.rashi || "",
              nakshatra: data.nakshatra || "",
              manglik: data.manglik || ""
            },
            photo: data.photo || "",
            public: data.public || false,
            template: data.template || "premium"
          };
          setBiodata(normalized);
        } else {
          setBiodata(data || emptyBiodata);
        }
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <BiodataContext.Provider
      value={{
        biodata,
        setBiodata,
        saveBiodata,
        fetchBiodata
      }}
    >
      {children}
    </BiodataContext.Provider>
  );
};