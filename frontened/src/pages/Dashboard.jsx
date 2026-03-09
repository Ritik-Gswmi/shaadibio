import { useState, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import PersonalDetailsForm from "../components/forms/PersonDetailsForm";
import FamilyDetailsForm from "../components/forms/FamilyDetailsForm";
import EducationForm from "../components/forms/EducationForm";
import HoroscopeForm from "../components/forms/HoroscopeForm";
import PhotoUpload from "../components/forms/PhotoUpload";
import ProfileForm from "../components/forms/ProfileForm";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import BiodataPreview from "../components/preview/BiodataPreview";

import { BiodataContext } from "../context/BiodataContext";

function Dashboard() {

  const [activeSection, setActiveSection] = useState("personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // get biodata from context
  const { biodata, setBiodata, saveBiodata } = useContext(BiodataContext);

  const renderSection = () => {

    switch (activeSection) {

      case "personal":
        return (
          <PersonalDetailsForm
            biodata={biodata}
            setBiodata={setBiodata}
          />
        );

      case "family":
        return (
          <FamilyDetailsForm
            biodata={biodata}
            setBiodata={setBiodata}
          />
        );

      case "education":
        return (
          <EducationForm
            biodata={biodata}
            setBiodata={setBiodata}
          />
        );

      case "horoscope":
        return (
          <HoroscopeForm
            biodata={biodata}
            setBiodata={setBiodata}
          />
        );

      case "photo":
        return (
          <PhotoUpload
            biodata={biodata}
            setBiodata={setBiodata}
          />
        );

      case "profile":
        return <ProfileForm />;

      case "password":
        return <ChangePasswordForm />;

      case "preview":
        return (
          <div>
            <BiodataPreview biodata={biodata} />

            {/*  Save Biodata Button */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={saveBiodata}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Save Biodata
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(biodata,null,2)],{type:'application/json'});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'biodata.json';
                  a.click();
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Export JSON
              </button>
              <input
                type="file"
                accept="application/json"
                className="hidden"
                id="import-json"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const obj = JSON.parse(reader.result);
                      // if incoming JSON is already using the nested schema just set it
                      if (obj.personalDetails) {
                        setBiodata(obj);
                      } else {
                        // convert flat -> nested
                        setBiodata({
                          personalDetails: {
                            name: obj.name || "",
                            dob: obj.dob || "",
                            age: obj.age || "",
                            height: obj.height || "",
                            religion: obj.religion || ""
                          },
                          familyDetails: {
                            fatherName: obj.father || "",
                            fatherOccupation: obj.fatherOccupation || "",
                            motherName: obj.mother || "",
                            motherOccupation: obj.motherOccupation || "",
                            siblings: obj.siblings || ""
                          },
                          educationProfession: {
                            education: obj.education || "",
                            occupation: obj.occupation || "",
                            income: obj.income || ""
                          },
                          horoscope: {
                            rashi: obj.rashi || "",
                            nakshatra: obj.nakshatra || "",
                            manglik: obj.manglik || ""
                          },
                          photo: obj.photo || "",
                          public: obj.public || false,
                          template: obj.template || "premium"
                        });
                      }
                    } catch (err) {
                      alert('Invalid JSON');
                    }
                  };
                  reader.readAsText(file);
                }}
              />
              <label htmlFor="import-json" className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 cursor-pointer">
                Import JSON
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">

      <Navbar onToggle={() => setSidebarOpen(o => !o)} />

      <div className="flex flex-1">

        {sidebarOpen && (
          <Sidebar setActiveSection={setActiveSection} />
        )}

        <div className="flex-1 p-6 overflow-y-auto">
          {renderSection()}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;