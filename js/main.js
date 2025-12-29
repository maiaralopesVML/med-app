import { PetForm } from "./components/PetForm.js";
import { MedicationList } from "./components/MedicationList.js";
import { PetCard } from "./components/PetCard.js";
import { collectAllDataFromPage } from "./data/state.js";


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

function renderView(contentNode) {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(contentNode);
}

renderFormPage();
