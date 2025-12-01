import { PetForm } from "./components/PetForm.js";
import { MedicationList } from "./components/MedicationList.js";
import { PetCard } from "./components/PetCard.js";


function renderFormPage() {
    const container = document.createElement("div");

    const masterForm = document.createElement("form");
    masterForm.id = "pet-form";

    masterForm.appendChild(PetForm());       
    masterForm.appendChild(MedicationList()); 

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Save";

    masterForm.appendChild(submitButton);

    masterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const allData = collectAllDataFromPage();

        const petCard = PetCard(allData);
        renderView(petCard);
    });

    container.appendChild(masterForm);
    renderView(container);
}

function formatDose(formData, baseName) {
  const value = formData.get(baseName) || "";
  const unit = formData.get(`${baseName}-unit`) || "";
  if (!value) return "";

  if (!unit) return value;
  return `${value} ${unit}`;
}

function collectAllDataFromPage() {
    const petForm =
        document.querySelector("#pet-form form") ||
        document.getElementById("pet-form");    
    const petData = new FormData(petForm);
    const pet = {
        name: petData.get("pet-name") || "",
        dob: petData.get("pet-dob") || "",
        country: petData.get("pet-country") || "",
        conditions: Array.from(petData.entries())
            .filter(([key]) => key.startsWith("pet-condition-"))
            .map(([, value]) => value)
            .filter((v) => v.trim() !== ""),
    };

    const medicationForms = document.querySelectorAll("#medications-container form#medication-form");
    const medications = Array.from(medicationForms).map((form) => {
        const formData = new FormData(form);
        return {
            name: formData.get("med-name") || "",
            dosage: {
                value: formData.get("med-dosage") || "",
                unit: formData.get("med-dosage-unit") || "",
            },
            oneTime: formData.get("med-one-time") === "on",
            frequency: {
                morning: formatDose(formData, "med-morning"),
                afternoon: formatDose(formData, "med-afternoon"),
                evening: formatDose(formData, "med-evening"),
                extraDoses: Array.from(formData.entries())
                    .filter(([key]) => key.startsWith("med-dose-") && !key.endsWith("-time"))
    .map(([, value]) => value)
    .filter((v) => v.trim() !== ""),
},
        };
    });

    return { pet, medications };
}

function renderView(contentNode) {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(contentNode);
}

renderFormPage();
