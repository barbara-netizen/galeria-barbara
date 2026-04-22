# Plan de arquitectura y diseño — Portfolio/Galería Barbara Gutiérrez

## Objetivo

Sitio web independiente, minimalista y **mobile-first** para Barbara Gutiérrez que unifique portfolio artístico y flujos comerciales diferenciados según la naturaleza de cada obra: consulta de pintura, licenciamiento de ilustraciones, contratación de animaciones y venta de obra literaria digital.

---

## Hallazgos del sitio actual (barbara-gutierrez.squarespace.com)

- Propuesta artística que combina arte visual, animación y escritura, pero hoy aparece dispersa.
- Navegación con redundancias y poca separación entre portfolio, servicios y productos digitales.
- Señales de ecommerce sin estructura clara de categorías, precios ni llamados a la acción por tipo.
- El rediseño debe priorizar: identidad editorial propia, jerarquía visual limpia, recorridos diferenciados para ver, contratar y comprar.

---

## Stack tecnológico recomendado

### Frontend
**Next.js + TypeScript + Tailwind CSS**

- Sitio rápido, SEO-friendly y fácil de desplegar.
- Arquitectura híbrida: páginas estáticas para portfolio + rutas dinámicas para obras/productos.
- Optimización de imágenes nativa y video embebido.
- Escala bien si luego se agregan blog, CMS o internacionalización.

### UI / Contenido
- Tailwind CSS para sistema visual consistente.
- Contenido gestionado en archivos JSON/MDX para la primera versión.
- Embeds de video desde Vimeo o YouTube (no listado) para animaciones.

### Pagos
**MercadoPago Checkout Pro** para:
- compra de licencias de ilustración,
- compra de ebooks.

### Formularios
- Formspree o Resend + endpoint serverless.
- Validación con Zod.

### Hosting
**Vercel**
- Integración natural con Next.js.
- CDN global y buen rendimiento móvil.
- Serverless functions para webhooks de pago y creación de preferencias.

### Dominio
- Dominio propio recomendado: `barbaragutierrez.com`.
- Redirección desde Squarespace durante transición.

---

## Arquitectura del sitio

### Mapa de páginas

```
/                          → Inicio
/pintura                   → Galería de pintura
/pintura/[slug]            → Ficha de obra con estado exhibited/available
/ilustraciones             → Galería + venta de licencias
/ilustraciones/[slug]      → Detalle + checkout
/animaciones               → Portfolio audiovisual
/animaciones/[slug]        → Detalle + formulario de contratación
/obra-literaria            → Catálogo de ebooks
/obra-literaria/[slug]     → Detalle + checkout
/sobre-mi                  → Biografía y statement artístico
/contacto                  → Formulario general
/gracias                   → Confirmación post-formulario/compra

API:
/api/mercadopago/create-preference
/api/mercadopago/webhook
/api/downloads
```

### Navegación

**Header fijo (mobile-first):**
- Logo
- Menú hamburguesa en móvil
- En desktop: Inicio · Pintura · Ilustraciones · Animaciones · Obra literaria · Sobre mí · Contacto

**Footer:**
- Email / redes sociales
- Copyright
- Política de licencias
- Términos de compra/descarga

---

## Diseño visual

### Dirección estética

Minimalismo cálido, editorial y contemplativo. La web debe sentirse como una **galería contemporánea**, no como una tienda.

### Paleta de color

| Token         | Valor     | Uso                             |
|---------------|-----------|----------------------------------|
| `ivory`       | `#F6F1E8` | Fondo general                   |
| `charcoal`    | `#1F1A17` | Texto principal                 |
| `stone`       | `#B7AEA4` | Texto secundario, bordes suaves |
| `terracotta`  | `#A56A52` | Acentos, precios, CTAs          |
| `olive`       | `#5C6652` | Acento editorial secundario     |

### Tipografía

- **Títulos:** `Cormorant Garamond` (serif elegante)
- **Cuerpo / UI:** `Inter` (sans limpia para legibilidad móvil)

