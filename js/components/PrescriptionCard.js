import { formatDate, createButton } from "../utils/domHelper.js";
import { OrderItem } from "./OrderItem.js";

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
    `Total: ${prescription.total || "N/A"}, `;

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

  // Orders section
  const ordersSection = document.createElement("div");
  ordersSection.classList.add("orders-section");

  const ordersTitle = document.createElement("h5");
  ordersTitle.textContent = "Orders";
  ordersSection.appendChild(ordersTitle);

  const ordersList = document.createElement("ul");
  ordersList.classList.add("orders-list");
  ordersSection.appendChild(ordersList);

  // Initialize orders array on prescription if it doesn't exist
  if (!prescription.orders) {
    prescription.orders = [];
  }

  // Summary display
  const summaryP = document.createElement("p");
  summaryP.classList.add("summary-p");
  const updateSummary = () => {
    const orderItems = ordersList.querySelectorAll(".order-item");
    let totalOrdered = 0;
    orderItems.forEach((item) => {
      totalOrdered += item.getData().quantity;
    });
    const amount = prescription.amount?.value || 0;
    const repetitions = parseInt(prescription.repetitions, 10) || 0;
    const totalTimes = 1 + repetitions;

    const orderedAmount = totalOrdered * amount;
    const remainingTimes = totalTimes - totalOrdered;
    const remainingAmount = remainingTimes * amount;
    summaryP.textContent =
      `Ordered: ${totalOrdered} times | total = ${orderedAmount} | ` +
      `Remaining: ${remainingTimes} repetitions | total = ${remainingAmount}`;
  };
  updateSummary();
  ordersSection.appendChild(summaryP);

  const addOrderButton = createButton("Add Order", null, "button", () => {
    const orderItem = OrderItem(updateSummary, updateSummary);
    ordersList.appendChild(orderItem);
    updateSummary();
  });
  ordersSection.appendChild(addOrderButton);

  prescriptionItem.appendChild(ordersSection);

  return prescriptionItem;
}
