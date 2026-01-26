import { PrescriptionCard } from "./PrescriptionCard.js";

export function MedicationCard(medication) {
  const medicationItem = document.createElement("li");
  medicationItem.classList.add("medication-item");

  const title = document.createElement("h4");
  title.textContent = medication.name || "No Name";
  medicationItem.appendChild(title);

  if (
    medication.dosage &&
    (medication.dosage.value || medication.dosage.unit)
  ) {
    const dosage = document.createElement("p");
    dosage.textContent = `Dosage: ${medication.dosage.value} ${medication.dosage.unit}`;
    medicationItem.appendChild(dosage);

    if (medication.oneTime) {
      const oneTime = document.createElement("p");
      oneTime.textContent = "One Time Dose";
      medicationItem.appendChild(oneTime);
    }

    const { frequency } = medication || {};
    const timePeriod = ["morning", "afternoon", "evening"];
    const frequencyList = document.createElement("ul");
    frequencyList.classList.add("frequency-list");
    timePeriod.forEach((time) => {
      if (frequency?.[time]) {
        const timeItem = document.createElement("li");
        timeItem.textContent = `${
          time.charAt(0).toUpperCase() + time.slice(1)
        }: ${frequency[time]}`;
        frequencyList.appendChild(timeItem);
      }
    });
    if (frequency) {
      if (frequency.extraDoses && frequency.extraDoses.length > 0) {
        frequency.extraDoses.forEach((extraDose, index) => {
          const extraDoseItem = document.createElement("li");
          extraDoseItem.textContent = `Extra Dose ${index + 1}: ${
            extraDose.value
          } ${extraDose.unit}`.trim();
          frequencyList.appendChild(extraDoseItem);
        });
      }
      medicationItem.appendChild(frequencyList);
    }

    if (medication.prescriptions && medication.prescriptions.length > 0) {
      const prescriptionTitle = document.createElement("h4");
      prescriptionTitle.classList.add("prescription-title");
      prescriptionTitle.textContent = "Prescriptions";
      medicationItem.appendChild(prescriptionTitle);

      const prescriptionsList = document.createElement("ul");
      prescriptionsList.classList.add("prescriptions-list");
      medication.prescriptions.forEach((prescription) => {
        prescriptionsList.appendChild(
          PrescriptionCard(prescription, medication),
        );
      });

      medicationItem.appendChild(prescriptionsList);
    }
  }

  return medicationItem;
}