### Layout

- Mucho espacio en blanco y ritmo vertical amplio.
- Rejillas simples: 1 columna en móvil, 2–4 en desktop según sección.
- Imágenes grandes, recortes limpios.
- Navegación hamburguesa limpia en móvil.
- CTA visibles sin saturación.
- Galerías swipe-friendly.

---

## Secciones detalladas

### 1) Inicio

**Bloques:**
- Hero editorial con imagen/obra destacada.
- Presentación breve de Barbara.
- Cuatro accesos visuales: Pintura · Ilustraciones · Animaciones · Obra literaria.
- Selección curada de obras destacadas.
- CTA a contacto/comisiones.

---

### 2) Pintura

**Objetivo:** galería de obra física con dos estados posibles: solo exhibición y disponible para consulta de precio.

**Características:**
- Grid responsivo tipo museo/editorial.
- Filtros opcionales por estado (exhibición / disponible), serie, técnica, año o formato.
- Ficha individual de obra con:
  - título, año, técnica, dimensiones, descripción breve.
  - **Estado de la obra** con dos valores posibles:
    - `En exhibición` — solo visualización, sin CTA de compra.
    - `Disponible` — muestra botón **"Consultar precio"**.
- El botón **"Consultar precio"** lleva a un formulario de contacto con campo de obra precompletado.
- Sin integración a MercadoPago ni checkout en esta sección.
- Las negociaciones de precio se resuelven off-site por Barbara.

**Flujo del interesado:**
```
Visita galería → ¿Está disponible? 
  → Sí → Botón "Consultar precio" → Formulario con obra precompletada → Email a Barbara
  → No → Solo visualización
```

**Modelo de datos:**
| Campo        | Tipo                       | Descripción                         |
|--------------|----------------------------|--------------------------------------|
| `slug`       | string                     | Identificador único                  |
| `title`      | string                     | Título de la obra                    |
| `year`       | number                     | Año de creación                      |
| `medium`     | string                     | Técnica                              |
| `dimensions` | string                     | Dimensiones                          |
| `series`     | string                     | Serie o colección                    |
| `coverImage` | string                     | Imagen principal                     |
| `gallery`    | string[]                   | Imágenes adicionales                 |
| `description`| string                     | Descripción de la obra               |
| `status`     | `exhibited` \| `available` | Estado: en exhibición o disponible   |

---

### 3) Ilustraciones

**Objetivo:** portfolio + venta de derechos/licencias de uso.

**Características:**
- Listado con miniaturas grandes.
- Detalle por ilustración:
  - title, preview ampliada, descripción.
  - tipo de uso permitido y alcance de licencia.
  - precio y botón "Comprar licencia".
- Posibles niveles de licencia: uso personal, editorial, comercial limitado.

**Modelo de datos:**
| Campo              | Tipo    | Descripción                      |
|--------------------|---------|----------------------------------|
| `slug`             | string  |                                  |
| `title`            | string  |                                  |
| `description`      | string  |                                  |
| `previewImage`     | string  |                                  |
| `tags`             | string[]|                                  |
| `licenseType`      | string  | personal / editorial / commercial|
| `price`            | number  |                                  |
| `currency`         | string  | ARS / USD                        |
| `deliveryType`     | string  | digital / license-only           |
| `mercadoPagoSku`   | string  | ID de producto en MP             |

---

### 4) Animaciones

**Objetivo:** portfolio audiovisual + captación de clientes.

**Características:**
- Reel destacado al inicio.
- Lista de proyectos con thumbnails o posters.
- Detalle por animación:
  - video embebido, descripción, rol, herramientas, cliente, contexto.
  - CTA a formulario de contratación.
- Formulario captura: nombre, email, tipo de proyecto, alcance, plazo estimado, presupuesto, referencias.

