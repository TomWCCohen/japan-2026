/* ============================================================
   TRIP DATA — Japon 2026
   Pure data only. No rendering logic here (see app.js).
   Dates are real ISO strings (date-only, local trip timezone)
   so app.js can compute "what applies today" for the Today tab.
   French only — edit these fields directly to change content.
   ============================================================ */

const TRIP = {
  start: "2026-09-06",
  end: "2026-09-20",
  target: "2026-09-20",
};

/* ============ STAGES (route + day-by-day + per-stage panels) ============ */
const STAGES = [
  {
    id:"sapporo", kanji:"札幌", name:"Sapporo",
    range:"Dim 6 → Lun 7 sept · 1 nuit",
    transport:"Vol direct depuis Séoul (Jeju Air)",
    vibe:"Première soirée japonaise, sans ambition touristique. Centre-ville à pied.",
    days:[
      {d:"DIM 6 SEPT", dates:["2026-09-06"], body:"Vol Séoul → Sapporo (12h15→15h00). Immigration + train, installation vers 17h. Soirée à pied : <b>Odori Park</b> → Tanukikoji → Susukino. Dîner kosher-friendly à trouver sur place (végétarien/poisson identifiable plutôt que kasher strict).", flag:null,
       weather:{desc:"Ensoleillé, quelques passages nuageux", temp:"28°C / 13°C", emoji:"☀︎", tempHigh:"28°", precip:"20%"}}
    ],
    hotelArea:"Chuo-ku, autour de la gare",
    names:[
      ["Odori Park","大通公園","Grand parc central, cœur de la ville"],
      ["Tanukikoji","狸小路","Longue rue commerçante couverte"],
      ["Susukino","すすきの","Quartier animé de restaurants et bars"],
    ],
  },
  {
    id:"asahikawa", kanji:"旭川", name:"Asahikawa",
    range:"Lun 7 → Mer 9 sept · 2 nuits",
    transport:"Train limited express depuis Sapporo (~1h25)",
    vibe:"Base fixe pour deux excursions à la journée : la campagne de Biei, puis le grand jour montagne à Asahidake.",
    days:[
      {d:"LUN 7 SEPT", dates:["2026-09-07"], body:"Départ tôt Sapporo → Asahikawa. Sac déposé à l'hôtel (2 nuits). Train vers <b>Biei</b> (~35-45 min), exploré à vélo électrique (pas de voiture) : Patchwork Road, routes agricoles, éventuellement Shikisai-no-Oka — sans chercher à tout cocher. Retour Asahikawa en fin d'après-midi, soirée autour de la gare/Sanroku.", flag:null,
       weather:{desc:"Ensoleillé puis nuageux", temp:"25°C / 12°C", emoji:"⛅︎", tempHigh:"25°", precip:"40%"}},
      {d:"MAR 8 SEPT", dates:["2026-09-08"], body:"<b>Le grand jour : Asahidake.</b> Bus Asahikawa → Asahidake Onsen/Ropeway (~1h40-1h50). Ropeway jusqu'à ~1 600m, dans le paysage volcanique du Daisetsuzan. Rando décidée sur place selon conditions : boucle tranquille Sugatami (~1h30-2h) ou sommet ambitieux (2 291m, plusieurs heures de plus). Onsen avant le bus retour. Deuxième nuit à Asahikawa.", flag:"Décision rando sur place (visibilité/vent/terrain) — risque d'averses en fin de journée, viser un retour avant 16h",
       weather:{desc:"Nuageux, averses possibles surtout en fin de journée", temp:"26°C / 16°C", emoji:"⛅︎", tempHigh:"26°", precip:"50%", parts:{matin:{temp:20,precip:30,icon:"⛅︎"}, debutAprem:{temp:25,precip:40,icon:"⛅︎"}, finAprem:{temp:26,precip:45,icon:"⛅︎"}, soir:{temp:20,precip:50,icon:"🌧︎"}}}},
      {d:"MER 9 SEPT", dates:["2026-09-09"], body:"Matin volontairement léger : petit-déjeuner, courte balade, bagages. Puis aéroport d'Asahikawa (AKJ) pour le vol vers Osaka via Haneda.", flag:"Départ hôtel ~11h pour le vol de 13h40",
       weather:{desc:"Nuageux le matin, éclaircies l'après-midi", temp:"22°C / 15°C", emoji:"⛅︎", tempHigh:"22°", precip:"40%", parts:{matin:{temp:17,precip:40,icon:"⛅︎"}, debutAprem:{temp:21,precip:30,icon:"⛅︎"}, finAprem:{temp:22,precip:40,icon:"⛅︎"}, soir:{temp:17,precip:0,icon:"☀︎"}}}}
    ],
    hotelArea:"Centre-ville, 1-jodori",
    names:[
      ["Biei — Patchwork Road","美瑛・パッチワークの路","Routes de campagne entre champs colorés"],
      ["Blue Pond (Shirogane)","青い池","Étang bleu turquoise, sapins immergés"],
      ["Asahidake Ropeway","旭岳ロープウェイ","Télécabine vers le paysage volcanique"],
      ["Daisetsuzan","大雪山","Massif volcanique, plus haut sommet d'Hokkaido"],
    ],
  },
  {
    id:"kyoto", kanji:"京都", name:"Kyoto",
    range:"Mer 9 → Ven 11 sept · 2 nuits",
    transport:"Vol depuis Asahikawa via Haneda (JAL), puis train direct vers Kyoto",
    vibe:"Higashiyama en profondeur cette fois, avant Rosh Hashana à Kobe. Osaka n'est plus qu'un aéroport de passage.",
    days:[
      {d:"MER 9 SEPT", dates:["2026-09-09"], body:"Vol Asahikawa → Osaka (Itami, 17h35) via Haneda. Train direct vers Kyoto, installation à <b>eph Kyoto</b> (2 nuits).", flag:"Pluie soutenue prévue à l'arrivée — prévoir un imperméable/parapluie pour le trajet gare→hôtel",
       weather:{desc:"Pluie, parfois forte", temp:"29°C / 24°C", emoji:"🌧︎", tempHigh:"29°", precip:"90%", parts:{matin:{temp:25,precip:100,icon:"🌧︎"}, debutAprem:{temp:28,precip:100,icon:"🌧︎"}, finAprem:{temp:29,precip:90,icon:"🌧︎"}, soir:{temp:25,precip:80,icon:"🌧︎"}}}},
      {d:"JEU 10 SEPT", dates:["2026-09-10"], body:"06h15 — Réveil. 07h00 — Départ vers <b>Fushimi Inari Taisha</b>. 07h20-08h45 — Fushimi Inari, avant la foule (accessible 24/7). 09h15-12h30 — <b>Kiyomizu-dera</b> → Sannenzaka → Ninenzaka → Ishibe-koji → Kodai-ji → Yasaka. 12h30-13h30 — <b>Gion</b> + déjeuner, idéalement yudofu/yuba. 13h30-14h15 — bonus selon rythme : wagashi + matcha / Kamo River / Pontocho. 14h15 — départ vers l'atelier. 15h30-17h30 — <b>tissage Nishiki chez KOHO TATSUMURA</b> (25 Shichiku Shimonokishicho, Kita-ku) — expérience twill + visite de l'atelier, ~2h. ~18h15 — retour centre. Soir : dîner, Pontocho/Kamo River by night, puis bar de jazz live <b>Baja Bluet</b> (Hanamikoji Street, Gion) si encore de l'énergie.", flag:"Nishiki Market volontairement sacrifié pour l'atelier de tissage. Pluie probable dès le matin — prévoir de quoi se couvrir pour Fushimi Inari.",
       weather:{desc:"Pluvieux, quelques éclaircies possibles", temp:"28°C / 23°C", emoji:"🌧︎", tempHigh:"28°", precip:"70%", parts:{matin:{temp:24,precip:70,icon:"🌧︎"}, debutAprem:{temp:27,precip:65,icon:"🌧︎"}, finAprem:{temp:28,precip:60,icon:"🌧︎"}, soir:{temp:24,precip:50,icon:"🌧︎"}}}},
      {d:"VEN 11 SEPT", dates:["2026-09-11"], body:"06h45-07h00 — Réveil. 07h45 — Check-out, grosses valises laissées à l'hôtel. 08h00-09h00 — Trajet vers Arashiyama / Saga-Toriimoto. 09h00-11h00 — <b>Otagi Nenbutsu-ji</b> → <b>Saga-Toriimoto</b> → Adashino → descente vers Arashiyama. ~11h00-11h40 — Retour centre. 11h45-12h45 — <b>Coiffeur</b> (anglophone). 12h45-13h30 — Déjeuner rapide, récupération des bagages. ~14h00 — Kyoto Station. ~14h15-14h45 — <b>Shinkansen</b> Kyoto → Shin-Kobe. Puis hôtel à Kobe, préparation de Rosh Hashana avec une marge confortable.", flag:"Météo incertaine mais surtout nuageuse le matin plutôt que franchement pluvieuse — les extérieurs restent en premier.",
       weather:{desc:"Pluie le matin, amélioration ensuite", temp:"29°C / 22°C", emoji:"⛅︎", tempHigh:"29°", precip:"60%", conf:"E", parts:{matin:{temp:23,precip:60,icon:"🌧︎"}, debutAprem:{temp:27,precip:40,icon:"⛅︎"}, finAprem:{temp:29,precip:30,icon:"⛅︎"}, soir:{temp:24,precip:35,icon:"⛅︎"}}}}
    ],
    hotelArea:"Minami-ku, près de Kyoto Station",
    names:[
      ["Fushimi Inari Taisha","伏見稲荷大社","Milliers de torii, tôt le matin pour la lumière et le calme"],
      ["Kiyomizu-dera","清水寺","Temple sur pilotis, vue sur la ville"],
      ["Sannenzaka / Ninenzaka","産寧坂・二寧坂","Ruelles pentues, maisons traditionnelles"],
      ["Ishibe-koji Alley","石塀小路","Ruelle pavée préservée, entre Kiyomizu et Gion"],
      ["Kodai-ji","高台寺","Temple zen, jardins et Nene-no-Michi"],
      ["Yasaka Shrine","八坂神社","Sanctuaire à l'entrée de Gion"],
      ["Gion","祇園","Quartier historique des geishas"],
      ["Baja Bluet","バハブルー","Bar de jazz live, Hanamikoji Street, Gion"],
      ["Saga-Toriimoto","嵯峨鳥居本","Rue ancienne près d'Arashiyama"],
      ["Otagi Nenbutsu-ji","愛宕念仏寺","Temple aux 1200 statues de pierre uniques"],
      ["Adashino Nenbutsu-ji","化野念仏寺","Temple voisin, milliers de statuettes de pierre"],
      ["KOHO TATSUMURA","光峯錦織工房","Atelier de tissage Nishiki-ori, Kita-ku"],
    ],
  },
  {
    id:"kobe", kanji:"神戸", name:"Kobe",
    range:"Ven 11 → Dim 13 sept · 2 nuits",
    transport:"Shinkansen Kyoto → Shin-Kobe (~30 min)",
    vibe:"Rosh Hashana avec la communauté de Kobe — minyan garanti, accueil chaleureux du rabbin.",
    days:[
      {d:"VEN 11 SEPT", dates:["2026-09-11"], body:"Arrivée à Kobe en fin d'après-midi, installation au <b>Four Points Flex by Sheraton Kobe Sannomiya</b>. Coucher du soleil : entrée de Rosh Hashana — office et repas de fête avec la communauté.", flag:null,
       weather:{desc:"Nuageux", temp:"30°C / 23°C", emoji:"⛅︎", tempHigh:"30°", precip:"40%", parts:{matin:{temp:24,precip:40,icon:"⛅︎"}, debutAprem:{temp:29,precip:25,icon:"⛅︎"}, finAprem:{temp:30,precip:20,icon:"☀︎"}, soir:{temp:25,precip:20,icon:"☀︎"}}}},
      {d:"SAM 12 SEPT", dates:["2026-09-12"], body:"<b>Rosh Hashana</b>, premier jour. Offices et repas avec la communauté de Kobe.", flag:null,
       weather:{desc:"Éclaircies, quelques passages nuageux", temp:"31°C / 24°C", emoji:"⛅︎", tempHigh:"31°", precip:"40%", parts:{matin:{temp:25,precip:15,icon:"☀︎"}, debutAprem:{temp:30,precip:35,icon:"⛅︎"}, finAprem:{temp:31,precip:40,icon:"⛅︎"}, soir:{temp:26,precip:30,icon:"⛅︎"}}}},
      {d:"DIM 13 SEPT", dates:["2026-09-13"], body:"<b>Rosh Hashana</b>, second jour, jusqu'au coucher du soleil. En soirée : train retour vers Kyoto (<b>eph Kyoto</b>, second séjour).", flag:null,
       weather:{desc:"Ensoleillé", temp:"33°C / 25°C", emoji:"☀︎", tempHigh:"33°", precip:"10%", parts:{matin:{temp:26,precip:10,icon:"☀︎"}, debutAprem:{temp:32,precip:15,icon:"☀︎"}, finAprem:{temp:33,precip:15,icon:"☀︎"}, soir:{temp:27,precip:10,icon:"☀︎"}}}}
    ],
    hotelArea:"Sannomiya, Chuo-ku",
    names:[
      ["Kobe Sannomiya","神戸三宮","Quartier central de Kobe, gares et commerces"],
    ],
  },
  {
    id:"kyoto2", kanji:"京都", name:"Kyoto (retour)",
    range:"Dim 13 → Lun 14 sept · 1 nuit",
    transport:"Train retour depuis Kobe (~50 min), en soirée",
    vibe:"Dernière nuit à Kyoto avant Shirahama — le secteur nord-ouest (Kinkaku-ji, Ryoan-ji) en chemin vers la gare, sans détour.",
    days:[
      {d:"DIM 13 SOIR", dates:["2026-09-13"], body:"Retour en train depuis Kobe en soirée, installation à <b>eph Kyoto</b> (second séjour).", flag:null,
       weather:{desc:"Ensoleillé, doux en soirée", temp:"32°C / 25°C", emoji:"☀︎", tempHigh:"32°", precip:"25%", parts:{matin:{temp:26,precip:30,icon:"⛅︎"}, debutAprem:{temp:31,precip:25,icon:"⛅︎"}, finAprem:{temp:32,precip:20,icon:"☀︎"}, soir:{temp:27,precip:20,icon:"☀︎"}}}},
      {d:"LUN 14 SEPT", dates:["2026-09-14"], body:"08h30 — Réveil, petit-déjeuner tranquille. 09h00 — Départ de l'hôtel (bagages laissés en chambre, check-out pas encore fait). 09h40-10h20 — <b>Kinkaku-ji</b>. 10h35-11h05 — <b>Ryoan-ji</b>, jardin de pierres zen. 11h30-12h30 — <b>Nijo Castle</b> (château et jardins). Retour hôtel, check-out et récupération des bagages (12h50-13h10). Marche/métro vers la gare de Kyoto. 13h30-14h00 — Embarquement train <b>Kuroshio</b> vers Shirahama — acheter un eki-ben à la gare (grand choix, options identifiables faciles pour le kasher-friendly) à manger dans le train.", flag:"Train Kuroshio à réserver avant le voyage. Matinée plutôt dégagée — le risque de pluie monte l'après-midi, une fois dans le train.",
       weather:{desc:"Éclaircies le matin, risque de pluie l'après-midi", temp:"33°C / 24°C", emoji:"⛅︎", tempHigh:"33°", precip:"60%", parts:{matin:{temp:25,precip:20,icon:"☀︎"}, debutAprem:{temp:32,precip:50,icon:"🌧︎"}, finAprem:{temp:33,precip:60,icon:"🌧︎"}, soir:{temp:26,precip:40,icon:"⛅︎"}}}}
    ],
    hotelArea:"Minami-ku, près de Kyoto Station",
    names:[
      ["Kinkaku-ji","金閣寺","Pavillon d'or, temple emblématique"],
      ["Ryoan-ji","龍安寺","Jardin de pierres zen, référence du genre"],
      ["Nijo Castle","二条城","Château et jardins, ancienne résidence shogunale"],
      ["Kyoto Station","京都駅","Gare centrale, quartier de l'hôtel eph"],
    ],
  },
  {
    id:"shirahama", kanji:"白浜", name:"Shirahama",
    range:"Lun 14 → Mar 15 sept · 1 nuit",
    transport:"Train limited express Kuroshio depuis Kyoto (~3h)",
    vibe:"Rupture volontaire de rythme — plage Pacifique, aucune checklist.",
    days:[
      {d:"LUN 14 SOIR", dates:["2026-09-14"], body:"Plage, baignade, sunset, dîner. Éventuellement <b>Saki-no-Yu</b>, onsen face à l'océan.", flag:null,
       weather:{desc:"Ensoleillé toute la soirée", temp:"33°C / 25°C", emoji:"☀︎", tempHigh:"33°", precip:"10%", parts:{matin:{temp:26,precip:10,icon:"☀︎"}, debutAprem:{temp:32,precip:10,icon:"☀︎"}, finAprem:{temp:33,precip:10,icon:"☀︎"}, soir:{temp:27,precip:10,icon:"☀︎"}}}},
      {d:"MAR 15 SEPT", dates:["2026-09-15"], body:"Journée complète à Shirahama : plage, Sandanbeki, Toretore Ichiba. Vol du soir (18h25) vers Tokyo — choisi pour garder la journée pleine.", flag:"Matinée ensoleillée pour la plage — pluie plus probable l'après-midi, avant le vol du soir",
       weather:{desc:"Ensoleillé le matin, pluie l'après-midi", temp:"30°C / 25°C", emoji:"🌧︎", tempHigh:"30°", precip:"60%", parts:{matin:{temp:26,precip:25,icon:"⛅︎"}, debutAprem:{temp:29,precip:55,icon:"🌧︎"}, finAprem:{temp:30,precip:60,icon:"🌧︎"}, soir:{temp:26,precip:55,icon:"🌧︎"}}}}
    ],
    hotelArea:"Bord de mer",
    names:[
      ["Shirarahama Beach","白良浜","Plage de sable blanc"],
      ["Sandanbeki","三段壁","Falaises spectaculaires face au Pacifique"],
      ["Saki-no-Yu","崎の湯","Onsen en plein air face à l'océan"],
      ["Toretore Ichiba","とれとれ市場","Marché aux poissons géant"],
    ],
  },
  {
    id:"tokyo", kanji:"東京", name:"Tokyo",
    range:"Mar 15 → Sam 19 sept · 4 nuits",
    transport:"Vol depuis Shirahama (JAL)",
    vibe:"Shopping, vintage, Fuji flexible, mix ancien/moderne.",
    days:[
      {d:"MAR 15 SEPT", dates:["2026-09-15"], body:"Arrivée Haneda 19h40. <b>Nakano Broadway</b> (Pokémon, montres vintage) et Fujiya Camera si l'heure le permet.", flag:null,
       weather:{desc:"Belles éclaircies", temp:"30°C / 24°C", emoji:"⛅︎", tempHigh:"30°", precip:"20%", parts:{matin:{temp:25,precip:15,icon:"☀︎"}, debutAprem:{temp:29,precip:20,icon:"☀︎"}, finAprem:{temp:30,precip:20,icon:"☀︎"}, soir:{temp:25,precip:15,icon:"☀︎"}}}},
      {d:"MER 16 SEPT", dates:["2026-09-16"], body:"Jour flexible, décidé selon météo.<br>🗻 <b>Mont Fuji</b> — Kawaguchiko, Oishi Park.<br>🗼 <b>Tokyo contemporain</b> — Shibuya → Harajuku → Omotesando/Aoyama → Koenji.", flag:"Ciel qui se couvre en cours de journée — vue sur le Fuji plus incertaine l'après-midi",
       weather:{desc:"Nuageux, pluie possible en soirée", temp:"28°C / 24°C", emoji:"⛅︎", tempHigh:"28°", precip:"60%", parts:{matin:{temp:24,precip:25,icon:"⛅︎"}, debutAprem:{temp:27,precip:40,icon:"⛅︎"}, finAprem:{temp:28,precip:55,icon:"🌧︎"}, soir:{temp:25,precip:65,icon:"🌧︎"}}}},
      {d:"JEU 17 SEPT", dates:["2026-09-17"], body:"Jour flexible, décidé selon météo — l'autre des deux options du 16.<br>🗻 <b>Mont Fuji</b> — Kawaguchiko, Oishi Park.<br>🗼 <b>Tokyo contemporain</b> — Shibuya → Harajuku → Omotesando/Aoyama → Koenji.", flag:"Grosse pluie prévue (~59mm) — Fuji peu probable ce jour-là, privilégier les activités en intérieur/shopping",
       weather:{desc:"Pluvieux toute la journée", temp:"25°C / 21°C", emoji:"🌧︎", tempHigh:"25°", precip:"90%", conf:"E", parts:{matin:{temp:22,precip:80,icon:"🌧︎"}, debutAprem:{temp:24,precip:90,icon:"🌧︎"}, finAprem:{temp:25,precip:85,icon:"🌧︎"}, soir:{temp:22,precip:75,icon:"🌧︎"}}}},
      {d:"VEN 18 SEPT", dates:["2026-09-18"], body:"<b>Asakusa</b> / Senso-ji puis <b>Ueno / Ameyoko</b>. Fin des achats (montre, caméra, Pokémon).", flag:null,
       weather:{desc:"Nuageux, pluie en fin de journée", temp:"25°C / 20°C", emoji:"🌧︎", tempHigh:"25°", precip:"80%", conf:"E", parts:{matin:{temp:21,precip:40,icon:"⛅︎"}, debutAprem:{temp:24,precip:55,icon:"🌧︎"}, finAprem:{temp:25,precip:70,icon:"🌧︎"}, soir:{temp:21,precip:80,icon:"🌧︎"}}}},
      {d:"SAM 19 SEPT", dates:["2026-09-19"], body:"Fin de séjour, quartier de l'hôtel. Soir : vol Narita → Séoul.", flag:"Vol au départ de Narita, pas Haneda — prévoir 1h-1h30 de trajet",
       weather:{desc:"Pluie le matin, amélioration ensuite", temp:"26°C / 19°C", emoji:"🌧︎", tempHigh:"26°", precip:"80%", conf:"E", parts:{matin:{temp:20,precip:75,icon:"🌧︎"}, debutAprem:{temp:24,precip:60,icon:"🌧︎"}, finAprem:{temp:26,precip:45,icon:"⛅︎"}, soir:{temp:22,precip:35,icon:"⛅︎"}}}}
    ],
    hotelArea:"Minato-ku, Takanawa",
    names:[
      ["Nakano Broadway","中野ブロードウェイ","Galerie culte, figurines et montres vintage"],
      ["Shibuya","渋谷","Célèbre carrefour, quartier jeune et animé"],
      ["Koenji","高円寺","Quartier vintage et rétro, ambiance alternative"],
      ["Kawaguchiko","河口湖","Lac au pied du Mont Fuji"],
      ["Asakusa","浅草","Vieux Tokyo, temple Senso-ji"],
      ["Ueno / Ameyoko","上野・アメ横","Parc, musées, marché populaire animé"],
    ],
  },
  {
    id:"seoul", kanji:"서울", name:"Séoul",
    range:"Sam 19 → Dim 20 sept · 1 nuit",
    transport:"Vol depuis Tokyo (Narita, T'Way Air)",
    vibe:"Escale professionnelle avant le vol retour vers New York — prise en charge par l'entreprise.",
    days:[
      {d:"SAM 19 SEPT", dates:["2026-09-19"], body:"Vol Narita → Séoul (21h45→00h25+1). Installation au <b>Grand Mercure Ambassador Hotel and Residences Seoul Yongsan</b>.", flag:null,
       weather:{type:"unavailable"}},
      {d:"DIM 20 SEPT", dates:["2026-09-20"], body:"Check-out, puis vol Séoul → New York (10h00-11h00) — voyage professionnel, payé par l'entreprise.", flag:null,
       weather:{type:"unavailable"}}
    ],
    hotelArea:"Yongsan-gu",
    names:[],
  }
];

