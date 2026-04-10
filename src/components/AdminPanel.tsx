import React, { useState } from "react";
import { 
  X, Save, LogOut, Edit2, Plus, Trash2, 
  Image as ImageIcon, Link as LinkIcon, Type, 
  Layout, MessageSquare, Zap, Smartphone, 
  Layers, Palette, Quote, Settings, 
  ChevronRight, Monitor, Globe
} from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { SiteConfig } from "../types";
import { motion, AnimatePresence } from "motion/react";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AdminPanelProps {
  config: SiteConfig;
  onClose: () => void;
}

type TabType = "general" | "hero" | "manifesto" | "problems" | "benefits" | "tech" | "services" | "methodology" | "footer";

export default function AdminPanel({ config, onClose }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editConfig, setEditConfig] = useState<SiteConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("general");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "17686991") {
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const path = "config/site";
    try {
      const configRef = doc(db, path);
      await updateDoc(configRef, { ...editConfig });
      alert("Cambios guardados correctamente");
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.WRITE, path);
      } catch (finalError: any) {
        const info = JSON.parse(finalError.message);
        alert(`Error de permisos: ${info.error}. Asegúrate de estar logueado correctamente.`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateNested = (path: string, value: any) => {
    const keys = path.split('.');
    const newConfig = { ...editConfig };
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setEditConfig(newConfig);
  };

  const updateArrayItem = (path: string, index: number, field: string, value: any) => {
    const keys = path.split('.');
    const newConfig = { ...editConfig };
    let current: any = newConfig;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    current[index][field] = value;
    setEditConfig(newConfig);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-6 backdrop-blur-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-surface border border-white/10 p-10 rounded-[40px] w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter">ADMIN</h2>
              <p className="text-white/40 text-sm">Acceso restringido Áltera Studios</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Usuario</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-neon outline-none transition-all group-hover:bg-white/[0.08]"
                  placeholder="admin"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Contraseña</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-neon outline-none transition-all group-hover:bg-white/[0.08]"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-neon text-dark font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              ENTRAR AL PANEL
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "general", label: "General", icon: Settings },
    { id: "hero", label: "Hero", icon: Monitor },
    { id: "manifesto", label: "Manifiesto", icon: Quote },
    { id: "problems", label: "Problemas", icon: MessageSquare },
    { id: "benefits", label: "Beneficios", icon: Zap },
    { id: "tech", label: "Tech", icon: Smartphone },
    { id: "services", label: "Servicios", icon: Layers },
    { id: "methodology", label: "Metodología", icon: Palette },
    { id: "footer", label: "Footer", icon: Globe },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-dark flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/10 bg-surface flex flex-col">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-dark" />
            </div>
            <h2 className="text-xl font-black tracking-tighter uppercase">ÁLTERA CMS</h2>
          </div>
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase">v2.0.0 Stable</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                activeTab === tab.id 
                  ? "bg-neon text-dark font-bold shadow-[0_0_20px_rgba(204,255,0,0.1)]" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-dark" : "text-white/40 group-hover:text-neon"}`} />
              <span className="flex-1 text-left">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-3 bg-white text-dark px-6 py-4 rounded-2xl font-black hover:bg-neon transition-all disabled:opacity-50 shadow-xl"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "GUARDANDO..." : "PUBLICAR"}
          </button>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-3 bg-white/5 text-white/60 px-6 py-4 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            SALIR
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-dark relative">
        <div className="absolute top-8 right-8 z-10">
          <button onClick={onClose} className="p-4 bg-surface border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-12 py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header>
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
                <p className="text-white/40">Gestiona el contenido de la sección {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
              </header>

              {activeTab === "general" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Nombre de la Marca</label>
                    <input 
                      type="text" 
                      value={editConfig.brandName}
                      onChange={(e) => setEditConfig({...editConfig, brandName: e.target.value})}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">URL Portafolio (Behance)</label>
                    <input 
                      type="text" 
                      value={editConfig.portfolioUrl}
                      onChange={(e) => setEditConfig({...editConfig, portfolioUrl: e.target.value})}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">WhatsApp (Número)</label>
                      <input 
                        type="text" 
                        value={editConfig.socialLinks.whatsapp}
                        onChange={(e) => updateNested('socialLinks.whatsapp', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Instagram URL</label>
                      <input 
                        type="text" 
                        value={editConfig.socialLinks.instagram}
                        onChange={(e) => updateNested('socialLinks.instagram', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">LinkedIn URL</label>
                      <input 
                        type="text" 
                        value={editConfig.socialLinks.linkedin}
                        onChange={(e) => updateNested('socialLinks.linkedin', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Vimeo URL</label>
                      <input 
                        type="text" 
                        value={editConfig.socialLinks.vimeo}
                        onChange={(e) => updateNested('socialLinks.vimeo', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "hero" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título Principal</label>
                    <input 
                      type="text" 
                      value={editConfig.hero.title}
                      onChange={(e) => updateNested('hero.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Subtítulo</label>
                    <textarea 
                      value={editConfig.hero.subtitle}
                      onChange={(e) => updateNested('hero.subtitle', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all h-32 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">URL Video de Fondo</label>
                    <input 
                      type="text" 
                      value={editConfig.hero.videoUrl}
                      onChange={(e) => updateNested('hero.videoUrl', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {activeTab === "manifesto" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Texto del Manifiesto</label>
                    <textarea 
                      value={editConfig.manifesto.text}
                      onChange={(e) => updateNested('manifesto.text', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all h-48 resize-none text-xl font-bold"
                    />
                  </div>
                </div>
              )}

              {activeTab === "problems" && (
                <div className="space-y-12">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título de la Sección</label>
                    <input 
                      type="text" 
                      value={editConfig.problems.title}
                      onChange={(e) => updateNested('problems.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {editConfig.problems.cards.map((card, idx) => (
                      <div key={idx} className="p-8 bg-surface border border-white/10 rounded-[32px] space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-violet-500/20 text-violet-500 rounded-full flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                          <h4 className="font-bold uppercase tracking-widest text-sm">Tarjeta {idx + 1}</h4>
                        </div>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            value={card.title}
                            onChange={(e) => updateArrayItem('problems.cards', idx, 'title', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                            placeholder="Título"
                          />
                          <textarea 
                            value={card.description}
                            onChange={(e) => updateArrayItem('problems.cards', idx, 'description', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-24 resize-none"
                            placeholder="Descripción"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-12">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título de la Sección</label>
                    <input 
                      type="text" 
                      value={editConfig.benefits.title}
                      onChange={(e) => updateNested('benefits.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {editConfig.benefits.cards.map((card, idx) => (
                      <div key={idx} className="p-8 bg-surface border border-white/10 rounded-[32px] space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                          <h4 className="font-bold uppercase tracking-widest text-sm">Beneficio {idx + 1}</h4>
                        </div>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            value={card.title}
                            onChange={(e) => updateArrayItem('benefits.cards', idx, 'title', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                            placeholder="Título"
                          />
                          <textarea 
                            value={card.description}
                            onChange={(e) => updateArrayItem('benefits.cards', idx, 'description', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-24 resize-none"
                            placeholder="Descripción"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Tagline</label>
                      <input 
                        type="text" 
                        value={editConfig.tech.tagline}
                        onChange={(e) => updateNested('tech.tagline', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título</label>
                      <input 
                        type="text" 
                        value={editConfig.tech.title}
                        onChange={(e) => updateNested('tech.title', e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {editConfig.tech.items.map((item, idx) => (
                      <div key={idx} className="p-8 bg-surface border border-white/10 rounded-[32px] space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-lime-500/20 text-lime-500 rounded-full flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                          <h4 className="font-bold uppercase tracking-widest text-sm">Item Tech {idx + 1}</h4>
                        </div>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => updateArrayItem('tech.items', idx, 'title', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                            placeholder="Título"
                          />
                          <textarea 
                            value={item.description}
                            onChange={(e) => updateArrayItem('tech.items', idx, 'description', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-24 resize-none"
                            placeholder="Descripción"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-12">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título de la Sección</label>
                    <input 
                      type="text" 
                      value={editConfig.services.title}
                      onChange={(e) => updateNested('services.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {editConfig.services.items.map((item, idx) => (
                      <div key={idx} className="p-8 bg-surface border border-white/10 rounded-[32px] grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-neon/20 text-neon rounded-full flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                            <h4 className="font-bold uppercase tracking-widest text-sm">Servicio {idx + 1}</h4>
                          </div>
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => updateArrayItem('services.items', idx, 'title', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                            placeholder="Título"
                          />
                          <textarea 
                            value={item.description}
                            onChange={(e) => updateArrayItem('services.items', idx, 'description', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-32 resize-none"
                            placeholder="Descripción"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Imagen URL</label>
                          <input 
                            type="text" 
                            value={item.imageUrl}
                            onChange={(e) => updateArrayItem('services.items', idx, 'imageUrl', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all mb-4"
                            placeholder="https://..."
                          />
                          <div className="aspect-video rounded-2xl bg-dark overflow-hidden border border-white/5">
                            <img src={item.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "methodology" && (
                <div className="space-y-12">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título de la Sección</label>
                    <input 
                      type="text" 
                      value={editConfig.methodology.title}
                      onChange={(e) => updateNested('methodology.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Pasos de Metodología</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {editConfig.methodology.steps.map((step, idx) => (
                        <div key={idx} className="p-6 bg-surface border border-white/10 rounded-2xl space-y-4">
                          <input 
                            type="text" 
                            value={step.title}
                            onChange={(e) => updateArrayItem('methodology.steps', idx, 'title', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all font-bold"
                            placeholder="Título del Paso"
                          />
                          <textarea 
                            value={step.description}
                            onChange={(e) => updateArrayItem('methodology.steps', idx, 'description', e.target.value)}
                            className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-20 resize-none text-sm"
                            placeholder="Descripción"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 bg-surface border border-white/10 rounded-[32px] space-y-6">
                    <h4 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                      <Quote className="w-4 h-4 text-neon" /> Testimonio
                    </h4>
                    <textarea 
                      value={editConfig.methodology.testimonial.text}
                      onChange={(e) => updateNested('methodology.testimonial.text', e.target.value)}
                      className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all h-32 resize-none italic"
                      placeholder="Texto del testimonio"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        type="text" 
                        value={editConfig.methodology.testimonial.author}
                        onChange={(e) => updateNested('methodology.testimonial.author', e.target.value)}
                        className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                        placeholder="Autor"
                      />
                      <input 
                        type="text" 
                        value={editConfig.methodology.testimonial.role}
                        onChange={(e) => updateNested('methodology.testimonial.role', e.target.value)}
                        className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-neon outline-none transition-all"
                        placeholder="Cargo/Rol"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "footer" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Título Footer</label>
                    <input 
                      type="text" 
                      value={editConfig.footer.title}
                      onChange={(e) => updateNested('footer.title', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Subtítulo Footer</label>
                    <textarea 
                      value={editConfig.footer.subtitle}
                      onChange={(e) => updateNested('footer.subtitle', e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl px-6 py-4 focus:border-neon outline-none transition-all h-32 resize-none"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
