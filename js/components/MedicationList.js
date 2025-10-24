import {
  createInput,
  createFieldset,
  createInputWithSelect,
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
    createInput("Morning Dose", "number", "med-morning")
  );
  dosageFieldset.appendChild(
    createInput("Afternoon Dose", "number", "med-afternoon")
  );
  dosageFieldset.appendChild(
    createInput("Evening Dose", "number", "med-evening")
  );
  dosageFieldset.appendChild(
    createInput("Additional Doses", "number", "med-additiona-doses")
  );

  medForm.appendChild(medicationInfoFieldset);
  medForm.appendChild(dosageFieldset);
  medForm.appendChild(newPrescriptionButton);
  medForm.appendChild(PrescriptionDetails());
  medForm.appendChild(submitButton);

  return medForm;
}
