import {
  createButton,
  createInput,
  createFieldset,
  createInputWithSelect,
  createInputWithSelectTimeAndDelete,
} from "../utils/domHelper.js";
import { PrescriptionDetails } from "./PrescriptionDetails.js";

export function MedicationDetails() {
  const medForm = document.createElement("form");
  medForm.id = "medication-form";

  const medicationContainer = document.createElement("div");
  medicationContainer.id = "medication-container";

  const newPrescriptionButton = createButton(
    "New Prescription",
    "new-prescription-button",
    "button",
    () => {
      prescriptionsList.appendChild(PrescriptionDetails());
    }
  );

  const medicationInfoFieldset = createFieldset("Medication Information");
  medicationInfoFieldset.appendChild(
    createInput("Medication Name", "text", "med-name")
  );
  medicationInfoFieldset.appendChild(
    createInputWithSelect("Dosage", "number", "med-dosage", [
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

  const addAnotherDoseButton = createButton(
    "Add Another Dose",
    "add-another-dose-button",
    "button",
    () => {
      dosageFieldset.appendChild(
        createInputWithSelectTimeAndDelete(
          "Extra Dose",
          "number",
          `med-dose-${dosageFieldset.childElementCount + 1}`,
          ["mg", "ml", "pills"]
        )
      );
    }
  );

  dosageFieldset.appendChild(addAnotherDoseButton);

  const prescriptionsList = document.createElement("div");
  prescriptionsList.id = "prescriptions-list";

  medicationContainer.appendChild(medicationInfoFieldset);
  medicationContainer.appendChild(dosageFieldset);
  medicationContainer.appendChild(newPrescriptionButton);
  prescriptionsList.appendChild(PrescriptionDetails());
  medicationContainer.appendChild(prescriptionsList);
  medForm.appendChild(medicationContainer);

  return medForm;
}
