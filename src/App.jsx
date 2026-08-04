import { useState, useRef, useMemo } from "react";

const WHATSAPP = "5493541000000";
const ADMIN_PASS = "puntovital2024";

const PRODUCTS = [
  {id:1,name:"Aceite Esencial De Cúrcuma (30ml)",price:16390,cost:12323.31,desc:"Aceite esencial puro de cúrcuma.",cat:"Aceites Esenciales",barcode:"0714604143901",img:"/aceite-curcuma.jpg",stock:false},
  {id:2,name:"Aceite Esencial De Orégano (30ml)",price:16390,cost:12323.31,desc:"Aceite esencial de orégano.",cat:"Aceites Esenciales",barcode:"0714604143871",img:"/aceite-oregano.jpg",stock:false},
  {id:3,name:"Aceite Esencial De Romero Capilar (30ml)",price:15950,cost:11992.48,desc:"Estimula el cuero cabelludo y fortalece el cabello.",cat:"Aceites Esenciales",barcode:"0714604143888",img:"/aceite-romero.jpg",stock:false},
  {id:4,name:"Aceite Esencial De Tomillo Tonificante (30ml)",price:16390,cost:12323.31,desc:"Tonificante natural.",cat:"Aceites Esenciales",barcode:"0714604213192",img:"/aceite-tomillo.jpg",stock:false},
  {id:5,name:"Aceite Esencial De Urucum (30ml)",price:15950,cost:11992.48,desc:"Aceite de urucum con propiedades antioxidantes.",cat:"Aceites Esenciales",barcode:"0714604143895",img:"/aceite-urucum.jpg",stock:false},
  {id:6,name:"Ácido Alfa Lipoico 500mg (60 caps)",price:41250,cost:31015.04,desc:"Potente antioxidante universal.",cat:"Antioxidantes",barcode:"0714604143789",img:"/alfa-lipoico.jpg",stock:true},
  {id:7,name:"Ácido Fólico (60 caps)",price:18810,cost:14142.86,desc:"Vitamina B9 esencial. Embarazo y sistema nervioso.",cat:"Vitaminas",barcode:"0714604142911",img:"/acido-folico.jpg",stock:true},
  {id:8,name:"Ácido Hialurónico (60 caps)",price:25190,cost:18939.85,desc:"Hidratación profunda de piel y articulaciones.",cat:"Antiage & Piel",barcode:"0714604142928",img:"/acido-hialuronico.jpg",stock:true},
  {id:9,name:"Adrelax - Cortisol Support (60 caps)",price:29590,cost:22248.12,desc:"Soporte suprarrenal. Control del cortisol y estrés.",cat:"Estrés & Sueño",barcode:"0714604142935",img:"/adrelax.jpg",stock:true},
  {id:10,name:"Adrelax - Cortisol Support (60 comp)",price:27390,cost:20593.98,desc:"Soporte suprarrenal. Control del cortisol y estrés.",cat:"Estrés & Sueño",barcode:"0714604213345",img:"/adrelax-comp.jpg",stock:true},
  {id:11,name:"AKG - Ácido Alfa Ketoglutárico (60 caps)",price:38390,cost:28864.66,desc:"Longevidad celular. Metabolismo energético avanzado.",cat:"Longevidad",barcode:"0714604142942",img:"/akg.jpg",stock:true},
  {id:12,name:"Ashwagandha 100% Pura (60 caps)",price:31460,cost:23654.14,desc:"Adaptógeno para estrés, insomnio y fatiga.",cat:"Estrés & Sueño",barcode:"0714604213215",img:"/ashwagandha.jpg",stock:true},
  {id:13,name:"Astaxantina 10mg (30 caps)",price:38390,cost:28864.66,desc:"Superantioxidante. Piel, ojos y articulaciones.",cat:"Antioxidantes",barcode:"0714604143734",img:"/astaxantina-12mg.jpg",stock:true},
  {id:14,name:"Astaxantina 4mg",price:27390,cost:20593.98,desc:"Antioxidante carotenóide. Piel, ojos, articulaciones.",cat:"Antioxidantes",barcode:"0714604143864",img:"/astaxantina-4mg.jpg",stock:true},
  {id:17,name:"BCAA Aminoácidos Esenciales 600mg (90 caps)",price:16390,cost:12323.31,desc:"Masa muscular y recuperación.",cat:"Deportivo",barcode:"0714604142966",img:"/bcaa.jpg",stock:true},
  {id:146,name:"Beta Alanina (120 caps)",price:17050,cost:12819.55,desc:"Reduce la fatiga muscular y mejora el rendimiento.",cat:"Deportivo",barcode:"0714604213772",img:"/beta-alanina.jpg",stock:true},
  {id:18,name:"Betacaroteno (60 caps)",price:17490,cost:13150.38,desc:"Provitamina A. Bronceado, piel y sistema inmune.",cat:"Vitaminas",barcode:"0714604142973",img:"/betacaroteno.jpg",stock:true},
  {id:19,name:"Bio F - Hongo Cándida (60 caps)",price:20130,cost:15135.34,desc:"Fórmula antifúngica natural.",cat:"Salud Intestinal",barcode:"0714604142980",img:"/bio-f.jpg",stock:true},
  {id:21,name:"Bisglicinato de Magnesio (60 comp)",price:17490,cost:13150.38,desc:"Magnesio quelatado. Sueño, músculos y nervios.",cat:"Magnesio",barcode:"0714604213390",img:"/bisglicinato-comp.jpg",stock:true},
  {id:20,name:"Bisglicinato de Magnesio 500mg (60 caps)",price:19250,cost:14473.68,desc:"Magnesio de alta absorción. Relajación muscular.",cat:"Magnesio",barcode:"0714604142997",img:"/bisglicinato.jpg",stock:true},
  {id:32,name:"Blend Fusion (60 caps)",price:18260,cost:13729.32,desc:"Colágeno hidrolizado para piel, pelo y uñas.",cat:"Antiage & Piel",barcode:"0714604143109",img:"/colagenol.jpg",stock:true},
  {id:24,name:"C Stop - Cándida Balance (60 caps)",price:27489,cost:20668.42,desc:"Balance de flora intestinal.",cat:"Salud Intestinal",barcode:"0714604143017",img:"/c-stop.jpg",stock:true},
  {id:23,name:"Cafeína + Guaraná (60 caps)",price:15950,cost:11992.48,desc:"Concentración y energía natural.",cat:"Deportivo",barcode:"0714604213338",img:"/cafeina-guarana.jpg",stock:true},
  {id:140,name:"Calcio Plus - Calcio + D3 (60 caps)",price:15290,cost:11496.24,desc:"Salud ósea y función muscular.",cat:"Vitaminas",barcode:"0714604213765",img:"/calcio-plus.jpg",stock:true},
  {id:27,name:"Centella Asiática (30 caps)",price:16390,cost:12323.31,desc:"Cicatrizante y anticelulitico natural.",cat:"Antiage & Piel",barcode:"0714604213574",img:"/centella-asiatica.jpg",stock:true},
  {id:141,name:"Cistina Action - Capilar (60 caps)",price:26950,cost:20263.16,desc:"Fortalece el cabello desde adentro.",cat:"Antiage & Piel",barcode:"0714604213789",img:"/cistina-action.jpg",stock:true},
  {id:28,name:"Citrato de Magnesio 400mg (60 caps)",price:16489,cost:12397.74,desc:"Relajante muscular y nervioso.",cat:"Magnesio",barcode:"0714604143062",img:"/citrato-mag.jpg",stock:true},
  {id:29,name:"Citrato de Magnesio 400mg (60 comp)",price:15620,cost:11744.36,desc:"Relajante muscular y nervioso.",cat:"Magnesio",barcode:"0714604213420",img:"/citrato-mag-comp.jpg",stock:true},
  {id:30,name:"Citrato de Potasio 400mg (60 caps)",price:16390,cost:12323.31,desc:"Equilibrio electrolítico. Corazón y músculos.",cat:"Minerales",barcode:"0714604143093",img:"/citrato-potasio.jpg",stock:true},
  {id:47,name:"Clean F - Hongo Cándida (60 caps)",price:20130,cost:15135.34,desc:"Fórmula antifúngica natural.",cat:"Salud Intestinal",barcode:"0714604143215",img:"/clean-f.jpg",stock:true},
  {id:31,name:"Coenzima Q10 300mg (60 caps)",price:41250,cost:31015.04,desc:"Energía celular y antioxidante cardioprotector.",cat:"Antioxidantes",barcode:"0714604143857",img:"/coenzima-q10.jpg",stock:true},
  {id:34,name:"Complex B - Complejo B (30 caps)",price:16390,cost:12323.31,desc:"Todas las vitaminas del grupo B.",cat:"Vitaminas",barcode:"0714604213239",img:"/complex-b.jpg",stock:true},
  {id:69,name:"Creatina (90 caps)",price:17490,cost:13150.38,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604143321",img:"/creatina-caps.jpg",stock:true},
  {id:38,name:"Creatina Pura 100% (300 gr)",price:37950,cost:28533.83,desc:"Creatina monohidratada. Fuerza y rendimiento.",cat:"Deportivo",barcode:"0714604213444",img:"/creatina-300.jpg",stock:true},
  {id:40,name:"Cúrcuma Activada con Jengibre (60 caps)",price:17490,cost:13150.38,desc:"Antiinflamatorio natural potenciado con jengibre.",cat:"Antiinflamatorio",barcode:"0714604143161",img:"/curcuma-jengibre.jpg",stock:true},
  {id:41,name:"Cúrcuma Orgánica (60 caps)",price:17050,cost:12819.55,desc:"Cúrcuma 100% orgánica.",cat:"Antiinflamatorio",barcode:"0714604143178",img:"/curcuma-activada.jpg",stock:true},
  {id:44,name:"Elixir Bio-Regenerador (60 caps)",price:19250,cost:14473.68,desc:"Regeneración celular integral.",cat:"Longevidad",barcode:"0714604143192",img:"/elixir.jpg",stock:true},
  {id:46,name:"Fucus Plus (60 caps)",price:17490,cost:13150.38,desc:"Alga marina. Control de peso y función tiroidea.",cat:"Control de Peso",barcode:"0714604213628",img:"/fucus.jpg",stock:true},
  {id:147,name:"Full Men - Estimulante Natural (60 caps)",price:29150,cost:21917.29,desc:"Estimulante natural masculino.",cat:"Hormonal",barcode:"0714604213819",img:"/full-men.jpg",stock:true},
  {id:48,name:"Garcinia Cambogia (60 caps)",price:16390,cost:12323.31,desc:"Quemador de grasas natural. Saciedad.",cat:"Control de Peso",barcode:"0714604213321",img:"/garcinia.jpg",stock:true},
  {id:49,name:"Ginkgo Biloba (60 caps)",price:17050,cost:12819.55,desc:"Mejora memoria, concentración y circulación.",cat:"Neurológico",barcode:"0714604213611",img:"/ginkgo.jpg",stock:true},
  {id:51,name:"Glicinato de Magnesio (60 comp)",price:16830,cost:12654.14,desc:"Magnesio quelatado para sueño y relajación.",cat:"Magnesio",barcode:"0714604213406",img:"/glicinato-comp.jpg",stock:true},
  {id:50,name:"Glicinato de Magnesio 500mg (60 caps)",price:17490,cost:13150.38,desc:"Magnesio quelatado para sueño profundo.",cat:"Magnesio",barcode:"0714604143222",img:"/glicinato.jpg",stock:true},
  {id:52,name:"Gluconato de Zinc (60 caps)",price:17490,cost:13150.38,desc:"Zinc para sistema inmune, piel y fertilidad.",cat:"Minerales",barcode:"0714604213222",img:"/zinc.jpg",stock:true},
  {id:142,name:"Glutamina Micronizada 300gr",price:37290,cost:28037.59,desc:"Glutamina pura micronizada. Recuperación.",cat:"Deportivo",barcode:"0714604213468",img:"/glutamina-300.jpg",stock:true},
  {id:53,name:"Glutatión Antioxidante (60 caps)",price:31790,cost:23902.26,desc:"Rey de los antioxidantes. Detox hepático.",cat:"Antioxidantes",barcode:"0714604143239",img:"/glutatión.jpg",stock:true},
  {id:54,name:"Glutatión Antioxidante (60 comp)",price:30250,cost:22744.36,desc:"Rey de los antioxidantes. Detox hepático.",cat:"Antioxidantes",barcode:"0714604213550",img:"/glutatión.jpg",stock:true},
  {id:56,name:"Hiper T - Tiroides Control (60 caps)",price:26389,cost:19841.35,desc:"Soporte natural para tiroides hiperactiva.",cat:"Tiroides",barcode:"0714604213307",img:"/hipotiroidal.jpg",stock:true},
  {id:57,name:"Hipo T - Tiroides Control (60 caps)",price:26389,cost:19841.35,desc:"Soporte natural para tiroides hipoactiva.",cat:"Tiroides",barcode:"0714604213291",img:"/hipotiroidal.jpg",stock:true},
  {id:58,name:"Hongos Adaptógenos (60 caps)",price:27390,cost:20593.98,desc:"Blend de hongos medicinales adaptógenos.",cat:"Estrés & Sueño",barcode:"0714604143253",img:"/hongos-adaptogenos.jpg",stock:true},
  {id:59,name:"INOSITOL - Vitamina B8 (30 caps)",price:17490,cost:13150.38,desc:"Equilibrio hormonal. SOP, ansiedad y metabolismo.",cat:"Hormonal",barcode:"0714604143260",img:"/inositol.jpg",stock:true},
  {id:106,name:"Inulina - Prebiótico Natural (60 caps)",price:24090,cost:18112.78,desc:"Prebióticos avanzados para microbiota.",cat:"Salud Intestinal",barcode:"0714604213581",img:"/inulina.jpg",stock:true},
  {id:61,name:"Kardio 3 (60 caps)",price:18590,cost:13977.44,desc:"Soporte cardiovascular con Omega 3 y CoQ10.",cat:"Cardiovascular",barcode:"0714604143284",img:"/kardio.jpg",stock:true},
  {id:68,name:"Lady Balance (60 caps)",price:20790,cost:15631.58,desc:"Equilibrio hormonal femenino. PMS y menopausia.",cat:"Hormonal",barcode:"0714604143307",img:"/lady-balance.jpg",stock:true},
  {id:71,name:"Levadura de Selenio (60 caps)",price:18590,cost:13977.44,desc:"Selenio orgánico. Antioxidante y función tiroidea.",cat:"Minerales",barcode:"0714604143345",img:"/selenio.jpg",stock:true},
  {id:72,name:"L-Glicina (60 caps)",price:17490,cost:13150.38,desc:"Aminoácido esencial para colágeno.",cat:"Antiage & Piel",barcode:"0714604213475",img:"/l-glicina.jpg",stock:true},
  {id:73,name:"L-Glutamina (90 caps)",price:17490,cost:13150.38,desc:"Recuperación muscular y salud intestinal.",cat:"Deportivo",barcode:"0714604143352",img:"/l-glutamina.jpg",stock:true},
  {id:74,name:"L-Lisina 500mg (60 caps)",price:17490,cost:13150.38,desc:"Aminoácido esencial. Colágeno y sistema inmune.",cat:"Antiage & Piel",barcode:"0714604143369",img:"/l-lisina.jpg",stock:true},
  {id:137,name:"L-Teanina (60 caps)",price:27390,cost:20593.98,desc:"Relaja sin somnolencia. Estrés e insomnio.",cat:"Estrés & Sueño",barcode:"0714604213642",img:"/l-teanina.jpg",stock:true},
  {id:75,name:"Maca Peruana Pura 500mg (60 caps)",price:19690,cost:14804.51,desc:"Energizante natural. Libido y vitalidad.",cat:"Hormonal",barcode:"0714604213253",img:"/maca.jpg",stock:true},
  {id:77,name:"Magnesio Quelatado 400mg (60 caps)",price:16280,cost:12240.60,desc:"Magnesio quelatado de alta absorción.",cat:"Magnesio",barcode:"0714604143383",img:"/magnesio-quelatado.jpg",stock:true},
  {id:78,name:"Maitake Hongo (60 caps)",price:25190,cost:18939.85,desc:"Hongo medicinal. Estrés e inmunidad.",cat:"Hongos Medicinales",barcode:"0714604213604",img:"/maitake.jpg",stock:true},
  {id:80,name:"Malato de Magnesio (60 comp)",price:15950,cost:11992.48,desc:"Energía y recuperación muscular.",cat:"Magnesio",barcode:"0714604213383",img:"/malato-comp.jpg",stock:true},
  {id:79,name:"Malato de Magnesio 500mg (60 caps)",price:17490,cost:13150.38,desc:"Energía y recuperación muscular.",cat:"Magnesio",barcode:"0714604213277",img:"/malato.jpg",stock:true},
  {id:81,name:"Mega D - Hongo Cándida (60 caps)",price:20130,cost:15135.34,desc:"Detox profundo. Control de cándida.",cat:"Salud Intestinal",barcode:"0714604143390",img:"/mega-d.jpg",stock:true},
  {id:83,name:"Melena de León 500mg (60 caps)",price:30690,cost:23075.19,desc:"Hongo neuroprotector. Cognición y digestión.",cat:"Hongos Medicinales",barcode:"0714604213260",img:"/melena-leon.jpg",stock:true},
  {id:85,name:"Moringa (60 caps)",price:17050,cost:12819.55,desc:"Superalimento. Calcio vegetal y antioxidantes.",cat:"Superfoods",barcode:"0714604213536",img:"/moringa.jpg",stock:true},
  {id:84,name:"MSM 500mg (60 caps)",price:19690,cost:14804.51,desc:"Azufre orgánico. Articulaciones y piel.",cat:"Antiinflamatorio",barcode:"0714604143413",img:"/msm.jpg",stock:true},
  {id:86,name:"Mucline - Intestino Permeable (60 caps)",price:18590,cost:13977.44,desc:"Optimizador de mucosas e intestino.",cat:"Salud Intestinal",barcode:"0714604143420",img:"/mucline.jpg",stock:true},
  {id:87,name:"Multi Magnesio 5 en 1 (60 caps)",price:19690,cost:14804.51,desc:"5 formas de magnesio en una cápsula.",cat:"Magnesio",barcode:"0714604143758",img:"/multimagnesio.jpg",stock:true},
  {id:88,name:"Multi Magnesio 5 en 1 (60 comp)",price:18590,cost:13977.44,desc:"5 formas de magnesio en un comprimido.",cat:"Magnesio",barcode:"0714604213451",img:"/multimagnesio-comp.jpg",stock:true},
  {id:89,name:"NAC 500mg (60 caps)",price:25190,cost:18939.85,desc:"N-Acetilcisteína. Optimizador respiratorio.",cat:"Antioxidantes",barcode:"0714604143437",img:"/nac.jpg",stock:true},
  {id:90,name:"NAD - Longevidad (60 caps)",price:40590,cost:30518.80,desc:"Nicotinamida Adenina Dinucleótido.",cat:"Longevidad",barcode:"0714604143444",img:"/nad.jpg",stock:true},
  {id:91,name:"NAD - Longevidad (60 comp)",price:39490,cost:29691.73,desc:"Nicotinamida Adenina Dinucleótido.",cat:"Longevidad",barcode:"0714604213499",img:"/nad-comp.jpg",stock:true},
  {id:93,name:"NAD con Resveratrol 2 en 1 (60 caps)",price:48950,cost:36804.51,desc:"Regenerador celular premium.",cat:"Longevidad",barcode:"0714604213314",img:"/nad-resveratrol.jpg",stock:true},
  {id:95,name:"NMN (60 caps)",price:40590,cost:30518.80,desc:"Precursor NAD+. Suplemento de longevidad.",cat:"Longevidad",barcode:"0714604143833",img:"/nmn.jpg",stock:true},
  {id:96,name:"NMN (60 comp)",price:38390,cost:28864.66,desc:"Precursor NAD+. Longevidad celular.",cat:"Longevidad",barcode:"0714604213505",img:"/nmn-comp.jpg",stock:true},
  {id:160,name:"NMN con Resveratrol (60 caps)",price:47190,cost:35481.20,desc:"NMN + Resveratrol. Longevidad celular.",cat:"Longevidad",barcode:"0714604213826",img:"/nmn.jpg",stock:true},
  {id:97,name:"Omega 3 (60 caps)",price:27489,cost:20668.42,desc:"Ácidos grasos EPA y DHA. Corazón y cerebro.",cat:"Cardiovascular",barcode:"0714604143468",img:"/omega3.jpg",stock:true},
  {id:99,name:"ORMUX - Regenerador Celular (60 caps)",price:41030,cost:30849.62,desc:"Suplemento regenerador celular.",cat:"Longevidad",barcode:"0714604143482",img:"/ormux.jpg",stock:true},
  {id:102,name:"Óxido Nítrico (60 caps)",price:17490,cost:13150.38,desc:"Vasodilatador natural. Rendimiento.",cat:"Deportivo",barcode:"0714604143512",img:"/oxido-nitrico.jpg",stock:true},
  {id:103,name:"Picolinato de Cromo 250mcg",price:19690,cost:14804.51,desc:"Control glucémico y de peso.",cat:"Control de Peso",barcode:"0714604143826",img:"/picolinato.jpg",stock:true},
  {id:105,name:"Potasio + Magnesio 500mg (60 caps)",price:19250,cost:14473.68,desc:"Electrolitos para corazón y músculos.",cat:"Minerales",barcode:"0714604213246",img:"/potasio-magnesio.jpg",stock:true},
  {id:108,name:"Reishi Hongo (60 caps)",price:27390,cost:20593.98,desc:"Hongo rey. Inmunidad, estrés y vitalidad.",cat:"Hongos Medicinales",barcode:"0714604213598",img:"/reishi.jpg",stock:true},
  {id:109,name:"Resveratrol Antioxidante (60 caps)",price:24750,cost:18609.02,desc:"Rejuvenecedor celular. Antioxidante.",cat:"Antioxidantes",barcode:"0714604143536",img:"/resveratrol.jpg",stock:true},
  {id:110,name:"Resveratrol Antioxidante (60 comp)",price:22990,cost:17285.71,desc:"Rejuvenecedor celular. Antioxidante.",cat:"Antioxidantes",barcode:"0714604213369",img:"/resveratrol-comp.jpg",stock:true},
  {id:111,name:"Sinefrina - Quemador Natural (60 caps)",price:25190,cost:18939.85,desc:"Termogénico natural. Quema grasa.",cat:"Control de Peso",barcode:"0714604143741",img:"/sinefrina.jpg",stock:true},
  {id:112,name:"Sinefrina - Quemador Natural (60 comp)",price:22550,cost:16954.89,desc:"Termogénico natural. Quema grasa.",cat:"Control de Peso",barcode:"0714604213352",img:"/sinefrina-comp.jpg",stock:true},
  {id:114,name:"Spirulina Pura 500mg (60 caps)",price:16390,cost:12323.31,desc:"Superalimento marino. Antioxidante.",cat:"Superfoods",barcode:"0714604213284",img:"/spirulina.jpg",stock:true},
  {id:115,name:"Taurato de Magnesio 500mg (60 caps)",price:19690,cost:14804.51,desc:"Magnesio cardioprotector.",cat:"Magnesio",barcode:"0714604143550",img:"/taurato.jpg",stock:true},
  {id:116,name:"Taurato de Magnesio (60 comp)",price:17589,cost:13224.81,desc:"Magnesio cardioprotector.",cat:"Magnesio",barcode:"0714604213543",img:"/taurato-comp.jpg",stock:true},
  {id:117,name:"Testo Up (60 caps)",price:22990,cost:17285.71,desc:"Precursor de testosterona. Energía y músculo.",cat:"Hormonal",barcode:"0714604143567",img:"/testo-up.jpg",stock:true},
  {id:138,name:"Testo Up (60 comp)",price:21890,cost:16458.65,desc:"Precursor de testosterona natural.",cat:"Hormonal",barcode:"0714604213741",img:"/testo-up-comp.jpg",stock:true},
  {id:118,name:"Tirosina + Yodo (60 caps)",price:17490,cost:13150.38,desc:"Soporte tiroideo. Metabolismo y energía.",cat:"Tiroides",barcode:"0714604213635",img:"/tirosina-yodo.jpg",stock:true},
  {id:119,name:"Treonato de Magnesio 500mg (60 caps)",price:21890,cost:16458.65,desc:"Magnesio cerebral. Memoria.",cat:"Magnesio",barcode:"0714604143581",img:"/treonato.jpg",stock:true},
  {id:120,name:"Treonato de Magnesio (60 comp)",price:20790,cost:15631.58,desc:"Magnesio cerebral. Memoria.",cat:"Magnesio",barcode:"0714604213376",img:"/treonato-comp.jpg",stock:true},
  {id:121,name:"Triptófano (60 caps)",price:17490,cost:13150.38,desc:"Precursor de serotonina. Sueño y calma.",cat:"Estrés & Sueño",barcode:"0714604213437",img:"/triptofano.jpg",stock:true},
  {id:123,name:"Vitamina A Retinol 1000mcg (30 caps)",price:20350,cost:15300.75,desc:"Visión, piel e inmunidad.",cat:"Vitaminas",barcode:"0714604143819",img:"/vitamina-a.jpg",stock:true},
  {id:124,name:"Vitamina B12 (60 caps)",price:16390,cost:12323.31,desc:"Equilibrio sanguíneo y neurológico.",cat:"Vitaminas",barcode:"0714604143604",img:"/vitamina-b12.jpg",stock:true},
  {id:125,name:"Vitamina C 500mg (60 caps)",price:13090,cost:9842.11,desc:"Ácido ascórbico puro. Inmunidad.",cat:"Vitaminas",barcode:"0714604143611",img:"/vitamina-c.jpg",stock:true},
  {id:139,name:"Vitamina C 500mg (60 comp)",price:12650,cost:9511.28,desc:"Ácido ascórbico puro. Inmunidad.",cat:"Vitaminas",barcode:"0714604213758",img:"/vitamina-c-comp.jpg",stock:true},
  {id:126,name:"Vitamina D3 + K2 (60 caps)",price:19690,cost:14804.51,desc:"Salud ósea y cardiovascular.",cat:"Vitaminas",barcode:"0714604143659",img:"/vitamina-d3-k2.jpg",stock:true},
  {id:127,name:"Vitamina D3 + K2 (60 comp)",price:18590,cost:13977.44,desc:"Salud ósea y cardiovascular.",cat:"Vitaminas",barcode:"0714604213512",img:"/vitamina-d3-k2.jpg",stock:true},
  {id:128,name:"Vitamina D3 20mcg (30 caps)",price:14190,cost:10669.17,desc:"Huesos, músculos y sistema nervioso.",cat:"Vitaminas",barcode:"0714604143642",img:"/vitamina-d3.jpg",stock:true},
  {id:149,name:"Whey Protein + Creatina Americana (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero con creatina.",cat:"Proteínas",barcode:"0714604213666",img:"",stock:true},
  {id:148,name:"Whey Protein + Creatina Chocolate (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero con creatina.",cat:"Proteínas",barcode:"0714604143680",img:"",stock:true},
  {id:150,name:"Whey Protein + Creatina Frambuesa (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero con creatina.",cat:"Proteínas",barcode:"0714604213659",img:"",stock:true},
  {id:152,name:"Whey Protein + Glutamina y BCAA Americana (1 kg)",price:68090,cost:51195.49,desc:"Proteína completa con recuperadores.",cat:"Proteínas",barcode:"0714604213680",img:"",stock:true},
  {id:151,name:"Whey Protein + Glutamina y BCAA Chocolate (1 kg)",price:68090,cost:51195.49,desc:"Proteína completa con recuperadores.",cat:"Proteínas",barcode:"0714604143697",img:"",stock:true},
  {id:153,name:"Whey Protein + Glutamina y BCAA Frambuesa (1 kg)",price:68090,cost:51195.49,desc:"Proteína completa con recuperadores.",cat:"Proteínas",barcode:"0714604213673",img:"",stock:true},
  {id:155,name:"Whey Protein + Testo Americana (1 kg)",price:68090,cost:51195.49,desc:"Whey con precursores de testosterona.",cat:"Proteínas",barcode:"0714604213703",img:"",stock:true},
  {id:154,name:"Whey Protein + Testo Chocolate (1 kg)",price:68090,cost:51195.49,desc:"Whey con precursores de testosterona.",cat:"Proteínas",barcode:"0714604213529",img:"",stock:true},
  {id:156,name:"Whey Protein + Testo Frambuesa (1 kg)",price:68090,cost:51195.49,desc:"Whey con precursores de testosterona.",cat:"Proteínas",barcode:"0714604213697",img:"",stock:true},
  {id:144,name:"Whey Protein 80% Americana (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero. Sabor americana.",cat:"Proteínas",barcode:"0714604213734",img:"",stock:true},
  {id:143,name:"Whey Protein 80% Chocolate (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero. Sabor chocolate.",cat:"Proteínas",barcode:"0714604213710",img:"",stock:true},
  {id:145,name:"Whey Protein 80% Frambuesa (1 kg)",price:65890,cost:49541.35,desc:"Proteína de suero. Sabor frambuesa.",cat:"Proteínas",barcode:"0714604213727",img:"",stock:true},
  {id:136,name:"ZMA Zinc-Magnesio-B6 (60 caps)",price:16390,cost:12323.31,desc:"Recuperación nocturna. Testosterona y sueño.",cat:"Deportivo",barcode:"0714604143727",img:"/zma.jpg",stock:true},
  {id:157,name:"Kit Active Vital - Óxido Nítrico + NAD + BCAA",price:71250,cost:53571.43,desc:"Kit energía y rendimiento. 3 productos.",cat:"Kits",barcode:"KIT-ACTIVE",isKit:true,img:"",stock:true},
  {id:159,name:"Kit Daily Energy - Cúrcuma + NAD + Malato Mg",price:71250,cost:53571.43,desc:"Kit energía diaria. 3 productos.",cat:"Kits",barcode:"KIT-DAILY",isKit:true,img:"",stock:true},
  {id:66,name:"Kit Hongo Cándida (180 caps)",price:48290,cost:36308.27,desc:"Protocolo antifúngico completo.",cat:"Kits",barcode:"KIT-CANDIDA",isKit:true,img:"",stock:true},
  {id:158,name:"Kit Skin Balance - Omega 3 + CoQ10 + Centella",price:73340,cost:55142.86,desc:"Kit salud de la piel. 3 productos.",cat:"Kits",barcode:"KIT-SKIN",isKit:true,img:"",stock:true},
  {id:92,name:"Kit NAD + Resveratrol Antiage (120 caps)",price:59290,cost:44578.95,desc:"Kit longevidad. Regeneración celular.",cat:"Kits",barcode:"KIT-NAD",isKit:true,img:"",stock:true},
];

const KITS_ROTACION=[
  {id:"k1",name:"Kit Arranque Dietética",subtitle:"Ideal para dietéticas y herboristerías",products:["Vitamina C 500mg","Vitamina D3 + K2","Omega 3","Magnesio Quelatado","Spirulina"],investment:"~$88.000 mayorista",ganancia:"~$117.000 PVP",margen:"33%",icon:"🌿",nicho:"Dietéticas"},
  {id:"k2",name:"Kit Rendimiento Gym",subtitle:"Para gimnasios y entrenadores",products:["Creatina 300gr","BCAA Aminoácidos","L-Glutamina","ZMA","Óxido Nítrico"],investment:"~$92.000 mayorista",ganancia:"~$122.000 PVP",margen:"33%",icon:"💪",nicho:"Gimnasios"},
  {id:"k3",name:"Kit Bienestar Profesional",subtitle:"Para nutricionistas y médicos",products:["Ashwagandha","Multi Magnesio 5 en 1","Inulina Prebiótico","Ginkgo Biloba","Triptófano"],investment:"~$95.000 mayorista",ganancia:"~$126.000 PVP",margen:"33%",icon:"🩺",nicho:"Profesionales"},
  {id:"k4",name:"Kit Longevidad Premium",subtitle:"Alta rentabilidad, nicho en crecimiento",products:["NMN","NAD con Resveratrol","Glutatión","Astaxantina 10mg","Coenzima Q10"],investment:"~$145.000 mayorista",ganancia:"~$193.000 PVP",margen:"33%",icon:"⚡",nicho:"Longevidad"},
  {id:"k5",name:"Kit Hormonal Mujer",subtitle:"Emprendedoras y consultas femeninas",products:["Lady Balance","INOSITOL B8","Maca Peruana","Ácido Fólico","Centella Asiática"],investment:"~$80.000 mayorista",ganancia:"~$107.000 PVP",margen:"33%",icon:"🌸",nicho:"Emprendedoras"},
  {id:"k6",name:"Kit Control de Peso",subtitle:"Alta rotación todo el año",products:["Garcinia Cambogia","Sinefrina","Picolinato de Cromo","Fucus Plus","Cafeína + Guaraná"],investment:"~$77.000 mayorista",ganancia:"~$103.000 PVP",margen:"33%",icon:"🔥",nicho:"Control Peso"},
];

const CAT_MAP={"Aceites Esenciales":"Aceites","Antioxidantes":"Antioxidantes","Antiage & Piel":"Belleza & Piel","Antiinflamatorio":"Antiinflamatorio","Cardiovascular":"Corazón","Control de Peso":"Peso","Deportivo":"Deportivo","Estrés & Sueño":"Estrés & Sueño","Hormonal":"Hormonal","Hongos Medicinales":"Hongos","Kits":"Kits","Longevidad":"Longevidad","Magnesio":"Magnesio","Minerales":"Minerales","Neurológico":"Neurológico","Proteínas":"Proteínas","Salud Intestinal":"Intestino","Superfoods":"Superfoods","Tiroides":"Tiroides","Vitaminas":"Vitaminas"};
const CATEGORIES=["Todos",...[...new Set(Object.values(CAT_MAP))].sort()];
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
  const [newP,setNewP]=useState({name:"",price:"",cost:"",desc:"",cat:"",barcode:""});
  const [imgPrev,setImgPrev]=useState("");
  const [tracking,setTracking]=useState({});
  const [pagina,setPagina]=useState(1);
  const POR_PAGINA=24;
  const [form,setForm]=useState({name:"",phone:"",address:"",notes:""});
  const fileRef=useRef();
  const editFileRef=useRef();

  const cartQty=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.cost*i.qty,0);

  const filtered=useMemo(()=>{
    const q=search.toLowerCase().trim();
    return products.filter(p=>{
      const mc=CAT_MAP[p.cat]||p.cat;
      const matchCat=cat==="Todos"||mc===cat;
      const matchSearch=!q||p.name.toLowerCase().includes(q)||(p.desc&&p.desc.toLowerCase().includes(q))||(p.barcode&&p.barcode.includes(q));
      return matchCat&&matchSearch;
    });
  },[products,cat,search]);

  const paginados=useMemo(()=>filtered.slice(0,pagina*POR_PAGINA),[filtered,pagina]);

  function addCart(p){if(p.stock===false)return;setCart(prev=>{const ex=prev.find(i=>i.id===p.id);if(ex)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);return[...prev,{...p,qty:1}];});setCartOpen(true);}
  function remCart(id){setCart(p=>p.filter(i=>i.id!==id));}
  function updQty(id,q){if(q<1)return remCart(id);setCart(p=>p.map(i=>i.id===id?{...i,qty:q}:i));}

  function doCheckout(){
    if(!form.name||!form.phone||!form.address)return;
    const o={id:Date.now(),items:cart,total:cartTotal,customer:form,status:"Pendiente",tracking:"",date:new Date().toLocaleString("es-AR")};
    setOrders(p=>[o,...p]);
    const msg=encodeURIComponent(`🛒 *Nuevo pedido — Punto Vital*\n\n👤 *Cliente:* ${form.name}\n📞 ${form.phone}\n📍 ${form.address}${form.notes?`\n📝 ${form.notes}`:""}\n\n*Productos:*\n${cart.map(i=>`• ${i.name} x${i.qty} — ${fmt(i.cost*i.qty)}`).join("\n")}\n\n💰 *Total: ${fmt(cartTotal)}*\n💳 Transferencia bancaria`);
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
  function saveNew(){if(!newP.name||!newP.price)return;setProducts(p=>[...p,{...newP,id:Date.now(),price:Number(newP.price),cost:Number(newP.cost)||0,stock:true}]);setNewP({name:"",price:"",cost:"",desc:"",cat:"",barcode:""});setImgPrev("");}
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
    cardBody:{padding:"14px 16px 16px"},
    cardCat:{fontSize:11,color:blue,fontWeight:700,textTransform:"uppercase",letterSpacing:.8},
    cardName:{fontSize:15,fontWeight:600,margin:"3px 0 6px",lineHeight:1.3},
    cardBtn:(s)=>({background:s===false?"#ccc":blue,color:white,border:"none",borderRadius:12,padding:"9px 0",cursor:s===false?"not-allowed":"pointer",fontSize:13,fontWeight:600,width:"100%",marginTop:8,opacity:s===false?0.5:1}),
    filters:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},
    filterBtn:(a)=>({background:a?blue:white,color:a?white:gray,border:`1px solid ${a?blue:"#d2d2d7"}`,borderRadius:20,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:a?600:400,whiteSpace:"nowrap"}),
    searchBox:{width:"100%",border:"1px solid #d2d2d7",borderRadius:14,padding:"12px 16px",fontSize:15,outline:"none",fontFamily:"inherit",marginBottom:16,boxSizing:"border-box"},
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
        <div style={{fontSize:12,letterSpacing:4,opacity:.6,textTransform:"uppercase",marginBottom:16}}>Distribuidora Nutracéutica</div>
        <h1 style={S.heroTitle}>Punto <span style={S.heroBlue}>Vital</span></h1>
        <p style={S.heroSub}>Acompañamos el crecimiento de profesionales, emprendedores y negocios con suplementos de alta calidad y stock inmediato.</p>
        <button style={S.heroBtn} onClick={()=>setPage("store")}>Ver catálogo completo</button>
        <button style={S.heroBtnOut} onClick={()=>document.getElementById("kits")?.scrollIntoView({behavior:"smooth"})}>Kits de alta rotación ↓</button>
      </div>
      <div style={{background:white,borderBottom:"1px solid #f0f0f5"}}>
        <div style={{...S.section,padding:"32px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:24,textAlign:"center"}}>
            {[["130+","Productos disponibles"],["Stock inmediato","Sin esperas"],["Mismo día","Pedidos hasta las 13hs"],["33%+","Margen de ganancia"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:28,fontWeight:800,color:blue,letterSpacing:-1}}>{v}</div><div style={{fontSize:13,color:gray,marginTop:4}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>¿Para quién es Punto Vital?</div>
        <p style={S.sectionSub}>Pensamos en nichos donde no se necesitan grandes inversiones para empezar a ganar.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {[{icon:"🩺",title:"Nutricionistas & Médicos",desc:"Complementá tus consultas con suplementos de calidad."},{icon:"🌿",title:"Dietéticas & Herboristerías",desc:"Amplía tu góndola con los productos de mayor rotación."},{icon:"💪",title:"Gimnasios & Entrenadores",desc:"Vende directamente a tus alumnos."},{icon:"🚀",title:"Emprendedores",desc:"Empezá con un kit básico y escalá gradualmente."},{icon:"🌸",title:"Emprendedoras de bienestar",desc:"Productos hormonales, antiage y control de peso."},{icon:"📦",title:"Revendedores online",desc:"Stock real. Envíos el mismo día."}].map(n=>(
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
            ✅ <b>Stock real e inmediato</b> — Sin preventa, sin esperas
          </div>
        </div>
      </div>
      <div style={S.section} id="kits">
        <div style={S.sectionTitle}>Kits de alta rotación</div>
        <p style={S.sectionSub}>Selección estratégica para empezar a ganar rápido.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
          {KITS_ROTACION.map(k=>(
            <div key={k.id} style={{background:white,borderRadius:18,padding:24,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",border:`1px solid ${lightBlue}`}}>
              <span style={S.kitTag}>{k.nicho}</span>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>{k.icon} {k.name}</div>
              <div style={{fontSize:13,color:gray,marginBottom:12}}>{k.subtitle}</div>
              <div style={{background:lightGray,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
                {k.products.map(p=><div key={p} style={{fontSize:12,color:gray,padding:"2px 0"}}>• {p}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
                <div style={{background:"#fef3c7",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#92400e",fontWeight:600,textTransform:"uppercase"}}>Inversión</div><div style={{fontSize:11,fontWeight:800,color:"#92400e",marginTop:2}}>{k.investment}</div></div>
                <div style={{background:"#d1fae5",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#065f46",fontWeight:600,textTransform:"uppercase"}}>PVP</div><div style={{fontSize:11,fontWeight:800,color:"#065f46",marginTop:2}}>{k.ganancia}</div></div>
                <div style={{background:lightBlue,borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:darkBlue,fontWeight:600,textTransform:"uppercase"}}>Margen</div><div style={{fontSize:22,fontWeight:800,color:blue,lineHeight:1,marginTop:2}}>{k.margen}</div></div>
              </div>
              <button style={{...S.btn,marginTop:14,fontSize:13,padding:"10px 0"}} onClick={()=>setPage("store")}>Ver productos →</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:dark,color:white,textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontSize:28,fontWeight:700,letterSpacing:-.5,marginBottom:12}}>¿Listo para empezar?</div>
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:15,marginBottom:28}}>Pedido mínimo accesible · Stock inmediato · Soporte personalizado</div>
        <button style={{...S.heroBtn,fontSize:16,padding:"14px 36px"}} onClick={()=>setPage("store")}>Ver catálogo →</button>
        <div style={{marginTop:16}}><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{color:"#60a5fa",fontSize:14,textDecoration:"none"}}>💬 Consultar por WhatsApp</a></div>
      </div>
    </div>
  );

  const Store=()=>(
    <div style={S.section}>
      <div style={{marginBottom:16}}>
        <div style={S.sectionTitle}>Catálogo Punto Vital</div>
        <div style={{color:gray,fontSize:14,marginBottom:12}}>{filtered.length} de {products.length} productos · Stock inmediato</div>
        <input style={S.searchBox} placeholder="🔍 Buscar por nombre o código de barras..." value={search} onChange={e=>{setSearch(e.target.value);setPagina(1);}}/>
        <div style={S.filters}>
          {CATEGORIES.map(c=><button key={c} style={S.filterBtn(cat===c)} onClick={()=>{setCat(c);setPagina(1);}}>{c}</button>)}
        </div>
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",color:gray,padding:"40px 0"}}>No se encontraron productos.</div>
        :<>
          <div style={S.grid}>
            {paginados.map(p=>(
              <div key={p.id} style={S.card}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.06)";}}>
                {p.img
                  ?<img src={p.img} alt={p.name} style={{width:"100%",height:180,objectFit:"cover",display:"block",cursor:"pointer"}} onClick={()=>setDetail(p)}/>
                  :<div style={{width:"100%",height:180,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,cursor:"pointer"}} onClick={()=>setDetail(p)}>🌿</div>}
                <div style={S.cardBody}>
                  <div style={p.isKit?S.kitTag:S.cardCat}>{p.cat}</div>
                  <div style={S.cardName}>{p.name}</div>
                  <div style={{fontSize:11,color:gray,lineHeight:1.4,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</div>
                  <div style={{marginBottom:4}}>
                    <div style={{fontSize:10,color:gray}}>Precio mayorista</div>
                    <div style={{fontSize:16,fontWeight:800,color:dark}}>{fmt(p.cost)}</div>
                  </div>
                  <div style={{background:"#f0fdf4",borderRadius:8,padding:"5px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontSize:10,color:"#2d5a27",fontWeight:600}}>PVP sugerido</div>
                    <div style={{fontSize:13,fontWeight:800,color:"#2d5a27"}}>{fmt(p.price)}</div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontSize:10,color:blue,fontWeight:600}}>Ganancia: {fmt(p.price-p.cost)}</div>
                    <div style={{fontSize:10,color:p.stock===false?"#ff3b30":"#2d5a27",fontWeight:600}}>{p.stock===false?"❌ Sin stock":"✅ Stock"}</div>
                  </div>
                  <button style={S.cardBtn(p.stock)} disabled={p.stock===false} onClick={()=>addCart(p)}>
                    {p.stock===false?"Sin stock":"Agregar al carrito"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length>paginados.length&&(
            <div style={{textAlign:"center",marginTop:32}}>
              <button style={{...S.btn,width:"auto",padding:"12px 40px"}} onClick={()=>setPagina(p=>p+1)}>
                Ver más ({filtered.length-paginados.length} productos restantes)
              </button>
            </div>
          )}
        </>}
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
                <div style={{color:gray,fontSize:12}}>{fmt(i.cost)} mayorista</div>
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
            <span>Total mayorista</span><span style={{color:blue}}>{fmt(cartTotal)}</span>
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
        <p style={{fontSize:11,color:gray,textAlign:"center",marginTop:10}}>Al confirmar se abrirá WhatsApp con el resumen</p>
      </div>
    </div>
  );

  const Detail=({p})=>(
    <div style={S.overlay} onClick={()=>setDetail(null)}>
      <div style={{...S.modal,maxWidth:460}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setDetail(null)}>×</button>
        {p.img?<img src={p.img} alt={p.name} style={{width:"100%",height:200,objectFit:"cover",borderRadius:12,marginBottom:16}}/>
          :<div style={{width:"100%",height:140,background:lightBlue,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,marginBottom:16}}>🌿</div>}
        <span style={p.isKit?S.kitTag:S.tag}>{p.cat}</span>
        <div style={{fontSize:22,fontWeight:700,margin:"4px 0 8px"}}>{p.name}</div>
        <div style={{color:gray,fontSize:14,lineHeight:1.6,marginBottom:12}}>{p.desc}</div>
        {p.barcode&&<div style={{fontSize:11,color:gray,marginBottom:12,fontFamily:"monospace"}}>Código: {p.barcode}</div>}
        <div style={{background:lightGray,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,color:gray}}>Precio mayorista</span>
            <span style={{fontSize:16,fontWeight:800}}>{fmt(p.cost)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,color:"#2d5a27",fontWeight:600}}>PVP sugerido</span>
            <span style={{fontSize:16,fontWeight:800,color:"#2d5a27"}}>{fmt(p.price)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:13,color:blue,fontWeight:600}}>Tu ganancia</span>
            <span style={{fontSize:16,fontWeight:800,color:blue}}>{fmt(p.price-p.cost)}</span>
          </div>
        </div>
        <button style={{...S.btn,opacity:p.stock===false?0.4:1}} disabled={p.stock===false} onClick={()=>{if(p.stock!==false){addCart(p);setDetail(null);}}}>
          {p.stock===false?"Sin stock":"Agregar al carrito"}
        </button>
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
                <div style={{fontSize:11,color:gray}}>{p.cat} · Mayorista: {fmt(p.cost)} · PVP: {fmt(p.price)}</div>
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
          <input style={S.inp} placeholder="Precio mayorista (tu costo) *" type="number" value={newP.cost||""} onChange={e=>setNewP(p=>({...p,cost:e.target.value}))}/>
          <input style={S.inp} placeholder="Precio PVP sugerido *" type="number" value={newP.price} onChange={e=>setNewP(p=>({...p,price:e.target.value}))}/>
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
            <input style={S.inp} placeholder="Precio mayorista" type="number" value={editP.cost||""} onChange={e=>setEditP(p=>({...p,cost:e.target.value}))}/>
            <input style={S.inp} placeholder="Precio PVP" type="number" value={editP.price} onChange={e=>setEditP(p=>({...p,price:e.target.value}))}/>
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
      {page==="home"&&Presentation()}
      {page==="store"&&Store()}
      {page==="admin"&&(adminLogged?AdminPanel():AdminLogin())}
      {page!=="admin"&&(
        <div style={{background:dark,color:white,textAlign:"center",padding:"24px 20px"}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>● Punto Vital</div>
          <div style={{opacity:.5,fontSize:12}}>Distribuidora de Alimentos Nutracéuticos · Argentina</div>
        </div>
      )}
      {cartOpen&&Cart()}
      {checkoutOpen&&Checkout()}
      {detail&&Detail({p:detail})}
      {orderDone&&<div style={S.success}>✅ ¡Pedido confirmado y enviado por WhatsApp!</div>}
    </div>
  );
}
