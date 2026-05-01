/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MoodAction = "glitch" | "pulse" | "blur" | "dim" | "vibrate" | "pure" | "warm" | "introspective" | "loop" | "collapse" | "growth" | "freedom";

export interface ChoiceImpact {
  ansiedad?: number;
  paz?: number;
  fe?: number;
}

export interface Choice {
  text: string;
  nextNode: string;
  isBiblical?: boolean;
  effect?: MoodAction;
  impact?: ChoiceImpact;
}

export interface StoryNode {
  id: string;
  title?: string;
  content: string;
  choices: Choice[];
  mood?: MoodAction;
  transitionText?: string;
  audioHint?: string;
  isEnding?: boolean;
  level?: number;
  emotion?: string;
  scripture?: {
    reference: string;
    text: string;
  };
}

export const STORY_NODES: Record<string, StoryNode> = {
  // ESCENA 0 — PORTAL DE ENTRADA
  introspeccion: {
    id: "introspeccion",
    title: "¿Cómo se siente hoy tu mente?",
    content: "No entres a una historia. Entra a tu momento.\n\nEscucha el ruido interno por un segundo. ¿Qué es lo que más pesa ahora?",
    mood: "introspective",
    audioHint: "Viento suave + latido lejano",
    choices: [
      { text: "“No puedo dejar de pensar.”", nextNode: "sintoma_mente", effect: "glitch" },
      { text: "“Estoy agotado emocionalmente.”", nextNode: "sintoma_cansancio", effect: "dim" },
      { text: "“Siento que todo depende de mí.”", nextNode: "mecanismo_peso", effect: "pulse" },
      { text: "“Quiero desaparecer un rato.”", nextNode: "sintoma_huida", effect: "blur" },
      { text: "“Siento un vacío que no sé explicar.”", nextNode: "sintoma_vacio", effect: "vibrate" },
    ]
  },

  // --- NIVEL 1: SÍNTOMAS ---
  sintoma_mente: {
    id: "sintoma_mente",
    title: "El Ruido Interno",
    level: 1,
    emotion: "sobreanálisis",
    content: "Tu mente va rápido. Más rápido que tu capacidad de procesar.\n\nLas ideas no llegan para ayudarte, llegan para abrumarte. Es un tráfico constante de “tengo que” y “qué tal si”.\n\n¿Sientes que si dejas de pensar, algo se va a romper?",
    mood: "glitch",
    audioHint: "Tic tac rápido",
    choices: [
      { text: "Intento ordenar los pensamientos una vez más.", nextNode: "mecanismo_analisis", impact: { ansiedad: 10 } },
      { text: "Busco algo que me distraiga de este ruido.", nextNode: "mecanismo_anestesia", impact: { paz: -5 } },
      { text: "Me detengo, aunque me dé miedo el silencio.", nextNode: "quiebre_silencio", impact: { fe: 10 } },
    ]
  },

  sintoma_cansancio: {
    id: "sintoma_cansancio",
    title: "El Cansancio Invisible",
    level: 1,
    emotion: "agotamiento",
    content: "No es que no hayas dormido. Es que sientes que tu alma pesa.\n\nComo si estuvieras cargando el día antes de que empiece. El simple hecho de pensar en lo que viene te drena.\n\n¿Cuánto tiempo llevas intentando 'poder con todo'?",
    mood: "dim",
    audioHint: "Latido lento y pesado",
    choices: [
      { text: "Sigo empujando, no tengo otra opción.", nextNode: "mecanismo_prisa", impact: { ansiedad: 15 } },
      { text: "Admito que ya no tengo fuerzas.", nextNode: "quiebre_no_puedo", impact: { fe: 20, paz: 10 } },
    ]
  },

  sintoma_vacio: {
    id: "sintoma_vacio",
    title: "El Vacío",
    level: 1,
    emotion: "desconexión",
    content: "Estás aquí, pero te sientes lejos.\n\nHay un hueco entre lo que haces y lo que sientes. Como si estuvieras viendo tu vida a través de un cristal empañado.\n\nBuscas algo que te haga sentir 'real' otra vez, pero nada parece llenar el espacio.",
    mood: "vibrate",
    audioHint: "Eco profundo",
    choices: [
      { text: "Busco una respuesta rápida en mi teléfono.", nextNode: "mecanismo_anestesia", impact: { paz: -10 } },
      { text: "Me pregunto qué es lo que realmente falta.", nextNode: "quiebre_verdad", impact: { fe: 15 } },
    ]
  },

  sintoma_huida: {
    id: "sintoma_huida",
    title: "El Impulso de Escapar",
    level: 1,
    emotion: "evasión",
    content: "No quieres resolver nada. Solo quieres que la realidad se detenga.\n\nUn viaje, una pantalla, un sueño profundo... cualquier cosa que no sea 'aquí' y 'ahora'.\n\n¿De qué estás huyendo exactamente?",
    mood: "blur",
    audioHint: "Viento que se aleja",
    choices: [
      { text: "Me pierdo en el ruido un momento más.", nextNode: "mecanismo_anestesia", impact: { paz: -15 } },
      { text: "Me detengo y miro hacia atrás.", nextNode: "quiebre_verdad", impact: { fe: 10, paz: 5 } },
    ]
  },

  // --- NIVEL 2: MECANISMOS ---
  mecanismo_analisis: {
    id: "mecanismo_analisis",
    title: "El Cuarto de los '¿Y si...?'",
    level: 2,
    emotion: "preocupación",
    content: "Bienvenido al laboratorio de tu mente. Aquí creas escenarios que aún no existen para tratar de controlar resultados que no te pertenecen.\n\n“¿Y si sale mal? ¿Y si no soy suficiente? ¿Y si se dan cuenta?”\n\nEl análisis te da la ilusión de seguridad, pero solo te está robando el presente.",
    mood: "loop",
    audioHint: "Murmullos distantes",
    choices: [
      { text: "Analizo un escenario más, por si acaso.", nextNode: "sintoma_mente", impact: { ansiedad: 15 } },
      { text: "Suelto el control por un segundo.", nextNode: "quiebre_no_puedo", impact: { fe: 15, paz: 10 } },
    ]
  },

  mecanismo_anestesia: {
    id: "mecanismo_anestesia",
    title: "El Ruido que Anestesia",
    level: 2,
    emotion: "distracción",
    content: "Deslizas. Ves. Escuchas. No para aprender, sino para olvidar.\n\nEl ruido externo oculta el grito interno. Es efectivo, sí. Pero es temporal. Y cuando el video termina, el peso vuelve con intereses.\n\n¿Qué pasaría si apagas la pantalla ahora?",
    mood: "blur",
    audioHint: "Sonidos de notificaciones distorsionados",
    choices: [
      { text: "Un poco más de ruido, por favor.", nextNode: "sintoma_huida", impact: { ansiedad: 5, paz: -10 } },
      { text: "Apago todo y respiro.", nextNode: "quiebre_silencio", impact: { fe: 10, paz: 15 } },
    ]
  },

  mecanismo_prisa: {
    id: "mecanismo_prisa",
    title: "La Prisa Interna",
    level: 2,
    emotion: "urgencia",
    content: "Sientes que vas tarde. A todo. A la vida misma.\n\nCaminas rápido, hablas rápido, rezas rápido. Crees que si te detienes, la inercia te va a aplastar.\n\nPero la paz no corre con el reloj, vive en el presente.",
    mood: "pulse",
    audioHint: "Reloj acelerado",
    choices: [
      { text: "Corro un poco más.", nextNode: "sintoma_cansancio", impact: { ansiedad: 20 } },
      { text: "Freno en seco y observo mis manos.", nextNode: "quiebre_no_puedo", impact: { fe: 20, paz: 10 } },
    ]
  },

  mecanismo_peso: {
    id: "mecanismo_peso",
    title: "El Peso de Sostener",
    level: 2,
    emotion: "responsabilidad",
    content: "Tus hombros están rígidos. Te has convencido de que si tú sueltas, todo se cae.\n\nCargas problemas ajenos, expectativas propias y miedos colectivos. Eres el atlas de tu propio mundo.\n\n¿Quién te pidió que cargaras tanto?",
    mood: "dim",
    audioHint: "Esfuerzo físico (respiración tensa)",
    choices: [
      { text: "Intento cargar un poco más.", nextNode: "sintoma_mente", impact: { ansiedad: 15 } },
      { text: "Admito que no puedo sostenerlo todo.", nextNode: "quiebre_carga", impact: { fe: 25, paz: 15 } },
    ]
  },

  // --- NIVEL 3: QUIEBRE ---
  quiebre_no_puedo: {
    id: "quiebre_no_puedo",
    title: "Cuando ya no puedes más",
    level: 3,
    emotion: "rendición",
    content: "Llegaste al límite. No como un fracaso, sino como una frontera necesaria.\n\nYa no tienes argumentos. Ya no tienes fuerzas. Solo tienes tu cansancio.\n\nAquí, en la debilidad absoluta, es donde empieza lo nuevo. ¿Estás listo para dejar de intentarlo a tu manera?",
    mood: "collapse",
    audioHint: "Silencio total",
    choices: [
      { text: "“No puedo más, Dios.”", nextNode: "trans_quietud", impact: { fe: 30, paz: 20 } },
      { text: "Intento levantarme solo otra vez.", nextNode: "sintoma_cansancio", impact: { ansiedad: 10, fe: -5 } },
    ]
  },

  quiebre_silencio: {
    id: "quiebre_silencio",
    title: "El Silencio Incómodo",
    level: 3,
    emotion: "confrontación",
    content: "Apagaste el ruido. Ahora solo estás tú... y la Verdad.\n\nAl principio asusta. Las voces calladas empiezan a gritar. Pero si te quedas el tiempo suficiente, el grito se convierte en susurro.\n\nNo huyas de este silencio. Es aquí donde Dios habla.",
    mood: "introspective",
    audioHint: "Viento muy suave",
    choices: [
      { text: "Me quedo y escucho.", nextNode: "trans_presencia", impact: { fe: 20, paz: 25 } },
      { text: "Vuelvo al ruido, es demasiado.", nextNode: "mecanismo_anestesia", impact: { ansiedad: 15 } },
    ]
  },

  quiebre_verdad: {
    id: "quiebre_verdad",
    title: "La Verdad que Evitabas",
    level: 3,
    emotion: "honestidad",
    content: "Admitirlo duele, pero libera.\n\n“No estoy bien.” “Tengo miedo.” “Me siento solo.”\n\nLa verdad es el primer paso hacia la sanidad. Ya no tienes que pretender que tienes el control. La máscara finalmente se ha roto.",
    mood: "pure",
    audioHint: "Gota de agua cayendo",
    choices: [
      { text: "Acepto mi realidad sin juzgarme.", nextNode: "trans_soltar", impact: { fe: 25, paz: 20 } },
      { text: "Me asusto de lo que vi y me escondo.", nextNode: "sintoma_vacio", impact: { ansiedad: 10 } },
    ]
  },

  quiebre_carga: {
    id: "quiebre_carga",
    title: "Lo que nunca fue tuyo",
    level: 3,
    emotion: "liberación",
    content: "Miras tus manos y ves maletas que no te pertenecen. Culpa de otros, errores del pasado, expectativas imposibles.\n\nAlguien te dijo que tenías que llevarlas. Te mintieron.\n\n¿Y si abres las manos ahora mismo?",
    mood: "warm",
    audioHint: "Cadenas que se sueltan",
    choices: [
      { text: "Suelto la carga.", nextNode: "trans_soltar", impact: { fe: 30, paz: 25 } },
      { text: "Me quedo con ella por miedo a estar vacío.", nextNode: "mecanismo_peso", impact: { ansiedad: 15 } },
    ]
  },

  // --- NIVEL 4: TRANSFORMACIÓN ---
  trans_quietud: {
    id: "trans_quietud",
    title: "Quietud",
    level: 4,
    emotion: "paz",
    content: "No pasó algo espectacular. Solo... dejaste de pelear.\n\nTu respiración es profunda ahora. El mundo sigue girando, pero tú ya no tienes que empujarlo.\n\n“Estad quietos, y conoced que Yo soy Dios.” No es una orden, es un alivio.",
    mood: "warm",
    audioHint: "Piano muy suave",
    scripture: {
      reference: "Salmo 46:10",
      text: "Estad quietos… y conoced que Yo soy Dios."
    },
    choices: [
      { text: "Habito este espacio de paz.", nextNode: "final_paz_progresiva", impact: { paz: 40, fe: 20 } },
      { text: "Siento que necesito dar un paso más.", nextNode: "trans_presencia", impact: { fe: 15 } },
    ]
  },

  trans_presencia: {
    id: "trans_presencia",
    title: "Presencia",
    level: 4,
    emotion: "comunión",
    content: "Ya no estás solo en tu cuarto. Ya no estás solo en tu mente.\n\nHay alguien aquí. Alguien que no te juzga por tu cansancio, sino que te ofrece Sus fuerzas.\n\nNo es una idea religiosa. Es una Presencia real.",
    mood: "growth",
    audioHint: "Coro celestial muy tenue",
    scripture: {
      reference: "Mateo 28:20",
      text: "Y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo."
    },
    choices: [
      { text: "Descanso en Su compañía.", nextNode: "final_paz_progresiva", impact: { fe: 30, paz: 30 } },
      { text: "Le entrego lo que queda de mi día.", nextNode: "final_libertad", impact: { fe: 40, paz: 20 } },
    ]
  },

  trans_soltar: {
    id: "trans_soltar",
    title: "Soltar no es Perder",
    level: 4,
    emotion: "confianza",
    content: "Soltaste. Y para tu sorpresa, no te caíste.\n\nFuiste sostenido por algo más fuerte que tu voluntad. Descubriste que la confianza no es saber qué va a pasar, es saber quién tiene el control.",
    mood: "freedom",
    audioHint: "Viento abierto",
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Echen sobre Él toda su ansiedad… porque Él cuida de ustedes."
    },
    choices: [
      { text: "Elijo confiar hoy.", nextNode: "final_libertad", impact: { fe: 50, paz: 30 } },
      { text: "Aún quiero entender un poco más.", nextNode: "trans_quietud", impact: { paz: 10 } },
    ]
  },

  // --- FINALES ---
  final_paz_progresiva: {
    id: "final_paz_progresiva",
    title: "Final: Paz Progresiva",
    isEnding: true,
    content: "No todo se resolvió. No todo tiene sentido aún. Pero algo cambió.\n\nYa no estás luchando solo. La paz no llegó como emoción… llegó como dirección. Hoy puedes caminar de la mano del que calma las tormentas.",
    mood: "growth",
    audioHint: "Piano suave",
    scripture: {
      reference: "Filipenses 4:7",
      text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones."
    },
    choices: [
      { text: "Reiniciar mi camino", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
    ]
  },

  final_libertad: {
    id: "final_libertad",
    title: "Final: Libertad en Él",
    isEnding: true,
    content: "No controlaste todo. No entendiste todo. Pero soltaste.\n\nLa paz no vino porque todo cambió… vino porque tú ya no estás tratando de ser el centro. Eres libre para no poder con todo.",
    mood: "freedom",
    audioHint: "Viento + música abierta",
    scripture: {
      reference: "Juan 8:36",
      text: "Si el Hijo os libertare… seréis verdaderamente libres."
    },
    choices: [
      { text: "Volver al umbral", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
    ]
  }
};
