import { MenuItem, Category, CustomizationOption } from "../types";
import CHICKEN from "../assets/CHICKEN.png";
import SUPER from "../assets/SUPER.png";
import VOLCANICA2 from "../assets/volcanica2.png";
import MERO from "../assets/MERO.png";
import ROLLY from "../assets/ROLLY.png";
import RANCHERA from "../assets/RANCHERA.jpg";
import BACONCHESE from "../assets/BACONCHESSE.jpg";
import BIGMONSTER from "../assets/BIGMONSTER.jpg";
import HOTESPECIAL from "../assets/HOTESPECIAL.jpg";
import HOTCLASICO from "../assets/HOTCLASICO.jpg";
import SENCILLA from "../assets/sencilla.jpeg";
import DELUXE from "../assets/deluxe.jpeg";
import VOLCANICA1 from "../assets/volcanica1.jpg";
import POP from "../assets/POP.jpeg";
import POLLOGRILL from "../assets/pollogrill.jpg";
import PAPASCASA from "../assets/PAPASDELACASA.png";
import CHESSEANDFRIES from "../assets/chesseandfries.png";

export const categories: Category[] = [
  { id: "burgers", name: "Hamburguesas", icon: "beef" },
  { id: "classic-burgers", name: "Hamburguesas Clásicas", icon: "beef" },
  { id: "deluxe-burgers", name: "Hamburguesas Deluxe", icon: "beef" },
  { id: "contest-burgers", name: "Hamburguesas Burger Master", icon: "beef" },
  { id: "hotdogs", name: "Perros Calientes", icon: "hot-dog" },
  { id: "fries", name: "Papas", icon: "french-fries" },
  { id: "sides", name: "Acompañamientos", icon: "acompañamientos" },
  { id: "drinks", name: "Bebidas", icon: "cup-soda" },
];

