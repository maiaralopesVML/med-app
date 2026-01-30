function formatDose(formData, baseName) {
  const value = formData.get(baseName) || "";
  const unit = formData.get(`${baseName}-unit`) || "";
  if (!value) return "";

  if (!unit) return value;
  return `${value} ${unit}`;
}

export function collectAllDataFromPage() {
  const petForm =
    document.querySelector("#pet-form form") ||
    document.getElementById("pet-form");
  const petData = new FormData(petForm);
  const pet = {
    name: petData.get("pet-name") || "",
    dob: petData.get("pet-dob") || "",
    country: petData.get("pet-country") || "",
    conditions: Array.from(petData.entries())
      .filter(([key]) => key.startsWith("pet-condition-"))
      .map(([, value]) => value)
      .filter((v) => v.trim() !== ""),
  };

  const medicationForms = document.querySelectorAll(
    "#medications-container form#medication-form",
  );
  const medications = Array.from(medicationForms).map((form) => {
    const formData = new FormData(form);
    const prescriptionForms = form.querySelectorAll(
      "#prescriptions-list form#prescription-form",
    );
    const prescriptions = Array.from(prescriptionForms).map(
      (prescriptionForm) => {
        const prescriptionData = new FormData(prescriptionForm);
        const fieldset = prescriptionForm.querySelector("fieldset");
        const orderItems = prescriptionForm.querySelectorAll(".order-item");
        const orders = Array.from(orderItems).map((item) => {
          const data = item.getData
            ? item.getData()
            : { date: "", quantity: 0 };
          return { date: data.date, quantity: data.quantity };
        });

        return {
          startDate: prescriptionData.get("med-prescription-start") || "",
          expirationDate:
            prescriptionData.get("med-prescription-expiration") || "",
          amount: {
            value: prescriptionData.get("med-prescription-amount") || "",
            unit: prescriptionData.get("med-prescription-amount-unit") || "",
          },
          repetitions:
            prescriptionData.get("med-prescription-repetitions") || "",
          total: prescriptionData.get("med-prescription-total") || "",
          nextOrderDate:
            prescriptionData.get("med-prescription-next-order") || "",
          status:
            fieldset && fieldset.classList.contains("inactive")
              ? "ended"
              : "active",
          orders,
        };
      },
    );

    return {
      name: formData.get("med-name") || "",
      dosage: {
        value: formData.get("med-dosage") || "",
        unit: formData.get("med-dosage-unit") || "",
      },
      oneTime: formData.get("med-one-time") === "on",
      frequency: {
        morning: formatDose(formData, "med-morning"),
        afternoon: formatDose(formData, "med-afternoon"),
        evening: formatDose(formData, "med-evening"),
        extraDoses: Array.from(formData.entries())
          .filter(
            ([key]) => key.startsWith("med-dose-") && !key.endsWith("-time"),
          )
          .map(([, value]) => value)
          .filter((v) => v.trim() !== ""),
      },
      prescriptions,
    };
  });

  return { pet, medications };
}
