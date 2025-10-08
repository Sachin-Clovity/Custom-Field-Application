const imageFiles = {
  Must: "w.png",
  Should: "w.png",
  Could: "w.png",
  Would: "w.png",
};

const imageMap = Object.keys(imageFiles).reduce((acc, key) => {
  acc[key] = AP.customField.resolveStaticResource(`assets/${imageFiles[key]}`);
  return acc;
}, {});

AP.customField.onInit(async function () {
  const fieldEl = document.getElementById("app");
  const value = await AP.customField.getValue();

  if (value && imageMap[value]) {
    const img = document.createElement("img");
    img.src = imageMap[value];
    img.alt = value;
    img.style.width = "150px";
    img.style.border = "1px solid #ccc";
    img.style.borderRadius = "4px";
    fieldEl.appendChild(img);
  } else {
    fieldEl.textContent = "No value selected.";
  }
});