export const menuItems: MenuItem[] = [
  // Hamburguesas Clásicas
  {
    id: 1,
    name: "Burguer parrillera sencilla",
    description:
      "135 GR DE CARNE DE RES A LA PARRILLA, pan artesanal sellado en mantequilla, queso doble crema, vegetales frescos, papitas crocantes, mayonesa de ajo y salsa BBQ",
    price: 15000,
    priceWithFries: 21000,
    priceWithRusticFries: 21000,
    image: SENCILLA,
    category: "classic-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 2,
    name: " Burguer parrillera ranchera",
    description:
      "Pan artesanal sellado en mantequilla, queso doble crema, trocitos de chorizo en nuestra salsa BBQ Johnnie Walker, vegetales frescos, mayonesa de ajo",
    price: 17000,
    priceWithFries: 23000,
    priceWithRusticFries: 23000,
    image: RANCHERA,
    category: "classic-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 3,
    name: "Burguer parrillera beacon-chese",
    description:
      "135 GR DE CARNE DE RES A LA PARRILLA, pan artesanal sellado en mantequilla, queso cheddar, tocineta ahumada, vegetales frescos, mayonesa de ajo, mostaza, y nuestra BBQ Johnnie Walker",
    price: 17000,
    priceWithFries: 23000,
    priceWithRusticFries: 23000,
    image: BACONCHESE,
    category: "classic-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 4,
    name: "Burguer parrillera pollo grill",
    description:
      "130 GR DE PECHUGA DE POLLO A LA PARRILLA, pan artesanal sellado en mantequilla, queso fundido, tocineta, cebolla caramelizada, pimientos asados, vegetales frescos (lechuga, tomate), mayonesa de ajo y nuestra salsa BBQ.",
    price: 17000,
    priceWithFries: 23000,
    priceWithRusticFries: 23000,
    image: POLLOGRILL,
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 5,
    name: "Burguer parrillera chicken crunch",
    description:
      "130 GR DE PECHUGA APANADA AL ESTILO AMERICANO, pan artesanal sellado en mantequilla, queso colby jack, pepinillos agridulces, cebolla crunch, lechuga y nuestra salsa especial New York.",
    price: 17000,
    priceWithFries: 23000,
    priceWithRusticFries: 23000,
    image: CHICKEN,
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },

  // Hamburguesas Deluxe
  {
    id: 6,
    name: "Burguer parrillera especial",
    description:
      "135 GR DE CARNE DE RES A LA PARRILLA, pan artesanal, queso fundido, queso cheddar, piña asada, tocineta ahumada, lechuga fresca, papitas crocantes, mayonesa de ajo.",
    price: 18000,
    priceWithFries: 24000,
    priceWithRusticFries: 24000,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "classic-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 7,
    name: "Burguer parrillera argentina",
    description:
      "150 GR de carne de res y chorizo marinados en cerveza, pan artesanal sellado en mantequilla, queso doble crema, salsa criolla (pimentón, cebolla, especias), vegetales frescos (lechuga, tomate), mayonesa de ajo.",
    price: 19000,
    priceWithFries: 25000,
    priceWithRusticFries: 25000,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 8,
    name: "Burguer parrillera doble carne",
    description:
      "270 GR DE CARNE DE RES A LA PARRILLA, pan artesanal sellado en mantequilla, queso doble crema, queso cheddar, tocineta ahumada, cebolla caramelizada, vegetales frescos (lechuga, tomate), mayonesa de ajo, mostaza y nuestra salsa Johnnie Walker.",
    price: 27000,
    priceWithFries: 33000,
    priceWithRusticFries: 33000,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },

  // Hamburguesas Burger Master (anteriormente de Concurso)
  {
    id: 9,
    name: "Burguer parrillera rolly burguer",
    description:
      "150 GR DE CARNE DE RES A LA PARRILLA ACOMPAÑADA DE PAN ARTESANAL, QUESO CHEEDAR, SOUR CREAM, TOCINETA AHUMADA CROCANTE Y NUESTRA SALSA BBQ ROLLY CON UNOS TONOS DULCES Y PIMIENTA.",
    price: 24000,
    priceWithFries: 30000,
    priceWithRusticFries: 30000,
    image: ROLLY,
    category: "contest-burgers",
    customizable: true,
    badges: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGjTDyxTK8zxI9pPoVVDOeROJSqYYc8mqpQ&s",
    ],
  },
  {
    id: 10,
    name: "Burguer parrillera volcanica 2.0",
    description:
      "150 GR DE CARNE DE RES A LA PARRILLA, ACOMPAÑADA DE PAN ARTESANAL, QUESO SABANA, TROCITOS DE CHILACUAN, TOCINETA AHUMADA, CUAJADA ASADA, UN ADEREZO DE MANI LIGERAMENTE PICANTE, RUGULA Y MAYONESA DE LA CASA.",
    price: 24000,
    priceWithFries: 30000,
    priceWithRusticFries: 30000,
    image: VOLCANICA2,
    category: "contest-burgers",
    customizable: true,
    badges: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGjTDyxTK8zxI9pPoVVDOeROJSqYYc8mqpQ&s",
    ],
  },
  {
    id: 11,
    name: "Burger parriiiera-big monster",
    description:
      "330 GR DE CARNE DE RES A LA PARRILLA, acompañada de pan artesanal, triple queso cheddar, tocineta ahumada, aros de cebolla apanados, mayonesa de ajo, mostaza y nuestra salsa BBQ Johnnie Walker",
    price: 31000,
    priceWithFries: 37000,
    priceWithRusticFries: 37000,
    image: BIGMONSTER,
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 12,
    name: "Burguer Parrillera mero flow",
    description:
      "150 GR DE CARNE DE RES A LA PARRILLA, PAN ARTESANAL SELLADO EN MANTEQUILLA, QUESO MOZARELA. MERMELADA DE TOCINETA AHUMADA Y MANZANA VERDE, SOUR CREAM CON TONOS DE QUESO AZUL, CEBOLLA CRISPY Y SALSA DE LA CASA.",
    price: 24000,
    priceWithFries: 30000,
    priceWithRusticFries: 30000,
    image: MERO,
    category: "contest-burgers",
    customizable: true,
    badges: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGjTDyxTK8zxI9pPoVVDOeROJSqYYc8mqpQ&s",
    ],
  },
  {
    id: 13,
    name: "Burguer Parrillera bacon deluxe",
    description:
      "135 GR DE CARNE DE RES A LA PARRILLA, PAN ARTESANAL SELLADO EN MANTEQUILLA, QUESO CHEDDAR, TOCINETA EN REDUCCION DE VINO TINTO, CEBOLLA CARAMELIZADA, RUGULA, MAYONESA DE AJO Y SALSA CHIPOTLE.",
    price: 19000,
    priceWithFries: 25000,
    priceWithRusticFries: 25000,
    image: DELUXE,
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 14,
    name: "Burguer Parrillera volcanica",
    description:
      "180 GR DE CARNE DE RES A LA PARRILLA, PAN ARTESANAL SELLADO EN MANTEQUILLA, DOBLE QUESO SABANA, TOCINETA AHUMADA, CHUTNEY DE MANGO, ADEREZO DE MANI LIGERAMENTE PICANTE, RUGULA Y MAYONESA DE LA CASA.",
    price: 26000,
    priceWithFries: 32000,
    priceWithRusticFries: 32000,
    image: VOLCANICA1,
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 15,
    name: "Burguer Parrillera beef master",
    description:
      "180 GR DE CARNE DE RES A LA PARRILLA, PAN ARTESANAL SELLADO EN MANTEQUILLA, DOBLE QUESO SABANA, DOBLE TOCINETA AHUMADA EN REDUCCION DE VINO TINTO, RUGULA, MAYONESA DE AJO.",
    price: 26000,
    priceWithFries: 32000,
    priceWithRusticFries: 32000,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "deluxe-burgers",
    customizable: true,
    badges: [
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100",
    ],
  },
  {
    id: 16,
    name: "Burguer Parrillera super meat",
    description:
      "LA MAS SALVAJE DEL BARRIO, DOS CARNES DE 80 GR QUE RUGEN EN CADA MORDIDA, PAN BRIOCHE SELLADO EN MANTEQUILLA, QUESO DOBLE CREMA Y UN CHEDDAR CREMOSOQUE SE DESBORDASIN PEDIR PERMISO, LA MAYOCHIRRI LE METE TODO EL POWER CALLEJERO, LAS TOCINETAS CARAMELIZADAS EN REDUCCION DE CERVEZA ESTAN BIEN LOCAS Y CRIJIENTES, TE ATREVES A PROBARLA?",
    price: 24000,
    priceWithFries: 30000,
    priceWithRusticFries: 30000,
    image: SUPER,
    category: "contest-burgers",
    customizable: true,
    badges: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGjTDyxTK8zxI9pPoVVDOeROJSqYYc8mqpQ&s",
    ],
  },

  // Perros Calientes
  {
    id: 17,
    name: "Hot Dog Parrillero clasico",
    description:
      "SALCHICHA TIPO AMERICANA, PAN BRIOCHE, QUESO DOBLE CREMA, TOCINETA, CEBOLLA, PAPITAS CROCANTES Y NUESTRAS SALSAS DE LA CASA.",
    price: 15000,
    priceWithFries: 21000,
    priceWithRusticFries: 21000,
    image: HOTCLASICO,
    category: "hotdogs",
    customizable: true,
  },
  {
    id: 18,
    name: "Hot dog parrillero especial",
    description:
      "SALCHICHA TIPO AMERICANA, PAN BRIOCHE, DOBLE QUESO MOZARELLA, PIÑA ASADA, TOCINETA CROCANTE Y NUESTRAS SALSAS DE LA CASA.",
    price: 17000,
    priceWithFries: 23000,
    priceWithRusticFries: 23000,
    image: HOTESPECIAL,
    category: "hotdogs",
    customizable: true,
  },

  // Papas
  {
    id: 19,
    name: "Chicken pop",
    description:
      "10 TROCITOS DE PECHUGA APANADAS AL ESTILO PARRILLEROS, PAPITAS RUSTICAS, LIMINADA NATURAL O AGUA SABORIZADA DE LIMON.",
    price: 22000,
    image: POP,
    category: "fries",
    customizable: false,
  },
  {
    id: 20,
    name: "Papas de la casa",
    description:
      "PAPAS RUSTICAS, TROCITOS DE PECHUGA A LA PARRILLA, TROCITOS DE CHORIZO, TOCINETA Y SALSAS DE LA CASA. (APROX 600 GR)",
    price: 18000,
    image: PAPASCASA,
    category: "fries",
    customizable: false,
  },
  {
    id: 21,
    name: "Cheese and beacon fries",
    description:
      "PAPAS RUSTICAS BAÑADAS EN QUESO CHEEDAR Y TIERRA DE TOCINETA.",
    price: 16000,
    image: CHESSEANDFRIES,
    category: "fries",
    customizable: false,
  },

  //MENU DESPLEGABLE
  // Acompañamientos
  {
    id: 22,
    name: "Papas francesas",
    description: "Crujientes papas fritas con sal",
    price: 6000,
    image:
      "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "sides",
    customizable: false,
  },
  {
    id: 23,
    name: "Papas rusticas",
    description: "Crujientes papas fritas con sal",
    price: 6000,
    image:
      "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "sides",
    customizable: false,
  },
  {
    id: 24,
    name: "Papas a la provenzal.",
    description: "Crujientes papas fritas con sal",
    price: 9000,
    image:
      "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "sides",
    customizable: false,
  },
  {
    id: 25,
    name: "Ad chorizo",
    description: "CHORIZO",
    price: 4000,
    image:
      "https://meatmaster.pe/wp-content/uploads/2024/05/chorizo-a-la-parrilla.png",
    category: "sides",
    customizable: false,
  },
  {
    id: 26,
    name: "Ad tocineta",
    description: "TOCINETA",
    price: 4000,
    image:
      "https://previews.123rf.com/images/breakingthewalls/breakingthewalls1606/breakingthewalls160600145/60874220-seceral-crispy-smoked-grilled-barbecue-bacon-slices-cooked-on-bbq-smoke-grill-close-up.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 27,
    name: "Ad carne",
    description: "ADICION DE CARNE",
    price: 6000,
    image:
      "https://mastropiero.co/web/image/product.template/6709/image",
    category: "sides",
    customizable: false,
  },
  {
    id: 28,
    name: "Ad carne certified angus beef",
    description: "ADICION DE CARNE CERTIFIED ANGUS BEEF",
    price: 13000,
    image:
      "https://tienda.atlantic.la/cdn/shop/files/MOLIDA_DELUXE-min.jpg?v=1744057443",
    category: "sides",
    customizable: false,
  },
  {
    id: 29,
    name: "Piña asada",
    description: "ADICION DE PIÑA ASADA",
    price: 2500,
    image:
      "https://okdiario.com/img/recetas/2017/11/25/1-1.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 30,
    name: "Ad cebolla caramelizada",
    description: "ADICION DE CEBOLLA CARAMELIZADA",
    price: 3000,
    image:
      "https://www.infobae.com/new-resizer/-CXhVnJD5Gasa90T2xVRnUw98II=/arc-anglerfish-arc2-prod-infobae/public/INQNYIRPHREWJIOMQTU32XM5KI.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 31,
    name: "Ad queso fundido",
    description: "ADICION DE QUESO FUNDIDO",
    price: 3000,
    image:
      "https://res.cloudinary.com/hksqkdlah/image/upload/33579_sfs-queso-fundido-12.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 32,
    name: "Ad queso cheddar",
    description: "ADICION DE QUESO CHEDDAR",
    price: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZ6YgiRNr1-wKyKSfDihMc_Z4fEIXJUez5A&s",
    category: "sides",
    customizable: false,
  },
  {
    id: 33,
    name: "Ad queso colby jack",
    description: "ADICION DE QUESO COLBY JACK",
    price: 4000,
    image:
      "https://laquesie.com/images/quesoColbyJack.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 34,
    name: "Ad queso sabana",
    description: "ADICION DE QUESO SABANA",
    price: 4000,
    image:
      "https://laquesie.com/images/quesoSabana.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 35,
    name: "Ad aros de cebolla apanados",
    description: "ADICION DE AROS DE CEBOLLA (3 UN)",
    price: 4500,
    image:
      "https://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-1024x693.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 36,
    name: "Ad cebolla crunch",
    description: "ADICION DE CEBOLLA CRUNCH",
    price: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMwcd13CoeeCivhjCwg8UZ9DQFhD3fqvNdg&s",
    category: "sides",
    customizable: false,
  },
  {
    id: 37,
    name: "Ad pepinillos",
    description: "ADICION DE CEBOLLA CARAMELIZADA",
    price: 13000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdBT0pGYWMrwK4jNAJcK4xkNDKgb3NnQKYA&s",
    category: "sides",
    customizable: false,
  },
  {
    id: 38,
    name: "Ad jalapeños",
    description: "ADICION DE JALAPEÑOS",
    price: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72j1g-Px7ENQWJ15rsZQDOF3c6gU2-bPoDw&s",
    category: "sides",
    customizable: false,
  },
  {
    id: 39,
    name: "Ad cheddar liquido y tierra de tocineta",
    description: "ADICION DE QUESO CHEDAR Y TOCINETA",
    price: 7000,
    image:
      "https://img0.didiglobal.com/static/soda_public/img_0b354251bc5df243fd442d4f87e9257a.jpg",
    category: "sides",
    customizable: false,
  },
  {
    id: 40,
    name: "Ad ripio de papa crocante",
    description: "ADICION DE RIPIO DE PAPA",
    price: 1000,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_920064-MCO82587199233_022025-O.webp",
    category: "sides",
    customizable: false,
  },

  // Bebidas
  {
    id: 41,
    name: "Gaseosa coca cola",
    description: "COCA COLA",
    price: 6000,
    image:
      "https://asociaciondec.org/wp-content/uploads/2018/12/logo-cocacola-1.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 42,
    name: "Fuze te durazno",
    description: "FUZE TE DURAZNO",
    price: 5000,
    image:
      "https://www.drinksnewslatam.com/images/stories/2017/10_Octubre/te-coca-cola-fuze-tea.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 43,
    name: "Fuze te limon",
    description: "FUZE TE LIMON",
    price: 5000,
    image:
      "https://randys.com.co/wp-content/uploads/2025/02/Fuze-tea-Limon-400-ml.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 44,
    name: "Jugo del valle de mandarina",
    description: "JUGO DEL VALLE DE MANDARINA",
    price: 4500,
    image:
      "https://olimpica.vtexassets.com/arquivos/ids/1097339-800-450?v=638197813945100000&width=800&height=450&aspect=true",
    category: "drinks",
    customizable: false,
  },
  {
    id: 45,
    name: "Agua natural",
    description: "AGUA",
    price: 3500,
    image:
      "https://mercaldas.vtexassets.com/arquivos/ids/1329381/Agua-CRISTAL-x600-ml_90686.jpg?v=638557802795830000",
    category: "drinks",
    customizable: false,
  },
  {
    id: 46,
    name: "Agua saborizada",
    description: "AGUA",
    price: 3500,
    image:
      "https://megatiendas.vtexassets.com/arquivos/ids/172408/7702535013212.jpg?v=638634901881600000",
    category: "drinks",
    customizable: false,
  },
  {
    id: 47,
    name: "Limonada natural",
    description: "LIMONADA NATURAL",
    price: 6500,
    image:
      "https://burgerart.com.co/wp-content/uploads/2023/10/comidas-rapidas-en-palmira-.webp",
    category: "drinks",
    customizable: false,
  },
  {
    id: 48,
    name: "Limonada cerezada",
    description: "LIMONADA CEREZADA",
    price: 8500,
    image:
      "https://marketalimentos.unisabana.edu.co/images/thumbs/0000539_limonada-cerezada_600.jpeg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 49,
    name: "Limonada de fresa",
    description: "LIMONADA DE FRESA",
    price: 8500,
    image:
      "https://www.cinemaburger.com/wp-content/uploads/2017/04/bebida-limonada-fresa.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 50,
    name: "Limonada de coco",
    description: "LIMONADA DE COCO",
    price: 9500,
    image:
      "https://i0.wp.com/www.pasionthermomix.co/wp-content/uploads/2022/05/captura-de-pantalla-2020-12-14-a-las-22-13-27_1.jpg?fit=1256%2C883&ssl=1",
    category: "drinks",
    customizable: false,
  },
  {
    id: 51,
    name: "Jugo natural mora en agua",
    description: "JUGO NATURAL MORA EN AGUA",
    price: 6500,
    image:
      "https://i.pinimg.com/736x/f3/14/c8/f314c86ef1705fbe0b1c63c8d71e7e8e.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 52,
    name: "Jugo natural mora en leche",
    description: "JUGO NATURAL MORA EN LECHE",
    price: 7500,
    image:
      "https://pesquerajaramillo.com/santa-barbara/wp-content/uploads/2022/07/jugo-leche.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 53,
    name: "Jugo natural fresa en agua",
    description: "JUGO NATURAL FRESA EN AGUA",
    price: 6500,
    image:
      "https://www.campoterra.com/wp-content/uploads/2021/03/receta-agua-de-fresa.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 54,
    name: "Jugo natural fresa en leche",
    description: "JUGO NATURAL FRESA EN LECHE",
    price: 7500,
    image: "https://www.clarin.com/img/2018/11/19/1moJNpDSB_1200x630__1.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 55,
    name: "Jugo natural maracuya en agua",
    description: "JUGO NATURAL MARACUYA EN AGUA",
    price: 6500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDVTS7cSoJmXMCt-FuuEFHFL_JRIS8xiK-Q&s",
    category: "drinks",
    customizable: false,
  },
  {
    id: 56,
    name: "Jugo natural maracuya en leche",
    description: "JUGO NATURAL MARACUYA EN LECHE",
    price: 7500,
    image: "https://i.ytimg.com/vi/mcjoCvtVPpo/sddefault.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 57,
    name: "Jugo natural mango en agua",
    description: "JUGO NATURAL MANGO EN AGUA",
    price: 6500,
    image:
      "https://alqueria.com.co/sites/default/files/styles/1327_612/public/licuado-cremoso-de-mango_2.jpg?h=2dfa7a18&itok=y0fZkmyx",
    category: "drinks",
    customizable: false,
  },
  {
    id: 58,
    name: "Jugo natural mango en leche",
    description: "JUGO NATURAL MANGO EN LECHE",
    price: 7500,
    image:
      "https://alqueria.com.co/sites/default/files/styles/1327_612/public/licuado-cremoso-de-mango_2.jpg?h=2dfa7a18&itok=y0fZkmyx",
    category: "drinks",
    customizable: false,
  },
  {
    id: 59,
    name: "Jugo natural lulo en agua",
    description: "JUGO NATURAL LULO EN AGUA",
    price: 6500,
    image:
      "https://thumbs.dreamstime.com/b/jugo-de-lulo-una-fruta-ex%C3%B3tica-colombiana-tradicional-131906700.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 60,
    name: "Jugo natural lulo en leche",
    description: "JUGO NATURAL LULO EN LECHE",
    price: 7500,
    image:
      "https://thumbs.dreamstime.com/b/jugo-de-lulo-una-fruta-ex%C3%B3tica-colombiana-tradicional-131906700.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 61,
    name: "Jugo natural guanabana en agua",
    description: "JUGO NATURAL GUANABANA EN AGUA",
    price: 6500,
    image:
      "https://recetasdecolombia.com/wp-content/uploads/2022/02/Receta-para-hacer-batido-de-guanabana-tradicional-colombiano-e1645564745710.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 62,
    name: "Jugo natural guanabana en leche",
    description: "JUGO NATURAL GUANABANA EN LECHE",
    price: 7500,
    image:
      "https://recetasdecolombia.com/wp-content/uploads/2022/02/Receta-para-hacer-batido-de-guanabana-tradicional-colombiano-e1645564745710.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 63,
    name: "Malteada cookies and cream",
    description: "MALTEADA",
    price: 13000,
    image:
      "https://revistasociosams.com/wp-content/uploads/2021/04/postres-con-helado-cc1.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 64,
    name: "Te helado de limon",
    description: "TE HELADO DE LIMON",
    price: 6000,
    image:
      "https://cdn0.uncomo.com/es/posts/5/8/3/como_preparar_te_helado_15385_orig.jpg",
    category: "drinks",
    customizable: false,
  },
  {
    id: 65,
    name: "Cerveza poker",
    description: "NACIONALES",
    price: 7000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSjCY0YpJ7vMNSSNzohiK753Sri7HqWcrNA&s",
    category: "drinks",
    customizable: false,
  },
  {
    id: 66,
    name: "Cerveza club dorada",
    description: "NACIONALES",
    price: 9000,
    image:
      "https://www.clubcolombia.com.co/sites/g/files/seuoyk481/files/2023-05/lata_dorada.png.webp",
    category: "drinks",
    customizable: false,
  },
];

