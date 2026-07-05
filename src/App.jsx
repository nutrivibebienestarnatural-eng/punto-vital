import { useState, useRef, useMemo } from "react";

const WHATSAPP = "5493541000000"; // ← reemplazá con tu número
const ADMIN_PASS = "puntovital2024";

const PRODUCTS = [
  {id:1,name:"Aceite Esencial De Cúrcuma (30ml)",price:16500,cost:11785.71,desc:"Aceite esencial puro de cúrcuma. Uso tópico y aromático.",cat:"Aceites Esenciales",barcode:"0714604143901",img:""},
  {id:2,name:"Aceite Esencial De Orégano (30ml)",price:16500,cost:11785.71,desc:"Aceite esencial de orégano, propiedades antimicrobianas.",cat:"Aceites Esenciales",barcode:"0714604143871",img:""},
  {id:3,name:"Aceite Esencial De Romero Capilar (30ml)",price:16000,cost:11428.57,desc:"Estimula el cuero cabelludo y fortalece el cabello.",cat:"Aceites Esenciales",barcode:"0714604143888",img:""},
  {id:4,name:"Aceite Esencial De Tomillo Tonificante (30ml)",price:16500,cost:11785.71,desc:"Tonificante natural. Aceite esencial puro de tomillo.",cat:"Aceites Esenciales",barcode:"0714604213192",img:""},
  {id:5,name:"Aceite Esencial De Urucum (30ml)",price:16000,cost:11428.57,desc:"Aceite de urucum con propiedades antioxidantes.",cat:"Aceites Esenciales",barcode:"0714604143895",img:""},
  {id:6,name:"Ácido Alfa Lipoico 500mg (60 caps)",price:41701,cost:29786.46,desc:"Potente antioxidante universal. Protege células.",cat:"Antioxidantes",barcode:"0714604143789",img:""},
  {id:7,name:"Ácido Fólico (60 caps)",price:18829,cost:13449.04,desc:"Vitamina B9 esencial. Embarazo, sistema nervioso.",cat:"Vitaminas",barcode:"0714604142911",img:""},
  {id:8,name:"Ácido Hialurónico (60 caps)",price:22620,cost:16156.90,desc:"Hidratación profunda de piel y articulaciones.",cat:"Antiage & Piel",barcode:"0714604142928",img:""},
  {id:9,name:"Adrelax - Cortisol Support (60 caps)",price:29700,cost:21214.29,desc:"Soporte suprarrenal. Control del cortisol y estrés.",cat:"Estrés & Sueño",barcode:"0714604142935",img:""},
  {id:10,name:"Adrelax - Cortisol Support (60 comp)",price:27500,cost:19642.86,desc:"Soporte suprarrenal. Control del cortisol y estrés.",cat:"Estrés & Sueño",barcode:"0714604213345",img:""},
  {id:11,name:"AKG - Ácido Alfa Ketoglutárico (60 caps)",price:38500,cost:27500,desc:"Longevidad celular. Metabolismo energético avanzado.",cat:"Longevidad",barcode:"0714604142942",img:""},
  {id:12,name:"Ashwagandha 100% Pura (60 caps)",price:31465,cost:22475.24,desc:"Adaptógeno para estrés, insomnio y fatiga crónica.",cat:"Estrés & Sueño",barcode:"0714604213215",img:""},
  {id:13,name:"Astaxantina 12mg (30 caps)",price:38500,cost:27500,desc:"Superantioxidante. Piel, ojos y articulaciones.",cat:"Antioxidantes",barcode:"0714604143734",img:""},
  {id:14,name:"Astaxantina 4mg",price:27900,cost:19928.57,desc:"Antioxidante carotenóide. Piel, ojos, articulaciones.",cat:"Antioxidantes",barcode:"0714604143864",img:""},
  {id:17,name:"BCAA Aminoácidos Esenciales 600mg (90 caps)",price:16500,cost:11785.71,desc:"Masa muscular y recuperación.",cat:"Deportivo",barcode:"0714604142966",img:""},
  {id:18,name:"Betacaroteno (60 caps)",price:15900,cost:11357.14,desc:"Provitamina A. Bronceado, piel y sistema inmune.",cat:"Vitaminas",barcode:"0714604142973",img:""},
  {id:19,name:"Bio F - Hongo Cándida (60 caps)",price:20092,cost:14351.66,desc:"Fórmula antifúngica natural. Control de cándida.",cat:"Salud Intestinal",barcode:"0714604142980",img:""},
  {id:20,name:"Bisglicinato de Magnesio 500mg (60 caps)",price:17900,cost:12785.71,desc:"Magnesio de alta absorción. Relajación muscular.",cat:"Magnesio",barcode:"0714604142997",img:""},
  {id:21,name:"Bisglicinato de Magnesio (60 comp)",price:17089,cost:12206.25,desc:"Magnesio quelatado. Sueño, músculos y nervios.",cat:"Magnesio",barcode:"0714604213390",img:""},
  {id:22,name:"Blockcarbs (60 caps)",price:16301,cost:11643.80,desc:"Bloqueador de carbohidratos. Control de peso.",cat:"Control de Peso",barcode:"0714604143000",img:""},
  {id:23,name:"Cafeína + Guaraná (60 caps)",price:14990,cost:10707.14,desc:"Concentración y energía natural sin nerviosismo.",cat:"Deportivo",barcode:"0714604213338",img:""},
  {id:24,name:"C Stop - Cándida Balance (60 caps)",price:27500,cost:19642.86,desc:"Balance de flora intestinal. Control de cándida.",cat:"Salud Intestinal",barcode:"0714604143017",img:""},
  {id:27,name:"Centella Asiática (30 caps)",price:16695,cost:11925,desc:"Cicatrizante y anticelulitico natural.",cat:"Antiage & Piel",barcode:"0714604213574",img:""},
  {id:28,name:"Citrato de Magnesio 400mg (60 caps)",price:16500,cost:11785.71,desc:"Relajante muscular y nervioso. Alta biodisponibilidad.",cat:"Magnesio",barcode:"0714604143062",img:""},
  {id:29,name:"Citrato de Magnesio 400mg (60 comp)",price:15656,cost:11182.50,desc:"Relajante muscular y nervioso.",cat:"Magnesio",barcode:"0714604213420",img:""},
  {id:30,name:"Citrato de Potasio 400mg (60 caps)",price:16500,cost:11785.71,desc:"Equilibrio electrolítico. Corazón y músculos.",cat:"Minerales",barcode:"0714604143093",img:""},
  {id:31,name:"Coenzima Q10 300mg (60 caps)",price:41575,cost:29696.19,desc:"Energía celular y antioxidante cardioprotector.",cat:"Antioxidantes",barcode:"0714604143857",img:""},
  {id:32,name:"Colagenol (60 caps)",price:18323,cost:13087.99,desc:"Colágeno hidrolizado para piel, pelo y uñas.",cat:"Antiage & Piel",barcode:"0714604143109",img:""},
  {id:33,name:"Colagenol Antiage (300 gr)",price:25147,cost:17962.14,desc:"Colágeno en polvo con formulación antiage.",cat:"Antiage & Piel",barcode:"0714604143116",img:""},
  {id:34,name:"Complex B - Complejo B (30 caps)",price:16500,cost:11785.71,desc:"Todas las vitaminas del grupo B en una sola fórmula.",cat:"Vitaminas",barcode:"0714604213239",img:""},
  {id:35,name:"Creatina Pura 100% (100 gr)",price:15038,cost:10741.18,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604143123",img:""},
  {id:36,name:"Creatina Pura 100% (200 gr)",price:27169,cost:19406.33,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604143130",img:""},
  {id:37,name:"Creatina Pura 100% (50 gr)",price:8719,cost:6228.08,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604143147",img:""},
  {id:38,name:"Creatina Pura 100% (300 gr)",price:36750,cost:26250,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604213444",img:""},
  {id:40,name:"Cúrcuma Activada con Jengibre (60 caps)",price:17565,cost:12546.42,desc:"Antiinflamatorio natural potenciado con jengibre.",cat:"Antiinflamatorio",barcode:"0714604143161",img:""},
  {id:41,name:"Cúrcuma Orgánica (60 caps)",price:16500,cost:11785.71,desc:"Cúrcuma 100% orgánica. Antiinflamatorio y antioxidante.",cat:"Antiinflamatorio",barcode:"0714604143178",img:""},
  {id:44,name:"Elixir Bio-Regenerador (60 caps)",price:19587,cost:13990.61,desc:"Regeneración celular integral. Fórmula completa.",cat:"Longevidad",barcode:"0714604143192",img:""},
  {id:46,name:"Fucus Plus (60 caps)",price:16500,cost:11785.71,desc:"Alga marina. Control de peso y función tiroidea.",cat:"Control de Peso",barcode:"0714604213628",img:""},
  {id:48,name:"Garcinia Cambogia (60 caps)",price:16500,cost:11785.71,desc:"Quemador de grasas natural. Saciedad y control de peso.",cat:"Control de Peso",barcode:"0714604213321",img:""},
  {id:49,name:"Ginkgo Biloba (60 caps)",price:15960,cost:11400,desc:"Mejora memoria, concentración y circulación cerebral.",cat:"Neurológico",barcode:"0714604213611",img:""},
  {id:50,name:"Glicinato de Magnesio 500mg (60 caps)",price:17565,cost:12546.42,desc:"Magnesio quelatado para sueño y relajación profunda.",cat:"Magnesio",barcode:"0714604143222",img:""},
  {id:51,name:"Glicinato de Magnesio (60 comp)",price:15986,cost:11418.75,desc:"Magnesio quelatado para sueño y relajación.",cat:"Magnesio",barcode:"0714604213406",img:""},
  {id:52,name:"Gluconato de Zinc (60 caps)",price:16500,cost:11785.71,desc:"Zinc para sistema inmune, piel y fertilidad.",cat:"Minerales",barcode:"0714604213222",img:""},
  {id:53,name:"Glutatión Antioxidante (60 caps)",price:30202,cost:21572.62,desc:"Rey de los antioxidantes. Detox hepático y celular.",cat:"Antioxidantes",barcode:"0714604143239",img:""},
  {id:54,name:"Glutatión Antioxidante (60 comp)",price:28340,cost:20242.50,desc:"Rey de los antioxidantes. Detox hepático y celular.",cat:"Antioxidantes",barcode:"0714604213550",img:""},
  {id:56,name:"Hipertiroidal (60 caps)",price:26537,cost:18955.02,desc:"Soporte natural para tiroides hiperactiva.",cat:"Tiroides",barcode:"0714604213307",img:""},
  {id:57,name:"Hipotiroidal (60 caps)",price:26537,cost:18955.02,desc:"Soporte natural para tiroides hipoactiva.",cat:"Tiroides",barcode:"0714604213291",img:""},
  {id:58,name:"Hongos Adaptógenos (60 caps)",price:27674,cost:19767.38,desc:"Blend de hongos medicinales adaptógenos.",cat:"Estrés & Sueño",barcode:"0714604143253",img:""},
  {id:59,name:"INOSITOL - Vitamina B8 (30 caps)",price:17060,cost:12185.37,desc:"Equilibrio hormonal. SOP, ansiedad y metabolismo.",cat:"Hormonal",barcode:"0714604143260",img:""},
  {id:61,name:"Kardio 3 (60 caps)",price:18829,cost:13449.04,desc:"Soporte cardiovascular con Omega 3 y CoQ10.",cat:"Cardiovascular",barcode:"0714604143284",img:""},
  {id:68,name:"Lady Balance (60 caps)",price:20092,cost:14351.66,desc:"Equilibrio hormonal femenino. PMS y menopausia.",cat:"Hormonal",barcode:"0714604143307",img:""},
  {id:71,name:"Levadura de Selenio (60 caps)",price:18829,cost:13449.04,desc:"Selenio orgánico. Antioxidante y función tiroidea.",cat:"Minerales",barcode:"0714604143345",img:""},
  {id:72,name:"L-Glicina (60 caps)",price:16695,cost:11925,desc:"Aminoácido esencial para colágeno y proteínas.",cat:"Antiage & Piel",barcode:"0714604213475",img:""},
  {id:73,name:"L-Glutamina (60 caps)",price:15796,cost:11282.75,desc:"Recuperación muscular y salud intestinal.",cat:"Deportivo",barcode:"0714604143352",img:""},
  {id:74,name:"L-Lisina 500mg (60 caps)",price:16500,cost:11785.71,desc:"Aminoácido esencial. Colágeno y sistema inmune.",cat:"Antiage & Piel",barcode:"0714604143369",img:""},
  {id:75,name:"Maca Peruana Pura 500mg (60 caps)",price:18600,cost:13285.71,desc:"Energizante y estimulante natural. Libido y vitalidad.",cat:"Hormonal",barcode:"0714604213253",img:""},
  {id:77,name:"Magnesio Quelatado 400mg (60 caps)",price:16301,cost:11643.80,desc:"Magnesio quelatado de alta absorción.",cat:"Magnesio",barcode:"0714604143383",img:""},
  {id:78,name:"Maitake Hongo (60 caps)",price:26775,cost:19125,desc:"Hongo medicinal. Estrés e inmunidad.",cat:"Hongos Medicinales",barcode:"0714604213604",img:""},
  {id:79,name:"Malato de Magnesio 500mg (60 caps)",price:17565,cost:12546.42,desc:"Energía y recuperación muscular.",cat:"Magnesio",barcode:"0714604213277",img:""},
  {id:80,name:"Malato de Magnesio (60 comp)",price:15986,cost:11418.75,desc:"Energía y recuperación muscular.",cat:"Magnesio",barcode:"0714604213383",img:""},
  {id:81,name:"Mega D - Hongo Cándida (60 caps)",price:20092,cost:14351.66,desc:"Detox profundo. Control de cándida y hongos.",cat:"Salud Intestinal",barcode:"0714604143390",img:""},
  {id:82,name:"Melaton 500mg (30 caps)",price:18300,cost:13071.43,desc:"Conciliador de sueño natural. Regulación circadiana.",cat:"Estrés & Sueño",barcode:"0714604143406",img:""},
  {id:83,name:"Melena de León 500mg (60 caps)",price:30700,cost:21928.57,desc:"Hongo neuroprotector. Cognición y digestión.",cat:"Hongos Medicinales",barcode:"0714604213260",img:""},
  {id:84,name:"MSM 500mg (60 caps)",price:18600,cost:13285.71,desc:"Azufre orgánico. Articulaciones y piel.",cat:"Antiinflamatorio",barcode:"0714604143413",img:""},
  {id:85,name:"Moringa (60 caps)",price:16000,cost:11428.57,desc:"Superalimento. Calcio vegetal y antioxidantes.",cat:"Superfoods",barcode:"0714604213536",img:""},
  {id:87,name:"Multi Magnesio 5 en 1 (60 caps)",price:20092,cost:14351.66,desc:"5 formas de magnesio en una sola cápsula.",cat:"Magnesio",barcode:"0714604143758",img:""},
  {id:88,name:"Multi Magnesio 5 en 1 (60 comp)",price:18632,cost:13308.75,desc:"5 formas de magnesio en un solo comprimido.",cat:"Magnesio",barcode:"0714604213451",img:""},
  {id:89,name:"NAC 500mg (60 caps)",price:25147,cost:17962.14,desc:"N-Acetilcisteína. Optimizador respiratorio y antioxidante.",cat:"Antioxidantes",barcode:"0714604143437",img:""},
  {id:90,name:"NAD - Longevidad (60 caps)",price:40200,cost:28714.29,desc:"Nicotinamida Adenina Dinucleótido. Energía celular.",cat:"Longevidad",barcode:"0714604143444",img:""},
  {id:91,name:"NAD - Longevidad (60 comp)",price:37900,cost:27071.43,desc:"Nicotinamida Adenina Dinucleótido. Energía celular.",cat:"Longevidad",barcode:"0714604213499",img:""},
  {id:93,name:"NAD con Resveratrol 2 en 1 (60 caps)",price:48900,cost:34928.57,desc:"Regenerador celular premium. Longevidad máxima.",cat:"Longevidad",barcode:"0714604213314",img:""},
  {id:95,name:"NMN (60 caps)",price:40600,cost:29000,desc:"Precursor NAD+. El suplemento de longevidad más avanzado.",cat:"Longevidad",barcode:"0714604143833",img:""},
  {id:96,name:"NMN (60 comp)",price:38500,cost:27500,desc:"Precursor NAD+. Longevidad celular avanzada.",cat:"Longevidad",barcode:"0714604213505",img:""},
  {id:97,name:"Omega 3 (60 caps)",price:27500,cost:19642.86,desc:"Ácidos grasos esenciales EPA y DHA. Corazón y cerebro.",cat:"Cardiovascular",barcode:"0714604143468",img:""},
  {id:99,name:"ORMUX - Regenerador Celular (60 caps)",price:41069,cost:29335.15,desc:"Suplemento regenerador celular de alta gama.",cat:"Longevidad",barcode:"0714604143482",img:""},
  {id:102,name:"Óxido Nítrico (60 caps)",price:18829,cost:13449.04,desc:"Vasodilatador natural. Rendimiento y flujo sanguíneo.",cat:"Deportivo",barcode:"0714604143512",img:""},
  {id:103,name:"Picolinato de Cromo 250mcg",price:24642,cost:17601.09,desc:"Control glucémico y de peso. Regula el apetito.",cat:"Control de Peso",barcode:"0714604143826",img:""},
  {id:105,name:"Potasio + Magnesio 500mg (60 caps)",price:19200,cost:13714.29,desc:"Electrolitos esenciales para corazón y músculos.",cat:"Minerales",barcode:"0714604213246",img:""},
  {id:106,name:"Prebiótico+ (60 caps)",price:24000,cost:17142.86,desc:"Prebióticos avanzados para microbiota saludable.",cat:"Salud Intestinal",barcode:"0714604213581",img:""},
  {id:108,name:"Reishi Hongo (60 caps)",price:27400,cost:19571.43,desc:"Hongo rey. Inmunidad, estrés y vitalidad.",cat:"Hongos Medicinales",barcode:"0714604213598",img:""},
  {id:109,name:"Resveratrol Antioxidante (60 caps)",price:24700,cost:17642.86,desc:"Rejuvenecedor celular. Antioxidante de vid.",cat:"Antioxidantes",barcode:"0714604143536",img:""},
  {id:110,name:"Resveratrol Antioxidante (60 comp)",price:22990,cost:16421.43,desc:"Rejuvenecedor celular. Antioxidante de vid.",cat:"Antioxidantes",barcode:"0714604213369",img:""},
  {id:111,name:"Sinefrina - Quemador Natural (60 caps)",price:25147,cost:17962.14,desc:"Termogénico natural. Quema grasa sin estimulantes fuertes.",cat:"Control de Peso",barcode:"0714604143741",img:""},
  {id:112,name:"Sinefrina - Quemador Natural (60 comp)",price:22473,cost:16052.40,desc:"Termogénico natural. Quema grasa sin estimulantes fuertes.",cat:"Control de Peso",barcode:"0714604213352",img:""},
  {id:114,name:"Spirulina Pura 500mg (60 caps)",price:16400,cost:11714.29,desc:"Superalimento marino. Pérdida de peso y antioxidante.",cat:"Superfoods",barcode:"0714604213284",img:""},
  {id:115,name:"Taurato de Magnesio 500mg (60 caps)",price:18600,cost:13285.71,desc:"Magnesio cardioprotector. Corazón y sistema nervioso.",cat:"Magnesio",barcode:"0714604143550",img:""},
  {id:116,name:"Taurato de Magnesio (60 comp)",price:17745,cost:12675,desc:"Magnesio cardioprotector. Corazón y sistema nervioso.",cat:"Magnesio",barcode:"0714604213543",img:""},
  {id:117,name:"Testo Up (60 caps)",price:21900,cost:15642.86,desc:"Precursor de testosterona natural. Energía y masa muscular.",cat:"Hormonal",barcode:"0714604143567",img:""},
  {id:138,name:"Testo Up (60 comp)",price:20900,cost:14928.57,desc:"Precursor de testosterona natural. Energía y masa muscular.",cat:"Hormonal",barcode:"0714604213741",img:""},
  {id:118,name:"Tirosina + Yodo (60 caps)",price:16400,cost:11714.29,desc:"Soporte tiroideo. Metabolismo y energía.",cat:"Tiroides",barcode:"0714604213635",img:""},
  {id:119,name:"Treonato de Magnesio 500mg (60 caps)",price:19700,cost:14071.43,desc:"Magnesio cerebral. Memoria y neuroprotección.",cat:"Magnesio",barcode:"0714604143581",img:""},
  {id:120,name:"Treonato de Magnesio (60 comp)",price:18200,cost:13000,desc:"Magnesio cerebral. Memoria y neuroprotección.",cat:"Magnesio",barcode:"0714604213376",img:""},
  {id:121,name:"Triptófano (60 caps)",price:16400,cost:11714.29,desc:"Precursor de serotonina. Sueño, calma y buen humor.",cat:"Estrés & Sueño",barcode:"0714604213437",img:""},
  {id:123,name:"Vitamina A Retinol 1000mcg (30 caps)",price:20400,cost:14571.43,desc:"Visión, piel e inmunidad. Vitamina A pura.",cat:"Vitaminas",barcode:"0714604143819",img:""},
  {id:124,name:"Vitamina B12 (60 caps)",price:16500,cost:11785.71,desc:"Equilibrio sanguíneo y neurológico. Energía.",cat:"Vitaminas",barcode:"0714604143604",img:""},
  {id:125,name:"Vitamina C 500mg (60 caps)",price:12510,cost:8935.94,desc:"Ácido ascórbico puro. Inmunidad y antioxidante.",cat:"Vitaminas",barcode:"0714604143611",img:""},
  {id:139,name:"Vitamina C 500mg (60 comp)",price:12300,cost:8785.71,desc:"Ácido ascórbico puro. Inmunidad y antioxidante.",cat:"Vitaminas",barcode:"0714604213758",img:""},
  {id:126,name:"Vitamina D3 + K2 (60 caps)",price:19700,cost:14071.43,desc:"Salud ósea y cardiovascular. Dupla perfecta.",cat:"Vitaminas",barcode:"0714604143659",img:""},
  {id:127,name:"Vitamina D3 + K2 (60 comp)",price:18600,cost:13285.71,desc:"Salud ósea y cardiovascular. Dupla perfecta.",cat:"Vitaminas",barcode:"0714604213512",img:""},
  {id:128,name:"Vitamina D3 20mcg (30 caps)",price:14200,cost:10142.86,desc:"Huesos, músculos y sistema nervioso.",cat:"Vitaminas",barcode:"0714604143642",img:""},
  {id:143,name:"Whey Protein 80% Chocolate (1 kg)",price:60940,cost:43528.57,desc:"Proteína de suero de alta calidad. Sabor chocolate.",cat:"Proteínas",barcode:"0714604213710",img:""},
  {id:144,name:"Whey Protein 80% Americana (1 kg)",price:60940,cost:43528.57,desc:"Proteína de suero de alta calidad. Sabor americana.",cat:"Proteínas",barcode:"0714604213734",img:""},
  {id:145,name:"Whey Protein 80% Frambuesa (1 kg)",price:60940,cost:43528.57,desc:"Proteína de suero de alta calidad. Sabor frambuesa.",cat:"Proteínas",barcode:"0714604213727",img:""},
  {id:131,name:"Whey Protein Creatina Power (1 kg)",price:40311,cost:28793.57,desc:"Whey + Creatina. Máxima fuerza y músculo.",cat:"Proteínas",barcode:"0714604143680",img:""},
  {id:132,name:"Whey Protein Glutamina + BCAA (1 kg)",price:41575,cost:29696.19,desc:"Proteína completa con recuperadores musculares.",cat:"Proteínas",barcode:"0714604143697",img:""},
  {id:133,name:"Whey Protein Glutamina + BCAA (600 gr)",price:25147,cost:17962.14,desc:"Proteína completa con recuperadores musculares.",cat:"Proteínas",barcode:"0714604143703",img:""},
  {id:135,name:"Whey Protein Testo Active (1 kg)",price:55015,cost:39296.25,desc:"Whey con precursores de testosterona. Fuerza máxima.",cat:"Proteínas",barcode:"0714604213529",img:""},
  {id:134,name:"Whey Protein Testo Active (500 gr)",price:32729,cost:23377.86,desc:"Whey con precursores de testosterona.",cat:"Proteínas",barcode:"0714604143710",img:""},
  {id:136,name:"ZMA Zinc-Magnesio-B6 (60 caps)",price:16400,cost:11714.29,desc:"Recuperación nocturna. Testosterona y sueño profundo.",cat:"Deportivo",barcode:"0714604143727",img:""},
  // KITS
  {id:200,name:"Kit Antiage — Colagenol + Ácido Hialurónico",price:36520,cost:26085.72,desc:"Dúo antiage perfecto. Piel hidratada y firme.",cat:"Kits",barcode:"KIT-ANTIAGE",isKit:true,img:""},
  {id:201,name:"Kit Hongo Cándida (180 caps)",price:45900,cost:32785.71,desc:"Protocolo completo antifúngico. 3 frascos para tratamiento.",cat:"Kits",barcode:"KIT-CANDIDA",isKit:true,img:""},
  {id:202,name:"Kit Potasio/Magnesio (60 caps c/u)",price:33487,cost:23919.43,desc:"Electrolitos esenciales juntos. Corazón, músculos y energía.",cat:"Kits",barcode:"KIT-POTMAG",isKit:true,img:""},
  {id:203,name:"Kit NAD + Resveratrol Antiage (120 caps)",price:58900,cost:42071.43,desc:"El kit de longevidad más vendido. Regeneración celular total.",cat:"Kits",barcode:"KIT-NAD",isKit:true,img:""},
];

const KITS_ROTACION = [
  {id:"k1",name:"Kit Arranque Dietética",subtitle:"Ideal para dietéticas y herboristerías",products:["Vitamina C 500mg","Vitamina D3 + K2","Omega 3","Magnesio Quelatado 400mg","Spirulina Pura 500mg"],investment:"~$83.000 mayorista",ganancia:"~$116.000 PVP",margen:"40%",icon:"🌿",nicho:"Dietéticas"},
  {id:"k2",name:"Kit Rendimiento Gym",subtitle:"Para gimnasios y entrenadores",products:["Creatina Pura 100% (200gr)","BCAA Aminoácidos Esenciales","L-Glutamina","ZMA - Zinc, Magnesio, B6","Óxido Nítrico"],investment:"~$86.000 mayorista",ganancia:"~$120.000 PVP",margen:"40%",icon:"💪",nicho:"Gimnasios"},
  {id:"k3",name:"Kit Bienestar Profesional",subtitle:"Para nutricionistas y médicos",products:["Ashwagandha 100% Pura","Multi Magnesio 5 en 1","Prebiótico+","Ginkgo Biloba","Melaton 500mg"],investment:"~$92.000 mayorista",ganancia:"~$128.000 PVP",margen:"39%",icon:"🩺",nicho:"Profesionales"},
  {id:"k4",name:"Kit Longevidad Premium",subtitle:"Alta rentabilidad, nicho en crecimiento",products:["NMN","NAD con Resveratrol 2 en 1","Glutatión Antioxidante","Astaxantina 12mg","Coenzima Q10 300mg"],investment:"~$142.000 mayorista",ganancia:"~$199.000 PVP",margen:"40%",icon:"⚡",nicho:"Longevidad"},
  {id:"k5",name:"Kit Hormonal Mujer",subtitle:"Emprendedoras y consultas femeninas",products:["Lady Balance","INOSITOL - Vitamina B8","Maca Peruana 500mg","Ácido Fólico","Centella Asiática"],investment:"~$75.000 mayorista",ganancia:"~$105.000 PVP",margen:"40%",icon:"🌸",nicho:"Emprendedoras"},
  {id:"k6",name:"Kit Control de Peso",subtitle:"Alta rotación todo el año",products:["Garcinia Cambogia","Sinefrina - Quemador Natural","Picolinato de Cromo","Fucus Plus","Blockcarbs"],investment:"~$76.000 mayorista",ganancia:"~$107.000 PVP",margen:"41%",icon:"🔥",nicho:"Control Peso"},
];

const CATEGORIES = ["Todos",...[...new Set(PRODUCTS.map(p=>p.cat))].sort()];
function fmt(n){return "$ "+Math.round(n).toLocaleString("es-AR");}

export default function App(){
  const [page,setPage]=useState("home");
  const [products,setProducts]=useState(PRODUCTS);
  const [cart,setCart]=useState([]);
  const [orders,setOrders]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [checkoutOpen,setCheckoutOpen]=useState(false);
  const [orderDone,setOrderDone]=useState(false);
  const [detail,setDetail]=useState(null);
  const [cat,setCat]=useState("Todos");
  const [search,setSearch]=useState("");
  const [adminLogged,setAdminLogged]=useState(false);
  const [adminPass,setAdminPass]=useState("");
  const [adminErr,setAdminErr]=useState("");
  const [adminTab,setAdminTab]=useState("orders");
  const [editP,setEditP]=useState(null);
  const [newP,setNewP]=useState({name:"",price:"",cost:"",desc:"",cat:"",stock:99,barcode:""});
  const [imgPrev,setImgPrev]=useState("");
  const [tracking,setTracking]=useState({});
  const [form,setForm]=useState({name:"",phone:"",address:"",notes:""});
  const fileRef=useRef();
  const editFileRef=useRef();

  const cartQty=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const filtered=useMemo(()=>products.filter(p=>{
    const matchCat=cat==="Todos"||p.cat===cat;
    const matchSearch=p.name.toLowerCase().includes(search.toLowerCase())||p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchSearch;
  }),[products,cat,search]);

  function addCart(p){setCart(prev=>{const ex=prev.find(i=>i.id===p.id);if(ex)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);return[...prev,{...p,qty:1}];});setCartOpen(true);}
  function remCart(id){setCart(p=>p.filter(i=>i.id!==id));}
  function updQty(id,q){if(q<1)return remCart(id);setCart(p=>p.map(i=>i.id===id?{...i,qty:q}:i));}

  function doCheckout(){
    if(!form.name||!form.phone||!form.address)return;
    const o={id:Date.now(),items:cart,total:cartTotal,customer:form,status:"Pendiente",tracking:"",date:new Date().toLocaleString("es-AR")};
    setOrders(p=>[o,...p]);
    const msg=encodeURIComponent(`🛒 *Nuevo pedido — Punto Vital*\n\n👤 *Cliente:* ${form.name}\n📞 ${form.phone}\n📍 ${form.address}${form.notes?`\n📝 ${form.notes}`:""}\n\n*Productos:*\n${cart.map(i=>`• ${i.name} x${i.qty} — ${fmt(i.price*i.qty)}`).join("\n")}\n\n💰 *Total: ${fmt(cartTotal)}*\n💳 Transferencia bancaria`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,"_blank");
    setCart([]);setCheckoutOpen(false);setCartOpen(false);setOrderDone(true);
    setForm({name:"",phone:"",address:"",notes:""});
    setTimeout(()=>setOrderDone(false),4000);
  }

  function handleImg(e,isEdit){
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{if(isEdit)setEditP(p=>({...p,img:ev.target.result}));else{setImgPrev(ev.target.result);setNewP(p=>({...p,img:ev.target.result}));}};
    r.readAsDataURL(f);
  }
  function saveNew(){
    if(!newP.name||!newP.price)return;
    setProducts(p=>[...p,{...newP,id:Date.now(),price:Number(newP.price),cost:Number(newP.cost)||0,stock:Number(newP.stock)||99}]);
    setNewP({name:"",price:"",cost:"",desc:"",cat:"",stock:99,barcode:""});setImgPrev("");
  }
  function saveEdit(){setProducts(p=>p.map(x=>x.id===editP.id?{...editP,price:Number(editP.price),cost:Number(editP.cost)}:x));setEditP(null);}
  function delP(id){setProducts(p=>p.filter(x=>x.id!==id));}
  function saveTracking(oid){setOrders(p=>p.map(o=>o.id===oid?{...o,tracking:tracking[oid]||o.tracking,status:tracking[oid]?"Enviado":o.status}:o));}

  const blue="#0071e3",darkBlue="#0055b3",lightBlue="#e8f0fe",gray="#86868b",lightGray="#f5f5f7",dark="#1d1d1f",white="#fff";
  const S={
    app:{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Helvetica,sans-serif",minHeight:"100vh",background:lightGray,color:dark},
    nav:{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #d2d2d7",position:"sticky",top:0,zIndex:200,height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px"},
    logo:{fontWeight:700,fontSize:19,letterSpacing:-.5,color:dark,cursor:"pointer",display:"flex",alignItems:"center",gap:8},
    navLinks:{display:"flex",gap:20,alignItems:"center"},
    navLink:(a)=>({background:"none",border:"none",cursor:"pointer",fontSize:14,color:a?blue:gray,fontWeight:a?600:400,padding:0}),
    cartBadge:{background:blue,color:white,border:"none",borderRadius:20,padding:"6px 16px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6},
    banner:{background:`linear-gradient(90deg,${blue},${darkBlue})`,color:white,textAlign:"center",padding:"10px 20px",fontSize:13,fontWeight:500},
    hero:{background:"linear-gradient(160deg,#0a0a0a 0%,#1a2a4a 60%,#0a1628 100%)",color:white,padding:"80px 24px 70px",textAlign:"center"},
    heroEye:{fontSize:12,letterSpacing:4,opacity:.6,textTransform:"uppercase",marginBottom:16},
    heroTitle:{fontSize:"clamp(2.4rem,6vw,4rem)",fontWeight:800,letterSpacing:-1.5,lineHeight:1.05,margin:"0 0 16px"},
    heroBlue:{color:"#60a5fa"},
    heroSub:{fontSize:"clamp(15px,2vw,18px)",opacity:.7,maxWidth:540,margin:"0 auto 32px",lineHeight:1.6},
    heroBtn:{background:blue,color:white,border:"none",borderRadius:24,padding:"13px 32px",cursor:"pointer",fontSize:16,fontWeight:600,marginRight:12},
    heroBtnOut:{background:"transparent",color:white,border:"1px solid rgba(255,255,255,0.3)",borderRadius:24,padding:"13px 28px",cursor:"pointer",fontSize:15,fontWeight:500},
    section:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},
    sectionTitle:{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,letterSpacing:-.8,marginBottom:8},
    sectionSub:{color:gray,fontSize:15,marginBottom:36,lineHeight:1.5},
    grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:18},
    card:{background:white,borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .2s",boxShadow:"0 1px 6px rgba(0,0,0,0.06)"},
    cardImg:{width:"100%",height:180,objectFit:"cover",background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52},
    cardBody:{padding:"14px 16px 16px"},
    cardCat:{fontSize:11,color:blue,fontWeight:700,textTransform:"uppercase",letterSpacing:.8},
    cardName:{fontSize:15,fontWeight:600,margin:"3px 0 6px",lineHeight:1.3},
    cardPrice:{fontSize:18,fontWeight:800,color:dark},
    cardBtn:{background:blue,color:white,border:"none",borderRadius:12,padding:"9px 0",cursor:"pointer",fontSize:13,fontWeight:600,width:"100%",marginTop:10},
    filters:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,alignItems:"center"},
    filterBtn:(a)=>({background:a?blue:white,color:a?white:gray,border:`1px solid ${a?blue:"#d2d2d7"}`,borderRadius:20,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:a?600:400}),
    searchBox:{flex:1,minWidth:200,border:"1px solid #d2d2d7",borderRadius:12,padding:"9px 14px",fontSize:14,outline:"none",fontFamily:"inherit"},
    overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16},
    modal:{background:white,borderRadius:20,width:"100%",maxWidth:460,maxHeight:"92vh",overflowY:"auto",padding:24,boxShadow:"0 24px 60px rgba(0,0,0,0.2)"},
    mTitle:{fontSize:20,fontWeight:700,letterSpacing:-.4,marginBottom:18},
    inp:{width:"100%",border:"1px solid #d2d2d7",borderRadius:10,padding:"10px 13px",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10,fontFamily:"inherit"},
    btn:{background:blue,color:white,border:"none",borderRadius:14,padding:"12px 0",cursor:"pointer",fontSize:15,fontWeight:600,width:"100%"},
    btnSm:{background:blue,color:white,border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600},
    btnOut:{background:"transparent",border:"1px solid #d2d2d7",borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:13,color:dark},
    closeBtn:{background:lightGray,border:"none",borderRadius:50,width:30,height:30,cursor:"pointer",fontSize:17,color:gray,float:"right",lineHeight:"30px",textAlign:"center"},
    tag:{display:"inline-block",background:lightBlue,color:blue,borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700,letterSpacing:.5,marginBottom:8,textTransform:"uppercase"},
    kitTag:{display:"inline-block",background:"#fef3c7",color:"#d97706",borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700,marginBottom:8},
    badge:(s)=>({display:"inline-block",padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:700,background:s==="Enviado"?"#e8f5e9":s==="Pagado"?"#e8f0fe":"#fff3e0",color:s==="Enviado"?"#2d5a27":s==="Pagado"?blue:"#e65100"}),
    th:{textAlign:"left",padding:"10px 12px",borderBottom:"2px solid #f0f0f5",color:gray,fontWeight:600,fontSize:11,textTransform:"uppercase"},
    td:{padding:"12px",borderBottom:"1px solid #f8f8fa",verticalAlign:"top",fontSize:13},
    adminNavBtn:(a)=>({background:a?dark:white,color:a?white:dark,border:"1px solid #d2d2d7",borderRadius:12,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:600}),
    success:{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:dark,color:white,borderRadius:14,padding:"13px 26px",fontSize:14,fontWeight:600,zIndex:400,boxShadow:"0 8px 28px rgba(0,0,0,0.18)",whiteSpace:"nowrap"},
  };

  const Presentation=()=>(
    <div>
      <div style={S.hero}>
        <div style={S.heroEye}>Distribuidora Nutracéutica</div>
        <h1 style={S.heroTitle}>Punto <span style={S.heroBlue}>Vital</span></h1>
        <p style={S.heroSub}>Acompañamos el crecimiento de profesionales, emprendedores y negocios con suplementos de alta calidad y stock inmediato.</p>
        <button style={S.heroBtn} onClick={()=>setPage("store")}>Ver catálogo completo</button>
        <button style={S.heroBtnOut} onClick={()=>document.getElementById("kits")?.scrollIntoView({behavior:"smooth"})}>Kits de alta rotación ↓</button>
      </div>
      <div style={{background:white,borderBottom:"1px solid #f0f0f5"}}>
        <div style={{...S.section,padding:"32px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:24,textAlign:"center"}}>
            {[["130+","Productos disponibles"],["Stock inmediato","Sin esperas"],["Mismo día","Pedidos hasta las 13hs"],["40%+","Margen de ganancia"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:28,fontWeight:800,color:blue,letterSpacing:-1}}>{v}</div><div style={{fontSize:13,color:gray,marginTop:4}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>¿Para quién es Punto Vital?</div>
        <p style={S.sectionSub}>Pensamos en nichos donde no se necesitan grandes inversiones para empezar a ganar.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {[{icon:"🩺",title:"Nutricionistas & Médicos",desc:"Complementá tus consultas con suplementos de calidad. Sin stock inicial obligatorio."},{icon:"🌿",title:"Dietéticas & Herboristerías",desc:"Amplía tu góndola con los productos de mayor rotación del mercado nutracéutico."},{icon:"💪",title:"Gimnasios & Entrenadores",desc:"Vende directamente a tus alumnos. Creatina, proteínas, BCAA y recuperadores."},{icon:"🚀",title:"Emprendedores",desc:"Empezá con un kit básico y escalá gradualmente. Margen real del 40%."},{icon:"🌸",title:"Emprendedoras de bienestar",desc:"Productos hormonales, antiage y control de peso. Alta demanda femenina."},{icon:"📦",title:"Revendedores online",desc:"Dropshipping con stock real. Envíos el mismo día para que no pierdas ventas."}].map(n=>(
            <div key={n.title} style={{background:white,borderRadius:16,padding:"24px 20px",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:32,marginBottom:12}}>{n.icon}</div>
              <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{n.title}</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.6}}>{n.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${lightBlue},#dbeafe)`,padding:"40px 20px"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:12}}>🚚</div>
          <div style={{fontSize:24,fontWeight:700,letterSpacing:-.5,marginBottom:16}}>Envíos rápidos garantizados</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,maxWidth:500,margin:"0 auto",textAlign:"left"}}>
            <div style={{background:white,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{fontWeight:700,color:blue,fontSize:15,marginBottom:6}}>⚡ Mismo día</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.5}}>Pedidos confirmados<br/><b>antes de las 13:00 hs</b></div>
            </div>
            <div style={{background:white,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{fontWeight:700,color:dark,fontSize:15,marginBottom:6}}>📦 Día siguiente</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.5}}>Pedidos después de las 13hs<br/><b>se envían al día siguiente</b></div>
            </div>
          </div>
          <div style={{marginTop:18,background:white,borderRadius:12,padding:"12px 20px",display:"inline-block",fontSize:13,color:gray}}>
            ✅ <b>Stock real e inmediato</b> — Sin preventa, sin esperas, sin sorpresas
          </div>
        </div>
      </div>
      <div style={S.section} id="kits">
        <div style={S.sectionTitle}>Kits de alta rotación</div>
        <p style={S.sectionSub}>Selección estratégica para que tus clientes empiecen a ganar rápido con productos de alta demanda.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
          {KITS_ROTACION.map(k=>(
            <div key={k.id} style={{background:white,borderRadius:18,padding:24,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",border:`1px solid ${lightBlue}`}}>
              <div style={{marginBottom:12}}>
                <span style={S.kitTag}>{k.nicho}</span>
                <div style={{fontSize:18,fontWeight:700,letterSpacing:-.3}}>{k.icon} {k.name}</div>
                <div style={{fontSize:13,color:gray,marginTop:2}}>{k.subtitle}</div>
              </div>
              <div style={{background:lightGray,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
                {k.products.map(p=><div key={p} style={{fontSize:12,color:gray,padding:"2px 0"}}>• {p}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
                <div style={{background:"#fef3c7",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#92400e",fontWeight:600,textTransform:"uppercase"}}>Inversión</div><div style={{fontSize:12,fontWeight:800,color:"#92400e",marginTop:2}}>{k.investment}</div></div>
                <div style={{background:"#d1fae5",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#065f46",fontWeight:600,textTransform:"uppercase"}}>Venta PVP</div><div style={{fontSize:12,fontWeight:800,color:"#065f46",marginTop:2}}>{k.ganancia}</div></div>
                <div style={{background:lightBlue,borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:darkBlue,fontWeight:600,textTransform:"uppercase"}}>Margen</div><div style={{fontSize:24,fontWeight:800,color:blue,marginTop:2,lineHeight:1}}>{k.margen}</div></div>
              </div>
              <button style={{...S.btn,marginTop:14,fontSize:13,padding:"10px 0"}} onClick={()=>setPage("store")}>Ver productos del kit →</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:dark,color:white,textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontSize:28,fontWeight:700,letterSpacing:-.5,marginBottom:12}}>¿Listo para empezar?</div>
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:15,marginBottom:28}}>Pedido mínimo accesible · Stock inmediato · Soporte personalizado</div>
        <button style={{...S.heroBtn,fontSize:16,padding:"14px 36px"}} onClick={()=>setPage("store")}>Ver catálogo completo →</button>
        <div style={{marginTop:16}}><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{color:"#60a5fa",fontSize:14,textDecoration:"none"}}>💬 Consultar por WhatsApp</a></div>
      </div>
    </div>
  );

  const Store=()=>(
    <div style={S.section}>
      <div style={{marginBottom:24}}>
        <div style={S.sectionTitle}>Catálogo Punto Vital</div>
        <div style={S.sectionSub}>{products.length} productos · Stock inmediato</div>
      </div>
      <div style={S.filters}>
        <input style={S.searchBox} placeholder="🔍 Buscar producto..." value={search} onChange={e=>setSearch(e.target.value)}/>
        {CATEGORIES.map(c=><button key={c} style={S.filterBtn(cat===c)} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      {filtered.length===0?<div style={{textAlign:"center",color:gray,padding:"40px 0"}}>No se encontraron productos.</div>:
      <div style={S.grid}>
        {filtered.map(p=>(
          <div key={p.id} style={S.card}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.06)";}}>
            {p.img
              ?<img src={p.img} alt={p.name} style={{width:"100%",height:180,objectFit:"cover",display:"block",cursor:"pointer"}} onClick={()=>setDetail(p)}/>
              :<div style={{...S.cardImg,cursor:"pointer"}} onClick={()=>setDetail(p)}>🌿</div>}
            <div style={S.cardBody}>
              <div style={p.isKit?S.kitTag:S.cardCat}>{p.cat}</div>
              <div style={S.cardName}>{p.name}</div>
              <div style={{fontSize:12,color:gray,lineHeight:1.4,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={S.cardPrice}>{fmt(p.price)}</div>
                <div style={{fontSize:11,color:"#2d5a27",fontWeight:600}}>✅ Stock</div>
              </div>
              <button style={S.cardBtn} onClick={()=>addCart(p)}>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );

  const Cart=()=>(
    <div style={S.overlay} onClick={()=>setCartOpen(false)}>
      <div style={{...S.modal,maxWidth:400}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setCartOpen(false)}>×</button>
        <div style={S.mTitle}>🛒 Carrito</div>
        {cart.length===0?<p style={{color:gray,textAlign:"center",padding:"24px 0"}}>Tu carrito está vacío</p>:<>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f5f5f7"}}>
              <div style={{width:48,height:48,borderRadius:8,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                {i.img?<img src={i.img} alt="" style={{width:48,height:48,objectFit:"cover"}}/>:<span style={{fontSize:22}}>🌿</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{i.name}</div>
                <div style={{color:gray,fontSize:12}}>{fmt(i.price)}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>updQty(i.id,i.qty-1)} style={{...S.btnOut,padding:"2px 9px",borderRadius:8}}>−</button>
                <span style={{fontWeight:700,minWidth:18,textAlign:"center",fontSize:13}}>{i.qty}</span>
                <button onClick={()=>updQty(i.id,i.qty+1)} style={{...S.btnOut,padding:"2px 9px",borderRadius:8}}>+</button>
              </div>
              <button onClick={()=>remCart(i.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#ff3b30",fontSize:16,padding:0}}>✕</button>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,margin:"16px 0"}}>
            <span>Total</span><span style={{color:blue}}>{fmt(cartTotal)}</span>
          </div>
          <button style={S.btn} onClick={()=>{setCartOpen(false);setCheckoutOpen(true);}}>Finalizar pedido →</button>
        </>}
      </div>
    </div>
  );

  const Checkout=()=>(
    <div style={S.overlay} onClick={()=>setCheckoutOpen(false)}>
      <div style={{...S.modal,maxWidth:420}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setCheckoutOpen(false)}>×</button>
        <div style={S.mTitle}>📦 Completar pedido</div>
        <input style={S.inp} placeholder="Nombre completo *" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
        <input style={S.inp} placeholder="Teléfono *" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
        <input style={S.inp} placeholder="Dirección de entrega *" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))}/>
        <input style={S.inp} placeholder="Notas (opcional)" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
        <div style={{background:lightBlue,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8,color:darkBlue}}>💳 Transferencia bancaria</div>
          <div style={{fontSize:13,color:dark,lineHeight:1.8}}>CBU: <b>0000003100123456789012</b><br/>Alias: <b>PUNTO.VITAL</b><br/>Titular: <b>Punto Vital</b></div>
        </div>
        <div style={{background:"#f0fdf4",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#166534"}}>
          ⚡ Pedido antes de las <b>13:00 hs</b> → envío <b>el mismo día</b>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,marginBottom:14}}>
          <span>Total:</span><span style={{color:blue}}>{fmt(cartTotal)}</span>
        </div>
        <button style={{...S.btn,opacity:(!form.name||!form.phone||!form.address)?0.5:1}} onClick={doCheckout}>✅ Confirmar por WhatsApp</button>
        <p style={{fontSize:11,color:gray,textAlign:"center",marginTop:10}}>Al confirmar se abrirá WhatsApp con el resumen de tu pedido</p>
      </div>
    </div>
  );

  const Detail=({p})=>(
    <div style={S.overlay} onClick={()=>setDetail(null)}>
      <div style={{...S.modal,maxWidth:460}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setDetail(null)}>×</button>
        {p.img
          ?<img src={p.img} alt={p.name} style={{width:"100%",height:200,objectFit:"cover",borderRadius:12,marginBottom:16}}/>
          :<div style={{width:"100%",height:140,background:lightBlue,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,marginBottom:16}}>🌿</div>}
        <span style={p.isKit?S.kitTag:S.tag}>{p.cat}</span>
        <div style={{fontSize:22,fontWeight:700,letterSpacing:-.5,margin:"4px 0 8px"}}>{p.name}</div>
        <div style={{color:gray,fontSize:14,lineHeight:1.6,marginBottom:6}}>{p.desc}</div>
        {p.barcode&&<div style={{fontSize:11,color:gray,marginBottom:14,fontFamily:"monospace"}}>Código: {p.barcode}</div>}
        <div style={{fontSize:28,fontWeight:800,color:blue,marginBottom:16}}>{fmt(p.price)}</div>
        <button style={S.btn} onClick={()=>{addCart(p);setDetail(null);}}>Agregar al carrito</button>
      </div>
    </div>
  );

  const AdminLogin=()=>(
    <div style={{...S.section,maxWidth:340,paddingTop:80}}>
      <div style={{background:white,borderRadius:20,padding:32,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{textAlign:"center",fontSize:32,marginBottom:8}}>🔐</div>
        <div style={{fontWeight:700,fontSize:20,textAlign:"center",marginBottom:20}}>Panel Admin</div>
        <input style={S.inp} type="password" placeholder="Contraseña" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(adminPass===ADMIN_PASS?setAdminLogged(true):setAdminErr("Contraseña incorrecta"))}/>
        {adminErr&&<div style={{color:"#ff3b30",fontSize:13,marginBottom:8}}>{adminErr}</div>}
        <button style={S.btn} onClick={()=>adminPass===ADMIN_PASS?setAdminLogged(true):setAdminErr("Contraseña incorrecta")}>Ingresar</button>
      </div>
    </div>
  );

  const AdminPanel=()=>(
    <div style={S.section}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:22,fontWeight:700}}>⚙️ Panel Admin — Punto Vital</div>
        <button style={S.btnOut} onClick={()=>setAdminLogged(false)}>Cerrar sesión</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        {[["📦","Pedidos",orders.length],["✅","Enviados",orders.filter(o=>o.status==="Enviado").length],["🏷️","Productos",products.length],["💰","Ventas",fmt(orders.reduce((s,o)=>s+o.total,0))]].map(([ic,lb,vl])=>(
          <div key={lb} style={{background:white,borderRadius:14,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:11,color:gray}}>{ic} {lb}</div>
            <div style={{fontSize:20,fontWeight:800,marginTop:4,color:blue}}>{vl}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {["orders","products","add"].map(t=>(
          <button key={t} style={S.adminNavBtn(adminTab===t)} onClick={()=>setAdminTab(t)}>
            {t==="orders"?"📋 Pedidos":t==="products"?"🏷️ Productos":"➕ Nuevo producto"}
          </button>
        ))}
      </div>
      {adminTab==="orders"&&(
        <div style={{background:white,borderRadius:16,padding:16,overflowX:"auto"}}>
          {orders.length===0?<p style={{color:gray,textAlign:"center",padding:32}}>Aún no hay pedidos</p>:(
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr>{["#","Fecha","Cliente","Productos","Total","Estado","Seguimiento"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>{orders.map(o=>(
                <tr key={o.id}>
                  <td style={S.td}><code style={{fontSize:11}}>#{String(o.id).slice(-5)}</code></td>
                  <td style={S.td}><span style={{fontSize:11,color:gray}}>{o.date}</span></td>
                  <td style={S.td}><b>{o.customer.name}</b><br/><span style={{color:gray,fontSize:11}}>{o.customer.phone}</span></td>
                  <td style={S.td}>{o.items.map(i=><div key={i.id} style={{fontSize:11}}>{i.name} x{i.qty}</div>)}</td>
                  <td style={S.td}><b style={{color:blue}}>{fmt(o.total)}</b></td>
                  <td style={S.td}><span style={S.badge(o.status)}>{o.status}</span></td>
                  <td style={S.td}>
                    {o.tracking&&<div style={{fontSize:11,color:"#2d5a27",marginBottom:4}}>🚚 {o.tracking}</div>}
                    <div style={{display:"flex",gap:6}}>
                      <input style={{...S.inp,marginBottom:0,fontSize:11,padding:"5px 8px",width:110}} placeholder="Cód. seguimiento" value={tracking[o.id]||""} onChange={e=>setTracking(t=>({...t,[o.id]:e.target.value}))}/>
                      <button style={S.btnSm} onClick={()=>saveTracking(o.id)}>✓</button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      )}
      {adminTab==="products"&&(
        <div style={{background:white,borderRadius:16,padding:16}}>
          {products.map(p=>(
            <div key={p.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f5f5f7"}}>
              <div style={{width:52,height:52,borderRadius:8,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                {p.img?<img src={p.img} alt="" style={{width:52,height:52,objectFit:"cover"}}/>:<span style={{fontSize:24}}>🌿</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:11,color:gray}}>{p.cat} · {fmt(p.price)}</div>
              </div>
              <button style={S.btnOut} onClick={()=>setEditP(p)}>Editar</button>
              <button style={{background:"#fff0f0",color:"#ff3b30",border:"1px solid #ffcdd2",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}} onClick={()=>delP(p.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
      {adminTab==="add"&&(
        <div style={{background:white,borderRadius:16,padding:24,maxWidth:500}}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Nuevo producto</div>
          <input style={S.inp} placeholder="Nombre *" value={newP.name} onChange={e=>setNewP(p=>({...p,name:e.target.value}))}/>
          <input style={S.inp} placeholder="Precio PVP *" type="number" value={newP.price} onChange={e=>setNewP(p=>({...p,price:e.target.value}))}/>
          <input style={S.inp} placeholder="Precio mayorista" type="number" value={newP.cost} onChange={e=>setNewP(p=>({...p,cost:e.target.value}))}/>
          <input style={S.inp} placeholder="Descripción" value={newP.desc} onChange={e=>setNewP(p=>({...p,desc:e.target.value}))}/>
          <input style={S.inp} placeholder="Categoría" value={newP.cat} onChange={e=>setNewP(p=>({...p,cat:e.target.value}))}/>
          <input style={S.inp} placeholder="Código de barras" value={newP.barcode} onChange={e=>setNewP(p=>({...p,barcode:e.target.value}))}/>
          <div style={{marginBottom:14}}>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={e=>handleImg(e,false)}/>
            <button style={S.btnOut} onClick={()=>fileRef.current.click()}>📷 Subir foto</button>
            {imgPrev&&<img src={imgPrev} alt="" style={{display:"block",marginTop:10,width:100,height:100,objectFit:"cover",borderRadius:10}}/>}
          </div>
          <button style={{...S.btn,opacity:(!newP.name||!newP.price)?0.5:1}} onClick={saveNew}>Guardar producto</button>
        </div>
      )}
      {editP&&(
        <div style={S.overlay} onClick={()=>setEditP(null)}>
          <div style={{...S.modal,maxWidth:440}} onClick={e=>e.stopPropagation()}>
            <button style={S.closeBtn} onClick={()=>setEditP(null)}>×</button>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Editar producto</div>
            <input style={S.inp} placeholder="Nombre" value={editP.name} onChange={e=>setEditP(p=>({...p,name:e.target.value}))}/>
            <input style={S.inp} placeholder="Precio PVP" type="number" value={editP.price} onChange={e=>setEditP(p=>({...p,price:e.target.value}))}/>
            <input style={S.inp} placeholder="Costo mayorista" type="number" value={editP.cost||""} onChange={e=>setEditP(p=>({...p,cost:e.target.value}))}/>
            <input style={S.inp} placeholder="Descripción" value={editP.desc||""} onChange={e=>setEditP(p=>({...p,desc:e.target.value}))}/>
            <input style={S.inp} placeholder="Categoría" value={editP.cat||""} onChange={e=>setEditP(p=>({...p,cat:e.target.value}))}/>
            <div style={{marginBottom:14}}>
              <input ref={editFileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={e=>handleImg(e,true)}/>
              <button style={S.btnOut} onClick={()=>editFileRef.current.click()}>📷 Cambiar foto</button>
              {editP.img&&<img src={editP.img} alt="" style={{display:"block",marginTop:10,width:90,height:90,objectFit:"cover",borderRadius:10}}/>}
            </div>
            <button style={S.btn} onClick={saveEdit}>Guardar cambios</button>
          </div>
        </div>
      )}
    </div>
  );

  return(
    <div style={S.app}>
      <div style={S.banner}>⚡ <b>Envío mismo día</b> en pedidos antes de las 13 hs · 📦 Día siguiente después de las 13 hs · ✅ <b>Stock inmediato</b></div>
      <nav style={S.nav}>
        <div style={S.logo} onClick={()=>setPage("home")}><span style={{color:blue,fontSize:22}}>●</span> Punto Vital</div>
        <div style={S.navLinks}>
          <button style={S.navLink(page==="home")} onClick={()=>setPage("home")}>Inicio</button>
          <button style={S.navLink(page==="store")} onClick={()=>setPage("store")}>Catálogo</button>
          <button style={S.navLink(page==="admin")} onClick={()=>setPage("admin")}>Admin</button>
          {page==="store"&&<button style={S.cartBadge} onClick={()=>setCartOpen(true)}>
            🛒 {cartQty>0?<span style={{background:white,color:blue,borderRadius:10,padding:"1px 7px",fontSize:12,fontWeight:800}}>{cartQty}</span>:"Carrito"}
          </button>}
        </div>
      </nav>
      {page==="home"&&<Presentation/>}
      {page==="store"&&<Store/>}
      {page==="admin"&&(adminLogged?<AdminPanel/>:<AdminLogin/>)}
      {page!=="admin"&&(
        <div style={{background:dark,color:white,textAlign:"center",padding:"24px 20px"}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>● Punto Vital</div>
          <div style={{opacity:.5,fontSize:12}}>Distribuidora de Alimentos Nutracéuticos · Argentina</div>
        </div>
      )}
      {cartOpen&&<Cart/>}
      {checkoutOpen&&<Checkout/>}
      {detail&&<Detail p={detail}/>}
      {orderDone&&<div style={S.success}>✅ ¡Pedido confirmado y enviado por WhatsApp!</div>}
    </div>
  );
}
