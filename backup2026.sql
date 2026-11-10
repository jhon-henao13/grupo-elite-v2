-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: grupoelite.mysql.pythonanywhere-services.com    Database: grupoelite$default
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `grupoelite$default`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `grupoelite$default` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `grupoelite$default`;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `resumen` varchar(160) DEFAULT NULL,
  `contenido` text NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `vistas` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (6,'ICFES 2026: Cómo obtener más de 400 puntos (Guía Definitiva de Estudio)','icfes-2026-como-obtener-mas-de-400-puntos-guia-definitiva-de-estudio','¿Quieres entrar a la universidad pública? Descubre los mejores tips, trucos y la ruta de estudio para dominar el ICFES 2026 y obtener un puntaje superior a 400.','<p>Llegar al día del examen con nervios es normal, pero llegar sin una estrategia es un error que te puede costar el ingreso a la universidad de tus sueños. Si quieres obtener un <strong>puntaje de élite</strong>, no se trata de estudiar 15 horas al día, sino de estudiar con inteligencia.</p>\r\n\r\n<h3>1. Entiende la estructura del examen</h3>\r\n<p>El ICFES no evalúa qué tanto sabes de memoria, sino tu <strong>capacidad de análisis</strong>. El examen se divide en 5 áreas clave:</p>\r\n<ul>\r\n    <li>Lectura Crítica</li>\r\n    <li>Matemáticas</li>\r\n    <li>Sociales y Ciudadanas</li>\r\n    <li>Ciencias Naturales</li>\r\n    <li>Inglés</li>\r\n</ul>\r\n\r\n<h3>2. El truco de la Lectura Crítica</h3>\r\n<p>Esta es el área más importante porque afecta a todas las demás. Si no entiendes lo que lees en un problema de física, fallarás la respuesta aunque sepas la fórmula. <strong>Tip de oro:</strong> Lee primero las preguntas y luego el texto; así buscarás la información específica que necesitas.</p>\r\n\r\n<h3>3. Realiza Simulacros Reales</h3>\r\n<p>No basta con leer libros. Necesitas medir tu tiempo. En <strong>Grupo Elite</strong> sabemos que la práctica hace al maestro. Debes acostumbrarte a estar sentado 4 horas por sesión manteniendo la concentración al máximo.</p>\r\n\r\n<h3>4. No dejes preguntas en blanco</h3>\r\n<p>En el ICFES no te restan puntos por respuestas incorrectas. Si te queda poco tiempo, usa la técnica del descarte. Normalmente, hay dos opciones que son claramente falsas; elige la que mejor se adapte al contexto lógico del enunciado.</p>\r\n\r\n<div class=\"alert alert-warning\" style=\"background: #fcf8e3; border: 1px solid #faebcc; padding: 15px; border-radius: 4px;\">\r\n    <strong>¡Prepárate con los mejores!</strong> Únete a nuestro programa de entrenamiento y accede a material filtrado y simulacros actualizados al 2026. \r\n</div>\r\n\r\n<h3>Conclusión</h3>\r\n<p>El éxito en el ICFES es 70% técnica de lectura y 30% conocimiento disciplinar. Empieza hoy mismo tu preparación y asegura tu cupo en la educación superior.</p>','https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop','icfes 2026, puntaje icfes, tips icfes, simulacro icfes gratis, como estudiar para el icfes, grupo elite icfes','2026-03-07 18:40:54',0),(7,'Calendario ICFES 2026: Fechas de Inscripción, Precios y Registro Paso a Paso','calendario-icfes-2026-fechas-de-inscripcion-precios-y-registro-paso-a-paso','¿Cuándo son las inscripciones al ICFES 2026? Consulta el calendario oficial, fechas de registro extraordinario, precios y la guía para no cometer errores en Pri','<p class=\"text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 border-b border-white/5 pb-12 italic\">\r\n¿Miedo a que se te pase la fecha de inscripción? En esta guía para el 2026 te explicamos el cronograma oficial y los pasos críticos para asegurar tu lugar en el examen más importante de Colombia.\r\n</p>\r\n\r\nLlevar un control estricto del calendario es el primer paso para el éxito. Muchos estudiantes con gran potencial pierden oportunidades por no registrarse a tiempo o por errores en la plataforma Prisma. Si eres padre de familia o bachiller, guarda este artículo en tus favoritos.\r\n\r\n<h2>Calendario Oficial ICFES 2026 (Proyectado)</h2>\r\nEl ICFES suele dividir sus procesos en dos grandes bloques: Calendario A (el más masivo) y Calendario B. Aquí están los periodos clave que debes monitorear:\r\n\r\n<ul>\r\n<li><strong>Registro y Recaudo Ordinario:</strong> Normalmente entre los meses de abril y mayo para Calendario A.</li>\r\n<li><strong>Registro Extraordinario:</strong> Una ventana corta de 5 a 10 días en junio (¡ojo! el costo aumenta casi un 50%).</li>\r\n<li><strong>Publicación de Citaciones:</strong> Dos semanas antes de la prueba.</li>\r\n<li><strong>Aplicación del Examen:</strong> Tradicionalmente el segundo domingo de agosto.</li>\r\n</ul>\r\n\r\n<h2>Cómo registrarse en Prisma sin errores</h2>\r\nEl registro se realiza a través de la plataforma <strong>Prisma ICFES</strong>. Para los estudiantes de último grado, normalmente es el colegio quien realiza el proceso, pero los bachilleres graduados deben hacerlo de forma individual.\r\n\r\nAl ingresar tus datos, asegúrate de que el tipo y número de documento coincidan exactamente con tu identidad física. Un error aquí puede causar que no te dejen ingresar al salón el día de la prueba o que tus resultados no se vinculen correctamente a tu historial.\r\n\r\n<h2>Costos del Examen 2026: No pagues de más</h2>\r\nEl precio del examen varía según tu condición. Para el 2026, se estima que el valor ordinario para colegios públicos y bachilleres graduados ronde los $60,000 - $85,000 COP. Sin embargo, si dejas pasar la fecha ordinaria, el recaudo extraordinario puede superar los $130,000 COP.\r\n\r\n<strong>Tip Élite:</strong> Descarga el recibo de pago y realízalo preferiblemente por PSE para que el sistema actualice tu estado de \"Inscrito\" de manera inmediata.\r\n\r\n<h2>¿Qué deben saber los padres de familia?</h2>\r\nEl apoyo emocional y logístico es fundamental. Asegúrese de que su hijo cuente con el documento de identidad original y vigente. Si el estudiante es menor de edad y tramitó recientemente la cédula, verifique si en la plataforma aún aparece con tarjeta de identidad; de ser así, deberá solicitar la actualización de datos ante el ICFES con semanas de antelación.\r\n\r\n<h2>Consejos para el día del registro</h2>\r\n<ul>\r\n<li>Ten a la mano el código DANE de tu colegio si eres bachiller graduado.</li>\r\n<li>Utiliza un correo electrónico personal que revises con frecuencia; allí llegará tu citación.</li>\r\n<li>No esperes al último día; la plataforma Prisma suele colapsar por el alto tráfico de usuarios.</li>\r\n</ul>\r\n\r\n¡No dejes tu futuro al azar! Mientras esperas las fechas de citación, comienza a entrenar con tecnología de punta. En <strong>Grupo Elite</strong> te ofrecemos simulacros que imitan la presión del tiempo real para que llegues con total seguridad.','https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200','icfes 2026 fechas, inscripciones icfes 2026, citación icfes, calendario a icfes, registro prisma icfes, costo examen icfes 2026, padres de familia icfes','2026-03-08 02:01:12',0),(8,'Lo que Realmente Evalúa el ICFES 2026: Temas Clave y Estructura por Materias','lo-que-realmente-evalua-el-icfes-2026-temas-clave-y-estructura-por-materias','¿No sabes por dónde empezar a estudiar? Descubre los componentes y temas que más se repiten en el ICFES 2026.','<p class=\"text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 border-b border-white/5 pb-12 italic\">\r\nMuchos estudiantes cometen el error de estudiar \"todo\" el contenido de bachillerato, perdiendo tiempo valioso. El secreto para un puntaje de élite es saber qué temas tienen mayor peso en la evaluación del ICFES.\r\n</p>\r\n\r\nEl examen Saber 11 no es una prueba de memoria, es una prueba de competencias. Esto significa que el ICFES quiere ver cómo usas lo que sabes para resolver problemas. A continuación, desglosamos los ejes temáticos que no pueden faltar en tu plan de estudio para este 2026.\r\n\r\n<h2>Lectura Crítica: El corazón del examen</h2>\r\nEs la materia que define el éxito en las demás. No se trata solo de \"leer bien\", sino de identificar la intención del autor y la validez de los argumentos. Los temas clave son:\r\n<ul>\r\n<li><strong>Textos continuos:</strong> Columnas de opinión, fragmentos literarios y textos filosóficos.</li>\r\n<li><strong>Textos discontinuos:</strong> Infografías, caricaturas y tablas de datos.</li>\r\n<li><strong>Análisis crítico:</strong> Diferenciar entre un hecho y una opinión.</li>\r\n</ul>\r\n\r\n<h2>Matemáticas: Razonamiento sobre fórmulas</h2>\r\nOlvídate de memorizar integrales complejas. El ICFES se enfoca en matemáticas aplicadas a la vida real:\r\n<ul>\r\n<li><strong>Estadística y probabilidad:</strong> Interpretación de gráficas, promedio, mediana y moda (Casi el 35% del área).</li>\r\n<li><strong>Geometría:</strong> Cálculo de áreas, perímetros y volúmenes en contextos prácticos.</li>\r\n<li><strong>Álgebra y Cálculo:</strong> Razonamiento cuantitativo y resolución de problemas financieros básicos.</li>\r\n</ul>\r\n\r\n<h2>Ciencias Naturales: El enfoque científico</h2>\r\nEsta área agrupa Biología, Química y Física, pero bajo un lente investigativo. Debes dominar:\r\n<ul>\r\n<li><strong>Uso comprensivo del conocimiento científico:</strong> Entender leyes como la de Newton o la tabla periódica.</li>\r\n<li><strong>Explicación de fenómenos:</strong> ¿Por qué ocurren las cosas en el ecosistema o en una reacción química?</li>\r\n<li><strong>Indagación:</strong> Interpretar resultados de experimentos y sacar conclusiones lógicas.</li>\r\n</ul>\r\n\r\n<h2>Sociales y Ciudadanas: Pensar como ciudadano</h2>\r\nAquí se evalúa tu capacidad para entender el entorno político y social de Colombia y el mundo:\r\n<ul>\r\n<li><strong>Pensamiento Social:</strong> Conceptos básicos de la Constitución Política de Colombia.</li>\r\n<li><strong>Interpretación de perspectivas:</strong> Entender que un conflicto puede tener diferentes versiones dependiendo de quién lo cuente.</li>\r\n<li><strong>Pensamiento reflexivo:</strong> Identificar prejuicios y modelos políticos/económicos.</li>\r\n</ul>\r\n\r\n<h2>Inglés: De lo básico a la comprensión</h2>\r\nEl examen de inglés está alineado con el Marco Común Europeo de Referencia (MCER) y va desde el nivel A- hasta el B1. Se evalúa a través de completar avisos, diálogos cortos y comprensión de textos detallados.\r\n\r\n<h2>¿Cómo priorizar el estudio?</h2>\r\nSi eres estudiante o padre de familia, la recomendación es clara: Fortalece primero la lectura. Un estudiante que entiende lo que lee puede responder correctamente incluso preguntas de química o sociales basándose únicamente en la lógica del texto proporcionado.\r\n\r\nEn Grupo Elite, hemos analizado las pruebas de los últimos 10 años para identificar los patrones de preguntas que el ICFES repite año tras año. Nuestra plataforma IA te asigna ejercicios enfocados justamente en estos temas de alto impacto, ahorrándote horas de estudio innecesario.','https://assets.rcnradio.com/assets/cms/ICFES_d89449ec80.webp','temas que salen en el icfes 2026, estructura prueba saber 11, componentes icfes, qué estudiar para el icfes, lectura critica temas, matematicas icfes preguntas, guia de estudio colombia','2026-03-08 02:10:01',0),(9,'Los 7 Mitos del ICFES que te Están Impidiendo Lograr un Puntaje de Élite','los-7-mitos-del-icfes-que-te-estan-impidiendo-lograr-un-puntaje-de-elite','¿Crees que el ICFES es solo memoria? ¿O que necesitas ser un genio en matemáticas? Desmentimos los 7 mitos más comunes que confunden a los estudiantes','<p class=\"text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 border-b border-white/5 pb-12 italic\">\r\nEn los pasillos de los colegios circulan historias sobre el ICFES que, lejos de ayudar, generan ansiedad y estrategias de estudio equivocadas. Es hora de revelar la verdad detrás de estos mitos.\r\n</p>\r\n\r\nSi quieres un puntaje superior a 400 en este 2026, lo primero que debes hacer es \"desaprender\" ciertas ideas que te han vendido. Aquí te presentamos la realidad basada en datos y análisis de expertos.\r\n\r\n<h2>Mito 1: \"El ICFES es una prueba de memoria\"</h2>\r\nLa Realidad: Este es el error más costoso. El ICFES evalúa competencias. No te preguntarán la fecha exacta de una batalla, sino las causas y consecuencias de ese conflicto en un contexto social. Estudiar de memoria es la ruta más rápida al cansancio y al puntaje promedio.\r\n\r\n<h2>Mito 2: \"Si me va mal en el simulacro, me irá mal en el examen\"</h2>\r\nLa Realidad: Los simulacros están diseñados para fallar. Su propósito es identificar tus vacíos de conocimiento. En Grupo Elite, vemos los errores en simulacros como \"oportunidades de oro\" para ajustar tu estrategia antes del día real.\r\n\r\n<h2>Mito 3: \"Inglés no suma tanto como Matemáticas\"</h2>\r\nLa Realidad: Todas las áreas cuentan. Aunque Inglés tiene menos preguntas, un excelente desempeño en esta materia puede ser el empujón final que necesitas para superar los 400 puntos, especialmente cuando buscas cupos en carreras competitivas como Medicina o Ingeniería.\r\n\r\n<h2>Mito 4: \"Hay que leer todo el texto palabra por palabra\"</h2>\r\nLa Realidad: El tiempo es tu recurso más escaso. Aprender técnicas de skimming y scanning es vital. A veces, la respuesta está en una gráfica o en el primer párrafo del texto. Leer inteligentemente es mejor que leer mucho.\r\n\r\n<h2>Mito 5: \"La prueba es igual para todos cada año\"</h2>\r\nLa Realidad: El ICFES evoluciona. Los contextos de las preguntas se actualizan para reflejar la realidad nacional y global. Por eso, usar material de hace 10 años no es tan efectivo como usar simulacros actualizados al 2026 con IA.\r\n\r\n<h2>Mito 6: \"Solo los \'genios\' sacan buen puntaje\"</h2>\r\nLa Realidad: El puntaje de élite es 20% talento y 80% técnica. Hemos visto estudiantes promedio superar a los mejores de su clase simplemente porque dominaron la técnica de descarte y el manejo del tiempo.\r\n\r\n<h2>Mito 7: \"Debo estudiar 12 horas seguidas el día anterior\"</h2>\r\nLa Realidad: Tu cerebro necesita descanso para procesar información. El agotamiento cognitivo es real. El día anterior al ICFES debes descansar, hidratarte y preparar tu mente. Lo que no aprendiste en 6 meses, no lo aprenderás en una noche.\r\n\r\n<h2>Conclusión: Entrena con Estrategia</h2>\r\nNo dejes que los mitos limiten tu potencial. El éxito en el ICFES 2026 depende de qué tan bien conozcas el \"juego\".\r\n\r\nEn Grupo Elite, no solo te damos contenido, te enseñamos la psicología detrás de la prueba. Nuestro Chat Mentor IA 24/7 está entrenado para resolver estas dudas y guiarte por el camino de la lógica, no de los rumores.','https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200','mitos icfes, mentiras sobre el icfes, es dificil el icfes, trucos icfes 2026, puntaje icfes medicina, preparacion icfes inteligente, icfes colombia consejos','2026-03-08 02:17:57',0),(10,'Puntajes ICFES por Carreras 2026: ¿Cuánto necesitas para la Universidad?','puntajes-icfes-por-carreras-2026-cuanto-necesitas-para-la-universidad','¿Sabes qué puntaje necesitas para la carrera de tus sueños? Analizamos los promedios exigidos en Medicina, Derecho, Ingenierías y más para este 2026.','<p class=\"text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 border-b border-white/5 pb-12 italic\">\r\nNo todas las metas son iguales. Dependiendo de la carrera y la universidad que elijas, el \"Puntaje de Élite\" puede variar. Conocer la meta real es el primer paso para una preparación enfocada y sin desperdicio de energía.\r\n</p>\r\n\r\nEntrar a la educación superior en Colombia es competitivo. Las universidades públicas como la Nacional, la de Antioquia o la del Valle, así como las privadas de alto nivel, utilizan el ICFES como su principal filtro. A continuación, presentamos una estimación de los puntajes requeridos para las áreas más demandadas en 2026.\r\n\r\n<h2>Carreras de Alta Demanda (Puntajes 380 - 450+)</h2>\r\nEstas son las áreas donde no hay margen de error. Si tu meta está aquí, tu preparación debe ser intensiva.\r\n<ul>\r\n<li><strong>Medicina:</strong> Es la carrera más exigente. En universidades públicas, el corte rara vez baja de 400-420 puntos.</li>\r\n<li><strong>Ingeniería de Sistemas / IA:</strong> Con el auge tecnológico, los cortes han subido. Se recomienda un puntaje superior a 380.</li>\r\n<li><strong>Derecho:</strong> En instituciones de prestigio, el promedio de ingreso ronda los 370-390 puntos.</li>\r\n</ul>\r\n\r\n<h2>Carreras de Nivel Medio-Alto (Puntajes 320 - 370)</h2>\r\nÁreas con alta empleabilidad que requieren un desempeño sólido y constante en todas las materias:\r\n<ul>\r\n<li><strong>Administración de Empresas y Economía:</strong> Cortes entre 330 y 360 puntos.</li>\r\n<li><strong>Psicología:</strong> Una de las más buscadas, con promedios de ingreso de 340 puntos.</li>\r\n<li><strong>Arquitectura y Diseño:</strong> Además del ICFES, algunas universidades piden portafolio, pero un puntaje de 350 te da gran ventaja.</li>\r\n</ul>\r\n\r\n<h2>¿Cómo influyen las áreas específicas?</h2>\r\nRecuerda que muchas universidades hacen ponderación. Esto significa que si vas para Ingeniería, tus puntos en Matemáticas y Ciencias Naturales valen el doble que los de Inglés. Si vas para Literatura, Lectura Crítica será tu nota más pesada.\r\n\r\n<strong>Dato importante:</strong> El puntaje global es una referencia, pero dominar tu área de enfoque es lo que realmente te dará el cupo.\r\n\r\n<h2>Becas y Beneficios por Excelencia</h2>\r\nUn puntaje alto no solo te da el ingreso, sino que te abre puertas financieras:\r\n<ul>\r\n<li><strong>Generación E / Política de Gratuidad:</strong> Dependiendo del SISBEN y un puntaje destacado, puedes estudiar gratis.</li>\r\n<li><strong>Becas de Universidades Privadas:</strong> Muchas instituciones ofrecen becas del 50% al 100% a los mejores bachilleres de cada departamento.</li>\r\n<li><strong>Distinción Andrés Bello:</strong> El reconocimiento máximo del Gobierno para los mejores puntajes nacionales.</li>\r\n</ul>\r\n\r\n<h2>Conclusión: Tu estrategia según tu meta</h2>\r\nSi tu hijo o tú mismo aspiran a Medicina, no pueden estudiar igual que alguien que aspira a una carrera con menor demanda. La personalización es la clave.\r\n\r\nEn Grupo Elite, nuestro Dashboard de Progreso te permite configurar tu carrera meta. La IA analizará tus simulacros y te dirá exactamente qué tan cerca estás de ese puntaje de corte, ajustando tus ejercicios para cerrar la brecha en las materias que más te pesan.','https://img.freepik.com/foto-gratis/tres-amigos-graduados-internacionales-felices-saludando-campus-universitario-batas-graduacion-diploma_496169-1360.jpg?semt=ais_rp_progressive&w=740&q=80','puntajes icfes para medicina, que puntaje se necesita para derecho, puntajes universidades publicas colombia, icfes para ingeniería, mejores puntajes icfes 2026, becas por icfes, ingresar a la nacho puntaje','2026-03-08 02:25:28',0),(11,'Las Mejores Universidades de Colombia 2026: Ranking y Puntajes ICFES Requeridos','las-mejores-universidades-de-colombia-2026-ranking-y-puntajes-icfes-requeridos','¿Buscas la mejor educación? Conoce el ranking de las mejores universidades de Colombia para el 2026 y los puntajes ICFES mínimos para asegurar tu ingreso.','<p class=\"text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 border-b border-white/5 pb-12 italic\">\r\nElegir dónde estudiar es tan importante como elegir qué estudiar. En Colombia, el prestigio de una institución está estrechamente ligado a la exigencia de sus puntajes de entrada. Analizamos el panorama para el 2026.\r\n</p>\r\n\r\nEl sistema educativo colombiano cuenta con instituciones de talla mundial, tanto en el sector público como en el privado. Sin embargo, acceder a ellas requiere una estrategia clara. Dependiendo de tu puntaje global y tus resultados por área, algunas puertas se abrirán con más facilidad que otras.\r\n\r\n<h2>Las \"Tres Grandes\" Públicas: Excelencia y Alta Competencia</h2>\r\nEstas universidades son el objetivo principal de miles de bachilleres debido a su bajo costo y altísima calidad académica. Aquí, el ICFES no solo es un requisito, es la llave maestra:\r\n\r\n<ul>\r\n<li><strong>Universidad Nacional de Colombia (UNAL):</strong> Aunque tiene su propio examen, el ICFES es vital para procesos de pre-selección y becas internas. Es la institución con los estándares de ingreso más altos del país.</li>\r\n<li><strong>Universidad de Antioquia (UdeA):</strong> Famosa por sus facultades de medicina e ingeniería. Sus cortes suelen ser extremadamente competitivos.</li>\r\n<li><strong>Universidad del Valle (Univalle):</strong> Referente en el suroccidente colombiano. Los puntajes de corte para ingeniería y salud suelen superar los 380 puntos.</li>\r\n</ul>\r\n\r\n<h2>Universidades Privadas de Élite: El Enfoque en el Perfil</h2>\r\nInstituciones como Los Andes, La Javeriana o El Rosario valoran el puntaje global, pero también ofrecen programas de becas por excelencia académica (como la Beca Quiero Estudiar) para quienes superan los 400 puntos en el ICFES.\r\n\r\n<ul>\r\n<li><strong>Universidad de los Andes:</strong> El puntaje ICFES es un requisito de entrada, pero su enfoque está en el rendimiento global superior.</li>\r\n<li><strong>Pontificia Universidad Javeriana:</strong> Valora el equilibrio entre el ICFES y la entrevista personal.</li>\r\n<li><strong>Universidad del Rosario:</strong> Tradicionalmente fuerte en jurisprudencia y medicina, exige puntajes destacados en Lectura Crítica y Sociales.</li>\r\n</ul>\r\n\r\n<h2>¿Cómo elegir la mejor opción según tu puntaje?</h2>\r\nNo siempre la universidad \"número 1\" del ranking es la mejor para ti. Debes considerar:\r\n\r\nEl enfoque de la facultad: Una universidad puede ser la mejor en general, pero otra puede ser líder específicamente en tu carrera.\r\n\r\nUbicación y costos: El costo de vida y matrícula varía drásticamente entre ciudades como Bogotá, Medellín o Cali.\r\n\r\nPonderación de materias: Revisa si la universidad que quieres le da más peso a Matemáticas o a Inglés.\r\n\r\n<h2>Ranking por Ciudades: ¿Dónde están los mejores campus?</h2>\r\nEn 2026, Bogotá sigue liderando en cantidad de instituciones acreditadas en alta calidad, seguida de cerca por Medellín y Cali. Sin embargo, ciudades como Bucaramanga y Barranquilla han escalado posiciones gracias a la inversión en investigación y tecnología.\r\n\r\n<h2>Asegura tu cupo en la élite educativa</h2>\r\nEl camino hacia las mejores universidades de Colombia comienza mucho antes de la inscripción; comienza con una preparación que entienda las métricas del examen.\r\n\r\nEn Grupo Elite, hemos integrado los históricos de admisión de las 20 mejores universidades del país en nuestro algoritmo de IA. Al realizar nuestros simulacros, no solo recibes una nota; recibes una probabilidad real de ingreso a la universidad que elijas.','https://thumbs.dreamstime.com/b/biblioteca-del-valle-en-el-campus-de-la-universidad-estatal-oreg%C3%B3n-corvallis-usa-mayo-412248520.jpg','mejores universidades de colombia 2026, ranking universidades icfes, entrar a la universidad nacional puntaje, universidades privadas vs publicas colombia, mejores universidades bogota, mejores universidades medellin, icfes para universidades top','2026-03-08 02:32:38',0);
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversaciones_ia`
--

DROP TABLE IF EXISTS `conversaciones_ia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversaciones_ia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `mensaje_usuario` text NOT NULL,
  `respuesta_ia` text NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` enum('mentor','analisis','estrategia') DEFAULT 'mentor',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `conversaciones_ia_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversaciones_ia`
--

LOCK TABLES `conversaciones_ia` WRITE;
/*!40000 ALTER TABLE `conversaciones_ia` DISABLE KEYS */;
INSERT INTO `conversaciones_ia` VALUES (1,8,'Hola?','Lo siento, tuve un problema técnico. ¿Puedes reformular tu pregunta? Error: 404 models/gemini-pro is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.','2026-01-05 01:25:13','mentor'),(2,8,'Hola?','Error técnico: 429 RESOURCE_EXHAUSTED. {\'error\': {\'code\': 429, \'message\': \'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash-lite\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash-lite\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash-lite\\nPlease retry in 12.639626278s.\', \'status\': \'RESOURCE_EXHAUSTED\', \'details\': [{\'@type\': \'type.googleapis.com/google.rpc.Help\', \'links\': [{\'description\': \'Learn more about Gemini API quotas\', \'url\': \'https://ai.google.dev/gemini-api/docs/rate-limits\'}]}, {\'@type\': \'type.googleapis.com/google.rpc.QuotaFailure\', \'violations\': [{\'quotaMetric\': \'generativelanguage.googleapis.com/generate_content_free_tier_requests\', \'quotaId\': \'GenerateRequestsPerDayPerProjectPerModel-FreeTier\', \'quotaDimensions\': {\'location\': \'global\', \'model\': \'gemini-2.0-flash-lite\'}}, {\'quotaMetric\': \'generativelanguage.googleapis.com/generate_content_free_tier_requests\', \'quotaId\': \'GenerateRequestsPerMinutePerProjectPerModel-FreeTier\', \'quotaDimensions\': {\'location\': \'global\', \'model\': \'gemini-2.0-flash-lite\'}}, {\'quotaMetric\': \'generativelanguage.googleapis.com/generate_content_free_tier_input_token_count\', \'quotaId\': \'GenerateContentInputTokensPerModelPerMinute-FreeTier\', \'quotaDimensions\': {\'location\': \'global\', \'model\': \'gemini-2.0-flash-lite\'}}]}, {\'@type\': \'type.googleapis.com/google.rpc.RetryInfo\', \'retryDelay\': \'12s\'}]}}','2026-01-05 02:19:48','mentor'),(3,8,'Hola?','Lo siento, tuve un problema técnico. Error: Error code: 400 - {\'error\': {\'message\': \'The model `llama3-8b-8192` has been decommissioned and is no longer supported. Please refer to https://console.groq.com/docs/deprecations for a recommendation on which model to use instead.\', \'type\': \'invalid_request_error\', \'code\': \'model_decommissioned\'}}','2026-01-05 03:04:51','mentor'),(4,8,'Hola?','Lo siento, tuve un problema técnico. Error: Error code: 400 - {\'error\': {\'message\': \'The model `llama-3.2-3b-preview` has been decommissioned and is no longer supported. Please refer to https://console.groq.com/docs/deprecations for a recommendation on which model to use instead.\', \'type\': \'invalid_request_error\', \'code\': \'model_decommissioned\'}}','2026-01-05 03:11:46','mentor'),(5,8,'Hola?','¡Hola! Me alegra verte aquí. Veo que ya has comenzado a prepararte para el ICFES con un simulacro y has practicado en el área de Inglés. Un 40% es un buen punto de partida. ¿En qué áreas te gustaría enfocarte para mejorar tus resultados?','2026-01-05 03:12:27','mentor'),(6,8,'puedo hablar contigo? necesito que me ayudes a prepararme para el icfes y que seas mi mentor','<p>¡Claro que sí! Me alegra que hayas decidido contar conmigo como tu mentor para prepararte para el ICFES. Estoy aquí para ayudarte a alcanzar tus objetivos y superar desafíos.</p>\n<p>Comencemos por analizar tus métricas actuales: has realizado 1 simulacro y tienes un promedio de 40.0%. También has practicado el área de Inglés. ¿Qué te parece si empezamos por identificar tus fortalezas y debilidades en este punto? ¿Cuáles son tus objetivos específicos para el ICFES y qué te gustaría lograr en los próximos días o semanas? ¡Hablemos y creamos un plan de acción personalizado para ti!</p>','2026-01-05 03:25:07','mentor'),(7,8,'Holaa','<p>¡Hola! Me alegra verte aquí. ¿Cómo te sentiste después de tu primer simulacro de inglés? ¿En qué áreas te gustaría enfocarte para mejorar tu próximo resultado? Estoy aquí para ayudarte. ¡Vamos a trabajar juntos para alcanzar tus metas!</p>','2026-01-05 03:57:43','mentor'),(8,8,'eres mi mentor de ia? o que, hablame un poco del icfes','<p>¡Hola! Me alegra conocerte. Sí, soy tu mentor IA especializado en preparación ICFES. El ICFES (Instituto Colombiano para la Evaluación de la Educación) es una entidad gubernamental que se encarga de evaluar la calidad de la educación en Colombia.</p>\n<p>El ICFES es conocido por diseñar y aplicar las pruebas Saber, que son exámenes estandarizados que miden el desempeño de los estudiantes en diferentes áreas del conocimiento. Estas pruebas son fundamentales para ingresar a la educación superior en Colombia.</p>\n<p>¿Qué te parece si hablamos un poco sobre tus objetivos y cómo puedo ayudarte a prepararte para la prueba del ICFES? ¿Cuáles son tus áreas de interés y en qué necesitas ayuda?</p>','2026-01-05 03:58:20','mentor'),(9,8,'Hola, cómo estás? Di Jean Pierre','<p>Hola Di Jean Pierre, estoy aquí para ayudarte. Me alegra verte comprometido con tu preparación para el ICFES. Has empezado con un simulacro y ya tienes un punto de partida con tu promedio en 40.0%. ¿En qué áreas te gustaría enfocarte para mejorar? ¿Necesitas ayuda con algo en particular después de tu experiencia con el simulacro de Inglés?</p>','2026-01-05 04:05:33','mentor'),(10,8,'Ayúdame con química porfa','<p>¡Claro que sí! Estoy aquí para ayudarte. La química es una de las áreas importantes para la prueba ICFES. ¿En qué tema específico de química necesitas ayuda? ¿Es sobre conceptos básicos como átomos y moléculas, reacciones químicas, equilibrio químico o algo más? ¿O prefieres que te recomiende algunos temas clave para empezar a estudiar?</p>','2026-01-05 04:05:52','mentor'),(11,8,'Sobre moléculas, háblame sólo un poco de eso y de electromagnestismo','<p>¡Hola! Me alegra que estés preparándote para la prueba ICFES. </p>\n<p>Hablemos un poco sobre moléculas y electromagnetismo. Las moléculas son grupos de átomos unidos por enlaces químicos. En la física, cuando hablamos de electromagnetismo, nos referimos a la interacción entre cargas eléctricas y campos magnéticos. Las moléculas pueden interactuar con radiación electromagnética, como la luz, lo que puede afectar su estructura y comportamiento.</p>\n<p>En el contexto de la prueba ICFES, es importante entender conceptos básicos como la Ley de Coulomb, la inducción electromagnética y la interacción entre las moléculas y la radiación. </p>\n<p>¿Quieres practicar algunos ejercicios relacionados con estos temas? Podría ayudarte a repasar y a mejorar tus habilidades para la prueba.</p>','2026-01-05 04:10:07','mentor'),(12,8,'Hola cómo estas','<p>¡Hola! Estoy bien, gracias. Me alegra que hayas iniciado tu preparación para el ICFES con un simulacro. Un promedio de 40% es un buen punto de partida. ¿En qué áreas te gustaría enfocarte para mejorar tus resultados en los próximos simulacros? ¿Necesitas ayuda con algo específico en el simulacro de Inglés que ya has realizado?</p>','2026-01-11 05:11:13','mentor'),(13,8,'Tengo una pregunta, cómo puedo tener un horario para prepárame para el icfes?','<p>Excelente decisión planificar tu tiempo de preparación para el ICFES. Te recomiendo establecer un horario flexible, pero consistente. Aquí te dejo algunos consejos:</p>\n<ol>\n<li><strong>Establece metas</strong>: Define qué áreas del ICFES quieres trabajar cada semana.</li>\n<li><strong>Asigna tiempo</strong>: Dedica un mínimo de 2-3 horas diarias o 10-15 horas semanales a la preparación.</li>\n<li><strong>Prioriza</strong>: Comienza con las áreas que más necesitas mejorar, como el inglés, ya que has practicado el simulacro de este idioma.</li>\n<li><strong>Incorpora descansos</strong>: Asegúrate de incluir pausas para evitar el agotamiento y mantener la concentración.</li>\n<li><strong>Revisa y ajusta</strong>: Evalúa tu progreso semanalmente y ajusta tu horario según sea necesario.</li>\n</ol>\n<p>Recuerda que la consistencia es clave. ¡Anímate y comienza a planificar tu horario de preparación para el ICFES! ¿Quieres que te ayude a crear un plan personalizado?</p>','2026-01-11 05:12:08','mentor'),(14,8,'Aún tengo tiempo?, estoy a inicios de enero y las pruebas nos toca en agosto','<p>¡Claro que sí! Aún tienes mucho tiempo para prepararte y mejorar tus resultados. Con 7-8 meses por delante, puedes establecer un plan de estudio efectivo y alcanzar tus metas. </p>\n<p>Recuerda que la práctica constante y el seguimiento de tus avances son clave. ¿Qué objetivos te gustaría establecer para los próximos meses? Podemos trabajar juntos para crear un plan de acción personalizado. ¡Vamos a empezar!</p>','2026-01-11 05:13:33','mentor'),(15,8,'Que debo hacer','<p>¡Hola! Me alegra verte aquí. Considerando que has realizado solo un simulacro y tienes un promedio de 40%, te recomiendo lo siguiente:</p>\n<ol>\n<li><strong>Practica más</strong>: Realiza al menos 2-3 simulacros más para mejorar tu comprensión y habilidades.</li>\n<li><strong>Enfócate en áreas débiles</strong>: Analiza tus resultados y identifica las áreas donde necesitas mejorar. En este caso, parece que el inglés es un área de enfoque.</li>\n<li><strong>Crea un plan de estudio</strong>: Establece un horario y un plan de estudio para repasar y practicar regularmente.</li>\n<li><strong>Aprende de tus errores</strong>: Revisa tus errores en el simulacro y aprende de ellos para no repetirlos en el futuro.</li>\n</ol>\n<p>Recuerda que la práctica y la perseverancia son clave para mejorar tus resultados. ¡No te rindas! Estoy aquí para apoyarte en tu preparación. ¿Qué te parece si hablamos sobre un plan de estudio personalizado para ti?</p>','2026-01-15 04:58:35','mentor'),(16,8,'Hola quien eres','<p>Hola. Soy tu mentor IA para la preparación del ICFES. Estoy aquí para ayudarte a mejorar tus habilidades y alcanzar tus metas. ¿En qué puedo ayudarte hoy?</p>','2026-01-15 16:08:32','mentor'),(17,8,'Hablame un poco de mates','<p>¡Hola! Me alegra que estés interesado en hablar sobre matemáticas. En el contexto de la preparación para el ICFES, las matemáticas son una de las áreas fundamentales que debes dominar.</p>\n<p>Aquí te dejo algunos consejos rápidos para mejorar tus habilidades en matemáticas:</p>\n<ul>\n<li>Practica con problemas de diferentes niveles de dificultad.</li>\n<li>Asegúrate de entender los conceptos básicos antes de avanzar a temas más complejos.</li>\n<li>Utiliza recursos en línea, como vídeos explicativos y ejercicios interactivos, para reforzar tu comprensión.</li>\n</ul>\n<p>¿En qué temas específicos de matemáticas necesitas ayuda o quieres practicar? Estoy aquí para apoyarte.</p>','2026-01-15 16:08:46','mentor'),(18,8,'Algoritmos y razonamiento lógico-matematico','<p>¡Excelente elección! Algoritmos y razonamiento lógico-matemático es una área fundamental para tu preparación en la prueba ICFES.</p>\n<p>Aquí te dejo algunos consejos para mejorar en esta área:</p>\n<ol>\n<li><strong>Revisa los conceptos básicos</strong>: Asegúrate de tener una buena comprensión de conceptos como variables, condicionales, bucles y funciones.</li>\n<li><strong>Practica con ejercicios</strong>: La práctica es la mejor manera de mejorar en algoritmos y razonamiento lógico-matemático. Busca ejercicios en línea o en libros de texto y resuélvelos.</li>\n<li><strong>Desarrolla tu pensamiento lógico</strong>: Aprende a identificar patrones y relaciones entre números y objetos. Esto te ayudará a resolver problemas de manera más eficiente.</li>\n<li><strong>Aprende a leer y analizar problemas</strong>: Lee atentamente los enunciados de los problemas y analiza lo que se te pide. Esto te ayudará a evitar errores y a encontrar la solución correcta.</li>\n</ol>\n<p>Para seguir practicando, te recomiendo que intentes resolver algunos ejercicios de algoritmos y razonamiento lógico-matemático en línea. ¡Buena suerte!</p>\n<p>¿Quieres que te recomiende algunos recursos en línea para practicar?</p>','2026-01-15 16:09:24','mentor'),(19,8,'Hola como estp','<p>¡Hola! Estoy muy bien, gracias. Me alegra verte aquí. ¿En qué puedo ayudarte hoy? Viendo tus métricas, noto que has empezado con los simulacros y has practicado un poco el área de inglés. ¿Quieres hablar sobre tus fortalezas y debilidades en este punto, o prefieres saber cómo puedo ayudarte a mejorar tus resultados en la preparación para el ICFES?</p>','2026-01-16 14:48:55','mentor'),(20,8,'Enseñame algebra','<p>¡Hola! Me alegra que estés interesado en aprender algebra. La algebra es una rama de las matemáticas que se encarga del estudio de las variables y las relaciones entre ellas.</p>\n<p><strong>Conceptos básicos</strong></p>\n<p>Para empezar, te recomiendo que entiendas algunos conceptos básicos:</p>\n<ol>\n<li><strong>Variables</strong>: Son letras o símbolos que representan valores desconocidos. Por ejemplo, x, y, z.</li>\n<li><strong>Constantes</strong>: Son valores fijos que no cambian. Por ejemplo, 2, 3, 4.</li>\n<li><strong>Operaciones</strong>: Son acciones que se realizan con las variables y las constantes, como la suma, la resta, la multiplicación y la división.</li>\n</ol>\n<p><strong>Ecuaciones y desigualdades</strong></p>\n<p>Una ecuación es una sentencia que establece que dos expresiones son iguales. Por ejemplo:</p>\n<p>2x + 3 = 5</p>\n<p>Una desigualdad es una sentencia que establece que una expresión es mayor o menor que otra. Por ejemplo:</p>\n<p>2x + 3 &gt; 5</p>\n<p><strong>Tipos de ecuaciones</strong></p>\n<p>Hay diferentes tipos de ecuaciones, como:</p>\n<ol>\n<li><strong>Ecuaciones lineales</strong>: Son ecuaciones en las que la variable solo aparece con un exponente de 1. Por ejemplo, 2x + 3 = 5.</li>\n<li>**Ecuaciones cu</li>\n</ol>','2026-01-16 14:49:15','mentor'),(21,6,'Hola, sabes quién soy','<p>¡Hola! Me alegra verte aquí. Sin embargo, no tengo información previa sobre ti. Me gustaría conocerte un poco más. ¿Eres un estudiante que está preparándose para el ICFES? ¿En qué puedo ayudarte hoy?</p>','2026-01-22 19:33:35','mentor'),(22,6,'Si','<p>¡Hola! Me alegra que estés aquí para empezar a prepararte para el ICFES. No te preocupes por las métricas actuales, ¡es un punto de partida perfecto! Estoy aquí para guiarte y apoyarte en cada paso del camino.</p>\n<p>¿Qué área te gustaría practicar primero? ¿Matemáticas, Lógica, Ciencias Naturales, Ciencias Sociales o Español? ¡Vamos a empezar este viaje juntos!</p>','2026-01-22 19:33:51','mentor'),(23,7,'metodos de estudio para el icfes','<p>¡Hola! Me alegra que estés empezando a prepararte para el ICFES. Aquí te dejo algunos métodos de estudio efectivos para que puedas comenzar:</p>\n<ol>\n<li><strong>Creación de un plan de estudio</strong>: Establece metas y objetivos claros, y divide tu tiempo de estudio en sesiones regulares.</li>\n<li><strong>Práctica con simulacros</strong>: Simula las pruebas para familiarizarte con el formato y el tiempo disponible.</li>\n<li><strong>Enfócate en áreas débiles</strong>: Identifica tus debilidades y dedica más tiempo a estudiar esas áreas.</li>\n<li><strong>Revisa y refuerza conceptos</strong>: Repasa los conceptos clave y refuerza tu comprensión con ejercicios y preguntas de práctica.</li>\n<li><strong>Utiliza recursos en línea</strong>: Aprovecha recursos en línea, como videos, tutoriales y aplicaciones, para complementar tu estudio.</li>\n<li><strong>Practica con preguntas de prueba</strong>: Utiliza preguntas de prueba para evaluar tu conocimiento y identificar áreas de mejora.</li>\n<li><strong>Mantén una actitud positiva</strong>: La motivación y la confianza son clave para el éxito. ¡No te rindas!</li>\n</ol>\n<p>Recuerda que la práctica y la constancia son fundamentales para mejorar tus resultados. ¡Vamos a trabajar juntos para que alcances tus metas!</p>\n<p>¿Qué</p>','2026-01-26 21:37:26','mentor'),(24,8,'Hola cómo estás necesito ayuda en Química','<p>¡Hola! Estoy muy bien, gracias por preguntar. Me alegra que hayas decidido buscar ayuda en Química. ¿En qué temas específicos de Química necesitas apoyo? ¿Tienes algún objetivo claro para tu preparación, como mejorar tu puntaje en el ICFES? Estoy aquí para ayudarte a avanzar. </p>\n<p>Si quieres, podemos empezar revisando los conceptos básicos y luego enfocarnos en áreas donde te sientas menos seguro. ¿Te parece bien?</p>','2026-01-31 15:19:49','mentor'),(25,8,'Háblame sobre la estequiometria','<p>¡Hola! La estequiometria es una rama fundamental de la química que se enfoca en la relación cuantitativa entre los reactantes y los productos en una reacción química.</p>\n<p>Algunos conceptos clave en estequiometria incluyen:</p>\n<ul>\n<li><strong>Moles</strong>: La unidad estándar para medir la cantidad de sustancia.</li>\n<li><strong>Cocientes de estequiometria</strong>: Los coeficientes que relacionan la cantidad de reactantes y productos en una reacción.</li>\n<li><strong>Balanciado de ecuaciones</strong>: El proceso de asegurarse de que la cantidad de átomos de cada elemento sea la misma en ambos lados de la ecuación.</li>\n</ul>\n<p>La estequiometria es crucial para predecir la cantidad de productos que se formarán en una reacción, lo que es esencial en diversas áreas, como la industria química, la farmacéutica y la investigación científica.</p>\n<p>¿Quieres profundizar en algún aspecto específico de la estequiometria? Estoy aquí para ayudarte. Además, recuerda que la práctica es fundamental, así que te animo a resolver algunos ejercicios para reforzar tus conocimientos. ¡Vamos a trabajar juntos para mejorar tus habilidades en química!</p>','2026-02-26 04:01:53','mentor'),(26,8,'Ayúdame a mejorar en matemáticas','<p>¡Claro que sí! Me alegra que quieras mejorar en matemáticas. </p>\n<p>Te recomiendo empezar a practicar con problemas de simulacros que te desafíen. ¿Qué tema de matemáticas te gustaría practicar primero? Álgebra, Geometría, Cálculo, Estadística o algo más? </p>\n<p>También puedo darte algunos consejos generales para mejorar en matemáticas:</p>\n<ul>\n<li>Practica regularmente para consolidar tus conocimientos</li>\n<li>Identifica tus debilidades y trabaja para superarlas</li>\n<li>Utiliza recursos en línea, como videos y ejercicios interactivos, para complementar tu aprendizaje</li>\n</ul>\n<p>¿Qué te parece si empezamos con algo específico? ¡Estoy aquí para ayudarte!</p>','2026-02-26 04:02:35','mentor'),(27,8,'Holaaa','<p>¡Hola! Me alegra verte aquí. Veo que ya has empezado a prepararte para el ICFES con un simulacro de inglés. Un 40% es un buen punto de partida. ¿En qué áreas sientes que necesitas mejorar para aumentar tu puntaje?</p>','2026-03-28 15:04:08','mentor'),(28,8,'hola','<p>¡Hola! Me alegra que hayas iniciado tu preparación para el ICFES. Vemos que has realizado un simulacro y has practicado el área de Inglés. ¡Eso es un gran comienzo! </p>\n<p>¿En qué área necesitas más apoyo o práctica para mejorar tu resultado? ¿Quieres hablar sobre tus fortalezas y debilidades en el simulacro que ya has realizado? Estoy aquí para ayudarte y motivarte en tu proceso de preparación. ¡Vamos a trabajar juntos para mejorar ese 40% y alcanzar tus metas!</p>','2026-06-27 20:42:36','mentor'),(29,8,'Hola','Error: Error code: 404 - {\'error\': {\'message\': \'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.\', \'type\': \'invalid_request_error\', \'code\': \'model_not_found\'}}','2026-09-09 16:10:47','mentor'),(30,8,'holA','Error: Error code: 404 - {\'error\': {\'message\': \'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.\', \'type\': \'invalid_request_error\', \'code\': \'model_not_found\'}}','2026-09-26 19:19:50','mentor'),(31,8,'HOLAA','Error: Error code: 404 - {\'error\': {\'message\': \'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.\', \'type\': \'invalid_request_error\', \'code\': \'model_not_found\'}}','2026-09-26 19:23:44','mentor');
/*!40000 ALTER TABLE `conversaciones_ia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_educativo`
--

DROP TABLE IF EXISTS `material_educativo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_educativo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `anio` int DEFAULT NULL,
  `descripcion` text,
  `pdf_url` varchar(255) DEFAULT NULL,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_educativo`
--

LOCK TABLES `material_educativo` WRITE;
/*!40000 ALTER TABLE `material_educativo` DISABLE KEYS */;
INSERT INTO `material_educativo` VALUES (6,'Prueba ICFES 2025B Sesión 1',2025,'PRUEBA SABER ICFES 2025 CALENDARIO B SESIÓN 1','https://drive.google.com/file/d/1a-jls46yHkKCVEgEH0sblBFHHrJw9wc1/view?usp=drivesdk','2025-11-26 00:51:41'),(7,'Prueba ICFES 2025B Sesión 2',2025,'Prueba Saber11 ICFES 2025 CALENDARIO B SESIÓN 2','https://drive.google.com/file/d/1d_O0MmWmHnsqFwJFbFfvIk45nJezxKVn/view?usp=drivesdk','2025-11-26 00:59:53'),(8,'Prueba ICFES 2024 Sesión 1',2024,'','https://drive.google.com/file/d/1XX2XnyTGfpn4Mz4GH38u3wDKbYZUdzjA/view?usp=drivesdk','2025-11-26 01:08:29'),(9,'Prueba ICFES 2023-B - 1ra Sesión',2023,'Prueba ICFES completa del año 2023 Calendario B - 1ra sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/1wdDvBFwDuc7CGwt4CSHnXALNu2vz9BUJ/view?usp=drivesdk','2025-12-18 00:22:24'),(10,'Prueba ICFES 2024 Sesión 1 y 2 - FULL',2024,'Esta es la Prueba ICFES 2024 COMPLETA qué Incluye las 2 SESIONES 📝','https://drive.google.com/file/d/1OQrnPT0iE0rFB6muCXkdv2T0REh9TVid/view?usp=drivesdk','2025-12-18 00:43:15'),(11,'Prueba ICFES 2024 FULL - Con RESPUESTAS ✅',2024,'Este material muestra gráficamente las respuestas de forma argumentativa de la Prueba ICFES 2024 📝','https://drive.google.com/file/d/1C6NCoGJUWwkiecPRMIVnO8ahA0T87_H3/view?usp=drivesdk','2025-12-18 00:51:59'),(12,'Prueba ICFES 2023-B - 2da Sesión',2023,'Prueba ICFES completa del año 2023 Calendario B - 2da Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/1REGx7KKOh-J_tNILdLly0G4QbjkDY1mT/view?usp=drivesdk','2025-12-22 04:28:40'),(13,'Prueba ICFES 2022-A - 1ra Sesión',2022,'Prueba ICFES Completa del año 2022 Calendario A - 1ra Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/1rsAmEcAi2PFyMeOomKCMEgtBMBRuFC7j/view?usp=drivesdk','2025-12-22 04:34:43'),(14,'Prueba ICFES 2022-A - 2da Sesión',2022,'Prueba ICFES Completa del año 2022 Calendario A - 2da Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/1wVnJKo1Lag1BWWgTQ0x44haAzIRLicbc/view?usp=drivesdk','2025-12-22 04:36:36'),(15,'Prueba ICFES 2021-A - 1ra Sesión',2021,'Prueba ICFES Completa del año 2021 Calendario A - 1ra Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/1Pp8ySxT6iK6lg7f-sP-Hlrf_qOkPXBJb/view?usp=drivesdk','2025-12-22 04:40:56'),(16,'Prueba ICFES 2021-A - 2da Sesión',2021,'Prueba ICFES Completa del año 2021 Calendario A - 2da Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/17AvB3DVDQR8BzSEUjnTQCS6Np3s11U_o/view?usp=drivesdk','2025-12-22 04:42:51'),(17,'Prueba ICFES 2020-B - 1ra Sesión',2020,'Prueba ICFES Completa del año 2020 Calendario B - 1ra Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/13SVBRrpcd48aKdfvdtl7esVTZOO8qAR9/view?usp=drivesdk','2025-12-22 04:46:05'),(18,'Prueba ICFES 2020-B - 2da Sesión',2020,'Prueba ICFES Completa del año 2020 Calendario B - 2da Sesión - Con todas las RESPUESTAS ✅','https://drive.google.com/file/d/10abilbErjQDoSbWP2IU9FX6BJlct0cT6/view?usp=drivesdk','2025-12-22 04:47:58');
/*!40000 ALTER TABLE `material_educativo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_icfes`
--

DROP TABLE IF EXISTS `material_icfes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_icfes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text,
  `tipo` enum('filtrado','completo','simulacro') DEFAULT 'filtrado',
  `pdf_url` varchar(255) DEFAULT NULL,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `requerida_suscripcion` tinyint(1) DEFAULT '1',
  `plan_minimo` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `plan_minimo` (`plan_minimo`),
  CONSTRAINT `material_icfes_ibfk_1` FOREIGN KEY (`plan_minimo`) REFERENCES `planes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_icfes`
