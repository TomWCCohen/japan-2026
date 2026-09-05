/* ============================================================
   APP — rendering + state + interaction.
   Data comes from data.js, persistence from storage.js.
   ============================================================ */

const $  = (sel, root) => (root||document).querySelector(sel);
const $$ = (sel, root) => Array.from((root||document).querySelectorAll(sel));

function todayISO(){
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,"0"), day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function copyToClipboard(text, btnEl, labelFr, labelEn){
  const done = () => {
    if(!btnEl) return;
    const original = btnEl.innerHTML;
    btnEl.classList.add("copied");
    btnEl.innerHTML = `<span class="fr">${labelFr||"Copié ✓"}</span><span class="en">${labelEn||"Copied ✓"}</span>`;
    setTimeout(()=>{ btnEl.classList.remove("copied"); btnEl.innerHTML = original; }, 1600);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(()=> fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, done){
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand("copy"); done(); }catch(e){ console.warn("copy failed", e); }
  ta.remove();
}

/* ============ nav + lang ============ */
const TABS = [
  {id:"today", kj:"今日", labelFr:"Aujourd'hui", labelEn:"Today"},
  {id:"route", kj:"旅", labelFr:"Parcours", labelEn:"Route"},
  {id:"wallet", kj:"予", labelFr:"Réservations", labelEn:"Wallet"},
  {id:"budget", kj:"¥", labelFr:"Budget", labelEn:"Budget"},
  {id:"more", kj:"•••", labelFr:"Plus", labelEn:"More"},
];

function buildBottomNav(){
  const nav = $("#bottomNav");
  nav.innerHTML = "";
  TABS.forEach(t=>{
    const btn = document.createElement("button");
    btn.dataset.tab = t.id;
    btn.innerHTML = `<span class="bn-kj">${t.kj}</span><span class="bn-label fr">${t.labelFr}</span><span class="bn-label en">${t.labelEn}</span>`;
    btn.onclick = () => showTab(t.id);
    nav.appendChild(btn);
  });
}

function showTab(id){
  $$(".tab-panel").forEach(p => p.classList.remove("active"));
  $("#tab-"+id).classList.add("active");
  $$("#bottomNav button").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
  window.scrollTo({top:0, behavior:"instant"});
  if(id === "today") renderToday();
  if(id === "budget") renderBudget();
  if(id === "route") renderRouteAddedActivities();
}

function setLang(lang){
  document.body.classList.remove("lang-fr","lang-en");
  document.body.classList.add("lang-"+lang);
  saveJSON(STORAGE_KEYS.lang, lang);
}

/* ============ ROUTE: sub-nav + route map + stage panels ============ */
function buildRouteSubNav(){
  const nav = $("#routeSubNav");
  const all = [{id:"overview", nameFr:"Vue d'ensemble", nameEn:"Overview", kanji:"旅"}].concat(STAGES);
  all.forEach(s=>{
    const btn = document.createElement("button");
    btn.dataset.target = s.id;
    btn.innerHTML = `<span class="kj">${s.kanji}</span><span class="fr">${s.nameFr}</span><span class="en">${s.nameEn}</span>`;
    btn.onclick = () => showRouteSub(s.id);
    nav.appendChild(btn);
  });
  nav.querySelector("button").classList.add("active");
}
function showRouteSub(id){
  $$("#tab-route .sub-panel").forEach(p => p.classList.remove("active"));
  const target = id === "overview" ? $("#route-overview") : $("#panel-"+id);
  if(target) target.classList.add("active");
  $$("#routeSubNav button").forEach(b => b.classList.toggle("active", b.dataset.target === id));
  $("#tab-route").scrollTo && $("#tab-route").scrollTo(0,0);
  window.scrollTo({top:0, behavior:"instant"});
}

function buildRouteMap(){
  const map = $("#routeMap");
  let html = "";
  STAGES.forEach((s,i)=>{
    if(i>0){
      html += `<div class="transport-row">
        <div class="line-wrap"><div class="stem"></div></div>
        <div class="t-label"><span class="arrow">↓</span><span class="fr">${s.transportFr}</span><span class="en">${s.transportEn}</span></div>
      </div>`;
    }
    html += `<div class="route-node">
      <div class="line-wrap"><div class="dot"></div>${i<STAGES.length-1?'<div class="stem"></div>':''}</div>
      <div class="rn-body">
        <span class="rn-name"><span class="fr">${s.nameFr}</span><span class="en">${s.nameEn}</span></span><span class="rn-kj">${s.kanji}</span>
        <div class="rn-dates"><span class="fr">${s.rangeFr}</span><span class="en">${s.rangeEn}</span></div>
      </div>
    </div>`;
  });
  html += `<div class="transport-row">
    <div class="line-wrap"></div>
    <div class="t-label"><span class="arrow">↓</span><span class="fr">Vol Narita → Séoul (19 sept) puis Séoul → New York (20 sept)</span><span class="en">Narita → Seoul flight (Sept 19), then Seoul → New York (Sept 20)</span></div>
  </div>`;
  map.innerHTML = html;
}

function weatherHTML(w){
  if(!w) return '';
  if(w.type === "unavailable"){
    return `<div class="weather-unavailable"><span class="fr">Hors de portée des prévisions fiables — à revérifier 5-7 jours avant.</span><span class="en">Beyond reliable forecast range — recheck 5-7 days before.</span></div>`;
  }
  return `<div class="weather-chip">
      <span class="w-emoji">${w.emoji||"☀︎"}</span><span class="w-hi">${w.tempHigh||""}</span><span>· ${w.precip}</span>
      ${w.conf ? `<span class="weather-confidence fr">fiab. ${w.conf}</span><span class="weather-confidence en">conf. ${w.conf}</span>`:''}
    </div>
    <div class="hero-note fr" style="margin:4px 0 0;">${w.descFr} (${w.tempFr})</div>
    <div class="hero-note en" style="margin:4px 0 0;">${w.descEn} (${w.tempFr})</div>`;
}

function buildDayByDay(){
  const list = $("#dbdList");
  let html = "";
  STAGES.forEach(s=>{
    s.days.forEach(d=>{
      html += `<div class="dbd-entry">
        <div class="dbd-date"><span class="fr">${d.dFr}</span><span class="en">${d.dEn}</span></div>
        <div class="dbd-body">
          <div class="dbd-city"><span class="fr">${s.nameFr}</span><span class="en">${s.nameEn}</span><span class="jp">${s.kanji}</span></div>
          <span class="fr">${d.bodyFr}</span><span class="en">${d.bodyEn}</span>
          ${d.flagFr? `<br><span class="d-flag fr">${d.flagFr}</span><span class="d-flag en">${d.flagEn}</span>`:''}
          ${weatherHTML(d.weather)}
        </div>
      </div>`;
    });
  });
  list.innerHTML = html;
}

function activityCardHTML(act, cityId){
  const added = getActivitiesAdded().some(a => a.activityId === act.id);
  return `<div class="activity-card">
    <div class="ac-title"><span class="fr">${act.titleFr}</span><span class="en">${act.titleEn}</span></div>
    <div class="ac-meta">${act.duration} · ${act.price} · ${act.reservation
      ? '<span class="fr">réservation conseillée</span><span class="en">booking recommended</span>'
      : '<span class="fr">sans réservation</span><span class="en">no booking needed</span>'}</div>
    ${act.noteFr? `<div class="ac-note"><span class="fr">${act.noteFr}</span><span class="en">${act.noteEn}</span></div>`:''}
    <div class="ac-row">
      <button class="ac-add ${added?'added':''}" data-act="${act.id}" data-city="${cityId}" data-titlefr="${act.titleFr.replace(/"/g,'&quot;')}" data-titleen="${act.titleEn.replace(/"/g,'&quot;')}">
        <span class="fr">${added? 'Ajoutée ✓' : '+ Ajouter à ma journée'}</span><span class="en">${added? 'Added ✓' : '+ Add to my day'}</span>
      </button>
      ${act.mapsQuery ? `<a class="ac-link" href="${mapsUrl(act.mapsQuery)}" target="_blank">Maps</a>` : ''}
    </div>
  </div>`;
}

function addedActivitiesHTML(cityId){
  const items = getActivitiesAdded().filter(a => a.cityId === cityId);
  if(items.length === 0) return "";
  const chips = items.map(a => `<span class="added-chip"><span class="fr">${a.titleFr}</span><span class="en">${a.titleEn}</span><button data-remove-added="${a.id}">×</button></span>`).join("");
  return `<div class="section-label fr">Mes ajouts</div><div class="section-label en">My additions</div><div class="added-list">${chips}</div>`;
}

function buildStagePanels(){
  const wrap = $("#stagePanels");
  let html = "";
  STAGES.forEach(s=>{
    const daysHTML = s.days.map(d=>`
      <div class="day">
        <div class="d-date"><span class="fr">${d.dFr}</span><span class="en">${d.dEn}</span></div>
        <div class="d-body">
          <span class="fr">${d.bodyFr}</span><span class="en">${d.bodyEn}</span>
          ${d.flagFr? `<br><span class="d-flag fr">${d.flagFr}</span><span class="d-flag en">${d.flagEn}</span>`:''}
        </div>
      </div>`).join('');
    const namesHTML = s.names.map(n=>`<li>${n[0]}<span class="jp">${n[1]}</span></li>`).join('');
    const acts = ACTIVITIES[s.id] || [];
    const actsHTML = acts.map(a => activityCardHTML(a, s.id)).join('');

    html += `<section class="sub-panel" id="panel-${s.id}">
      <div class="stage-head">
        <div class="kanji-huge">${s.kanji}</div>
        <h2><span class="fr">${s.nameFr}</span><span class="en">${s.nameEn}</span></h2>
        <div class="range"><span class="fr">${s.rangeFr}</span><span class="en">${s.rangeEn}</span></div>
      </div>
      <p class="vibe"><span class="fr">${s.vibeFr}</span><span class="en">${s.vibeEn}</span></p>

      <div class="section-label fr">Programme</div>
      <div class="section-label en">Schedule</div>
      ${daysHTML}

      <div class="section-label fr">Quartier</div>
      <div class="section-label en">Neighborhood</div>
      <div class="info-row"><div class="k fr">Zone</div><div class="k en">Area</div><div class="v"><span class="fr">${s.hotelAreaFr}</span><span class="en">${s.hotelAreaEn}</span></div></div>

      <div class="section-label fr">Adresses et noms clés</div>
      <div class="section-label en">Key names and addresses</div>
      <ul class="names-list">${namesHTML}</ul>

      ${acts.length ? `
      <div class="section-label fr">Idées d'activités</div>
      <div class="section-label en">Activity ideas</div>
      ${actsHTML}
      <div id="added-${s.id}">${addedActivitiesHTML(s.id)}</div>
      ` : ''}
    </section>`;
  });
  wrap.innerHTML = html;

  $$(".ac-add").forEach(btn=>{
    btn.onclick = () => {
      const activityId = btn.dataset.act, cityId = btn.dataset.city;
      if(getActivitiesAdded().some(a => a.activityId === activityId)) return;
      addActivityAdded({ activityId, cityId, titleFr: btn.dataset.titlefr, titleEn: btn.dataset.titleen });
      btn.classList.add("added");
      btn.innerHTML = `<span class="fr">Ajoutée ✓</span><span class="en">Added ✓</span>`;
      const target = $("#added-"+cityId);
      if(target) target.innerHTML = addedActivitiesHTML(cityId);
      wireRemoveButtons();
    };
  });
  wireRemoveButtons();
}
function wireRemoveButtons(){
  $$("[data-remove-added]").forEach(btn=>{
    btn.onclick = () => {
      removeActivityAdded(btn.dataset.removeAdded);
      buildStagePanels();
      renderToday();
    };
  });
}
function renderRouteAddedActivities(){ /* re-render handled by buildStagePanels on mutation */ }

/* ============ WALLET: bookings ============ */
function hotelCard(h){
  return `<div class="wallet-card type-hotel">
    <div class="wc-top">
      <div class="wc-kanji">${h.kanji}</div>
      <div class="wc-icon fr">HÔTEL</div><div class="wc-icon en">HOTEL</div>
      <div class="wc-title">${h.name}</div>
      <div class="wc-subtitle"><span class="fr">${h.dateRangeFr} · ${h.nightsFr}</span><span class="en">${h.dateRangeEn} · ${h.nightsEn}</span></div>
    </div>
    <div class="wc-body">
      <div class="wc-row"><div class="k fr">Arrivée</div><div class="k en">Check-in</div><div class="v"><span class="fr">${h.checkinFr}</span><span class="en">${h.checkinEn}</span></div></div>
      <div class="wc-row"><div class="k fr">Départ</div><div class="k en">Check-out</div><div class="v"><span class="fr">${h.checkoutFr}</span><span class="en">${h.checkoutEn}</span></div></div>
      <div class="wc-row"><div class="k fr">Chambre</div><div class="k en">Room</div><div class="v">${h.room}</div></div>
      <div class="wc-row"><div class="k fr">Adresse</div><div class="k en">Address</div><div class="v"><a href="${mapsUrl(h.address)}" target="_blank">${h.address}</a></div></div>
      ${h.addressJP ? `<div class="wc-row"><div class="k fr">Adresse (JP)</div><div class="k en">Address (JP)</div><div class="v addr-jp">${h.addressJP}</div></div>`
        : `<div class="wc-row"><div class="k fr">Adresse (JP)</div><div class="k en">Address (JP)</div><div class="v hero-note" style="margin:0;">— <span class="fr">à ajouter</span><span class="en">to add</span></div></div>`}
      <div class="wc-row"><div class="k fr">Téléphone</div><div class="k en">Phone</div><div class="v"><a href="${telUrl(h.phone)}">${h.phone}</a></div></div>
      <div class="wc-row"><div class="k">N° confirmation</div><div class="v">${h.confirmation}</div></div>
      ${h.pin? `<div class="wc-row"><div class="k">PIN</div><div class="v">${h.pin}</div></div>`:''}
      <div class="wc-row"><div class="k fr">Prix</div><div class="k en">Price</div><div class="v">${h.price}</div></div>
      ${h.noteFr? `<div class="wc-note"><span class="fr">${h.noteFr}</span><span class="en">${h.noteEn}</span></div>`:''}
      <div class="wc-actions">
        <a class="wc-btn" href="${mapsUrl(h.address)}" target="_blank">📍 Maps</a>
        <button class="wc-btn" data-copy-en="${h.address.replace(/"/g,'&quot;')}"><span class="fr">Copier (EN)</span><span class="en">Copy (EN)</span></button>
        ${h.addressJP ? `<button class="wc-btn" data-copy-jp="${h.addressJP.replace(/"/g,'&quot;')}"><span class="fr">Copier (JP)</span><span class="en">Copy (JP)</span></button>` : ''}
        <a class="wc-btn" href="${telUrl(h.phone)}">📞 <span class="fr">Appeler</span><span class="en">Call</span></a>
      </div>
    </div>
  </div>`;
}

function flightInfoText(f){
  const segs = f.segs.map(sg => `${sg.code1} ${sg.t1} → ${sg.code2} ${sg.t2} (${sg.flightNo})`).join("\n");
  return `${f.routeFr} — ${f.dateFr}\n${segs}\nConfirmation: ${f.confirmation}${f.ticket? "\nBillet: "+f.ticket : ""}`;
}

function flightCard(f){
  const segsHTML = f.segs.map((sg,i)=>`
    <div class="wc-route">
      <div class="rp"><div class="code">${sg.code1}</div><div class="time">${sg.t1}</div></div>
      <div class="arrow">✈<br>${sg.dur}</div>
      <div class="rp"><div class="code">${sg.code2}</div><div class="time">${sg.t2}</div></div>
    </div>
    <div class="wc-row" style="margin-top:6px;"><div class="k">${sg.flightNo}</div><div class="v"></div></div>
    ${i<f.segs.length-1?'<div class="wc-perf"></div>':''}
  `).join('');
  return `<div class="wallet-card type-flight">
    <div class="wc-top">
      <div class="wc-kanji">${f.kanji}</div>
      <div class="wc-icon fr">VOL</div><div class="wc-icon en">FLIGHT</div>
      <div class="wc-title"><span class="fr">${f.routeFr}</span><span class="en">${f.routeEn}</span></div>
      <div class="wc-subtitle"><span class="fr">${f.dateFr}</span><span class="en">${f.dateEn}</span></div>
      ${segsHTML}
    </div>
    <div class="wc-body">
      <div class="wc-row"><div class="k fr">Passager</div><div class="k en">Passenger</div><div class="v">${f.passenger}</div></div>
      <div class="wc-row"><div class="k">Confirmation</div><div class="v">${f.confirmation}</div></div>
      ${f.ticket? `<div class="wc-row"><div class="k fr">N° billet</div><div class="k en">Ticket #</div><div class="v">${f.ticket}</div></div>`:''}
      <div class="wc-row"><div class="k fr">Prix</div><div class="k en">Price</div><div class="v">${f.price}</div></div>
      ${f.noteFr? `<div class="wc-note ${f.noteFr.indexOf('⚠')>=0?'warn':''}"><span class="fr">${f.noteFr}</span><span class="en">${f.noteEn}</span></div>`:''}
      <div class="wc-actions">
        <button class="wc-btn" data-copy-flight="${encodeURIComponent(flightInfoText(f))}"><span class="fr">Copier infos vol</span><span class="en">Copy flight info</span></button>
        <button class="wc-btn" data-copy-en="${f.confirmation}"><span class="fr">Copier confirmation</span><span class="en">Copy confirmation</span></button>
      </div>
    </div>
  </div>`;
}

let currentFilter = "all";
function buildFilters(){
  const row = $("#filterRow");
  const filters = [
    {id:'all', labelFr:'Tout', labelEn:'All'},
    {id:'hotel', labelFr:'Hôtels', labelEn:'Hotels'},
    {id:'flight', labelFr:'Vols', labelEn:'Flights'},
    {id:'train', labelFr:'Trains', labelEn:'Trains'},
  ];
  filters.forEach(f=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (f.id==='all'?' active':'');
    btn.dataset.filter = f.id;
    btn.innerHTML = `<span class="fr">${f.labelFr}</span><span class="en">${f.labelEn}</span>`;
    btn.onclick = ()=>{ currentFilter = f.id; renderBookings(); $$('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===f.id)); };
    row.appendChild(btn);
  });
}

function renderBookings(){
  const list = $("#bookingsList");
  let html = '';
  if(currentFilter==='all' || currentFilter==='hotel'){ HOTELS.forEach(h=> html += hotelCard(h)); }
  if(currentFilter==='all' || currentFilter==='flight'){ FLIGHTS.forEach(f=> html += flightCard(f)); }
  if(currentFilter==='train'){
    if(TRAINS.length===0){
      html += `<div class="wc-empty"><span class="fr">Pas encore réservé — les trains internes arrivent bientôt.</span><span class="en">Not booked yet — internal trains coming soon.</span></div>`;
    }
  }
  list.innerHTML = html;
  wireCopyButtons();
}
function wireCopyButtons(){
  $$("[data-copy-en]").forEach(btn=>{
    btn.onclick = () => copyToClipboard(btn.dataset.copyEn, btn);
  });
  $$("[data-copy-jp]").forEach(btn=>{
    btn.onclick = () => copyToClipboard(btn.dataset.copyJp, btn);
  });
  $$("[data-copy-flight]").forEach(btn=>{
    btn.onclick = () => copyToClipboard(decodeURIComponent(btn.dataset.copyFlight), btn);
  });
}

/* ============ BUDGET (interactive) ============ */
const BUDGET_FIXED = {
  hotelsUSD: Math.round((10619+20495+9090+44736+10505+72270)/JPY_PER_USD),
  flightsUSD: Math.round(488.97+144.00+323.70),
};
function toUSD(amount, currency){
  if(currency === "USD") return amount;
  if(currency === "JPY") return amount / JPY_PER_USD;
  if(currency === "KRW") return amount / KRW_PER_USD;
  return amount;
}
function renderBudget(){
  const committed = BUDGET_FIXED.hotelsUSD + BUDGET_FIXED.flightsUSD;
  const expenses = getExpenses();
  const inBudget = expenses.filter(e => !e.outOfBudget);
  const outBudget = expenses.filter(e => e.outOfBudget);
  const spentDuringTrip = inBudget.reduce((sum,e)=> sum + toUSD(Number(e.amount)||0, e.currency), 0);
  const outOfBudgetTotal = outBudget.reduce((sum,e)=> sum + toUSD(Number(e.amount)||0, e.currency), 0);
  const usedTotal = committed + spentDuringTrip;
  const remaining = BUDGET_TARGET - usedTotal;
  const pct = Math.min(100, Math.round(usedTotal / BUDGET_TARGET * 100));

  $("#budgetAmount").innerHTML = `$${Math.round(usedTotal).toLocaleString()} <span class="of fr">sur $${BUDGET_TARGET.toLocaleString()}</span><span class="of en">of $${BUDGET_TARGET.toLocaleString()}</span>`;
  $("#budgetPctFr").textContent = pct + "% du budget utilisé";
  $("#budgetPctEn").textContent = pct + "% of budget used";
  $("#budgetGaugeFill").style.width = pct + "%";

  $("#budgetStats").innerHTML = `
    <div class="budget-stat"><div class="bs-amt">$${Math.round(committed).toLocaleString()}</div><div class="bs-label fr">Engagé</div><div class="bs-label en">Committed</div></div>
    <div class="budget-stat"><div class="bs-amt">$${Math.round(spentDuringTrip).toLocaleString()}</div><div class="bs-label fr">Dépensé</div><div class="bs-label en">Spent</div></div>
    <div class="budget-stat"><div class="bs-amt">$${Math.round(remaining).toLocaleString()}</div><div class="bs-label fr">Restant</div><div class="bs-label en">Remaining</div></div>
  `;

  const rows = [
    {labelFr:"Hôtels (6)", labelEn:"Hotels (6)", amt:BUDGET_FIXED.hotelsUSD},
    {labelFr:"Vols personnels (4)", labelEn:"Personal flights (4)", amt:BUDGET_FIXED.flightsUSD},
    {labelFr:"Dépenses ajoutées", labelEn:"Added expenses", amt:spentDuringTrip},
  ];
  const wrap = $("#budgetBreakdown");
  wrap.innerHTML = rows.map(r=>{
    const w = usedTotal > 0 ? Math.max(2, Math.round(r.amt/usedTotal*100)) : 0;
    return `<div class="budget-row">
      <div class="b-label"><span class="fr">${r.labelFr}</span><span class="en">${r.labelEn}</span></div>
      <div class="b-bar"><div class="b-fill" style="width:${w}%;"></div></div>
      <div class="b-amt">$${Math.round(r.amt).toLocaleString()}</div>
    </div>`;
  }).join('') + `<div class="budget-row">
      <div class="b-label"><span class="fr">Hors budget</span><span class="en">Outside budget</span></div>
      <div class="b-bar"><div class="b-fill" style="width:0%; background:var(--shu);"></div></div>
      <div class="b-amt">$${Math.round(outOfBudgetTotal).toLocaleString()}</div>
    </div>`;

  const list = $("#expenseList");
  if(expenses.length === 0){
    list.innerHTML = `<div class="wc-empty"><span class="fr">Aucune dépense ajoutée.</span><span class="en">No expenses added yet.</span></div>`;
  } else {
    list.innerHTML = expenses.slice().reverse().map(e=>{
      const usd = toUSD(Number(e.amount)||0, e.currency);
      return `<div class="expense-item">
        <div class="ei-main">
          <div class="ei-note">${e.note || e.category}${e.outOfBudget?'<span class="oob-tag">HORS BUDGET</span>':''}</div>
          <div class="ei-meta">${e.category} · ${e.city}${e.date? ' · '+e.date : ''}</div>
        </div>
        <div class="ei-amt">$${usd.toFixed(0)}<div class="ei-meta">${Number(e.amount)||0} ${e.currency}</div></div>
        <button class="ei-del" data-del-expense="${e.id}">×</button>
      </div>`;
    }).join('');
  }
  $$("[data-del-expense]").forEach(btn=>{
    btn.onclick = () => { deleteExpense(btn.dataset.delExpense); renderBudget(); };
  });
}

function wireExpenseModal(){
  const backdrop = $("#expenseModalBackdrop");
  const openBtn = $("#addExpenseBtn");
  const cancelBtn = $("#expenseCancelBtn");
  const form = $("#expenseForm");
  openBtn.onclick = () => backdrop.classList.add("open");
  cancelBtn.onclick = () => backdrop.classList.remove("open");
  backdrop.onclick = (e) => { if(e.target === backdrop) backdrop.classList.remove("open"); };
  form.onsubmit = (e) => {
    e.preventDefault();
    addExpense({
      amount: parseFloat($("#expAmount").value) || 0,
      currency: $("#expCurrency").value,
      category: $("#expCategory").value,
      city: $("#expCity").value,
      date: $("#expDate").value,
      note: $("#expNote").value.trim(),
      outOfBudget: $("#expOutOfBudget").checked,
    });
    form.reset();
    backdrop.classList.remove("open");
    renderBudget();
  };
}

/* ============ PHRASES ============ */
const PHRASE_CATEGORY_LABELS = {
  cacherout: {fr:"Cacherout", en:"Kashrut"},
  shabbat: {fr:"Chabbat", en:"Shabbat"},
  politesse: {fr:"Politesse", en:"Courtesy"},
};
function buildPhrases(){
  const list = $("#phrasesList");
  list.innerHTML = PHRASES.map(p=>{
    const cat = PHRASE_CATEGORY_LABELS[p.category] || {fr:p.category, en:p.category};
    return `<div class="phrase-card">
      <div class="ph-cat"><span class="fr">${cat.fr}</span><span class="en">${cat.en}</span></div>
      <div class="ph-jp">${p.jp}</div>
      <div class="ph-romaji">${p.romaji}</div>
      <div class="ph-fr">${p.fr}</div>
      <button class="ph-copy" data-copy-jp="${p.jp}"><span class="fr">Copier le japonais</span><span class="en">Copy Japanese</span></button>
    </div>`;
  }).join('');
  $$(".ph-copy").forEach(btn=>{
    btn.onclick = () => copyToClipboard(btn.dataset.copyJp, btn);
  });
}

/* ============ MORE menu ============ */
function buildMore(){
  $$(".more-menu-item").forEach(btn=>{
    btn.onclick = () => {
      $$("#tab-more .sub-panel").forEach(p=>p.classList.remove("active"));
      $("#more-"+btn.dataset.more).classList.add("active");
    };
  });
  $$("[data-back]").forEach(btn=>{
    btn.onclick = () => {
      $$("#tab-more .sub-panel").forEach(p=>p.classList.remove("active"));
      $("#more-menu").classList.add("active");
    };
  });
  $("#exportBtn").onclick = () => downloadExport();
  $("#importBtn").onclick = () => $("#importFile").click();
  $("#importFile").onchange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    importFromFile(file, (ok) => {
      alert(ok
        ? (document.body.classList.contains("lang-fr") ? "Import réussi." : "Import successful.")
        : (document.body.classList.contains("lang-fr") ? "Échec de l'import — fichier invalide." : "Import failed — invalid file."));
      if(ok){ renderBudget(); buildStagePanels(); renderToday(); }
    });
    e.target.value = "";
  };
  $("#resetBtn").onclick = () => {
    const msg = document.body.classList.contains("lang-fr")
      ? "Effacer toutes tes données locales (checklist, dépenses, activités) ? Cette action est irréversible."
      : "Erase all your local data (checklist, expenses, activities)? This cannot be undone.";
    if(confirm(msg)){
      resetAllData();
      seedDefaultsOnce();
      renderBudget();
      buildStagePanels();
      renderToday();
    }
  };
}

/* ============ TODAY ============ */
const DEFAULT_CHECKLIST_ITEMS = [
  {id:"passport", fr:"Passeport / portefeuille", en:"Passport / wallet"},
  {id:"battery", fr:"Batterie chargée", en:"Phone charged"},
  {id:"address", fr:"Adresse de l'hôtel notée", en:"Hotel address noted"},
  {id:"water", fr:"Eau", en:"Water"},
];

function findActiveHotel(iso){
  const candidates = HOTELS.filter(h => h.checkinDate <= iso).sort((a,b)=> a.checkinDate < b.checkinDate ? -1 : 1);
  return candidates.length ? candidates[candidates.length-1] : null;
}

function renderToday(){
  const iso = todayISO();
  const el = $("#todayContent");

  if(iso < TRIP.start){
    const days = Math.ceil((new Date(TRIP.start) - new Date(iso)) / 86400000);
    el.innerHTML = `<div class="today-empty">
      <div class="kanji-huge2">旅</div>
      <div class="fr">Le voyage commence dans ${days} jour${days>1?'s':''} (6 septembre).</div>
      <div class="en">The trip starts in ${days} day${days>1?'s':''} (September 6).</div>
    </div>`;
    return;
  }
  if(iso > TRIP.end){
    el.innerHTML = `<div class="today-empty">
      <div class="kanji-huge2">旅</div>
      <div class="fr">Voyage terminé — bon retour !</div>
      <div class="en">Trip's over — welcome back!</div>
    </div>`;
    return;
  }

  const hotel = findActiveHotel(iso);
  const stage = hotel ? STAGES.find(s => s.id === hotel.stageId) : null;
  const dayEntries = [];
  STAGES.forEach(s => s.days.forEach(d => { if(d.dates.includes(iso)) dayEntries.push({...d, stage:s}); }));
  const todaysFlights = FLIGHTS.filter(f => f.date === iso);
  const weather = dayEntries.find(d => d.weather && d.weather.type !== "unavailable")?.weather || dayEntries[0]?.weather;
  const headerLabel = dayEntries[0]
    ? `<span class="fr">${dayEntries[0].dFr}</span><span class="en">${dayEntries[0].dEn}</span>`
    : iso;

  let html = `<div class="today-hero">
    <div class="th-eyebrow">${headerLabel}</div>
    <div class="th-city">${stage? `<span class="fr">${stage.nameFr}</span><span class="en">${stage.nameEn}</span><span class="jp">${stage.kanji}</span>` : ''}</div>
    ${weatherHTML(weather)}
  </div>`;

  if(hotel){
    html += `<div class="today-card">
      <div class="tc-label fr">Hôtel ce soir</div><div class="tc-label en">Tonight's hotel</div>
      <div class="tc-title">${hotel.name}</div>
      <div class="tc-sub"><span class="fr">${hotel.checkinFr} → ${hotel.checkoutFr}</span><span class="en">${hotel.checkinEn} → ${hotel.checkoutEn}</span></div>
      ${hotel.addressJP ? `<div class="tc-sub addr-jp" style="margin-top:6px;">${hotel.addressJP}</div>` : ''}
      <div class="wc-actions" style="margin-top:14px;">
        <a class="wc-btn" href="${mapsUrl(hotel.address)}" target="_blank">📍 <span class="fr">Maps</span><span class="en">Maps</span></a>
        ${hotel.addressJP ? `<button class="wc-btn" data-copy-jp="${hotel.addressJP.replace(/"/g,'&quot;')}"><span class="fr">Copier (JP)</span><span class="en">Copy (JP)</span></button>` : `<button class="wc-btn" data-copy-en="${hotel.address.replace(/"/g,'&quot;')}"><span class="fr">Copier</span><span class="en">Copy</span></button>`}
        <button class="wc-btn" data-goto-wallet="1"><span class="fr">Voir la réservation</span><span class="en">View booking</span></button>
      </div>
    </div>`;
  }

  if(todaysFlights.length){
    todaysFlights.forEach(f=>{
      html += `<div class="today-card">
        <div class="tc-label fr">Vol aujourd'hui</div><div class="tc-label en">Today's flight</div>
        <div class="tc-title"><span class="fr">${f.routeFr}</span><span class="en">${f.routeEn}</span></div>
        <div class="tc-sub">${f.segs.map(sg=>`${sg.code1} ${sg.t1} → ${sg.code2} ${sg.t2}`).join(' · ')}</div>
        <div class="wc-actions" style="margin-top:14px;">
          <button class="wc-btn" data-copy-flight="${encodeURIComponent(flightInfoText(f))}"><span class="fr">Copier infos vol</span><span class="en">Copy flight info</span></button>
        </div>
      </div>`;
    });
  } else if(stage && dayEntries.some(d => d.stage.id === stage.id && stage.days[0].dates.includes(iso)) && stage.transportFr){
    html += `<div class="today-card">
      <div class="tc-label fr">Transport aujourd'hui</div><div class="tc-label en">Transport today</div>
      <div class="tc-title"><span class="fr">${stage.transportFr}</span><span class="en">${stage.transportEn}</span></div>
    </div>`;
  }

  if(dayEntries.length){
    html += `<div class="today-card">
      <div class="tc-label fr">Programme</div><div class="tc-label en">Schedule</div>
      ${dayEntries.map(d => `<p style="font-size:14px; margin:6px 0;">
        <span class="fr">${d.bodyFr}</span><span class="en">${d.bodyEn}</span>
        ${d.flagFr? `<br><span class="d-flag fr">${d.flagFr}</span><span class="d-flag en">${d.flagEn}</span>`:''}
      </p>`).join('<hr style="border:none;border-top:1px solid var(--line);margin:10px 0;">')}
    </div>`;
  }

  const addedForCity = stage ? getActivitiesAdded().filter(a => a.cityId === stage.id) : [];
  if(addedForCity.length){
    html += `<div class="today-card">
      <div class="tc-label fr">Activités ajoutées</div><div class="tc-label en">Added activities</div>
      ${addedForCity.map(a=>`<div style="font-size:14px; padding:6px 0;"><span class="fr">${a.titleFr}</span><span class="en">${a.titleEn}</span></div>`).join('')}
    </div>`;
  }

  const checklist = getChecklist()[iso] || {};
  html += `<div class="today-card">
    <div class="tc-label fr">Checklist du jour</div><div class="tc-label en">Today's checklist</div>
    <div class="checklist">
      ${DEFAULT_CHECKLIST_ITEMS.map(item=>{
        const checked = !!checklist[item.id];
        return `<div class="checklist-item ${checked?'done':''}">
          <input type="checkbox" id="chk-${item.id}" data-checklist-item="${item.id}" ${checked?'checked':''}>
          <label for="chk-${item.id}"><span class="fr">${item.fr}</span><span class="en">${item.en}</span></label>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  el.innerHTML = html;

  wireCopyButtons();
  $$("[data-checklist-item]").forEach(cb=>{
    cb.onchange = () => {
      setChecklistItem(iso, cb.dataset.checklistItem, cb.checked);
      cb.closest(".checklist-item").classList.toggle("done", cb.checked);
    };
  });
  const gotoWalletBtn = $("[data-goto-wallet]");
  if(gotoWalletBtn) gotoWalletBtn.onclick = () => showTab("wallet");
}

/* ============ Service worker registration ============ */
function registerServiceWorker(){
  if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(err => console.warn("SW registration failed", err));
    });
  }
}

/* ============ init ============ */
function init(){
  const savedLang = loadJSON(STORAGE_KEYS.lang, "fr");
  setLang(savedLang);

  seedDefaultsOnce();

  buildBottomNav();
  buildRouteSubNav();
  buildRouteMap();
  buildStagePanels();
  buildFilters();
  renderBookings();
  buildDayByDay();
  buildPhrases();
  buildMore();
  wireExpenseModal();
  renderBudget();
  renderToday();

  showTab("today");
  registerServiceWorker();
}

init();
