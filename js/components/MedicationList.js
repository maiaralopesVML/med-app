export function MedicationList() {
  const medForm = document.createElement("form");
  function createInput(labelText, type, id, readOnly = false) {
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    if (readOnly) input.readOnly = true;

    const container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(input);

    return container;
  }

  function createFieldset(legendText) {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = legendText;
    fieldset.appendChild(legend);

    return fieldset;
  }
  const submitButton = document.createElement("button");
  submitButton.id = "submit-button";
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  const medicationInfoFieldset = createFieldset("Medication Information");
  medicationInfoFieldset.appendChild(
    createInput("Medication Name", "text", "med-name")
  );
  medicationInfoFieldset.appendChild(
    createInput("mg per Unit", "number", "med-mg")
  );

  const dosageFieldset = createFieldset("Dosage Information");
  dosageFieldset.appendChild(
    createInput("Times per Day", "number", "med-times-per-day")
  );
  dosageFieldset.appendChild(
    createInput("Morning Dose", "number", "med-morning")
  );
  dosageFieldset.appendChild(
    createInput("Evening Dose", "number", "med-evening")
  );

  const prescriptionFieldset = createFieldset("Prescription Details");
  prescriptionFieldset.appendChild(
    createInput("Prescription Start Date", "date", "med-prescription-start")
  );
  prescriptionFieldset.appendChild(
    createInput(
      "Prescription Expiration Date",
      "date",
      "med-prescription-exiration"
    )
  );
  prescriptionFieldset.appendChild(
    createInput("Amount", "number", "med-prescription-amount")
  );
  prescriptionFieldset.appendChild(
    createInput("Repetitions", "number", "med-prescription-repetitions")
  );
  prescriptionFieldset.appendChild(
    createInput("Total", "number", "med-prescription-total", true)
  );
  prescriptionFieldset.appendChild(
    createInput(
      "Estimated Next Order Date",
      "date",
      "med-prescription-next-order",
      true
    )
  );

  medForm.appendChild(medicationInfoFieldset);
  medForm.appendChild(dosageFieldset);
  medForm.appendChild(prescriptionFieldset);
  medForm.appendChild(submitButton);

  return medForm;
}
