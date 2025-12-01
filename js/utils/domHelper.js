export function createFieldset(legendText) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = legendText;
  fieldset.appendChild(legend);

  return fieldset;
}
export function createInput(labelText, type, id, readOnly = false, value = "") {
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  if (readOnly) {
    input.readOnly = true;
    input.setAttribute("aria-readonly", "true");
  }
  if (value !== "") input.value = value;

  const container = document.createElement("div");
  container.appendChild(label);
  container.appendChild(input);

  return container;
}

export function createInputWithSelect(labelText, type, id, array = []) {
  const container = createInput(labelText, type, id);
  const select = document.createElement("select");
  select.name = `${id}-unit`;
  array.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  container.appendChild(select);
  return container;
}

export function createInputWithSelectTimeAndDelete(
  labelText,
  type,
  id,
  array = []
) {
  const container = createInputWithSelect(labelText, type, id, array);
  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.id = `${id}-time`;
  timeInput.name = `${id}-time`;
  const timeLabel = document.createElement("label");
  timeLabel.htmlFor = timeInput.id;
  timeLabel.textContent = "at";
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = `delete-${id}-button`;
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => container.remove());
  container.appendChild(timeLabel);
  container.appendChild(timeInput);
  container.appendChild(deleteButton);
  return container;
}

export function createInputWithDeleteButton(labelText, type, id) {
  const container = createInput(labelText, type, id);
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = `delete-${id}-button`;
  deleteButton.textContent = "Delete";
  container.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => container.remove());
  return container;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}