import { PetForm } from "./components/PetForm.js";
import { MedicationList } from "./components/MedicationList.js";
import { PetCard } from "./components/PetCard.js";
import { collectAllDataFromPage } from "./data/state.js";
import { STORAGE_KEY } from "./data/storage.js";

function renderFormPage() {
  const container = document.createElement("div");

  const masterForm = document.createElement("form");
  masterForm.id = "pet-form";

  masterForm.appendChild(PetForm());
  masterForm.appendChild(MedicationList());

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("save-button");
  submitButton.textContent = "Save";

  masterForm.appendChild(submitButton);

  masterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const allData = collectAllDataFromPage();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));

    const petCard = PetCard(allData, {
      onSave: (nextData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      },
      onClear: () => {
        localStorage.removeItem(STORAGE_KEY);
        renderFormPage();
      },
    });
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

const raw = localStorage.getItem(STORAGE_KEY);
if (raw) {
  try {
    const savedData = JSON.parse(raw);
    renderView(
      PetCard(savedData, {
        onSave: (nextData) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
        },
        onClear: () => {
          localStorage.removeItem(STORAGE_KEY);
          renderFormPage();
        },
      })
    );
  } catch (e) {
    console.error("Error parsing saved data:", e);
    localStorage.removeItem(STORAGE_KEY);
    renderFormPage();
  }
} else {
  renderFormPage();
}
