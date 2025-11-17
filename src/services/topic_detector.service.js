function normalize(text) {
  text = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  text = text.replace(/[^\w\s]/g, " ");

  return text;
}

const TOPICS_RAW = {
  "DOCUMENTACIÓN CLÍNICA": [
    "ficha clínica",
    "epicrisis",
    "protocolo operatorio",
    "documentación clínica",
    "documentos médicos",
    "historial médico",
    "copia de ficha",
    "ver mi ficha",
    "mi epicrisis",
    "protocolo cirugía",
    "informes médicos",
    "documentos hospital",
    "sacar documentos",
    "solicitar documentos",
  ],

  "INFORMACIÓN SOBRE DIAGNÓSTICO O DE TRATAMIENTO MÉDICO": [
    "diagnóstico",
    "tratamiento",
    "información médica",
    "información clínica",
    "qué tiene",
    "qué tratamiento",
    "médico tratante",
    "cirujano",
    "equipo médico",
    "información del doctor",
    "resultado del tratamiento",
    "explicación médica",
  ],

  "CITA POST HOSPITALIZACIÓN": [
    "cita post hospitalización",
    "agendar control",
    "sacar hora",
    "reservar hora",
    "post alta",
    "control médico",
    "control después del alta",
    "agendar cita",
    "donde agendo cita",
  ],

  "HORARIO VISITAS Y BANCO DE SANGRE": [
    "horario visitas",
    "visitar paciente",
    "horarios de visita",
    "banco de sangre",
    "horario banco de sangre",
    "a qué hora puedo ir",
    "qué horario tienen",
    "visitas hospital",
    "horario para ver pacientes",
  ],

  "PROCESOS Y CUIDADOS EN EL ALTA": [
    "alta",
    "cuidados del alta",
    "proceso de alta",
    "qué hacer al alta",
    "indicaciones de alta",
    "me voy de alta",
    "cuidados post alta",
  ],

  "RESULTADOS DE EXÁMENES": [
    "resultados",
    "exámenes",
    "laboratorio",
    "imágenes",
    "radiología",
    "resultados de exámenes",
    "ver exámenes",
    "descargar resultados",
    "imagenología",
    "laboratorio clínico",
  ],

  // INFORMACIÓN ADMINISTRATIVA Y PAGOS
  GES: [
    "ges",
    "garantías explícitas",
    "beneficio ges",
    "cobertura ges",
    "orientación ges",
    "enfermedades ges",
  ],

  CAEC: [
    "caec",
    "cobertura adicional",
    "enfermedades catastróficas",
    "beneficio caec",
    "deducible caec",
  ],

  "LEY DE URGENCIA": [
    "ley de urgencia",
    "urgencia vital",
    "préstamo legal",
    "financiamiento urgencia",
  ],

  "COSTO DE PRESTACIONES": [
    "aranceles",
    "costo",
    "valor de prestaciones",
    "cuánto cuesta",
    "precios",
    "costo hospital",
    "arancel hospitalario",
    "valores de servicios",
  ],

  PRESUPUESTOS: [
    "presupuesto",
    "cotización",
    "cotizar cirugía",
    "presupuesto exámenes",
    "precio procedimiento",
    "cuánto vale cirugía",
    "cotizar",
  ],

  "CUENTA HOSPITALARIA Y PAGOS": [
    "cuenta hospitalaria",
    "pagar cuenta",
    "estado de cuenta",
    "detalle de cuenta",
    "pago online",
    "cuenta paciente",
    "revisión de cuenta",
    "cuánto debo",
  ],

  "SUGERENCIAS, RECLAMOS Y FELICITACIONES": [
    "reclamo",
    "felicitación",
    "sugerencia",
    "opinión",
    "queja",
    "comentario",
    "formular reclamo",
    "feedback",
  ],

  // ACOMPAÑANTES, VISITAS Y SERVICIOS
  "INGRESO DE MASCOTAS": [
    "mascotas",
    "ingresar mascota",
    "perros",
    "gatos",
    "ver mascota",
    "visita mascota",
    "ingreso animal",
  ],

  "DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA": [
    "acompañante",
    "visita",
    "diferencia acompañante visita",
    "quién puede acompañar",
    "quién puede visitar",
    "responsable",
  ],

  "ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE": [
    "rol acompañante",
    "responsabilidades",
    "acompañante responsable",
    "funciones del acompañante",
  ],

  "ROL DEL RESPONSABLE DEL PAGARÉ": [
    "responsable del pagaré",
    "pagaré hospital",
    "quién firma pagaré",
    "responsabilidad financiera",
  ],

  "CUIDADOR DE EMPRESA EXTERNA": [
    "cuidador externo",
    "cuidador en convenio",
    "empresa externa",
    "cuidador",
    "requisitos cuidador",
  ],

  "LEY MILA N°21.372": [
    "ley mila",
    "acompañamiento nna",
    "derecho a acompañante",
    "acompañante significativo",
    "ley 21.372",
  ],

  "INGRESO DE PERROS DE ASISTENCIA": [
    "perros de asistencia",
    "asistencia animal",
    "ingreso perro",
    "perro apoyo",
    "mascota certificada",
  ],

  "CONDICIONES DE ENTRADA DE VISITAS": [
    "condiciones de entrada",
    "qué necesito para visitar",
    "requisitos visita",
    "quién puede entrar",
    "restricciones de ingreso",
  ],

  "ELEMENTOS PERMITIDOS Y NO PERMITIDOS": [
    "elementos permitidos",
    "qué puedo llevar",
    "no permitido",
    "objetos prohibidos",
    "qué no puedo ingresar",
    "cosas prohibidas",
  ],

  "SERVICIOS DE ALIMENTACIÓN": [
    "cafetería",
    "comida",
    "máquinas",
    "marketplace",
    "comprar comida",
    "dónde comer",
    "máquinas expendedoras",
  ],

  "ESPACIOS DE ORACIÓN Y REFLEXIÓN": [
    "capilla",
    "oratorio",
    "espacios de oración",
    "iglesia",
    "misa",
    "rosario",
    "oración",
  ],

  "CAJERO AUTOMÁTICO, WIFI Y ESTACIONAMIENTOS": [
    "cajero",
    "wifi",
    "estacionamiento",
    "dónde estacionar",
    "internet",
    "red wifi",
  ],

  // SOLICITUDES
  SOLICITUDES: [
    "solicitudes",
    "hacer solicitud",
    "pedir algo",
    "requerimiento",
    "trámite",
    "necesito solicitar",
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

  return "otro";
}
module.exports = detectTopic;
