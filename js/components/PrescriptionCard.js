import { formatDate, createButton } from "../utils/domHelper.js";

export function PrescriptionCard(prescription, medication) {
  const prescriptionItem = document.createElement("li");
  prescriptionItem.classList.add("prescription-item");
  const summary = document.createElement("p");
  const amountText = prescription.amount?.value
    ? `${prescription.amount.value} ${prescription.amount.unit}`.trim()
    : "N/A";
  summary.textContent =
    `Start: ${formatDate(prescription.startDate) || "N/A"}, ` +
    `Expires: ${formatDate(prescription.expirationDate) || "N/A"}, ` +
    (amountText ? `Amount: ${amountText}, ` : "") +
    `Repetitions: ${prescription.repetitions || "N/A"}, ` +
    `Total: ${prescription.total || "N/A"}, ` +
    `Next order: ${formatDate(prescription.nextOrderDate) || "N/A"}`;
  prescriptionItem.appendChild(summary);

  const statusLabel = document.createElement("p");
  const updateStatusLabel = () => {
    statusLabel.textContent = `Status: ${
      prescription.status === "ended" ? "Ended" : "Active"
    }`;
  };
  updateStatusLabel(); // Initial update
  prescriptionItem.appendChild(statusLabel);
  const endButton = createButton("End Prescription", null, "button", () => {
    prescription.status = "ended";
    updateStatusLabel();
    syncButtons();
  });

  const reactivateButton = createButton(
    "Reactivate Prescription",
    null,
    "button",
    () => {
      prescription.status = "active";
      updateStatusLabel();
      syncButtons();
    }
  );

  const deleteButton = createButton(
    "Delete Prescription",
    null,
    "button",
    () => {
      prescriptionItem.remove();
      const idx = medication.prescriptions.indexOf(prescription);
      if (idx !== -1) {
        medication.prescriptions.splice(idx, 1);
      }
    }
  );

  const syncButtons = () => {
    const isEnded = prescription.status === "ended";
    endButton.disabled = isEnded;
    reactivateButton.disabled = !isEnded;
  };
  syncButtons();

  prescriptionItem.appendChild(endButton);
  prescriptionItem.appendChild(reactivateButton);
  prescriptionItem.appendChild(deleteButton);

  return prescriptionItem;
}
