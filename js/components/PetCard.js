import { formatDate, createButton } from "../utils/domHelper.js";
import { MedicationCard } from "./MedicationCard.js";
import { STORAGE_KEY } from "../data/storage.js";

export function PetCard(data, { onClear, onSave } = {}) {
  const petCard = document.createElement("div");
  petCard.classList.add("pet-card");

  const petName = document.createElement("h2");
  petName.textContent = data.pet.name;
  petName.classList.add("pet-name");
  petCard.appendChild(petName);

  const petDOB = document.createElement("p");
  petDOB.textContent = `Date of birth: ${formatDate(data.pet.dob)}`;
  petDOB.classList.add("pet-dob");
  petCard.appendChild(petDOB);

  const petCountry = document.createElement("p");
  petCountry.textContent = `Country of origin: ${data.pet.country}`;
  petCountry.classList.add("pet-country");
  petCard.appendChild(petCountry);

  const conditionsTitle = document.createElement("h3");
  conditionsTitle.textContent = "Conditions";
  conditionsTitle.classList.add("conditions-title");
  petCard.appendChild(conditionsTitle);

  const conditionsList = document.createElement("ul");
  conditionsList.classList.add("conditions-list");
  data.pet?.conditions?.forEach((condition) => {
    const conditionItem = document.createElement("li");
    conditionItem.textContent = condition;
    conditionItem.classList.add("condition-item");
    conditionsList.appendChild(conditionItem);
  });
  petCard.appendChild(conditionsList);

  const medicationsTitle = document.createElement("h3");
  medicationsTitle.textContent = "Medications";
  medicationsTitle.classList.add("medications-title");
  petCard.appendChild(medicationsTitle);

  const medicationsList = document.createElement("ul");
  medicationsList.classList.add("medications-list");
  data.medications?.forEach((medication) => {
    medicationsList.appendChild(MedicationCard(medication, data));
  });
  petCard.appendChild(medicationsList);

  const saveChangesButton = createButton("Save Changes", null, "button", () => {
    if (onSave) {
      onSave(data);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  });
  saveChangesButton.classList.add("save-changes-button");

  const clearAllButton = createButton("Clear All", null, "button", () => {
    localStorage.removeItem(STORAGE_KEY);
    if (onClear) {
      onClear();
    }
  });
  petCard.appendChild(saveChangesButton);
  petCard.appendChild(clearAllButton);

  return petCard;
}