export const customizationOptions: CustomizationOption[] = [
  { id: 1, name: "ad chorizo", price: 4000 },
  { id: 2, name: "ad tocineta", price: 4000 },
  { id: 3, name: "ad carne", price: 8000 },
  { id: 4, name: "ad carne certified angus beef", price: 13000 },
  { id: 5, name: "ad piña asada", price: 2500 },
  { id: 6, name: "ad cebolla caramelizada", price: 3000 },
  { id: 7, name: "ad queso fundido", price: 3000 },
  { id: 8, name: "ad queso cheddar", price: 4000 },
  { id: 9, name: "ad queso colby jack", price: 4000 },
  { id: 10, name: "ad queso sabana", price: 4000 },
  { id: 11, name: "ad aros de cebolla apanados", price: 4500 },
  { id: 12, name: "ad cebolla crunch", price: 3000 },
  { id: 13, name: "ad pepinillos", price: 3000 },
  { id: 14, name: "ad jalapeños", price: 3000 },
  { id: 15, name: "ad queso liquido y tierra de tocineta", price: 7000 },
  { id: 16, name: "ad ripio de papa crocante", price: 1000 },
];

export const categorizedSides = {
  Papas: [
    menuItems.find((item) => item.id === 22),
    menuItems.find((item) => item.id === 23),
    menuItems.find((item) => item.id === 24),
    menuItems.find((item) => item.id === 40),
  ].filter(Boolean),
  Carnes: [
    menuItems.find((item) => item.id === 25),
    menuItems.find((item) => item.id === 26),
    menuItems.find((item) => item.id === 27),
    menuItems.find((item) => item.id === 28),
  ].filter(Boolean),
  Quesos: [
    menuItems.find((item) => item.id === 31),
    menuItems.find((item) => item.id === 32),
    menuItems.find((item) => item.id === 33),
    menuItems.find((item) => item.id === 34),
    menuItems.find((item) => item.id === 39),
  ].filter(Boolean),
  Cebollas: [
    menuItems.find((item) => item.id === 30),
    menuItems.find((item) => item.id === 35),
    menuItems.find((item) => item.id === 36),
  ].filter(Boolean),
  "Otros Vegetales y Adiciones": [
    menuItems.find((item) => item.id === 29),
    menuItems.find((item) => item.id === 37),
    menuItems.find((item) => item.id === 38),
  ].filter(Boolean),
};
