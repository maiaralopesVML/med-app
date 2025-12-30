import { formatDate } from "../utils/domHelper.js";
import { MedicationCard } from "./MedicationCard.js";

export function PetCard(data) {
  const petCard = document.createElement("div");
  petCard.classList.add("pet-card");

  const petName = document.createElement("h2");
  petName.textContent = data.pet.name;
  petCard.appendChild(petName);

  const petDOB = document.createElement("p");
  petDOB.textContent = `Date of birth: ${formatDate(data.pet.dob)}`;
  petCard.appendChild(petDOB);

  const petCountry = document.createElement("p");
  petCountry.textContent = `Country of origin: ${data.pet.country}`;
  petCard.appendChild(petCountry);

  const conditionsTitle = document.createElement("h3");
  conditionsTitle.textContent = "Conditions";
  petCard.appendChild(conditionsTitle);

  const conditionsList = document.createElement("ul");
  data.pet?.conditions?.forEach((condition) => {
    const conditionItem = document.createElement("li");
    conditionItem.textContent = condition;
    conditionsList.appendChild(conditionItem);
  });
  petCard.appendChild(conditionsList);

  const medicationsTitle = document.createElement("h3");
  medicationsTitle.textContent = "Medications";
  petCard.appendChild(medicationsTitle);

  const medicationsList = document.createElement("ul");
  data.medications?.forEach((medication) => {
    medicationsList.appendChild(MedicationCard(medication));
  });
  petCard.appendChild(medicationsList);

  return petCard;
}
