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
  imagePrompt?: string; // For future/reference if I want to generate visuals
}

export const STORY_NODES: Record<string, StoryNode> = {
  inicio: {
    id: "inicio",
    title: "El Horizonte Nublado",
    content: "Recibes una noticia abrumadora. Las cifras no cuadran, el médico tiene ceño fruncido o esa llamada familiar te ha dejado frío. Sientes que el aire te falta y el corazón golpea tu pecho como un tambor frenético. La ansiedad no es una idea, es un síntoma físico que invade tu presente.",
    choices: [
      {
        text: "Encerrarte a hacer planes y cuentas para resolverlo ahora mismo.",
        nextNode: "agotamiento_inicial",
        isBiblical: false,
      },
      {
        text: "Detenerte, respirar y buscar una guía superior.",
        nextNode: "paz_inicial",
        isBiblical: true,
      }
    ]
  },
  agotamiento_inicial: {
    id: "agotamiento_inicial",
    title: "El Peso del Mundo",
    content: "Son las 3 AM. Las hojas de papel están llenas de tachones y tu mente es un torbellino de escenarios catastróficos. Has intentado controlarlo todo, pero el futuro sigue pareciendo un monstruo insaciable. El agotamiento es total.",
    choices: [
      {
        text: "Buscar alivio momentáneo en distracciones (redes o comida).",
        nextNode: "distraccion",
        isBiblical: false,
      },
      {
        text: "Rendirte finalmente y elevar una oración honesta.",
        nextNode: "paz_inicial",
        isBiblical: true,
      }
    ]
  },
  distraccion: {
    id: "distraccion",
    title: "El Vacío de la Distracción",
    content: "Pasas horas saltando de video en video, comiendo algo que no necesitabas. El ruido externo acalla el ruido interno por un momento, pero cuando dejas la pantalla, el silencio es aún más pesado. La raíz del miedo sigue ahí, intacta.",
    choices: [
      {
        text: "Volver a intentar resolverlo por tu cuenta.",
        nextNode: "agotamiento_inicial",
        isBiblical: false,
      },
      {
        text: "Soltar el control y buscar la paz que no depende de ti.",
        nextNode: "paz_inicial",
        isBiblical: true,
      }
    ]
  },
  paz_inicial: {
    id: "paz_inicial",
    title: "La Puerta de la Paz",
    content: "Decides que no puedes cargar esto solo. Te arrodillas o simplemente cierras los ojos en el sofá. Admitir que eres vulnerable es el primer paso hacia la verdadera fortaleza. Escuchas un susurro en tu espíritu: 'No temas'.",
    choices: [
      {
        text: "¿Qué dice Dios sobre mi futuro?",
        nextNode: "rumiar_pensamientos",
      },
      {
        text: "¿Cómo enfrento mi escasez económica?",
        nextNode: "miedo_escasez",
      },
      {
        text: "Siento que el miedo me paraliza.",
        nextNode: "ataque_panico",
      }
    ],
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Echen toda su ansiedad sobre él, porque él tiene cuidado de ustedes."
    }
  },
  rumiar_pensamientos: {
    id: "rumiar_pensamientos",
    title: "El Rumiar de Pensamientos",
    content: "Tus pensamientos son como un disco rayado. Replay, replay, replay. Pero hay una invitación a depositar esa carga en un lugar seguro. No es ignorar el problema, es transferir la propiedad del mismo.",
    scripture: {
      reference: "1 Pedro 5:7",
      text: "Poniendo toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros."
    },
    choices: [
      {
        text: "Aceptar esta entrega diaria.",
        nextNode: "final_paz",
        isBiblical: true,
      },
      {
        text: "Sentir que es demasiado simple para ser verdad.",
        nextNode: "soledad",
        isBiblical: false,
      }
    ]
  },
  miedo_escasez: {
    id: "miedo_escasez",
    title: "El Miedo a la Escasez",
    content: "Ves las facturas y el saldo. El miedo te dice que no habrá suficiente. Pero mira por la ventana: las aves no siembran ni siegan, y tu Padre celestial las alimenta. ¿No vales tú mucho más que ellas?",
    scripture: {
      reference: "Mateo 6:25-34",
      text: "No se afanen, pues, diciendo: ¿Qué comeremos, o qué beberemos, o qué vestiremos?... vuestro Padre celestial sabe que tenéis necesidad de todas estas cosas."
    },
    choices: [
      {
        text: "Confiar en su provisión hoy.",
        nextNode: "final_paz",
        isBiblical: true,
      },
      {
        text: "Dudar porque mi situación es 'especial'.",
        nextNode: "soledad",
      }
    ]
  },
  ataque_panico: {
    id: "ataque_panico",
    title: "La Paz que Sobrepasa Entendimiento",
    content: "El miedo es tan grande que no puedes actuar. En lugar de luchar contra el síntoma, la Biblia te invita a presentar tu petición con acción de gracias. El agradecimiento cambia la química del alma.",
    scripture: {
      reference: "Filipenses 4:6-7",
      text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias."
    },
    choices: [
      {
        text: "Dar gracias incluso antes de ver la solución.",
        nextNode: "final_paz",
        isBiblical: true,
      },
      {
        text: "Seguir enfocado en el síntoma.",
        nextNode: "agotamiento_inicial",
      }
    ]
  },
  soledad: {
    id: "soledad",
    title: "Sentimiento de Soledad",
    content: "Sientes que nadie entiende tu lucha. Pero hay un Pastor que camina contigo incluso en el valle de sombra de muerte. No estás solo, estás siendo guiado por manos expertas.",
    scripture: {
      reference: "Salmo 23",
      text: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo."
    },
    choices: [
      {
        text: "Aceptar su compañía.",
        nextNode: "final_paz",
        isBiblical: true,
      },
      {
        text: "Mantenerme en mi aislamiento.",
        nextNode: "agotamiento_inicial",
      }
    ]
  },
  final_paz: {
    id: "final_paz",
    title: "Un Nuevo Comienzo",
    content: "El problema externo puede no haber desaparecido aún, pero tú has cambiado. Tienes una paz que el mundo no da y que no puede quitar. Descansas en la soberanía de quien te amó primero.",
    scripture: {
      reference: "Isaías 43:18-19",
      text: "No recordéis las cosas pasadas... He aquí que yo hago cosa nueva; pronto saldrá a luz."
    },
    choices: [
      {
        text: "Volver a empezar el viaje.",
        nextNode: "inicio",
      }
    ]
  },
};
