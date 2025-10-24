import { createInput, createFieldset } from "../utils/domHelper.js";

export function PrescriptionDetails() {
  const prescriptionForm = document.createElement("form");
  prescriptionForm.id = "prescription-form";

  const today = new Date().toISOString().split("T")[0];
  const prescriptionEnded = document.createElement("button");
  prescriptionEnded.id = "prescription-ended-button";
  prescriptionEnded.type = "button";
  prescriptionEnded.textContent = "Prescription Ended";

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
    createInput("Amount", "number", "med-prescription-amount")
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

  prescriptionFieldset.appendChild(prescriptionEnded);
  prescriptionForm.appendChild(prescriptionFieldset);

  return prescriptionForm;
}
