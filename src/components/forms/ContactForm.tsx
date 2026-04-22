"use client";

import { useForm } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xpqkygdo");

  if (state.succeeded) {
    return (
      <div className="border border-olive/30 bg-olive/5 px-6 py-8 text-center">
        <p className="font-serif text-xl text-charcoal mb-2">Mensaje enviado</p>
        <p className="text-sm text-charcoal/60">Te voy a responder apenas pueda.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Nombre *</label>
        <input
          type="text"
          name="name"
          required
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Email *</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Asunto</label>
        <input
          type="text"
          name="subject"
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="Ej: consulta por una obra o propuesta de trabajo"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Mensaje *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors resize-none"
          placeholder="Escribime lo que necesitás."
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-8 py-3.5 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta disabled:opacity-60 transition-colors"
      >
        {state.submitting ? "Enviando..." : "Enviar mensaje"}
      </button>

      {state.errors && (
        <p className="text-sm text-terracotta text-center">
          Hubo un error. Reintentá en un rato.
        </p>
      )}
    </form>
  );
}
