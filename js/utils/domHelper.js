export function createInput(labelText, type, id, readOnly = false, value = "") {
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
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

export function createFieldset(legendText) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = legendText;
  fieldset.appendChild(legend);

  return fieldset;
}

export function createInputWithSelect(labelText, type, id, array = []) {
  const container = createInput(labelText, type, id);
  const select = document.createElement("select");
  array.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  container.appendChild(select);
  return container;
}
