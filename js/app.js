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
function normalizeSearch(s){
  return (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
}

function copyToClipboard(text, btnEl){
  const done = () => {
    if(!btnEl) return;
    const original = btnEl.innerHTML;
    btnEl.classList.add("copied");
    btnEl.textContent = "Copié ✓";
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

/* Splits a program body (HTML string) into readable steps instead of one dense paragraph.
   Respects intentional <br> breaks, then splits remaining blocks on sentence boundaries. */
function programStepsHTML(bodyHtml){
  if(!bodyHtml) return '';
  const blocks = bodyHtml.split(/<br\s*\/?>/i);
  const steps = [];
  blocks.forEach(block=>{
    const parts = block.split(/(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-Þ<🗻🗼🥾♨️])/);
    parts.forEach(p=>{ const t = p.trim(); if(t) steps.push(t); });
  });
  return `<div class="program-steps">${steps.map(s=>`<p>${s}</p>`).join('')}</div>`;
}

/* ============ nav ============ */
const TABS = [
  {id:"today", kj:"今日", label:"Aujourd'hui"},
  {id:"route", kj:"旅", label:"Parcours"},
  {id:"wallet", kj:"予", label:"Résa"},
  {id:"budget", kj:"¥", label:"Budget"},
  {id:"more", kj:"•••", label:"Plus"},
];

function buildBottomNav(){
  const nav = $("#bottomNav");
  nav.innerHTML = "";
  TABS.forEach(t=>{
    const btn = document.createElement("button");
    btn.dataset.tab = t.id;
    btn.innerHTML = `<span class="bn-kj">${t.kj}</span><span class="bn-label">${t.label}</span>`;
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
}

/* ============ ROUTE: sub-nav + route map + stage panels ============ */
function buildRouteSubNav(){
  const nav = $("#routeSubNav");
  const all = [{id:"overview", name:"Vue d'ensemble", kanji:"旅"}].concat(STAGES);
  all.forEach(s=>{
    const btn = document.createElement("button");
    btn.dataset.target = s.id;
    btn.innerHTML = `<span class="kj">${s.kanji}</span>${s.name}`;
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
  window.scrollTo({top:0, behavior:"instant"});
}

function buildRouteMap(){
  const map = $("#routeMap");
  let html = "";
  STAGES.forEach((s,i)=>{
    if(i>0){
      html += `<div class="transport-row">
        <div class="line-wrap"><div class="stem"></div></div>
        <div class="t-label"><span class="arrow">↓</span>${s.transport}</div>
      </div>`;
    }
    html += `<div class="route-node">
      <div class="line-wrap"><div class="dot"></div>${i<STAGES.length-1?'<div class="stem"></div>':''}</div>
      <div class="rn-body">
        <span class="rn-name">${s.name}</span><span class="rn-kj">${s.kanji}</span>
        <div class="rn-dates">${s.range}</div>
      </div>
    </div>`;
  });
  html += `<div class="transport-row">
    <div class="line-wrap"></div>
    <div class="t-label"><span class="arrow">↓</span>Vol Narita → Séoul (19 sept) puis Séoul → New York (20 sept)</div>
  </div>`;
  map.innerHTML = html;
}

function weatherHTML(w){
  if(!w) return '';
  if(w.type === "unavailable"){
    return `<div class="weather-unavailable">Hors de portée des prévisions fiables — à revérifier 5-7 jours avant.</div>`;
  }
  return `<div class="weather-chip">
      <span class="w-emoji">${w.emoji||"☀︎"}</span><span class="w-hi">${w.tempHigh||""}</span><span>· ${w.precip}</span>
      ${w.conf ? `<span class="weather-confidence">fiab. ${w.conf}</span>`:''}
    </div>
    <div class="hero-note" style="margin:4px 0 0;">${w.desc} (${w.temp})</div>`;
}

function buildDayByDay(){
  const list = $("#dbdList");
  let html = "";
  STAGES.forEach(s=>{
    s.days.forEach(d=>{
      html += `<div class="dbd-entry" data-open-day="${d.dates[0]}">
        <div class="dbd-date">${d.d}</div>
        <div class="dbd-body">
          <div class="dbd-city">${s.name}<span class="jp">${s.kanji}</span></div>
          ${d.body}
          ${d.flag? `<br><span class="d-flag">${d.flag}</span>`:''}
          ${weatherHTML(d.weather)}
        </div>
        <div class="dbd-chevron">›</div>
      </div>`;
    });
  });
  list.innerHTML = html;
  $$("[data-open-day]").forEach(el=>{
    el.onclick = () => openDayDetail(el.dataset.openDay);
  });
}

function activityCardHTML(act, cityId){
  const added = getActivitiesAdded().some(a => a.activityId === act.id);
  return `<div class="activity-card">
    <div class="ac-title">${act.title}</div>
    ${act.desc? `<div class="ac-desc">${act.desc}</div>`:''}
    <div class="ac-meta">${act.duration} · ${act.price} · ${act.reservation ? 'réservation conseillée' : 'sans réservation'}</div>
    ${act.note? `<div class="ac-note">${act.note}</div>`:''}
    <div class="ac-row">
      <button class="ac-add ${added?'added':''}" data-act="${act.id}" data-city="${cityId}" data-title="${act.title.replace(/"/g,'&quot;')}">
        ${added? 'Ajoutée ✓' : '+ Ajouter à ma journée'}
      </button>
      ${act.mapsQuery ? `<a class="ac-link" href="${mapsUrl(act.mapsQuery)}" target="_blank">Maps</a>` : ''}
    </div>
  </div>`;
}

function addedActivitiesHTML(cityId){
  const items = getActivitiesAdded().filter(a => a.cityId === cityId);
  if(items.length === 0) return "";
  const chips = items.map(a => `<span class="added-chip">${a.title}<button data-remove-added="${a.id}">×</button></span>`).join("");
  return `<div class="section-label">Mes ajouts</div><div class="added-list">${chips}</div>`;
}

function buildStagePanels(){
  const wrap = $("#stagePanels");
  let html = "";
  STAGES.forEach(s=>{
    const daysHTML = s.days.map(d=>`
      <div class="day">
        <div class="d-date">${d.d}</div>
        <div class="d-body">
          ${programStepsHTML(d.body)}
          ${d.flag? `<span class="d-flag">${d.flag}</span>`:''}
        </div>
      </div>`).join('');
    const namesHTML = s.names.map(n=>`<li><div class="name-line">${n[0]}<span class="jp">${n[1]}</span></div>${n[2]?`<div class="name-desc">${n[2]}</div>`:''}</li>`).join('');
    const acts = ACTIVITIES[s.id] || [];
    const actsHTML = acts.map(a => activityCardHTML(a, s.id)).join('');

    html += `<section class="sub-panel" id="panel-${s.id}">
      <div class="stage-head">
        <div class="kanji-huge">${s.kanji}</div>
        <h2>${s.name}</h2>
        <div class="range">${s.range}</div>
      </div>
      <p class="vibe">${s.vibe}</p>

      <div class="section-label">Programme</div>
      ${daysHTML}

      <div class="section-label">Quartier</div>
      <div class="info-row"><div class="k">Zone</div><div class="v">${s.hotelArea}</div></div>

      <div class="section-label">Adresses et noms clés</div>
      <ul class="names-list">${namesHTML}</ul>

      ${acts.length ? `
      <div class="section-label">Idées d'activités</div>
      ${actsHTML}
      <div id="added-${s.id}">${addedActivitiesHTML(s.id)}</div>
      ` : ''}
    </section>`;
  });
  wrap.innerHTML = html;
  wireActivityAddButtons();
  wireRemoveButtons();
}
function wireActivityAddButtons(){
  $$(".ac-add").forEach(btn=>{
    btn.onclick = () => {
      const activityId = btn.dataset.act, cityId = btn.dataset.city;
      if(getActivitiesAdded().some(a => a.activityId === activityId)) return;
      addActivityAdded({ activityId, cityId, title: btn.dataset.title });
      buildStagePanels();
      renderToday();
    };
  });
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

/* ============ WALLET: bookings ============ */
function addressRowsHTML(h){
  return `<div class="wc-row"><div class="k">Adresse</div><div class="v"><a href="${mapsUrl(h.address)}" target="_blank">${h.address}</a></div></div>
    ${h.addressJP ? `<div class="wc-row"><div class="k">Adresse (JP)</div><div class="v addr-jp">${h.addressJP}</div></div>`
      : `<div class="wc-row"><div class="k">Adresse (JP)</div><div class="v hero-note" style="margin:0;">— à ajouter</div></div>`}`;
}
function addressActionsHTML(h, extraButtonHTML){
  return `<div class="wc-actions">
    <a class="wc-btn" href="${mapsUrl(h.address)}" target="_blank">📍 Maps</a>
    <button class="wc-btn" data-copy-text="${h.address.replace(/"/g,'&quot;')}">Copier (EN)</button>
    ${h.addressJP ? `<button class="wc-btn" data-copy-text="${h.addressJP.replace(/"/g,'&quot;')}">Copier (JP)</button>` : ''}
    <a class="wc-btn" href="${telUrl(h.phone)}">📞 Appeler</a>
    ${extraButtonHTML||''}
  </div>`;
}

/* ============ Price overrides (editable price on any static item) ============ */
function formatMoney(amount, currency){
  const symbol = currency === "JPY" ? "¥" : currency === "USD" ? "$" : currency === "KRW" ? "₩" : "";
  const formatted = currency === "USD" ? Number(amount).toFixed(2) : Math.round(amount).toLocaleString();
  return `${symbol}${formatted}`;
}
function effectivePrice(itemId, amount, currency){
  const override = getPriceOverrides()[itemId];
  return override || { amount, currency };
}
function priceRowHTML(itemId, item){
  const override = getPriceOverrides()[itemId];
  const eff = effectivePrice(itemId, item.priceAmount, item.priceCurrency);
  const display = override ? formatMoney(eff.amount, eff.currency) : (item.price || formatMoney(eff.amount, eff.currency));
  return `<div class="wc-row">
    <div class="k">Prix${override? ' <span class="price-edited-tag">modifié</span>' : ''}</div>
    <div class="v price-v">${display} <button class="price-edit-btn" data-edit-price="${itemId}" data-orig-amount="${item.priceAmount}" data-orig-currency="${item.priceCurrency}">✎</button></div>
  </div>`;
}
function wirePriceEditButtons(){
  $$("[data-edit-price]").forEach(btn=>{
    btn.onclick = () => openPriceEdit(btn.dataset.editPrice, parseFloat(btn.dataset.origAmount)||0, btn.dataset.origCurrency||"JPY");
  });
}
let editingPriceItemId = null;
function openPriceEdit(itemId, origAmount, origCurrency){
  editingPriceItemId = itemId;
  const current = getPriceOverrides()[itemId] || { amount: origAmount, currency: origCurrency };
  $("#priceAmount").value = current.amount;
  $("#priceCurrency").value = current.currency;
  $("#priceModalBackdrop").classList.add("open");
}
function wirePriceModal(){
  const backdrop = $("#priceModalBackdrop");
  $("#priceCancelBtn").onclick = () => backdrop.classList.remove("open");
  backdrop.onclick = (e) => { if(e.target === backdrop) backdrop.classList.remove("open"); };
  $("#priceResetBtn").onclick = () => {
    if(editingPriceItemId) clearPriceOverride(editingPriceItemId);
    backdrop.classList.remove("open");
    refreshAfterPriceChange();
  };
  $("#priceForm").onsubmit = (e) => {
    e.preventDefault();
    if(editingPriceItemId){
      setPriceOverride(editingPriceItemId, parseFloat($("#priceAmount").value) || 0, $("#priceCurrency").value);
    }
    backdrop.classList.remove("open");
    refreshAfterPriceChange();
  };
}
function refreshAfterPriceChange(){
  renderBookings();
  renderBudget();
  renderToday();
}

function hotelCard(h){
  return `<div class="wallet-card type-hotel" id="wc-hotel-${h.stageId}">
    <div class="wc-top">
      <div class="wc-kanji">${h.kanji}</div>
      <div class="wc-icon">HÔTEL</div>
      <div class="wc-title">${h.name}</div>
      <div class="wc-subtitle">${h.dateRange} · ${h.nights}</div>
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      <div class="wc-row"><div class="k">Arrivée</div><div class="v">${h.checkin}</div></div>
      <div class="wc-row"><div class="k">Départ</div><div class="v">${h.checkout}</div></div>
      <div class="wc-row"><div class="k">Chambre</div><div class="v">${h.room}</div></div>
      ${addressRowsHTML(h)}
      <div class="wc-row"><div class="k">Téléphone</div><div class="v"><a href="${telUrl(h.phone)}">${h.phone}</a></div></div>
      <div class="wc-row"><div class="k">N° confirmation</div><div class="v">${h.confirmation}</div></div>
      ${h.pin? `<div class="wc-row"><div class="k">PIN</div><div class="v">${h.pin}</div></div>`:''}
      ${priceRowHTML(h.stageId, h)}
      ${h.note? `<div class="wc-note">${h.note}</div>`:''}
      ${addressActionsHTML(h)}
    </div>
  </div>`;
}

function flightInfoText(f){
  const segs = f.segs.map(sg => `${sg.code1} ${sg.t1} → ${sg.code2} ${sg.t2} (${sg.flightNo})`).join("\n");
  return `${f.route} — ${f.dateLabel}\n${segs}\nConfirmation: ${f.confirmation}${f.ticket? "\nBillet: "+f.ticket : ""}`;
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
  return `<div class="wallet-card type-flight" id="wc-flight-${f.id}">
    <div class="wc-top">
      <div class="wc-kanji">${f.kanji}</div>
      <div class="wc-icon">VOL</div>
      <div class="wc-title">${f.route}</div>
      <div class="wc-subtitle">${f.dateLabel}</div>
      ${segsHTML}
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      <div class="wc-row"><div class="k">Passager</div><div class="v">${f.passenger}</div></div>
      <div class="wc-row"><div class="k">Confirmation</div><div class="v">${f.confirmation}</div></div>
      ${f.ticket? `<div class="wc-row"><div class="k">N° billet</div><div class="v">${f.ticket}</div></div>`:''}
      ${priceRowHTML(f.id, f)}
      ${f.note? `<div class="wc-note ${f.note.indexOf('⚠')>=0?'warn':''}">${f.note}</div>`:''}
      <div class="wc-actions">
        <button class="wc-btn" data-copy-text="${flightInfoText(f).replace(/"/g,'&quot;')}">Copier infos vol</button>
        <button class="wc-btn" data-copy-text="${f.confirmation}">Copier confirmation</button>
      </div>
    </div>
  </div>`;
}

/* ============ TRAINS / BUS (static + user-added, merged) ============ */
function formatDateLabelFR(iso){
  const d = new Date(iso+"T00:00:00");
  const days = ["DIM","LUN","MAR","MER","JEU","VEN","SAM"];
  const months = ["janv","févr","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
function getAllTrains(){
  return TRAINS.concat(getUserTransport()).slice().sort((a,b)=> a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
}
function trainInfoText(t){
  return `${t.route} — ${t.dateLabel || formatDateLabelFR(t.date)}\n${t.depTime||''} → ${t.arrTime||''}${t.name? '\n'+t.name : ''}${t.confirmation? '\nConfirmation: '+t.confirmation : ''}`;
}
function trainCard(t){
  const isUser = String(t.id).startsWith("tr-user-");
  return `<div class="wallet-card type-train" id="wc-train-${t.id}">
    <div class="wc-top">
      <div class="wc-kanji">${t.kanji || (t.kind==='bus' ? '🚌' : '🚃')}</div>
      <div class="wc-icon">${t.kind==='bus' ? 'Bus' : 'Train'}</div>
      <div class="wc-title">${t.route}</div>
      <div class="wc-subtitle">${t.dateLabel || formatDateLabelFR(t.date)} · ${t.depTime||''}${t.arrTime? ' → '+t.arrTime : ''}</div>
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      ${t.name? `<div class="wc-row"><div class="k">Nom / n°</div><div class="v">${t.name}</div></div>`:''}
      ${t.seat? `<div class="wc-row"><div class="k">Place</div><div class="v">${t.seat}</div></div>`:''}
      ${t.passenger? `<div class="wc-row"><div class="k">Passager</div><div class="v">${t.passenger}</div></div>`:''}
      ${t.confirmation? `<div class="wc-row"><div class="k">Confirmation</div><div class="v">${t.confirmation}</div></div>`:''}
      ${t.pickupCode? `<div class="wc-row"><div class="k">Code retrait</div><div class="v">${t.pickupCode}</div></div>`:''}
      ${priceRowHTML(t.id, t)}
      ${t.note? `<div class="wc-note">${t.note}</div>`:''}
      <div class="wc-actions">
        <button class="wc-btn" data-copy-text="${trainInfoText(t).replace(/"/g,'&quot;')}">Copier infos</button>
        ${isUser? `<button class="wc-btn btn-danger" data-delete-transport="${t.id}">Supprimer</button>` : ''}
      </div>
    </div>
  </div>`;
}
function trainMiniCardHTML(t){
  return `<div class="wallet-card type-train">
    <div class="wc-top">
      <div class="wc-kanji">${t.kanji || (t.kind==='bus' ? '🚌' : '🚃')}</div>
      <div class="wc-icon">${t.kind==='bus' ? 'Bus aujourd’hui' : 'Train aujourd’hui'}</div>
      <div class="wc-title">${t.route}</div>
      <div class="wc-subtitle">${t.depTime||''}${t.arrTime? ' → '+t.arrTime : ''}${t.name? ' · '+t.name : ''}</div>
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      <div class="wc-actions">
        <button class="wc-btn" data-copy-text="${trainInfoText(t).replace(/"/g,'&quot;')}">Copier infos</button>
        <button class="wc-btn" data-goto-train="${t.id}">Voir la réservation</button>
      </div>
    </div>
  </div>`;
}
function wireDeleteTransportButtons(){
  $$("[data-delete-transport]").forEach(btn=>{
    btn.onclick = () => {
      if(confirm("Supprimer ce trajet ?")){
        deleteUserTransport(btn.dataset.deleteTransport);
        renderBookings();
        renderToday();
        renderBudget();
      }
    };
  });
}
function wireAddTransportModal(){
  const backdrop = $("#transportModalBackdrop");
  $("#addTransportBtn").onclick = () => backdrop.classList.add("open");
  $("#transportCancelBtn").onclick = () => backdrop.classList.remove("open");
  backdrop.onclick = (e) => { if(e.target === backdrop) backdrop.classList.remove("open"); };
  $("#transportForm").onsubmit = (e) => {
    e.preventDefault();
    const dep = $("#trDep").value.trim();
    const arr = $("#trArr").value.trim();
    addUserTransport({
      kind: $("#trKind").value,
      route: `${dep} → ${arr}`,
      depStation: dep, arrStation: arr,
      date: $("#trDate").value,
      depTime: $("#trDepTime").value,
      arrTime: $("#trArrTime").value,
      name: $("#trName").value.trim(),
      priceAmount: parseFloat($("#trAmount").value) || 0,
      priceCurrency: $("#trCurrency").value,
      confirmation: $("#trConfirmation").value.trim(),
      note: $("#trNote").value.trim(),
    });
    e.target.reset();
    backdrop.classList.remove("open");
    renderBookings();
    renderToday();
    renderBudget();
  };
}

let currentFilter = "all";
function buildFilters(){
  const row = $("#filterRow");
  const filters = [
    {id:'all', label:'Tout'},
    {id:'hotel', label:'Hôtels'},
    {id:'flight', label:'Vols'},
    {id:'train', label:'Trains/bus'},
  ];
  filters.forEach(f=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (f.id==='all'?' active':'');
    btn.dataset.filter = f.id;
    btn.textContent = f.label;
    btn.onclick = ()=>{ currentFilter = f.id; renderBookings(); $$('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===f.id)); };
    row.appendChild(btn);
  });
}

function renderBookings(){
  const list = $("#bookingsList");
  let html = '';
  if(currentFilter==='all' || currentFilter==='hotel'){ HOTELS.forEach(h=> html += hotelCard(h)); }
  if(currentFilter==='all' || currentFilter==='flight'){ FLIGHTS.forEach(f=> html += flightCard(f)); }
  if(currentFilter==='all' || currentFilter==='train'){
    const trains = getAllTrains();
    if(trains.length===0 && currentFilter==='train'){
      html += `<div class="wc-empty">Pas encore de train/bus ajouté.</div>`;
    } else {
      trains.forEach(t=> html += trainCard(t));
    }
  }
  list.innerHTML = html;
  wireCopyButtons();
  wirePriceEditButtons();
  wireDeleteTransportButtons();
}
function wireCopyButtons(){
  $$("[data-copy-text]").forEach(btn=>{
    btn.onclick = () => copyToClipboard(btn.dataset.copyText, btn);
  });
}

function gotoWalletCard(type, key){
  currentFilter = 'all';
  showTab('wallet');
  $$('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter==='all'));
  renderBookings();
  setTimeout(()=>{
    const prefix = type==='hotel' ? 'wc-hotel-' : type==='train' ? 'wc-train-' : 'wc-flight-';
    const el = document.getElementById(prefix+key);
    if(el){
      el.scrollIntoView({behavior:'smooth', block:'start'});
      el.classList.add('flash');
      setTimeout(()=> el.classList.remove('flash'), 1500);
    }
  }, 60);
}

/* ============ BUDGET (interactive, prices computed live incl. overrides) ============ */
function toUSD(amount, currency){
  if(currency === "USD") return amount;
  if(currency === "JPY") return amount / JPY_PER_USD;
  if(currency === "KRW") return amount / KRW_PER_USD;
  return amount;
}
function itemUSD(itemId, item){
  const eff = effectivePrice(itemId, item.priceAmount, item.priceCurrency);
  return toUSD(eff.amount, eff.currency);
}
let budgetAggMode = "category";
function renderBudget(){
  const hotelsUSD = HOTELS.reduce((sum,h)=> sum + itemUSD(h.stageId, h), 0);
  const flightsUSD = FLIGHTS.filter(f=>f.countsTowardBudget!==false).reduce((sum,f)=> sum + itemUSD(f.id, f), 0);
  const trainsUSD = getAllTrains().filter(t=>t.countsTowardBudget!==false).reduce((sum,t)=> sum + itemUSD(t.id, t), 0);
  const committed = hotelsUSD + flightsUSD + trainsUSD;

  const expenses = getExpenses();
  const inBudget = expenses.filter(e => !e.outOfBudget);
  const outBudget = expenses.filter(e => e.outOfBudget);
  const spentDuringTrip = inBudget.reduce((sum,e)=> sum + toUSD(Number(e.amount)||0, e.currency), 0);
  const outOfBudgetTotal = outBudget.reduce((sum,e)=> sum + toUSD(Number(e.amount)||0, e.currency), 0);
  const usedTotal = committed + spentDuringTrip;
  const remaining = BUDGET_TARGET - usedTotal;
  const pct = Math.min(100, Math.round(usedTotal / BUDGET_TARGET * 100));

  $("#budgetAmount").innerHTML = `$${Math.round(usedTotal).toLocaleString()} <span class="of">sur $${BUDGET_TARGET.toLocaleString()}</span>`;
  $("#budgetPct").textContent = pct + "% du budget utilisé";
  $("#budgetGaugeFill").style.width = pct + "%";

  $("#budgetStats").innerHTML = `
    <div class="budget-stat"><div class="bs-amt">$${Math.round(committed).toLocaleString()}</div><div class="bs-label">Engagé</div></div>
    <div class="budget-stat"><div class="bs-amt">$${Math.round(spentDuringTrip).toLocaleString()}</div><div class="bs-label">Dépensé</div></div>
    <div class="budget-stat"><div class="bs-amt">$${Math.round(remaining).toLocaleString()}</div><div class="bs-label">Restant</div></div>
  `;

  const rows = [
    {label:"Hôtels (6)", amt:hotelsUSD},
    {label:"Vols personnels", amt:flightsUSD},
    {label:"Trains / bus", amt:trainsUSD},
    {label:"Dépenses ajoutées", amt:spentDuringTrip},
  ];
  const wrap = $("#budgetBreakdown");
  wrap.innerHTML = rows.map(r=>{
    const w = usedTotal > 0 ? Math.max(2, Math.round(r.amt/usedTotal*100)) : 0;
    return `<div class="budget-row">
      <div class="b-label">${r.label}</div>
      <div class="b-bar"><div class="b-fill" style="width:${w}%;"></div></div>
      <div class="b-amt">$${Math.round(r.amt).toLocaleString()}</div>
    </div>`;
  }).join('') + `<div class="budget-row">
      <div class="b-label">Hors budget</div>
      <div class="b-bar"><div class="b-fill" style="width:0%; background:var(--shu);"></div></div>
      <div class="b-amt">$${Math.round(outOfBudgetTotal).toLocaleString()}</div>
    </div>`;

  renderDailyAverages();
  renderBudgetAggregation();

  const list = $("#expenseList");
  if(expenses.length === 0){
    list.innerHTML = `<div class="wc-empty">Aucune dépense ajoutée.</div>`;
  } else {
    list.innerHTML = expenses.slice().reverse().map(e=>{
      const usd = toUSD(Number(e.amount)||0, e.currency);
      return `<div class="expense-item">
        <div class="ei-main">
          <div class="ei-note">${e.note || e.category}${e.outOfBudget?'<span class="oob-tag">HORS BUDGET</span>':''}</div>
          <div class="ei-meta">${e.category} · ${e.city}${e.date? ' · '+e.date : ''}</div>
        </div>
        <div class="ei-amt">$${usd.toFixed(0)}<div class="ei-meta">${Number(e.amount)||0} ${e.currency}</div></div>
        <button class="ei-edit" data-edit-expense="${e.id}">✎</button>
        <button class="ei-del" data-del-expense="${e.id}">×</button>
      </div>`;
    }).join('');
  }
  $$("[data-del-expense]").forEach(btn=>{
    btn.onclick = () => { deleteExpense(btn.dataset.delExpense); renderBudget(); };
  });
  $$("[data-edit-expense]").forEach(btn=>{
    btn.onclick = () => openExpenseModal(getExpenses().find(e => e.id === btn.dataset.editExpense));
  });
}

/* ============ Daily pace cards (Repas/jour, Transport/jour) ============ */
function computeDailyAverageUSD(category){
  const byDay = {};
  getExpenses().filter(e => !e.outOfBudget && e.category === category && e.date && (Number(e.amount)||0) > 0)
    .forEach(e=>{ byDay[e.date] = (byDay[e.date]||0) + toUSD(Number(e.amount)||0, e.currency); });
  const days = Object.keys(byDay);
  if(days.length === 0) return null;
  const total = days.reduce((s,d)=> s + byDay[d], 0);
  return { avg: total/days.length, days: days.length };
}
function dailyAverageCardHTML(label, category, target){
  const result = computeDailyAverageUSD(category);
  if(!result){
    return `<div class="avg-card"><div class="avg-label">${label}</div><div class="avg-value avg-empty">Pas encore de données</div></div>`;
  }
  const over = result.avg > target;
  const jpy = Math.round(result.avg * JPY_PER_USD / 100) * 100;
  return `<div class="avg-card ${over?'over':''}">
    <div class="avg-label">${label}</div>
    <div class="avg-value">$${result.avg.toFixed(1)}<span class="avg-unit">/ jour</span></div>
    <div class="avg-jpy">≈ ¥${jpy.toLocaleString()} / jour</div>
    <div class="avg-target">cible $${target} · sur ${result.days} jour${result.days>1?'s':''} noté${result.days>1?'s':''}</div>
  </div>`;
}
function renderDailyAverages(){
  const container = $("#dailyAverages");
  if(!container) return;
  container.innerHTML = dailyAverageCardHTML("Repas / jour", "Repas", FOOD_DAILY_TARGET)
    + dailyAverageCardHTML("Transport / jour", "Transport", TRANSPORT_DAILY_TARGET);
}

/* ============ Category / day aggregation, with per-day expand ============ */
const EXPENSE_CATEGORIES = ["Repas","Transport","Activités","Shopping","Autre"];
function dayExpenseDetailHTML(date){
  const dayExpenses = getExpenses().filter(e => e.date === date && !e.outOfBudget);
  const catTotals = {};
  dayExpenses.forEach(e=>{
    const cat = e.category || "Autre";
    catTotals[cat] = (catTotals[cat]||0) + toUSD(Number(e.amount)||0, e.currency);
  });
  const maxCat = Math.max(...Object.values(catTotals), 1);
  const catRows = EXPENSE_CATEGORIES.filter(c => catTotals[c]).map(cat=>{
    const w = Math.max(4, Math.round(catTotals[cat]/maxCat*100));
    return `<div class="mini-cat-row">
      <span class="mini-cat-label">${cat}</span>
      <div class="mini-cat-bar"><div class="mini-cat-fill" style="width:${w}%;"></div></div>
      <span class="mini-cat-amt">$${Math.round(catTotals[cat])}</span>
    </div>`;
  }).join('');
  const itemRows = dayExpenses.map(e=>`<div class="mini-expense-row">
    <span class="mini-expense-note">${e.note || e.category}</span>
    <span class="mini-expense-amt">${Number(e.amount)||0} ${e.currency}</span>
  </div>`).join('');
  return `<div class="day-detail-inner">${catRows}${itemRows}</div>`;
}
function renderBudgetAggregation(){
  const container = $("#budgetAggregation");
  if(!container) return;
  const expenses = getExpenses().filter(e => !e.outOfBudget && (Number(e.amount)||0) > 0);
  if(expenses.length === 0){
    container.innerHTML = `<div class="wc-empty">Ajoute des dépenses pour voir la répartition.</div>`;
    return;
  }
  const groups = {};
  expenses.forEach(e=>{
    const key = budgetAggMode === "day" ? (e.date || "Sans date") : (e.category || "Autre");
    groups[key] = (groups[key]||0) + toUSD(Number(e.amount)||0, e.currency);
  });
  let entries = Object.entries(groups);
  entries = budgetAggMode === "day" ? entries.sort((a,b)=> a[0] < b[0] ? -1 : 1) : entries.sort((a,b)=> b[1]-a[1]);
  const max = Math.max(...entries.map(e=>e[1]), 1);

  if(budgetAggMode === "day"){
    container.innerHTML = entries.map(([date,amt])=>{
      const w = Math.max(3, Math.round(amt/max*100));
      const over = amt > DAILY_TOTAL_ALERT;
      const label = date === "Sans date" ? date : formatDateLabelFR(date);
      return `<div class="budget-row day-row ${over?'over':''}" data-day-toggle="${date}">
        <div class="b-label">${label}${over?' <span class="day-alert">!</span>':''}</div>
        <div class="b-bar"><div class="b-fill" style="width:${w}%;"></div></div>
        <div class="b-amt">$${Math.round(amt).toLocaleString()}</div>
      </div>
      <div class="day-detail" id="day-detail-${date}" hidden>${date!=="Sans date" ? dayExpenseDetailHTML(date) : ''}</div>`;
    }).join('');
    $$(".day-row").forEach(row=>{
      row.onclick = () => {
        const detail = document.getElementById("day-detail-"+row.dataset.dayToggle);
        if(detail) detail.hidden = !detail.hidden;
      };
    });
  } else {
    container.innerHTML = entries.map(([label,amt])=>{
      const w = Math.max(3, Math.round(amt/max*100));
      return `<div class="budget-row">
        <div class="b-label">${label}</div>
        <div class="b-bar"><div class="b-fill" style="width:${w}%;"></div></div>
        <div class="b-amt">$${Math.round(amt).toLocaleString()}</div>
      </div>`;
    }).join('');
  }
}
function wireBudgetAggToggle(){
  $$(".agg-toggle-btn").forEach(btn=>{
    btn.onclick = () => {
      budgetAggMode = btn.dataset.agg;
      $$(".agg-toggle-btn").forEach(b=>b.classList.toggle("active", b.dataset.agg===budgetAggMode));
      renderBudgetAggregation();
    };
  });
}

let editingExpenseId = null;
function openExpenseModal(expense){
  editingExpenseId = expense ? expense.id : null;
  $("#expenseModalTitle").textContent = expense ? "Modifier la dépense" : "Nouvelle dépense";
  $("#expenseSubmitBtn").textContent = expense ? "Enregistrer" : "Ajouter";
  $("#expAmount").value = expense ? expense.amount : "";
  $("#expCurrency").value = expense ? expense.currency : "JPY";
  $("#expCategory").value = expense ? expense.category : "Transport";
  $("#expCity").value = expense ? expense.city : "Sapporo";
  $("#expDate").value = expense ? expense.date : "";
  $("#expNote").value = expense ? expense.note : "";
  $("#expOutOfBudget").checked = expense ? !!expense.outOfBudget : false;
  $("#expenseModalBackdrop").classList.add("open");
}
function wireExpenseModal(){
  const backdrop = $("#expenseModalBackdrop");
  $("#addExpenseBtn").onclick = () => openExpenseModal(null);
  $("#expenseCancelBtn").onclick = () => backdrop.classList.remove("open");
  backdrop.onclick = (e) => { if(e.target === backdrop) backdrop.classList.remove("open"); };
  $("#expenseForm").onsubmit = (e) => {
    e.preventDefault();
    const fields = {
      amount: parseFloat($("#expAmount").value) || 0,
      currency: $("#expCurrency").value,
      category: $("#expCategory").value,
      city: $("#expCity").value,
      date: $("#expDate").value,
      note: $("#expNote").value.trim(),
      outOfBudget: $("#expOutOfBudget").checked,
    };
    if(editingExpenseId){ updateExpense(editingExpenseId, fields); }
    else { addExpense(fields); }
    e.target.reset();
    backdrop.classList.remove("open");
    renderBudget();
  };
}

/* ============ PHRASES ============ */
function buildPhrases(){
  const list = $("#phrasesList");
  list.innerHTML = PHRASES.map(p=>{
    const catLabel = PHRASE_CATEGORY_LABELS[p.category] || p.category;
    const search = normalizeSearch([p.fr, p.romaji, p.jp, catLabel].join(" "));
    return `<div class="phrase-card" data-search="${search}">
      <div class="ph-cat">${catLabel}</div>
      <div class="ph-jp">${p.jp}</div>
      <div class="ph-romaji">${p.romaji}</div>
      <div class="ph-fr">${p.fr}</div>
      <button class="ph-copy" data-copy-text="${p.jp}">Copier le japonais</button>
    </div>`;
  }).join('');
  $$(".ph-copy").forEach(btn=>{
    btn.onclick = () => copyToClipboard(btn.dataset.copyText, btn);
  });
}
function wirePhraseSearch(){
  const input = $("#phraseSearch");
  input.oninput = () => {
    const q = normalizeSearch(input.value);
    $$(".phrase-card").forEach(card=>{
      card.hidden = q.length > 0 && !card.dataset.search.includes(q);
    });
  };
}

/* ============ MORE menu ============ */
function showMoreSub(id){
  $$("#tab-more .sub-panel").forEach(p=>p.classList.remove("active"));
  $("#more-"+id).classList.add("active");
}
function buildMore(){
  $$(".more-menu-item").forEach(btn=>{
    btn.onclick = () => showMoreSub(btn.dataset.more);
  });
  $$("[data-back]").forEach(btn=>{
    btn.onclick = () => showMoreSub(btn.dataset.back);
  });
  $("#exportBtn").onclick = () => downloadExport();
  $("#importBtn").onclick = () => $("#importFile").click();
  $("#importFile").onchange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    importFromFile(file, (ok) => {
      alert(ok ? "Import réussi." : "Échec de l'import — fichier invalide.");
      if(ok){ renderBudget(); buildStagePanels(); renderToday(); }
    });
    e.target.value = "";
  };
  $("#resetBtn").onclick = () => {
    if(confirm("Effacer toutes tes données locales (checklist, dépenses, activités) ? Cette action est irréversible.")){
      resetAllData();
      seedDefaultsOnce();
      renderBudget();
      buildStagePanels();
      renderToday();
    }
  };
}

/* ============ DAY CARDS (shared by Today + Day detail) ============ */
const DEFAULT_CHECKLIST_ITEMS = [
  {id:"passport", label:"Passeport / portefeuille"},
  {id:"battery", label:"Batterie chargée"},
  {id:"address", label:"Adresse de l'hôtel notée"},
  {id:"water", label:"Eau"},
];

function findActiveHotel(iso){
  const candidates = HOTELS.filter(h => h.checkinDate <= iso).sort((a,b)=> a.checkinDate < b.checkinDate ? -1 : 1);
  return candidates.length ? candidates[candidates.length-1] : null;
}

function hotelMiniCardHTML(hotel){
  return `<div class="wallet-card type-hotel">
    <div class="wc-top">
      <div class="wc-kanji">${hotel.kanji}</div>
      <div class="wc-icon">Hôtel ce soir</div>
      <div class="wc-title">${hotel.name}</div>
      <div class="wc-subtitle">${hotel.checkin} → ${hotel.checkout}</div>
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      ${addressRowsHTML(hotel)}
      ${addressActionsHTML(hotel, `<button class="wc-btn" data-goto-hotel="${hotel.stageId}">Voir la réservation</button>`)}
    </div>
  </div>`;
}
function flightMiniCardHTML(f){
  return `<div class="wallet-card type-flight">
    <div class="wc-top">
      <div class="wc-kanji">${f.kanji}</div>
      <div class="wc-icon">Vol aujourd'hui</div>
      <div class="wc-title">${f.route}</div>
      <div class="wc-subtitle">${f.segs.map(sg=>`${sg.code1} ${sg.t1} → ${sg.code2} ${sg.t2}`).join(' · ')}</div>
    </div>
    <div class="wc-tear"></div>
    <div class="wc-body">
      <div class="wc-actions">
        <button class="wc-btn" data-copy-text="${flightInfoText(f).replace(/"/g,'&quot;')}">Copier infos vol</button>
        <button class="wc-btn" data-goto-flight="${f.id}">Voir la réservation</button>
      </div>
    </div>
  </div>`;
}

/* Renders the full day card-stack (hero + hotel/flight in chronological order +
   program + activities + checklist) for a given ISO date into a container. */
function renderDayCards(iso, container){
  const hotel = findActiveHotel(iso);
  const stage = hotel ? STAGES.find(s => s.id === hotel.stageId) : null;
  const dayEntries = [];
  STAGES.forEach(s => s.days.forEach(d => { if(d.dates.includes(iso)) dayEntries.push({...d, stage:s}); }));
  const todaysFlights = FLIGHTS.filter(f => f.date === iso);
  const todaysTrains = getAllTrains().filter(t => t.date === iso);
  const weather = dayEntries.find(d => d.weather && d.weather.type !== "unavailable")?.weather || dayEntries[0]?.weather;
  const headerLabel = dayEntries[0] ? dayEntries[0].d : iso;
  const isArrivalDay = !!(hotel && hotel.checkinDate === iso);

  let html = `<div class="today-hero">
    <div class="th-eyebrow">${headerLabel}</div>
    <div class="th-city">${stage? `${stage.name}<span class="jp">${stage.kanji}</span>` : ''}</div>
    ${weatherHTML(weather)}
  </div>`;

  const transportCardsHTML = todaysFlights.map(f => flightMiniCardHTML(f)).join('') + todaysTrains.map(t => trainMiniCardHTML(t)).join('');
  const hotelCardHTML = hotel ? hotelMiniCardHTML(hotel) : '';
  const fallbackTransportHTML = (!todaysFlights.length && !todaysTrains.length && stage && stage.days[0].dates.includes(iso) && stage.transport)
    ? `<div class="today-card"><div class="tc-label">Transport aujourd'hui</div><div class="tc-title">${stage.transport}</div></div>`
    : '';

  if(isArrivalDay){
    html += transportCardsHTML || fallbackTransportHTML;
    html += hotelCardHTML;
  } else {
    html += hotelCardHTML;
    html += transportCardsHTML || fallbackTransportHTML;
  }

  if(dayEntries.length){
    html += `<div class="today-card">
      <div class="tc-label">Programme</div>
      ${dayEntries.map(d => programStepsHTML(d.body) + (d.flag? `<span class="d-flag">${d.flag}</span>`:'')).join('<hr style="border:none;border-top:1px solid var(--line);margin:10px 0;">')}
    </div>`;
  }

  const cityActivities = stage ? (ACTIVITIES[stage.id] || []) : [];
  if(cityActivities.length){
    html += `<div class="section-label">Idées d'activités — ${stage.name}</div>
      ${cityActivities.map(a => activityCardHTML(a, stage.id)).join('')}
      ${addedActivitiesHTML(stage.id)}`;
  }

  const checklist = getChecklist()[iso] || {};
  html += `<div class="today-card">
    <div class="tc-label">Checklist du jour</div>
    <div class="checklist">
      ${DEFAULT_CHECKLIST_ITEMS.map(item=>{
        const checked = !!checklist[item.id];
        const cbId = `chk-${iso}-${item.id}`;
        return `<div class="checklist-item ${checked?'done':''}">
          <input type="checkbox" id="${cbId}" data-checklist-item="${item.id}" data-checklist-date="${iso}" ${checked?'checked':''}>
          <label for="${cbId}">${item.label}</label>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  container.innerHTML = html;

  wireCopyButtons();
  wireActivityAddButtons();
  wireRemoveButtons();
  wirePriceEditButtons();
  $$("[data-checklist-item]", container).forEach(cb=>{
    cb.onchange = () => {
      setChecklistItem(cb.dataset.checklistDate, cb.dataset.checklistItem, cb.checked);
      cb.closest(".checklist-item").classList.toggle("done", cb.checked);
    };
  });
  const gotoHotelBtn = $("[data-goto-hotel]", container);
  if(gotoHotelBtn) gotoHotelBtn.onclick = () => gotoWalletCard('hotel', gotoHotelBtn.dataset.gotoHotel);
  $$("[data-goto-flight]", container).forEach(btn=>{
    btn.onclick = () => gotoWalletCard('flight', btn.dataset.gotoFlight);
  });
  $$("[data-goto-train]", container).forEach(btn=>{
    btn.onclick = () => gotoWalletCard('train', btn.dataset.gotoTrain);
  });
}

