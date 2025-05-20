import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

export default function RepairForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedFileName, setSelectedFileName] = useState(
    "Niciun fișier selectat"
  );
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("Niciun fișier selectat");
  const acceptContact = watch("acceptContact");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === "file" && data[key]?.length > 0) {
          formData.append("file", data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const token = document.querySelector(
        'input[name="cf-turnstile-response"]'
      )?.value;
      if (token) formData.append("cf-turnstile-response", token);

      const response = await fetch("/api/sendRepairRequest", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Eroare la trimiterea formularului");
      alert("Cererea a fost trimisă cu succes!");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  const handleFileLabelClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("Niciun fișier selectat");
    }
  };

  return (
    <form
      className="text-dark repairForm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h4>Cerere de reparație</h4>

      {/* Full Name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Nume complet
        </label>
        <input
          type="text"
          className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
          id="fullName"
          placeholder="Ex: Andrei Popescu"
          {...register("fullName", { required: "Numele este obligatoriu" })}
        />
        <div className="text-danger small mt-1">{errors.fullName?.message}</div>
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Număr de telefon
        </label>
        <input
          type="tel"
          className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
          id="phoneNumber"
          placeholder="Ex: 07xxxxxxxx"
          {...register("phoneNumber", {
            required: "Numărul de telefon este obligatoriu",
            pattern: {
              value: /^07\d{8}$/,
              message: "Număr invalid (ex: 07xxxxxxxx)",
            },
          })}
        />
        <div className="text-danger small mt-1">
          {errors.phoneNumber?.message}
        </div>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="emailAddress" className="form-label">
          Adresă de email
        </label>
        <input
          type="email"
          className={`form-control ${errors.emailAddress ? "is-invalid" : ""}`}
          id="emailAddress"
          placeholder="Ex: exemplu@email.com"
          {...register("emailAddress", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Adresă de email invalidă",
            },
          })}
        />
        <div className="text-danger small mt-1">
          {errors.emailAddress?.message}
        </div>
      </div>

      {/* Device Type */}
      <div className="mb-3">
        <label htmlFor="deviceType" className="form-label">
          Tip dispozitiv
        </label>
        <select
          id="deviceType"
          className={`form-select ${errors.deviceType ? "is-invalid" : ""}`}
          defaultValue=""
          {...register("deviceType", {
            required: "Alege un dispozitiv",
          })}
        >
          <option value="" disabled>
            Alege un dispozitiv
          </option>
          <option value="telefon">Telefon</option>
          <option value="tableta">Tabletă</option>
          <option value="laptop">Laptop</option>
          <option value="gps">GPS</option>
        </select>
        <div className="text-danger small mt-1">
          {errors.deviceType?.message}
        </div>
      </div>

      {/* Brand & Model */}
      <div className="mb-3">
        <label htmlFor="brandModel" className="form-label">
          Marcă și model
        </label>
        <input
          type="text"
          className="form-control"
          id="brandModel"
          placeholder="Ex: Samsung Galaxy S21"
          {...register("brandModel")}
        />
      </div>

      {/* File Upload */}
      <div className="custom-file-upload mb-3">
        <label
          className="custom-file-label"
          onClick={handleFileLabelClick}
          style={{ cursor: "pointer" }}
        >
          Atașează o imagine (opțional)
        </label>
        <input
          className="file-upload"
          name="file"
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <span className="file-name">{selectedFileName}</span>
        <div id="fileError" className="text-danger"></div>
      </div>

      {/* Problem Description */}
      <div className="mb-3">
        <label htmlFor="problemDescription" className="form-label">
          Descrierea problemei
        </label>
        <textarea
          className="form-control"
          id="problemDescription"
          rows="3"
          placeholder="Scrie aici ce problemă are dispozitivul..."
          {...register("problemDescription")}
        ></textarea>
      </div>

      {/* Accept Contact */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptContact"
          {...register("acceptContact")}
        />
        <label className="form-check-label" htmlFor="acceptContact">
          Sunt de acord să fiu contactat(ă) cu privire la această cerere.
        </label>
      </div>

      {/* Preferred Contact */}
      {acceptContact && (
        <div className="mb-3 transition-collapse" id="preferredContactGroup">
          <label htmlFor="preferredContact" className="form-label">
            Cum preferi să fii contactat(ă)?
          </label>
          <select
            className="form-select"
            id="preferredContact"
            {...register("preferredContact")}
          >
            <option value="Telefon">Telefon</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
      )}

      {/* Turnstile */}
      <div
        className="cf-turnstile d-flex justify-content-center mb-3"
        data-sitekey="0x4AAAAAABdALOY-DswhxzbS"
      ></div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting && (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <span>Trimite cererea</span>
      </button>
    </form>
  );
}
