/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Smartphone, 
  MessageSquare, 
  Calendar, 
  LayoutGrid, 
  Zap, 
  Heart, 
  TrendingUp, 
  Layers, 
  Video, 
  Palette, 
  Code, 
  ArrowRight,
  Instagram,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { useRef, ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/584142314194?text=Hola,%20vengo%20de%20la%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20app%20y%20las%20soluciones%20creativas%20para%20mi%20negocio.";
const PORTFOLIO_URL = "https://www.behance.net/joseacostall";

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center px-6 py-24 md:px-12 lg:px-24 ${className}`}>
    {children}
  </section>
);

const BentoCard = ({ title, description, icon: Icon, className = "", glowColor = "neon" }: { title: string, description: string, icon: any, className?: string, glowColor?: "neon" | "violet" | "orange" | "lime" }) => {
  const glowClasses = {
    neon: "hover:border-neon/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]",
    violet: "hover:border-[#B026FF]/50 hover:shadow-[0_0_30px_rgba(176,38,255,0.1)]",
    orange: "hover:border-[#FF8C00]/50 hover:shadow-[0_0_30px_rgba(255,140,0,0.1)]",
    lime: "hover:border-[#32CD32]/50 hover:shadow-[0_0_30px_rgba(50,205,50,0.1)]"
  };

  const iconColors = {
    neon: "text-neon",
    violet: "text-[#B026FF]",
    orange: "text-[#FF8C00]",
    lime: "text-[#32CD32]"
  };

  const iconBgColors = {
    neon: "group-hover:bg-neon/20",
    violet: "group-hover:bg-[#B026FF]/20",
    orange: "group-hover:bg-[#FF8C00]/20",
    lime: "group-hover:bg-[#32CD32]/20"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`glass-card group ${glowClasses[glowColor]} ${className}`}
    >
      <div className={`mb-6 p-3 rounded-2xl bg-white/5 w-fit ${iconBgColors[glowColor]} transition-colors`}>
        <Icon className={`w-8 h-8 ${iconColors[glowColor]}`} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function App() {
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-black tracking-tighter text-white uppercase">Áltera Studios</div>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white">
          <a href="#manifesto" className="hover:text-neon transition-colors">Manifiesto</a>
          <a href="#problems" className="hover:text-neon transition-colors">Soluciones</a>
          <a href="#tech" className="hover:text-neon transition-colors">Tech</a>
          <a href="#services" className="hover:text-neon transition-colors">Servicios</a>
        </div>
      </nav>

      {/* Floating CTA */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-8 right-8 z-50 bg-neon text-dark px-6 py-4 rounded-full font-bold flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden md:inline">¡Quiero mi App ahora!</span>
      </motion.a>

      {/* Hero Section */}
      <Section id="hero" className="relative overflow-hidden" >
        <div ref={heroRef} className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-10" />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
              poster="https://picsum.photos/seed/studio/1920/1080"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-interior-design-of-a-modern-living-room-4033-large.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Glow Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                y: [0, -40, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="glow-capsule glow-violet w-[400px] h-[800px] -top-40 -left-40" 
            />
            <motion.div 
              animate={{ 
                y: [0, 60, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glow-capsule glow-orange w-[500px] h-[1000px] top-1/4 -right-60" 
            />
            <motion.div 
              animate={{ 
                y: [0, -80, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="glow-capsule glow-lime w-[350px] h-[700px] bottom-0 left-1/4" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="glow-capsule-sm glow-violet w-[150px] h-[300px] top-1/2 left-1/2 opacity-20" 
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-glow-neon">
              Tu Restaurante en el <br />
              <span className="text-neon">Bolsillo</span> de tus Clientes.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed">
              No solo construimos espacios. Creamos legados que se sienten. 
              Fusionamos arquitectura emocional, narrativa visual y tecnología digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neon text-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors text-center"
              >
                Empieza tu Historia
              </a>
              <a 
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors text-center"
              >
                Ver Portafolio
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D Smartphone Mockup Simulation */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute right-[-10%] top-[20%] hidden lg:block w-[400px] h-[800px] bg-surface border-[12px] border-white/10 rounded-[60px] shadow-2xl overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-neon/20 to-transparent p-4">
            <div className="w-full h-full rounded-[40px] bg-dark border border-white/5 flex items-center justify-center">
              <Smartphone className="w-24 h-24 text-neon opacity-20" />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Manifesto */}
      <Section id="manifesto" className="bg-surface relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ rotate: [45, 55, 45], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="glow-capsule glow-lime w-[500px] h-[1000px] -bottom-60 -left-40 opacity-10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="glow-capsule-sm glow-violet w-[200px] h-[400px] top-20 right-20 opacity-10" 
          />
        </div>
        <motion.div 
          ref={manifestoRef}
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-glow-violet">
            "En un mundo saturado de contenido efímero, apostamos por la inmersión. 
            Somos el puente entre lo que tu marca es y lo que tu cliente siente."
          </h2>
        </motion.div>
      </Section>

      {/* Problems Section */}
      <Section id="problems" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="glow-capsule glow-violet w-[400px] h-[800px] top-0 -right-40 opacity-10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 5 }}
            className="glow-capsule-sm glow-orange w-[200px] h-[400px] bottom-20 left-20 opacity-10" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-glow-violet">Desafíos que resolvemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard 
              icon={MessageSquare}
              glowColor="violet"
              title="¿Pedidos por WhatsApp perdidos?"
              description="Centralizamos tu gestión para que no se escape ni un solo pedido en el caos de los mensajes."
            />
            <BentoCard 
              icon={Calendar}
              glowColor="orange"
              title="¿Reservas que nadie anota?"
              description="Automatizamos tu agenda para que tu equipo se enfoque en lo que importa: la experiencia del cliente."
            />
            <BentoCard 
              icon={LayoutGrid}
              glowColor="lime"
              title="Fragmentación de imagen"
              description="Aseguramos que la esencia de tu local físico se traduzca perfectamente en tu presencia digital."
            />
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <a href={WHATSAPP_URL} className="text-neon font-bold flex items-center justify-center gap-2 hover:underline">
              Solucionar mis problemas de gestión <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section id="benefits" className="bg-surface relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [45, 40, 45] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="glow-capsule glow-orange w-[600px] h-[1200px] -top-60 left-1/2 -translate-x-1/2 opacity-10" 
          />
          <motion.div 
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="glow-capsule-sm glow-lime w-[300px] h-[600px] bottom-0 right-0 opacity-10" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-glow-neon">Valor de Sinergia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon/30 transition-all">
                <Zap className="w-10 h-10 text-neon mb-6" />
                <h3 className="text-2xl font-bold mb-4">Identidad Unificada</h3>
                <p className="text-white/60">Coherencia total entre lo físico y lo digital. Tu marca respira el mismo aire en todas partes.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 md:mt-12">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon/30 transition-all">
                <Heart className="w-10 h-10 text-neon mb-6" />
                <h3 className="text-2xl font-bold mb-4">Inmersión Emocional</h3>
                <p className="text-white/60">Generamos recuerdos, no solo ventas. Creamos vínculos que perduran en la mente del consumidor.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon/30 transition-all">
                <TrendingUp className="w-10 h-10 text-neon mb-6" />
                <h3 className="text-2xl font-bold mb-4">Motor de Crecimiento</h3>
                <p className="text-white/60">Más que una app, es el cerebro de tu negocio. Datos reales para decisiones inteligentes.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Altera Tech Section */}
      <Section id="tech" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="glow-capsule glow-lime w-[300px] h-[600px] top-1/2 -left-20 opacity-20" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="text-neon font-mono mb-4 block uppercase tracking-widest">Áltera Tech</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Especialistas en Apps</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center shrink-0">
                  <Palette className="w-6 h-6 text-neon" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Apps Personalizadas</h4>
                  <p className="text-white/60">UI/UX artístico, interfaces que respiran tu marca y enamoran al usuario.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6 text-neon" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Ecosistemas de Usuario</h4>
                  <p className="text-white/60">Reservas inteligentes y sistemas de fidelización diseñados para retener.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-neon" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Integración Phygital</h4>
                  <p className="text-white/60">Menús QR dinámicos y realidad aumentada para una experiencia sin fricciones.</p>
                </div>
              </div>
            </div>
            <a 
              href={WHATSAPP_URL}
              className="mt-12 inline-block bg-white text-dark px-8 py-4 rounded-full font-bold hover:bg-neon transition-colors"
            >
              Ver todas las funciones
            </a>
          </div>
          <div className="relative aspect-square bg-surface rounded-3xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border border-neon/30 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div className="absolute w-3/4 h-3/4 border border-white/10 rounded-2xl -rotate-6 group-hover:rotate-0 transition-transform duration-700" />
              <Code className="w-24 h-24 text-neon" />
            </div>
          </div>
        </div>
      </Section>

      {/* 360 Services */}
      <Section id="services" className="bg-surface relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="glow-capsule glow-violet w-[600px] h-[1200px] -bottom-60 -right-40 opacity-20" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Ecosistema 360°</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="aspect-video bg-dark rounded-2xl overflow-hidden mb-6">
                <img src="https://picsum.photos/seed/arch/800/450" alt="Arquitectura" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold">Narrativa Espacial</h3>
              <p className="text-white/60">Conceptualización e interiorismo emocional. Diseñamos el escenario donde ocurre la magia.</p>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-dark rounded-2xl overflow-hidden mb-6">
                <img src="https://picsum.photos/seed/film/800/450" alt="Audiovisual" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold">Producción Audiovisual</h3>
              <p className="text-white/60">Storytelling cinemático y fotografía artística. Capturamos la esencia de tu propuesta.</p>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-dark rounded-2xl overflow-hidden mb-6">
                <img src="https://picsum.photos/seed/tech/800/450" alt="Digital" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold">Desarrollo Digital</h3>
              <p className="text-white/60">Apps nativas, E-commerce y estrategias UX. Construimos el motor digital de tu éxito.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Social Proof & Methodology */}
      <Section id="methodology" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ rotate: [45, 40, 45] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="glow-capsule glow-orange w-[300px] h-[600px] top-0 left-0 opacity-20" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-24">
            <h3 className="text-center text-white/40 uppercase tracking-widest text-sm mb-12">Empresas que confían</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              {['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5'].map((logo) => (
                <span key={logo} className="text-2xl font-bold hover:text-neon transition-colors cursor-default">{logo}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-12 text-glow-violet">El Viaje del Héroe</h2>
              <div className="space-y-12 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
                {[
                  { step: "01", title: "Descubrimiento", desc: "Entendemos tu ADN y tus objetivos de negocio.", color: "glow-violet" },
                  { step: "02", title: "Concepto", desc: "Diseñamos la narrativa que unirá lo físico y lo digital.", color: "glow-orange" },
                  { step: "03", title: "Ejecución", desc: "Construimos con precisión técnica y sensibilidad artística.", color: "glow-lime" },
                  { step: "04", title: "Legado", desc: "Lanzamos y escalamos tu presencia en el mercado.", color: "glow-violet" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex gap-12 relative z-10"
                  >
                    <div className={`w-12 h-12 rounded-full bg-dark border border-white/20 flex items-center justify-center shrink-0 font-bold ${item.color.replace('glow-', 'text-')} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${item.color.replace('glow-', 'text-')}`}>{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-surface p-12 rounded-3xl border border-white/10 flex flex-col justify-center">
              <p className="text-2xl italic mb-8">"Áltera Studios transformó no solo nuestro local, sino la forma en que nuestros clientes interactúan con nosotros a diario."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neon/20" />
                <div>
                  <p className="font-bold">Juan Pérez</p>
                  <p className="text-white/40 text-sm">CEO, Restaurante Gourmet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative bg-dark text-white py-24 px-6 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="glow-capsule glow-violet w-[400px] h-[800px] -top-20 -left-20" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="glow-capsule glow-lime w-[300px] h-[600px] -bottom-20 -right-20" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-12 leading-none">
            ¿Listo para dar el <br /> <span className="text-neon">salto digital?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium text-white/70">
            Deja de vender productos. Empieza a contar historias.
          </p>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neon text-dark px-12 py-6 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(204,255,0,0.3)]"
          >
            Emperzar ahora por WhatsApp
          </a>

          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black tracking-tighter">ÁLTERA STUDIOS</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neon transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-neon transition-colors"><Video /></a>
              <a href="#" className="hover:text-neon transition-colors"><Linkedin /></a>
            </div>
            <div className="text-sm font-medium opacity-60">
              © 2026 Áltera Studios. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
