import { useState, useContext, useEffect } from "react";
import { BiodataContext } from "../../context/BiodataContext";
import html2pdf from "html2pdf.js";

import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import PremiumTemplate from "../templates/PremiumTemplate";

function BiodataPreview({ biodata }) {

   const { biodata: contextBiodata } = useContext(BiodataContext);

  // helper to convert new nested shape into legacy flat structure used by templates
  const flatten = (bd) => ({
    name: bd.personalDetails?.name || "",
    dob: bd.personalDetails?.dob || "",
    age: bd.personalDetails?.age || "",
    height: bd.personalDetails?.height || "",
    religion: bd.personalDetails?.religion || "",
    education: bd.educationProfession?.education || "",
    college: bd.educationProfession?.college || "",
    occupation: bd.educationProfession?.occupation || "",
    income: bd.educationProfession?.income || "",
    father: bd.familyDetails?.fatherName || "",
    fatherOccupation: bd.familyDetails?.fatherOccupation || "",
    mother: bd.familyDetails?.motherName || "",
    motherOccupation: bd.familyDetails?.motherOccupation || "",
    siblings: bd.familyDetails?.siblings || "",
    rashi: bd.horoscope?.rashi || "",
    nakshatra: bd.horoscope?.nakshatra || "",
    manglik: bd.horoscope?.manglik || "",
    photo: bd.photo,
    public: bd.public,
    template: bd.template
  });

  const data = { ...flatten(contextBiodata), ...flatten(biodata) };

  const { setBiodata } = useContext(BiodataContext);

  const [template, setTemplate] = useState(data.template || "premium");
  const [theme, setTheme] = useState("blue");
  const [font, setFont] = useState("sans");
  const [textSize, setTextSize] = useState("base");

  // whenever the template choice changes update the shared biodata so the server sees it
  useEffect(() => {
    setBiodata(prev => ({ ...prev, template }));
  }, [template, setBiodata]);

  const downloadPDF = () => {

    const element = document.getElementById("biodata-preview");

    const opt = {
      margin: 0.5,
      filename: "shaadibio-biodata.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
  };


  const renderTemplate = () => {

    if (template === "classic")
      return <ClassicTemplate biodata={data} theme={theme} />;

    if (template === "modern")
      return <ModernTemplate biodata={data} theme={theme} />;

    if (template === "premium")
      return <PremiumTemplate biodata={data} theme={theme} />;
  };

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        Biodata Preview
        {data.public ? (
          <span className="ml-4 text-green-600 font-medium">(Public)</span>
        ) : (
          <span className="ml-4 text-red-600 font-medium">(Private)</span>
        )}
      </h1>

      <div className="mb-6 flex gap-3 flex-wrap">

        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="premium">Premium Template</option>
          <option value="classic">Classic Template</option>
          <option value="modern">Modern Template</option>
        </select>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="blue">Blue</option>
          <option value="maroon">Maroon</option>
          <option value="gold">Gold</option>
        </select>
        <select
          value={font}
          onChange={(e)=>setFont(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="sans">Sans</option>
          <option value="serif">Serif</option>
          <option value="mono">Monospace</option>
        </select>
        <select
          value={textSize}
          onChange={(e)=>setTextSize(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="sm">Small</option>
          <option value="base">Normal</option>
          <option value="lg">Large</option>
        </select>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>

      </div>

      {
        /* map size values to explicit tailwind classes so purge picks them up */
      }
      <div
        id="biodata-preview"
        className={
          `${font === 'serif' ? 'font-serif' : font === 'mono' ? 'font-mono' : 'font-sans'} ` +
          (textSize === 'sm'
            ? 'text-sm'
            : textSize === 'lg'
            ? 'text-lg'
            : 'text-base')
        }
      >
        <div className="bg-white shadow-lg p-6 rounded-lg">
          {renderTemplate()}
        </div>
      </div>

    </div>
  );
}

export default BiodataPreview;