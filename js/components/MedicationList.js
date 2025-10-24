import { createInput, createFieldset } from "../utils/domHelper.js";
import { PrescriptionDetails } from "./PrescriptionDetails.js";

export function MedicationList() {
  const medForm = document.createElement("form");
  medForm.id = "medication-form";

  const submitButton = document.createElement("button");
  submitButton.id = "submit-button";
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  const newPrescriptionButton = document.createElement("button");
  newPrescriptionButton.id = "new-prescription-button";
  newPrescriptionButton.type = "button";
  newPrescriptionButton.textContent = "New Prescription";

  const medicationInfoFieldset = createFieldset("Medication Information");
  medicationInfoFieldset.appendChild(
    createInput("Medication Name", "text", "med-name")
  );
  medicationInfoFieldset.appendChild(
    createInput("mg per Unit", "number", "med-mg")
  );

  const dosageFieldset = createFieldset("Dosage Information");
  dosageFieldset.appendChild(
    createInput("Times per Day", "number", "med-times-per-day")
  );
  dosageFieldset.appendChild(
    createInput("Morning Dose", "number", "med-morning")
  );
  dosageFieldset.appendChild(
    createInput("Evening Dose", "number", "med-evening")
  );

  medForm.appendChild(medicationInfoFieldset);
  medForm.appendChild(dosageFieldset);
  medForm.appendChild(newPrescriptionButton);
  medForm.appendChild(PrescriptionDetails());
  medForm.appendChild(submitButton);

  return medForm;
}
