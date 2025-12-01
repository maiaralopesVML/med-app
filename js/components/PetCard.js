import { formatDate } from "../utils/domHelper.js";

export function PetCard(data) {
    const petCard = document.createElement("div");
    petCard.classList.add("pet-card");

    const petName = document.createElement("h2");
    petName.textContent = data.pet.name;
    petCard.appendChild(petName);

  const petDOB = document.createElement("p");
  petDOB.textContent = `Date of birth: ${formatDate(data.pet.dob)}`;
  petCard.appendChild(petDOB);

    const petCountry = document.createElement("p");
    petCountry.textContent = `Country of origin: ${data.pet.country}`;
    petCard.appendChild(petCountry);

    const conditionsTitle = document.createElement("h3");
    conditionsTitle.textContent = "Conditions";
    petCard.appendChild(conditionsTitle);

    const conditionsList = document.createElement("ul");
    data.pet?.conditions?.forEach((condition) => {
        const conditionItem = document.createElement("li");
        conditionItem.textContent = condition;
        conditionsList.appendChild(conditionItem);
    });
    petCard.appendChild(conditionsList);

    const medicationsTitle = document.createElement("h3");
    medicationsTitle.textContent = "Medications";
    petCard.appendChild(medicationsTitle);

    const medicationsList = document.createElement("ul");
    data.medications?.forEach((medication) => {
        const medicationItem = document.createElement("li");
        
        const title = document.createElement("h4");
        title.textContent = medication.name || "No Name";
        medicationItem.appendChild(title);

        if(medication.dosage && (medication.dosage.value || medication.dosage.unit)) {
            const dosage = document.createElement("p");
            dosage.textContent = `Dosage: ${medication.dosage.value} ${medication.dosage.unit}`;
            medicationItem.appendChild(dosage);

            if (medication.oneTime) {
                const oneTime = document.createElement("p");
                oneTime.textContent = "One Time Dose";
                medicationItem.appendChild(oneTime);
            }

            const {frequency} = medication || {};
            if (frequency) {
                const frequecyList = document.createElement("ul");
                if(frequency.morning) {
                    const morningItem = document.createElement("li");
                    morningItem.textContent = `Morning: ${frequency.morning}`;
                    frequecyList.appendChild(morningItem);
                }
                if(frequency.afternoon) {
                    const afternoonItem = document.createElement("li");
                    afternoonItem.textContent = `Afternoon: ${frequency.afternoon}`;
                    frequecyList.appendChild(afternoonItem);
                }
                if(frequency.evening) {
                    const eveningItem = document.createElement("li");
                    eveningItem.textContent = `Evening: ${frequency.evening}`;
                    frequecyList.appendChild(eveningItem);
                }
                if(frequency.extraDoses && frequency.extraDoses.length > 0) {
                    frequency.extraDoses.forEach((extraDose, index) => {
                        const extraDoseItem = document.createElement("li");
                        extraDoseItem.textContent = `Extra Dose ${index + 1}: ${extraDose.value} ${extraDose.unit}`.trim();
                        frequecyList.appendChild(extraDoseItem);
                    });
                }
                medicationItem.appendChild(frequecyList);
            }
        }
        medicationsList.appendChild(medicationItem);
    });
    petCard.appendChild(medicationsList);

    return petCard;
}
    
