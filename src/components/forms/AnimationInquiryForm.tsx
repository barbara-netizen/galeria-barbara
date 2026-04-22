"use client";

import { useForm } from "@formspree/react";

export default function AnimationInquiryForm() {
  const [state, handleSubmit] = useForm("xpqkygdo");

  if (state.succeeded) {
    return (
      <div className="border border-olive/30 bg-olive/5 px-6 py-8 text-center">
        <p className="font-serif text-xl text-charcoal mb-2">Mensaje enviado</p>
        <p className="text-sm text-charcoal/60">
          Voy a leer tu propuesta y responderte apenas pueda.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Tipo de proyecto *</label>
        <select
          name="project_type"
          required
          className="w-full border border-stone/30 bg-ivory px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors"
        >
          <option value="">Elegí una opción</option>
          <option value="editorial">Editorial / Libro</option>
          <option value="commercial">Comercial / Marca</option>
          <option value="short-film">Cortometraje / Autor</option>
          <option value="motion">Motion graphics</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Descripción del proyecto *</label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors resize-none"
          placeholder="Contame de qué se trata, qué necesitás y para qué es."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-stone mb-1 tracking-wide">Plazo estimado</label>
          <input
            type="text"
            name="deadline"
            className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
            placeholder="Ej: para junio, sin apuro, urgente"
          />
        </div>
        <div>
          <label className="block text-xs text-stone mb-1 tracking-wide">Presupuesto orientativo</label>
          <input
            type="text"
            name="budget"
            className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
            placeholder="Ej: tengo un monto definido o lo vemos"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-stone mb-1 tracking-wide">Referencias o links</label>
        <input
          type="text"
          name="references"
          className="w-full border border-stone/30 bg-transparent px-4 py-2.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="Links, referencias o algo que me ayude a entender la idea"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-8 py-3.5 bg-terracotta text-ivory text-sm tracking-wide hover:bg-terracotta/80 disabled:opacity-60 transition-colors"
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
