import { formatDate, createButton, trashIcon } from "../utils/domHelper.js";
import { OrderItem } from "./OrderItem.js";
import { STORAGE_KEY } from "../data/storage.js";

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
    const orderAccordions = ordersList.querySelectorAll(".order-accordion");
    const totalOrders = orderAccordions.length;

    let orderedAmount = 0;
    orderAccordions.forEach((item) => {
      const data = item.querySelector(".order-item")?.getData();
      orderedAmount += data?.quantity || 0;
    });

    const amountPerTime = parseFloat(prescription.amount?.value) || 0;
    const repetitions = parseInt(prescription.repetitions, 10) || 0;
    const totalTimes = 1 + repetitions;

    const remainingTimes = Math.max(totalTimes - totalOrders, 0);
    const remainingAmount = Math.max(
      totalTimes * amountPerTime - orderedAmount,
      0,
    );

    summaryP.innerHTML = [
      `Ordered: ${totalOrders} times | Total = ${orderedAmount}`,
      `Remaining: ${remainingTimes} times | Total = ${remainingAmount}`,
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
    orderHeader.setAttribute("aria-expanded", "false");
    const title = document.createElement("span");
    const displayDate =
      (orderData.date && formatDate(orderData.date)) ||
      today ||
      formatDate(new Date().toISOString().split("T")[0]);
    title.textContent = `Order — ${displayDate}`;
    orderHeader.appendChild(title);

    const orderBody = document.createElement("div");
    orderBody.classList.add("accordion-body");

    // Build form and view containers
    const orderItem = OrderItem(updateSummary, updateSummary, orderData);
    const internalDelete = orderItem.querySelector("button");
    if (internalDelete) internalDelete.remove();

    const orderFormWrapper = document.createElement("div");
    orderFormWrapper.appendChild(orderItem);

    const orderView = document.createElement("div");
    orderView.classList.add("order-view", "hidden");

    const renderView = (data) => {
      orderView.innerHTML = `
      <p>Date: ${formatDate(data.date) || "N/A"}</p>
      <p>Quantity: ${data.quantity ?? 0}</p>
    `;
      title.textContent = `Order — ${formatDate(data.date) || today}`;
    };

    const setMode = (mode) => {
      const isView = mode === "view";
      orderFormWrapper.classList.toggle("hidden", isView);
      orderView.classList.toggle("hidden", !isView);
      saveOrderBtn.classList.toggle("hidden", isView);
      editOrderBtn.classList.toggle("hidden", !isView);
      deleteOrderBtn.disabled = !isView;
    };

    const saveOrderBtn = createButton("Save Order", null, "button", () => {
      const data = orderItem.getData
        ? orderItem.getData()
        : { date: "", quantity: 0 };
      const idx = Array.from(ordersList.children).indexOf(li);
      if (idx >= 0) prescription.orders[idx] = data;
      else prescription.orders.push(data);
      renderView(data);
      setMode("view");
      updateSummary();
      if (rootData) localStorage.setItem(STORAGE_KEY, JSON.stringify(rootData));
    });

    const editOrderBtn = createButton("Edit Order", null, "button", () => {
      setMode("edit");
    });
    editOrderBtn.classList.add("hidden");

    const deleteOrderBtn = createButton(
      "",
      null,
      "button delete-button",
      () => {
        const idx = Array.from(ordersList.children).indexOf(li);
        if (idx >= 0) prescription.orders.splice(idx, 1);
        li.remove();
        updateSummary();
        if (rootData)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rootData));
      },
    );
    deleteOrderBtn.innerHTML = trashIcon;
    deleteOrderBtn.setAttribute("aria-label", "Delete");
    deleteOrderBtn.disabled = true;

    // Initial mode
    if (orderData.date || orderData.quantity) {
      renderView(orderData);
      setMode("view");
      deleteOrderBtn.disabled = false;
      editOrderBtn.classList.remove("hidden");
    } else {
      setMode("edit"); // new order
    }

    // Accordion toggle
    orderHeader.addEventListener("click", () => {
      const isOpen = orderBody.classList.toggle("open");
      li.classList.toggle("open", isOpen);
      orderHeader.setAttribute("aria-expanded", isOpen);
    });

    // Assemble
    orderBody.appendChild(orderFormWrapper);
    orderBody.appendChild(orderView);
    orderBody.appendChild(saveOrderBtn);
    orderBody.appendChild(editOrderBtn);
    orderBody.appendChild(deleteOrderBtn);

    li.append(orderHeader, orderBody);
    return li;
  };

  const renderOrderAccordion = (orderData = {}) => {
    const accordion = makeOrderAccordion(orderData);
    ordersList.appendChild(accordion);
    return accordion;
  };

  // Render existing orders (if any)
  prescription.orders.forEach((order) => renderOrderAccordion(order));

  // If none, create one empty and open it
  if (ordersList.childElementCount === 0) {
    const first = renderOrderAccordion();
    const body = first.querySelector(".accordion-body");
    first.classList.add("open");
    body.classList.add("open");
    first
      .querySelector(".accordion-header")
      .setAttribute("aria-expanded", "true");
  }

  // Add Order button (uses the helper and opens the new one)
  const addOrderButton = createButton("Add Order", null, "button", () => {
    const accordion = renderOrderAccordion();
    const body = accordion.querySelector(".accordion-body");
    accordion.classList.add("open");
    body.classList.add("open");
    accordion
      .querySelector(".accordion-header")
      .setAttribute("aria-expanded", "true");
    updateSummary();
  });
  ordersSection.appendChild(addOrderButton);

  // (keep Save Orders button and updateSummary calls as they are, after this block)
  updateSummary();

  body.appendChild(ordersSection);

  // Toggle prescription accordion
  headerBtn.addEventListener("click", () => {
    body.classList.toggle("open");
  });

  prescriptionItem.append(headerBtn, body);
  return prescriptionItem;
}
