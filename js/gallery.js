const imageBasePath = "nestingbay.in/images/";
let imageData = {};

// Load JSON once
async function loadImageData() {
  if (Object.keys(imageData).length) return;
  const res = await fetch(imageBasePath + "images.json");
  imageData = await res.json();

  // Set previews
  for (const type in imageData) {
    if (imageData[type].length > 0) {
      const preview = document.getElementById(type + "-preview");
      if (preview) {
        preview.innerHTML = `
          <img src="${imageBasePath}${type}/${imageData[type][0]}" 
               alt="${type} preview"
               class="mx-auto rounded-lg shadow-lg w-full max-w-lg h-64 object-cover">
        `;
      }
    }
  }
}

// Open gallery modal
function openGallery(type) {
  const modal = document.getElementById("gallery-modal");
  const title = document.getElementById("gallery-title");
  const imagesContainer = document.getElementById("gallery-images");

  title.textContent = type.replace("-", " ").toUpperCase();
  imagesContainer.innerHTML = "";

  if (imageData[type]) {
    imageData[type].forEach(file => {
      const img = document.createElement("img");
      img.src = `${imageBasePath}${type}/${file}`;
      img.alt = file;
      img.className = "w-full h-48 object-cover rounded-lg shadow";
      imagesContainer.appendChild(img);
    });
  }

  modal.classList.remove("hidden");
}

// Close gallery modal
function closeGallery() {
  document.getElementById("gallery-modal").classList.add("hidden");
}

// Initialize
loadImageData();
