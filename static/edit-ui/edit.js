// const imageOptions = [
//   { label: "Must", value: "Must", image: "./assets/w.png" },
//   { label: "Should", value: "Should", image: "./assets/w.png" },
//   { label: "Could", value: "Could", image: "./assets/w.png" },
//   { label: "Would", value: "Would", image: "./assets/w.png" }
// ];

// AP.customField.onInit(async function() {
//   const fieldEl = document.getElementById("app");

//   // Create dropdown
//   const select = document.createElement("select");
//   select.id = "dropdown";
//   imageOptions.forEach(opt => {
//     const option = document.createElement("option");
//     option.value = opt.value;
//     option.textContent = opt.label;
//     select.appendChild(option);
//   });
//   fieldEl.appendChild(select);

//   // Update Jira with selection
//   select.addEventListener("change", () => {
//     AP.customField.setValue(select.value);
//   });
// });



















async function getImageOptions() {
  const files = {
    Must: "w.png",
    Should: "w.png",
    Could: "w.png",
    Would: "w.png",
  };

  const options = [];
  for (const [label, file] of Object.entries(files)) {
    const url = await AP.customField.resolveStaticResource(`assets/${file}`);
    options.push({ label, value: label, image: url });
  }
  return options;
}

AP.customField.onInit(async function () {
  const fieldEl = document.getElementById("app");

  const imageOptions = await getImageOptions();

  // Build dropdown
  const select = document.createElement("select");
  select.id = "dropdown";
  select.style.padding = "6px";
  select.style.width = "150px";

  imageOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });
  fieldEl.appendChild(select);

  // Preview image
  const preview = document.createElement("img");
  preview.id = "imagePreview";
  preview.style.display = "none";
  preview.style.marginTop = "10px";
  preview.style.width = "120px";
  preview.style.border = "1px solid #ccc";
  preview.style.borderRadius = "4px";
  fieldEl.appendChild(preview);

  // Load saved value
  const currentValue = await AP.customField.getValue();
  if (currentValue) {
    select.value = currentValue;
    const selected = imageOptions.find((o) => o.value === currentValue);
    if (selected) {
      preview.src = selected.image;
      preview.style.display = "block";
    }
  }

  // On change
  select.addEventListener("change", () => {
    const selected = imageOptions.find((o) => o.value === select.value);
    if (selected) {
      preview.src = selected.image;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
    AP.customField.setValue(select.value);
  });
});


