/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Choice {
  text: string;
  nextNode: string;
  isBiblical?: boolean;
}

export interface StoryNode {
  id: string;
  title?: string;
  content: string;
  choices: Choice[];
  scripture?: {
    reference: string;
    text: string;
  };
  imagePrompt?: string;
  peaceDelta?: number; // Score change: positive for peace, negative for stress
  voicePrompt?: string; // The phrase the voice says at the end of the chapter
}

export const STORY_NODES: Record<string, StoryNode> = {
  inicio: {
    id: "inicio",
    title: "Capítulo 1: El Susurro de la Tormenta",
    content: "Te despiertas antes de que suene la alarma. No es el sol lo que te ha levantado, sino una sensación familiar: un peso opresivo en el pecho, como si una piedra invisible se hubiera instalado allí mientras dormías. Abres los ojos y la oscuridad del techo parece más densa de lo normal.\n\nHoy es el día. Tienes que enfrentar esa conversación que has estado postergando, o quizás es ese pago que no sabes cómo cubrir, o ese diagnóstico que sigue dando vueltas en tu cabeza. Sientes que el aire no llega al fondo de tus pulmones. El silencio de la casa, en lugar de darte paz, amplifica el ruido de tus propios pensamientos, que corren a mil kilómetros por hora, dibujando los peores escenarios posibles.\n\nTe sientas en la orilla de la cama. Tus manos tiemblan ligeramente. Tienes la sensación de que el día es un laberinto y tú ya estás perdido antes de dar el primer paso.\n\nLa ansiedad no es un extraño para ti, pero hoy se siente como una tormenta que está a punto de desbordar la presa. Sabes que tienes que hacer algo ahora mismo, antes de que el pánico te paralice por completo.",
    peaceDelta: 0,
    voicePrompt: "¿Buscarás respuestas en el ruido del mundo o te detendrás a escuchar el silencio de lo alto?",
    choices: [
      {
        text: "Encender la luz, tomar el teléfono y buscar soluciones rápidas.",
        nextNode: "cap2",
        isBiblical: false,
      },
      {
        text: "Permanecer en silencio y buscar una conexión con lo alto.",
        nextNode: "cap3",
        isBiblical: true,
      }
    ]
  },
  cap2: {
    id: "cap2",
    title: "Capítulo 2: El Laberinto de Cristal",
    peaceDelta: -15,
    voicePrompt: "Tu mente es un laberinto sin salida. ¿Insistirás en tu propia prudencia o soltarás las riendas por fin?",
    content: "La luz blanca de la pantalla de tu teléfono te lastima los ojos, pero no la apagas. Tus dedos se mueven con rapidez, saltando de una aplicación a otra. Buscas respuestas, buscas culpables o simplemente algo que te distraiga del nudo que tienes en la garganta.\n\nEntras a tus correos y ves el asunto de un mensaje que te genera más presión. Abres una red social y, por un momento, te pierdes en las vidas perfectas de otros, lo que solo logra que tu propia situación se sienta más pesada y solitaria. El tiempo vuela; han pasado cuarenta minutos y no has resuelto nada, pero tu mente está ahora más agotada.\n\nIntentas trazar un plan. Sacas una libreta y empiezas a anotar posibles soluciones, pero cada 'Plan A' te lleva a un nuevo miedo, y cada 'Plan B' parece imposible de ejecutar. Te sientes como si estuvieras en una habitación llena de espejos donde cada reflejo es una preocupación diferente. La autosuficiencia se está convirtiendo en tu propia celda.",
    choices: [
      {
        text: "Seguir forzando la mente hasta tener un plan de acción lógico.",
        nextNode: "cap4",
        isBiblical: false,
      },
      {
        text: "Reconocer que necesitas una sabiduría que no es la tuya.",
        nextNode: "cap5",
        isBiblical: true,
      }
    ]
  },
  cap3: {
    id: "cap3",
    title: "Capítulo 3: La Ruta de la Rendición",
    peaceDelta: 20,
    voicePrompt: "La paz ha llegado, pero la batalla continúa. ¿Saldrás a enfrentar el día ahora o te armarás primero con la Verdad?",
    content: "Decides que no puedes cargar esto solo. Te arrodillas o simplemente cierras los ojos en el sofá. Admitir que eres vulnerable es el primer paso hacia la verdadera fortaleza. Escuchas un susurro en tu espíritu: 'No temas'.\n\nEn lugar de luchar contra el síntoma, decides presentar tu petición con acción de gracias. El agradecimiento comienza a cambiar la química de tu alma.",
    scripture: {
      reference: "Filipenses 4:6-7",
      text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias."
    },
    choices: [
      {
        text: "Levantarme para tomar una acción específica con paz.",
        nextNode: "cap6",
      },
      {
        text: "Blindar mis pensamientos antes de salir.",
        nextNode: "cap7",
      }
    ]
  },
  cap4: {
    id: "cap4",
    title: "Capítulo 4: El Agotamiento Extremo",
    peaceDelta: -20,
    content: "Ignoras el cansancio. Te convences de que si te detienes ahora, perderás el control para siempre. Pasan las horas y el esfuerzo intelectual se convierte en una obsesión. Tu juicio se nubla.\n\n¿Y quién de vosotros podrá, por mucho que se afane, añadir a su estatura un codo? Te rodea un agotamiento que nubla hasta la vista.",
    scripture: {
      reference: "Mateo 6:27",
      text: "¿Y quién de vosotros podrá, por mucho que se afane, añadir a su estatura un codo?"
    },
    choices: [
      {
        text: "Seguir forzando una solución desesperada.",
        nextNode: "cap8",
        isBiblical: false,
      },
      {
        text: "Sustituye la terquedad por humildad y oración.",
        nextNode: "cap5",
        isBiblical: true,
      }
    ]
  },
  cap5: {
    id: "cap5",
    title: "Capítulo 5: La Transferencia de la Carga",
    peaceDelta: 25,
    voicePrompt: "La carga ya no es tuya. ¿Confiarás tu descanso a Dios o te levantarás con una nueva dirección?",
    content: "El sonido de la pluma al caer sobre la mesa parece un estruendo en medio de tu agotamiento. Miras tus notas, tus planes y tus círculos lógicos, y finalmente comprendes la verdad: no fuiste diseñado para cargar el peso de un futuro que no te pertenece.\n\n'Señor, admito que no puedo. He intentado ser mi propio salvador y solo he logrado agotarme. Te entrego esta situación, mis miedos y mi necesidad de control'.",
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Depositen en él toda su ansiedad, porque él cuida de ustedes."
    },
    choices: [
      {
        text: "Confiar y descansar físicamente (Dormir).",
        nextNode: "cap9",
      },
      {
        text: "Levantarse para actuar guiado por la paz.",
        nextNode: "cap6",
      }
    ]
  },
  cap6: {
    id: "cap6",
    title: "Capítulo 6: Sabiduría en Movimiento",
    peaceDelta: 10,
    content: "Te levantas de tu lugar de oración con una sensación extraña pero reconfortante: los problemas externos no han cambiado, pero tú sí. El nudo en la garganta ha cedido su lugar a una claridad que no habías sentido en semanas.\n\nEntiendes que no necesitas ver todo el camino hasta el final; solo necesitas luz para el siguiente paso. Con una mente despejada, vuelves a mirar esa lista de problemas que antes te aterraba.",
    scripture: {
      reference: "Santiago 1:5",
      text: "Si alguno de ustedes tiene falta de sabiduría, pídela a Dios, el cual da a todos abundantemente y sin reproche."
    },
    choices: [
      {
        text: "Enfrentar el problema con honestidad total.",
        nextNode: "cap10",
      },
      {
        text: "Buscar el consejo de una persona madura en la fe.",
        nextNode: "cap11",
      }
    ]
  },
  cap7: {
    id: "cap7",
    title: "Capítulo 7: La Armadura de la Mente",
    peaceDelta: 15,
    content: "Aunque sientes paz, sabes que la mente es un campo de batalla. Decides no salir de tu habitación sin antes 'blindar' tus pensamientos.\n\nEntiendes que la ansiedad volverá a atacar en cuanto pongas un pie fuera, pero ahora tienes una estrategia: cada vez que un pensamiento de miedo aparezca, lo reemplazarás inmediatamente con una promesa de Dios.",
    scripture: {
      reference: "Isaías 26:3",
      text: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado."
    },
    choices: [
      {
        text: "Aplicar esta fortaleza en mi situación real.",
        nextNode: "cap6",
      }
    ]
  },
  cap8: {
    id: "cap8",
    title: "Capítulo 8: El Muro de la Terquedad",
    peaceDelta: -30,
    content: "Ignoras el cansancio. Tomas una decisión apresurada basada en el pánico, enviando un mensaje impulsivo o firmando un compromiso que no puedes cumplir.\n\nAl amanecer, la situación es peor que al principio. No solo tienes el problema original, sino que ahora has dañado una relación o tu propia salud por no saber parar. Has llegado a un final amargo.",
    choices: [
      {
        text: "Recomenzar y probar un camino diferente.",
        nextNode: "inicio",
      }
    ]
  },
  cap9: {
    id: "cap9",
    title: "Capítulo 9: El Reposo del Justo",
    peaceDelta: 15,
    content: "Cierras los ojos y dejas que el silencio te envuelva. Recordando el Salmo 127:2, te permites dormir. Mientras descansas, tu cuerpo se recupera y tu mente se limpia del cortisol acumulado por el estrés.\n\nAl despertar, la situación no ha cambiado, pero tus ojos ven con una claridad que el agotamiento te negaba.",
    scripture: {
      reference: "Salmo 127:2",
      text: "Pues que a su amado dará Dios el sueño."
    },
    choices: [
      {
        text: "Tomar decisiones ahora con mente renovada.",
        nextNode: "cap6",
      }
    ]
  },
  cap10: {
    id: "cap10",
    title: "Capítulo 10: La Victoria de la Integridad",
    peaceDelta: 20,
    content: "Hablas con honestidad. No intentas manipular la situación, ni exagerar tus méritos, ni esconder tus faltas bajo una capa de excusas. Expones la realidad con una claridad que te sorprende incluso a ti mismo.\n\nHas aprendido que la ansiedad pierde su poder cuando dejas de huir y empiezas a caminar en la verdad.",
    scripture: {
      reference: "Proverbios 11:3",
      text: "La integridad de los rectos los encaminará."
    },
    choices: [
      {
        text: "Convertir mi prueba en un testimonio para otros.",
        nextNode: "cap12",
      },
      {
        text: "Fortalecer mi vida de oración para el futuro.",
        nextNode: "cap13",
      }
    ]
  },
  cap11: {
    id: "cap11",
    title: "Capítulo 11: El Refugio de la Comunidad",
    peaceDelta: 15,
    content: "Llamas a un mentor o a un hermano en la fe en quien confías plenamente. Al principio te cuesta hablar, pero al exponer tus miedos en voz alta, estos parecen perder su tamaño gigantesco.\n\nEsa persona escucha, ora contigo y te recuerda una perspectiva que tú habías olvidado.",
    scripture: {
      reference: "Proverbios 11:14",
      text: "Donde no hay dirección sabia, caerá el pueblo; mas en la multitud de consejeros hay seguridad."
    },
    choices: [
      {
        text: "Aplicar el consejo y actuar con integridad.",
        nextNode: "cap10",
      }
    ]
  },
  cap12: {
    id: "cap12",
    title: "Capítulo 12: La Belleza de las Cicatrices",
    peaceDelta: 10,
    content: "Mirás hacia atrás y apenas podés creer que sos la misma persona que despertó con el pecho oprimido. Tu ansiedad, una vez tu mayor debilidad, se ha transformado en tu herramienta más poderosa para servir a los demás. El propósito ha redimido tu dolor.",
    scripture: {
      reference: "2 Corintios 1:4",
      text: "El cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar a los que están en cualquier tribulación."
    },
    choices: [
      {
        text: "Profundizar en la Roca para estar siempre listo.",
        nextNode: "cap13",
      },
      {
        text: "Finalizar este viaje con gratitud.",
        nextNode: "fin",
      }
    ]
  },
  cap13: {
    id: "cap13",
    title: "Capítulo 13: La Roca Sólida",
    peaceDelta: 15,
    content: "Decides establecer un 'Protocolo de Paz' diario. No esperarás a que el pecho te opima para buscar a Dios; lo harás cuando todo esté en calma. Entrenas tu mente para que el primer impulso ante un problema sea la oración y no el análisis obsesivo.",
    scripture: {
      reference: "Mateo 7:24-25",
      text: "Cualquiera, pues, que me oye estas palabras, y las hace, le compararé a un hombre prudente, que edificó su casa sobre la roca."
    },
    choices: [
      {
        text: "Empezar a vivir esta nueva realidad.",
        nextNode: "fin",
      }
    ]
  },
  fin: {
    id: "fin",
    title: "Victoria: Una Nueva Historia",
    peaceDelta: 10,
    content: "Has cruzado el valle. El camino no termina aquí, pero ahora llevas contigo una brújula eterna y una paz que el mundo no puede darte. Mañana habrá nuevos desafíos, pero hoy, al fin, puedes descansar.\n\n'Te doy gracias por mi vida y por Tu paz'.",
    choices: [
      {
        text: "Volver a empezar el viaje.",
        nextNode: "inicio",
      }
    ]
  }
};
