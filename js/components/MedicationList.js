import {
  createInput,
  createFieldset,
  createInputWithSelect,
  createInputWithSelectAndTime,
} from "../utils/domHelper.js";
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
    createInputWithSelect("Dosage", "number", "med-deosage", [
      "mg",
      "ml",
      "pills",
    ])
  );

  const dosageFieldset = createFieldset("Dosage Information");

  const oneTimeDoseLabel = document.createElement("label");
  oneTimeDoseLabel.htmlFor = "med-one-time";
  oneTimeDoseLabel.textContent = "One Time Dose";
  const oneTimeDoseInput = document.createElement("input");
  oneTimeDoseInput.type = "checkbox";
  oneTimeDoseInput.id = "med-one-time";
  dosageFieldset.appendChild(oneTimeDoseLabel);
  dosageFieldset.appendChild(oneTimeDoseInput);

  dosageFieldset.appendChild(
    createInputWithSelect("Morning Dose", "number", "med-morning", [
      "mg",
      "ml",
      "pills",
    ])
  );
  dosageFieldset.appendChild(
    createInputWithSelect("Afternoon Dose", "number", "med-afternoon", [
      "mg",
      "ml",
      "pills",
    ])
  );
  dosageFieldset.appendChild(
    createInputWithSelect("Evening Dose", "number", "med-evening", [
      "mg",
      "ml",
      "pills",
    ])
  );

  const addAnotherDoseButton = document.createElement("button");
  addAnotherDoseButton.id = "add-another-dose-button";
  addAnotherDoseButton.type = "button";
  addAnotherDoseButton.textContent = "Add Another Dose";
  dosageFieldset.appendChild(addAnotherDoseButton);

  addAnotherDoseButton.addEventListener("click", () => {
    dosageFieldset.appendChild(
      createInputWithSelectAndTime(
        "Extra Dose",
        "number",
        `med-dose-${dosageFieldset.childElementCount + 1}`,
        ["mg", "ml", "pills"]
      )
    );
  });

  const prescriptionsList = document.createElement("div");
  prescriptionsList.id = "prescriptions-list";

  newPrescriptionButton.addEventListener("click", () => {
    prescriptionsList.appendChild(PrescriptionDetails());
  });

  medForm.appendChild(medicationInfoFieldset);
  medForm.appendChild(dosageFieldset);
  medForm.appendChild(newPrescriptionButton);
  prescriptionsList.appendChild(PrescriptionDetails());
  medForm.appendChild(prescriptionsList);
  medForm.appendChild(submitButton);

  return medForm;
}
