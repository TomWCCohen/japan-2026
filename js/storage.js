/* ============================================================
   LOCAL PERSISTENCE — separate from trip data (data.js).
   Everything the user adds/changes on the phone lives here,
   under a single namespaced prefix, so export/import can
   grab it all in one shot.
   ============================================================ */

const STORAGE_PREFIX = "japon2026.";
const STORAGE_KEYS = {
  checklist: STORAGE_PREFIX + "checklist",       // { [isoDate]: { [itemId]: bool } }
  notes: STORAGE_PREFIX + "notes",                // { [isoDate]: "free text" }
  expenses: STORAGE_PREFIX + "expenses",          // [ {id, amount, currency, category, city, date, note, outOfBudget} ]
  activitiesAdded: STORAGE_PREFIX + "activitiesAdded", // [ {id, activityId, cityId, titleFr, titleEn, addedAt} ]
  lang: STORAGE_PREFIX + "lang",
  seeded: STORAGE_PREFIX + "seeded",
};

function loadJSON(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(raw === null) return fallback;
    return JSON.parse(raw);
  }catch(e){
    console.warn("Storage read failed for", key, e);
    return fallback;
  }
}
function saveJSON(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }catch(e){
    console.warn("Storage write failed for", key, e);
    return false;
  }
}

function getChecklist(){ return loadJSON(STORAGE_KEYS.checklist, {}); }
function setChecklistItem(isoDate, itemId, checked){
  const all = getChecklist();
  if(!all[isoDate]) all[isoDate] = {};
  all[isoDate][itemId] = checked;
  saveJSON(STORAGE_KEYS.checklist, all);
}

function getExpenses(){ return loadJSON(STORAGE_KEYS.expenses, []); }
function addExpense(expense){
  const all = getExpenses();
  all.push(Object.assign({ id: "exp-" + Date.now() + "-" + Math.random().toString(36).slice(2,7) }, expense));
  saveJSON(STORAGE_KEYS.expenses, all);
}
function deleteExpense(id){
  const all = getExpenses().filter(e => e.id !== id);
  saveJSON(STORAGE_KEYS.expenses, all);
}

function getActivitiesAdded(){ return loadJSON(STORAGE_KEYS.activitiesAdded, []); }
function addActivityAdded(entry){
  const all = getActivitiesAdded();
  all.push(Object.assign({ id: "added-" + Date.now() + "-" + Math.random().toString(36).slice(2,7), addedAt: new Date().toISOString() }, entry));
  saveJSON(STORAGE_KEYS.activitiesAdded, all);
}
function removeActivityAdded(id){
  const all = getActivitiesAdded().filter(a => a.id !== id);
  saveJSON(STORAGE_KEYS.activitiesAdded, all);
}

/* One-time default seed: the two known out-of-budget tracked items. */
function seedDefaultsOnce(){
  if(loadJSON(STORAGE_KEYS.seeded, false)) return;
  const existing = getExpenses();
  if(existing.length === 0){
    addExpense({ amount:0, currency:"USD", category:"Shopping", city:"Tokyo", date:"", note:"Montre vintage", outOfBudget:true });
    addExpense({ amount:0, currency:"USD", category:"Shopping", city:"Tokyo", date:"", note:"Appareil photo", outOfBudget:true });
  }
  saveJSON(STORAGE_KEYS.seeded, true);
}

/* ============ export / import ============ */
function exportAllData(){
  const bundle = {
    exportedAt: new Date().toISOString(),
    app: "japon-2026",
    version: 1,
    data: {}
  };
  Object.entries(STORAGE_KEYS).forEach(([name, key])=>{
    const raw = localStorage.getItem(key);
    if(raw !== null){
      try{ bundle.data[name] = JSON.parse(raw); }catch(e){ /* skip corrupt entry */ }
    }
  });
  return bundle;
}

function downloadExport(){
  const bundle = exportAllData();
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `japon-2026-sauvegarde-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=> URL.revokeObjectURL(url), 2000);
}

function importFromFile(file, onDone){
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const bundle = JSON.parse(reader.result);
      if(!bundle || !bundle.data) throw new Error("format inattendu");
      Object.entries(bundle.data).forEach(([name, value])=>{
        const key = STORAGE_KEYS[name];
        if(key) saveJSON(key, value);
      });
      onDone(true);
    }catch(e){
      console.warn("Import failed", e);
      onDone(false);
    }
  };
  reader.onerror = () => onDone(false);
  reader.readAsText(file);
}

function resetAllData(){
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
