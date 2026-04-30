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
  scripture?: {
    reference: string;
    text: string;
  };
}

export const STORY_NODES: Record<string, StoryNode> = {
  // ESCENA 0 — EL UMBRAL
  introspeccion: {
    id: "introspeccion",
    title: "El Umbral",
    content: "Antes de continuar… detente un momento. No respondas rápido.\n\n¿Cómo te sientes hoy… realmente?",
    mood: "introspective",
    audioHint: "Silencio + leve viento suave",
    choices: [
      { text: "“Mi mente no se detiene… no puedo dejar de pensar.”", nextNode: "capitulo_1", effect: "glitch", impact: { ansiedad: 10 } },
      { text: "“Siento una presión en el pecho… como si algo no estuviera bien.”", nextNode: "capitulo_1", effect: "pulse", impact: { ansiedad: 15 } },
      { text: "“Estoy cansado… pero no logro descansar.”", nextNode: "capitulo_1", effect: "dim", impact: { ansiedad: 5, paz: -5 } },
      { text: "“Siento que algo malo podría pasar… aunque no sé qué.”", nextNode: "capitulo_1", effect: "vibrate", impact: { ansiedad: 20 } },
      { text: "“Quiero distraerme… no quiero pensar en nada.”", nextNode: "capitulo_1", effect: "blur", impact: { paz: -10 } },
      { text: "“Siento que tengo que resolver todo… o todo saldrá mal.”", nextNode: "capitulo_1", effect: "pure", impact: { ansiedad: 10, fe: -5 } },
      { text: "“Me siento vacío… desconectado.”", nextNode: "capitulo_1", effect: "dim", impact: { paz: -15 } },
      { text: "“No sé qué me pasa… solo sé que no estoy bien.”", nextNode: "capitulo_1", effect: "blur", impact: { ansiedad: 5 } },
    ]
  },

  // --- CAPÍTULO 1: EL SUSURRO DE LA TORMENTA ---
  capitulo_1: {
    id: "capitulo_1",
    title: "Capítulo 1 — El Susurro de la Tormenta",
    content: "Te despiertas antes de que suene la alarma.\n\nNo fue el descanso… ni la luz del día. Fue esa sensación. Ese peso en el pecho… como si algo invisible se hubiera sentado sobre ti mientras dormías.\n\nAbres los ojos. El techo está ahí… pero se siente distinto. Más oscuro. Más cerca. Hoy es el día. No sabes exactamente por qué… pero lo sabes.\n\nTal vez es esa conversación que has estado evitando. Ese pago que no sabes cómo cubrir. O ese pensamiento que no te ha soltado en días.\n\nIntentas respirar profundo… pero el aire no baja. Se queda arriba… atrapado… como todo lo demás.\n\nEl silencio de la casa no ayuda. No es paz. Es eco. Y en ese eco… tu mente empieza a hablar. Rápido. Sin orden. Sin misericordia.\n\n¿Y si sale mal? ¿Y si no puedes? ¿Y si esto es más grande que tú?\n\nTe incorporas lentamente en la cama. Tus manos tiemblan un poco. No es dramático… pero es real. Y lo sabes.\n\nHay días difíciles… y hay días como este. Días donde sientes que el laberinto ya empezó… y tú ya estás dentro. Sin mapa. Sin salida clara.\n\nEsto no es nuevo para ti. Pero hoy… se siente más fuerte. Como una tormenta… contenida… a punto de romperlo todo.\n\nY en medio de eso… una verdad incómoda aparece: No puedes quedarte así.\n\nTienes que decidir. Ahora.",
    mood: "introspective",
    audioHint: "Viento suave + latido lejano",
    choices: [
      { 
        text: "OPCIÓN 1 — CONTROL: Enciendes la luz. Buscas mensajes, noticias, pendientes... algo que te dé control.", 
        nextNode: "capitulo_2", 
        effect: "pure",
        impact: { ansiedad: 15, fe: -5 }
      },
      { 
        text: "OPCIÓN 2 — EVASIÓN: Tomas el teléfono para distraerte. Desaparecer un rato. No pensar.", 
        nextNode: "capitulo_3", 
        effect: "blur",
        impact: { paz: -15, ansiedad: 10 }
      },
      { 
        text: "OPCIÓN 3 — RENDICIÓN: Cierras los ojos otra vez. Susurras: “Dios… ayúdame.”", 
        nextNode: "capitulo_4", 
        effect: "warm",
        impact: { fe: 20, paz: 10, ansiedad: -10 }
      },
    ]
  },

  // --- CAPÍTULO 2: LA ILUSIÓN DEL CONTROL ---
  capitulo_2: {
    id: "capitulo_2",
    title: "Capítulo 2 — La Ilusión del Control",
    content: "Enciendes la luz. Demasiado rápido. Como si la oscuridad tuviera la culpa de lo que estás sintiendo.\n\nTomas el teléfono. Desbloqueas. Pantalla brillante. Información inmediata. Eso se siente mejor… por un segundo.\n\nEmpiezas a revisar. Mensajes. Pendientes. Correos. Notas mentales que ni siquiera escribiste… pero ahí están.\n\nTu mente empieza a armar un plan: “Ok… si hago esto primero… y luego aquello… tal vez pueda evitar que todo se complique…”\n\nRespiras un poco más profundo. No porque estés en paz… sino porque sientes que estás haciendo algo.\n\nPero entonces aparece otro pensamiento: ¿Y si no es suficiente? Y otro: ¿Y si algo sale mal? Y otro más: ¿Y si no estás viendo todo?\n\nRegresas al teléfono. Buscas más información. Más respuestas. Más control. Pero entre más buscas… más posibilidades aparecen. Más variables. Más cosas que podrían salir mal.\n\nTu lista crece. Tu mente también. Tu paz… no.\n\nTe detienes un momento. Solo un segundo. Y en ese segundo… una frase cruza tu mente. No sabes de dónde viene… pero la reconoces:\n\n“¿Quién de ustedes, por mucho que se preocupe, puede añadir una sola hora a su vida?”\n\nSilencio. Sabes la respuesta. Pero no sabes cómo parar.\n\nTus manos siguen en el teléfono. Tu mente sigue corriendo. Y algo dentro de ti empieza a cansarse… de ti mismo.",
    mood: "pure",
    audioHint: "Tic tac + latido leve",
    scripture: {
      reference: "Lucas 12:25",
      text: "¿Quién de ustedes, por mucho que se preocupe, puede añadir una sola hora a su vida?"
    },
    choices: [
      { 
        text: "OPCIÓN 1 — INSISTIR: Aprietas los dientes. Te dices que necesitas pensar mejor.", 
        nextNode: "capitulo_5", 
        impact: { ansiedad: 20, fe: -10 }
      },
      { 
        text: "OPCIÓN 2 — DETENERTE: Bajas lentamente el teléfono. Esto no está trayendo paz.", 
        nextNode: "capitulo_6", 
        impact: { paz: 10, fe: 5 }
      },
    ]
  },

  // --- CAPÍTULO 3: RUIDO QUE ANESTESIA ---
  capitulo_3: {
    id: "capitulo_3",
    title: "Capítulo 3 — Ruido que Anestesia",
    content: "Tomas el teléfono. Pero no buscas respuestas. Buscas silencio… aunque sea artificial.\n\nDeslizas. Un video. Otro. Otro más. Ríes un poco. O al menos… haces el gesto. Tu mente se distrae. Y por un momento… funciona. El ruido interno baja. No desaparece… pero se aleja.\n\nSigues deslizando. No porque quieras… sino porque no quieres detenerte. Porque sabes… que cuando lo hagas… todo va a volver.\n\nY entonces pasa. Sin aviso. Sin transición. Silencio.\n\nMiras la pantalla… pero ya no estás ahí. Tu cuerpo está en la cama. Tu mente… regresó. Y el peso también. Más pesado. Más rápido. Más real.\n\nPorque ahora no solo está el problema… también está el tiempo que perdiste evitándolo.\n\nY en medio de esa sensación… una verdad incómoda se forma: No puedes huir de lo que está dentro de ti. El ruido ayudó… pero no sanó.",
    mood: "blur",
    audioHint: "Scroll, notificaciones -> Silencio abrupto",
    choices: [
      { 
        text: "OPCIÓN 1 — VOLVER A EVADIR: Tomas aire. Abres otra app.", 
        nextNode: "capitulo_3", 
        effect: "vibrate",
        impact: { ansiedad: 10, paz: -10 }
      },
      { 
        text: "OPCIÓN 2 — ENFRENTAR: Apagas la pantalla. El silencio vuelve. Pero esta vez… no huyes.", 
        nextNode: "capitulo_6", 
        impact: { fe: 5, paz: 5 }
      },
    ]
  },

  // --- CAPÍTULO 4: UN SUSURRO EN EL SILENCIO ---
  capitulo_4: {
    id: "capitulo_4",
    title: "Capítulo 4 — Un Susurro en el Silencio",
    content: "Cierras los ojos. No porque tengas paz. Sino porque no la tienes.\n\nTu mente sigue hablando. Pero ya no le respondes. Por primera vez en mucho tiempo… no intentas resolver. No intentas escapar.\n\nSolo dices… “Dios… ayúdame.”\n\nNo fue una oración estructurada. No fue teológica. No fue perfecta. Fue real.\n\nY en ese momento… no todo cambia. Tu situación sigue ahí. Tus pensamientos… también. Pero algo se mueve. Pequeño. Casi imperceptible. Pero distinto.\n\nEs como si el peso… ya no estuviera solo sobre ti.\n\nUna frase llega a tu mente. No la forzaste. No la buscaste. Solo… llegó:\n\n“Echa sobre mí tu carga… porque yo cuido de ti.”\n\nSilencio. No hay música épica. No hay emoción intensa. Solo… espacio.\n\nY en ese espacio… te das cuenta de algo que no esperabas: Tal vez no necesitas tener todas las respuestas… para no estar solo.",
    mood: "warm",
    audioHint: "Silencio + nota suave de piano",
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Echen sobre Él toda su ansiedad… porque Él cuida de ustedes."
    },
    choices: [
      { 
        text: "OPCIÓN 1 — DUDAR: Abres los ojos. Nada cambió afuera. Cuestionas lo que hiciste.", 
        nextNode: "capitulo_2", 
        impact: { fe: -10, ansiedad: 10 }
      },
      { 
        text: "OPCIÓN 2 — PERMANECER: No entiendes todo. Pero decides no levantarte todavía.", 
        nextNode: "capitulo_7", 
        impact: { fe: 25, paz: 25, ansiedad: -15 }
      },
    ]
  },

  // --- CAPÍTULO 5 ---
  capitulo_5: {
    id: "capitulo_5",
    title: "Capítulo 5 — El Punto de Ruptura",
    content: "Tu mente está cansada. Tu cuerpo también. Has tratado de sostener todo… pero ya no puedes.\n\nY en medio de ese cansancio… aparece una verdad incómoda: No tienes el control.",
    mood: "collapse",
    audioHint: "Latido fuerte",
    choices: [
      { text: "Seguir intentando…", nextNode: "final_colapso", impact: { ansiedad: 20 } },
      { text: "Rendirme… aunque me cueste.", nextNode: "capitulo_7", impact: { fe: 25, paz: 20 } },
    ]
  },

  // --- CAPÍTULO 6 ---
  capitulo_6: {
    id: "capitulo_6",
    title: "Capítulo 6 — Cuando ya no puedes más",
    content: "Has intentado ignorarlo. Has intentado controlarlo. Pero sigue ahí.\n\nTal vez el problema… no es que no estás haciendo suficiente.\n\nTal vez… es que estás cargando algo que nunca fue tuyo.",
    mood: "dim",
    audioHint: "Silencio profundo",
    choices: [
      { text: "“Entonces… ¿qué hago?”", nextNode: "capitulo_7", impact: { fe: 10, paz: 10 } },
      { text: "“No… yo tengo que poder solo.”", nextNode: "capitulo_5", impact: { ansiedad: 20, fe: -10 } },
    ]
  },

  // --- CAPÍTULO 7 ---
  capitulo_7: {
    id: "capitulo_7",
    title: "Capítulo 7 — Quietud",
    content: "No fue elegante. No fue fuerte. Pero fue real. Dejaste de luchar… aunque fuera por un momento.\n\ny en ese espacio… no llegó una solución… llegó algo mejor: Presencia.",
    mood: "warm",
    audioHint: "Piano suave",
    scripture: {
      reference: "Salmo 46:10",
      text: "Estad quietos… y conoced que Yo soy Dios."
    },
    transitionText: "Tal vez la paz… no viene de entender todo. Viene de confiar en Aquel que sí lo entiende.",
    choices: [
      { text: "“Quiero aprender a confiar.”", nextNode: "final_libertad", impact: { fe: 30, paz: 30, ansiedad: -40 } },
      { text: "“No sé si puedo… pero guíame.”", nextNode: "final_paz_progresiva", impact: { fe: 15, paz: 15, ansiedad: -20 } },
    ]
  },

  // --- FINALES ---

  final_ciclo: {
    id: "final_ciclo",
    title: "Final: El Ciclo",
    isEnding: true,
    content: "Lo lograste… por ahora. Te distrajiste lo suficiente.\n\nPero mañana… esto va a volver. Porque no lo enfrentaste… solo lo evitaste.\n\nNo estás en paz. Solo estás ocupado.",
    mood: "loop",
    audioHint: "Ruido suave que nunca termina",
    scripture: {
      reference: "Proverbios 28:13",
      text: "El que encubre su pecado no prospera; Mas el que los confiesa y se aparta alcanzará misericordia."
    },
    choices: [
      { text: "Intentar de nuevo", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
    ]
  },

  final_colapso: {
    id: "final_colapso",
    title: "Final: El Colapso",
    isEnding: true,
    content: "Lo intentaste todo. Pensaste en todo. Controlaste todo lo que pudiste.\n\nPero no fue suficiente. Nunca lo será.\n\nNo estás fallando por debilidad… estás fallando porque nunca fuiste diseñado para cargar esto solo.",
    mood: "collapse",
    audioHint: "Saturación -> Silencio abrupto",
    scripture: {
      reference: "Juan 15:5",
      text: "Separados de mí… nada podéis hacer."
    },
    choices: [
      { text: "Rendirme", nextNode: "capitulo_7" }
    ]
  },

  final_paz_progresiva: {
    id: "final_paz_progresiva",
    title: "Final: Paz Progresiva",
    isEnding: true,
    content: "No todo se resolvió. No todo tiene sentido aún. Pero algo cambió.\n\nYa no estás luchando solo. La paz no llegó como emoción… llegó como dirección.",
    mood: "growth",
    audioHint: "Piano suave",
    scripture: {
      reference: "Filipenses 4:7",
      text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús."
    },
    choices: [
      { text: "Seguir creciendo", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
    ]
  },

  final_libertad: {
    id: "final_libertad",
    title: "Final: Libertad en Cristo",
    isEnding: true,
    content: "No controlaste todo. No entendiste todo. Pero soltaste.\n\nY en ese momento… dejaste de ser el centro.\n\nLa paz no vino porque todo cambió… vino porque tú ya no estás tratando de ser Dios.",
    mood: "freedom",
    audioHint: "Viento + música abierta",
    scripture: {
      reference: "Juan 8:36",
      text: "Si el Hijo os libertare… seréis verdaderamente libres."
    },
    choices: [
      { text: "Ayudar a otros a vivir esto", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
    ]
  }
};
