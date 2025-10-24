// PetForm.js — creates and returns the pet form section
import { createInput, createFieldset } from "../utils/domHelper.js";
export function PetForm() {
  const petForm = document.createElement("form");
  petForm.id = "pet-form";

  const informationFieldset = createFieldset("Pet Information");
  informationFieldset.appendChild(createInput("Pet Name", "text", "pet-name"));
  informationFieldset.appendChild(
    createInput("Date of Birth", "date", "pet-dob")
  );
  informationFieldset.appendChild(
    createInput("Country of Origin", "text", "pet-country")
  );

  const conditionsFieldset = createFieldset("Conditions/Diseases");
  conditionsFieldset.appendChild(
    createInput("Condition", "text", "pet-condition")
  );

  const petAdditionalConditionButton = document.createElement("button");
  petAdditionalConditionButton.id = "add-condition-button";
  petAdditionalConditionButton.type = "button";
  petAdditionalConditionButton.textContent = "Add Another Condition";

  conditionsFieldset.appendChild(petAdditionalConditionButton);
  petForm.appendChild(informationFieldset);
  petForm.appendChild(conditionsFieldset);

  return petForm;
}
