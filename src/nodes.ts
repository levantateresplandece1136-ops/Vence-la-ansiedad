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
    ]
  },

  // --- CAPÍTULO 1: EL SUSURRO DE LA TORMENTA ---
  capitulo_1: {
    id: "capitulo_1",
    title: "Capítulo 1 — El Susurro de la Tormenta",
    content: "Te despiertas antes de que suene la alarma.\n\nNo sabes exactamente por qué.\n\nPero ya estás despierto…\ny tu cuerpo lo sabe antes que tu mente.\n\nHay algo en el pecho. No dolor… pero tampoco es normal.\n\nPeso.\n\nAbres los ojos.\n\nEl techo está ahí…\npero el silencio se siente distinto.\n\nNo es descanso. Es anticipación.\n\nIntentas respirar profundo…\npero el aire no baja del todo.\n\nComo si algo lo detuviera.\n\nTu mente empieza a moverse.\n\nSin orden. Sin permiso.\n\n“Hoy…”\n“No estoy listo…”\n“¿Y si no sale bien?”\n\nNo todo es claro… pero todo se siente urgente.\n\nTe sientas en la cama.\n\nTus manos… apenas tiemblan.\n\nLo suficiente para que lo notes. Lo suficiente para no ignorarlo.\n\nAntes de hacer algo… detente un segundo.\n\nHaz esto:\n\nInhala lento… contando 4\nsostén… 2\nsuelta… 6\n\nOtra vez.\n\nNo cambia todo… pero sí algo. Un pequeño espacio.\n\n¿Qué haces ahora?",
    mood: "introspective",
    audioHint: "Viento suave + latido lejano",
    choices: [
      { 
        text: "Tomas el teléfono casi en automático. Solo quieres ver cómo está todo… tal vez eso te ayude a ordenar el día.", 
        nextNode: "capitulo_2", 
        effect: "pure",
        impact: { ansiedad: 15, fe: -5 }
      },
      { 
        text: "Te quedas sentado. Empiezas a repasar mentalmente lo que viene… como intentando adelantarte a cada posible problema.", 
        nextNode: "capitulo_3", 
        effect: "blur",
        impact: { paz: -15, ansiedad: 10 }
      },
      { 
        text: "Cierras los ojos unos segundos más. No tienes claro qué necesitas… pero tampoco quieres correr todavía.", 
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
    content: "La luz entra de golpe.\n\nTu mente también.\n\nTodo empieza a tomar forma… rápido.\n\nPendientes. Conversaciones. Escenarios.\n\nTe dices que necesitas claridad.\n\nAsí que empiezas a pensar. Ordenar. Prever. Anticipar.\n\n“Si hago esto primero…”\n“y luego aquello…”\n“puedo evitar problemas…”\n\nPor un momento… se siente bien. Como si tuvieras el volante.\n\nPero algo cambia.\n\nUn pensamiento más aparece. Luego otro. Y otro.\n\nAhora ya no estás organizando… estás reaccionando.\n\nAntes de seguir… haz esto:\n\nInhala… 4\nsostén… 2\nsuelta… lento\n\nTu cuerpo intenta bajar… pero tu mente sigue arriba.\n\nUna idea cruza por dentro: “¿Y si no estás viendo todo?”\n\nEso acelera todo otra vez. ¿Qué haces ahora?",
    mood: "pure",
    audioHint: "Tic tac + latido leve",
    scripture: {
      reference: "Lucas 12:25",
      text: "¿Quién de ustedes, por mucho que se preocupe, puede añadir una sola hora a su vida?"
    },
    choices: [
      { 
        text: "Tomas más fuerte el control. Sientes que necesitas pensar mejor… más profundo… más rápido.", 
        nextNode: "capitulo_5", 
        impact: { ansiedad: 20, fe: -10 }
      },
      { 
        text: "Tomas aire… pero tu mente ya está imaginando lo que podría salir mal.", 
        nextNode: "capitulo_6", 
        impact: { paz: 5, ansiedad: 5 }
      },
      { 
        text: "Bajas la mirada un momento. No porque todo esté bien… sino porque ya te cansó intentar resolverlo así.", 
        nextNode: "capitulo_6", 
        impact: { paz: 10, fe: 5 }
      },
    ]
  },

  // --- CAPÍTULO 3: RUIDO QUE ANESTESIA ---
  capitulo_3: {
    id: "capitulo_3",
    title: "Capítulo 3 — Ruido que Anestesia",
    content: "Deslizas.\n\nUna vez. Otra. Otra más.\n\nTu mente baja el ritmo. No porque esté en paz… sino porque está ocupada.\n\nUn video. Otro. Otro.\n\nSin darte cuenta… pasan minutos. Tal vez más.\n\nY por un momento… funciona.\n\nPero cuando te detienes… todo vuelve.\n\nMás claro. Más presente. Más incómodo.\n\nY ahora hay algo más: Sabes que lo evitaste.\n\nAntes de decidir… quédate aquí un segundo.\n\nInhala lento…\nsuelta más lento\n\nNo necesitas salir corriendo todavía. ¿Qué haces ahora?",
    mood: "blur",
    audioHint: "Scroll, notificaciones -> Silencio abrupto",
    choices: [
      { 
        text: "Buscas otro estímulo. Algo más que te distraiga… solo un poco más.", 
        nextNode: "capitulo_3", 
        effect: "vibrate",
        impact: { ansiedad: 10, paz: -10 }
      },
      { 
        text: "Dejas el teléfono a un lado… pero tu mente empieza a llenar el espacio otra vez.", 
        nextNode: "capitulo_6", 
        impact: { fe: 5, paz: 5 }
      },
      { 
        text: "Te quedas en ese silencio incómodo… aunque no te guste.", 
        nextNode: "capitulo_4", 
        effect: "warm",
        impact: { fe: 10, paz: 5 }
      },
    ]
  },

  // --- CAPÍTULO 4: UN SUSURRO EN EL SILENCIO ---
  capitulo_4: {
    id: "capitulo_4",
    title: "Capítulo 4 — Un Susurro en el Silencio",
    content: "No hiciste nada espectacular.\n\nSolo… no huiste.\n\nEl silencio está ahí. Tu mente también. Pero tú… te quedaste.\n\nNo sabes exactamente qué hacer con eso. Así que no haces mucho.\n\nSolo una frase… sale. Sin estructura. Sin filtro: “Dios…”\n\nNo sigues. No porque no quieras… sino porque no sabes cómo.\n\nY aun así… no se siente vacío.\n\nNo hay una respuesta clara. No hay una solución inmediata. Pero algo cambia de lugar.\n\nComo si el peso… ya no estuviera completamente sobre ti.\n\nAntes de moverte… haz esto:\n\nInhala…\nsostén…\nsuelta lento\n\nUna idea llega… suave: “No tienes que cargarlo solo.”\n\nNo sabes si lo crees del todo. Pero tampoco lo rechazas. ¿Qué haces ahora?",
    mood: "warm",
    audioHint: "Silencio + nota suave de piano",
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Echen sobre Él toda su ansiedad… porque Él cuida de ustedes."
    },
    choices: [
      { 
        text: "Abres los ojos. Parte de ti quiere volver a “hacer algo” para sentirse más seguro.", 
        nextNode: "capitulo_2", 
        impact: { fe: -10, ansiedad: 10 }
      },
      { 
        text: "Te quedas unos segundos más… sin tener claro qué está pasando.", 
        nextNode: "capitulo_7", 
        impact: { fe: 25, paz: 25, ansiedad: -15 }
      },
      { 
        text: "Intentas poner en palabras lo que sientes… aunque no sea perfecto.", 
        nextNode: "capitulo_7", 
        impact: { fe: 30, paz: 20 }
      },
    ]
  },

  // --- CAPÍTULO 5 ---
  capitulo_5: {
    id: "capitulo_5",
    title: "Capítulo 5 — El Punto de Ruptura",
    content: "Sigues pensando.\n\nNo porque quieras… sino porque no sabes cómo detenerte.\n\nTu mente va rápido. Pero ya no se siente útil. Se siente pesada.\n\nLas ideas ya no traen claridad. Solo más ruido.\n\n“¿Y si no es suficiente?”\n“¿Y si ya es demasiado tarde?”\n“¿Y si esto se sale de control?”\n\nTu cuerpo responde.\n\nMandíbula tensa. Hombros rígidos. Respiración corta.\n\nTe das cuenta de algo… incómodo.\n\nYa no estás resolviendo. Estás sobreviviendo dentro de tu propia mente.\n\nY eso cansa. Más de lo que quieres admitir.\n\nAntes de seguir… detente aquí.\n\nHaz esto:\n\nInhala lento… contando 4\nsostén… 2\nsuelta… 6\n\nOtra vez.\n\nNo necesitas calmar todo. Solo bajar un poco.\n\nTu mente intenta volver. Pero ahora… hay un pequeño espacio.\n\nEn ese espacio… aparece algo diferente: No un pensamiento. Una verdad.\n\nNo tienes que poder con todo esto.\n\nNo sabes si lo crees del todo. Pero tampoco puedes ignorarlo. ¿Qué haces ahora?",
    mood: "collapse",
    audioHint: "Latido fuerte",
    choices: [
      { 
        text: "Aprietas un poco más. Sientes que si aflojas… todo se va a desordenar.", 
        nextNode: "final_colapso", 
        impact: { ansiedad: 20 } 
      },
      { 
        text: "Intentas organizar tus ideas otra vez… pero ya sin tanta claridad.", 
        nextNode: "capitulo_5", 
        impact: { ansiedad: 10 } 
      },
      { 
        text: "Te quedas quieto unos segundos… sin intentar resolver nada.", 
        nextNode: "capitulo_7", 
        impact: { fe: 25, paz: 20 } 
      },
    ]
  },

  // --- CAPÍTULO 6 ---
  capitulo_6: {
    id: "capitulo_6",
    title: "Capítulo 6 — Cuando ya no puedes más",
    content: "El impulso de hacer algo… baja.\n\nNo desaparece. Pero pierde fuerza.\n\nYa no estás corriendo. Pero tampoco sabes hacia dónde ir.\n\nEs un lugar extraño. Sin ruido excesivo… pero sin respuestas claras.\n\nTu cuerpo empieza a aflojar un poco. No completamente. Pero lo suficiente.\n\nY en ese espacio… te das cuenta de algo que habías evitado: No puedes con esto solo.\n\nNo como fracaso. Como realidad.\n\nY curiosamente… eso no te rompe. Te ubica.\n\nAntes de moverte… haz esto:\n\nInhala…\nsostén…\nsuelta lento\n\nOtra vez.\n\nNo solucionó todo. Pero ya no estás igual.\n\nUna idea se forma… sin presión: “Puedes soltar… aunque sea un poco.”\n\nNo sabes cómo hacerlo completamente. Pero puedes empezar. ¿Qué haces ahora?",
    mood: "dim",
    audioHint: "Silencio profundo",
    choices: [
      { 
        text: "Una parte de ti quiere volver a hacer algo… aunque ya viste que no ayudó mucho.", 
        nextNode: "capitulo_2", 
        impact: { ansiedad: 15, fe: -5 } 
      },
      { 
        text: "Te quedas ahí… dejando que el momento sea lo que es.", 
        nextNode: "capitulo_7", 
        impact: { fe: 15, paz: 15 } 
      },
      { 
        text: "Intentas decir en voz baja lo que realmente estás sintiendo… aunque no suene ordenado.", 
        nextNode: "capitulo_7", 
        impact: { fe: 20, paz: 10 } 
      },
    ]
  },

  // --- CAPÍTULO 7 ---
  capitulo_7: {
    id: "capitulo_7",
    title: "Capítulo 7 — Quietud",
    content: "No pasó algo espectacular.\n\nNo hubo un cambio brusco. Pero algo es distinto.\n\nNo estás corriendo. No estás empujando. No estás evitando.\n\nSolo… estás.\n\nTu respiración se siente más profunda. No perfecta. Pero más estable.\n\nTu mente sigue trayendo pensamientos. Pero ya no tienen el mismo peso.\n\nNo porque desaparecieron… sino porque ya no los estás sosteniendo igual.\n\nEs sutil. Pero real.\n\nAntes de avanzar… quédate aquí:\n\nInhala… 4\nsostén… 2\nsuelta… 6\n\nEn medio de esa quietud… aparece algo que no estabas buscando: No una respuesta. Una dirección.\n\nNo tienes que resolver todo hoy.\n\nOtra más: No todo depende de ti.\n\nNo sabes cómo… eso trae espacio.\n\nY en ese espacio… aparece algo nuevo: Confianza. Pequeña. Frágil. Pero presente. ¿Qué haces ahora?",
    mood: "warm",
    audioHint: "Silencio profundo + piano muy suave",
    scripture: {
      reference: "Salmo 46:10",
      text: "Estad quietos… y conoced que Yo soy Dios."
    },
    choices: [
      { 
        text: "Empiezas a pensar en lo que viene… pero desde un lugar un poco más tranquilo.", 
        nextNode: "final_paz_progresiva", 
        impact: { fe: 20, paz: 20, ansiedad: -20 } 
      },
      { 
        text: "Te quedas unos momentos más… sin prisa por salir de aquí.", 
        nextNode: "final_libertad", 
        impact: { fe: 40, paz: 40, ansiedad: -50 } 
      },
      { 
        text: "Dices en voz baja lo que estás soltando… aunque no sepas cómo hacerlo perfecto.", 
        nextNode: "final_libertad", 
        impact: { fe: 30, paz: 30, ansiedad: -40 } 
      },
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
      { text: "Intentar de nuevo (desde la honestidad)", nextNode: "introspeccion", impact: { ansiedad: -100, paz: -100, fe: -100 } }
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
      { text: "“Rendirme y admitir que no puedo solo”", nextNode: "capitulo_7" }
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
