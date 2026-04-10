// ============================================
//   CONTENIDO EDITABLE — ALE & PRI 2026
//   Edita este archivo para cambiar textos
// ============================================

const PAGE_CONTENT = {
  // Welcome screen
  welcome: {
    tag: '10 · Octubre · 2026',
    headline: 'Te invitamos a nuestra boda',
    names: 'Ale & Pri',
    message: 'Toronto corrió muy rápido para traerte esta invitación',
    submessage: 'Ale & Pri tienen el honor de invitarte a celebrar el día más especial de sus vidas.',
    locationSubtitle: 'Sábado · Qgat Barcelona',
  },

  // Hero section
  hero: {
    arch: '¡Nos casamos!',
    names: 'Ale & Pri',
    fullNames: 'Los Papás de Toronto Josè',
    date: '10 · OCTUBRE · 2026',
    countdownLabels: {
      days: 'días',
      hours: 'horas',
      minutes: 'minutos',
      seconds: 'segundos',
    },
  },

  // Event details
  event: {
    title: '¡La Fiesta!',
    date: {
      label: 'Fecha',
      value: 'Sábado<br>10 · Oct · 2026',
    },
    time: {
      label: 'Hora',
      value: '6:00 PM<br>Ceremonia',
    },
  },

  // Venue
  venue: {
    title: 'El Lugar',
    name: 'Qgat Restaurant, Events & Hotel',
    address: 'Carretera de Cerdanyola, Bellaterra<br>Barcelona, España',
    mapButtonText: 'Ver en mapa',
    mapLink: 'https://maps.app.goo.gl/qsc3siNPAXJwGCEy6',
  },

  // Dress code
  dressCode: {
    title: 'Vestimenta',
    text: 'Etiqueta formal. Caballeros: traje oscuro corbata.<br>Damas: vestido largo o cocktail elegante sin estampados.',
    emphasis: 'Sin blanco, por favor',
  },

  // Hotel
  hotel: {
    title: 'Hospedaje',
    intro: 'El venue tiene habitaciones disponibles.<br>Usa el código de descuento al reservar:',
    codeLabel: 'Código de descuento',
    code: 'BODAQGAT2026',
    instructions: 'Reserva directo en el hotel mencionando<br>la boda de Alejandro y Priscila.',
  },

  // Gift
  gift: {
    title: 'Mesa de Regalos',
    quote: '"El mejor regalo es su presencia y su alegría."',
    message: 'Si desean tener un detalle, una contribución en efectivo<br>o transferencia será recibida con mucho amor.',
    emphasis: 'Los datos se comparten personalmente.',
  },

  // RSVP section
  rsvp: {
    title: '¿Vienes? ¡Dinos!',
    locked: {
      title: 'Invitación personalizada',
      message: 'Para confirmar, usa el link<br>que Ale & Pri compartieron contigo.',
    },
    form: {
      greeting: '¡Hola {name}! ¿Vienes?',
      yesButton: 'Sí, voy!',
      noButton: 'No puedo',
      dietLabel: 'Restricciones alimentarias (selecciona todas las que apliquen)',
      messageLabel: 'Mensaje para los novios (opcional)',
      messagePlaceholder: 'Un mensaje de cariño...',
      submitButton: '¡Confirmar asistencia!',
      submitHint: 'Confirma a la brevedad posible, por favor',
    },
    success: {
      title: '¡Gracias! Los esperamos',
      subtitle: 'Confirmación recibida · Ale & Pri',
    },
    dietOptions: [
      'Sin restricciones',
      'Vegetariano',
      'Vegano',
      'Sin gluten',
      'Sin lactosa',
      'Halal',
      'Otro',
    ],
  },

  // Footer
  footer: {
    opening: 'Con amor (y Toronto),',
    signature: 'Ale & Pri',
  },

  // Admin panel
  admin: {
    panelTitle: 'Panel Admin · Ale & Pri',
    colors: {
      sectionTitle: 'Personalizar colores',
      labels: {
        cream: 'Fondo (Azul claro)',
        dark: 'Principal (Azul oscuro)',
        gold: 'Acento (Azul cielo)',
        mid: 'Secundario (Azul gris)',
      },
      applyBtn: 'Aplicar',
      resetBtn: 'Restablecer',
    },
    links: {
      sectionTitle: 'Links por grupo',
      copyBtn: 'Copiar',
      copiedFeedback: '¡Listo!',
    },
    stats: {
      confirmed: 'Confirmados',
      declined: 'No asisten',
      total: 'Respuestas',
    },
    confirmations: {
      sectionTitle: 'Confirmaciones',
      refreshBtn: 'Actualizar',
      loading: 'Cargando respuestas...',
      empty: 'Aún sin confirmaciones',
      deleteConfirm: '¿Eliminar esta confirmación?',
      deleteBtn: 'Eliminar',
    },
  },

  // Auth modal
  auth: {
    title: 'Acceso privado',
    subtitle: 'Solo para los novios',
    placeholder: '· · · ·',
    error: 'Contraseña incorrecta',
    loginBtn: 'Entrar',
    cancelBtn: 'Cancelar',
  },

  // Loading/Error states
  states: {
    loading: 'Cargando...',
    error: 'Error al conectar con el Sheet.<br>Verifica tu conexión o abre el Sheet directo.',
  },
};

// Export for use in other files
if (typeof window !== 'undefined') {
  window.PAGE_CONTENT = PAGE_CONTENT;
}
