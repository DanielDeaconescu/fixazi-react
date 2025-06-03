import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import PropTypes from "prop-types"; // Import PropTypes for type checking

export default function RepairForm({ theme = "dark" }) {
  const navigate = useNavigate();

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
  const turnstileWidgetRef = useRef(null);
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const acceptContact = watch("acceptContact");

  // Determine text and background colors based on theme
  const textColor = theme === "dark" ? "text-white" : "text-dark";
  const bgColor = theme === "dark" ? "bg-dark" : "bg-white";
  const formClass = `repairForm ${textColor} ${
    theme === "dark" ? "dark-theme" : "light-theme"
  }`;

  // Custom styles for different themes
  const customFileUploadStyle =
    theme === "dark"
      ? {
          borderColor: "#ffffff40",
          backgroundColor: "#ffffff10",
          color: "white",
        }
      : {
          borderColor: "#dee2e6",
          backgroundColor: "#f8f9fa",
          color: "#212529",
        };

  const customFileLabelStyle = {
    ...(theme === "dark"
      ? {
          color: "white",
          backgroundColor: "#ffffff20",
        }
      : {
          color: "#212529",
          backgroundColor: "#f8f9fa",
        }),
    cursor: "pointer",
  };

  useEffect(() => {
    // Check if script is already in the DOM
    const existingScript = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    // Store the current ref value in a variable
    const currentTurnstileRef = turnstileWidgetRef.current;

    if (existingScript) {
      // If script exists but Turnstile isn't loaded yet, wait for it
      if (!window.turnstile) {
        existingScript.onload = () => initializeTurnstile();
      } else {
        initializeTurnstile();
      }
      return;
    }

    // Only load Turnstile if it's not already loaded
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeTurnstile();
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup Turnstile widget when component unmounts
      if (window.turnstile && currentTurnstileRef) {
        window.turnstile.remove(currentTurnstileRef);
      }
    };
  }, []);

  const initializeTurnstile = () => {
    if (
      window.turnstile &&
      turnstileWidgetRef.current &&
      !turnstileWidgetRef.current.hasChildNodes()
    ) {
      window.turnstile.render(turnstileWidgetRef.current, {
        sitekey: "0x4AAAAAABeH0IacZo6bEcT8",
        callback: (token) => {
          setTurnstileToken(token);
          setIsTurnstileReady(true);
        },
        "expired-callback": () => {
          setTurnstileToken(null);
          setIsTurnstileReady(false);
        },
        "error-callback": () => {
          setTurnstileToken(null);
          setIsTurnstileReady(false);
        },
      });
    }
  };

  const onSubmit = async (data) => {
    console.log("Form data before submission:", data);

    try {
      if (!isTurnstileReady || !turnstileToken) {
        alert("Vă rugăm să completați verificarea Turnstile");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "file") {
          if (data.file && data.file[0]) {
            formData.append("file", data.file[0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });
      formData.append("cf-turnstile-response", turnstileToken);

      console.log("Sending request to backend...");
      const response = await fetch("/api/sendRepairRequest", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      const responseData = await response.json().catch((e) => {
        console.error("JSON parse error:", e);
        throw new Error("Invalid JSON response");
      });
      console.log("Response data:", responseData);

      if (response.status === 429 && responseData.reason === "limit-reached") {
        navigate("/too-many-requests");

        // Modal cleanup
        const modalEl = document.getElementById("formModal");
        const modalInstance = Modal.getInstance(modalEl);
        modalInstance?.hide();
        document.body.classList.remove("modal-open");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
      } else if (response.ok && responseData.success) {
        navigate("/submitted");
        // Modal cleanup code...
        const modalEl = document.getElementById("formModal");
        const modalInstance = Modal.getInstance(modalEl);
        modalInstance?.hide();
        document.body.classList.remove("modal-open");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
      } else {
        console.error("Backend response indicates failure:", responseData);
        alert(
          `Eroare: ${responseData.message || "Nicio explicație furnizată"}`
        );
      }

      // Reset Turnstile...
      if (window.turnstile && turnstileWidgetRef.current) {
        window.turnstile.reset(turnstileWidgetRef.current);
        setTurnstileToken(null);
        setIsTurnstileReady(false);
      }
    } catch (err) {
      console.error("Full error details:", {
        message: err.message,
        stack: err.stack,
        response: err.response,
      });
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
    <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h4>Cerere de reparație</h4>

      {/* Full Name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Nume complet
        </label>
        <input
          type="text"
          className={`form-control ${errors.fullName ? "is-invalid" : ""} ${
            theme === "dark"
              ? "bg-dark text-white border-light placeholder-white"
              : ""
          }`}
          id="fullName"
          placeholder="Ex: Andrei Popescu"
          {...register("fullName", { required: "Numele este obligatoriu" })}
        />
        <div
          className={`small mt-1 ${
            errors.fullName ? "text-danger" : "text-muted"
          }`}
        >
          {errors.fullName?.message}
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Număr de telefon
        </label>
        <input
          type="tel"
          className={`form-control ${errors.phoneNumber ? "is-invalid" : ""} ${
            theme === "dark"
              ? "bg-dark text-white border-light placeholder-white"
              : ""
          }`}
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
        <div
          className={`small mt-1 ${
            errors.phoneNumber ? "text-danger" : "text-muted"
          }`}
        >
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
          className={`form-control ${errors.emailAddress ? "is-invalid" : ""} ${
            theme === "dark"
              ? "bg-dark text-white border-light placeholder-white"
              : ""
          }`}
          id="emailAddress"
          placeholder="Ex: exemplu@email.com"
          {...register("emailAddress", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Adresă de email invalidă",
            },
          })}
        />
        <div
          className={`small mt-1 ${
            errors.emailAddress ? "text-danger" : "text-muted"
          }`}
        >
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
          className={`form-select ${errors.deviceType ? "is-invalid" : ""} ${
            theme === "dark" ? "bg-dark text-white border-light" : ""
          }`}
          defaultValue=""
          {...register("deviceType", {
            required: "Alege un dispozitiv",
          })}
        >
          <option
            value=""
            disabled
            className={theme === "dark" ? "text-muted" : ""}
          >
            Alege un dispozitiv
          </option>
          <option value="telefon">Telefon</option>
          <option value="tableta">Tabletă</option>
          <option value="laptop">Laptop</option>
          <option value="gps">GPS</option>
        </select>
        <div
          className={`small mt-1 ${
            errors.deviceType ? "text-danger" : "text-muted"
          }`}
        >
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
          className={`form-control ${
            theme === "dark" ? "bg-dark text-white border-light" : ""
          }`}
          id="brandModel"
          placeholder="Ex: Samsung Galaxy S21"
          {...register("brandModel")}
        />
      </div>

      {/* File Upload */}
      <div
        className="custom-file-upload mb-3 p-2 rounded"
        style={customFileUploadStyle}
      >
        <label
          className="custom-file-label me-2 p-2 rounded"
          onClick={handleFileLabelClick}
          style={customFileLabelStyle}
        >
          Atașează o imagine (opțional)
        </label>
        <input
          {...register("file")}
          className="file-upload"
          name="file"
          type="file"
          ref={(e) => {
            fileInputRef.current = e;
            register("file").ref(e);
          }}
          style={{ display: "none" }}
          onChange={(e) => {
            handleFileChange(e);
            register("file").onChange(e);
          }}
        />
        <span className="file-name ms-2">{selectedFileName}</span>
        <div id="fileError" className="text-danger"></div>
      </div>

      {/* Problem Description */}
      <div className="mb-3">
        <label htmlFor="problemDescription" className="form-label">
          Descrierea problemei
        </label>
        <textarea
          className={`form-control ${
            theme === "dark" ? "bg-dark text-white border-light" : ""
          }`}
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
          className={`form-check-input ${
            theme === "dark" ? "border-light" : ""
          }`}
          id="acceptContact"
          {...register("acceptContact", { value: false })}
          value="Da"
        />
        <label
          className={`form-check-label ${theme === "dark" ? "text-white" : ""}`}
          htmlFor="acceptContact"
        >
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
            className={`form-select ${
              theme === "dark" ? "bg-dark text-white border-light" : ""
            }`}
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

      {/* Single Turnstile Widget Container */}
      <div
        ref={turnstileWidgetRef}
        className="cf-turnstile d-flex justify-content-center mb-3"
      ></div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting || !isTurnstileReady}
      >
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

// Add PropTypes for better component documentation
RepairForm.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
};

// Default props
RepairForm.defaultProps = {
  theme: "dark",
};
