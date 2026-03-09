function HoroscopeForm({ biodata, setBiodata }) {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Horoscope Details</h2>

      <input
        type="text"
        placeholder="Rashi"
        className="border p-2 w-full rounded"
        value={biodata.horoscope?.rashi || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            horoscope: { ...prev.horoscope, rashi: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Nakshatra"
        className="border p-2 w-full rounded"
        value={biodata.horoscope?.nakshatra || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            horoscope: { ...prev.horoscope, nakshatra: e.target.value }
          }))
        }
      />

      <input
        type="text"
        placeholder="Manglik (Yes / No)"
        className="border p-2 w-full rounded"
        value={biodata.horoscope?.manglik || ""}
        onChange={(e) =>
          setBiodata(prev => ({
            ...prev,
            horoscope: { ...prev.horoscope, manglik: e.target.value }
          }))
        }
      />

    </div>
  );
}

export default HoroscopeForm;