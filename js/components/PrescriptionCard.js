import { formatDate, createButton, trashIcon } from "../utils/domHelper.js";
import { OrderItem } from "./OrderItem.js";
import { STORAGE_KEY } from "../data/storage.js";

export function PrescriptionCard(prescription, medication, rootData) {
  const prescriptionItem = document.createElement("li");
  prescriptionItem.classList.add("prescription-item");
  const summary = document.createElement("p");
  summary.classList.add("prescription-summary");
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
  statusLabel.classList.add("prescription-status");
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
    },
  );

  const deleteButton = createButton("", null, "button", () => {
    prescriptionItem.remove();
    const idx = medication.prescriptions.indexOf(prescription);
    if (idx !== -1) {
      medication.prescriptions.splice(idx, 1);
    }
  });
  deleteButton.innerHTML = trashIcon;
  deleteButton.setAttribute("aria-label", "Delete");

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
  ordersTitle.classList.add("orders-title");
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

  // after initializing orders array
  prescription.orders.forEach((order) => {
    const item = OrderItem(updateSummary, updateSummary, order); // update OrderItem to accept initial values
    ordersList.appendChild(item);
  });
  updateSummary();

  const saveOrdersButton = createButton("Save Orders", null, "button", () => {
    const orderItems = ordersList.querySelectorAll(".order-item");
    prescription.orders = Array.from(orderItems).map((item) => item.getData());
    updateSummary();

    // Persist immediately if rootData is provided (rendered from saved data)
    if (rootData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rootData));
    }
    // Otherwise, the form flow will collect on final Save
  });
  ordersSection.appendChild(saveOrdersButton);

  prescriptionItem.appendChild(ordersSection);

  return prescriptionItem;
}
