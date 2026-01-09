import { MedicationDetails } from "./MedicationDetails.js";
import { createButton } from "../utils/domHelper.js";

export function MedicationList() {
  const medicationList = document.createElement("div");
  medicationList.id = "medication-list";
  medicationList.classList.add("medication-list");

  const medicationsContainer = document.createElement("div");
  medicationsContainer.id = "medications-container";
  medicationsContainer.classList.add("medications-container");

  const addMedicationButton = createButton(
    "Add Medication",
    "add-medication-button",
    "button",
    () => {
      medicationsContainer.appendChild(MedicationDetails());
    }
  );

  medicationsContainer.appendChild(MedicationDetails());
  medicationList.appendChild(medicationsContainer);
  medicationList.appendChild(addMedicationButton);

  return medicationList;
}