**Modelo de datos:**
| Campo        | Tipo    | Descripción              |
|--------------|---------|--------------------------|
| `slug`       | string  |                          |
| `title`      | string  |                          |
| `description`| string  |                          |
| `posterImage`| string  |                          |
| `videoUrl`   | string  | Vimeo o YouTube embed    |
| `duration`   | string  |                          |
| `role`       | string  |                          |
| `tools`      | string[]|                          |
| `client`     | string  |                          |

---

### 5) Obra Literaria

**Objetivo:** presentar y vender ebooks en PDF/EPUB.

**Características:**
- Catálogo de títulos con portada y sinopsis.
- Ficha de ebook: portada, sinopsis, formato, páginas, precio, botón "Comprar ebook".
- Tras pago aprobado: link temporal de descarga segura.

**Modelo de datos:**
| Campo            | Tipo    | Descripción               |
|------------------|---------|---------------------------|
| `slug`           | string  |                           |
| `title`          | string  |                           |
| `coverImage`     | string  |                           |
| `synopsis`       | string  |                           |
| `formats`        | string[]| epub / pdf                |
| `pages`          | number  |                           |
| `price`          | number  |                           |
| `currency`       | string  |                           |
| `sampleUrl`      | string  | Muestra gratuita          |
| `downloadAssetId`| string  | ID del archivo protegido  |

---

### 6) Sobre Barbara

- Biografía breve y statement artístico.
- Disciplinas, exposiciones, publicaciones, colaboraciones.
- Foto o retrato.

---

### 7) Contacto

- Formulario general.
- Email directo y redes.
- CTA a comisiones de ilustración/animación.

---

## Integración MercadoPago

### Casos de uso
- **Ilustraciones:** compra de licencia de uso.
- **Obra Literaria:** compra de ebook descargable.

### Flujo de pago

```
Usuario selecciona producto
→ Web solicita crear preferencia de pago (serverless)
→ Backend crea preferencia en MercadoPago con item + metadata
→ MP devuelve init_point
→ Usuario completa el pago en MP
→ MP envía webhook de confirmación
→ Backend valida pago
→ Web muestra pantalla de éxito + acceso a descarga
```

### Endpoints serverless
- `POST /api/mercadopago/create-preference` — crea preferencia con item, precio y metadata.
- `POST /api/mercadopago/webhook` — recibe confirmación de MP, valida y habilita entrega.
- `GET /api/downloads` — genera link temporal de descarga para ebooks.

### Metadata por transacción
- tipo: `illustration_license` o `ebook`
- id interno del producto
- título
- tipo de licencia (si aplica)
- email del comprador

### Seguridad
- Nunca confirmar pago solo por retorno del navegador.
- Siempre validar con webhook + consulta de estado a MP.
- Productos y precios centralizados en datos del proyecto.

---

## Componentes clave

### Globales
- `Header`, `MobileNav`, `Footer`
- `SectionIntro`, `CardGrid`
- `ArtworkCard`, `VideoCard`, `BookCard`
- `PriceBadge`, `CTAButton`
- `LightboxGallery`

### Comerciales
- `MercadoPagoButton`, `PurchaseSummary`
- `DownloadAccessPanel`
- `LicenseInfo`
- `PaymentStatus`

### Formularios
- `InquiryForm` (base reutilizable con variantes)
  - variante general
  - variante obra de pintura (obra precompletada)
  - variante servicio de animación
- `ServiceInquiryForm`

### Editoriales
- `ArtistStatement`, `FeaturedWorks`, `CategoryEntry`

---

## Estructura de archivos

