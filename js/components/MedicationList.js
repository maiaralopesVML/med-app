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

  medicationsContainer.appendChild(MedicationDetails());
  medicationList.appendChild(medicationsContainer);
  medicationList.appendChild(addMedicationButton);

  return medicationList;
}
