export interface SiteConfig {
  brandName: string;
  hero: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
  manifesto: {
    text: string;
  };
  problems: {
    title: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  benefits: {
    title: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  tech: {
    tagline: string;
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      imageUrl: string;
    }[];
  };
  methodology: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
    testimonial: {
      text: string;
      author: string;
      role: string;
    };
  };
  footer: {
    title: string;
    subtitle: string;
  };
  socialLinks: {
    instagram: string;
    linkedin: string;
    vimeo: string;
    whatsapp: string;
  };
  portfolioUrl: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  brandName: "Áltera Studios",
  hero: {
    title: "Tu Restaurante en el Bolsillo de tus Clientes.",
    subtitle: "No solo construimos espacios. Creamos legados que se sienten. Fusionamos arquitectura emocional, narrativa visual y tecnología digital.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-interior-design-of-a-modern-living-room-4033-large.mp4"
  },
  manifesto: {
    text: "En un mundo saturado de contenido efímero, apostamos por la inmersión. Somos el puente entre lo que tu marca es y lo que tu cliente siente."
  },
  problems: {
    title: "Desafíos que resolvemos",
    cards: [
      {
        title: "¿Pedidos por WhatsApp perdidos?",
        description: "Centralizamos tu gestión para que no se escape ni un solo pedido en el caos de los mensajes."
      },
      {
        title: "¿Reservas que nadie anota?",
        description: "Automatizamos tu agenda para que tu equipo se enfoque en lo que importa: la experiencia del cliente."
      },
      {
        title: "Fragmentación de imagen",
        description: "Aseguramos que la esencia de tu local físico se traduzca perfectamente en tu presencia digital."
      }
    ]
  },
  benefits: {
    title: "Valor de Sinergia",
    cards: [
      {
        title: "Identidad Unificada",
        description: "Coherencia total entre lo físico y lo digital. Tu marca respira el mismo aire en todas partes."
      },
      {
        title: "Inmersión Emocional",
        description: "Generamos recuerdos, no solo ventas. Creamos vínculos que perduran en la mente del consumidor."
      },
      {
        title: "Motor de Crecimiento",
        description: "Más que una app, es el cerebro de tu negocio. Datos reales para decisiones inteligentes."
      }
    ]
  },
  tech: {
    tagline: "Áltera Tech",
    title: "Especialistas en Apps",
    items: [
      {
        title: "Apps Personalizadas",
        description: "UI/UX artístico, interfaces que respiran tu marca y enamoran al usuario."
      },
      {
        title: "Ecosistemas de Usuario",
        description: "Reservas inteligentes y sistemas de fidelización diseñados para retener."
      },
      {
        title: "Integración Phygital",
        description: "Menús QR dinámicos y realidad aumentada para una experiencia sin fricciones."
      }
    ]
  },
  services: {
    title: "Ecosistema 360°",
    items: [
      {
        title: "Narrativa Espacial",
        description: "Conceptualización e interiorismo emocional. Diseñamos el escenario donde ocurre la magia.",
        imageUrl: "https://picsum.photos/seed/arch/800/450"
      },
      {
        title: "Producción Audiovisual",
        description: "Storytelling cinemático y fotografía artística. Capturamos la esencia de tu propuesta.",
        imageUrl: "https://picsum.photos/seed/film/800/450"
      },
      {
        title: "Desarrollo Digital",
        description: "Apps nativas, E-commerce y estrategias UX. Construimos el motor digital de tu éxito.",
        imageUrl: "https://picsum.photos/seed/tech/800/450"
      }
    ]
  },
  methodology: {
    title: "El Viaje del Héroe",
    steps: [
      { title: "Descubrimiento", description: "Entendemos tu ADN y tus objetivos de negocio." },
      { title: "Concepto", description: "Diseñamos la narrativa que unirá lo físico y lo digital." },
      { title: "Ejecución", description: "Construimos con precisión técnica y sensibilidad artística." },
      { title: "Legado", description: "Lanzamos y escalamos tu presencia en el mercado." }
    ],
    testimonial: {
      text: "Áltera Studios transformó no solo nuestro local, sino la forma en que nuestros clientes interactúan con nosotros a diario.",
      author: "Juan Pérez",
      role: "CEO, Restaurante Gourmet"
    }
  },
  footer: {
    title: "¿Listo para dar el salto digital?",
    subtitle: "Deja de vender productos. Empieza a contar historias."
  },
  socialLinks: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    vimeo: "https://vimeo.com",
    whatsapp: "584142314194"
  },
  portfolioUrl: "https://www.behance.net/joseacostall"
};