function renderToday(){
  const iso = todayISO();
  const el = $("#todayContent");

  if(iso < TRIP.start){
    const days = Math.ceil((new Date(TRIP.start) - new Date(iso)) / 86400000);
    el.innerHTML = `<div class="today-empty">
      <div class="kanji-huge2">旅</div>
      <div>Le voyage commence dans ${days} jour${days>1?'s':''} (6 septembre).</div>
    </div>`;
    return;
  }
  if(iso > TRIP.end){
    el.innerHTML = `<div class="today-empty">
      <div class="kanji-huge2">旅</div>
      <div>Voyage terminé — bon retour !</div>
    </div>`;
    return;
  }
  renderDayCards(iso, el);
}

function openDayDetail(iso){
  showMoreSub("daydetail");
  renderDayCards(iso, $("#dayDetailContent"));
  window.scrollTo({top:0, behavior:"instant"});
}

/* ============ Service worker registration ============ */
function registerServiceWorker(){
  if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").then(reg => {
        // Browsers only auto-check for a new SW once per ~24h; force a check on
        // every launch so same-day pushes actually reach the phone.
        reg.update().catch(()=>{});
      }).catch(err => console.warn("SW registration failed", err));

      let reloadedOnce = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if(reloadedOnce) return;
        reloadedOnce = true;
        window.location.reload();
      });
    });
  }
}

/* ============ init ============ */
function init(){
  seedDefaultsOnce();

  buildBottomNav();
  buildRouteSubNav();
  buildRouteMap();
  buildStagePanels();
  buildFilters();
  renderBookings();
  buildDayByDay();
  buildPhrases();
  wirePhraseSearch();
  buildMore();
  wireExpenseModal();
  wirePriceModal();
  wireAddTransportModal();
  wireBudgetAggToggle();
  renderBudget();
  renderToday();

  showTab("today");
  registerServiceWorker();
}

init();
