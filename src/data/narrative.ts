export type ZoneId = 'inicio' | 'ruido' | 'huida' | 'peso' | 'quiebre' | 'quietud' | 'camino';

export type RoomId = 
  | 'welcome' 
  | 'reaction'
  // Zona 1: El Ruido
  | 'what-if' | 'invisible-clock' | 'need-to-fix' | 'storm-before-dawn' | 'many-open-tabs'
  // Zona 2: La Huida
  | 'anesthetic-noise' | 'thousand-screens' | 'disappearing-sofa' | 'one-more-minute' | 'hunger-unnamed'
  // Zona 3: El Peso
  | 'invisible-tiredness' | 'full-backpack' | 'empty-room' | 'silent-chair' | 'long-night'
  // Zona 4: El Quiebre
  | 'cannot-continue' | 'awkward-silence' | 'truth-avoided' | 'emotional-floor'
  // Zona 5: La Quietud
  | 'stillness' | 'breathe-again' | 'open-window' | 'safe-place'
  // Zona 6: El Camino
  | 'pending-call' | 'need-to-say' | 'small-step' | 'live-again'
  | 'room-of-shadows' | 'grace-garden' | 'the-well';

export interface Choice {
  text: string;
  nextRoom: RoomId;
}

export interface MicroExercise {
  title: string;
  instructions: string;
  duration?: number; // in seconds
}

export interface Room {
  id: RoomId;
  zone: ZoneId;
  sensoryOpening: string;
  internalRefleciton: string;
  pauseText: string;
  microExercise?: MicroExercise;
  sownTruth: string;
  choices: Choice[];
  theme: {
    bg: string;
    text: string;
    accent: string;
  };
  metadata: {
    energy: 'high' | 'medium' | 'low';
    focus: string[]; // e.g. ['ansiedad', 'control', 'evasion']
  };
}

