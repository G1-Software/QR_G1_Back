function normalize(text) {
  text = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  text = text.replace(/[^\w\s]/g, " ");

  return text;
}

const TOPICS_RAW = {
  // INFORMACIÓN CLÍNICA AL PACIENTE
  "RESULTADOS DE EXÁMENES": [
    "exámenes",
    "resultados",
    "resultados de exámenes",
    "ver exámenes",
    "consultar exámenes",
    "descargar exámenes",
    "ver mis exámenes",
    "exámenes de laboratorio",
    "exámenes de imágenes",
    "resultados de exámenes de laboratorio",
    "resultados de exámenes de imágenes",
    "descargar resultados",
  ],

  "DOCUMENTACIÓN CLÍNICA": [
    "documentación clínica",
    "documentos clínicos",
    "documentos médicos",
    "solicitar documentos",
    "obtener documentos",
    "ficha clínica",
    "copia de mi ficha clínica",
    "ver mi ficha clínica",
    "mi historial médico",
    "epicrisis",
    "copia de mi epicrisis",
    "ver mi epicrisis",
    "protocolo operatorio",
    "protocolo intervención quirúrgica", 
  ],

  "INFORMACIÓN SOBRE DIAGNÓSTICO O DE TRATAMIENTO MÉDICO": [
    "información de diagnóstico",
    "diagnóstico",
    "información de tratamiento médico",
    "tratamiento médico",
    "información de tratamiento clínico",
    "tratamiento clínico",
    "información del tratamiento realizado",
    "resultado del tratamiento realizado",
    "información del procedimiento realizado",
    "resultado del procedimiento realizado",
    "información de la cirugía realizada",
    "resultado de la cirugía realizada",
    "qué tiene",
    "médico tratante",
    "información del doctor tratante",
    "cirujano tratante",
    "equipo médico tratante",
  ],

  "CITA POST HOSPITALIZACIÓN": [
    "cita post hospitalización",
    "agendar cita",
    "donde agendo una cita",
    "hora post hospitalización",
    "agendar hora",
    "donde agendo una hora",
    "sacar hora",
    "pedir hora",
    "tomar hora",
    "reservar hora",
    "control post hospitalización",
    "agendar control",
    "donde agendo un control",
  ],

  "HORARIO VISITAS Y BANCO DE SANGRE": [
    "horario visitas",
    "horarios visitas",
    "horario de visita",
    "horarios de visitas",
    "horario para visitar a un paciente",
    "horarios para visitar a un paciente",
    "horario para ver pacientes",
    "horarios para ver pacientes",
    "horario banco de sangre",
    "horarios banco de sangre",
    "a qué hora puedo ir",
    "horario",
    "horarios",
    "qué horario tienen",
    "qué horarios tienen",
  ],

  "PROCESOS Y CUIDADOS EN EL ALTA": [
    "alta",
    "proceso de alta",
    "recomendaciones de alta",
    "cuidados en el alta",
    "indicaciones de alta",
  ],

  
  // INFORMACIÓN ADMINISTRATIVA Y PAGOS
  "INFORMACIÓN GES": [
    "ges",
    "garantías explícitas en salud",
    "garantías explícitas",
    "cobertura ges",
    "enfermedades ges",
    "beneficio ges",
    "orientación ges",
  ],

  "INFORMACIÓN CAEC": [
    "caec",
    "cobertura adicional para enfermedades catastróficas",
    "cobertura adicional",
    "enfermedades catastróficas",
    "beneficio caec",
    "orientación caec",
  ],

  "INFORMACIÓN LEY DE URGENCIA": [
    "ley de urgencia",
    "urgencia vital",
    "financiamiento urgencia",
  ],

  "COSTO DE PRESTACIONES": [
    "aranceles hospitalarios",
    "arancel hospitalario",
    "costos",
    "costo de prestaciones",
    "costo de servicios",
    "costo de procedimientos",
    "precios",
    "precio de prestaciones",
    "precio de servicios",
    "precio de procedimientos",
    "valores",
    "valor de prestaciones",
    "valor de servicios",
    "valor de procedimientos",
    "tarifas",
  ],

  "PRESUPUESTOS": [
    "presupuestos",
    "presupuesto",
    "presupuestos médicos",
    "presupuesto médico",
    "solicitar presupuestos",
    "solicitar presupuesto",
    "solicitar presupuestos médicos",
    "solicitar presupuesto médico",
    "presupuesto de cirugía",
    "presupuesto de intervención quirúrgica",
    "presupuesto de exámenes",
    "presupuesto de procedimientos",
  ],

  "CUENTA HOSPITALARIA Y PAGOS": [
    "cuenta hospitalaria",
    "dueda hospitalaria",
    "estado de cuenta",
    "estado de cuenta hospitalaria",
    "detalle de cuenta",
    "detalle de cuenta hospitalaria",
    "pagar cuenta",
    "pagar mi cuenta",
    "pago de cuenta",
    "pago online",
    "realizar pago online",
    "revisión de cuenta",
    "cuánto debo",
    "mi deuda",
    "cuánto tengo que pagar",
    "pagar hospital",
    "boleta hospital",
  ],

  "SUGERENCIAS, RECLAMOS Y FELICITACIONES": [
    "sugerencias",
    "sugerencia",
    "reclamos",
    "reclamo",
    "felicitaciones",
    "felicitación",
    "opinión",
    "queja",
    "comentario",
    "feedback",
    "sugerir",
  ],

  // ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES
  "DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA": [
    "acompañante",
    "visita",
    "diferencia acompañante visita",
    "quién puede acompañar",
    "quién puede visitar",
  ],

   "ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE": [
    "rol del acompañante",
    "rol acompañante",
    "responsabilidades del acompañante",
    "responsabilidades acompañante",
    "acompañante responsable",
    "funciones del acompañante",
  ],

  "ROL DEL RESPONSABLE DEL PAGARÉ": [
    "responsable del pagaré",
    "quién firma el pagaré",
    "pagaré hospital",
    "responsabilidad financiera",
    "responsable económico",
  ],

  "CUIDADOR DE EMPRESA EXTERNA": [
    "cuidador de empresa externa",
    "cuidador en convenio",
    "empresa externa",
    "cuidador externo",
  ],

  "LEY MILA N°21.372": [
    "ley mila",
    "ley 21.372",
    "ley N°21.372",
    "acompañamiento nna",
    "derecho a acompañante",
    "acompañante significativo",
  ],

  "INGRESO DE PERROS DE ASISTENCIA": [
    "perros de asistencia",
    "perro de asistencia",
    "perro guía",
    "perro acompañante",
    "perro de ayuda",
    "perros de apoyo",
    "perro de apoyo",
    "asistencia animal",
  ],
  
  "INGRESO DE MASCOTAS": [
    "mascota",
    "mascotas",
    "ingresar mascota",
    "ingresar mascotas",
    "visita mascota",
    "visita mascotas",
    "ingresar animal",
    "mi mascota",
  ],

  "CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL": [
    "condiciones de entrada",
    "condiciones de ingreso",
    "condiciones para ser vsiita",
    "qué necesito para visitar",
    "requisitos visita",
    "quién puede entrar",
    "requisitos de ingreso",
    "restricciones de ingreso",
  ],

  "ELEMENTOS PERMITIDOS Y NO PERMITIDOS AL INGRESO AL HOSPITAL": [
    "elementos permitidos",
    "qué puedo llevar",
    "no permitido",
    "objetos prohibidos",
    "qué no puedo ingresar",
    "cosas prohibidas",
  ],

  "SERVICIOS DE ALIMENTACIÓN": [
    "cafetería",
    "cafe",
    "comida",
    "máquinas de comida",
    "máquinas expendedoras",
    "marketplace",
    "comprar comida",
    "dónde comer",
    "almuerzo",
    "snack",
  ],

  "ESPACIOS DE ORACIÓN Y REFLEXIÓN": [
    "capilla",
    "reflexión",
    "oratorio",
    "espacios de reflexión",
    "espacios de oración",
    "iglesia",
    "misa",
    "rosario",
    "oración",
    "lugar para rezar",
    "espacio espiritual",
  ],

  "CAJERO AUTOMÁTICO, WIFI Y ESTACIONAMIENTOS": [
    "cajero",
    "cajero automático",
    "cajeros",
    "cajeros automático",
    "sacar plata",
    "internet",
    "red wifi",
    "wifi",
    "wi-fi",
    "estacionamiento",
    "estacionamientos",
    "dónde estacionar",
  ],

  // SOLICITUDES
  "SOLICITUDES": [
    "solicitud",
    "solicitudes",
    "hacer solicitud",
    "enviar solicitud",
    "pedir algo",
    "necesito solicitar",
    "solicitar limpieza",
    "solicitar mantención",
    "solicitar asistencia social",
  ],
};

const TOPICS_NORMALIZED = {};
for (const [topic, keywords] of Object.entries(TOPICS_RAW)) {
  TOPICS_NORMALIZED[topic] = keywords.map((k) => normalize(k));
}

function detectTopic(question) {
  const q = normalize(question);

  for (const [topic, keywords] of Object.entries(TOPICS_NORMALIZED)) {
    for (const kw of keywords) {
      if (!kw) continue;
      if (q.includes(kw)) {
        return topic.toLowerCase();
      }
    }
  }

  return "OTRO";
}
module.exports = detectTopic;
