/* ============================================================
   TRIP DATA — Japon 2026
   Pure data only. No rendering logic here (see app.js).
   Dates are real ISO strings (date-only, local trip timezone)
   so app.js can compute "what applies today" for the Today tab.
   ============================================================ */

const TRIP = {
  start: "2026-09-06",
  end: "2026-09-20",
  target: "2026-09-20",
};

/* ============ STAGES (route + day-by-day + per-stage panels) ============ */
const STAGES = [
  {
    id:"sapporo", kanji:"札幌", nameFr:"Sapporo", nameEn:"Sapporo",
    rangeFr:"Dim 6 → Lun 7 sept · 1 nuit", rangeEn:"Sun Sept 6 → Mon 7 · 1 night",
    transportFr:"Vol direct depuis Séoul (Jeju Air)", transportEn:"Direct flight from Seoul (Jeju Air)",
    vibeFr:"Première soirée japonaise, sans ambition touristique. Centre-ville à pied.",
    vibeEn:"First evening in Japan, no rigid checklist. Downtown on foot.",
    days:[
      {dFr:"DIM 6 SEPT", dEn:"SUN SEP 6", dates:["2026-09-06"], bodyFr:"Vol Séoul → Sapporo (12h15→15h00). Immigration + train, installation vers 17h. Soirée à pied : <b>Odori Park</b> → Tanukikoji → Susukino. Dîner kosher-friendly à trouver sur place (végétarien/poisson identifiable plutôt que kasher strict).", bodyEn:"Flight Seoul → Sapporo (12:15→15:00). Immigration + train, settled in by ~5pm. Evening on foot: <b>Odori Park</b> → Tanukikoji → Susukino. Find a kosher-friendly dinner on the spot (vegetarian/identifiable fish rather than strictly kosher).", flagFr:null, flagEn:null,
       weather:{descFr:"Ensoleillé, quelques passages nuageux", descEn:"Sunny with some cloud", tempFr:"28°C / 13°C", emoji:"☀︎", tempHigh:"28°", precip:"20%"}}
    ],
    hotelAreaFr:"Chuo-ku, autour de la gare", hotelAreaEn:"Chuo-ku, near the station",
    names:[["Odori Park","大通公園"],["Tanukikoji","狸小路"],["Susukino","すすきの"]],
  },
  {
    id:"asahikawa", kanji:"旭川", nameFr:"Asahikawa", nameEn:"Asahikawa",
    rangeFr:"Lun 7 → Mer 9 sept · 2 nuits", rangeEn:"Mon Sept 7 → Wed 9 · 2 nights",
    transportFr:"Train limited express depuis Sapporo (~1h25)", transportEn:"Limited express train from Sapporo (~1h25)",
    vibeFr:"Base fixe pour deux excursions à la journée : la campagne de Biei, puis le grand jour montagne à Asahidake.",
    vibeEn:"Fixed base for two day trips: the Biei countryside, then the big mountain day at Asahidake.",
    days:[
      {dFr:"LUN 7 SEPT", dEn:"MON SEP 7", dates:["2026-09-07"], bodyFr:"Départ tôt Sapporo → Asahikawa. Sac déposé à l'hôtel (2 nuits). Train vers <b>Biei</b> (~35-45 min), exploré à vélo électrique (pas de voiture) : Patchwork Road, routes agricoles, éventuellement Shikisai-no-Oka — sans chercher à tout cocher. Retour Asahikawa en fin d'après-midi, soirée autour de la gare/Sanroku.", bodyEn:"Early departure Sapporo → Asahikawa. Bags dropped at the hotel (2 nights). Train to <b>Biei</b> (~35-45 min), explored by e-bike (no car) — Patchwork Road, farm roads, possibly Shikisai-no-Oka, without trying to tick every spot. Back to Asahikawa in the late afternoon, evening near the station/Sanroku.", flagFr:null, flagEn:null,
       weather:{descFr:"Ensoleillé puis nuageux", descEn:"Sunny then cloudy", tempFr:"25°C / 12°C", emoji:"⛅︎", tempHigh:"25°", precip:"40%"}},
      {dFr:"MAR 8 SEPT", dEn:"TUE SEP 8", dates:["2026-09-08"], bodyFr:"<b>Le grand jour : Asahidake.</b> Bus Asahikawa → Asahidake Onsen/Ropeway (~1h40-1h50). Ropeway jusqu'à ~1 600m, dans le paysage volcanique du Daisetsuzan. Rando décidée sur place selon conditions : boucle tranquille Sugatami (~1h30-2h) ou sommet ambitieux (2 291m, plusieurs heures de plus). Onsen avant le bus retour. Deuxième nuit à Asahikawa.", bodyEn:"<b>The big day: Asahidake.</b> Bus Asahikawa → Asahidake Onsen/Ropeway (~1h40-1h50). Ropeway up to ~1,600m into the Daisetsuzan volcanic landscape. Hike decided on-site based on conditions: the calm Sugatami loop (~1.5-2h) or the more ambitious summit (2,291m, several more hours). Onsen before the bus back. Second night in Asahikawa.", flagFr:"Décision rando sur place (visibilité/vent/terrain)", flagEn:"Hike length decided on-site (visibility/wind/terrain)",
       weather:{descFr:"Ensoleillé, quelques nuages", descEn:"Sunny with some cloud", tempFr:"25°C / 15°C", emoji:"☀︎", tempHigh:"25°", precip:"40%"}},
      {dFr:"MER 9 SEPT", dEn:"WED SEP 9", dates:["2026-09-09"], bodyFr:"Matin volontairement léger : petit-déjeuner, courte balade, bagages. Puis aéroport d'Asahikawa (AKJ) pour le vol vers Osaka via Haneda.", bodyEn:"Deliberately light morning: breakfast, short walk, packing. Then Asahikawa airport (AKJ) for the flight to Osaka via Haneda.", flagFr:"Départ hôtel ~11h pour le vol de 13h40", flagEn:"Leave the hotel ~11am for the 1:40pm flight",
       weather:{descFr:"Nuageux puis ensoleillé", descEn:"Cloudy then sunny", tempFr:"21°C / 16°C", emoji:"⛅︎", tempHigh:"21°", precip:"30%"}}
    ],
    hotelAreaFr:"Centre-ville, 1-jodori", hotelAreaEn:"Downtown, 1-jodori",
    names:[["Biei — Patchwork Road","美瑛・パッチワークの路"],["Blue Pond (Shirogane)","青い池"],["Asahidake Ropeway","旭岳ロープウェイ"],["Daisetsuzan","大雪山"]],
  },
  {
    id:"osaka", kanji:"大阪", nameFr:"Osaka", nameEn:"Osaka",
    rangeFr:"Mer 9 → Jeu 10 sept · 1 nuit", rangeEn:"Wed Sept 9 → Thu 10 · 1 night",
    transportFr:"Vol depuis Asahikawa via Haneda (JAL)", transportEn:"Flight from Asahikawa via Haneda (JAL)",
    vibeFr:"Comble la nuit entre Hokkaido et Kyoto — Osaka de nuit, puis une vraie demi-journée le lendemain.",
    vibeEn:"Fills the night between Hokkaido and Kyoto — Osaka by night, then a real half-day the next morning.",
    days:[
      {dFr:"MER 9 SEPT", dEn:"WED SEP 9", dates:["2026-09-09"], bodyFr:"Arrivée Osaka Itami 17h35, Namba vers 19h. Soirée : <b>Namba</b> → Dotonbori → Hozenji Yokocho → Shinsaibashi.", bodyEn:"Arrival Osaka Itami 5:35pm, Namba by ~7pm. Evening: <b>Namba</b> → Dotonbori → Hozenji Yokocho → Shinsaibashi.", flagFr:null, flagEn:null,
       weather:{descFr:"Nuageux, averse possible", descEn:"Cloudy, possible shower", tempFr:"29°C / 25°C", emoji:"🌧︎", tempHigh:"29°", precip:"90%"}},
      {dFr:"JEU 10 SEPT", dEn:"THU SEP 10", dates:["2026-09-10"], bodyFr:"Quasi journée complète. Matin : Kuromon / Namba, éventuellement Osaka Castle. Après-midi : Shinsaibashi / Amerikamura, shopping. Pas de détour par Kobe. Train vers Kyoto en fin de journée (~30-60 min), arrivée visée 18h-19h.", bodyEn:"Near-full day. Morning: Kuromon / Namba, possibly Osaka Castle. Afternoon: Shinsaibashi / Amerikamura, shopping. No detour to Kobe. Train to Kyoto in the late afternoon (~30-60 min), aiming to arrive 6-7pm.", flagFr:null, flagEn:null,
       weather:{descFr:"Nuageux, pluie par moments", descEn:"Cloudy, rain at times", tempFr:"27°C / 23°C", emoji:"🌧︎", tempHigh:"27°", precip:"70%"}}
    ],
    hotelAreaFr:"Namba", hotelAreaEn:"Namba",
    names:[["Dotonbori","道頓堀"],["Hozenji Yokocho","法善寺横丁"],["Shinsaibashi / Amerikamura","心斎橋・アメリカ村"],["Kuromon Market","黒門市場"]],
  },
  {
    id:"kyoto", kanji:"京都", nameFr:"Kyoto", nameEn:"Kyoto",
    rangeFr:"Jeu 10 → Lun 14 sept · 4 nuits", rangeEn:"Thu Sept 10 → Mon 14 · 4 nights",
    transportFr:"Train depuis Osaka (~30-60 min)", transportEn:"Train from Osaka (~30-60 min)",
    vibeFr:"Japon historique. Un seul hôtel pour 4 nuits.",
    vibeEn:"Historic Japan. One hotel for 4 nights.",
    days:[
      {dFr:"JEU 10 SEPT", dEn:"THU SEP 10", dates:["2026-09-10"], bodyFr:"Arrivée en soirée depuis Osaka, installation à l'hôtel (4 nuits).", bodyEn:"Evening arrival from Osaka, check into the hotel (4 nights).", flagFr:null, flagEn:null,
       weather:{descFr:"Nuageux, pluie par moments", descEn:"Cloudy, rain at times", tempFr:"27°C / 23°C", emoji:"🌧︎", tempHigh:"27°", precip:"70%"}},
      {dFr:"VEN 11 SEPT", dEn:"FRI SEP 11", dates:["2026-09-11"], bodyFr:"Matinée libre jusqu'à ~16h30 : <b>Higashiyama</b> — Kiyomizu-dera → Sannenzaka → Ninenzaka → Kodai-ji/ruelles Higashiyama → Yasaka Shrine → Gion. Retour hôtel en fin d'après-midi.", bodyEn:"Free morning until ~4:30pm: <b>Higashiyama</b> — Kiyomizu-dera → Sannenzaka → Ninenzaka → Kodai-ji/Higashiyama backstreets → Yasaka Shrine → Gion. Back to the hotel in the late afternoon.", flagFr:null, flagEn:null,
       weather:{descFr:"Nuageux, tournant à la pluie", descEn:"Cloudy, turning to rain", tempFr:"31°C / 23°C", emoji:"⛅︎", tempHigh:"31°", precip:"50%", conf:"E"}},
      {dFr:"SAM 12 SEPT", dEn:"SAT SEP 12", dates:["2026-09-12"], bodyFr:"<b>Kurama</b> (forêt de cèdres) → <b>Kibune</b> (village rivière, kawadoko si en saison).", bodyEn:"<b>Kurama</b> (cedar forest) → <b>Kibune</b> (river village, kawadoko if in season).", flagFr:"Réserver le resto kawadoko à l'avance si possible", flagEn:"Book the kawadoko restaurant ahead if possible",
       weather:{descFr:"Ensoleillé, quelques nuages", descEn:"Sunny with some cloud", tempFr:"32°C / 24°C", emoji:"☀︎", tempHigh:"32°", precip:"40%", conf:"E"}},
      {dFr:"DIM 13 SEPT", dEn:"SUN SEP 13", dates:["2026-09-13"], bodyFr:"Journée calme, quartier d'Okazaki / Philosopher's Path à pied.", bodyEn:"A quiet day, Okazaki / Philosopher's Path area on foot.", flagFr:null, flagEn:null,
       weather:{descFr:"Ensoleillé, tournant à la pluie", descEn:"Sunny, turning to rain", tempFr:"31°C / 24°C", emoji:"☀︎", tempHigh:"31°", precip:"60%", conf:"E"}},
      {dFr:"LUN 14 SEPT", dEn:"MON SEP 14", dates:["2026-09-14"], bodyFr:"Matin ouest de Kyoto : <b>Nishiki Market</b> (rapide, en chemin) → <b>Otagi Nenbutsu-ji</b> → <b>Saga-Toriimoto</b> (un des deux si le temps presse). Départ hôtel à 14h max, train vers Shirahama (~3h).", bodyEn:"Morning in west Kyoto: <b>Nishiki Market</b> (quick, on the way) → <b>Otagi Nenbutsu-ji</b> → <b>Saga-Toriimoto</b> (pick one if time is tight). Leave the hotel by 2pm at the latest, train to Shirahama (~3h).", flagFr:"Départ à 14h max — journée la plus chargée", flagEn:"Leave by 2pm at the latest — busiest day",
       weather:{descFr:"Ensoleillé, averse possible (estimation zone Osaka)", descEn:"Sunny, possible shower (Osaka-area estimate)", tempFr:"32°C / 25°C", emoji:"☀︎", tempHigh:"32°", precip:"50%", conf:"E"}}
    ],
    hotelAreaFr:"Okazaki", hotelAreaEn:"Okazaki",
    names:[["Kiyomizu-dera","清水寺"],["Sannenzaka / Ninenzaka","産寧坂・二寧坂"],["Yasaka Shrine","八坂神社"],["Gion","祇園"],["Kurama-dera","鞍馬寺"],["Kibune-jinja","貴船神社"],["Otagi Nenbutsu-ji","愛宕念仏寺"],["Nishiki Market","錦市場"]],
  },
  {
    id:"shirahama", kanji:"白浜", nameFr:"Shirahama", nameEn:"Shirahama",
    rangeFr:"Lun 14 → Mar 15 sept · 1 nuit", rangeEn:"Mon Sept 14 → Tue 15 · 1 night",
    transportFr:"Train limited express Kuroshio depuis Kyoto (~3h)", transportEn:"Kuroshio limited express train from Kyoto (~3h)",
    vibeFr:"Rupture volontaire de rythme — plage Pacifique, aucune checklist.",
    vibeEn:"Deliberate change of pace — Pacific beach, no checklist.",
    days:[
      {dFr:"LUN 14 SOIR", dEn:"MON SEP 14 EVE", dates:["2026-09-14"], bodyFr:"Plage, baignade, sunset, dîner. Éventuellement <b>Saki-no-Yu</b>, onsen face à l'océan.", bodyEn:"Beach, swim, sunset, dinner. Possibly <b>Saki-no-Yu</b>, an oceanfront onsen.", flagFr:null, flagEn:null,
       weather:{type:"unavailable"}},
      {dFr:"MAR 15 SEPT", dEn:"TUE SEP 15", dates:["2026-09-15"], bodyFr:"Journée complète à Shirahama : plage, Sandanbeki, Toretore Ichiba. Vol du soir (18h25) vers Tokyo — choisi pour garder la journée pleine.", bodyEn:"Full day in Shirahama: beach, Sandanbeki, Toretore Ichiba. Evening flight (6:25pm) to Tokyo — chosen to keep the full day.", flagFr:null, flagEn:null,
       weather:{type:"unavailable"}}
    ],
    hotelAreaFr:"Bord de mer", hotelAreaEn:"Seafront",
    names:[["Shirarahama Beach","白良浜"],["Sandanbeki","三段壁"],["Saki-no-Yu","崎の湯"],["Toretore Ichiba","とれとれ市場"]],
  },
  {
    id:"tokyo", kanji:"東京", nameFr:"Tokyo", nameEn:"Tokyo",
    rangeFr:"Mar 15 → Sam 19 sept · 4 nuits", rangeEn:"Tue Sept 15 → Sat 19 · 4 nights",
    transportFr:"Vol depuis Shirahama (JAL)", transportEn:"Flight from Shirahama (JAL)",
    vibeFr:"Shopping, vintage, Fuji flexible, mix ancien/moderne.",
    vibeEn:"Shopping, vintage, flexible Fuji day, old/modern mix.",
    days:[
      {dFr:"MAR 15 SEPT", dEn:"TUE SEP 15", dates:["2026-09-15"], bodyFr:"Arrivée Haneda 19h40. <b>Nakano Broadway</b> (Pokémon, montres vintage) et Fujiya Camera si l'heure le permet.", bodyEn:"Arrival Haneda 7:40pm. <b>Nakano Broadway</b> (Pokémon, vintage watches) and Fujiya Camera if time allows.", flagFr:null, flagEn:null, weather:{type:"unavailable"}},
      {dFr:"MER 16 / JEU 17", dEn:"WED 16 / THU 17", dates:["2026-09-16","2026-09-17"], bodyFr:"Deux jours interchangeables, décidés à J-1/J-2 selon météo.<br>🗻 <b>Mont Fuji</b> — Kawaguchiko, Oishi Park.<br>🗼 <b>Tokyo contemporain</b> — Shibuya → Harajuku → Omotesando/Aoyama → Koenji.", bodyEn:"Two interchangeable days, decided 1-2 days out by forecast.<br>🗻 <b>Mt Fuji</b> — Kawaguchiko, Oishi Park.<br>🗼 <b>Contemporary Tokyo</b> — Shibuya → Harajuku → Omotesando/Aoyama → Koenji.", flagFr:null, flagEn:null, weather:{type:"unavailable"}},
      {dFr:"VEN 18 SEPT", dEn:"FRI SEP 18", dates:["2026-09-18"], bodyFr:"<b>Asakusa</b> / Senso-ji puis <b>Ueno / Ameyoko</b>. Fin des achats (montre, caméra, Pokémon).", bodyEn:"<b>Asakusa</b> / Senso-ji then <b>Ueno / Ameyoko</b>. Finish shopping (watch, camera, Pokémon).", flagFr:null, flagEn:null, weather:{type:"unavailable"}},
      {dFr:"SAM 19 SEPT", dEn:"SAT SEP 19", dates:["2026-09-19"], bodyFr:"Fin de séjour, quartier de l'hôtel. Soir : vol Narita → Séoul.", bodyEn:"Last stretch, hotel's neighborhood. Evening: flight Narita → Seoul.", flagFr:"Vol au départ de Narita, pas Haneda — prévoir 1h-1h30 de trajet", flagEn:"Flight from Narita, not Haneda — allow 1-1.5h transfer", weather:{type:"unavailable"}}
    ],
    hotelAreaFr:"Minato-ku, Takanawa", hotelAreaEn:"Minato-ku, Takanawa",
    names:[["Nakano Broadway","中野ブロードウェイ"],["Shibuya","渋谷"],["Koenji","高円寺"],["Kawaguchiko","河口湖"],["Asakusa","浅草"],["Ueno / Ameyoko","上野・アメ横"]],
  }
];

