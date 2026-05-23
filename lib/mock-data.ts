import { Product, WooCategory } from "../types";

export const mockCategories: (WooCategory & { image: { src: string }; description: string })[] = [
  {
    id: 101,
    name: "Collares",
    slug: "collares",
    description: "Nuestra pieza insignia. Collares de perlas modernizados y piezas sofisticadas hechas a mano.",
    image: { src: "https://placehold.co/800x800/EDF2F5/909FAD?text=Collares" }
  },
  {
    id: 102,
    name: "Aretes",
    slug: "aretes",
    description: "Aretes de oro y plata con perlas y pedrería fina para iluminar tu rostro.",
    image: { src: "https://placehold.co/800x800/CCC5BB/857B76?text=Aretes" }
  },
  {
    id: 103,
    name: "Pulseras",
    slug: "pulseras",
    description: "Brazaletes y pulseras únicas tejidas a mano con metales nobles y perlas de río.",
    image: { src: "https://placehold.co/800x800/EDF2F5/857B76?text=Pulseras" }
  },
  {
    id: 104,
    name: "Conjuntos",
    slug: "conjuntos",
    description: "Juegos seleccionados para ocasiones que merecen ser recordadas.",
    image: { src: "https://placehold.co/800x800/CCC5BB/909FAD?text=Conjuntos" }
  }
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Collar Aurora de Perlas",
    slug: "collar-aurora-perlas",
    price: "1890",
    regular_price: "1890",
    sale_price: "",
    on_sale: false,
    featured: true,
    short_description: "<p>Collar de perlas cultivadas con broche de oro de 14k. Un clásico modernizado.</p>",
    description: "<p>El Collar Aurora redefine el collar de perlas clásico. Elaborado a mano con una selección meticulosa de perlas de agua dulce de brillo superior, y complementado con un delicado broche en oro de 14 quilates. Diseñado por Lupita Guillén, esta pieza rompe el tabú de que las perlas son exclusivas de generaciones pasadas, convirtiéndose en el accesorio contemporáneo indispensable.</p>",
    images: [
      { id: 11, src: "https://placehold.co/1200x1200/EDF2F5/54799E?text=Collar+Aurora+1", alt: "Collar Aurora de Perlas" },
      { id: 12, src: "https://placehold.co/1200x1200/CCC5BB/857B76?text=Collar+Aurora+2", alt: "Detalle Collar Aurora" },
      { id: 13, src: "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Collar+Aurora+3", alt: "Modelo luciendo Collar Aurora" }
    ],
    categories: [mockCategories[0]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/collar-aurora-perlas"
  },
  {
    id: 2,
    name: "Aretes Gota de Plata",
    slug: "aretes-gota-plata",
    price: "950",
    regular_price: "1200",
    sale_price: "950",
    on_sale: true,
    featured: true,
    short_description: "<p>Aretes colgantes de plata esterlina .925 con perla natural colgante.</p>",
    description: "<p>Aretes artesanales de diseño minimalista y elegante. La combinación perfecta de plata esterlina pulida a mano con perlas seleccionadas en forma de gota. Ligeros y cómodos para el uso diario, pero con la sofisticación necesaria para eventos especiales.</p>",
    images: [
      { id: 21, src: "https://placehold.co/1200x1200/CCC5BB/54799E?text=Aretes+Gota+1", alt: "Aretes Gota de Plata" },
      { id: 22, src: "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Aretes+Gota+2", alt: "Detalle perla colgante" }
    ],
    categories: [mockCategories[1]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/aretes-gota-plata"
  },
  {
    id: 3,
    name: "Pulsera Lúa Barroca",
    slug: "pulsera-lua-barroca",
    price: "1450",
    regular_price: "1450",
    sale_price: "",
    on_sale: false,
    featured: true,
    short_description: "<p>Pulsera rígida de oro rosado con perlas barrocas de río.</p>",
    description: "<p>Cada perla barroca es única por naturaleza. La pulsera Lúa abraza esa irregularidad orgánica entrelazando tres magníficas perlas barrocas en un brazalete de chapa de oro rosado de 18k. Su diseño asimétrico aporta una elegancia natural y fresca a cualquier estilo.</p>",
    images: [
      { id: 31, src: "https://placehold.co/1200x1200/EDF2F5/857B76?text=Pulsera+Lua+1", alt: "Pulsera Lúa Barroca" },
      { id: 32, src: "https://placehold.co/1200x1200/CCC5BB/909FAD?text=Pulsera+Lua+2", alt: "Detalle perlas barrocas" }
    ],
    categories: [mockCategories[2]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/pulsera-lua-barroca"
  },
  {
    id: 4,
    name: "Conjunto Susi Perlas",
    slug: "conjunto-susi-perlas",
    price: "2990",
    regular_price: "2990",
    sale_price: "",
    on_sale: false,
    featured: true,
    short_description: "<p>Gargantilla y aretes a juego en oro de 14k con perlas redondas.</p>",
    description: "<p>Nombrado en honor a la primera modelo e inspiración de la marca. El Conjunto Susi ofrece una gargantilla minimalista de cadena fina de oro y unos broqueles de perlas de río a juego. Diseñado para brillar sin saturar, logrando el perfecto punto de sobriedad y frescura.</p>",
    images: [
      { id: 41, src: "https://placehold.co/1200x1200/CCC5BB/54799E?text=Conjunto+Susi+1", alt: "Conjunto Susi Completo" },
      { id: 42, src: "https://placehold.co/1200x1200/EDF2F5/857B76?text=Conjunto+Susi+2", alt: "Detalle Gargantilla" }
    ],
    categories: [mockCategories[3]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/conjunto-susi-perlas"
  },
  {
    id: 5,
    name: "Collar Cascabel Esmeralda",
    slug: "collar-cascabel-esmeralda",
    price: "2400",
    regular_price: "2400",
    sale_price: "",
    on_sale: false,
    featured: false,
    short_description: "<p>Gargantilla de plata fina tejida con incrustaciones de cristales verdes y perla central.</p>",
    description: "<p>Una pieza de alta joyería mexicana. Inspirada en los follajes de la selva mexicana, combina el brillo frío de la plata esterlina pulida con la calidez de pedrería fina verde esmeralda y el protagonismo sutil de una gran perla de agua dulce en su centro.</p>",
    images: [
      { id: 51, src: "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Cascabel+Esmeralda", alt: "Collar Cascabel Esmeralda" }
    ],
    categories: [mockCategories[0]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/collar-cascabel-esmeralda"
  },
  {
    id: 6,
    name: "Aretes Eclipse Oro Rosado",
    slug: "aretes-eclipse-oro-rosado",
    price: "1150",
    regular_price: "1150",
    sale_price: "",
    on_sale: false,
    featured: false,
    short_description: "<p>Arracadas medianas de oro rosado con perla flotante y pavé de zirconias.</p>",
    description: "<p>Modernidad y brillo sutil. Estos aretes de aro en oro rosado de 14k sostienen una perla que da la sensación de flotar en su órbita. Decorados con delicadas zirconias finas que capturan la luz a cada movimiento.</p>",
    images: [
      { id: 61, src: "https://placehold.co/1200x1200/CCC5BB/857B76?text=Eclipse+Oro+Rosado", alt: "Aretes Eclipse Oro Rosado" }
    ],
    categories: [mockCategories[1]],
    stock_status: "instock",
    permalink: "https://wp.juliaguillen.com/producto/aretes-eclipse-oro-rosado"
  }
];
