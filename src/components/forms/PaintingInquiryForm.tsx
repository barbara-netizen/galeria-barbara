"use client";

import { useState } from "react";
import { useForm } from "@formspree/react";

interface Props {
  paintingTitle: string;
}

export default function PaintingInquiryForm({ paintingTitle }: Props) {
  const [state, handleSubmit] = useForm("xpqkygdo");
  const [expanded, setExpanded] = useState(false);

  if (state.succeeded) {
    return (
      <div className="border border-olive/30 bg-olive/5 px-6 py-8 text-center">
        <p className="font-serif text-xl text-charcoal mb-2">Mensaje enviado</p>
        <p className="text-sm text-charcoal/60">
          Te voy a responder apenas pueda.
        </p>
      </div>
    );
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full sm:w-auto px-10 py-3 bg-terracotta text-ivory text-sm tracking-wide hover:bg-terracotta/80 transition-colors"
      >
        Consultar por esta obra
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="obra" value={paintingTitle} />

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Nombre</label>
        <input
          type="text"
          name="name"
          required
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">
          Obra consultada
        </label>
        <input
          type="text"
          value={paintingTitle}
          readOnly
          className="w-full border border-stone/20 bg-stone/5 px-4 py-2.5 text-sm text-stone cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">
          Mensaje (opcional)
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors resize-none"
          placeholder="Si querés, contame qué te interesa saber."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={state.submitting}
          className="flex-1 sm:flex-none px-8 py-3 bg-terracotta text-ivory text-sm tracking-wide hover:bg-terracotta/80 disabled:opacity-60 transition-colors"
        >
          {state.submitting ? "Enviando..." : "Enviar mensaje"}
        </button>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="px-4 py-3 text-sm text-stone hover:text-charcoal transition-colors"
        >
          Cancelar
        </button>
      </div>

      {state.errors && (
        <p className="text-sm text-terracotta">
          Hubo un error. Reintentá o escribime directamente.
        </p>
      )}
    </form>
  );
}
