import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import RepairForm from "../components/RepairForm";

const RepairRequest = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    deviceType: "",
    brandModel: "",
    problemDescription: "",
    acceptContact: false,
    preferredContact: "Telefon",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [fileName, setFileName] = useState("Niciun fișier selectat");
  const navigate = useNavigate();

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookieBanner(false);
  };

  return (
    <div className="repair-request-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="d-flex justify-content-start mb-1">
              <Logo />
            </div>

            <p className="lead mb-4 text-white repair-request-p">
              Bun venit! Dacă ai ajuns aici înseamnă că ai nevoie de ajutor cu
              un dispozitiv defect. Completează formularul de mai jos sau
              sună-ne direct, iar noi te vom contacta în cel mai scurt timp
              posibil pentru a-ți oferi o soluție rapidă și eficientă.
            </p>

            <RepairForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairRequest;