/* ============ BOOKINGS ============ */
function mapsUrl(addr){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr); }
function telUrl(phone){ return "tel:" + phone.replace(/[^0-9+]/g,""); }

const HOTELS = [
  { kanji:"札幌", name:"KOKO HOTEL Sapporo Ekimae", cityFr:"Sapporo", cityEn:"Sapporo", stageId:"sapporo",
    checkinDate:"2026-09-06", checkoutDate:"2026-09-07",
    dateRangeFr:"Dim 6 → Lun 7 sept", dateRangeEn:"Sun Sep 6 → Mon 7", nightsFr:"1 nuit", nightsEn:"1 night",
    checkinFr:"6 sept, à partir de 15h00", checkinEn:"Sep 6, from 3:00 PM", checkoutFr:"7 sept, avant 11h00", checkoutEn:"Sep 7, before 11:00 AM",
    room:"Double Room with Small Double Bed — Non-Smoking",
    address:"060-0001, Sapporo, Chuo-ku, Kita 1-jo, Nishi 3-chome, 3-10", addressJP:"060-0001 札幌市中央区北1条西3丁目3-10", phone:"+81 11-261-3489",
    confirmation:"5815960773", pin:"6276", price:"¥10,619" },
  { kanji:"旭川", name:"HOTEL AMANEK Asahikawa", cityFr:"Asahikawa", cityEn:"Asahikawa", stageId:"asahikawa",
    checkinDate:"2026-09-07", checkoutDate:"2026-09-09",
    dateRangeFr:"Lun 7 → Mer 9 sept", dateRangeEn:"Mon Sep 7 → Wed 9", nightsFr:"2 nuits", nightsEn:"2 nights",
    checkinFr:"7 sept (15h00-00h00)", checkinEn:"Sep 7 (3:00 PM-12:00 AM)", checkoutFr:"9 sept, avant 11h00", checkoutEn:"Sep 9, before 11:00 AM",
    room:"Standard Twin Room",
    address:"070-0031, Asahikawa, 1 JoDori 8 Chome 218", addressJP:"070-0031 旭川市1条通8丁目218", phone:"+81 166-76-5430",
    confirmation:"6181799980", pin:"3493", price:"¥20,495" },
  { kanji:"大阪", name:"APA Hotel Namba Ekihigashi", cityFr:"Osaka (Namba)", cityEn:"Osaka (Namba)", stageId:"osaka",
    checkinDate:"2026-09-09", checkoutDate:"2026-09-10",
    dateRangeFr:"Mer 9 → Jeu 10 sept", dateRangeEn:"Wed Sep 9 → Thu 10", nightsFr:"1 nuit", nightsEn:"1 night",
    checkinFr:"9 sept, à partir de 15h00", checkinEn:"Sep 9, from 3:00 PM", checkoutFr:"10 sept, avant 10h00", checkoutEn:"Sep 10, before 10:00 AM",
    room:"Single Room — Non-Smoking",
    address:"542-0075, Osaka, Chuo Ward, Namba Sennichimae 4-29", addressJP:"542-0075 大阪市中央区難波千日前4-29", phone:"+81 6-6630-8411",
    confirmation:"6965465308", pin:"5122", price:"¥9,090" },
  { kanji:"京都", name:"Heian No Mori Kyoto", cityFr:"Kyoto", cityEn:"Kyoto", stageId:"kyoto",
    checkinDate:"2026-09-10", checkoutDate:"2026-09-14",
    dateRangeFr:"Jeu 10 → Lun 14 sept", dateRangeEn:"Thu Sep 10 → Mon 14", nightsFr:"4 nuits", nightsEn:"4 nights",
    checkinFr:"10 sept, à partir de 15h00", checkinEn:"Sep 10, from 3:00 PM", checkoutFr:"14 sept, avant 11h00", checkoutEn:"Sep 14, before 11:00 AM",
    room:"King Room",
    address:"Kyoto, Sakyo-ku Okazakihigashi Tenno-cho 51", addressJP:"606-8332 京都市左京区岡崎東天王町51", phone:"+81 75-761-3130",
    confirmation:"6870894039", pin:null, price:"¥44,736",
    noteFr:"Annulation gratuite jusqu'au 8 sept 23:59.", noteEn:"Free cancellation until Sep 8, 11:59 PM." },
  { kanji:"白浜", name:"Guest Living Mu Nanki Shirahama", cityFr:"Shirahama", cityEn:"Shirahama", stageId:"shirahama",
    checkinDate:"2026-09-14", checkoutDate:"2026-09-15",
    dateRangeFr:"Lun 14 → Mar 15 sept", dateRangeEn:"Mon Sep 14 → Tue 15", nightsFr:"1 nuit", nightsEn:"1 night",
    checkinFr:"14 sept (16h00-20h00)", checkinEn:"Sep 14 (4:00-8:00 PM)", checkoutFr:"15 sept (7h00-10h00)", checkoutEn:"Sep 15 (7:00-10:00 AM)",
    room:"Apartment with Sea View",
    address:"Wakayama, Shirahama, Mishimurogun Shirahama-cho 3076-1", addressJP:"649-2200 和歌山県西牟婁郡白浜町字浜通り3076-1", phone:"+81 739-34-2466",
    confirmation:"6307857280", pin:"0501", price:"≈ $66 / ¥10,505",
    noteFr:"Annulation gratuite jusqu'au 6 sept 23:59.", noteEn:"Free cancellation until Sep 6, 11:59 PM." },
  { kanji:"東京", name:"APA Hotel Shinagawa Sengakuji Ekimae", cityFr:"Tokyo", cityEn:"Tokyo", stageId:"tokyo",
    checkinDate:"2026-09-15", checkoutDate:"2026-09-19",
    dateRangeFr:"Mar 15 → Sam 19 sept", dateRangeEn:"Tue Sep 15 → Sat 19", nightsFr:"4 nuits", nightsEn:"4 nights",
    checkinFr:"15 sept, à partir de 15h00", checkinEn:"Sep 15, from 3:00 PM", checkoutFr:"19 sept, avant 10h00", checkoutEn:"Sep 19, before 10:00 AM",
    room:"Single Room — Non-Smoking (petit-déj inclus)",
    address:"Tokyo, Minato-ku, Takanawa 2-16-30", addressJP:"108-0074 港区高輪2-16-30", phone:"+81 3-5475-6801",
    confirmation:"5015398345", pin:null, price:"¥72,270",
    noteFr:"Annulation gratuite jusqu'au 13 sept 23:59.", noteEn:"Free cancellation until Sep 13, 11:59 PM." },
];

