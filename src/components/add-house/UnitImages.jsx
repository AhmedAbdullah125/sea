import { useRef } from "react";
import { toast } from "sonner";

const UnitImages = ({ formData, setFormData, setStepDone }) => {
  const fileInputRef = useRef(null);
  const images = formData?.images ?? [];
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Validate file sizes
    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    // Show error message if there are invalid files
    if (invalidFiles.length > 0) {
      toast.error(
        `الملفات التالية تتجاوز الحد الأقصى 2 ميجابايت: ${invalidFiles.join(", ")}`
      );
    }

    // Only process valid files
    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    const mapped = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => {
      const updatedImages = [...(prev?.images || []), ...mapped];

      // Check if we now have 6 or more images
      if (updatedImages.length >= 6) {
        setStepDone(6);
      }

      return {
        ...prev,
        images: updatedImages,
      };
    });

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
