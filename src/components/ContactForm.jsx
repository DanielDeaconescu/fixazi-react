function ContactForm() {
  return (
    <form
      class="text-dark repairForm"
      action="/api/sendRepairRequest"
      method="POST"
      enctype="multipart/form-data"
      novalidate
    >
      <h4>Cerere de reparație</h4>
      <div class="mb-3">
        <label for="fullName" class="form-label">
          Nume complet
        </label>
        <input
          type="text"
          class="form-control"
          id="fullName"
          name="fullName"
          placeholder="Ex: Andrei Popescu"
        />
        <div class="text-danger small mt-1" id="fullNameError"></div>
      </div>

      <div class="mb-3">
        <label for="phoneNumber" class="form-label">
          Număr de telefon
        </label>
        <input
          type="tel"
          class="form-control"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Ex: 07xxxxxxxx"
        />
        <div class="text-danger small mt-1" id="phoneError"></div>
      </div>

      <div class="mb-3">
        <label for="emailAddress" class="form-label">
          Adresă de email
        </label>
        <input
          type="email"
          class="form-control"
          id="emailAddress"
          name="emailAddress"
          placeholder="Ex: exemplu@email.com"
        />
      </div>

      <div class="mb-3">
        <label for="deviceType" class="form-label">
          Tip dispozitiv
        </label>
        <select class="form-select" id="deviceType" name="deviceType">
          <option selected disabled>
            Alege un dispozitiv
          </option>
          <option value="telefon">Telefon</option>
          <option value="tableta">Tabletă</option>
          <option value="laptop">Laptop</option>
          <option value="gps">GPS</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="brandModel" class="form-label">
          Marcă și model
        </label>
        <input
          type="text"
          class="form-control"
          id="brandModel"
          name="brandModel"
          placeholder="Ex: Samsung Galaxy S21"
        />
      </div>

      <div class="custom-file-upload mb-3">
        <label class="custom-file-label">Atașează o imagine (opțional)</label>
        <input class="file-upload" name="file" type="file" />
        <span class="file-name">Niciun fișier selectat</span>
        <div id="fileError" class="text-danger"></div>
      </div>

      <div class="mb-3">
        <label for="problemDescription" class="form-label">
          Descrierea problemei
        </label>
        <textarea
          class="form-control"
          id="problemDescription"
          name="problemDescription"
          rows="3"
          placeholder="Scrie aici ce problemă are dispozitivul..."
        ></textarea>
      </div>

      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="acceptContact"
          name="acceptContact"
        />
        <label class="form-check-label" for="acceptContact">
          Sunt de acord să fiu contactat(ă) cu privire la această cerere.
        </label>
      </div>

      <div
        class="mb-3 transition-collapse collapsed"
        id="preferredContactGroup"
      >
        <label for="preferredContact" class="form-label">
          Cum preferi să fii contactat(ă)?
        </label>
        <select
          class="form-select"
          id="preferredContact"
          name="preferredContact"
        >
          <option value="Telefon">Telefon</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
        </select>
      </div>

      <div
        class="cf-turnstile d-flex justify-content-center mb-3"
        data-sitekey="0x4AAAAAABdALOY-DswhxzbS"
      ></div>
      <button id="submitBtn" type="submit" class="btn btn-primary">
        <span
          id="loadingSpinner"
          class="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
          style="display: none;"
        ></span>
        <span id="submitText">Trimite cererea</span>
      </button>
    </form>
  );
}

export default ContactForm;
