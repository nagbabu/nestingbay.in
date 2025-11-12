// ============ CATEGORY MANAGEMENT ============
function addCategory() {
  const container = document.getElementById("categoriesContainer");

  const row = document.createElement("div");
  row.className = "form-row";

  row.innerHTML = `
    <input type="text" placeholder="Category Name" class="categoryName" />
    <input type="number" placeholder="Surface Area (sq ft)" class="surfaceArea" min="0" />
    <input type="number" placeholder="Profile Glass (sq ft)" class="profileGlass" min="0" />
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  container.appendChild(row);
}

// ============ MATERIAL CALCULATIONS ============
function calculateMaterials() {
  const categories = document.querySelectorAll("#categoriesContainer .form-row");
  const resultsSection = document.getElementById("resultsSection");
  const tbody = document.getElementById("resultsBody");
  const tfoot = document.getElementById("resultsFooter");

  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  if (categories.length === 0) {
    alert("Please add at least one category!");
    return;
  }

  let totals = {
    area: 0,
    profileGlass: 0,
    plywood: 0,
    outerLaminate: 0,
    innerLaminate: 0,
    adhesive: 0,
    edgeBanding: 0,
  };

  categories.forEach((row) => {
    const name = row.querySelector(".categoryName").value || "Untitled";
    const area = parseFloat(row.querySelector(".surfaceArea").value) || 0;
    const profileGlass = parseFloat(row.querySelector(".profileGlass").value) || 0;

    const plywoodSheets = Math.ceil((area / 32) * 1.1);
    const outerLaminate = Math.ceil((area / 32) * 1.1);
    const innerLaminate = Math.ceil((area / 32) * 1.1);
    const adhesive = (area / 34) * 2;
    const edgeBanding = area * 0.5;

    tbody.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${area.toFixed(2)}</td>
        <td>${profileGlass.toFixed(2)}</td>
        <td>${plywoodSheets}</td>
        <td>${outerLaminate}</td>
        <td>${innerLaminate}</td>
        <td>${adhesive.toFixed(2)}</td>
        <td>${edgeBanding.toFixed(2)}</td>
      </tr>
    `;

    totals.area += area;
    totals.profileGlass += profileGlass;
    totals.plywood += plywoodSheets;
    totals.outerLaminate += outerLaminate;
    totals.innerLaminate += innerLaminate;
    totals.adhesive += adhesive;
    totals.edgeBanding += edgeBanding;
  });

  tfoot.innerHTML = `
    <tr>
      <td><b>Total</b></td>
      <td>${totals.area.toFixed(2)}</td>
      <td>${totals.profileGlass.toFixed(2)}</td>
      <td>${totals.plywood}</td>
      <td>${totals.outerLaminate}</td>
      <td>${totals.innerLaminate}</td>
      <td>${totals.adhesive.toFixed(2)}</td>
      <td>${totals.edgeBanding.toFixed(2)}</td>
    </tr>
  `;

  resultsSection.classList.remove("hidden");
  calculateCost();
}

// ============ COST CALCULATION ============
function calculateCost() {
  const tfoot = document.getElementById("resultsFooter");
  if (!tfoot.querySelector("tr")) return;

  const cells = tfoot.querySelectorAll("td");
  const totalArea = parseFloat(cells[1].textContent) || 0;
  const totalProfileGlass = parseFloat(cells[2].textContent) || 0;
  const totalPlywood = parseFloat(cells[3].textContent) || 0;
  const totalOuterLaminate = parseFloat(cells[4].textContent) || 0;
  const totalInnerLaminate = parseFloat(cells[5].textContent) || 0;
  const totalAdhesive = parseFloat(cells[6].textContent) || 0;
  const totalEdgeBand = parseFloat(cells[7].textContent) || 0;

  const plywoodPrice = parseFloat(document.getElementById("plywoodPrice").value) || 0;
  const laminatePrice = parseFloat(document.getElementById("laminatePrice").value) || 0;
  const adhesivePrice = parseFloat(document.getElementById("adhesivePrice").value) || 0;
  const edgeBandingPrice = parseFloat(document.getElementById("edgeBandingPrice").value) || 0;
  const labourRate = parseFloat(document.getElementById("labourRate").value) || 0;
  const hardwareCost = parseFloat(document.getElementById("hardwareCost").value) || 0;
  const profileGlassRate = parseFloat(document.getElementById("profileGlassRate").value) || 0;

  const materialCost =
    totalPlywood * plywoodPrice +
    (totalOuterLaminate + totalInnerLaminate) * laminatePrice +
    totalAdhesive * adhesivePrice +
    totalEdgeBand * edgeBandingPrice;

  const labourCost = totalArea * labourRate;
  const profileGlassCost = totalProfileGlass * profileGlassRate;

  const totalCost = materialCost + labourCost + hardwareCost + profileGlassCost;

  document.getElementById("totalCost").textContent =
    `₹ ${totalCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
