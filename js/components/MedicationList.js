import { MedicationDetails } from "./MedicationDetails.js";

export function MedicationList() {

  const medicationList = document.createElement("div");
  medicationList.id = "medication-list";

  const medicationsContainer = document.createElement("div");
  medicationsContainer.id = "medications-container";

  const addMedicationButton = document.createElement("button");
  addMedicationButton.id = "add-medication-button";
  addMedicationButton.type = "button";
  addMedicationButton.textContent = "Add Medication";

  addMedicationButton.addEventListener("click", () => {
    medicationsContainer.appendChild(MedicationDetails());
  });

  const submitButton = document.createElement("button");
  submitButton.id = "submit-button";
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  medicationsContainer.appendChild(MedicationDetails());
  medicationList.appendChild(medicationsContainer);
  medicationList.appendChild(addMedicationButton);
  medicationList.appendChild(submitButton);

  return medicationList;
}