const FLIGHTS = [
  { kanji:"✈", date:"2026-09-06", routeFr:"Séoul → Sapporo", routeEn:"Seoul → Sapporo", dateFr:"Dim 6 sept", dateEn:"Sun Sep 6",
    segs:[{code1:"ICN",code2:"CTS",t1:"12:15",t2:"15:00",flightNo:"Jeju Air 7C1503",dur:"2h45"}],
    passenger:"Tom Cohen", confirmation:"NFVF7N", price:"part de $488.97" },
  { kanji:"✈", date:"2026-09-09", routeFr:"Asahikawa → Tokyo → Osaka", routeEn:"Asahikawa → Tokyo → Osaka", dateFr:"Mer 9 sept", dateEn:"Wed Sep 9",
    segs:[
      {code1:"AKJ",code2:"HND",t1:"13:40",t2:"15:25",flightNo:"JAL554",dur:"1h45"},
      {code1:"HND",code2:"ITM",t1:"16:30",t2:"17:35",flightNo:"JAL127",dur:"1h05"}
    ],
    passenger:"Cohen Tom (28)", confirmation:"DXF6ZO", ticket:"1312265194971", price:"part de $488.97 (avec le vol Séoul→Sapporo)",
    noteFr:"Correspondance à Haneda : 1h05 de transit, changement d'avion.", noteEn:"Connection at Haneda: 1h05 transit, change of plane." },
  { kanji:"✈", date:"2026-09-15", routeFr:"Shirahama → Tokyo", routeEn:"Shirahama → Tokyo", dateFr:"Mar 15 sept", dateEn:"Tue Sep 15",
    segs:[{code1:"SHM",code2:"HND",t1:"18:25",t2:"19:40",flightNo:"JAL218",dur:"1h15"}],
    passenger:"Tom William Chalom Cohen", confirmation:"—", price:"$144.00" },
  { kanji:"✈", date:"2026-09-19", routeFr:"Tokyo → Séoul", routeEn:"Tokyo → Seoul", dateFr:"Sam 19 sept", dateEn:"Sat Sep 19",
    segs:[{code1:"NRT",code2:"ICN",t1:"21:45",t2:"00:25",flightNo:"T'Way Air TW248",dur:"2h40"}],
    passenger:"Tom William Chalom Cohen", confirmation:"—", price:"$323.70",
    noteFr:"⚠ Départ de Narita, pas Haneda — compter 1h-1h30 depuis l'hôtel de Minato-ku.", noteEn:"⚠ Departs from Narita, not Haneda — allow 1-1.5h from the Minato-ku hotel." },
  { kanji:"✈", date:"2026-09-20", routeFr:"Séoul → New York", routeEn:"Seoul → New York", dateFr:"Dim 20 sept", dateEn:"Sun Sep 20",
    segs:[{code1:"ICN",code2:"JFK",t1:"10:00",t2:"11:00",flightNo:"Korean Air KE081",dur:"14h00"}],
    passenger:"Tom Cohen", confirmation:"FUICI9", price:"payé par l'entreprise (Navan)",
    noteFr:"Voyage professionnel — aucun coût personnel.", noteEn:"Business trip — no personal cost." },
];

