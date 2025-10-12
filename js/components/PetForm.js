// PetForm.js — creates and returns the pet form section
export function PetForm() {
  const petForm = document.createElement("form");
  petForm.id = "pet-form";

  const fieldsetInfo = document.createElement("fieldset");
  const legendInfo = document.createElement("legend");
  legendInfo.textContent = "Pet Information";

  const petName = document.createElement("input");
  petName.id = "pet-name";
  petName.type = "text";

  const petNameLabel = document.createElement("label");
  petNameLabel.htmlFor = "pet-name";
  petNameLabel.textContent = "Pet Name";

  const petDOB = document.createElement("input");
  petDOB.id = "pet-dob";
  petDOB.type = "date";

  const petDOBLabel = document.createElement("label");
  petDOBLabel.htmlFor = "pet-dob";
  petDOBLabel.textContent = "Date of Birth";

  const petCountry = document.createElement("input");
  petCountry.id = "pet-country";
  petCountry.type = "text";

  const petCountryLabel = document.createElement("label");
  petCountryLabel.htmlFor = "pet-country";
  petCountryLabel.textContent = "Country of Origin";

  const fieldsetConditions = document.createElement("fieldset");
  const legendConditions = document.createElement("legend");
  legendConditions.textContent = "Conditions/Diseases";

  const petCondition = document.createElement("input");
  petCondition.id = "pet-condition";
  petCondition.type = "text";

  const petConditionLabel = document.createElement("label");
  petConditionLabel.htmlFor = "pet-condition";
  petConditionLabel.textContent = "Condition";

  const petAdditionalConditionButton = document.createElement("button");
  petAdditionalConditionButton.id = "add-condition-button";
  petAdditionalConditionButton.type = "button";
  petAdditionalConditionButton.textContent = "Add Another Condition";

  const submitButton = document.createElement("button");
  submitButton.id = "submit-button";
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  fieldsetInfo.appendChild(legendInfo);
  fieldsetInfo.appendChild(petNameLabel);
  fieldsetInfo.appendChild(petName);
  fieldsetInfo.appendChild(petDOBLabel);
  fieldsetInfo.appendChild(petDOB);
  fieldsetInfo.appendChild(petCountryLabel);
  fieldsetInfo.appendChild(petCountry);

  petForm.appendChild(fieldsetInfo);

  fieldsetConditions.appendChild(legendConditions);
  fieldsetConditions.appendChild(petConditionLabel);
  fieldsetConditions.appendChild(petCondition);
  fieldsetConditions.appendChild(petAdditionalConditionButton);

  petForm.appendChild(fieldsetConditions);
  petForm.appendChild(submitButton);

  return petForm;
}
