// PetForm.js — creates and returns the pet form section
import {
  createButton,
  createInput,
  createFieldset,
  createInputWithDeleteButton,
} from "../utils/domHelper.js";
export function PetForm() {
  const petForm = document.createElement("form");
  petForm.id = "pet-form";
  petForm.classList.add("pet-form");
  const conditionsList = document.createElement("div");
  conditionsList.classList.add("conditions-list");

  const informationFieldset = createFieldset("Pet Information");
  informationFieldset.appendChild(createInput("Pet Name", "text", "pet-name"));
  informationFieldset.appendChild(
    createInput("Date of Birth", "date", "pet-dob")
  );
  informationFieldset.appendChild(
    createInput("Country of Origin", "text", "pet-country")
  );

  const conditionsFieldset = createFieldset("Conditions/Diseases");
  conditionsList.appendChild(
    createInput("Condition", "text", "pet-condition-1")
  );

  const petAdditionalConditionButton = createButton(
    "Add Another Condition",
    "add-condition-button",
    "button",
    () => {
      const newConditionInput = createInputWithDeleteButton(
        "Condition",
        "text",
        `pet-condition-${conditionsFieldset.childElementCount + 1}`
      );
      conditionsList.appendChild(newConditionInput);
    }
  );

  conditionsFieldset.appendChild(conditionsList);
  conditionsFieldset.appendChild(petAdditionalConditionButton);
  petForm.appendChild(informationFieldset);
  petForm.appendChild(conditionsFieldset);

  return petForm;
}