const TRAINS = []; // à venir

/* ============ BUDGET (fixed exchange constants — edit by hand if needed) ============ */
const JPY_PER_USD = 160;
const KRW_PER_USD = 1350;
const BUDGET_TARGET = 3000;

/* ============ PHRASES ============ */
const PHRASES = [
  /* ---- cacherout ---- */
  { id:"ph-kosher-1", category:"cacherout",
    jp:"この料理に豚肉は入っていますか？",
    romaji:"Kono ryōri ni butaniku wa haitte imasu ka?",
    fr:"Ce plat contient-il du porc ?" },
  { id:"ph-kosher-2", category:"cacherout",
    jp:"この料理に貝類やエビ、カニなどの魚介類は入っていますか？",
    romaji:"Kono ryōri ni kairui ya ebi, kani nado no gyokairui wa haitte imasu ka?",
    fr:"Ce plat contient-il des coquillages, des crevettes ou du crabe ?" },
  { id:"ph-kosher-3", category:"cacherout",
    jp:"だし汁は魚からできていますか？",
    romaji:"Dashijiru wa sakana kara dekite imasu ka?",
    fr:"Le bouillon (dashi) est-il à base de poisson ?" },
  { id:"ph-kosher-4", category:"cacherout",
    jp:"肉と乳製品を一緒に食べることができません。この料理に両方入っていますか？",
    romaji:"Niku to nyūseihin o issho ni taberu koto ga dekimasen. Kono ryōri ni ryōhō haitte imasu ka?",
    fr:"Je ne peux pas manger de viande et de produits laitiers ensemble. Ce plat contient-il les deux ?" },
  { id:"ph-kosher-5", category:"cacherout",
    jp:"うろことひれがある魚を使った料理はどれですか？",
    romaji:"Uroko to hire ga aru sakana o tsukatta ryōri wa dore desu ka?",
    fr:"Quel plat utilise un poisson avec des écailles et des nageoires ?" },
  { id:"ph-kosher-6", category:"cacherout",
    jp:"野菜だけの料理はありますか？",
    romaji:"Yasai dake no ryōri wa arimasu ka?",
    fr:"Avez-vous un plat uniquement à base de légumes ?" },

  /* ---- shabbat ---- */
  { id:"ph-shabbat-1", category:"shabbat",
    jp:"私はユダヤ教徒で、土曜日は宗教上の安息日（シャバット）にあたります。日没から翌日の日没まで、電気のスイッチ、電話、エレベーターのボタンなどを使うことができません。ご理解いただけますと幸いです。",
    romaji:"Watashi wa yudaya-kyōto de, doyōbi wa shūkyōjō no ansokubi (shabatto) ni atarimasu. Nichibotsu kara yokujitsu no nichibotsu made, denki no suicchi, denwa, erebētā no botan nado o tsukau koto ga dekimasen. Gorikai itadakemasu to saiwai desu.",
    fr:"Je suis juif pratiquant, et le samedi correspond à mon jour de repos religieux (Chabbat). Du coucher du soleil au coucher du soleil suivant, je ne peux pas utiliser d'interrupteurs électriques, le téléphone, ni les boutons d'ascenseur. Merci de votre compréhension." },
  { id:"ph-shabbat-2", category:"shabbat",
    jp:"その間、エレベーターが使えないため、階段を使わせていただけますか？",
    romaji:"Sono aida, erebētā ga tsukaenai tame, kaidan o tsukawasete itadakemasu ka?",
    fr:"Pendant ce temps, je ne peux pas utiliser l'ascenseur — puis-je utiliser l'escalier ?" },
  { id:"ph-shabbat-3", category:"shabbat",
    jp:"自動ドアや電気の鍵を、代わりに開けていただくことはできますか？",
    romaji:"Jidō doa ya denki no kagi o, kawari ni akete itadaku koto wa dekimasu ka?",
    fr:"Pourriez-vous ouvrir la porte automatique ou le verrou électrique à ma place ?" },
  { id:"ph-shabbat-4", category:"shabbat",
    jp:"土曜日の朝、電話を使わずに、部屋のドアをノックして起こしていただけますか？時間を相談させてください。",
    romaji:"Doyōbi no asa, denwa o tsukawazu ni, heya no doa o nokku shite okoshite itadakemasu ka? Jikan o sōdan sasete kudasai.",
    fr:"Pourriez-vous me réveiller samedi matin en frappant à la porte de ma chambre, sans utiliser le téléphone ? J'aimerais convenir de l'heure avec vous." },
  { id:"ph-shabbat-5", category:"shabbat",
    jp:"その間は電話に出ることができません。ご了承ください。",
    romaji:"Sono aida wa denwa ni deru koto ga dekimasen. Goryōshō kudasai.",
    fr:"Pendant cette période, je ne peux pas répondre au téléphone. Merci de votre compréhension." },

  /* ---- politesse ---- */
  { id:"ph-polite-1", category:"politesse",
    jp:"すみません、写真を撮ってもいいですか？",
    romaji:"Sumimasen, shashin o totte mo ii desu ka?",
    fr:"Excusez-moi, puis-je prendre une photo ?" },
  { id:"ph-polite-2", category:"politesse",
    jp:"すみません、少し助けていただけますか？",
    romaji:"Sumimasen, sukoshi tasukete itadakemasu ka?",
    fr:"Excusez-moi, pourriez-vous m'aider un instant ?" },
  { id:"ph-polite-3", category:"politesse",
    jp:"ありがとうございます、助かりました。",
    romaji:"Arigatō gozaimasu, tasukarimashita.",
    fr:"Merci beaucoup, ça m'a beaucoup aidé." },
  { id:"ph-polite-4", category:"politesse",
    jp:"すみません、英語を話せる方はいらっしゃいますか？",
    romaji:"Sumimasen, eigo o hanaseru kata wa irasshaimasu ka?",
    fr:"Excusez-moi, y a-t-il quelqu'un qui parle anglais ?" },
  { id:"ph-polite-5", category:"politesse",
    jp:"お手洗いはどこですか？",
    romaji:"Otearai wa doko desu ka?",
    fr:"Où sont les toilettes ?" },
  { id:"ph-polite-6", category:"politesse",
    jp:"すみません、駅はどこですか？",
    romaji:"Sumimasen, eki wa doko desu ka?",
    fr:"Excusez-moi, où se trouve la gare ?" },
];

