import {
  createButton,
  createInput,
  createFieldset,
  createInputWithSelect,
  trashIcon,
} from "../utils/domHelper.js";

export function PrescriptionDetails() {
  const prescriptionForm = document.createElement("form");
  prescriptionForm.id = "prescription-form";

  const deletePrescriptionButton = createButton(
    "",
    "delete-prescription-button",
    "button",
    () => {
      prescriptionFieldset.remove();
    }
  );
  deletePrescriptionButton.innerHTML = trashIcon;
  deletePrescriptionButton.setAttribute("aria-label", "Delete");

  const prescriptionEndedButton = createButton(
    "Prescription Ended",
    "prescription-ended-button",
    "button",
    () => {
      prescriptionFieldset.classList.add("inactive");

      const mainLegend = prescriptionFieldset.querySelector("legend");
      mainLegend.classList.add("inactiveLegend");
      mainLegend.textContent = "Prescription Ended";
      prescriptionFieldset
        .querySelectorAll("input, select, button")
        .forEach((el) => {
          if (el.id !== "reactivate-prescription-button") {
            el.disabled = true;
            el.setAttribute("aria-disabled", "true");
          }
        });
      reactivatePrescriptionButton.disabled = false;
      reactivatePrescriptionButton.classList.remove("hidden");
      reactivatePrescriptionButton.style.display = "block";
      reactivatePrescriptionButton.removeAttribute("aria-disabled");
      reactivatePrescriptionButton.removeAttribute("aria-hidden");
    }
  );

  const reactivatePrescriptionButton = createButton(
    "Reactivate Prescription",
    "reactivate-prescription-button",
    "button",
    () => {
      prescriptionFieldset.classList.remove("inactive");
      prescriptionFieldset.removeAttribute("aria-disabled");
      const mainLegend = prescriptionFieldset.querySelector("legend");
      mainLegend.classList.remove("inactiveLegend");
      mainLegend.textContent = "Prescription Details";
      prescriptionFieldset
        .querySelectorAll("input, select, button")
        .forEach((el) => {
          if (el.id === "reactivate-prescription-button") {
            el.disabled = true;
            el.setAttribute("aria-disabled", "true");
          } else {
            el.disabled = false;
            el.removeAttribute("aria-disabled");
          }
        });
      reactivatePrescriptionButton.classList.add("hidden");
      reactivatePrescriptionButton.style.display = "none";
      reactivatePrescriptionButton.setAttribute("aria-hidden", "true");
    }
  );
  reactivatePrescriptionButton.disabled = true;
  reactivatePrescriptionButton.setAttribute("aria-disabled", "true");
  reactivatePrescriptionButton.classList.add("hidden");
  reactivatePrescriptionButton.setAttribute("aria-hidden", "true");

  const amountContainer = createInputWithSelect(
    "Amount",
    "number",
    "med-prescription-amount",
    ["mg", "ml", "pills", "boxes"]
  );
  const amountInput = amountContainer.querySelector("input");

  const repetitionsContainer = createInput(
    "Repetitions",
    "number",
    "med-prescription-repetitions"
  );
  const repetitionsInput = repetitionsContainer.querySelector("input");

  const totalContainer = createInput(
    "Total",
    "number",
    "med-prescription-total",
    true,
    0
  );
  const totalInput = totalContainer.querySelector("input");

  const updateTotal = () => {
    const amount = parseFloat(amountInput.value) || 0;
    const repetitions = parseFloat(repetitionsInput.value) || 0;
    totalInput.value = amount * (1 + repetitions);
  };

  amountInput.addEventListener("input", updateTotal);
  repetitionsInput.addEventListener("input", updateTotal);

  const prescriptionFieldset = createFieldset("Prescription Details");
  prescriptionFieldset.appendChild(
    createInput("Prescription Start Date", "date", "med-prescription-start")
  );
  prescriptionFieldset.appendChild(
    createInput(
      "Prescription Expiration Date",
      "date",
      "med-prescription-expiration"
    )
  );
  prescriptionFieldset.appendChild(amountContainer);
  prescriptionFieldset.appendChild(repetitionsContainer);
  prescriptionFieldset.appendChild(totalContainer);

  prescriptionFieldset.appendChild(prescriptionEndedButton);
  prescriptionFieldset.appendChild(deletePrescriptionButton);
  prescriptionFieldset.appendChild(reactivatePrescriptionButton);
  prescriptionForm.appendChild(prescriptionFieldset);

  return prescriptionForm;
}
