// ============================================
//   CONTENIDO EDITABLE — ALE & PRI 2026
//   Edita este archivo para cambiar textos
// ============================================

const PAGE_CONTENT = {
  // Welcome screen
  welcome: {
    tag: '10 · Octubre · 2026',
    headline: 'Te invito a la boda de',
    headlinePersonalized: 'Los invito a la boda de',
    names: 'Ale & Pri',
    message: 'Toronto corrió y corrió muy rápido para traerte esta invitación',
    messagePersonalized: 'Toronto corrió y corrió muy rápido para traerles esta invitación',
    submessage: 'Toronto tiene el honor de invitarte a celebrar el día más especial de sus vidas. <br> Después de que yo nací',
    submessagePersonalized: 'Toronto tiene el honor de invitarlos a celebrar el día más especial de sus vidas. <br> Después de que yo nací',
    locationSubtitle: 'Sábado 10 Octubre · Qgat · Sant Cugat-Barcelona',
  },

  // Hero section
  hero: {
    arch: 'Se casan!',
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
    title: 'A lo que vinimos, ¿Cuándo es La Fiesta?',
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
    title: '¿Dónde?',
    name: 'Qgat Restaurant, Events & Hotel',
    address: 'Av. de la Via Augusta, 51, 08174 <br> Sant Cugat del Vallès, Barcelona',
    mapButtonText: 'Ver en mapa',
    mapLink: 'https://maps.app.goo.gl/qsc3siNPAXJwGCEy6',
  },

  // Dress code
  dressCode: {
    title: 'Vestimenta',
    text: '<strong>Etiqueta formal</strong><br>Hombres: traje oscuro corbata.<br>Mujeres: vestido largo o cocktail elegante sin estampados.',
    emphasis: 'Sin blanco, por favor',
  },

  // Hotel
  hotel: {
    title: 'Hospedaje',
    intro: 'El venue tiene habitaciones disponibles.<br>Usa el código de descuento al reservar:',
    codeLabel: 'Código de descuento',
    code: 'BODAQGAT2026',
    instructions: 'Reserva directo en la pagina web del hotel<br> El descuento está muy bien y es válido para cualquier tipo de habitación. <br> Los precios no son fijos, así que te recomendamos reservar lo antes posible para asegurar tu lugar.',
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
      nameLabel: 'Nombre',
      namePlaceholder: 'Nombre completo',
      dietLabel: 'Restricción alimentaria',
      dietCustomPlaceholder: 'Especifica...',
      messageLabel: 'Mensaje para los novios (opcional)',
      messagePlaceholder: 'Un mensaje de cariño...',
      formNote: 'Por favor confirma tus datos y ¿vienes?',
      submitButton: '¡Confirmar asistencia!',
      submitButtonLoading: 'Enviando...',
      submitHint: 'Confirma a la brevedad posible, por favor',
    },
    success: {
      title: '¡Gracias! Los esperamos',
      subtitle: 'Confirmación recibida · Ale & Pri',
    },
    plusOne: {
      headerMessage: 'Esta invitación es para {name} + Acompañante',
      sectionTitle: 'Detalles del acompañante',
      companionNameLabel: 'Nombre del acompañante',
      companionPlaceholder: 'Nombre completo',
      companionDietLabel: 'Restricción alimentaria',
    },
    dietOptions: [
      'Sin restricciones',
      'Vegetariano',
      'Vegano',
      'Sin gluten',
      'Sin lactosa',
      'Otro',
    ],
  },

  // Footer
  footer: {
    opening: 'Con amor y besos Toronto,',
    signature: 'Ale & Pri',
  },

  // Admin panel
  admin: {
    panelTitle: 'Panel Admin · Ale & Pri',
    colors: {
      sectionTitle: 'Personalizar colores',
      labels: {
        cream: 'Fondo crema',
        dark: 'Color principal',
        gold: 'Acento dorado',
        mid: 'Texto secundario',
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
      loading2: 'Cargando...',
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
