import { PetForm } from "./components/PetForm.js";
import { MedicationList } from "./components/MedicationList.js";


function renderFormPage() {
    const container = document.createElement("div");

    const masterForm = document.createElement("form");
    masterForm.id = "pet-form";

    masterForm.appendChild(PetForm());       // returns fieldsets, not a form
    masterForm.appendChild(MedicationList()); // returns fieldsets, not a form

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Save";

    masterForm.appendChild(submitButton);

    masterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const allData = collectAllDataFromPage(); // you’ll build this

        renderPetCardPage(allData);
    });

    container.appendChild(masterForm);
    renderView(container);
}

function renderView(contentNode) {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(contentNode);
}

renderFormPage();
