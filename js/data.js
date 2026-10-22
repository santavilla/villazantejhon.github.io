/**
 * ====================================================================
 * PORTFOLIO DATA — Jhon Villazante
 * Fuente de datos centralizada, mantenible y configurable.
 * ====================================================================
 */

const PORTFOLIO_DATA = {
    profile: {
        name: "Jhon Villazante",
        shortName: "JV",
        tagline: ["Ingeniería Civil", "Desarrollo de Software", "Innovación Tecnológica"],
        bio: "Integro la ingeniería civil y el desarrollo de software para crear herramientas digitales, automatizar procesos y desarrollar soluciones tecnológicas orientadas a problemas reales.",
        github: "https://github.com/villazantejhon",
        linkedin: "https://www.linkedin.com/in/jhon-i-villazante-mjj/",
        email: "villazantejhon@ejemplo.com", // Configurable
        location: "Lima, Perú",
        status: "Disponible para proyectos & colaboraciones"
    },

    stats: {
        projects: 5,
        formations: 3,
        disciplines: 2
    },

    education: [
        {
            title: "Ingeniería Civil",
            institution: "Universidad Nacional de Ingeniería (UNI)",
            status: "Egresado",
            statusClass: "status-completed",
            icon: "graduation-cap",
            description: "Formación sólida en ciencias de la ingeniería, análisis y diseño estructural, mecánica de materiales, geotecnia, gestión y ejecución de proyectos de construcción.",
            tags: ["Estructuras", "Análisis Sísmico", "Gestión de Proyectos", "Mecánica de Suelos"]
        },
        {
            title: "Ingeniería de Sistemas",
            institution: "Formación Universitaria",
            status: "En curso — 8vo ciclo",
            statusClass: "status-inprogress",
            icon: "monitor",
            description: "Estudios avanzados en ingeniería de software, arquitectura de sistemas computacionales, gestión de bases de datos, diseño de algoritmos, redes y gestión tecnológica.",
            tags: ["Desarrollo de Software", "Arquitectura de Sistemas", "Bases de Datos", "Algoritmos"]
        },
        {
            title: "Computación e Informática",
            institution: "Formación Técnica",
            status: "Completado",
            statusClass: "status-completed",
            icon: "cpu",
            description: "Capacitación práctica integral en lenguajes de programación, soporte de sistemas, infraestructura de redes locales, bases de datos y herramientas informáticas aplicadas.",
            tags: ["Programación", "Redes & Conectividad", "Soporte Técnico", "Bases de Datos"]
        }
    ],

    skills: [
        {
            category: "Desarrollo de Software",
            icon: "code-2",
            items: [
                { name: "Python", icon: "terminal" },
                { name: "JavaScript / ES6+", icon: "file-code" },
                { name: "TypeScript", icon: "file-code-2" },
                { name: "C#", icon: "code" },
                { name: "HTML5 & CSS3 Moderno", icon: "layout" },
                { name: "SQL & Bases de Datos", icon: "database" },
                { name: "Git & GitHub", icon: "git-branch" }
            ]
        },
        {
            category: "Automatización & Datos",
            icon: "bot",
            items: [
                { name: "Python Scripting & RPA", icon: "cpu" },
                { name: "Excel Avanzado & VBA", icon: "table" },
                { name: "APIs & Servicios Web", icon: "network" },
                { name: "Web Scraping & Extracción", icon: "search" },
                { name: "Procesamiento y Limpieza de Datos", icon: "bar-chart-2" }
            ]
        },
        {
            category: "Ingeniería Civil & Cálculo",
            icon: "building-2",
            items: [
                { name: "CSI ETABS (Análisis Estructural)", icon: "box" },
                { name: "SAP2000", icon: "grid" },
                { name: "CSI SAFE", icon: "layers" },
                { name: "AutoCAD Técnico", icon: "pen-tool" },
                { name: "Metodología BIM / Revit", icon: "cuboid" },
                { name: "Normativa Técnica Sísmica E.030", icon: "shield-check" }
            ]
        },
        {
            category: "Sistemas & Soluciones Digitales",
            icon: "briefcase",
            items: [
                { name: "Gestión de Almacenes e Inventarios", icon: "boxes" },
                { name: "Desarrollo de Herramientas de Productividad", icon: "wrench" },
                { name: "Diseño de Interfaces de Usuario (UI)", icon: "smartphone" },
                { name: "Generación Automatizada de Reportes", icon: "file-spreadsheet" }
            ]
        }
    ],

    projects: [
        {
            id: "mjj-tools",
            title: "MJJ Tools",
            category: "automatizacion",
            categoryLabel: "Automatización / Productividad",
            categories: ["automatizacion", "software"],
            description: "Conjunto integral de herramientas y utilidades modulares diseñadas para optimizar, automatizar y acelerar tareas repetitivas y procesamiento de grandes volúmenes de datos en Excel.",
            icon: "wrench",
            status: "En desarrollo activo",
            tags: ["Excel / VBA", "Python", "Automatización", "Productividad"],
            features: [
                "Automatización de cálculos repetitivos y validaciones",
                "Limpieza y estandarización masiva de datos",
                "Aceleración de tiempos de entrega en hojas de cálculo"
            ],
            repoUrl: "https://github.com/villazantejhon",
            demoUrl: null
        },
        {
            id: "mjj-almacen-pro",
            title: "MJJ AlmacénPro",
            category: "productos",
            categoryLabel: "Sistema Empresarial",
            categories: ["productos", "software"],
            description: "Software especializado en el control integral de almacenes, trazabilidad de entradas y salidas de materiales, control de existencias en tiempo real y emisión de reportes para proyectos de construcción.",
            icon: "boxes",
            status: "En desarrollo activo",
            tags: ["Gestión de Almacenes", "Control de Materiales", "Construcción", "Reportes"],
            features: [
                "Control de inventario físico y valorizado en tiempo real",
                "Trazabilidad completa por partida, proveedor y frente de obra",
                "Generación automática de reportes de consumo y stock crítico"
            ],
            repoUrl: "https://github.com/villazantejhon",
            demoUrl: null
        },
        {
            id: "mjj-structural-pro",
            title: "MJJ StructuralPro",
            category: "ingenieria",
            categoryLabel: "Ingeniería Estructural",
            categories: ["ingenieria", "automatizacion"],
            description: "Solución de software enfocada en el análisis estructural y procesamiento automatizado de datos de modelos de cálculo (ETABS / SAP2000), asistiendo en la verificación paramétrica y normativa técnica.",
            icon: "layers",
            status: "En desarrollo activo",
            tags: ["Ingeniería Sísmica", "CSI API", "Python", "Norma E.030"],
            features: [
                "Extracción y procesamiento estructurado de matrices y resultados",
                "Chequeos automáticos de derivas y fuerzas sísmicas (E.030)",
                "Generación de reportes gráficos para memorias de cálculo"
            ],
            repoUrl: "https://github.com/villazantejhon",
            demoUrl: null
        },
        {
            id: "mjj-market",
            title: "MJJ Market",
            category: "software",
            categoryLabel: "Software Comercial",
            categories: ["software", "productos"],
            description: "Plataforma de software enfocada en la gestión de catálogos comerciales, clasificación jerárquica de productos, administración de precios, inventarios y agilización del flujo comercial.",
            icon: "shopping-bag",
            status: "En desarrollo activo",
            tags: ["Catálogo Digital", "Gestión Comercial", "Software", "Bases de Datos"],
            features: [
                "Organización por categorías comerciales e inventario dinámico",
                "Administración centralizada de productos y lista de precios",
                "Interfaz rápida diseñada para optimizar la atención y despacho"
            ],
            repoUrl: "https://github.com/villazantejhon",
            demoUrl: null
        },
        {
            id: "mjj-advoice",
            title: "MJJ Advoice",
            category: "productos",
            categoryLabel: "Producto Digital",
            categories: ["productos", "software"],
            description: "Herramienta digital concebida para la estructuración, diseño y producción de piezas publicitarias de audio, cuñas radiales y contenidos de voz promocionales para marcas y negocios.",
            icon: "mic",
            status: "En desarrollo activo",
            tags: ["Audio / Voz", "Publicidad", "Software", "Marketing Digital"],
            features: [
                "Estructuración guiada de guiones y mensajes promocionales",
                "Organización de campañas por tipo de producto y audiencia",
                "Flujo optimizado para producción ágil de piezas de audio"
            ],
            repoUrl: "https://github.com/villazantejhon",
            demoUrl: null
        }
    ]
};

// Export to window for global access
if (typeof window !== "undefined") {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
