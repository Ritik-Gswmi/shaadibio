function PhotoUpload({ biodata, setBiodata }) {

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // restrict size to 2MB and type JPG/PNG
    const allowed = ["image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG or PNG images are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setBiodata(prev => ({
        ...prev,
        photo: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">

      <h3 className="text-xl font-semibold">
        Profile Photo
      </h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {biodata.photo && (
        <img
          src={biodata.photo}
          alt="preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}

    </div>
  );
}

export default PhotoUpload;