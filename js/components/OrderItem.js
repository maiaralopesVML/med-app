import { createInput, createButton } from "../utils/domHelper.js";

export function OrderItem(onDelete, onUpdate, initial = {}) {
  const container = document.createElement("div");
  container.classList.add("order-item");

  const today = new Date().toISOString().split("T")[0];
  const dateContainer = createInput("Date", "date", `order-date-${Date.now()}`);
  const dateInput = dateContainer.querySelector("input");
  dateInput.value = initial.date || today;

  const quantityContainer = createInput(
    "Quantity",
    "number",
    `order-quantity-${Date.now()}`,
  );
  const quantityInput = quantityContainer.querySelector("input");
  quantityInput.value = initial.quantity ?? 1;
  quantityInput.min = 1;

  const deleteButton = createButton("Delete", null, "button", () => {
    container.remove();
    if (onDelete) onDelete();
  });
  dateInput.addEventListener("input", () => {
    if (onUpdate) onUpdate();
  });
  quantityInput.addEventListener("input", () => {
    if (onUpdate) onUpdate();
  });

  container.appendChild(dateContainer);
  container.appendChild(quantityContainer);
  container.appendChild(deleteButton);

  container.getData = () => ({
    date: dateInput.value,
    quantity: parseFloat(quantityInput.value) || 0,
  });

  return container;
}
