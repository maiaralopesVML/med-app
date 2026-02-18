import { formatDate, createButton, trashIcon } from "../utils/domHelper.js";

export function PrescriptionCard(prescription, medication, rootData) {
  const prescriptionItem = document.createElement("li");
  prescriptionItem.classList.add("prescription-item", "accordion");

  const headerBtn = document.createElement("button");
  headerBtn.type = "button";
  headerBtn.classList.add("accordion-header");
  const title = document.createElement("span");
  const amountText = prescription.amount?.value
    ? `${prescription.amount.value} ${prescription.amount.unit}`.trim()
    : "N/A";
  title.innerHTML = `Prescription — ${amountText || "N/A"}`;
  const statusChip = document.createElement("span");
  statusChip.classList.add("status-chip");
  headerBtn.append(title, statusChip);

  const body = document.createElement("div");
  body.classList.add("accordion-body");

  // existing summary/stats
  const todayIso = new Date().toISOString().split("T")[0];
  const today = formatDate(todayIso);
  const summary = document.createElement("p");
  summary.classList.add("prescription-summary");
  summary.innerHTML = [
    `Starts: ${formatDate(prescription.startDate) || today}`,
    `Expires: ${formatDate(prescription.expirationDate) || today}`,
    amountText ? `Amount: ${amountText}` : null,
    `Repetitions: ${prescription.repetitions || "N/A"}`,
    `Total: ${prescription.total || "N/A"}`,
  ]
    .filter(Boolean)
    .join("<br>");
  body.appendChild(summary);

  const statusLabel = document.createElement("p");
  statusLabel.classList.add("prescription-status");
  const updateStatusLabel = () => {
    const isEnded = prescription.status === "ended";
    statusLabel.textContent = `Status: ${isEnded ? "Ended" : "Active"}`;
    statusChip.textContent = isEnded ? "Ended" : "Active";
    statusChip.classList.toggle("ended", isEnded);
  };
  updateStatusLabel();
  body.appendChild(statusLabel);

  const endButton = createButton("End", null, "button", () => {
    prescription.status = "ended";
    updateStatusLabel();
    syncButtons();
  });
  const reactivateButton = createButton("Reactivate", null, "button", () => {
    prescription.status = "active";
    updateStatusLabel();
    syncButtons();
  });
  const deleteButton = createButton("", null, "button", () => {
    prescriptionItem.remove();
    const idx = medication.prescriptions.indexOf(prescription);
    if (idx !== -1) medication.prescriptions.splice(idx, 1);
  });
  deleteButton.innerHTML = trashIcon;
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("aria-label", "Delete");

  const syncButtons = () => {
    const isEnded = prescription.status === "ended";
    endButton.disabled = isEnded;
    reactivateButton.disabled = !isEnded;
  };
  syncButtons();

  body.append(endButton, reactivateButton, deleteButton);

  // Orders section (nested accordion)
  const ordersSection = document.createElement("div");
  ordersSection.classList.add("orders-section");
  const ordersTitle = document.createElement("h5");
  ordersTitle.textContent = "Orders";
  ordersTitle.classList.add("orders-title");
  ordersSection.appendChild(ordersTitle);

  const ordersList = document.createElement("ul");
  ordersList.classList.add("orders-list");
  ordersSection.appendChild(ordersList);

  if (!prescription.orders) prescription.orders = [];

  const summaryP = document.createElement("p");
  summaryP.classList.add("summary-p");
  const updateSummary = () => {
    const orderItems = ordersList.querySelectorAll(".order-accordion");
    let totalOrdered = 0;
    orderItems.forEach((item) => {
      const data = item.querySelector(".order-item")?.getData();
      totalOrdered += data?.quantity || 0;
    });
    const amount = prescription.amount?.value || 0;
    const repetitions = parseInt(prescription.repetitions, 10) || 0;
    const totalTimes = 1 + repetitions;
    const orderedAmount = totalOrdered * amount;
    const remainingTimes = totalTimes - totalOrdered;
    const remainingAmount = remainingTimes * amount;
    summaryP.innerHTML = [
      `Ordered: ${totalOrdered} times | Total = ${orderedAmount}`,
      `Remaining: ${remainingTimes} repetitions | Total = ${remainingAmount}`,
    ].join("<br>");
  };
  updateSummary();
  ordersSection.appendChild(summaryP);

  const makeOrderAccordion = (orderData = {}) => {
    const li = document.createElement("li");
    li.classList.add("order-accordion", "accordion");
    const orderHeader = document.createElement("button");
    orderHeader.type = "button";
    orderHeader.classList.add("accordion-header");
    const title = document.createElement("span");
    title.textContent = `Order — ${orderData.date || "New"}`;
    orderHeader.appendChild(title);

    const orderBody = document.createElement("div");
    orderBody.classList.add("accordion-body");

    const orderItem = OrderItem(updateSummary, updateSummary, orderData);
    orderBody.appendChild(orderItem);

    orderHeader.addEventListener("click", () => {
      orderBody.classList.toggle("open");
    });

    li.append(orderHeader, orderBody);
    return li;
  };

  const addOrderButton = createButton("Add Order", null, "button", () => {
    const accordion = makeOrderAccordion();
    ordersList.appendChild(accordion);
    accordion.querySelector(".accordion-body").classList.add("open");
    updateSummary();
  });
  ordersSection.appendChild(addOrderButton);

  prescription.orders.forEach((order) => {
    const accordion = makeOrderAccordion(order);
    ordersList.appendChild(accordion);
  });
  updateSummary();

  const saveOrdersButton = createButton("Save Orders", null, "button", () => {
    const orderItems = ordersList.querySelectorAll(".order-item");
    prescription.orders = Array.from(orderItems).map((item) => item.getData());
    updateSummary();
    if (rootData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rootData));
    }
  });
  ordersSection.appendChild(saveOrdersButton);

  body.appendChild(ordersSection);

  // Toggle prescription accordion
  headerBtn.addEventListener("click", () => {
    body.classList.toggle("open");
  });

  prescriptionItem.append(headerBtn, body);
  return prescriptionItem;
}