export const ROOMS: Record<RoomId, Room> = {
  welcome: {
    id: 'welcome',
    zone: 'inicio',
    sensoryOpening: "¿Cómo se siente hoy tu mundo interior... realmente?",
    internalRefleciton: "No busques la respuesta correcta. No hay nada que demostrar aquí. Siente el peso de tu espalda contra la silla, el aire en tu garganta. Deja que el silencio sea el espacio donde tu cuerpo hable por ti.",
    pauseText: "Detente. Solo por este segundo.",
    sownTruth: "Tú has conocido mi sentarme y mi levantarme; has entendido desde lejos mis pensamientos.",
    choices: [
      { text: "Mi mente no se apaga.", nextRoom: 'reaction' },
      { text: "Quiero desaparecer un rato.", nextRoom: 'reaction' },
      { text: "Estoy cansado aunque dormí.", nextRoom: 'reaction' },
      { text: "Todo me irrita.", nextRoom: 'reaction' },
      { text: "Siento presión todo el tiempo.", nextRoom: 'reaction' },
      { text: "No sé qué me pasa.", nextRoom: 'reaction' },
      { text: "Extraño sentir paz.", nextRoom: 'reaction' },
      { text: "Siento que cargo demasiado.", nextRoom: 'reaction' }
    ],
    theme: { bg: 'bg-zinc-950', text: 'text-zinc-400', accent: 'zinc' },
    metadata: { energy: 'low', focus: ['inicio'] }
  },
  reaction: {
    id: 'reaction',
    zone: 'inicio',
    sensoryOpening: "Sientes el eco de ese estado. Es una habitación en la que has estado mil veces, ¿verdad?",
    internalRefleciton: "Observa tu primer impulso —ese nudo en el estómago que te pide correr o pelear—. No lo juzgues. Es lo que has aprendido para sobrevivir. Pero hoy, tal vez, no necesites defenderte.",
    pauseText: "Respira hondo.",
    sownTruth: "Hay un lugar de descanso que no depende de tus fuerzas. Quizá hoy estás invitado a él.",
    choices: [
      { text: "Busco distraerme con rapidez.", nextRoom: 'anesthetic-noise' },
      { text: "Pienso demasiado intentando resolverlo.", nextRoom: 'what-if' },
      { text: "Me alejo de todo y de todos.", nextRoom: 'invisible-tiredness' },
      { text: "Sigo trabajando para no sentir.", nextRoom: 'invisible-clock' },
      { text: "Busco ruido para no escuchar.", nextRoom: 'thousand-screens' }
    ],
    theme: { bg: 'bg-stone-950', text: 'text-stone-400', accent: 'stone' },
    metadata: { energy: 'medium', focus: ['reaccion'] }
  },

  // ZONA 1: EL RUIDO
  'what-if': {
    id: 'what-if',
    zone: 'ruido',
    sensoryOpening: "Entras al cuarto de los '¿Y si...?'. El aire es espeso, lleno de voces que ensayan futuros que aún no existen.",
    internalRefleciton: "Tu mente está proyectando mil finales posibles. Crees que si repasas cada escenario de dolor, estarás a salvo. Pero pelear con fantasmas te quita el aire para vivir el hoy.",
    pauseText: "Baja la guardia. No hay ningún ataque ocurriendo ahora.",
    microExercise: {
      title: "Vuelve al Aquí",
      instructions: "Toca algo frío o rugoso cerca de ti. Siente la textura. Nombra tres cosas que ves. El futuro puede esperar."
    },
    sownTruth: "Bástale a cada día su propio afán. No necesitas adelantar los dolores de mañana.",
    choices: [
      { text: "Sigues intentando predecir el desenlace.", nextRoom: 'need-to-fix' },
      { text: "Te permites no saber el final por hoy.", nextRoom: 'awkward-silence' },
      { text: "Buscas algo que te distraiga.", nextRoom: 'anesthetic-noise' }
    ],
    theme: { bg: 'bg-slate-950', text: 'text-slate-300', accent: 'slate' },
    metadata: { energy: 'high', focus: ['ansiedad', 'control'] }
  },
  'invisible-clock': {
    id: 'invisible-clock',
    zone: 'ruido',
    sensoryOpening: "Un pulso constante atraviesa esta habitación. Es un reloj que no ves, pero que sientes golpeando suavemente en tu nuca. Vas tarde, dice.",
    internalRefleciton: "Crees que tu valor se mide en tareas completadas. Has convertido la urgencia en tu respiración natural, pero incluso el Creador se detuvo a contemplar lo que no 'producía' nada más que belleza.",
    pauseText: "Detén la carrera. Solo un minuto.",
    microExercise: {
      title: "Presencia Inmóvil",
      instructions: "Quédate perfectamente quieto. Nota la tensión en tu mandíbula y exhala como si soltaras un peso. Nadie te está juzgando ahora."
    },
    sownTruth: "En descanso y en reposo seréis salvos. La quietud no es tiempo perdido, es vida recuperada.",
    choices: [
      { text: "Revisas mentalmente tu lista de pendientes.", nextRoom: 'many-open-tabs' },
      { text: "Dejas que el tiempo pase sin ser su dueño.", nextRoom: 'stillness' },
      { text: "Sientes que el peso es demasiado.", nextRoom: 'full-backpack' }
    ],
    theme: { bg: 'bg-zinc-900', text: 'text-zinc-400', accent: 'zinc' },
    metadata: { energy: 'medium', focus: ['presion', 'logro'] }
  },
  'need-to-fix': {
    id: 'need-to-fix',
    zone: 'ruido',
    sensoryOpening: "Todo aquí parece al borde del colapso. Sientes que si quitas las manos por un segundo, el mundo entero se vendrá abajo.",
    internalRefleciton: "Tus hombros están cerca de tus orejas. Has asumido la responsabilidad de arreglar corazones y situaciones que nunca te pertenecieron. No fuiste diseñado para sostener el firmamento tú solo.",
    pauseText: "Suelta las cuerdas. No vas a caer.",
    microExercise: {
      title: "Visualización de Entrega",
      instructions: "Imagina que pones cada nudo en manos de Alguien que sabe desatarlos sin romper el hilo. Suéltalo mentalmente."
    },
    sownTruth: "Fíate de todo tu corazón, no de tu propia inteligencia. Tus manos son pequeñas, pero las Suyas no.",
    choices: [
      { text: "Intentas atar un nudo más.", nextRoom: 'full-backpack' },
      { text: "Abres la ventana y dejas entrar aire.", nextRoom: 'open-window' },
      { text: "Te sientas en el suelo, reconociendo tu límite.", nextRoom: 'cannot-continue' }
    ],
    theme: { bg: 'bg-stone-900', text: 'text-stone-300', accent: 'stone' },
    metadata: { energy: 'high', focus: ['control', 'responsabilidad'] }
  },
  'storm-before-dawn': {
    id: 'storm-before-dawn',
    zone: 'ruido',
    sensoryOpening: "El cielo está oscuro y el viento golpea las ventanas. Algo malo parece venir, aunque no sabes qué es.",
    internalRefleciton: "La hipervigilancia es tu escudo, pero también tu prisión. Estás tan atento al peligro que no ves la presencia del Compañero.",
    pauseText: "Escucha el viento.",
    microExercise: {
      title: "Escribir el Miedo",
      instructions: "¿Qué estás intentando controlar con tanto esfuerzo? Solo nómbralo en silencio."
    },
    sownTruth: "¿Por qué teméis, hombres de poca fe? Entonces, levantándose, reprendió a los vientos y al mar; y se hizo grande bonanza.",
    choices: [
      { text: "Te escondes en el sofá.", nextRoom: 'disappearing-sofa' },
      { text: "Buscas un lugar seguro.", nextRoom: 'safe-place' },
      { text: "Te quedas mirando la tormenta.", nextRoom: 'long-night' }
    ],
    theme: { bg: 'bg-indigo-950', text: 'text-indigo-200', accent: 'indigo' },
    metadata: { energy: 'high', focus: ['miedo', 'incertidumbre'] }
  },
  'many-open-tabs': {
    id: 'many-open-tabs',
    zone: 'ruido',
    sensoryOpening: "Tu mente tiene demasiadas pestañas abiertas al mismo tiempo.",
    internalRefleciton: "Saltas de un pendiente a un recuerdo, de un miedo a un deseo. Nunca descansas. Crees que ser rápido es ser eficiente, pero es solo dispersión.",
    pauseText: "Cierra una pestaña.",
    microExercise: {
      title: "Enfoque Único",
      instructions: "Elige UNA sola cosa importante para tu alma hoy. Una sola. Respira pensando en ella."
    },
    sownTruth: "Marta, Marta, afanada y turbada estás con muchas cosas. Pero solo una cosa es necesaria.",
    choices: [
      { text: "Intentas cerrarlas todas a la vez.", nextRoom: 'anesthetic-noise' },
      { text: "Caminas hacia la quietud.", nextRoom: 'stillness' },
      { text: "Te distraes con un poco de ruido.", nextRoom: 'thousand-screens' }
    ],
    theme: { bg: 'bg-neutral-900', text: 'text-neutral-300', accent: 'neutral' },
    metadata: { energy: 'medium', focus: ['dispersion', 'ruido'] }
  },

  // ZONA 2: LA HUIDA
  'anesthetic-noise': {
    id: 'anesthetic-noise',
    zone: 'huida',
    sensoryOpening: "Un murmullo constante y reconfortante llena este lugar. Luces, sonidos, estímulos que te abrazan para que no sientas el frío.",
    internalRefleciton: "Tomas el teléfono otra vez… no porque quieras ver algo, sino porque el silencio empieza a acercarse demasiado. Como Jonás en el vientre del barco, intentas dormir mientras la tormenta arrecia afuera.",
    pauseText: "Baja el volumen un poco. Solo un poco.",
    microExercise: {
      title: "Voto de Silencio",
      instructions: "Pon tu mano sobre tu pecho. Siente el latido de tu corazón. Quédate ahí 5 respiraciones. No hay nada que perder por detenerse."
    },
    sownTruth: "¿A dónde me iré de tu presencia? Incluso aquí, en tu huida, hay una mirada que te ama y te espera.",
    choices: [
      { text: "Buscas una distracción más fuerte.", nextRoom: 'thousand-screens' },
      { text: "Te permites habitar el silencio incómodo.", nextRoom: 'awkward-silence' },
      { text: "Notas un vacío que no se llena.", nextRoom: 'hunger-unnamed' }
    ],
    theme: { bg: 'bg-gray-900', text: 'text-gray-400', accent: 'gray' },
    metadata: { energy: 'medium', focus: ['evasion', 'ruido'] }
  },
  'thousand-screens': {
    id: 'thousand-screens',
    zone: 'huida',
    sensoryOpening: "Miles de pantallas proyectan colores en las paredes. El movimiento es tan rápido que no puedes enfocar nada, y eso es exactamente lo que buscas.",
    internalRefleciton: "Tienes hambre de algo que un 'scroll' infinito nunca podrá darte. Estás llenando un abismo con arena movediza. Cuanto más buscas fuera, más solo te sientes por dentro.",
    pauseText: "Cierra los ojos un segundo.",
    microExercise: {
      title: "Desconexión Visual",
      instructions: "Cubre tus ojos con las palmas de tus manos. Siente el calor. No hay nada que ver ahora. Solo estar."
    },
    sownTruth: "Buscaste mucho afuera, pero hay una Fuente que fluye desde dentro. Te invito a beber de nuevo.",
    choices: [
      { text: "Un minuto más...", nextRoom: 'one-more-minute' },
      { text: "Sientes que algo te falta.", nextRoom: 'hunger-unnamed' }
    ],
    theme: { bg: 'bg-slate-900', text: 'text-blue-200', accent: 'blue' },
    metadata: { energy: 'medium', focus: ['evasion', 'saturacion'] }
  },
  'disappearing-sofa': {
    id: 'disappearing-sofa',
    zone: 'huida',
    sensoryOpening: "Un sofá tan hundido que parece que el suelo te está tragando poco a poco. No quieres levantarte nunca más.",
    internalRefleciton: "La apatía es un escudo pesado. Crees que si no te importa nada, nada podrá herirte. Pero el aislamiento no es paz, es solo una forma de exilio voluntario.",
    pauseText: "Siente tu peso.",
    microExercise: {
      title: "Anclaje Físico",
      instructions: "Presiona tus pies contra el suelo. Nota la firmeza. Todavía estás aquí. Todavía tienes un lugar en este mundo."
    },
    sownTruth: "Aunque tu corazón te condene, hay Alguien más grande que tu corazón. No tienes que esconderte más.",
    choices: [
      { text: "Te dejas tragar un poco más.", nextRoom: 'one-more-minute' },
      { text: "Intentas levantarte con pesadez.", nextRoom: 'invisible-tiredness' }
    ],
    theme: { bg: 'bg-stone-800', text: 'text-stone-400', accent: 'stone' },
    metadata: { energy: 'low', focus: ['evasion', 'desconexion'] }
  },
  'one-more-minute': {
    id: 'one-more-minute',
    zone: 'huida',
    sensoryOpening: "El tiempo se estira aquí como chicle. 'Un minuto más' se convierte en una hora, en una tarde, en un día perdido.",
    internalRefleciton: "Estás esperando a sentirte 'listo' para enfrentar la vida, pero el sentimiento no llega. La vida está sucediendo mientras esperas que la incomodidad pase sola.",
    pauseText: "Sal del bucle.",
    microExercise: {
      title: "Corte de Inercia",
      instructions: "Lávate la cara con agua fría o simplemente ponte de pie por 30 segundos. Rompe el ritmo de la anestesia."
    },
    sownTruth: "El mañana no te pertenece, pero hoy es un regalo que puedes abrir. Empieza por lo pequeño.",
    choices: [
      { text: "Vuelves al ruido.", nextRoom: 'anesthetic-noise' },
      { text: "Te enfrentas al vacío.", nextRoom: 'empty-room' }
    ],
    theme: { bg: 'bg-neutral-800', text: 'text-neutral-500', accent: 'neutral' },
    metadata: { energy: 'low', focus: ['evasion', 'procrastinacion'] }
  },
  'hunger-unnamed': {
    id: 'hunger-unnamed',
    zone: 'huida',
    sensoryOpening: "Un hambre que no se calma con pan. Sientes un agujero en el pecho que ninguna distracción ha logrado llenar hoy.",
    internalRefleciton: "Ese vacío es tu alma recordando que fue hecha para Algo más grande que este ruido. No intentes taparlo; deja que el hambre te guíe hacia donde realmente necesitas ir.",
    pauseText: "Nombra ese vacío.",
    microExercise: {
      title: "Oración de Deseo",
      instructions: "Solo di una frase honesta: 'Tengo hambre de paz' o 'Deseo sentirme amado de verdad'. No hace falta más."
    },
    sownTruth: "Bienaventurados los que tienen hambre, porque serán saciados. Tu necesidad es el camino hacia la Fuente.",
    choices: [
      { text: "Buscas cómo anestesiarlo rápido.", nextRoom: 'anesthetic-noise' },
      { text: "Caminas hacia la fuente.", nextRoom: 'the-well' },
      { text: "Te sientas a llorar un poco.", nextRoom: 'cannot-continue' }
    ],
    theme: { bg: 'bg-orange-950', text: 'text-orange-200', accent: 'orange' },
    metadata: { energy: 'medium', focus: ['vacio', 'necesidad'] }
  },

  // ZONA 3: EL PESO
  'invisible-tiredness': {
    id: 'invisible-tiredness',
    zone: 'peso',
    sensoryOpening: "Tus huesos se sienten hechos de plomo. Es un cansancio que el sueño de anoche no pudo tocar.",
    internalRefleciton: "Hay días donde incluso respirar parece otra responsabilidad más. No es pereza, es falta de sustento interior. Estás intentando bombear agua de un pozo que hace mucho se secó. Suelta los remos; la corriente te sostiene aunque no nades.",
    pauseText: "Cierra los ojos un momento.",
    microExercise: {
      title: "Entrega Física",
      instructions: "Estira tus manos con las palmas hacia arriba sobre tu regazo. Quédate así. Dile a tu alma: 'Está bien no poder hoy'."
    },
    sownTruth: "Levántate y come, porque largo camino te resta. Es Dios quien te da fuerzas cuando las tuyas se acaban.",
    choices: [
      { text: "Intentas levantarte y seguir empujando.", nextRoom: 'full-backpack' },
      { text: "Aceptas tu cansancio y cierras los ojos.", nextRoom: 'stillness' },
      { text: "Te quedas en la penumbra de la silla.", nextRoom: 'silent-chair' }
    ],
    theme: { bg: 'bg-zinc-800', text: 'text-zinc-400', accent: 'zinc' },
    metadata: { energy: 'low', focus: ['agotamiento', 'peso'] }
  },
  'full-backpack': {
    id: 'full-backpack',
    zone: 'peso',
    sensoryOpening: "Tus hombros están encorvados. Llevas una mochila llena de piedras: errores pasados, miedos futuros, opiniones de personas que ya no están.",
    internalRefleciton: "No fuiste diseñado para cargar todo esto. La autosuficiencia te está rompiendo porque crees que si la sueltas, te derrumbarás. Pero hay hombros más anchos que los tuyos cargando ya con el mundo.",
    pauseText: "Siente el peso. Y luego, el alivio.",
    microExercise: {
      title: "Soltar Físico",
      instructions: "Sube tus hombros hasta las orejas lo más que puedas... mantén la tensión... y suéltalos de golpe con un suspiro profundo."
    },
    sownTruth: "Echa sobre Él tu carga, y Él te sustentará. No tienes que sostener al mundo hoy.",
    choices: [
      { text: "Empujas con más fuerza todavía.", nextRoom: 'what-if' },
      { text: "Abres la mochila delante de Su mirada.", nextRoom: 'truth-avoided' },
      { text: "Te sientas en el suelo, vencido.", nextRoom: 'emotional-floor' }
    ],
    theme: { bg: 'bg-stone-900', text: 'text-stone-300', accent: 'stone' },
    metadata: { energy: 'high', focus: ['carga', 'responsabilidad'] }
  },
  'empty-room': {
    id: 'empty-room',
    zone: 'peso',
    sensoryOpening: "Una habitación blanca, fría, sin muebles. Sientes el eco de tu propia soledad.",
    internalRefleciton: "El vacío asusta porque nos obliga a vernos sin adornos. Pero es en este espacio despojado donde Él puede empezar a construir algo nuevo. Lo vacío es lo único que puede ser llenado.",
    pauseText: "Habita el vacío.",
    microExercise: {
      title: "Presencia en el Vacío",
      instructions: "No intentes llenar el espacio con ruido. Solo respira y reconoce: 'Estoy aquí'. Eso es suficiente por ahora."
    },
    sownTruth: "Mi presencia irá contigo, y te daré descanso. Incluso en el vacío, no estás solo.",
    choices: [
      { text: "Buscas algo rápido para llenar el cuarto.", nextRoom: 'thousand-screens' },
      { text: "Te quedas en el medio del cuarto.", nextRoom: 'safe-place' },
      { text: "Sientes que ya no puedes más.", nextRoom: 'cannot-continue' }
    ],
    theme: { bg: 'bg-neutral-950', text: 'text-neutral-500', accent: 'neutral' },
    metadata: { energy: 'low', focus: ['vacio', 'soledad'] }
  },
  'silent-chair': {
    id: 'silent-chair',
    zone: 'peso',
    sensoryOpening: "Una silla de madera en un rincón oscuro. No tienes nada que decir, nada que pedir, nada que ofrecer.",
    internalRefleciton: "A veces la mayor oración es simplemente el silencio honesto de quien ya no tiene fuerzas para fingir espiritualidad ni fortaleza.",
    pauseText: "Solo quédate.",
    microExercise: {
      title: "Oración Silenciosa",
      instructions: "Imagina que Él está sentado frente a ti. No te pide palabras, planes ni promesas. Solo Su mirada sobre ti."
    },
    sownTruth: "Como un niño en el regazo de su madre, así está mi alma. Silenciosa, segura, amada.",
    choices: [
      { text: "Te levantas y vuelves al ruido.", nextRoom: 'anesthetic-noise' },
      { text: "Dejas que el silencio te envuelva.", nextRoom: 'stillness' }
    ],
    theme: { bg: 'bg-zinc-950', text: 'text-zinc-600', accent: 'zinc' },
    metadata: { energy: 'low', focus: ['silencio', 'presencia'] }
  },
  'long-night': {
    id: 'long-night',
    zone: 'peso',
    sensoryOpening: "Son las tres de la mañana y el techo es lo único que ves. La noche se siente eterna y tus miedos se pasean por el cuarto.",
    internalRefleciton: "En la oscuridad los problemas crecen, pero recuerda que el Pastor no duerme cuando Sus ovejas están inquietas. Esta noche no es un castigo, es un lugar de entrega.",
    pauseText: "Confía en el amanecer.",
    microExercise: {
      title: "Promesa Nocturna",
      instructions: "Recuerda una sola cosa pequeña por la que puedas dar gracias hoy. Una sola. Sostenla en tu mente como una lámpara."
    },
    sownTruth: "Por la mañana se levantará el regocijo. No hay noche que la Luz no haya conquistado ya.",
    choices: [
      { text: "Vuelves a sobrepensar todo.", nextRoom: 'what-if' },
      { text: "Cierras los ojos y confías en Su cuidado.", nextRoom: 'breathe-again' }
    ],
    theme: { bg: 'bg-slate-950', text: 'text-slate-400', accent: 'slate' },
    metadata: { energy: 'low', focus: ['insomnio', 'miedo'] }
  },

  // ZONA 4: EL QUIEBRE
  'cannot-continue': {
    id: 'cannot-continue',
    zone: 'quiebre',
    sensoryOpening: "Tus rodillas tocan el suelo frío. No fue un acto de voluntad, es simplemente que ya no pudiste sostenerte más.",
    internalRefleciton: "Llegar al límite es doloroso, pero es la puerta abierta a la libertad. Por fin has dejado de mentirte. Aquí, donde tus fuerzas se acaban, comienza algo que no depende de ti. El suelo es un buen lugar para empezar de nuevo.",
    pauseText: "No intentes levantarte. Quédate ahí.",
    microExercise: {
      title: "La Verdad Desnuda",
      instructions: "Dile honestamente al aire: 'No puedo más'. Nota cómo tus pulmones se expanden de forma distinta cuando dejas de fingir fortaleza."
    },
    sownTruth: "Bástate mi gracia; porque mi poder se perfecciona en tu debilidad. Estás a salvo en tu fragilidad.",
    choices: [
      { text: "Te permites llorar sin prisa.", nextRoom: 'emotional-floor' },
      { text: "Buscas una mano que te ayude.", nextRoom: 'safe-place' }
    ],
    theme: { bg: 'bg-blue-950', text: 'text-blue-100', accent: 'blue' },
    metadata: { energy: 'high', focus: ['quiebre', 'rendicion'] }
  },
  'awkward-silence': {
    id: 'awkward-silence',
    zone: 'quiebre',
    sensoryOpening: "Un silencio que parece gritar. Sin música, sin notificaciones, sin planes... te enfrentas a la persona que realmente eres cuando nadie te mira.",
    internalRefleciton: "Es aterrador mirarse al espejo sin filtros, pero ese susurro apacible que escuchó Elías suele aparecer después del ruido. No huyas esta vez; lo que tienes delante no es un enemigo, es tu necesidad de ser amado.",
    pauseText: "Quédate en el silencio.",
    microExercise: {
      title: "Escucha Interna",
      instructions: "No pienses nada. Solo escucha el silencio. Imagina que es una mirada que te observa con ternura infinita."
    },
    sownTruth: "Tú has sido mi refugio y torre fuerte. El silencio es el idioma de Su Gracia.",
    choices: [
      { text: "Vuelves corriendo al ruido.", nextRoom: 'anesthetic-noise' },
      { text: "Te quedas escuchando el susurro.", nextRoom: 'stillness' }
    ],
    theme: { bg: 'bg-zinc-950', text: 'text-zinc-200', accent: 'zinc' },
    metadata: { energy: 'medium', focus: ['silencio', 'conciencia'] }
  },
  'truth-avoided': {
    id: 'truth-avoided',
    zone: 'quiebre',
    sensoryOpening: "Hay una verdad en esta habitación que has estado esquivando durante meses. Brilla con una luz blanca que duele a los ojos.",
    internalRefleciton: "Vivir con secretos o negaciones es como cargar una piedra en el zapato y fingir que no cojeas. La verdad no viene a condenarte, viene a liberarte. Él ya la conoce; solo está esperando que tú dejes de esconderte.",
    pauseText: "Mira la verdad de frente. Respira.",
    microExercise: {
      title: "Declaración de Honestidad",
      instructions: "Nombra esa verdad en voz baja. 'Tengo miedo', 'Estoy herido', 'No puedo solo'. Suéltala. Ya no es tu secreto."
    },
    sownTruth: "Conoceréis la verdad, y la verdad os hará libres. No hay oscuridad que Su luz no pueda abrazar.",
    choices: [
      { text: "Intentas ocultarla otra vez.", nextRoom: 'many-open-tabs' },
      { text: "Caminas con esa verdad hacia la luz.", nextRoom: 'open-window' }
    ],
    theme: { bg: 'bg-stone-900', text: 'text-stone-300', accent: 'stone' },
    metadata: { energy: 'high', focus: ['verdad', 'conciencia'] }
  },
  'emotional-floor': {
    id: 'emotional-floor',
    zone: 'quiebre',
    sensoryOpening: "Has llegado al fondo. No hay más escalones hacia abajo. El suelo es frío, pero al menos es firme.",
    internalRefleciton: "Cuando ya no tienes nada que perder, tienes todo por recibir. En este fondo, descubres que no estabas cayendo al vacío, sino que habías caído en Sus manos. El descanso comienza cuando dejas de luchar contra la gravedad.",
    pauseText: "Descansa en el suelo. Ya no hay a dónde caer.",
    microExercise: {
      title: "Sentir el Soporte",
      instructions: "Acuéstate o siéntate sintiendo el peso total de tu cuerpo. Siente cómo el suelo te sostiene sin que tú hagas un solo esfuerzo. Estás sostenido."
    },
    sownTruth: "Cercano está Jehová a los quebrantados de corazón. Estás exactamente donde Su Gracia puede alcanzarte mejor.",
    choices: [
      { text: "Te quedas ahí un momento.", nextRoom: 'safe-place' },
      { text: "Intentas gatear hacia la salida.", nextRoom: 'stillness' }
    ],
    theme: { bg: 'bg-slate-900', text: 'text-slate-300', accent: 'slate' },
    metadata: { energy: 'high', focus: ['rendicion', 'soporte'] }
  },

  // ZONA 5: LA QUIETUD
  'stillness': {
    id: 'stillness',
    zone: 'quietud',
    sensoryOpening: "La luz es dorada y el aire huele a mañana fresca. El ruido se ha quedado afuera, como un eco que ya no te alcanza.",
    internalRefleciton: "La paz no es la ausencia de problemas, sino la certeza de que no estás solo en ellos. Puedes respirar porque Él sigue sentado en Su trono, y no tiene prisa. Habita esta calma; es tu herencia.",
    pauseText: "Quédate aquí un momento. No leas rápido.",
    microExercise: {
      title: "Respiración de Paz",
      instructions: "Inhala paz... exhala tensiones. Siente cómo tu sistema se calma bajo Su cuidado. Tu alma lleva demasiado tiempo apresurada."
    },
    sownTruth: "La paz os dejo, mi paz os doy. No como el mundo la da, sino como el Creador la sostiene.",
    choices: [
      { text: "Te quedas un momento más aquí.", nextRoom: 'safe-place' },
      { text: "Abres una ventana.", nextRoom: 'open-window' }
    ],
    theme: { bg: 'bg-emerald-950', text: 'text-emerald-100', accent: 'emerald' },
    metadata: { energy: 'low', focus: ['paz', 'quietud'] }
  },
  'breathe-again': {
    id: 'breathe-again',
    zone: 'quietud',
    sensoryOpening: "Tus pulmones se expanden sin esa punzada de dolor por primera vez en mucho tiempo.",
    internalRefleciton: "Cada aliento es el primer acto de fe: aceptar un regalo que no fabricaste. Un recordatorio de que Él sigue sosteniéndote, incluso cuando tú querías soltarlo todo. Respira. Todavía estás aquí.",
    pauseText: "Siente el aire entrar y salir.",
    microExercise: {
      title: "Suspiro de Alivio",
      instructions: "Toma aire profundamente y suéltalo con un sonido de alivio. Deja salir meses de tensión acumulada en tu pecho."
    },
    sownTruth: "Él sopló aliento de vida. No estás solo en tu respirar; Él está en cada ciclo de tu vida.",
    choices: [
      { text: "Caminas hacia el jardín.", nextRoom: 'stillness' },
      { text: "Sientes que puedes caminar de nuevo.", nextRoom: 'small-step' }
    ],
    theme: { bg: 'bg-cyan-950', text: 'text-cyan-100', accent: 'cyan' },
    metadata: { energy: 'low', focus: ['respiracion', 'renovacion'] }
  },
  'open-window': {
    id: 'open-window',
    zone: 'quietud',
    sensoryOpening: "Una ráfaga de viento fresco entra y mueve las cortinas. Puedes ver el horizonte, y se ve inmenso.",
    internalRefleciton: "Tus problemas no han desaparecido del todo, pero ahora los ves desde una perspectiva distinta. Hay un plan que va más allá de tu circunstancia actual, y es un plan de esperanza.",
    pauseText: "Mira hacia afuera.",
    microExercise: {
      title: "Perspectiva Ampliada",
      instructions: "Mira lo más lejos que puedas (o imagínalo). Recuerda que el mundo es grande y Dios es soberano sobre todo él."
    },
    sownTruth: "Mis pensamientos no son vuestros pensamientos. Confía en la inmensidad de Su diseño de paz.",
    choices: [
      { text: "Te quedas admirando la vista.", nextRoom: 'safe-place' },
      { text: "Te preparas para salir.", nextRoom: 'small-step' }
    ],
    theme: { bg: 'bg-sky-950', text: 'text-sky-100', accent: 'sky' },
    metadata: { energy: 'medium', focus: ['perspectiva', 'claridad'] }
  },
  'safe-place': {
    id: 'safe-place',
    zone: 'quietud',
    sensoryOpening: "Este lugar se siente como una casa donde siempre eres bienvenido y donde no tienes que fingir nada.",
    internalRefleciton: "Has pasado mucho tiempo intentando ganarte un lugar, pero ya tienes uno. No eres un extraño, eres un hijo que ha vuelto a casa después de una larga tormenta.",
    pauseText: "Siéntete en casa.",
    microExercise: {
      title: "Abrazo de Gracia",
      instructions: "Abrázate a ti mismo suavemente. Recuerda que eres amado con amor eterno, sin condiciones."
    },
    sownTruth: "Tú has sido mi refugio, una torre fuerte. Aquí estás a salvo de toda acusación.",
    choices: [
      { text: "Disfrutas el momento un poco más.", nextRoom: 'stillness' },
      { text: "Decides dar un paso afuera.", nextRoom: 'live-again' }
    ],
    theme: { bg: 'bg-teal-950', text: 'text-teal-100', accent: 'teal' },
    metadata: { energy: 'low', focus: ['seguridad', 'amor'] }
  },
  'pending-call': {
    id: 'pending-call',
    zone: 'camino',
    sensoryOpening: "Hay un nombre en tu mente. Una conversación que has estado evitando por miedo o cansancio.",
    internalRefleciton: "La paz que has encontrado no es un tesoro para esconder, sino una fuerza para reconciliar. No estás solo al hablar; hay una Sabiduría que guía tus palabras si te atreves a ser honesto y vulnerable.",
    pauseText: "No temas el encuentro.",
    microExercise: {
      title: "Valentía Suave",
      instructions: "Visualiza a esa persona. Pide paz para ella y para ti. No busques ganar, busca sanar."
    },
    sownTruth: "Si es posible, estad en paz con todos. La reconciliación es el paso final hacia la verdadera libertad.",
    choices: [
      { text: "Lo harás hoy.", nextRoom: 'small-step' },
      { text: "Aún necesitas un momento de paz.", nextRoom: 'stillness' }
    ],
    theme: { bg: 'bg-emerald-900', text: 'text-emerald-100', accent: 'emerald' },
    metadata: { energy: 'medium', focus: ['accion', 'reconciliacion'] }
  },
  'need-to-say': {
    id: 'need-to-say',
    zone: 'camino',
    sensoryOpening: "Hay palabras que han estado atrapadas en tu garganta y que hoy buscan salir como un río.",
    internalRefleciton: "Hablar tu verdad con amor es un acto de valentía espiritual. Ya no necesitas callar para que otros estén cómodos. Tu voz tiene un lugar en el mundo de Dios.",
    pauseText: "Habla con calma.",
    microExercise: {
      title: "Límites en Gracia",
      instructions: "Di en voz alta una verdad que necesites comunicar. Hazlo con firmeza, pero sin herir. Siente la liberación."
    },
    sownTruth: "Sino que siguiendo la verdad en amor, crezcamos en todo. Tus palabras ahora tienen peso y luz.",
    choices: [
      { text: "Das el paso comunicativo.", nextRoom: 'live-again' },
      { text: "Buscas más claridad antes.", nextRoom: 'open-window' }
    ],
    theme: { bg: 'bg-teal-900', text: 'text-teal-100', accent: 'teal' },
    metadata: { energy: 'medium', focus: ['comunicacion', 'limites'] }
  },
  // ZONA 6: EL CAMINO
  'small-step': {
    id: 'small-step',
    zone: 'camino',
    sensoryOpening: "Frente a ti hay un camino claro, pero solo puedes ver los siguientes dos metros de tierra.",
    internalRefleciton: "Confiar no es ver el final, es conocer al Guía. No necesitas el mapa completo de tu vida hoy, solo la obediencia para el siguiente metro. Un paso pequeño en la dirección correcta es una victoria inmensa. Mira tus pies; están listos para avanzar.",
    pauseText: "Un solo paso. Sin prisa.",
    microExercise: {
      title: "Acción Vital",
      instructions: "¿Cuál es el paso más pequeño y sano que puedes dar al salir de aquí? Solo uno. Sin presión. El camino se hace caminando."
    },
    sownTruth: "Lámpara es a mis pies tu palabra. No necesitas un sol, solo una pequeña luz para el siguiente paso.",
    choices: [
      { text: "Das ese primer paso con calma.", nextRoom: 'live-again' },
      { text: "Vuelves a descansar para cobrar fuerzas.", nextRoom: 'safe-place' }
    ],
    theme: { bg: 'bg-indigo-900', text: 'text-indigo-100', accent: 'indigo' },
    metadata: { energy: 'medium', focus: ['accion', 'confianza'] }
  },
  'live-again': {
    id: 'live-again',
    zone: 'camino',
    sensoryOpening: "Sales de este refugio. La luz afuera ya no te asusta; te invita a vivir con una nueva profundidad.",
    internalRefleciton: "Vivir de nuevo no es volver a la misma rutina ciega, sino caminar con los ojos abiertos a Su presencia en lo ordinario. Sales un poco más frágil, pero mucho más libre. Afuera, la noche sigue igual… pero algo dentro de ti ya no está corriendo tan rápido.",
    pauseText: "Ve en paz.",
    microExercise: {
      title: "Gratitud Final",
      instructions: "Nombra tres cosas sencillas por las que das gracias hoy. No son tus logros, son Sus caricias para tu alma."
    },
    sownTruth: "He aquí, yo hago nuevas todas las cosas. Hoy comienza el resto de tu camino, y no vas solo.",
    choices: [
      { text: "Regresar al inicio con una nueva mirada.", nextRoom: 'welcome' }
    ],
    theme: { bg: 'bg-amber-900', text: 'text-amber-100', accent: 'amber' },
    metadata: { energy: 'medium', focus: ['vida', 'gratitud'] }
  },
  'room-of-shadows': {
    id: 'room-of-shadows',
    zone: 'quiebre',
    sensoryOpening: "Una habitación donde las sombras parecen tener peso. Hay una sensación de haber estado aquí muchas veces, evitando la luz.",
    internalRefleciton: "Has intentado huir repetidamente, pero las sombras no se van; solo se hacen más densas mientras corres. No es un castigo, es una invitación a dejar de huir. La Luz no viene a quemarte, viene a encontrarte aquí, exactamente como estás.",
    pauseText: "Deja de correr. Solo por hoy.",
    microExercise: {
      title: "Enfrentar la Sombra",
      instructions: "Imagina que la Luz entra lentamente en esta habitación. No tienes que hacer nada para merecerla. Solo permite que te alcance en tu rincón más oscuro."
    },
    sownTruth: "Aun las tinieblas no encubren de ti, y la noche resplandece como el día.",
    choices: [
      { text: "Te permites ser encontrado.", nextRoom: 'emotional-floor' },
      { text: "Buscas la salida hacia la quietud.", nextRoom: 'stillness' }
    ],
    theme: { bg: 'bg-black', text: 'text-neutral-500', accent: 'neutral' },
    metadata: { energy: 'low', focus: ['sombra', 'encuentro'] }
  },
  'grace-garden': {
    id: 'grace-garden',
    zone: 'quietud',
    sensoryOpening: "Un jardín que no sabías que existía. El aire es más puro aquí y el suelo parece cantar una melodía de perdón.",
    internalRefleciton: "Este lugar es para aquellos que han decidido ser honestos con su cansancio. Has caminado mucho intentando ser fuerte, pero aquí el suelo mismo te renueva sin pedirte nada a cambio. Todo está pagado.",
    pauseText: "Recibe el descanso que no ganaste.",
    microExercise: {
      title: "Caminar Descalzo",
      instructions: "Imagina que caminas sobre hierba fresca. Siente la gracia bajo tus pies. No necesitas esforzarte más. Estás en paz."
    },
    sownTruth: "En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.",
    choices: [
      { text: "Te quedas un largo tiempo.", nextRoom: 'safe-place' },
      { text: "Vuelves con fuerzas nuevas.", nextRoom: 'live-again' }
    ],
    theme: { bg: 'bg-emerald-950', text: 'text-emerald-100', accent: 'emerald' },
    metadata: { energy: 'medium', focus: ['gracia', 'renovacion'] }
  },
  'the-well': {
    id: 'the-well',
    zone: 'huida',
    sensoryOpening: "Un pozo profundo, pero no estás cayendo. Hay agua fresca en el fondo y la superficie se ve llena de luz.",
    internalRefleciton: "Buscaste agua en cisternas rotas, en pantallas y ruidos, pero este pozo tiene agua viva. No necesitas bajar más; la Fuente ha subido a saludarte. Tal vez no estás cansado solo del trabajo, sino de sostenerte a ti mismo todo el tiempo.",
    pauseText: "Bebe. No hace falta más.",
    microExercise: {
      title: "Agua Viva",
      instructions: "Imagina que bebes de una fuente que nunca se agota. Deja que llene cada rincón de tu sed emocional. Respira."
    },
    sownTruth: "El que bebiere del agua que yo le daré, no tendrá sed jamás.",
    choices: [
      { text: "Sube hacia la superficie.", nextRoom: 'open-window' },
      { text: "Quédate junto a la fuente.", nextRoom: 'safe-place' }
    ],
    theme: { bg: 'bg-blue-950', text: 'text-blue-100', accent: 'blue' },
    metadata: { energy: 'low', focus: ['sed', 'saciedad'] }
  }
};
