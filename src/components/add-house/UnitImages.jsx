import { useRef } from "react";

const UnitImages = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);
  const images = formData?.images ?? [];

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const mapped = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...(prev?.images || []), ...mapped],
    }));

    // عشان يسمح برفع نفس الملف مرة تانية لو حابب
    e.target.value = "";
  };

  const handleDelete = (id) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev?.images || []).filter((img) => img.id !== id),
    }));
  };

  return (
    <div className="unit-images">
      <h2>كملنا خطوات مميزة باقي خطوات بسيطة !</h2>
      <p>اقل شئ 06 صور لإكمال النشر.</p>

      {/* منطقة الرفع الكبيرة */}
      <div className="unit-images-upload" onClick={openFileDialog}>
        <div className="upload-inner">
          <div className="upload-icon-circle">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <div className="upload-text">
            <span>
              قم <button type="button" onClick={openFileDialog}>بتحميل</button>{" "}
              الصور من هنا
            </span>
            <small>png - jpeg</small>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png, image/jpeg"
          onChange={handleFilesChange}
          style={{ display: "none" }}
        />
      </div>

      {/* الصف السفلي: كرت إضافة + الصور المصغرة + ملاحظة */}
      {images.length > 0 && (
        <div className="unit-images-bottom">
          <div className="unit-images-thumbs">
            {/* الصور المرفوعة */}
            {images.map((img) => (
              <div className="thumb-card" key={img.id}>
                <button
                  type="button"
                  className="thumb-delete"
                  onClick={() => handleDelete(img.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <img src={img.preview} alt="unit" />
              </div>
            ))}
            {/* كرت إضافة صورة جديدة */}
            <button
              type="button"
              className="thumb-card add-card"
              onClick={openFileDialog}
            >
              <div className="add-inner">
                <div className="add-plus">+</div>
                <span>إضافة</span>
              </div>
            </button>

          </div>

          <p className="unit-images-note">
            ملاحظة : يمكنك ترتيب الصور كما تشاء فقط بسحبها ...
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitImages;
