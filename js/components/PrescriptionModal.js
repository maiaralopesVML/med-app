// js/components/PrescriptionModal.js
import { PrescriptionDetails } from "./PrescriptionDetails.js";
import { createButton } from "../utils/domHelper.js";

export function PrescriptionModal({ onSave, onClose } = {}) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const title = document.createElement("h3");
  title.textContent = "Add Prescription";
  modal.appendChild(title);

  // Reuse existing form component
  const prescriptionForm = PrescriptionDetails();
  prescriptionForm.classList.add("prescription-modal-form");
  modal.appendChild(prescriptionForm);

  const actions = document.createElement("div");
  actions.classList.add("modal-actions");

  const saveBtn = createButton(
    "Save",
    "save-prescription-modal",
    "button",
    () => {
      const formData = new FormData(prescriptionForm);
      const fieldset = prescriptionForm.querySelector("fieldset");
      const prescription = {
        startDate: formData.get("med-prescription-start") || "",
        expirationDate: formData.get("med-prescription-expiration") || "",
        amount: {
          value: formData.get("med-prescription-amount") || "",
          unit: formData.get("med-prescription-amount-unit") || "",
        },
        repetitions: formData.get("med-prescription-repetitions") || "",
        total: formData.get("med-prescription-total") || "",
        nextOrderDate: formData.get("med-prescription-next-order") || "",
        status: fieldset?.classList.contains("inactive") ? "ended" : "active",
        orders: [],
      };
      if (onSave) onSave(prescription);
      overlay.remove();
    },
  );

  const cancelBtn = createButton(
    "Cancel",
    "cancel-prescription-modal",
    "button",
    () => {
      overlay.remove();
      if (onClose) onClose();
    },
  );

  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  modal.appendChild(actions);

  // Close when clicking backdrop
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
      if (onClose) onClose();
    }
  });

  overlay.appendChild(modal);
  return overlay;
}
