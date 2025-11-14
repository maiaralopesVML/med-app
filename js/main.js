import { PetForm } from "./components/PetForm.js";
import { MedicationList } from "./components/MedicationList.js";

// Name variants
const app = document.getElementById("app");
const header = document.createElement("header");
const main = document.createElement("main");
const petFormSection = document.createElement("section");
const petListSection = document.createElement("section");

// Add IDs and content
header.id = "header";
main.id = "main";
petFormSection.id = "pet-form-section";
petListSection.id = "pet-list-section";
header.textContent = "Dog Medication Tracker";
petFormSection.textContent = "Pet Form Section";
petListSection.textContent = "Pet List Section";

// Append layout elements to the DOM from inside out
main.appendChild(petFormSection);
main.appendChild(petListSection);
app.appendChild(header);
app.appendChild(main);

// Create and append the pet form to the pet form section
const formElement = PetForm();
petFormSection.appendChild(formElement);
const medicationElement = MedicationList();
petFormSection.appendChild(medicationElement);
