const app = document.getElementById("app");

const header = document.createElement("header");
const main = document.createElement("main");
const petForm = document.createElement("section");
const petList = document.createElement("section");
header.id = "header";
main.id = "main";
petForm.id = "pet-form-section";
petList.id = "pet-list-section";
header.textContent = "Dog Medication Tracker";
petForm.textContent = "Pet Form Section";
petList.textContent = "Pet List Section";

main.appendChild(petForm);
main.appendChild(petList);
app.appendChild(header);
app.appendChild(main);