```
/
├─ plan.md
├─ public/
│  ├─ images/
│  │  ├─ paintings/
│  │  ├─ illustrations/
│  │  ├─ books/
│  │  └─ branding/
│  ├─ video-posters/
│  └─ downloads/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ pintura/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ ilustraciones/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ animaciones/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ obra-literaria/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ sobre-mi/page.tsx
│  │  ├─ contacto/page.tsx
│  │  ├─ gracias/page.tsx
│  │  └─ api/
│  │     ├─ mercadopago/create-preference/route.ts
│  │     ├─ mercadopago/webhook/route.ts
│  │     └─ downloads/route.ts
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ gallery/
│  │  ├─ commerce/
│  │  ├─ forms/
│  │  └─ content/
│  ├─ data/
│  │  ├─ paintings/
│  │  ├─ illustrations/
│  │  ├─ books/
│  │  └─ animations/
│  ├─ lib/
│  │  ├─ mercadopago/
│  │  ├─ content/
│  │  ├─ validation/
│  │  └─ downloads/
│  ├─ styles/
│  │  └─ tokens.css
│  └─ types/
├─ docs/
│  ├─ content-model.md
│  ├─ licensing.md
│  └─ mercadopago.md
└─ package.json
```

---

## Fases de implementación

### Fase 1 — Fundaciones del proyecto
**Objetivo:** base técnica y visual lista.
- Inicializar proyecto Next.js + TypeScript + Tailwind.
- Definir sistema visual base: colores, tipografías, espaciado.
- Implementar layout global y navegación mobile-first.
- Crear estructura de datos para las cuatro líneas de contenido.
- **Entregables:** shell navegable, tokens de diseño, rutas base.

### Fase 2 — Portfolio editorial
**Objetivo:** exhibición completa de obra.
- Inicio con hero y cuatro accesos visuales.
- Pintura con ficha de obra y lógica exhibited/available + formulario de consulta.
- Animaciones con reel, detalles y formulario de contratación.
- Sobre mí y Contacto.

### Fase 3 — Comercio de ilustraciones
**Objetivo:** habilitar venta de licencias.
- Modelar productos/licencias.
- Páginas de ilustraciones con detalle.
- Integrar MercadoPago para checkout.
- Textos legales de licenciamiento.

### Fase 4 — Venta de obra literaria
**Objetivo:** vender ebooks con entrega digital.
- Catálogo y páginas de ebooks.
- Checkout MercadoPago.
- Flujo de descarga segura.
- Confirmaciones y post-compra.

### Fase 5 — Optimización y lanzamiento
**Objetivo:** lanzamiento sólido.
- SEO básico por sección.
- Open Graph y metadata.
- Optimización de imágenes y performance móvil.
- Analítica básica.
- Revisión legal y textos comerciales.
- Redirección progresiva desde Squarespace.

---

## Decisiones clave antes de implementar

### Contenido
- Confirmar inventario inicial de obras por sección.
- Definir qué ilustraciones tendrán precio público.
- Confirmar catálogo de ebooks y formatos definitivos.
- Reunir materiales visuales optimizados.

### Negocio
- Definir tipos exactos de licencia de ilustración.
- Definir políticas de devolución y uso.
- Confirmar cuenta MercadoPago y moneda operativa.

### Operación
- Decidir si la primera versión usa datos locales o CMS.

---

## Verificación / Definition of Done

El sitio queda correctamente implementado si:

- Identidad visual coherente, minimalista y propia.
- Navegación clara entre exhibición, contratación y compra.
- Experiencia móvil sólida.
- Pintura: obras `exhibited` sin CTA; obras `available` con "Consultar precio" → formulario.
- Ilustraciones: compra/licencia clara vía MercadoPago.
- Animaciones: portfolio + formulario de contratación funcional.
- Ebooks: checkout y descarga segura.
- Base técnica simple de mantener y escalar.

---

## Trazabilidad paso → objetivos → verificación

| Fase | Objetivos | Verificación |
|------|-----------|--------------|
| Fundaciones | Base técnica y visual | Navegación, tokens y rutas base operativas |
| Portfolio editorial | Exhibición clara de obra | Inicio, pintura, animaciones y sobre mí funcionales |
| Comercio ilustraciones | Licencias vendibles | Fichas con precio y checkout funcional |
| Venta ebooks | Descarga digital monetizable | Pago confirmado + acceso de descarga |
| Optimización | Lanzamiento sólido | Performance móvil, SEO básico, enlaces finales |