/* ============ BOOKINGS ============ */
function mapsUrl(addr){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr); }
function telUrl(phone){ return "tel:" + phone.replace(/[^0-9+]/g,""); }

const HOTELS = [
  { id:"sapporo", kanji:"札幌", name:"KOKO HOTEL Sapporo Ekimae", city:"Sapporo", stageId:"sapporo",
    checkinDate:"2026-09-06", checkoutDate:"2026-09-07",
    dateRange:"Dim 6 → Lun 7 sept", nights:"1 nuit",
    checkin:"6 sept, à partir de 15h00", checkout:"7 sept, avant 11h00",
    room:"Double Room with Small Double Bed — Non-Smoking",
    address:"060-0001, Sapporo, Chuo-ku, Kita 1-jo, Nishi 3-chome, 3-10", addressJP:"060-0001 札幌市中央区北1条西3丁目3-10", phone:"+81 11-261-3489",
    confirmation:"5815960773", pin:"6276", price:"¥10,619", priceAmount:10619, priceCurrency:"JPY" },
  { id:"asahikawa", kanji:"旭川", name:"HOTEL AMANEK Asahikawa", city:"Asahikawa", stageId:"asahikawa",
    checkinDate:"2026-09-07", checkoutDate:"2026-09-09",
    dateRange:"Lun 7 → Mer 9 sept", nights:"2 nuits",
    checkin:"7 sept (15h00-00h00)", checkout:"9 sept, avant 11h00",
    room:"Standard Twin Room",
    address:"070-0031, Asahikawa, 1 JoDori 8 Chome 218", addressJP:"070-0031 旭川市1条通8丁目218", phone:"+81 166-76-5430",
    confirmation:"6181799980", pin:"3493", price:"¥20,495", priceAmount:20495, priceCurrency:"JPY" },
  { id:"osaka-old", kanji:"大阪", name:"APA Hotel Namba Ekihigashi", city:"Osaka (Namba)", stageId:null,
    cancelled:true, cancelledNote:"Annulé gratuitement — Osaka n'est plus une étape (juste l'aéroport de passage).",
    checkinDate:"2026-09-09", checkoutDate:"2026-09-10",
    dateRange:"Mer 9 → Jeu 10 sept", nights:"1 nuit",
    checkin:"9 sept, à partir de 15h00", checkout:"10 sept, avant 10h00",
    room:"Single Room — Non-Smoking",
    address:"542-0075, Osaka, Chuo Ward, Namba Sennichimae 4-29", addressJP:"542-0075 大阪市中央区難波千日前4-29", phone:"+81 6-6630-8411",
    confirmation:"6965465308", pin:"5122", price:"¥9,090", priceAmount:9090, priceCurrency:"JPY" },
  { id:"kyoto-old", kanji:"京都", name:"Heian No Mori Kyoto", city:"Kyoto", stageId:null,
    cancelled:true, cancelledNote:"Annulé gratuitement, remboursement en cours — remplacé par eph Kyoto (2 séjours) autour de Rosh Hashana à Kobe.",
    checkinDate:"2026-09-10", checkoutDate:"2026-09-14",
    dateRange:"Jeu 10 → Lun 14 sept", nights:"4 nuits",
    checkin:"10 sept, à partir de 15h00", checkout:"14 sept, avant 11h00",
    room:"King Room",
    address:"Kyoto, Sakyo-ku Okazakihigashi Tenno-cho 51", addressJP:"606-8332 京都市左京区岡崎東天王町51", phone:"+81 75-761-3130",
    confirmation:"6870894039", pin:null, price:"¥44,736", priceAmount:44736, priceCurrency:"JPY",
    note:"Annulation gratuite jusqu'au 8 sept 23:59." },
  { id:"kyoto1", kanji:"京都", name:"eph KYOTO (1er séjour)", city:"Kyoto", stageId:"kyoto",
    checkinDate:"2026-09-09", checkoutDate:"2026-09-11",
    dateRange:"Mer 9 → Ven 11 sept", nights:"2 nuits",
    checkin:"9 sept", checkout:"11 sept",
    room:"Twin Room",
    address:"Minami-ku Higashikujo Nishisanno-cho 5-6, Kyoto", addressJP:"", phone:"+81 75-693-8898",
    confirmation:"6233804471", pin:null, price:"¥21,456", priceAmount:21456, priceCurrency:"JPY",
    note:"Payé." },
  { id:"kobe", kanji:"神戸", name:"Four Points Flex by Sheraton Kobe Sannomiya", city:"Kobe", stageId:"kobe",
    checkinDate:"2026-09-11", checkoutDate:"2026-09-13",
    dateRange:"Ven 11 → Dim 13 sept", nights:"2 nuits",
    checkin:"11 sept", checkout:"13 sept",
    room:"Single Room — Non-Smoking",
    address:"1-9 Nunobikicho, Chuo-ku, Kobe, Hyogo", addressJP:"", phone:"+81 78-230-0381",
    confirmation:"5318831129", pin:null, price:"¥50,908", priceAmount:50908, priceCurrency:"JPY",
    note:"Annulation gratuite jusqu'au 8 sept 23:59, sinon ¥19,580." },
  { id:"kyoto2", kanji:"京都", name:"eph KYOTO (2e séjour)", city:"Kyoto", stageId:"kyoto2",
    checkinDate:"2026-09-13", checkoutDate:"2026-09-14",
    dateRange:"Dim 13 → Lun 14 sept", nights:"1 nuit",
    checkin:"13 sept", checkout:"14 sept",
    room:"Twin Room",
    address:"Minami-ku Higashikujo Nishisanno-cho 5-6, Kyoto", addressJP:"", phone:"+81 75-693-8898",
    confirmation:"5803122737", pin:null, price:"$79.88", priceAmount:79.88, priceCurrency:"USD",
    note:"Payé, non remboursable." },
  { id:"shirahama", kanji:"白浜", name:"Guest Living Mu Nanki Shirahama", city:"Shirahama", stageId:"shirahama",
    checkinDate:"2026-09-14", checkoutDate:"2026-09-15",
    dateRange:"Lun 14 → Mar 15 sept", nights:"1 nuit",
    checkin:"14 sept (16h00-20h00)", checkout:"15 sept (7h00-10h00)",
    room:"Apartment with Sea View",
    address:"Wakayama, Shirahama, Mishimurogun Shirahama-cho 3076-1", addressJP:"649-2200 和歌山県西牟婁郡白浜町字浜通り3076-1", phone:"+81 739-34-2466",
    confirmation:"6307857280", pin:"0501", price:"≈ $66 / ¥10,505", priceAmount:10505, priceCurrency:"JPY",
    note:"Annulation gratuite jusqu'au 6 sept 23:59." },
  { id:"tokyo", kanji:"東京", name:"APA Hotel Shinagawa Sengakuji Ekimae", city:"Tokyo", stageId:"tokyo",
    checkinDate:"2026-09-15", checkoutDate:"2026-09-19",
    dateRange:"Mar 15 → Sam 19 sept", nights:"4 nuits",
    checkin:"15 sept, à partir de 15h00", checkout:"19 sept, avant 10h00",
    room:"Single Room — Non-Smoking (petit-déj inclus)",
    address:"Tokyo, Minato-ku, Takanawa 2-16-30", addressJP:"108-0074 港区高輪2-16-30", phone:"+81 3-5475-6801",
    confirmation:"5015398345", pin:null, price:"¥72,270", priceAmount:72270, priceCurrency:"JPY",
    note:"Annulation gratuite jusqu'au 13 sept 23:59." },
  { id:"seoul", kanji:"서울", name:"Grand Mercure Ambassador Hotel and Residences Seoul Yongsan", city:"Seoul", stageId:"seoul",
    checkinDate:"2026-09-19", checkoutDate:"2026-09-20",
    dateRange:"Sam 19 → Dim 20 sept", nights:"1 nuit",
    checkin:"19 sept, à partir de 15h00", checkout:"20 sept, avant 11h00",
    room:"Junior Suite, 1 King Bed",
    address:"95, Cheongpa-ro 20-gil, Yongsan-gu, Seoul, Republic of Korea", addressJP:"", phone:"+82 2-2223-7000",
    confirmation:"9470AII0570", pin:null, price:"Payé par Palantir", priceAmount:0, priceCurrency:"USD", countsTowardBudget:false,
    note:"Réservé via Navan (ID LKFCDF) — voyage professionnel, payé par l'entreprise." },
];

