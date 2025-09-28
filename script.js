// ✅ Verificar estado de la API al cargar
async function checkApiStatus() {
  try {
    const response = await fetch('https://server-congestion-predictor-production.up.railway.app/health');
    const data = await response.json();
    document.getElementById('apiStatus').innerHTML = data.status === 'ok'
      ? `<div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div><span class="text-green-600">API conectada ✓</span>`
      : `<div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div><span class="text-red-600">API desconectada ✗</span>`;
  } catch {
    document.getElementById('apiStatus').innerHTML = `
      <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
      <span class="text-red-600">Error de conexión ✗</span>
    `;
  }
}
checkApiStatus();

// ✅ Enviar formulario
document.getElementById("predictForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  for (let key in data) if (!isNaN(data[key]) && data[key] !== "") data[key] = Number(data[key]);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="loading-spinner mb-4"></div><div class="text-gray-600"><i class="fas fa-cog fa-spin mr-2"></i>Analizando datos del tráfico...</div>`;

  try {
    const res = await fetch("https://server-congestion-predictor-production.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    json.status === "success" ? renderPrediction(json.prediction) : showError("Error en la predicción", json.detail || "No se pudo procesar la solicitud");
  } catch {
    showError("Error de conexión", "No se pudo conectar con la API");
  }
});

