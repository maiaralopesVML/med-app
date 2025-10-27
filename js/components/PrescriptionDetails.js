import {
  createInput,
  createFieldset,
  createInputWithSelect,
} from "../utils/domHelper.js";

export function PrescriptionDetails() {
  const prescriptionForm = document.createElement("form");
  prescriptionForm.id = "prescription-form";

  const today = new Date().toISOString().split("T")[0];
  const prescriptionEndedButton = document.createElement("button");
  prescriptionEndedButton.id = "prescription-ended-button";
  prescriptionEndedButton.type = "button";
  prescriptionEndedButton.textContent = "Prescription Ended";
  const deletePrescriptionButton = document.createElement("button");
  deletePrescriptionButton.id = "delete-prescription-button";
  deletePrescriptionButton.type = "button";
  deletePrescriptionButton.textContent = "Delete Prescription";

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
  prescriptionFieldset.appendChild(
    createInputWithSelect("Amount", "number", "med-prescription-amount", [
      "mg",
      "ml",
      "pills",
      "boxes",
    ])
  );
  prescriptionFieldset.appendChild(
    createInput("Repetitions", "number", "med-prescription-repetitions")
  );
  prescriptionFieldset.appendChild(
    createInput("Total", "number", "med-prescription-total", true, 0)
  );
  prescriptionFieldset.appendChild(
    createInput(
      "Estimated Next Order Date",
      "date",
      "med-prescription-next-order",
      true,
      today
    )
  );

  prescriptionEndedButton.addEventListener("click", () => {
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
  });

  const reactivatePrescriptionButton = document.createElement("button");
  reactivatePrescriptionButton.id = "reactivate-prescription-button";
  reactivatePrescriptionButton.type = "button";
  reactivatePrescriptionButton.textContent = "Reactivate Prescription";

  reactivatePrescriptionButton.addEventListener("click", () => {
    prescriptionFieldset.classList.remove("inactive");
    prescriptionFieldset.removeAttribute("aria-disabled");
    const mainLegend = prescriptionFieldset.querySelector("legend");
    mainLegend.classList.remove("inactiveLegend");
    mainLegend.textContent = "Prescription Details";
    prescriptionFieldset
      .querySelectorAll("input, select, button")
      .forEach((el) => {
        el.disabled = false;
      });
  });

  deletePrescriptionButton.addEventListener("click", () => {
    prescriptionFieldset.remove();
  });

  prescriptionFieldset.appendChild(prescriptionEndedButton);
  prescriptionFieldset.appendChild(deletePrescriptionButton);
  prescriptionFieldset.appendChild(reactivatePrescriptionButton);
  prescriptionForm.appendChild(prescriptionFieldset);

  return prescriptionForm;
}