const FLIGHTS = [
  { id:"fl-1", kanji:"✈", date:"2026-09-06", route:"Séoul → Sapporo", dateLabel:"Dim 6 sept",
    segs:[{code1:"ICN",code2:"CTS",t1:"12:15",t2:"15:00",flightNo:"Jeju Air 7C1503",dur:"2h45"}],
    passenger:"Tom Cohen", confirmation:"NFVF7N", price:"part de $488.97", priceAmount:488.97, priceCurrency:"USD" },
  { id:"fl-2", kanji:"✈", date:"2026-09-09", route:"Asahikawa → Tokyo → Osaka", dateLabel:"Mer 9 sept",
    segs:[
      {code1:"AKJ",code2:"HND",t1:"13:40",t2:"15:25",flightNo:"JAL554",dur:"1h45"},
      {code1:"HND",code2:"ITM",t1:"16:30",t2:"17:35",flightNo:"JAL127",dur:"1h05"}
    ],
    passenger:"Cohen Tom (28)", confirmation:"DXF6ZO", ticket:"1312265194971", price:"part de $488.97 (avec le vol Séoul→Sapporo)",
    priceAmount:0, priceCurrency:"USD", countsTowardBudget:false,
    note:"Correspondance à Haneda : 1h05 de transit, changement d'avion." },
  { id:"fl-3", kanji:"✈", date:"2026-09-15", route:"Shirahama → Tokyo", dateLabel:"Mar 15 sept",
    segs:[{code1:"SHM",code2:"HND",t1:"18:25",t2:"19:40",flightNo:"JAL218",dur:"1h15"}],
    passenger:"Tom William Chalom Cohen", confirmation:"—", price:"$144.00", priceAmount:144.00, priceCurrency:"USD" },
  { id:"fl-4", kanji:"✈", date:"2026-09-19", route:"Tokyo → Séoul", dateLabel:"Sam 19 sept",
    segs:[{code1:"NRT",code2:"ICN",t1:"21:45",t2:"00:25",flightNo:"T'Way Air TW248",dur:"2h40"}],
    passenger:"Tom William Chalom Cohen", confirmation:"—", price:"$323.70", priceAmount:323.70, priceCurrency:"USD",
    note:"⚠ Départ de Narita, pas Haneda — compter 1h-1h30 depuis l'hôtel de Minato-ku." },
  { id:"fl-5", kanji:"✈", date:"2026-09-20", route:"Séoul → New York", dateLabel:"Dim 20 sept",
    priceAmount:0, priceCurrency:"USD", countsTowardBudget:false,
    segs:[{code1:"ICN",code2:"JFK",t1:"10:00",t2:"11:00",flightNo:"Korean Air KE081",dur:"14h00"}],
    passenger:"Tom Cohen", confirmation:"FUICI9", price:"payé par l'entreprise (Navan)",
    note:"Voyage professionnel — aucun coût personnel." },
];

