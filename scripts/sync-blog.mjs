import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.migration' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const posts = [
  {
    id: 6,
    titulo: 'ICFES 2026: Cómo obtener más de 400 puntos (Guía Definitiva de Estudio)',
    slug: 'icfes-2026-como-obtener-mas-de-400-puntos-guia-definitiva-de-estudio',
    resumen: '¿Quieres entrar a la universidad pública? Descubre los mejores tips, trucos y la ruta de estudio para dominar el ICFES 2026 y obtener un puntaje superior a 400.',
    contenido: `<p>Llegar al día del examen con nervios es normal, pero llegar sin una estrategia es un error que te puede costar el ingreso a la universidad de tus sueños. Si quieres obtener un <strong>puntaje de élite</strong>, no se trata de estudiar 15 horas al día, sino de estudiar con inteligencia.</p>

<h3>1. Entiende la estructura del examen</h3>
<p>El ICFES no evalúa qué tanto sabes de memoria, sino tu <strong>capacidad de análisis</strong>. El examen se divide en 5 áreas clave:</p>
<ul>
    <li>Lectura Crítica</li>
    <li>Matemáticas</li>
    <li>Sociales y Ciudadanas</li>
    <li>Ciencias Naturales</li>
    <li>Inglés</li>
</ul>

<h3>2. El truco de la Lectura Crítica</h3>
<p>Esta es el área más importante porque afecta a todas las demás. Si no entiendes lo que lees en un problema de física, fallarás la respuesta aunque sepas la fórmula. <strong>Tip de oro:</strong> Lee primero las preguntas y luego el texto; así buscarás la información específica que necesitas.</p>

<h3>3. Realiza Simulacros Reales</h3>
<p>No basta con leer libros. Necesitas medir tu tiempo. En <strong>Grupo Elite</strong> sabemos que la práctica hace al maestro. Debes acostumbrarte a estar sentado 4 horas por sesión manteniendo la concentración al máximo.</p>

<h3>4. No dejes preguntas en blanco</h3>
<p>En el ICFES no te restan puntos por respuestas incorrectas. Si te queda poco tiempo, usa la técnica del descarte. Normalmente, hay dos opciones que son claramente falsas; elige la que mejor se adapte al contexto lógico del enunciado.</p>

<h3>Conclusión</h3>
<p>El éxito en el ICFES es 70% técnica de lectura y 30% conocimiento disciplinar. Empieza hoy mismo tu preparación y asegura tu cupo en la educación superior.</p>`,
    imagen_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    meta_keywords: 'icfes 2026, puntaje icfes, tips icfes, simulacro icfes gratis, como estudiar para el icfes, grupo elite icfes',
    vistas: 0,
    fecha_creacion: '2026-03-07 18:40:54',
  },
  {
    id: 7,
    titulo: 'Calendario ICFES 2026: Fechas de Inscripción, Precios y Registro Paso a Paso',
    slug: 'calendario-icfes-2026-fechas-de-inscripcion-precios-y-registro-paso-a-paso',
    resumen: '¿Cuándo son las inscripciones al ICFES 2026? Consulta el calendario oficial, fechas de registro extraordinario, precios y la guía para no cometer errores en Prisma.',
    contenido: `<p>¿Miedo a que se te pase la fecha de inscripción? En esta guía para el 2026 te explicamos el cronograma oficial y los pasos críticos para asegurar tu lugar en el examen más importante de Colombia.</p>

<h2>Calendario Oficial ICFES 2026 (Proyectado)</h2>
<ul>
<li><strong>Registro y Recaudo Ordinario:</strong> Normalmente entre los meses de abril y mayo para Calendario A.</li>
<li><strong>Registro Extraordinario:</strong> Una ventana corta de 5 a 10 días en junio (¡ojo! el costo aumenta casi un 50%).</li>
<li><strong>Publicación de Citaciones:</strong> Dos semanas antes de la prueba.</li>
<li><strong>Aplicación del Examen:</strong> Tradicionalmente el segundo domingo de agosto.</li>
</ul>

<h2>Cómo registrarse en Prisma sin errores</h2>
<p>El registro se realiza a través de la plataforma <strong>Prisma ICFES</strong>. Asegúrate de que el tipo y número de documento coincidan exactamente con tu identidad física.</p>

<h2>Costos del Examen 2026</h2>
<p>Se estima que el valor ordinario ronde los $60,000 - $85,000 COP. Si dejas pasar la fecha ordinaria, el recaudo extraordinario puede superar los $130,000 COP.</p>

<h2>Consejos para el día del registro</h2>
<ul>
<li>Ten a la mano el código DANE de tu colegio si eres bachiller graduado.</li>
<li>Utiliza un correo electrónico personal que revises con frecuencia.</li>
<li>No esperes al último día; la plataforma Prisma suele colapsar.</li>
</ul>`,
    imagen_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200',
    meta_keywords: 'icfes 2026 fechas, inscripciones icfes 2026, citación icfes, calendario a icfes, registro prisma icfes, costo examen icfes 2026, padres de familia icfes',
    vistas: 0,
    fecha_creacion: '2026-03-08 02:01:12',
  },
  {
    id: 8,
    titulo: 'Lo que Realmente Evalúa el ICFES 2026: Temas Clave y Estructura por Materias',
    slug: 'lo-que-realmente-evalua-el-icfes-2026-temas-clave-y-estructura-por-materias',
    resumen: '¿No sabes por dónde empezar a estudiar? Descubre los componentes y temas que más se repiten en el ICFES 2026.',
    contenido: `<p>Muchos estudiantes cometen el error de estudiar "todo" el contenido de bachillerato, perdiendo tiempo valioso. El secreto para un puntaje de élite es saber qué temas tienen mayor peso en la evaluación.</p>

<h2>Lectura Crítica: El corazón del examen</h2>
<ul>
<li><strong>Textos continuos:</strong> Columnas de opinión, fragmentos literarios y textos filosóficos.</li>
<li><strong>Textos discontinuos:</strong> Infografías, caricaturas y tablas de datos.</li>
<li><strong>Análisis crítico:</strong> Diferenciar entre un hecho y una opinión.</li>
</ul>

<h2>Matemáticas: Razonamiento sobre fórmulas</h2>
<ul>
<li><strong>Estadística y probabilidad:</strong> Interpretación de gráficas (Casi el 35% del área).</li>
<li><strong>Geometría:</strong> Cálculo de áreas, perímetros y volúmenes.</li>
<li><strong>Álgebra y Cálculo:</strong> Razonamiento cuantitativo y resolución de problemas.</li>
</ul>

<h2>Ciencias Naturales: El enfoque científico</h2>
<ul>
<li><strong>Uso comprensivo:</strong> Entender leyes como la de Newton o la tabla periódica.</li>
<li><strong>Explicación de fenómenos:</strong> ¿Por qué ocurren las cosas en el ecosistema o en una reacción química?</li>
<li><strong>Indagación:</strong> Interpretar resultados de experimentos.</li>
</ul>

<h2>Sociales y Ciudadanas</h2>
<ul>
<li><strong>Pensamiento Social:</strong> Constitución Política de Colombia.</li>
<li><strong>Interpretación de perspectivas:</strong> Un conflicto puede tener diferentes versiones.</li>
<li><strong>Pensamiento reflexivo:</strong> Identificar prejuicios y modelos políticos/económicos.</li>
</ul>

<h2>Inglés: De lo básico a la comprensión</h2>
<p>Alineado con el MCER, desde A- hasta B1. Se evalúa a través de avisos, diálogos y comprensión de textos.</p>`,
    imagen_url: 'https://assets.rcnradio.com/assets/cms/ICFES_d89449ec80.webp',
    meta_keywords: 'temas que salen en el icfes 2026, estructura prueba saber 11, componentes icfes, qué estudiar para el icfes, lectura critica temas, matematicas icfes preguntas, guia de estudio colombia',
    vistas: 0,
    fecha_creacion: '2026-03-08 02:10:01',
  },
  {
    id: 9,
    titulo: 'Los 7 Mitos del ICFES que te Están Impidiendo Lograr un Puntaje de Élite',
    slug: 'los-7-mitos-del-icfes-que-te-estan-impidiendo-lograr-un-puntaje-de-elite',
    resumen: '¿Crees que el ICFES es solo memoria? ¿O que necesitas ser un genio en matemáticas? Desmentimos los 7 mitos más comunes que confunden a los estudiantes.',
    contenido: `<p>En los pasillos de los colegios circulan historias sobre el ICFES que, lejos de ayudar, generan ansiedad y estrategias de estudio equivocadas.</p>

<h2>Mito 1: "El ICFES es una prueba de memoria"</h2>
<p>La Realidad: El ICFES evalúa competencias. No te preguntarán la fecha exacta de una batalla, sino las causas y consecuencias de ese conflicto.</p>

<h2>Mito 2: "Si me va mal en el simulacro, me irá mal en el examen"</h2>
<p>La Realidad: Los simulacros están diseñados para fallar. Su propósito es identificar tus vacíos de conocimiento.</p>

<h2>Mito 3: "Inglés no suma tanto como Matemáticas"</h2>
<p>La Realidad: Todas las áreas cuentan. Un excelente desempeño en Inglés puede ser el empujón para superar los 400 puntos.</p>

<h2>Mito 4: "Hay que leer todo el texto palabra por palabra"</h2>
<p>La Realidad: El tiempo es tu recurso más escaso. Aprender técnicas de skimming y scanning es vital.</p>

<h2>Mito 5: "La prueba es igual para todos cada año"</h2>
<p>La Realidad: El ICFES evoluciona. Usar material de hace 10 años no es tan efectivo como usar simulacros actualizados al 2026.</p>

<h2>Mito 6: "Solo los 'genios' sacan buen puntaje"</h2>
<p>La Realidad: El puntaje de élite es 20% talento y 80% técnica.</p>

<h2>Mito 7: "Debo estudiar 12 horas seguidas el día anterior"</h2>
<p>La Realidad: El agotamiento cognitivo es real. Lo que no aprendiste en 6 meses, no lo aprenderás en una noche.</p>`,
    imagen_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    meta_keywords: 'mitos icfes, mentiras sobre el icfes, es dificil el icfes, trucos icfes 2026, puntaje icfes medicina, preparacion icfes inteligente, icfes colombia consejos',
    vistas: 0,
    fecha_creacion: '2026-03-08 02:17:57',
  },
  {
    id: 10,
    titulo: 'Puntajes ICFES por Carreras 2026: ¿Cuánto necesitas para la Universidad?',
    slug: 'puntajes-icfes-por-carreras-2026-cuanto-necesitas-para-la-universidad',
    resumen: '¿Sabes qué puntaje necesitas para la carrera de tus sueños? Analizamos los promedios exigidos en Medicina, Derecho, Ingenierías y más para este 2026.',
    contenido: `<p>Entrar a la educación superior en Colombia es competitivo. A continuación, presentamos una estimación de los puntajes requeridos para las áreas más demandadas en 2026.</p>

<h2>Carreras de Alta Demanda (Puntajes 380 - 450+)</h2>
<ul>
<li><strong>Medicina:</strong> En universidades públicas, el corte rara vez baja de 400-420 puntos.</li>
<li><strong>Ingeniería de Sistemas / IA:</strong> Se recomienda un puntaje superior a 380.</li>
<li><strong>Derecho:</strong> En instituciones de prestigio, el promedio ronda los 370-390 puntos.</li>
</ul>

<h2>Carreras de Nivel Medio-Alto (Puntajes 320 - 370)</h2>
<ul>
<li><strong>Administración de Empresas y Economía:</strong> Cortes entre 330 y 360 puntos.</li>
<li><strong>Psicología:</strong> Promedios de ingreso de 340 puntos.</li>
<li><strong>Arquitectura y Diseño:</strong> Un puntaje de 350 te da gran ventaja.</li>
</ul>

<h2>Becas y Beneficios por Excelencia</h2>
<ul>
<li><strong>Generación E / Política de Gratuidad:</strong> Dependiendo del SISBEN y un puntaje destacado.</li>
<li><strong>Becas de Universidades Privadas:</strong> Becas del 50% al 100% a los mejores bachilleres.</li>
<li><strong>Distinción Andrés Bello:</strong> El reconocimiento máximo del Gobierno para los mejores puntajes nacionales.</li>
</ul>`,
    imagen_url: 'https://img.freepik.com/foto-gratis/tres-amigos-graduados-internacionales-felices-saludando-campus-universitario-batas-graduacion-diploma_496169-1360.jpg?semt=ais_rp_progressive&w=740&q=80',
    meta_keywords: 'puntajes icfes para medicina, que puntaje se necesita para derecho, puntajes universidades publicas colombia, icfes para ingeniería, mejores puntajes icfes 2026, becas por icfes, ingresar a la nacho puntaje',
    vistas: 0,
    fecha_creacion: '2026-03-08 02:25:28',
  },
  {
    id: 11,
    titulo: 'Las Mejores Universidades de Colombia 2026: Ranking y Puntajes ICFES Requeridos',
    slug: 'las-mejores-universidades-de-colombia-2026-ranking-y-puntajes-icfes-requeridos',
    resumen: '¿Buscas la mejor educación? Conoce el ranking de las mejores universidades de Colombia para el 2026 y los puntajes ICFES mínimos para asegurar tu ingreso.',
    contenido: `<p>Elegir dónde estudiar es tan importante como elegir qué estudiar. Analizamos el panorama para el 2026.</p>

<h2>Las "Tres Grandes" Públicas</h2>
<ul>
<li><strong>Universidad Nacional de Colombia (UNAL):</strong> Estándares de ingreso más altos del país.</li>
<li><strong>Universidad de Antioquia (UdeA):</strong> Cortes extremadamente competitivos.</li>
<li><strong>Universidad del Valle (Univalle):</strong> Puntajes de corte para ingeniería y salud suelen superar los 380 puntos.</li>
</ul>

<h2>Universidades Privadas de Élite</h2>
<ul>
<li><strong>Universidad de los Andes:</strong> Enfoque en rendimiento global superior.</li>
<li><strong>Pontificia Universidad Javeriana:</strong> Valora el equilibrio entre el ICFES y la entrevista personal.</li>
<li><strong>Universidad del Rosario:</strong> Exige puntajes destacados en Lectura Crítica y Sociales.</li>
</ul>

<h2>¿Cómo elegir la mejor opción según tu puntaje?</h2>
<p>Debes considerar el enfoque de la facultad, ubicación, costos y ponderación de materias.</p>

<h2>Ranking por Ciudades</h2>
<p>Bogotá sigue liderando, seguida por Medellín y Cali. Bucaramanga y Barranquilla han escalado posiciones.</p>`,
    imagen_url: 'https://thumbs.dreamstime.com/b/biblioteca-del-valle-en-el-campus-de-la-universidad-estatal-oreg%C3%B3n-corvallis-usa-mayo-412248520.jpg',
    meta_keywords: 'mejores universidades de colombia 2026, ranking universidades icfes, entrar a la universidad nacional puntaje, universidades privadas vs publicas colombia, mejores universidades bogota, mejores universidades medellin, icfes para universidades top',
    vistas: 0,
    fecha_creacion: '2026-03-08 02:32:38',
  },
];

for (const post of posts) {
  const { error } = await supabase.from('blog_posts').upsert(post, { onConflict: 'id' });
  if (error) console.log(`❌ Post ${post.id}: ${error.message}`);
  else console.log(`✅ Post ${post.id}: ${post.titulo.slice(0, 60)}…`);
}

console.log('\n🎉 Blog sincronizado');