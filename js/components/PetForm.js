// PetForm.js — creates and returns the pet form section
export function PetForm() {
  const petForm = document.createElement("form");
  const fieldsetInfo = document.createElement("fieldset");
  const legendInfo = document.createElement("legend");
  const petName = document.createElement("input");
  const petDOB = document.createElement("input");
  const petCountry = document.createElement("input");
  const fieldsetConditions = document.createElement("fieldset");
  const legendConditions = document.createElement("legend");
  const petCondition = document.createElement("input");
  const petNameLabel = document.createElement("label");
  const petDOBLabel = document.createElement("label");
  const petCountryLabel = document.createElement("label");
  const petConditionLabel = document.createElement("label");
  const petAdditionalConditionButton = document.createElement("button");
  const submitButton = document.createElement("button");

  petForm.id = "pet-form";
  petName.id = "pet-name";
  petDOB.id = "pet-dob";
  petCountry.id = "pet-country";
  petCondition.id = "pet-condition";
  petAdditionalConditionButton.id = "add-condition-button";
  submitButton.id = "submit-button";

  petName.type = "text";
  petDOB.type = "date";
  petCountry.type = "text";
  petCondition.type = "text";
  petAdditionalConditionButton.type = "button";
  submitButton.type = "submit";

  petNameLabel.htmlFor = "pet-name";
  petDOBLabel.htmlFor = "pet-dob";
  petCountryLabel.htmlFor = "pet-country";
  petConditionLabel.htmlFor = "pet-condition";

  legendInfo.textContent = "Pet Information";
  petNameLabel.textContent = "Pet Name";
  petDOBLabel.textContent = "Date of Birth";
  petCountryLabel.textContent = "Country";
  legendConditions.textContent = "Conditions/Diseases";
  petConditionLabel.textContent = "Condition";
  petAdditionalConditionButton.textContent = "Add Another Condition";
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
