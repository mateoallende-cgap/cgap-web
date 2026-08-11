// Tratamientos de medicina y cosmetología estética.
// Fuentes: lista de precios interna de CGAP (PDF "CGAP ESTÉTICA", slugs y
// cobertura) y el documento de referencia para secretarías (PDF "Datos
// Estetica", definiciones y beneficios más detallados). Se excluyeron
// precios, porcentajes de operadora, combos/packs promocionales y datos
// internos (scripts de WhatsApp, alias de transferencia, nombres de
// profesionales puntuales). Las definiciones son generales, redactadas para
// un público no médico (no reemplazan indicación profesional).
//
// categoria: "corporal" | "depilacion-femenina" | "depilacion-masculina" |
//            "medico" (inyectables/láser/tecnología, a cargo de médica) |
//            "cosmetologico" (higiene facial, cejas/pestañas, masajes, spa)
// beneficios: opcional, array de puntos tal como los lista CGAP para ese
//             tratamiento (no todos los tratamientos tienen esta info en la
//             fuente).
window.TRATAMIENTOS_ESTETICA = [
  // ---------- Corporales ----------
  {
    "nombre": "Criolipólisis",
    "slug": "criolipolisis",
    "categoria": "corporal",
    "descripcion": "Método no invasivo y eficaz para reducir adiposidad localizada mediante enfriamiento controlado de la célula grasa, que provoca su muerte natural (apoptosis) y su posterior eliminación por el organismo. Se aplica en brazos, abdomen, piernas y la zona conocida como \"pantalón de montar\".",
    "beneficios": [
      "Reduce hasta un 25% de la adiposidad en la zona tratada",
      "Sesiones rápidas, de aproximadamente 30 minutos cada una",
      "Sin dolor y sin tiempos de recuperación",
      "Se realiza una vez cada 30 días"
    ]
  },
  {
    "nombre": "Venus Legacy / VelaShape",
    "slug": "venus-legacy-velashape",
    "categoria": "corporal",
    "descripcion": "Tratamiento médico estético no invasivo que combina radiofrecuencia multipolar, campos electromagnéticos y vacuumterapia, logrando modelación corporal, reducción de adiposidad localizada y mejora de la celulitis con resultados visibles desde las primeras sesiones.",
    "beneficios": [
      "Estimula la producción de colágeno y elastina, tensando la piel",
      "El calor profundo ayuda a transformar la adiposidad localizada en energía",
      "Su sistema de drenaje linfático mejora la circulación y la piel de naranja",
      "Seguro, indoloro y sin tiempo de recuperación, con resultados duraderos"
    ]
  },
  {
    "nombre": "Mio Up",
    "slug": "mio-up",
    "categoria": "corporal",
    "descripcion": "Tratamiento de electroestimulación por pulsos electromagnéticos focalizados, que genera contracciones musculares intensas —muy por encima de lo que logra el ejercicio voluntario— para tonificar y fortalecer la zona tratada.",
    "beneficios": ["Aumenta el tejido muscular y la fuerza y firmeza de la zona", "Ayuda a disminuir la adiposidad localizada", "Disminuye la apariencia de la celulitis", "Favorece la circulación sanguínea", "Es indoloro: no genera molestia durante la sesión"]
  },
  {
    "nombre": "Tratamiento reductor y reafirmante (masajes)",
    "slug": "tratamiento-reductor-reafirmante",
    "categoria": "corporal",
    "descripcion": "Masajes manuales orientados a reducir medidas y mejorar la firmeza de la piel, estimulando la circulación local y el drenaje de líquidos.",
    "beneficios": ["Ayuda a reducir medidas y a mejorar la firmeza de la piel", "Estimula la circulación local y el drenaje de líquidos", "Contribuye a mejorar el aspecto de la piel de naranja"]
  },
  {
    "nombre": "Presoterapia",
    "slug": "presoterapia",
    "categoria": "corporal",
    "descripcion": "Tratamiento que utiliza un sistema de compresión neumática progresiva sobre piernas y/o abdomen para mejorar la circulación, reducir la retención de líquidos y aliviar la sensación de piernas cansadas.",
    "beneficios": ["Favorece el retorno venoso y mejora la circulación sanguínea", "Ayuda a eliminar toxinas y líquidos retenidos", "Alivia la sensación de piernas cansadas e hinchadas", "Contribuye a disminuir la apariencia de la celulitis"]
  },
  {
    "nombre": "Drenaje linfático manual",
    "slug": "drenaje-linfatico-manual",
    "categoria": "corporal",
    "descripcion": "Técnica de masaje suave que estimula el sistema linfático, favoreciendo la eliminación de toxinas y líquidos retenidos en el cuerpo. Se realiza de forma personalizada según cada paciente.",
    "beneficios": [
      "Reduce la hinchazón y la pesadez de piernas, ideal para quienes pasan mucho tiempo de pie o sentados",
      "Mejora la circulación y el transporte de oxígeno y nutrientes a los tejidos",
      "Ayuda a depurar el organismo y a prevenir la celulitis",
      "Relaja los músculos y reduce el estrés y la tensión",
      "Recomendado también para personas con retención de líquidos, embarazadas o en recuperación postoperatoria"
    ]
  },
  {
    "nombre": "Tratamiento post quirúrgico (ultrasonido + masajes)",
    "slug": "post-quirurgico-ultrasonido-masajes",
    "categoria": "corporal",
    "descripcion": "Tratamiento de recuperación posterior a una cirugía estética, que combina ultrasonido y masajes manuales para reducir la inflamación, prevenir fibrosis y favorecer una mejor cicatrización.",
    "beneficios": ["Favorece el drenaje linfático, reduciendo el riesgo de fibrosis y seromas", "Ayuda a disminuir la inflamación y los moretones", "Mejora la circulación y la textura de la piel en la zona tratada", "Contribuye a una recuperación más rápida y cómoda"]
  },
  {
    "nombre": "HIFU corporal",
    "slug": "hifu-corporal",
    "categoria": "corporal",
    "descripcion": "Tratamiento de ultrasonido focalizado de alta intensidad (HIFU) que estimula la producción de colágeno en profundidad para reafirmar y tensar la piel del cuerpo.",
    "beneficios": ["Genera un efecto lifting no quirúrgico, mejorando la firmeza y el tono de la piel", "Estimula la producción de colágeno", "Ayuda a reducir la apariencia de la celulitis", "Contribuye a definir el contorno corporal (abdomen, brazos, espalda, cintura, muslos y glúteos)"]
  },

  // ---------- Tratamientos médicos (inyectables, láser, tecnología) ----------
  {
    "nombre": "Ácido hialurónico",
    "slug": "acido-hialuronico",
    "categoria": "medico",
    "descripcion": "Sustancia que se encuentra de forma natural en la piel, donde retiene humedad y aporta elasticidad; sus niveles disminuyen con el tiempo, favoreciendo la aparición de arrugas. Como relleno dérmico inyectable, rellena arrugas y surcos, aporta volumen y estimula la producción natural de colágeno y elastina.",
    "beneficios": [
      "Labios: aumenta el volumen, define el contorno y corrige asimetrías",
      "Pómulos: restaura el volumen perdido y define los contornos faciales",
      "Surcos nasogenianos: atenúa las líneas que van desde la nariz hasta los ángulos de la boca",
      "Mentón: define el perfil facial y equilibra las proporciones",
      "También se aplica en contorno de ojos y labio superior"
    ]
  },
  {
    "nombre": "Armonización facial",
    "slug": "armonizacion-facial",
    "categoria": "medico",
    "descripcion": "Plan de tratamiento personalizado que combina distintas técnicas (rellenos, toxina botulínica, bioestimuladores, entre otras) para mejorar el equilibrio y la proporción de los rasgos del rostro, definido en una consulta previa con la profesional.",
    "beneficios": ["Resultados naturales y personalizados, adaptados a los rasgos de cada rostro", "Combina distintas técnicas según lo que cada paciente necesite", "Se define en una consulta previa con la profesional"]
  },
  {
    "nombre": "Botox / Toxina botulínica",
    "slug": "botox-toxina-botulinica",
    "categoria": "medico",
    "descripcion": "Sustancia purificada que se inyecta en pequeñas cantidades para relajar los músculos faciales responsables de las líneas de expresión, suavizando las arrugas dinámicas y previniendo la aparición de nuevas. Los resultados suelen verse en pocos días, con máximo efecto en 1-2 semanas, y duran generalmente entre 3 y 6 meses.",
    "beneficios": [
      "Suaviza arrugas en frente, entrecejo y alrededor de los ojos",
      "Puede crear un efecto lifting suave en las cejas, abriendo la mirada",
      "Define el óvalo facial y suaviza las líneas de expresión alrededor de la boca",
      "También se utiliza para tratar la sudoración excesiva (hiperhidrosis)",
      "Procedimiento rápido, con muy poca recuperación y resultados naturales"
    ]
  },
  {
    "nombre": "Cellbooster Shape",
    "slug": "cellbooster-shape",
    "categoria": "medico",
    "descripcion": "Bioestimulador inyectable a base de ácido hialurónico no reticulado con L-carnitina y vitamina C, que mejora la calidad de la piel y ayuda a reducir depósitos de grasa localizada en zonas puntuales del rostro, como la papada.",
    "beneficios": ["Reduce la retención de agua y disminuye la hinchazón, mejorando la microcirculación", "Favorece la movilización de la grasa localizada", "Mejora la hidratación y el tono de la piel"]
  },
  {
    "nombre": "Criocirugía",
    "slug": "criocirugia",
    "categoria": "medico",
    "descripcion": "Procedimiento que utiliza frío extremo (generalmente nitrógeno líquido) para eliminar lesiones cutáneas benignas, como verrugas o queratosis.",
    "beneficios": ["Alta efectividad en la eliminación de lesiones benignas", "Procedimiento rápido, de solo unos segundos por lesión", "Mínimamente invasivo, sin necesidad de anestesia general ni suturas", "Recuperación rápida, con retorno inmediato a las actividades habituales"]
  },
  {
    "nombre": "Dr. Pen - Microneedling",
    "slug": "dr-pen-microneedling",
    "categoria": "medico",
    "descripcion": "Dispositivo de microagujas que realiza pequeñas perforaciones controladas en la piel, estimulando la producción natural de colágeno y elastina, la regeneración celular y mejorando la textura y firmeza de la piel.",
    "beneficios": [
      "Reduce arrugas y líneas de expresión",
      "Mejora la apariencia de cicatrices, especialmente de acné",
      "Aporta mayor luminosidad y aspecto saludable",
      "Tratamiento personalizado: la profundidad de las microagujas se ajusta según cada necesidad",
      "Apto para todo tipo de piel; se aplica en rostro y escote"
    ]
  },
  {
    "nombre": "Enzimas PB Serum",
    "slug": "enzimas-pb-serum",
    "categoria": "medico",
    "descripcion": "Tratamiento inyectable con enzimas recombinantes (lipasa, colagenasa, hialuronidasa) que ayudan a disolver grasa localizada, mejorar la retención de líquidos y estimular la producción de colágeno y elastina, aplicable en rostro o cuerpo según la zona a tratar.",
    "beneficios": ["Reduce arrugas y líneas de expresión", "Mejora la firmeza y elasticidad de la piel", "Ayuda a disminuir la flacidez y a tratar la celulitis", "Menos agresivo que un peeling químico, con bajo riesgo de irritación"]
  },
  {
    "nombre": "Harmonyca",
    "slug": "harmonyca",
    "categoria": "medico",
    "descripcion": "Combina ácido hialurónico y aminoácidos para estimular la producción de colágeno y elastina, mejorando la textura y firmeza de la piel y proporcionando un efecto lifting sutil.",
    "beneficios": [
      "Resultados naturales y duraderos, estimulando la producción de colágeno propio del cuerpo",
      "Versátil: se puede aplicar en distintas zonas del rostro y cuerpo",
      "Mínimo tiempo de recuperación"
    ]
  },
  {
    "nombre": "Hidrolipoclasia ultrasónica",
    "slug": "hidrolipoclasia-ultrasonica",
    "categoria": "medico",
    "descripcion": "Técnica que combina la infiltración de suero fisiológico con ultrasonido para romper las células de grasa localizada de forma no invasiva.",
    "beneficios": ["No invasiva, sin necesidad de quirófano ni hospitalización", "Recuperación inmediata, sin tiempos de reposo", "Puede ayudar a mejorar la apariencia de la celulitis", "Estimula la producción de colágeno, aportando firmeza a la piel", "Resultados visibles desde la primera sesión"]
  },
  {
    "nombre": "HIFU facial 12D",
    "slug": "hifu-facial-12d",
    "categoria": "medico",
    "descripcion": "Equipo de ultrasonido focalizado de alta densidad que realiza disparos puntuales, lineales y circulares en distintas profundidades de la piel de rostro y cuello (7 cabezales, más de 1500 disparos por zona), logrando una cobertura más intensa y completa que el HIFU tradicional.",
    "beneficios": [
      "Tensado progresivo de la piel",
      "Estimula colágeno y elastina",
      "Elimina arrugas y líneas de expresión",
      "Mejora la definición del contorno facial",
      "Procedimiento bidireccional, 2,5 veces más rápido y con menos dolor que el HIFU tradicional; se recomienda 1 sesión por año"
    ]
  },
  {
    "nombre": "Láser CO2",
    "slug": "laser-co2",
    "categoria": "medico",
    "descripcion": "Tratamiento mínimamente invasivo que rejuvenece la piel: su luz concentrada vaporiza las capas superficiales, estimulando la producción de colágeno y elastina. También se utiliza para atenuar estrías (en abdomen, muslos, cadera y otras zonas) y en procedimientos como la blefaroplastia no quirúrgica de párpados.",
    "beneficios": [
      "Reduce arrugas y líneas de expresión",
      "Mejora la textura y unifica el tono de la piel",
      "Disminuye poros abiertos",
      "Atenúa cicatrices de acné, otras lesiones y estrías",
      "Elimina manchas solares y melasma",
      "Requiere tiempo de recuperación según la profundidad y zona tratada; para estrías se aconsejan aproximadamente 3 sesiones"
    ]
  },
  {
    "nombre": "Long Lasting",
    "slug": "long-lasting",
    "categoria": "medico",
    "descripcion": "Bioestimulador dérmico de nueva generación que combina ácido hialurónico reticulado de alto peso molecular con un complejo de aminoácidos, estimulando la producción de colágeno y elastina para restaurar la calidad de la piel.",
    "beneficios": ["Mejora visible en la firmeza, luminosidad y textura de la piel", "Hidrata en profundidad sin modificar los rasgos del rostro", "Efecto progresivo y de larga duración"]
  },
  {
    "nombre": "Luz pulsada",
    "slug": "luz-pulsada",
    "categoria": "medico",
    "descripcion": "Tratamiento médico estético con luz intensa pulsada (IPL) para tratar lesiones de la piel, tanto pigmentarias (manchas, lentigos solares) como vasculares (arañitas vasculares, telangiectasias, angiomas, rosácea).",
    "beneficios": [
      "Estimula la producción de colágeno, mejorando la calidad de la piel",
      "Cierra poros dilatados y disminuye arrugas finas",
      "Elimina manchas y rojeces, dejando un tono uniforme y saludable"
    ]
  },
  {
    "nombre": "Mesoterapia Classic",
    "slug": "mesoterapia-classic",
    "categoria": "medico",
    "descripcion": "Técnica médica de microinyecciones intradérmicas con vitaminas, minerales, ácido hialurónico y otros activos nacionales, que estimulan la regeneración natural de la piel del rostro, el cuerpo o el cuero cabelludo (meso capilar). Se realizan sesiones cada 7 a 15 días, generalmente entre 6 y 10 según la necesidad de cada paciente.",
    "beneficios": [
      "Facial: estimula colágeno y elastina, hidrata en profundidad y devuelve luminosidad y firmeza",
      "Corporal: ayuda a disolver células grasas, define contornos y mejora firmeza y elasticidad",
      "Capilar: fortalece folículos, reduce la caída y estimula el crecimiento del cabello"
    ]
  },
  {
    "nombre": "Mesoterapia Premium",
    "slug": "mesoterapia-premium",
    "categoria": "medico",
    "descripcion": "Variante de mesoterapia con activos internacionales de mayor concentración, orientada a potenciar la revitalización de la piel del rostro o el cuerpo.",
    "beneficios": ["Mayor concentración de activos que la variante Classic, para potenciar la revitalización de la piel"]
  },
  {
    "nombre": "Mesoterapia capilar (Tranexámico, Dutasteride, Minoxidil)",
    "slug": "mesoterapia-capilar-tranexamico-dutasteride-minoxidil",
    "categoria": "medico",
    "descripcion": "Mesoterapia con una combinación específica de ácido tranexámico, dutasteride y minoxidil, orientada al tratamiento de manchas (melasma) a nivel facial o a estimular el crecimiento del cabello y fortalecer los folículos a nivel capilar.",
    "beneficios": ["Para manchas (melasma): ayuda a atenuar la pigmentación", "A nivel capilar: fortalece los folículos y ayuda a reducir la caída del cabello"]
  },
  {
    "nombre": "Peeling dermatológico",
    "slug": "peeling-dermatologico",
    "categoria": "medico",
    "descripcion": "Procedimiento médico que utiliza sustancias químicas más concentradas para exfoliar las capas más profundas de la piel. Esta exfoliación controlada estimula la regeneración celular y la producción de colágeno.",
    "beneficios": [
      "Reduce significativamente arrugas profundas y líneas de expresión",
      "Atenúa manchas solares, melasma y otras hiperpigmentaciones",
      "Mejora la apariencia de cicatrices de acné, quirúrgicas y otras lesiones",
      "Aporta un aspecto más joven y saludable a la piel"
    ]
  },
  {
    "nombre": "Plasma rico en plaquetas",
    "slug": "plasma-rico-en-plaquetas",
    "categoria": "medico",
    "descripcion": "Tratamiento que utiliza la propia sangre del paciente (centrifugada para obtener el plasma rico en plaquetas) para mejorar la regeneración de tejidos y la calidad de la piel. No es doloroso, no es invasivo y no requiere tiempo de reposo.",
    "beneficios": [
      "Facial: aumenta la producción de colágeno, disminuye marcas, manchas y arrugas finas, y devuelve luminosidad al rostro",
      "Capilar: aumenta la densidad y el crecimiento del cabello, fortalece la raíz y mejora la vascularización del cuero cabelludo"
    ]
  },
  {
    "nombre": "Profhilo",
    "slug": "profhilo",
    "categoria": "medico",
    "descripcion": "Bioestimulador dérmico que hidrata en profundidad la piel, mejora su elasticidad y revierte signos del envejecimiento, dejando el cutis luminoso y rejuvenecido.",
    "beneficios": [
      "Resultados naturales y duraderos, estimulando la producción de colágeno propio del cuerpo",
      "Versátil: se puede aplicar en distintas zonas del rostro y cuerpo",
      "Mínimo tiempo de recuperación"
    ]
  },
  {
    "nombre": "Radiesse",
    "slug": "radiesse",
    "categoria": "medico",
    "descripcion": "Relleno dérmico de última generación que restaura el volumen facial perdido, suaviza las arrugas profundas y estimula la producción de colágeno propio, brindando un aspecto más juvenil y contorneado.",
    "beneficios": [
      "Resultados naturales y duraderos, estimulando la producción de colágeno propio del cuerpo",
      "Versátil: se puede aplicar en distintas zonas del rostro y cuerpo",
      "Mínimo tiempo de recuperación"
    ]
  },
  {
    "nombre": "Rinomodelación",
    "slug": "rinomodelacion",
    "categoria": "medico",
    "descripcion": "Tratamiento no invasivo que consiste en inyectar ácido hialurónico en áreas específicas de la nariz para corregir imperfecciones, mejorar su perfil o darle un aspecto más armónico. A diferencia de la rinoplastia tradicional, es un procedimiento rápido, sin tiempo de recuperación y con resultados naturales.",
    "beneficios": [
      "Joroba: suaviza la zona para lograr un perfil más recto",
      "Punta nasal: permite elevarla o afinarla",
      "Asimetrías y depresiones: rellena pequeñas depresiones en el dorso nasal",
      "Perfil: mejora el perfil nasal en general, en armonía con el resto del rostro"
    ]
  },
  {
    "nombre": "Hollywood Peel (láser Spectra)",
    "slug": "hollywood-peel",
    "categoria": "medico",
    "descripcion": "Tratamiento con láser Spectra en el que se aplica una mascarilla de carbón activado sobre el rostro, que se adhiere a impurezas y células muertas; luego el láser la elimina, arrastrando las impurezas y estimulando la producción de colágeno.",
    "beneficios": [
      "Piel más luminosa, con manchas reducidas y tono más uniforme",
      "Poros más pequeños, con limpieza en profundidad",
      "Textura más suave, con células muertas eliminadas",
      "Reduce arrugas finas gracias al estímulo de colágeno",
      "Procedimiento rápido, seguro y no invasivo, con poco tiempo de recuperación"
    ]
  },
  {
    "nombre": "Onicomicosis (tratamiento láser)",
    "slug": "onicomicosis-laser",
    "categoria": "medico",
    "descripcion": "El láser Spectra es una tecnología avanzada para eliminar los hongos en las uñas (onicomicosis) de forma efectiva y segura, sin necesidad de medicación oral.",
    "beneficios": [
      "Tratamiento rápido y eficaz, en pocas sesiones, sin dolor y sin tiempo de recuperación",
      "Seguro y no invasivo: el láser destruye los hongos sin dañar el tejido sano",
      "Resultados duraderos que previenen la recurrencia de la infección"
    ]
  },
  {
    "nombre": "Remoción de tatuajes con láser",
    "slug": "remocion-de-tatuajes",
    "categoria": "medico",
    "descripcion": "Tratamiento gradual con láser Spectra que fragmenta el pigmento de un tatuaje para que el organismo lo elimine progresivamente, a lo largo de entre 4 y 7 sesiones, cada 28-40 días según la respuesta de la piel.",
    "beneficios": [
      "El resultado óptimo es la eliminación completa del tatuaje",
      "Según la calidad o profundidad de la tinta (o en zonas con doble tatuaje o remarcadas), puede quedar una sombra residual"
    ]
  },
  {
    "nombre": "Viscoderm",
    "slug": "viscoderm",
    "categoria": "medico",
    "descripcion": "Ácido hialurónico puro, sin reticular, que produce bioestimulación cutánea: hidrata en profundidad la dermis y la epidermis, y estira/mejora arrugas dinámicas superficiales (patas de gallo, frente, entrecejo, código de barras). No es un tratamiento de relleno, sino de reparación y revitalización de la piel del rostro, cuello y manos.",
    "beneficios": ["Hidratación profunda, con mejora de la textura, elasticidad y luminosidad", "Estimula la síntesis de colágeno y elastina", "Resultados que duran aproximadamente 6 meses"]
  },

  // ---------- Cosmetología / spa (facial, cejas y pestañas) ----------
  {
    "nombre": "BB Lips (hidratación + color)",
    "slug": "bb-lips",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento cosmetológico que hidrata los labios y les aporta color de forma temporal, mejorando su aspecto sin necesidad de inyectables.",
    "beneficios": ["Estimula la regeneración de la piel de la mucosa labial, ayudando a eliminar la resequedad", "Estimula la producción de colágeno para labios con aspecto más joven", "Resultado natural, sin perfilados marcados"]
  },
  {
    "nombre": "Dermaplaning + higiene facial",
    "slug": "dermaplaning-higiene-facial",
    "categoria": "cosmetologico",
    "descripcion": "Combina el dermaplaning (exfoliación con una cuchilla especial que retira células muertas y vello facial fino) con una higiene facial completa, dejando la piel más lisa y luminosa.",
    "beneficios": ["Piel más suave, lisa y luminosa", "Mejor absorción de los productos aplicados después", "Combina la exfoliación del dermaplaning con la limpieza profunda de la higiene facial"]
  },
  {
    "nombre": "Dermaplaning",
    "slug": "dermaplaning",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento facial no invasivo que utiliza una cuchilla especial para exfoliar suavemente la capa superficial de la piel, eliminando células muertas y vello fino.",
    "beneficios": [
      "Piel más suave y luminosa",
      "Mejor absorción de productos, potenciando sus efectos",
      "Maquillaje más duradero y uniforme",
      "Se puede combinar con una higiene facial para mejores resultados"
    ]
  },
  {
    "nombre": "Dermaplaning + peeling (Dermapeeling)",
    "slug": "dermapeeling",
    "categoria": "cosmetologico",
    "descripcion": "Combina el dermaplaning con un peeling químico superficial, potenciando la renovación celular y la luminosidad de la piel.",
    "beneficios": ["Combina la exfoliación mecánica del dermaplaning con la renovación química del peeling", "Potencia la luminosidad y la renovación celular de la piel"]
  },
  {
    "nombre": "Drenaje linfático facial",
    "slug": "drenaje-linfatico-facial",
    "categoria": "cosmetologico",
    "descripcion": "Masaje suave orientado a estimular la circulación linfática del rostro, reduciendo la hinchazón y mejorando el aspecto general de la piel.",
    "beneficios": ["Reduce la hinchazón, especialmente en la zona de los ojos y las mejillas, atenuando bolsas y ojeras", "Mejora la circulación, aportando un aspecto más saludable y radiante", "Ayuda a eliminar toxinas y a reducir la inflamación", "Efecto relajante y de alivio del estrés"]
  },
  {
    "nombre": "Full Hidra (Hidralips + Hidralids)",
    "slug": "full-hidra",
    "categoria": "cosmetologico",
    "descripcion": "Combinación de hidratación de labios y de contorno de ojos en una misma sesión.",
    "beneficios": ["Combina en una sesión la hidratación profunda de labios y de contorno de ojos", "Resultados que duran hasta 3 meses"]
  },
  {
    "nombre": "Hidra Lids (hidratación de ojeras)",
    "slug": "hidra-lids",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento de hidratación del contorno de ojos: a través de dermapen (dispositivo con microagujas) se aplican activos con ácido hialurónico combinados según lo que se quiera tratar (ojera pigmentada, ojera vascular o bolsas), y luego se colocan parches con hidratantes específicos.",
    "beneficios": [
      "Totalmente indoloro y ambulatorio; la inflamación solo dura unas horas",
      "La hidratación dura hasta 3 meses, siendo más notoria durante el primer mes, con un residuo que sigue hidratando dos meses más"
    ]
  },
  {
    "nombre": "Hidra Lips (hidratación de labios)",
    "slug": "hidra-lips",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento de hidratación de labios: a través de dermapen se aplica ácido hialurónico de alto peso molecular (hidratación superficial) y de bajo peso molecular (hidratación profunda), seguido de parches hidratantes y bálsamo labial reparador.",
    "beneficios": [
      "Totalmente indoloro y ambulatorio; la inflamación solo dura unas horas",
      "La hidratación dura hasta 3 meses, siendo más notoria durante el primer mes, con un residuo que sigue hidratando dos meses más"
    ]
  },
  {
    "nombre": "Higiene facial + reflexología",
    "slug": "higiene-facial-reflexologia",
    "categoria": "cosmetologico",
    "descripcion": "Higiene facial completa (exfoliación, punta de diamante, máscara ablandadora, ácido según tipo de piel, extracciones manuales, alta frecuencia, descongestión, hidratación y protector solar, con máscara LED incluida) combinada con una sesión de reflexología craneofacial que suma relajación al proceso.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "La reflexología craneofacial suma relajación y ayuda a aliviar la tensión"]
  },
  {
    "nombre": "Higiene facial con radiofrecuencia",
    "slug": "higiene-facial-radiofrecuencia",
    "categoria": "cosmetologico",
    "descripcion": "Higiene facial completa combinada con radiofrecuencia, que suma un efecto tensor y estimulante de colágeno al proceso de limpieza. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "La radiofrecuencia suma un efecto tensor y estimula la producción de colágeno"]
  },
  {
    "nombre": "Higiene facial profunda con dermapen",
    "slug": "higiene-facial-profunda-dermapen",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza facial profunda combinada con microneedling (dermapen), que potencia la renovación de la piel. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "El dermapen potencia la renovación celular y mejora la textura de la piel"]
  },
  {
    "nombre": "Higiene facial profunda con espátula",
    "slug": "higiene-facial-profunda-espatula",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza facial profunda realizada con espátula de diamante, utilizada para extraer impurezas y células muertas de la piel. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "La espátula de diamante ayuda a exfoliar y extraer comedones de forma suave"]
  },
  {
    "nombre": "Higiene facial profunda con jelly mask",
    "slug": "higiene-facial-profunda-jelly-mask",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza facial profunda que finaliza con una máscara de gomas (jelly mask) para calmar e hidratar la piel. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "La máscara de gomas calma la piel y aporta hidratación al finalizar"]
  },
  {
    "nombre": "Higiene facial profunda con extracciones manuales",
    "slug": "higiene-facial-profunda-extracciones-manuales",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza facial profunda con extracción manual de comedones e impurezas. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "Las extracciones manuales retiran comedones sin dañar la piel"]
  },
  {
    "nombre": "Higiene profunda de espalda",
    "slug": "higiene-profunda-de-espalda",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza profunda de la piel de la espalda, orientada a eliminar impurezas y prevenir la aparición de granos.",
    "beneficios": ["Elimina impurezas y células muertas de una zona difícil de cuidar en la rutina diaria", "Ayuda a prevenir la aparición de granos y puntos negros"]
  },
  {
    "nombre": "Peeling de espalda",
    "slug": "peeling-de-espalda",
    "categoria": "cosmetologico",
    "descripcion": "Exfoliación aplicada en la espalda para mejorar la textura de la piel y tratar imperfecciones.",
    "beneficios": ["Renueva la piel de la espalda, mejorando su textura", "Ayuda a atenuar marcas e imperfecciones"]
  },
  {
    "nombre": "Higiene facial profunda + peeling",
    "slug": "higiene-facial-profunda-mas-peeling",
    "categoria": "cosmetologico",
    "descripcion": "Limpieza facial profunda combinada con un peeling, para potenciar la renovación de la piel. Incluye máscara LED.",
    "beneficios": ["Limpia en profundidad y libera la piel de impurezas", "El peeling potencia la renovación celular y la luminosidad"]
  },
  {
    "nombre": "Laminado de cejas + nutrición (incluye perfilado)",
    "slug": "laminado-de-cejas",
    "categoria": "cosmetologico",
    "descripcion": "Alisa y peina los vellos de las cejas hacia arriba para un look más ordenado, denso y definido, combinado con nutrición y perfilado.",
    "beneficios": [
      "Cejas más pobladas y definidas, con forma perfecta y duradera",
      "Mirada más abierta y expresiva",
      "Mínimo mantenimiento; tratamiento rápido y cómodo (aproximadamente 1 hora)"
    ]
  },
  {
    "nombre": "Lifting + perfilado",
    "slug": "lifting-mas-perfilado",
    "categoria": "cosmetologico",
    "descripcion": "Levantamiento de pestañas combinado con perfilado de cejas en una misma sesión.",
    "beneficios": ["Combina el efecto de mayor apertura de mirada del lifting de pestañas con cejas prolijas y definidas", "Tratamiento rápido, sin necesidad de extensiones ni maquillaje diario"]
  },
  {
    "nombre": "Lifting + perfilado + laminado",
    "slug": "lifting-perfilado-laminado",
    "categoria": "cosmetologico",
    "descripcion": "Combinación de lifting de pestañas, perfilado y laminado de cejas en una misma sesión, para una mirada completa.",
    "beneficios": ["Combina lifting de pestañas, perfilado y laminado de cejas para una mirada completa en una sola sesión", "Resultados que duran varias semanas con mínimo mantenimiento"]
  },
  {
    "nombre": "Lifting de pestañas",
    "slug": "lifting-de-pestanas",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento que realza la belleza natural de las pestañas sin extensiones: mediante un proceso suave y seguro, se levanta y curva cada pestaña, logrando un efecto de mayor longitud y volumen, como un \"rímel permanente\".",
    "beneficios": [
      "Alternativa a las extensiones, ideal para pestañas rectas, cortas o con poco volumen",
      "Efecto natural, como si fueran más largas y espesas",
      "Ahorra tiempo en la rutina de maquillaje diaria",
      "Resultados que duran varias semanas",
      "Indoloro y apto para todo tipo de pestañas"
    ]
  },
  {
    "nombre": "Lumiglow",
    "slug": "lumiglow",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento facial iluminador a base de un activo 100% natural extraído del maqui, una baya de la Patagonia Andina reconocida por su alto contenido de antioxidantes.",
    "beneficios": [
      "Ilumina la piel con un brillo saludable y uniforme",
      "Unifica el tono y reduce manchas e imperfecciones",
      "Efecto antioxidante que protege la piel y retrasa el envejecimiento",
      "Calma la irritación y la sensibilidad; apto para todo tipo de piel"
    ]
  },
  {
    "nombre": "Masajes faciales",
    "slug": "masajes-faciales",
    "categoria": "cosmetologico",
    "descripcion": "Masajes de relajación y estimulación de la circulación en el rostro, que ayudan a distender la musculatura facial.",
    "beneficios": ["Mejora la circulación, favoreciendo la oxigenación y nutrición de la piel", "Ayuda a estimular la producción de colágeno", "Alivia la tensión muscular y reduce el estrés", "Puede ayudar a reducir la hinchazón y las ojeras"]
  },
  {
    "nombre": "Microblading",
    "slug": "microblading",
    "categoria": "cosmetologico",
    "descripcion": "Técnica de maquillaje semipermanente que logra cejas definidas, simétricas y naturales, dibujando pelo a pelo con pigmentos especiales y herramientas finas adaptadas a cada rostro.",
    "beneficios": [
      "Ideal para corregir asimetrías, rellenar zonas despobladas o reconstruir cejas escasas o irregulares",
      "Alternativa para personas alérgicas al maquillaje tradicional",
      "Curación rápida, con resultado final a las 4-6 semanas",
      "Duración semipermanente, de 1 a 3 años según el tipo de piel y los cuidados posteriores"
    ]
  },
  {
    "nombre": "Peeling con algas",
    "slug": "peeling-con-algas",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento exfoliante y remineralizante que utiliza algas marinas para nutrir e hidratar la piel.",
    "beneficios": ["Ayuda a combatir el envejecimiento prematuro y mejora la hidratación", "Estimula la renovación celular y la circulación sanguínea", "Efecto antiinflamatorio, ideal también para pieles sensibles o con acné activo", "pH neutro, no altera el microbioma de la piel"]
  },
  {
    "nombre": "Peeling facial cosmetológico",
    "slug": "peeling-facial-cosmetologico",
    "categoria": "cosmetologico",
    "descripcion": "Exfoliación controlada de las capas superficiales de la piel que, al eliminar las células muertas, estimula la regeneración celular.",
    "beneficios": [
      "Piel más luminosa y uniforme, con menos manchas y marcas",
      "Textura más suave y fina, minimizando poros abiertos y líneas de expresión superficiales",
      "Mayor absorción de los productos aplicados después, potenciando sus efectos",
      "Estimula la producción de colágeno, mejorando la firmeza y elasticidad de la piel"
    ]
  },
  {
    "nombre": "Perfilado y diseño de cejas",
    "slug": "perfilado-y-diseno-de-cejas",
    "categoria": "cosmetologico",
    "descripcion": "Da forma a las cejas eliminando vellos sobrantes y logrando un arco simétrico y armonioso, según los rasgos del rostro.",
    "beneficios": [
      "Cejas más definidas, con forma perfecta y duradera",
      "Mirada más abierta y expresiva",
      "Tratamiento rápido y cómodo (aproximadamente 1 hora)"
    ]
  },
  {
    "nombre": "Perfilado y tinte de henna",
    "slug": "perfilado-y-tinte-de-henna",
    "categoria": "cosmetologico",
    "descripcion": "Perfilado de cejas combinado con la aplicación de henna, que aporta color y mayor densidad visual para un look más poblado y definido.",
    "beneficios": ["Aporta color y mayor densidad visual a las cejas", "Resultado más poblado y definido, con mantenimiento sencillo"]
  },
  {
    "nombre": "Radiofrecuencia facial",
    "slug": "radiofrecuencia-facial",
    "categoria": "cosmetologico",
    "descripcion": "Tratamiento que utiliza ondas de radiofrecuencia para estimular la producción de colágeno, mejorando la firmeza de la piel del rostro.",
    "beneficios": ["Estimula la producción de colágeno y elastina, mejorando la firmeza de la piel", "Ayuda a reducir arrugas y líneas de expresión", "Mejora la textura de la piel, dejándola más suave y uniforme", "Procedimiento seguro, no invasivo e indoloro"]
  },
  {
    "nombre": "Reflexología cráneo facial",
    "slug": "reflexologia-craneo-facial",
    "categoria": "cosmetologico",
    "descripcion": "Técnica que estimula puntos acupunturales del rostro y el cráneo (según la medicina china) mediante presiones manuales, para aumentar la circulación sanguínea, regular la parte química del cuerpo y trabajar el estado emocional. El rostro tiene 1200 terminaciones nerviosas conectadas con órganos, glándulas y el sistema circulatorio y linfático.",
    "beneficios": [
      "Reduce la flaccidez y corrige pequeñas arrugas",
      "Mejora la circulación sanguínea y ayuda a reafirmar el óvalo facial",
      "Favorece la eliminación de toxinas y células muertas",
      "Aporta luminosidad y mayor elasticidad a la piel",
      "Equilibra el flujo de energía corporal y potencia el sistema inmunológico",
      "Ayuda a estabilizar las emociones (tristeza, frustración, enojo, miedo, angustia, preocupación)"
    ]
  },

  // ---------- Depilación definitiva femenina (por zona) ----------
  { "nombre": "Depilación femenina — Abdomen", "slug": "depilacion-femenina-abdomen", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la zona del abdomen, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Antebrazos", "slug": "depilacion-femenina-antebrazos", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en los antebrazos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Antebrazos con manos", "slug": "depilacion-femenina-antebrazos-con-manos", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en antebrazos y manos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Axilas", "slug": "depilacion-femenina-axilas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en las axilas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Bozo", "slug": "depilacion-femenina-bozo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en el bozo (labio superior), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Bozo y mentón", "slug": "depilacion-femenina-bozo-menton", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en bozo y mentón, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Brazos completos", "slug": "depilacion-femenina-brazos-completos", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en brazos completos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cavado completo + tira de cola", "slug": "depilacion-femenina-cavado-completo-tira-de-cola", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la zona genital completa (cavado completo) junto con la tira de cola (zona interglútea).", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cavado completo (profundo + labios)", "slug": "depilacion-femenina-cavado-completo-profundo-labios", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la zona genital completa, incluyendo el área profunda y los labios.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cavado profundo (sin labios ni tira de cola)", "slug": "depilacion-femenina-cavado-profundo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la zona genital profunda, sin incluir labios ni tira de cola.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cuello anterior", "slug": "depilacion-femenina-cuello-anterior", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la parte anterior del cuello, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cuello completo", "slug": "depilacion-femenina-cuello-completo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en el cuello completo, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Cuello posterior", "slug": "depilacion-femenina-cuello-posterior", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la parte posterior del cuello, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Entrecejo", "slug": "depilacion-femenina-entrecejo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en el entrecejo, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Espalda baja", "slug": "depilacion-femenina-espalda-baja", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la espalda baja, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Espalda completa", "slug": "depilacion-femenina-espalda-completa", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la espalda completa, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Frente", "slug": "depilacion-femenina-frente", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en la frente, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Glúteos", "slug": "depilacion-femenina-gluteos", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en los glúteos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Hombros", "slug": "depilacion-femenina-hombros", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en los hombros, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Línea abdominal", "slug": "depilacion-femenina-linea-abdominal", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la línea abdominal (línea alba), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Mamas/aréolas", "slug": "depilacion-femenina-mamas-areolas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en mamas y aréolas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Manos completas", "slug": "depilacion-femenina-manos-completas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en manos completas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Media pierna alta", "slug": "depilacion-femenina-media-pierna-alta", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la media pierna alta (muslo), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Media pierna con rodilla", "slug": "depilacion-femenina-media-pierna-con-rodilla", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la media pierna incluyendo la rodilla, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Media pierna sin rodilla", "slug": "depilacion-femenina-media-pierna-sin-rodilla", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la media pierna sin incluir la rodilla, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Medio rostro", "slug": "depilacion-femenina-medio-rostro", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de medio rostro, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Mejillas", "slug": "depilacion-femenina-mejillas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en las mejillas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Mentón y submentón", "slug": "depilacion-femenina-menton-submenton", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en mentón y submentón, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Patillas", "slug": "depilacion-femenina-patillas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en las patillas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Pecho completo", "slug": "depilacion-femenina-pecho-completo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en el pecho completo, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Piernas completas", "slug": "depilacion-femenina-piernas-completas", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en piernas completas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Pies con dedos", "slug": "depilacion-femenina-pies-con-dedos", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser en pies y dedos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Rostro completo", "slug": "depilacion-femenina-rostro-completo", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser del rostro completo, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación femenina — Tira de cola", "slug": "depilacion-femenina-tira-de-cola", "categoria": "depilacion-femenina", "descripcion": "Depilación definitiva por láser de la tira de cola (zona interglútea), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },

  // ---------- Depilación definitiva masculina (por zona) ----------
  { "nombre": "Depilación masculina — Abdomen", "slug": "depilacion-masculina-abdomen", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en la zona del abdomen, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Abdomen y tetillas", "slug": "depilacion-masculina-abdomen-tetillas", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de abdomen y tetillas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Antebrazos", "slug": "depilacion-masculina-antebrazos", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en los antebrazos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Axilas", "slug": "depilacion-masculina-axilas", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en las axilas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Barba completa", "slug": "depilacion-masculina-barba-completa", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la barba completa, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Brazos completos", "slug": "depilacion-masculina-brazos-completos", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en brazos completos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Cuello", "slug": "depilacion-masculina-cuello", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en el cuello, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Empeine y dedos", "slug": "depilacion-masculina-empeine-dedos", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en empeine y dedos de los pies, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Entrecejo", "slug": "depilacion-masculina-entrecejo", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en el entrecejo, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Espalda alta", "slug": "depilacion-masculina-espalda-alta", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en la espalda alta, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Espalda baja", "slug": "depilacion-masculina-espalda-baja", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en la espalda baja, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Espalda completa", "slug": "depilacion-masculina-espalda-completa", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en la espalda completa, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Genitales", "slug": "depilacion-masculina-genitales", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la zona genital, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Genitales con tira de cola", "slug": "depilacion-masculina-genitales-tira-de-cola", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la zona genital junto con la tira de cola (zona interglútea).", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Glúteos", "slug": "depilacion-masculina-gluteos", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en los glúteos, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Hombros", "slug": "depilacion-masculina-hombros", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en los hombros, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Media pierna con rodilla", "slug": "depilacion-masculina-media-pierna-con-rodilla", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la media pierna incluyendo la rodilla, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Media pierna sin rodilla", "slug": "depilacion-masculina-media-pierna-sin-rodilla", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la media pierna sin incluir la rodilla, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Patillas", "slug": "depilacion-masculina-patillas", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en las patillas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Pecho (solo tórax)", "slug": "depilacion-masculina-pecho-torax", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser del pecho (solo tórax), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Pecho y abdomen", "slug": "depilacion-masculina-pecho-abdomen", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de pecho y abdomen, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Piernas completas", "slug": "depilacion-masculina-piernas-completas", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser en piernas completas, que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] },
  { "nombre": "Depilación masculina — Tira de cola", "slug": "depilacion-masculina-tira-de-cola", "categoria": "depilacion-masculina", "descripcion": "Depilación definitiva por láser de la tira de cola (zona interglútea), que reduce progresivamente el vello mediante la aplicación de tecnología láser sobre el folículo piloso.", "beneficios": ["Reduce el vello de forma permanente con cada sesión, al destruir el folículo piloso mediante fototermólisis selectiva", "Previene la foliculitis y reduce el vello encarnado y las irritaciones típicas de otros métodos", "Mejora la textura y el tono de la piel al estimular colágeno y elastina", "Método preciso y seguro, que no daña la piel circundante"] }
];