--

LOCK TABLES `material_icfes` WRITE;
/*!40000 ALTER TABLE `material_icfes` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_icfes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_por_plan`
--

DROP TABLE IF EXISTS `material_por_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_por_plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `material_id` int NOT NULL,
  `plan_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_material_plan` (`material_id`,`plan_id`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `material_por_plan_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material_educativo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `material_por_plan_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `planes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_por_plan`
--

LOCK TABLES `material_por_plan` WRITE;
/*!40000 ALTER TABLE `material_por_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_por_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `transaccion_id` varchar(200) DEFAULT NULL,
  `referencia` varchar(200) DEFAULT NULL,
  `monto` int DEFAULT NULL,
  `metodo` varchar(50) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (5,5,NULL,'MANUAL-d08e0853',75000,'Nequi','approved','2025-11-22 18:47:50'),(6,6,NULL,'MANUAL-8be20f67',50000,'Nequi','approved','2025-11-24 02:26:36'),(7,7,NULL,'MANUAL-cf6d8178',100000,'Nequi','approved','2025-12-11 02:16:11'),(8,5,NULL,'RENOVACION-2020b333',75000,'Nequi','approved','2025-12-22 03:54:10'),(11,7,NULL,'RENOVACION-410ff833',100000,'Nequi','approved','2025-12-30 05:10:40'),(12,8,NULL,'MANUAL-609bfab9',75000,'Nequi','approved','2025-12-30 05:11:19'),(13,6,NULL,'MANUAL-4d5e6927',100000,'Nequi','approved','2026-01-19 22:06:18'),(14,8,NULL,'RENOVACION-72c7b3a1',100000,'Nequi','approved','2026-01-20 01:00:44'),(15,8,NULL,'MANUAL-a0c4090f',100000,'Nequi','approved','2026-03-07 22:16:36'),(16,6,NULL,'MANUAL-6cb2bc76',100000,'Nequi','approved','2026-03-27 13:48:50'),(17,9,NULL,'MANUAL-87add817',100000,'Nequi','approved','2026-03-27 15:17:07'),(18,6,NULL,'MANUAL-340d4ec0',100000,'Nequi','approved','2026-05-15 02:42:07'),(19,8,NULL,'MANUAL-05ac3b3a',100000,'Nequi','approved','2026-06-27 20:38:41'),(20,8,NULL,'MANUAL-3e9fc3e7',100000,'Nequi','approved','2026-09-09 16:09:59');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_pr_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes`
--

DROP TABLE IF EXISTS `planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `descripcion` text,
  `precio` int DEFAULT NULL,
  `duracion_meses` int DEFAULT NULL,
  `acceso_material_filtrado` tinyint(1) DEFAULT '0',
  `acceso_simulacros` tinyint(1) DEFAULT '0',
  `acceso_comunidad` tinyint(1) DEFAULT '0',
  `acceso_ia_mentor` tinyint(1) DEFAULT '0',
  `acceso_clases_privadas` tinyint(1) DEFAULT '0',
  `acceso_orientacion_vocacional` tinyint(1) DEFAULT '0',
  `limite_simulacros_mes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
INSERT INTO `planes` VALUES (1,'Plan Despega al 1%','Acceso básico mensual',50000,1,1,0,0,0,0,0,0),(2,'Plan Modo Serio al 1%','Acceso completo mensual',75000,1,1,1,1,0,0,0,-1),(3,'Plan ELITE 500','Acceso total + mentoría premium',100000,1,1,1,1,1,1,1,-1);
/*!40000 ALTER TABLE `planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas_icfes`
--

DROP TABLE IF EXISTS `preguntas_icfes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas_icfes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `simulacro_id` int NOT NULL,
  `pregunta` text NOT NULL,
  `opcion_a` varchar(255) NOT NULL,
  `opcion_b` varchar(255) NOT NULL,
  `opcion_c` varchar(255) NOT NULL,
  `opcion_d` varchar(255) NOT NULL,
  `correcta` char(1) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `simulacro_id` (`simulacro_id`),
  CONSTRAINT `fk_preg_simulacro` FOREIGN KEY (`simulacro_id`) REFERENCES `simulacros_disponibles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas_icfes`
--

LOCK TABLES `preguntas_icfes` WRITE;
/*!40000 ALTER TABLE `preguntas_icfes` DISABLE KEYS */;
INSERT INTO `preguntas_icfes` VALUES (27,5,'¿Cuál es el valor de log₁₀(1000)?','1','2','3','4','c','Matemáticas'),(28,5,'¿Cuál es la solución de x² - 5x + 6 = 0?','x = 2 ó x = 3','x = 1 ó x = 6','x = -2 ó x = -3','x = 0 ó x = 5','a','Matemáticas'),(29,5,'¿Cuál es el área de un círculo con radio 5?','25π','10π','50π','15π','a','Matemáticas'),(30,5,'¿Cuál es la derivada de f(x) = 3x²?','3x','6x','6x²','3','b','Matemáticas'),(31,5,'¿Cuál es el resultado de (2x + 3)² si x = 2?','25','49','36','64','b','Matemáticas'),(32,7,'¿Cuál es la fórmula molecular del ácido sulfúrico?','H₂SO₃','H₂SO₄','HSO₄','H₃SO₄','b','Química'),(33,7,'¿Cuál es el número atómico del Carbono?','6','8','12','4','a','Química'),(34,7,'¿Cuál es la velocidad de propagación de la luz?','300,000 km/h','300,000 m/s','150,000 km/s','3,000,000 m/s','b','Física'),(35,7,'¿Cuál es el pH de una solución neutra?','0','7','14','1','b','Química'),(36,7,'¿Cuál es la función principal de las mitocondrias?','Sintetizar proteínas','Producir energía (ATP)','Almacenar agua','Fotosíntesis','b','Biología'),(37,8,'¿En qué año se firmó la Declaración de Independencia de Colombia?','1808','1810','1819','1821','c','Historia'),(38,8,'¿Cuántos países limitan con Colombia?','3','4','5','6','c','Geografía'),(39,8,'¿Cuál fue la causa principal de la Revolución Francesa?','Invasión napoleónica','Crisis económica y social','Guerre de Sucesión','Independencia americana','b','Historia'),(40,8,'¿Cuál es la capital de Colombia?','Cali','Medellín','Bogotá','Cartagena','c','Geografía'),(41,8,'¿En qué continente se encuentra Colombia?','América del Norte','América Central','América del Sur','Caribe','c','Geografía'),(42,9,'¿Cuál es el sinónimo de \"perspicaz\"?','Ingenuo','Agudo','Torpe','Lento','b','Lenguaje'),(43,9,'¿Cuál es el sujeto en \"La casa está en la montaña\"?','montaña','casa','está','la','b','Gramática'),(44,9,'Completa: \"Si yo _____ sido más atento, lo hubiera notado\"','sería','fuera','hubiera','seré','c','Gramática'),(45,9,'¿Qué figura literaria es \"sus lágrimas eran ríos\"?','Metáfora','Símil','Hipérbole','Metonimia','a','Literatura'),(46,9,'¿Cuál es el antónimo de \"abundancia\"?','Riqueza','Escasez','Exceso','Plenitud','b','Lenguaje'),(47,10,'Traduce: \"She has been studying English for 5 years\"','Ella estudió inglés por 5 años','Ella ha estado estudiando inglés por 5 años','Ella estará estudiando inglés por 5 años','Ella es inglesa por 5 años','b','Inglés'),(48,10,'¿Cuál es el significado de \"awkward\"?','Incómodo','Gracias','Fuerte','Feliz','a','Inglés'),(49,10,'Complete: \"If I _____ you, I would help you\"','am','was','were','have been','c','Inglés'),(50,10,'¿Cuál es el Past Participle de \"go\"?','Goed','Going','Gone','Goes','c','Inglés'),(51,10,'Elige la oración correcta:','She dont like pizza','She doesnt like pizza','She not like pizza','She do not like pizza','b','Inglés'),(52,11,'¿Cuál número sigue en la serie: 2, 4, 8, 16, ___?','24','30','32','40','c','Razonamiento'),(53,11,'¿Qué tiene la palabra \"ICFES\" que no tiene la palabra \"TEST\"?','Una vocal','Tres letras','La letra F','Dos vocales','c','Razonamiento'),(54,11,'Si todos los gatos son animales y Miau es un gato, entonces:','Miau es un perro','Miau es un animal','Miau no es un animal','No se puede determinar','b','Lógica'),(55,3,'El peso molecular del Cl2O5, es?','140 uma','140 g/mol','150 g/mol','150 uma','c','Química'),(56,3,'¿Cuál es la función principal de las mitocondrias?','Sintetizar proteínas','Producir energía (ATP)','Almacenar agua','Fotosíntesis','b','Biología'),(57,3,'¿Cuál es la fórmula molecular del ácido sulfúrico?','H₂SO₃','H₂SO₄','HSO₄','H₃SO₄','b','Química'),(58,3,'¿Cuál es la velocidad de propagación de la luz?','300,000 km/h','300,000 m/s','150,000 km/s','3,000,000 m/s','b','Física'),(59,3,'¿Cuál es el pH de una solución neutra?','0','7','14','1','b','Química'),(60,3,'¿Cuál es el número atómico del Carbono?','6','8','12','4','a','Química');
/*!40000 ALTER TABLE `preguntas_icfes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simulacros`
--

DROP TABLE IF EXISTS `simulacros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simulacros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `pdf_url` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simulacros`
--

LOCK TABLES `simulacros` WRITE;
/*!40000 ALTER TABLE `simulacros` DISABLE KEYS */;
/*!40000 ALTER TABLE `simulacros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simulacros_disponibles`
--

DROP TABLE IF EXISTS `simulacros_disponibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simulacros_disponibles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text,
  `total_preguntas` int DEFAULT '150',
  `duracion_minutos` int DEFAULT '180',
  `pdf_url` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `plan_minimo` int DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `plan_minimo` (`plan_minimo`),
  CONSTRAINT `simulacros_disponibles_ibfk_1` FOREIGN KEY (`plan_minimo`) REFERENCES `planes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simulacros_disponibles`
--

LOCK TABLES `simulacros_disponibles` WRITE;
/*!40000 ALTER TABLE `simulacros_disponibles` DISABLE KEYS */;
INSERT INTO `simulacros_disponibles` VALUES (3,'Química','Simulacro 2',10,180,NULL,1,1),(5,'Simulacro de Matemáticas: ¡Pon a Prueba Tú Cálculo Mental!','Prepárate para enfrentar preguntas estilo ICFES de matemáticas que desafiarán tu lógica y destreza mental. ¡Es hora de demostrar tus habilidades! 💡',10,5,NULL,1,2),(7,'Simulacro de Ciencias Naturales: ¡Desafía Tu Conocimiento!','Prepárate para enfrentar preguntas estilo ICFES de química, física y biología que pondrán a prueba tu comprensión y habilidades. ¡Demuestra tu dominio de la materia! 🔬',10,5,NULL,1,2),(8,'Simulacro de Ciencias Sociales: ¡Explora el Pasado y el Presente!','Prepárate para enfrentar preguntas estilo ICFES de historia y geografía que desafiarán tu conocimiento y comprensión del mundo. ¡Demuestra tu habilidad para analizar y entender la sociedad! 🌍',10,5,NULL,1,2),(9,'Simulacro de Lenguaje y Literatura: ¡Desafía Tu Comprensión!','Prepárate para enfrentar preguntas estilo ICFES de lectura crítica y análisis literario que pondrán a prueba tu habilidad para interpretar y comprender textos. ¡Demuestra tu dominio del lenguaje y la literatura! 📚',10,5,NULL,1,2),(10,'Simulacro de Inglés: ¡Pon a Prueba Tu Dominio del Idioma!','Prepárate para enfrentar preguntas estilo ICFES de comprensión lectora, gramática y vocabulario en inglés. ¡Demonstra tu habilidad para entender y comunicarte en el idioma! 🇬🇧',10,5,NULL,1,2),(11,'Simulacro de Razonamiento Lógico: ¡Desafía Tu Mente!','Prepárate para enfrentar preguntas que pondrán a prueba tu habilidad para analizar, deducir y resolver problemas de manera lógica en el examen. ¡Demuestra tú capacidad para pensar críticamente! 🤔💡',10,5,NULL,1,3),(12,'Simulacro ICFES: ¡Pon a Prueba Tus Conocimientos!','Prepárate para enfrentar preguntas estilo ICFES de matemáticas, lectura crítica, ciencias sociales, ciencias naturales e inglés. ¡Demuestra tu dominio en todas las áreas! 📚💡',50,30,NULL,1,3);
/*!40000 ALTER TABLE `simulacros_disponibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simulacros_realizados`
--

DROP TABLE IF EXISTS `simulacros_realizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simulacros_realizados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `simulacro_id` int NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `puntaje` int DEFAULT '0',
  `tiempo_minutos` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `simulacros_realizados_ibfk_2` (`simulacro_id`),
  CONSTRAINT `simulacros_realizados_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `simulacros_realizados_ibfk_2` FOREIGN KEY (`simulacro_id`) REFERENCES `simulacros_disponibles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simulacros_realizados`
--

LOCK TABLES `simulacros_realizados` WRITE;
/*!40000 ALTER TABLE `simulacros_realizados` DISABLE KEYS */;
INSERT INTO `simulacros_realizados` VALUES (5,5,3,'2025-11-26 14:38:32',16,1),(6,8,10,'2025-12-30 18:47:45',40,1),(7,6,10,'2026-01-26 05:46:17',80,1);
/*!40000 ALTER TABLE `simulacros_realizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suscripciones`
--

DROP TABLE IF EXISTS `suscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suscripciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `plan_id` int DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_sus_unique` (`usuario_id`,`plan_id`,`fecha_inicio`,`fecha_fin`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `suscripciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `suscripciones_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `planes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suscripciones`
--

LOCK TABLES `suscripciones` WRITE;
/*!40000 ALTER TABLE `suscripciones` DISABLE KEYS */;
INSERT INTO `suscripciones` VALUES (4,5,2,'activa','2025-11-22','2025-12-22'),(5,6,1,'activa','2025-11-23','2025-12-23'),(6,7,3,'activa','2025-12-11','2026-02-09'),(8,8,3,'activa','2025-12-30','2026-02-28'),(9,6,3,'activa','2026-01-19','2026-02-18'),(10,8,3,'activa','2026-03-07','2026-04-06'),(11,6,3,'activa','2026-03-27','2026-04-26'),(12,9,3,'activa','2026-03-27','2026-04-26'),(13,6,3,'activa','2026-05-15','2026-06-14'),(14,8,3,'activa','2026-06-27','2026-07-27'),(15,8,3,'activa','2026-09-09','2026-10-09');
/*!40000 ALTER TABLE `suscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('free','premium','admin') DEFAULT 'free',
  `premium_until` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','estiguar.dev.emails@gmail.com','$2b$12$P48STORw0pGp/dhqvXxmeemdMInVCwe0gvtcUpa5mZUiPQxrmLWRu','2025-10-18 20:57:36','admin',NULL),(5,'Jean Pierr','jeanpierrmorales69@gmail.com','$2b$12$Z2dpzV/TmI3rsXZjbLenN.AhZdc904et04rk06uYF3Z8OuCVlHDhW','2025-11-22 18:47:50','premium',NULL),(6,'Alis','alismarianaromerohenao@gmail.com','$2b$12$Csu/3f8BsCl54sTCdMtEfeeWa2YaiO/mFAIjol5HqxUQt978dc8/K','2025-11-24 02:26:35','premium',NULL),(7,'María Casallas','maria.casallast03@gmail.com','$2b$12$QXmbGBOTxuPrL4004x0ghOh.fNrUEwc1f9eJ/v3SBcXhomxWF0o2y','2025-12-11 02:16:11','premium',NULL),(8,'Jhon','jhonestiwarhenao@gmail.com','$2b$12$KDU/iHbin4g.WmW/26r82uLvFWvfFm4Lzd3C.uJqPeQ8Lh1REqcKe','2025-12-30 05:11:19','premium',NULL),(9,'Diana Rico','rldianapatricia@gmail.com','$2b$12$d7zoGStU5WUFQZBOvA/oQ.J8ntTVTMuW.TnEnZhOw33L4A8H/tSy.','2026-03-27 15:17:07','premium',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-10  1:11:57