/* ============ ACTIVITIES — flat suggestions per city ============ */
const ACTIVITIES = {
  sapporo:[
    { id:"act-sap-1", titleFr:"Chitosetsuru Sake Museum", titleEn:"Chitosetsuru Sake Museum", duration:"~45 min", price:"gratuit / variable", reservation:false, mapsQuery:"Chitosetsuru Sake Museum Sapporo" },
    { id:"act-sap-2", titleFr:"Soup curry végétarien", titleEn:"Vegetarian soup curry", duration:"repas", price:"¥1200-1800", reservation:false, mapsQuery:"", noteFr:"Spécialité de Sapporo — demander une version sans viande.", noteEn:"Sapporo specialty — ask for a meat-free version." },
  ],
  asahikawa:[
    { id:"act-biei-1", titleFr:"Biei — vélo électrique guidé", titleEn:"Biei — guided e-bike tour", duration:"~3h", price:"¥6000-8000", reservation:true, mapsQuery:"Biei Patchwork Road" },
    { id:"act-biei-2", titleFr:"AgriWalk (terres agricoles)", titleEn:"AgriWalk (farmland walk)", duration:"~2h", price:"¥3000-5000", reservation:true, mapsQuery:"Biei" },
    { id:"act-biei-3", titleFr:"Récolte de pommes de terre", titleEn:"Potato digging experience", duration:"~1h30", price:"¥2000-3000", reservation:true, mapsQuery:"Biei potato digging" },
  ],
  osaka:[
    { id:"act-osa-1", titleFr:"Cours de shamisen avec une ancienne geisha", titleEn:"Shamisen lesson with a former geisha", duration:"~1h-1h30", price:"¥5000-8000", reservation:true, mapsQuery:"" },
    { id:"act-osa-2", titleFr:"Calligraphie à Namba", titleEn:"Calligraphy in Namba", duration:"~1h", price:"¥3000-4000", reservation:true, mapsQuery:"Namba" },
    { id:"act-osa-3", titleFr:"Okonomiyaki végétarien", titleEn:"Vegetarian okonomiyaki", duration:"repas", price:"¥1000-1500", reservation:false, mapsQuery:"", noteFr:"Demander sans porc/fruits de mer, et vérifier la sauce/bonite.", noteEn:"Ask for no pork/seafood, and check the sauce/bonito flakes." },
    { id:"act-osa-4", titleFr:"Kushikatsu végétal", titleEn:"Vegetable kushikatsu", duration:"repas", price:"¥800-1500", reservation:false, mapsQuery:"" },
  ],
  kyoto:[
    { id:"act-kyo-1", titleFr:"Senchadō (voie du thé)", titleEn:"Senchadō (tea ceremony)", duration:"~1h30", price:"¥3000-5000", reservation:true, mapsQuery:"" },
    { id:"act-kyo-2", titleFr:"Atelier artisanal (ustensile à tofu, yuzen…)", titleEn:"Craft workshop (tofu utensil, yuzen…)", duration:"~1h-2h", price:"¥3000-6000", reservation:true, mapsQuery:"" },
    { id:"act-kyo-3", titleFr:"Yudofu (tofu chaud)", titleEn:"Yudofu (hot tofu)", duration:"repas", price:"¥2000-4000", reservation:false, mapsQuery:"" },
    { id:"act-kyo-4", titleFr:"Wagashi + thé matcha", titleEn:"Wagashi + matcha tea", duration:"~45 min", price:"¥800-1500", reservation:false, mapsQuery:"" },
  ],
  shirahama:[
    { id:"act-shi-1", titleFr:"Toretore Market", titleEn:"Toretore Market", duration:"~1h-2h", price:"variable", reservation:false, mapsQuery:"Toretore Market Shirahama" },
    { id:"act-shi-2", titleFr:"Saki-no-Yu (onsen face à l'océan)", titleEn:"Saki-no-Yu (oceanfront onsen)", duration:"~1h", price:"¥500-800", reservation:false, mapsQuery:"Saki-no-Yu Shirahama" },
    { id:"act-shi-3", titleFr:"Poisson grillé + umeboshi (Wakayama)", titleEn:"Grilled fish + umeboshi (Wakayama)", duration:"repas", price:"variable", reservation:false, mapsQuery:"", noteFr:"Acheter un poisson identifiable au marché, le faire griller sur place.", noteEn:"Buy an identifiable fish at the market, have it grilled on site." },
  ],
  tokyo:[
    { id:"act-tok-1", titleFr:"Ozu Washi (fabriquer son papier japonais)", titleEn:"Ozu Washi (make your own washi paper)", duration:"~45 min", price:"¥1500-2500", reservation:true, mapsQuery:"Ozu Washi Tokyo" },
    { id:"act-tok-2", titleFr:"Teinture Edo (Some no Sato Ochiai)", titleEn:"Edo dyeing (Some no Sato Ochiai)", duration:"~2h", price:"¥4000-6000", reservation:true, mapsQuery:"Some no Sato Ochiai" },
    { id:"act-tok-3", titleFr:"Sento local (bain public)", titleEn:"Local sento (public bath)", duration:"~1h", price:"¥500", reservation:false, mapsQuery:"" },
    { id:"act-tok-4", titleFr:"Sushi sérieux, nigiri à la pièce", titleEn:"Proper sushi, nigiri à la carte", duration:"repas", price:"¥3000-8000", reservation:false, mapsQuery:"" },
    { id:"act-tok-5", titleFr:"Vegan ramen / monjayaki végétarien", titleEn:"Vegan ramen / vegetarian monjayaki", duration:"repas", price:"¥1000-1800", reservation:false, mapsQuery:"" },
  ],
};
