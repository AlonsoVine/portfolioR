'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder: integración posterior con servicio de envío
    setForm(initialState);
  };

  return (
    <SectionShell id="contact">
      <SectionHeading
        eyebrow="Contacto"
        title="Trabajemos juntos"
        description="Formulario controlado preparado para validaciones visuales y animaciones en focus. El backend o servicio de envío se integrará más adelante."
      />

      <motion.form
        {...scrollRevealConfig}
        onSubmit={handleSubmit}
        className="mt-12 grid gap-8 rounded-3xl surface-card p-10 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="group">
            <label className="text-sm uppercase tracking-[0.4em] text-subtle">Nombre</label>
            <div className="relative mt-2">
              <input
                value={form.name}
                onChange={handleChange("name")}
                className="peer w-full rounded-2xl border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
                placeholder="Pendiente"
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl border-soft opacity-0 transition-opacity duration-300 peer-focus:opacity-100" />
            </div>
          </div>
          <div className="group">
            <label className="text-sm uppercase tracking-[0.4em] text-subtle">Email</label>
            <div className="relative mt-2">
              <input
                value={form.email}
                onChange={handleChange("email")}
                type="email"
                className="peer w-full rounded-2xl border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
                placeholder="email@dominio.com"
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl border-soft opacity-0 transition-opacity duration-300 peer-focus:opacity-100" />
            </div>
          </div>
        </div>
        <div className="group">
          <label className="text-sm uppercase tracking-[0.4em] text-subtle">Mensaje</label>
          <div className="relative mt-2">
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              className="peer min-h-[160px] w-full rounded-3xl border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
              placeholder="El contenido final se completará aquí."
            />
            <span className="pointer-events-none absolute inset-0 rounded-3xl border-soft opacity-0 transition-opacity duration-300 peer-focus:opacity-100" />
          </div>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_30px_60px_rgba(251,191,36,0.45)]"
        >
          Enviar brief
          <span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>
      </motion.form>
    </SectionShell>
  );
}