function renderPrediction(pred) {
  const resultDiv = document.getElementById("result");
  const confidence = (pred.confidence * 100).toFixed(1);
  let resultClass = pred.predicted_class === 'Fast' ? 'result-fast' : pred.predicted_class === 'Slow' ? 'result-slow' : 'result-moderate';
  let icon = pred.predicted_class === 'Fast' ? 'fa-tachometer-alt' : pred.predicted_class === 'Slow' ? 'fa-exclamation-triangle' : 'fa-traffic-light';

  resultDiv.innerHTML = `
    <div class="fade-in">
      <div class="text-center mb-6">
        <i class="fas ${icon} text-4xl ${resultClass} mb-2"></i>
        <h4 class="text-2xl font-bold ${resultClass}">${pred.predicted_class}</h4>
        <p class="text-gray-600">Velocidad de tráfico predicha</p>
      </div>
      <div class="bg-gray-100 rounded-lg p-4 mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium">Confianza</span>
          <span class="text-sm font-bold">${confidence}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style="width: ${confidence}%"></div>
        </div>
      </div>
      <div class="space-y-3">
        <h5 class="font-semibold text-gray-800 mb-2">Probabilidades detalladas:</h5>
        ${Object.entries(pred.class_probabilities).map(([cls, prob]) => `
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium w-20">${cls}</span>
            <div class="flex-1 mx-3 bg-gray-200 rounded-full h-2">
              <div class="${cls === 'Moderate' ? 'bg-yellow-500' : cls === 'Slow' ? 'bg-red-500' : 'bg-green-500'} h-2 rounded-full" style="width: ${(prob * 100).toFixed(1)}%"></div>
            </div>
            <span class="text-sm font-bold w-12">${(prob * 100).toFixed(1)}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function showError(title, message) {
  document.getElementById("result").innerHTML = `
    <div class="text-center text-red-600 fade-in">
      <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
      <p class="font-semibold">${title}</p>
      <p class="text-sm mt-1">${message}</p>
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", () => {

// ✅ Verificar estado de la API al cargar
async function checkApiStatus() {
  try {
    const response = await fetch('https://server-congestion-predictor-production.up.railway.app/health');
    const data = await response.json();
    document.getElementById('apiStatus').innerHTML = data.status === 'ok'
      ? `<div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div><span class="text-green-600">API conectada ✓</span>`
      : `<div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div><span class="text-red-600">API desconectada ✗</span>`;
  } catch {
    document.getElementById('apiStatus').innerHTML = `
      <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
      <span class="text-red-600">Error de conexión ✗</span>
    `;
  }
}
checkApiStatus();


// ✅ Lógica principal del formulario
document.getElementById("predictForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  for (let key in data) if (!isNaN(data[key]) && data[key] !== "") data[key] = Number(data[key]);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="loading-spinner mb-4"></div><div class="text-gray-600"><i class="fas fa-cog fa-spin mr-2"></i>Analizando datos del tráfico...</div>`;

  try {
    const res = await fetch("https://server-congestion-predictor-production.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    json.status === "success" ? renderPrediction(json.prediction) : showError("Error en la predicción", json.detail || "No se pudo procesar la solicitud");
  } catch {
    showError("Error de conexión", "No se pudo conectar con la API");
  }
});


// ✅ Mostrar resultado
function renderPrediction(pred) {
  const resultDiv = document.getElementById("result");
  const confidence = (pred.confidence * 100).toFixed(1);
  let resultClass = pred.predicted_class === 'Fast' ? 'result-fast' : pred.predicted_class === 'Slow' ? 'result-slow' : 'result-moderate';
  let icon = pred.predicted_class === 'Fast' ? 'fa-tachometer-alt' : pred.predicted_class === 'Slow' ? 'fa-exclamation-triangle' : 'fa-traffic-light';

  resultDiv.innerHTML = `
    <div class="fade-in">
      <div class="text-center mb-6">
        <i class="fas ${icon} text-4xl ${resultClass} mb-2"></i>
        <h4 class="text-2xl font-bold ${resultClass}">${pred.predicted_class}</h4>
        <p class="text-gray-600">Velocidad de tráfico predicha</p>
      </div>
      <div class="bg-gray-100 rounded-lg p-4 mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium">Confianza</span>
          <span class="text-sm font-bold">${confidence}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style="width: ${confidence}%"></div>
        </div>
      </div>
      <div class="space-y-3">
        <h5 class="font-semibold text-gray-800 mb-2">Probabilidades detalladas:</h5>
        ${Object.entries(pred.class_probabilities).map(([cls, prob]) => `
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium w-20">${cls}</span>
            <div class="flex-1 mx-3 bg-gray-200 rounded-full h-2">
              <div class="${cls === 'Moderate' ? 'bg-yellow-500' : cls === 'Slow' ? 'bg-red-500' : 'bg-green-500'} h-2 rounded-full" style="width: ${(prob * 100).toFixed(1)}%"></div>
            </div>
            <span class="text-sm font-bold w-12">${(prob * 100).toFixed(1)}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


// ✅ Mostrar errores
function showError(title, message) {
  document.getElementById("result").innerHTML = `
    <div class="text-center text-red-600 fade-in">
      <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
      <p class="font-semibold">${title}</p>
      <p class="text-sm mt-1">${message}</p>
    </div>
  `;
}


// ✅ Estados y Condados dinámicos
document.addEventListener("DOMContentLoaded", () => {
  const countiesByState = {
    "AL": ["Baldwin", "Jefferson", "Madison", "Mobile"],
    "AR": ["Pulaski"],
    "AZ": ["Coconino", "Maricopa", "Pima"],
    "CA": ["Alameda", "Contra Costa", "El Dorado", "Kern", "Los Angeles", "Marin", "Monterey", "Napa", "Orange", "Placer", "Riverside", "Sacramento", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Mateo", "Santa Barbara", "Santa Clara", "Santa Cruz", "Solano", "Sonoma", "Stanislaus", "Ventura", "Yolo", "Nevada"],
    "CO": ["Adams", "Arapahoe", "Boulder", "Clear Creek", "Denver", "Douglas", "Eagle", "Garfield", "Jefferson", "Larimer", "Weld"],
    "CT": ["Fairfield", "Hartford", "Middlesex", "New Haven"],
    "DC": ["District of Columbia"],
    "DE": ["New Castle"],
    "FL": ["Bay", "Brevard", "Broward", "Collier", "Duval", "Hillsborough", "Lee", "Manatee", "Martin", "Miami-Dade", "Okaloosa", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Sarasota", "Seminole", "St. Johns", "Volusia", "Walton"],
    "GA": ["Chatham", "Cherokee", "Clayton", "Cobb", "DeKalb", "Dekalb", "Fulton", "Gwinnett", "Henry"],
    "IA": ["Polk"],
    "IL": ["Cook", "DuPage", "Kane", "Lake", "Will"],
    "IN": ["Marion"],
    "KY": ["Boone", "Fayette", "Jefferson"],
    "LA": ["East Baton Rouge", "Jefferson", "Orleans"],
    "MA": ["Barnstable", "Bristol", "Hampden", "Middlesex", "Norfolk", "Plymouth", "Suffolk", "Worcester"],
    "MD": ["Anne Arundel", "Baltimore City", "Baltimore County", "Carroll", "Frederick", "Howard", "Montgomery", "Prince George's"],
    "MI": ["Macomb", "Oakland", "Washtenaw", "Wayne"],
    "MN": ["Hennepin", "Ramsey"],
    "MO": ["Boone", "Greene", "Jackson", "St. Charles", "St. Louis County"],
    "NC": ["Buncombe", "Mecklenburg", "Wake"],
    "NH": ["Rockingham"],
    "NJ": ["Bergen", "Burlington", "Camden", "Essex", "Hudson", "Middlesex", "Monmouth", "Morris", "Ocean", "Passaic", "Somerset", "Sussex"],
    "NM": ["Bernalillo"],
    "NV": ["Clark", "Washoe"],
    "NY": ["Albany", "Bronx", "Kings", "Nassau", "New York", "Queens", "Richmond", "Rockland", "Suffolk", "Westchester"],
    "OH": ["Cuyahoga", "Franklin", "Summit"],
    "OK": ["Oklahoma", "Tulsa"],
    "OR": ["Clackamas", "Columbia", "Multnomah", "Umatilla"],
    "PA": ["Allegheny", "Berks", "Bucks", "Butler", "Carbon", "Chester", "Crawford", "Cumberland", "Dauphin", "Delaware", "Erie", "Lancaster", "Lehigh", "Montgomery", "Philadelphia", "Westmoreland"],
    "RI": ["Providence"],
    "SC": ["Charleston", "Greenville", "Horry", "Jasper", "Lexington", "Richland"],
    "TN": ["Davidson", "Knox", "Shelby", "Sevier"],
    "TX": ["Bexar", "Collin", "Dallas", "Denton", "Fort Bend", "Galveston", "Harris", "Hidalgo", "McLennan", "Smith", "Tarrant", "Travis", "Webb", "Williamson"],
    "UT": ["Salt Lake", "Utah"],
    "VA": ["Arlington", "Fairfax", "Fairfax County", "Loudoun", "Prince William", "Richmond", "Richmond City", "Stafford"],
    "WA": ["King", "Kittitas", "Pierce", "Snohomish", "Spokane"],
    "WI": ["Milwaukee"],
    "Other": ["Other"]
  };

  const stateSelect = document.querySelector("select[name='state']");
  const countySelect = document.querySelector("select[name='county']");

  // 🌀 Llenar automáticamente todos los estados
  stateSelect.innerHTML = Object.keys(countiesByState)
    .map(state => `<option value="${state}">${state}</option>`)
    .join("");

  // 🌀 Llenar condados iniciales
  const defaultState = stateSelect.value || "MD";
  countySelect.innerHTML = countiesByState[defaultState].map(c => `<option value="${c}">${c}</option>`).join("");

  // 🌀 Actualizar condados cuando cambie el estado
  stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    const counties = countiesByState[selectedState] || ["Other"];
    countySelect.innerHTML = counties.map(c => `<option value="${c}">${c}</option>`).join("");
  });
});
});