const TRAINS = [
  { id:"tr-1", kind:"train", kanji:"🚃", date:"2026-09-07", route:"Sapporo → Asahikawa", dateLabel:"Lun 7 sept",
    depStation:"SAPPORO", arrStation:"ASAHIKAWA", depTime:"08:00", arrTime:"09:25",
    name:"Lilac 5", seat:"Voiture 2, siège 8-A",
    passenger:"Tom Cohen", confirmation:"E55709", pickupCode:"20242482804521218",
    price:"¥2,360", priceAmount:2360, priceCurrency:"JPY",
    note:"Billet à retirer avant le voyage via le QR code ou le code de retrait." },
]; // trains/bus ajoutés en cours de route → js/storage.js (getUserTransport)

/* ============ EXPERIENCES — ateliers/activités réservés à l'avance (payants, confirmés) ============ */
const EXPERIENCES = [
  { id:"exp-1", kanji:"織", date:"2026-09-10", stageId:"kyoto",
    title:"Tissage Nishiki — KOHO TATSUMURA",
    time:"15h30 – 17h30",
    address:"25 Shichiku Shimonokishicho, Kita-ku, Kyoto",
    addressJP:"",
    confirmation:"113LB2WA4", authKey:"tYOtg7",
    passenger:"Tom Cohen",
    price:"", priceAmount:0, priceCurrency:"JPY", countsTowardBudget:false,
    note:"Expérience de tissage Nishiki-ori (綾織り) + visite de l'atelier, ~2h au total. Prix non communiqué par email — ajoute-le via le ✎ une fois connu." },
];

/* ============ BUDGET (fixed exchange constants — edit by hand if needed) ============ */
const JPY_PER_USD = 160;
const KRW_PER_USD = 1350;
const BUDGET_TARGET = 3500;
const FOOD_DAILY_TARGET = 35;         // USD — cible repas/jour, sur les jours où il y a des dépenses repas
const TRANSPORT_DAILY_TARGET = 20;   // USD — cible transport/jour, sur les jours où il y a des dépenses transport
const DAILY_TOTAL_ALERT = 70;        // USD — au-delà, la journée est signalée en rouge dans "Par jour"

/* ============ PHRASES ============ */
const PHRASE_CATEGORY_LABELS = {
  cacherout: "Cacherout",
  shabbat: "Chabbat",
  pratique: "Pratique",
  politesse: "Politesse",
};
const PHRASES = [
  /* ---- cacherout : une question large pour limiter les allers-retours ---- */
  { id:"ph-kosher-1", category:"cacherout",
    jp:"この料理に肉、鶏肉、エビやカニなどの甲殻類、貝類、またはワインは入っていますか？",
    romaji:"Kono ryōri ni niku, toriniku, ebi ya kani nado no kōkakurui, kairui, matawa wain wa haitte imasu ka?",
    fr:"Ce plat contient-il de la viande, du poulet, des crustacés (crevette, crabe), des coquillages, ou du vin ?" },
  { id:"ph-kosher-2", category:"cacherout",
    jp:"だし汁は魚からできていますか？",
    romaji:"Dashijiru wa sakana kara dekite imasu ka?",
    fr:"Le bouillon (dashi) est-il à base de poisson ?" },
  { id:"ph-kosher-3", category:"cacherout",
    jp:"うろことひれがある魚を使った料理はどれですか？",
    romaji:"Uroko to hire ga aru sakana o tsukatta ryōri wa dore desu ka?",
    fr:"Quel plat utilise un poisson avec des écailles et des nageoires ?" },
  { id:"ph-kosher-4", category:"cacherout",
    jp:"野菜だけの料理はありますか？",
    romaji:"Yasai dake no ryōri wa arimasu ka?",
    fr:"Avez-vous un plat uniquement à base de légumes ?" },

  /* ---- shabbat ---- */
  { id:"ph-shabbat-1", category:"shabbat",
    jp:"私はユダヤ教徒で、土曜日は宗教上の安息日（シャバット）にあたります。日没から翌日の日没まで、電気のスイッチ、電話、エレベーターのボタンなどを使うことができません。ご理解いただけますと幸いです。",
    romaji:"Watashi wa yudaya-kyōto de, doyōbi wa shūkyōjō no ansokubi (shabatto) ni atarimasu. Nichibotsu kara yokujitsu no nichibotsu made, denki no suicchi, denwa, erebētā no botan nado o tsukau koto ga dekimasen. Gorikai itadakemasu to saiwai desu.",
    fr:"Je suis juif pratiquant, et le samedi correspond à mon jour de repos religieux (Chabbat). Du coucher du soleil au coucher du soleil suivant, je ne peux pas utiliser d'interrupteurs électriques, le téléphone, ni les boutons d'ascenseur. Merci de votre compréhension." },
  { id:"ph-shabbat-2", category:"shabbat",
    jp:"土曜日は自分の部屋のドアを開けることができません。開けるのを手伝っていただけますか？",
    romaji:"Doyōbi wa jibun no heya no doa o akeru koto ga dekimasen. Akeru no o tetsudatte itadakemasu ka?",
    fr:"Le samedi, je ne peux pas ouvrir la porte de ma chambre moi-même. Pourriez-vous m'aider à l'ouvrir ?" },
  { id:"ph-shabbat-3", category:"shabbat",
    jp:"土曜日はカードキーが使えません。カードなしで階段を使って部屋を出入りできますか？",
    romaji:"Doyōbi wa kādokī ga tsukaemasen. Kādo nashi de kaidan o tsukatte heya o deiri dekimasu ka?",
    fr:"Le samedi, je ne peux pas utiliser de carte magnétique. Puis-je utiliser l'escalier pour entrer et sortir de ma chambre sans carte ?" },
  { id:"ph-shabbat-4", category:"shabbat",
    jp:"土曜日の朝、電話を使わずに、部屋のドアをノックして起こしていただけますか？時間を相談させてください。",
    romaji:"Doyōbi no asa, denwa o tsukawazu ni, heya no doa o nokku shite okoshite itadakemasu ka? Jikan o sōdan sasete kudasai.",
    fr:"Pourriez-vous me réveiller samedi matin en frappant à la porte de ma chambre, sans utiliser le téléphone ? J'aimerais convenir de l'heure avec vous." },

  /* ---- pratique ---- */
  { id:"ph-pratique-1", category:"pratique",
    jp:"朝食は付いていますか？付いていない場合、いくらですか？",
    romaji:"Chōshoku wa tsuite imasu ka? Tsuite inai baai, ikura desu ka?",
    fr:"Le petit-déjeuner est-il inclus ? Sinon, combien coûte-t-il ?" },

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
    { id:"act-sap-1", title:"Chitosetsuru Sake Museum", desc:"Petit musée de saké avec dégustation sur place", duration:"~45 min", price:"gratuit / variable", reservation:false, mapsQuery:"Chitosetsuru Sake Museum Sapporo" },
    { id:"act-sap-2", title:"Soup curry végétarien", desc:"Curry-soupe épicé, spécialité de Sapporo", duration:"repas", price:"¥1200-1800", reservation:false, mapsQuery:"", note:"Spécialité de Sapporo — demander une version sans viande." },
  ],
  asahikawa:[
    { id:"act-biei-1", title:"Biei — vélo électrique guidé", desc:"Balade guidée à vélo électrique dans la campagne de Biei", duration:"~3h", price:"¥6000-8000", reservation:true, mapsQuery:"Biei Patchwork Road" },
    { id:"act-biei-2", title:"AgriWalk (terres agricoles)", desc:"Marche commentée sur des terres agricoles habituellement fermées au public", duration:"~2h", price:"¥3000-5000", reservation:true, mapsQuery:"Biei" },
    { id:"act-biei-3", title:"Récolte de pommes de terre", desc:"Cueillette de pommes de terre dans une ferme locale", duration:"~1h30", price:"¥2000-3000", reservation:true, mapsQuery:"Biei potato digging" },
  ],
  kyoto:[
    { id:"act-kyo-1", title:"Senchadō (voie du thé)", desc:"Cérémonie du thé vert en petit groupe", duration:"~1h30", price:"¥3000-5000", reservation:true, mapsQuery:"" },
    { id:"act-kyo-2", title:"Atelier artisanal (ustensile à tofu, yuzen…)", desc:"Initiation à un artisanat traditionnel de Kyoto (tissage, teinture…)", duration:"~1h-2h", price:"¥3000-6000", reservation:true, mapsQuery:"" },
    { id:"act-kyo-3", title:"Yudofu (tofu chaud)", desc:"Tofu chaud mijoté, plat simple emblématique de Kyoto", duration:"repas", price:"¥2000-4000", reservation:false, mapsQuery:"" },
    { id:"act-kyo-4", title:"Wagashi + thé matcha", desc:"Pâtisseries traditionnelles servies avec thé matcha", duration:"~45 min", price:"¥800-1500", reservation:false, mapsQuery:"" },
  ],
  shirahama:[
    { id:"act-shi-1", title:"Toretore Market", desc:"Marché aux poissons, produits frais de Wakayama", duration:"~1h-2h", price:"variable", reservation:false, mapsQuery:"Toretore Market Shirahama" },
    { id:"act-shi-2", title:"Saki-no-Yu (onsen face à l'océan)", desc:"Bain thermal en plein air, vue directe sur l'océan", duration:"~1h", price:"¥500-800", reservation:false, mapsQuery:"Saki-no-Yu Shirahama" },
    { id:"act-shi-3", title:"Poisson grillé + umeboshi (Wakayama)", desc:"Poisson choisi au marché puis grillé sur place, prunes salées locales", duration:"repas", price:"variable", reservation:false, mapsQuery:"", note:"Acheter un poisson identifiable au marché, le faire griller sur place." },
    { id:"act-shi-4", title:"Asamoto Indigo Workshop & Factory (藍の里 あさもと工房)", desc:"Atelier de teinture indigo (aizome), à Hiki dans la municipalité de Shirahama", duration:"variable", price:"variable", reservation:true, mapsQuery:"あさもと工房 Hiki Shirahama" },
  ],
  tokyo:[
    { id:"act-tok-1", title:"Ozu Washi (fabriquer son papier japonais)", desc:"Fabrique ta propre feuille de papier japonais traditionnel", duration:"~45 min", price:"¥1500-2500", reservation:true, mapsQuery:"Ozu Washi Tokyo" },
    { id:"act-tok-2", title:"Teinture Edo (Some no Sato Ochiai)", desc:"Atelier de teinture textile traditionnelle d'Edo", duration:"~2h", price:"¥4000-6000", reservation:true, mapsQuery:"Some no Sato Ochiai" },
    { id:"act-tok-3", title:"Sento local (bain public)", desc:"Bain public de quartier, expérience du quotidien japonais", duration:"~1h", price:"¥500", reservation:false, mapsQuery:"" },
    { id:"act-tok-4", title:"Sushi sérieux, nigiri à la pièce", desc:"Nigiri à la pièce, poisson choisi au comptoir", duration:"repas", price:"¥3000-8000", reservation:false, mapsQuery:"" },
    { id:"act-tok-5", title:"Vegan ramen / monjayaki végétarien", desc:"Ramen sans bouillon animal ou version végétarienne du monjayaki", duration:"repas", price:"¥1000-1800", reservation:false, mapsQuery:"" },
  ],
};
