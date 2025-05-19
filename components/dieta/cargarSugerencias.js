import { setDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig'; // Asegúrate de que el Firebase DB esté bien importado

export const agregarSugerenciasComidaGlobales = async () => {
  const ref = doc(FIREBASE_DB, 'Sugerencias', 'comidas'); 

  const sugerencias = {
    "sugerencias": [
  {
    "title": "Salteado de champiñones y gambas",
    "description": "Salteado de champiñones y gambas para 2 personas",
    "image": "https://queapetito.com/wp-content/uploads/2019/09/img-0175.jpg",
    "ingredientes": [
      { "cantidad": "300", "nombre": "champiñones", "unidad": "g" },
      { "cantidad": "200", "nombre": "gambas", "unidad": "g" },
      { "cantidad": "2", "nombre": "dientes de ajo", "unidad": "unidades" },
      { "cantidad": "1", "nombre": "sal y pimienta negra", "unidad": "cucharadas" },
      { "cantidad": "1", "nombre": "perejil fresco", "unidad": "unidades" },
      { "cantidad": "2", "nombre": "aceite", "unidad": "cucharadas" }
    ],
    "objetivo": { "objetivos": ["Baja en calorías", "Alta en fibra"] },
    "pasos": [
      "Pelar los dientes de ajo. Quitarles el germen si se desea. Picarlos fino.",
      "Pelar las gambas y quitarles el intestino.",
      "Lavar y secar bien el perejil. Picar finamente las hojas.",
      "Lavar los champiñones y trocearlos.",
      "En una sartén, calentar aceite y dorar el ajo.",
      "Añadir los champiñones y saltear hasta dorar.",
      "Incorporar las gambas y saltear hasta que estén cocidas.",
      "Salpimentar al gusto y añadir perejil.",
      "Servir caliente."
    ],
    "duración": 10,
    "tipo": "comida"
  },
  {
    "title": "Ensalada César",
    "description": "Ensalada César clásica para 2 personas",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/06/Ensalada-Cesar-768x527.jpg",
    "ingredientes": [
      { "cantidad": "150", "nombre": "lechuga romana", "unidad": "g" },
      { "cantidad": "100", "nombre": "pechuga de pollo", "unidad": "g" },
      { "cantidad": "50", "nombre": "queso parmesano", "unidad": "g" },
      { "cantidad": "2", "nombre": "rebanadas de pan", "unidad": "unidades" },
      { "cantidad": "3", "nombre": "salsa césar", "unidad": "cucharadas" },
      { "cantidad": "2", "nombre": "aceite de oliva", "unidad": "cucharadas" }
    ],
    "objetivo": { "objetivos": ["Alta en proteínas", "Baja en carbohidratos", "Sin gluten"] },
    "pasos": [
      "Lavar y secar la lechuga.",
      "Tostar las rebanadas de pan y cortarlas en cubos.",
      "Cocinar la pechuga de pollo y cortarla en tiras.",
      "Rallar el queso parmesano.",
      "Mezclar la lechuga, el pollo, el queso y los cubos de pan.",
      "Añadir la salsa César y mezclar bien.",
      "Servir inmediatamente."
    ],
    "duración": 15,
    "tipo": "comida"
  },
  {
    "title": "Smoothie Verde",
    "description": "Smoothie de espinacas y manzana para 1 persona",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/03/Smoothie-verde-768x527.jpg",
    "ingredientes": [
      { "cantidad": "50", "nombre": "espinacas", "unidad": "g" },
      { "cantidad": "1", "nombre": "manzana verde", "unidad": "unidad" },
      { "cantidad": "200", "nombre": "agua", "unidad": "ml" },
      { "cantidad": "1", "nombre": "limón", "unidad": "unidad" }
    ],
    "objetivo": { "objetivos": ["Baja en calorías", "Alta en fibra", "Vegana"] },
    "pasos": [
      "Lavar bien las espinacas y la manzana.",
      "Cortar la manzana en trozos y exprimir el limón.",
      "Colocar las espinacas, la manzana y el agua en la licuadora.",
      "Añadir el jugo de limón y licuar hasta obtener una mezcla homogénea.",
      "Servir frío."
    ],
    "duración": 5,
    "tipo": "media mañana"
  },
  {
    "title": "Tostadas de aguacate y huevo",
    "description": "Desayuno saludable para 1 persona",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/02/tostadas-de-aguacate.jpg",
    "ingredientes": [
      { "cantidad": "1", "nombre": "aguacate", "unidad": "unidad" },
      { "cantidad": "2", "nombre": "rebanadas de pan integral", "unidad": "unidades" },
      { "cantidad": "1", "nombre": "huevo", "unidad": "unidad" },
      { "cantidad": "1", "nombre": "sal", "unidad": "pizca" },
      { "cantidad": "1", "nombre": "pimienta", "unidad": "pizca" }
    ],
    "objetivo": {
      "objetivos": ["Alta en proteínas", "Baja en carbohidratos", "Sin gluten"]
    },
    "pasos": [
      "Tostar el pan integral.",
      "Pelar y machacar el aguacate, añadir sal y pimienta.",
      "Cocinar el huevo a la plancha.",
      "Montar el aguacate sobre la tostada y colocar el huevo encima."
    ],
    "duración": 5,
    "tipo": "desayuno"
  },
  {
    "title": "Batido de plátano y avena",
    "description": "Bebida energética para 1 persona",
    "image": "https://www.gastrolabweb.com/u/fotografias/m/2022/1/11/f800x450-24923_80432_0.jpg",
    "ingredientes": [
      { "cantidad": "1", "nombre": "plátano", "unidad": "unidad" },
      { "cantidad": "200", "nombre": "leche", "unidad": "ml" },
      { "cantidad": "50", "nombre": "avena", "unidad": "g" },
      { "cantidad": "1", "nombre": "cucharada de miel", "unidad": "cucharada" }
    ],
    "objetivo": {
      "objetivos": ["Alta en proteínas", "Alta en carbohidratos", "Sin lactosa"]
    },
    "pasos": [
      "Colocar todos los ingredientes en una licuadora.",
      "Batir hasta obtener una mezcla homogénea.",
      "Servir frío."
    ],
    "duración": 3,
    "tipo": "desayuno"
  },
  {
    "title": "Ensalada de garbanzos y atún",
    "description": "Ensalada fresca para 2 personas",
    "image": "https://www.cocinavital.mx/wp-content/uploads/2019/02/ensalada-de-garbanzos-con-atun.jpg",
    "ingredientes": [
      { "cantidad": "200", "nombre": "garbanzos cocidos", "unidad": "g" },
      { "cantidad": "100", "nombre": "atún en conserva", "unidad": "g" },
      { "cantidad": "50", "nombre": "pimiento rojo", "unidad": "g" },
      { "cantidad": "30", "nombre": "cebolla", "unidad": "g" },
      { "cantidad": "1", "nombre": "limón", "unidad": "unidad" },
      { "cantidad": "2", "nombre": "aceite de oliva", "unidad": "cucharadas" }
    ],
    "objetivo": {
      "objetivos": ["Alta en proteínas", "Baja en calorías", "Sin gluten"]
    },
    "pasos": [
      "Lavar los garbanzos y escurrir el atún.",
      "Picar el pimiento y la cebolla.",
      "Mezclar todo en un bol, agregar el jugo de limón y el aceite.",
      "Salpimentar al gusto y servir frío."
    ],
    "duración": 5,
    "tipo": "comida"
  },
  {
    "title": "Yogur con frutas y semillas",
    "description": "Merienda saludable para 1 persona",
    "image": "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/06/Yogur-con-frutas.jpg",
    "ingredientes": [
      { "cantidad": "200", "nombre": "yogur natural", "unidad": "g" },
      { "cantidad": "50", "nombre": "frutas frescas variadas", "unidad": "g" },
      { "cantidad": "20", "nombre": "semillas de chía", "unidad": "g" },
      { "cantidad": "1", "nombre": "miel", "unidad": "cucharada" }
    ],
    "objetivo": {
      "objetivos": ["Baja en calorías", "Alta en fibra", "Sin gluten"]
    },
    "pasos": [
      "Colocar el yogur en un bol.",
      "Añadir las frutas troceadas por encima.",
      "Espolvorear las semillas de chía y agregar la miel.",
      "Servir frío."
    ],
    "duración": 2,
    "tipo": "merienda"
  },
  {
    "title": "Tortilla de espinacas y queso",
    "description": "Desayuno saludable para 1 persona",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/10/Tortilla-de-espinacas-768x530.jpg",
    "ingredientes": [
      { "cantidad": "2", "nombre": "huevos", "unidad": "unidades" },
      { "cantidad": "50", "nombre": "espinacas", "unidad": "g" },
      { "cantidad": "30", "nombre": "queso fresco", "unidad": "g" },
      { "cantidad": "1", "nombre": "aceite de oliva", "unidad": "cucharada" },
      { "cantidad": "1", "nombre": "sal", "unidad": "pizca" }
    ],
    "objetivo": {
      "objetivos": ["Alta en proteínas", "Baja en calorías", "Sin gluten"]
    },
    "pasos": [
      "Batir los huevos con una pizca de sal.",
      "Calentar el aceite en una sartén y añadir las espinacas.",
      "Cocinar hasta que reduzcan su tamaño.",
      "Añadir los huevos batidos y el queso desmenuzado.",
      "Cocinar a fuego medio hasta que cuaje."
    ],
    "duración": 5,
    "tipo": "desayuno"
  },
  {
    "title": "Batido verde detox",
    "description": "Bebida saludable para 1 persona",
    "image": "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/02/Batido-verde.jpg",
    "ingredientes": [
      { "cantidad": "1", "nombre": "manzana verde", "unidad": "unidad" },
      { "cantidad": "100", "nombre": "espinacas", "unidad": "g" },
      { "cantidad": "200", "nombre": "agua", "unidad": "ml" },
      { "cantidad": "1", "nombre": "limón", "unidad": "unidad" },
      { "cantidad": "1", "nombre": "jengibre fresco", "unidad": "cucharadita" }
    ],
    "objetivo": {
      "objetivos": ["Baja en calorías", "Bajo índice glucémico", "Vegana"]
    },
    "pasos": [
      "Lavar bien las espinacas y la manzana.",
      "Trocear la manzana, añadir el agua y las espinacas a la licuadora.",
      "Agregar el jugo de limón y el jengibre.",
      "Batir hasta obtener una mezcla homogénea."
    ],
    "duración": 3,
    "tipo": "desayuno"
  },
  {
    "title": "Avena con frutas y miel",
    "description": "Desayuno energético para 1 persona",
    "image": "https://www.gastrolabweb.com/u/fotografias/m/2020/8/13/f768x1-32291_32318_5050.jpg",
    "ingredientes": [
      { "cantidad": "50", "nombre": "avena", "unidad": "g" },
      { "cantidad": "200", "nombre": "leche", "unidad": "ml" },
      { "cantidad": "30", "nombre": "frutas frescas", "unidad": "g" },
      { "cantidad": "1", "nombre": "miel", "unidad": "cucharada" }
    ],
    "objetivo": {
      "objetivos": ["Alta en fibra", "Sin lactosa", "Baja en calorías"]
    },
    "pasos": [
      "Calentar la leche en un cazo.",
      "Añadir la avena y cocinar a fuego medio hasta espesar.",
      "Servir en un bol, añadir frutas frescas y miel."
    ],
    "duración": 5,
    "tipo": "desayuno"
  },
  {
    "title": "Sándwich de pollo y aguacate",
    "description": "Merienda saludable para 1 persona",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2019/08/Sandwich-de-pollo.jpg",
    "ingredientes": [
      { "cantidad": "2", "nombre": "rebanadas de pan integral", "unidad": "unidades" },
      { "cantidad": "50", "nombre": "pechuga de pollo", "unidad": "g" },
      { "cantidad": "1", "nombre": "aguacate", "unidad": "unidad" },
      { "cantidad": "1", "nombre": "hojas de lechuga", "unidad": "unidad" },
      { "cantidad": "1", "nombre": "tomate", "unidad": "unidad" }
    ],
    "objetivo": {
      "objetivos": ["Alta en proteínas", "Baja en calorías"]
    },
    "pasos": [
      "Cocinar la pechuga de pollo a la plancha.",
      "Machacar el aguacate y untar en el pan.",
      "Añadir el pollo, lechuga y tomate.",
      "Cerrar el sándwich y servir."
    ],
    "duración": 5,
    "tipo": "merienda"
  },
  {
    "title": "Ensalada de quinoa y aguacate",
    "description": "Comida saludable para 1 persona",
    "image": "https://www.cocinavital.mx/wp-content/uploads/2019/05/ensalada-de-quinoa-con-aguacate.jpg",
    "ingredientes": [
      { "cantidad": "100", "nombre": "quinoa cocida", "unidad": "g" },
      { "cantidad": "1", "nombre": "aguacate", "unidad": "unidad" },
      { "cantidad": "50", "nombre": "tomate cherry", "unidad": "g" },
      { "cantidad": "30", "nombre": "pepino", "unidad": "g" },
      { "cantidad": "1", "nombre": "limón", "unidad": "unidad" }
    ],
    "objetivo": {
      "objetivos": ["Alta en fibra", "Sin gluten", "Vegana"]
    },
    "pasos": [
      "Lavar y cortar los tomates y el pepino.",
      "Cortar el aguacate en trozos.",
      "Mezclar todo con la quinoa cocida.",
      "Aliñar con jugo de limón, sal y pimienta."
    ],
    "duración": 10,
    "tipo": "comida"
  },
  {
    "title": "Pizza de coliflor",
    "description": "Cena ligera y sin gluten para 1 persona",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2019/09/Pizza-de-coliflor.jpg",
    "ingredientes": [
      { "cantidad": "200", "nombre": "coliflor", "unidad": "g" },
      { "cantidad": "50", "nombre": "queso mozzarella", "unidad": "g" },
      { "cantidad": "1", "nombre": "huevo", "unidad": "unidad" },
      { "cantidad": "50", "nombre": "salsa de tomate", "unidad": "g" },
      { "cantidad": "30", "nombre": "pepperoni", "unidad": "g" }
    ],
    "objetivo": {
      "objetivos": ["Sin gluten", "Baja en carbohidratos"]
    },
    "pasos": [
      "Rallar la coliflor y cocinarla al vapor.",
      "Mezclar con el huevo y la mozzarella hasta formar una masa.",
      "Extender en una bandeja y hornear por 15 minutos.",
      "Añadir la salsa de tomate, mozzarella y pepperoni.",
      "Hornear 10 minutos más."
    ],
    "duración": 25,
    "tipo": "cena"
  },
  {
    "title": "Tacos de pollo con salsa de yogur",
    "description": "Tacos de pollo con salsa de yogur para 1 persona",
    "image": "https://www.lacocinadevero.com/wp-content/uploads/2020/06/Taco-de-pollo.jpg",
    "ingredientes": [
      {
        "cantidad": "100",
        "nombre": "pechugas de pollo",
        "unidad": "g"
      },
      {
        "cantidad": "1",
        "nombre": "tortillas de maíz",
        "unidad": "unidades"
      },
      {
        "cantidad": "2",
        "nombre": "ramitas de cilantro fresco",
        "unidad": "ramitas"
      },
      {
        "cantidad": "1",
        "nombre": "yogures naturales",
        "unidad": "cucharadas"
      },
      {
        "cantidad": "1",
        "nombre": "limones",
        "unidad": "unidades"
      },
      {
        "cantidad": "1",
        "nombre": "sales y pimientas",
        "unidad": "al gusto"
      }
    ],
    "objetivo": {
      "objetivos": [
        "Alta en proteínas",
        "Baja en carbohidratos",
        "Sin gluten",
        "Baja en calorías"
      ]
    },
    "pasos": [
      "Corta las pechugas de pollo en tiras pequeñas.",
      "En una sartén antiadherente, cocina el pollo con un poco de aceite de oliva, sal y pimienta hasta que esté bien cocido.",
      "Mientras tanto, en un bol pequeño, mezcla el yogur natural con el zumo de limón, cilantro picado, sal y pimienta al gusto.",
      "Calienta las tortillas de maíz en una sartén durante unos 30 segundos por cada lado.",
      "Coloca el pollo sobre la tortilla, añade la salsa de yogur por encima y decora con más cilantro fresco.",
      "Sirve inmediatamente."
    ],
    "duración": 15,
    "tipo": "cena"
  },
  {
    "title": "Sopa de calabaza y zanahoria",
    "description": "Sopa de calabaza y zanahoria para 1 persona",
    "image": "https://www.bbcgoodfood.com/sites/default/files/recipe_images/recipe-image-legacy-id-1054262_10.jpg",
    "ingredientes": [
      {
        "cantidad": "200",
        "nombre": "calabazas",
        "unidad": "g"
      },
      {
        "cantidad": "100",
        "nombre": "zanahorias",
        "unidad": "g"
      },
      {
        "cantidad": "1",
        "nombre": "dientes de ajo",
        "unidad": "unidades"
      },
      {
        "cantidad": "500",
        "nombre": "caldos de verduras",
        "unidad": "ml"
      },
      {
        "cantidad": "1",
        "nombre": "aceites de oliva",
        "unidad": "cucharadas"
      },
      {
        "cantidad": "1",
        "nombre": "sales y pimientas",
        "unidad": "al gusto"
      }
    ],
    "objetivo": {
      "objetivos": [
        "Baja en calorías",
        "Alta en fibra",
        "Sin gluten",
        "Vegetariana"
      ]
    },
    "pasos": [
      "Pela y corta la calabaza y la zanahoria en trozos pequeños.",
      "En una olla, calienta el aceite de oliva y sofríe el ajo picado hasta que esté dorado.",
      "Añade la calabaza y la zanahoria a la olla y saltea durante unos minutos.",
      "Vierte el caldo de verduras y lleva a ebullición.",
      "Reduce el fuego y deja cocinar a fuego lento durante unos 20 minutos o hasta que las verduras estén tiernas.",
      "Tritura todo con una batidora de mano hasta obtener una sopa suave.",
      "Añade sal y pimienta al gusto y sirve caliente."
    ],
    "duración": 25,
    "tipo": "comida"
  },
  {
    "title": "Wrap de atún con verduras",
    "description": "Wrap de atún con verduras para 1 persona",
    "image": "https://www.webmd.com/wellness/healthy-recipes/ss/slideshow-wraps-recipes",
    "ingredientes": [
      {
        "cantidad": "1",
        "nombre": "lata de atún en agua",
        "unidad": "unidad"
      },
      {
        "cantidad": "1",
        "nombre": "tortillas integrales",
        "unidad": "unidades"
      },
      {
        "cantidad": "50",
        "nombre": "hojas de espinacas",
        "unidad": "g"
      },
      {
        "cantidad": "1",
        "nombre": "tomates",
        "unidad": "unidades"
      },
      {
        "cantidad": "1",
        "nombre": "aguacates",
        "unidad": "unidades"
      },
      {
        "cantidad": "1",
        "nombre": "aceites de oliva",
        "unidad": "cucharaditas"
      }
    ],
    "objetivo": {
      "objetivos": [
        "Alta en proteínas",
        "Alta en fibra",
        "Sin gluten",
        "Vegetariana"
      ]
    },
    "pasos": [
      "Escurre la lata de atún y colócalo en un bol.",
      "Corta el aguacate y el tomate en trozos pequeños.",
      "Añade las hojas de espinaca y mezcla bien con el atún.",
      "En una sartén, calienta ligeramente la tortilla integral.",
      "Coloca la mezcla de atún y verduras sobre la tortilla y enróllala.",
      "Corta el wrap por la mitad y sirve."
    ],
    "duración": 10,
    "tipo": "media mañana"
  },
  {
  "title": "Lasaña de espinacas y ricotta",
  "description": "Lasaña de espinacas y ricotta para 2 personas",
  "image": "https://www.marmiton.org/photos/lasagna-spinach.jpg",
  "ingredientes": [
    {
      "cantidad": "250",
      "nombre": "espinacas frescas",
      "unidad": "g"
    },
    {
      "cantidad": "200",
      "nombre": "ricotta",
      "unidad": "g"
    },
    {
      "cantidad": "6",
      "nombre": "láminas de lasaña",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "dientes de ajo",
      "unidad": "unidades"
    },
    {
      "cantidad": "400",
      "nombre": "tomates triturados",
      "unidad": "ml"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "1",
      "nombre": "sal y pimienta negra",
      "unidad": "al gusto"
    },
    {
      "cantidad": "1",
      "nombre": "queso parmesano rallado",
      "unidad": "cucharadas"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en calorías",
      "Vegetariana",
      "Alta en fibra",
      "Alta en carbohidratos"
    ]
  },
  "pasos": [
    "Precalienta el horno a 180°C.",
    "Cocina las láminas de lasaña en agua con sal durante unos 10 minutos o según las instrucciones del paquete. Escurre y reserva.",
    "Lava las espinacas y saltea en una sartén con aceite de oliva y el ajo picado hasta que se marchiten.",
    "Añade la ricotta a las espinacas y mezcla bien. Salpimenta al gusto.",
    "En otra sartén, calienta un poco de aceite de oliva y añade los tomates triturados. Cocina durante 10 minutos hasta que la salsa espese. Salpimenta.",
    "En una fuente para horno, coloca una capa de salsa de tomate en el fondo, seguida de una capa de lasaña, luego una capa de la mezcla de espinacas y ricotta.",
    "Repite el proceso hasta que se terminen los ingredientes. Finaliza con una capa de salsa de tomate y espolvorea con queso parmesano rallado.",
    "Hornea durante 25-30 minutos hasta que esté bien dorada. Sirve caliente."
  ],
  "duración": 40,
  "tipo": "comida"
    },
    {
    "title": "Pollo al curry con arroz basmati",
    "description": "Pollo al curry con arroz basmati para 2 personas",
    "image": "https://www.delicious.com.au/recipes/curry-chicken.jpg",
    "ingredientes": [
      {
        "cantidad": "300",
        "nombre": "pechugas de pollo",
        "unidad": "g"
      },
      {
        "cantidad": "1",
        "nombre": "cebolla",
        "unidad": "unidades"
      },
      {
        "cantidad": "2",
        "nombre": "dientes de ajo",
        "unidad": "unidades"
      },
      {
        "cantidad": "200",
        "nombre": "leche de coco",
        "unidad": "ml"
      },
      {
        "cantidad": "2",
        "nombre": "cucharadas de curry en polvo",
        "unidad": "cucharadas"
      },
      {
        "cantidad": "150",
        "nombre": "arroz basmati",
        "unidad": "g"
      },
      {
        "cantidad": "1",
        "nombre": "aceite de oliva",
        "unidad": "cucharadas"
      },
      {
        "cantidad": "1",
        "nombre": "sal y pimienta negra",
        "unidad": "al gusto"
      }
    ],
    "objetivo": {
      "objetivos": [
        "Alta en proteínas",
        "Alta en carbohidratos",
        "Baja en calorías",
        "Sin gluten"
      ]
    },
    "pasos": [
      "Corta el pollo en trozos pequeños. Pica finamente la cebolla y el ajo.",
      "En una sartén grande, calienta el aceite de oliva y añade la cebolla y el ajo. Cocina hasta que estén dorados.",
      "Añade el pollo a la sartén y cocina durante unos 10 minutos hasta que esté dorado por todos lados.",
      "Agrega el curry en polvo y mezcla bien para que el pollo se impregne con el curry.",
      "Añade la leche de coco, sal y pimienta al gusto. Cocina a fuego lento durante unos 15 minutos.",
      "Mientras tanto, cocina el arroz basmati siguiendo las instrucciones del paquete.",
      "Sirve el pollo al curry sobre una cama de arroz basmati. Disfruta caliente."
    ],
    "duración": 35,
    "tipo": "comida"
  },
  {
    "title": "Salmón al horno con verduras asadas",
    "description": "Salmón al horno con verduras asadas para 2 personas",
    "image": "https://www.marthastewart.com/recipe/roasted-salmon.jpg",
    "ingredientes": [
      {
        "cantidad": "2",
        "nombre": "filetes de salmón",
        "unidad": "unidades"
      },
      {
        "cantidad": "200",
        "nombre": "patatas",
        "unidad": "g"
      },
      {
        "cantidad": "100",
        "nombre": "zanahorias",
        "unidad": "g"
      },
      {
        "cantidad": "100",
        "nombre": "pimientos",
        "unidad": "g"
      },
      {
        "cantidad": "2",
        "nombre": "aceite de oliva",
        "unidad": "cucharadas"
      },
      {
        "cantidad": "1",
        "nombre": "limón",
        "unidad": "unidades"
      },
      {
        "cantidad": "1",
        "nombre": "sal y pimienta negra",
        "unidad": "al gusto"
      }
    ],
    "objetivo": {
      "objetivos": [
        "Alta en proteínas",
        "Baja en carbohidratos",
        "Alta en fibra",
        "Bajo índice glucémico"
      ]
    },
    "pasos": [
      "Precalienta el horno a 200°C.",
      "Pela las patatas y corta en rodajas finas. Pela las zanahorias y córtalas en bastones. Lava y corta los pimientos en tiras.",
      "En una bandeja de horno, coloca las verduras y rocía con aceite de oliva, sal y pimienta. Hornea durante 20 minutos.",
      "Mientras tanto, coloca los filetes de salmón en una bandeja de horno, exprime el limón por encima y sazona con sal y pimienta.",
      "Pasados los 20 minutos, saca las verduras del horno, añade el salmón a la bandeja y hornea todo durante 12-15 minutos más.",
      "Sirve el salmón con las verduras asadas y disfruta de un plato saludable."
    ],
    "duración": 40,
    "tipo": "comida"
  },
  {
  "title": "Ensalada de pollo a la parrilla",
  "description": "Ensalada de pollo a la parrilla para 1 persona",
  "image": "https://www.cookinglight.com/recipes/grilled-chicken-salad",
  "ingredientes": [
    {
      "cantidad": "150",
      "nombre": "pechuga de pollo",
      "unidad": "g"
    },
    {
      "cantidad": "50",
      "nombre": "lechuga",
      "unidad": "g"
    },
    {
      "cantidad": "50",
      "nombre": "tomate",
      "unidad": "g"
    },
    {
      "cantidad": "30",
      "nombre": "pepino",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "1",
      "nombre": "limón",
      "unidad": "unidades"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en proteínas",
      "Bajo índice glucémico",
      "Sin gluten"
    ]
  },
  "pasos": [
    "Cocina la pechuga de pollo a la parrilla hasta que esté completamente cocida.",
    "Deja reposar el pollo y córtalo en tiras finas.",
    "Lava y corta la lechuga, tomate y pepino en trozos pequeños.",
    "Coloca los ingredientes en un bol, añade el pollo a la parrilla.",
    "Aliña con el jugo de limón, aceite de oliva, sal y pimienta.",
    "Mezcla bien y sirve."
  ],
  "duración": 15,
  "tipo": "comida"
},
{
  "title": "Sopa de verduras",
  "description": "Sopa de verduras para 1 persona",
  "image": "https://www.bbcgoodfood.com/recipes/vegetable-soup",
  "ingredientes": [
    {
      "cantidad": "100",
      "nombre": "zanahoria",
      "unidad": "g"
    },
    {
      "cantidad": "100",
      "nombre": "apio",
      "unidad": "g"
    },
    {
      "cantidad": "100",
      "nombre": "calabacín",
      "unidad": "g"
    },
    {
      "cantidad": "50",
      "nombre": "tomate",
      "unidad": "g"
    },
    {
      "cantidad": "500",
      "nombre": "agua",
      "unidad": "ml"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en fibra",
      "Sin gluten",
      "Vegana"
    ]
  },
  "pasos": [
    "Corta las zanahorias, apio, calabacín y tomate en trozos pequeños.",
    "En una olla, calienta el aceite de oliva y saltea las verduras durante unos 5 minutos.",
    "Añade el agua y lleva a ebullición.",
    "Reduce el fuego y cocina a fuego lento durante 20-25 minutos hasta que las verduras estén tiernas.",
    "Salpimenta al gusto y sirve caliente."
  ],
  "duración": 30,
  "tipo": "comida"
},
{
  "title": "Tortilla de espinacas y champiñones",
  "description": "Tortilla de espinacas y champiñones para 1 persona",
  "image": "https://www.thekitchn.com/wp-content/uploads/2018/01/spinach-and-mushroom-omelette-hero.jpg",
  "ingredientes": [
    {
      "cantidad": "2",
      "nombre": "huevos",
      "unidad": "unidades"
    },
    {
      "cantidad": "50",
      "nombre": "espinacas frescas",
      "unidad": "g"
    },
    {
      "cantidad": "50",
      "nombre": "champiñones",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en proteínas",
      "Sin gluten"
    ]
  },
  "pasos": [
    "Lava las espinacas y los champiñones. Corta los champiñones en láminas finas.",
    "En una sartén, calienta el aceite de oliva y saltea los champiñones hasta que estén dorados.",
    "Añade las espinacas y cocina hasta que se marchiten.",
    "Bate los huevos y agrégales sal y pimienta al gusto.",
    "Vierte los huevos batidos sobre las espinacas y los champiñones.",
    "Cocina a fuego medio hasta que la tortilla esté bien cuajada por ambos lados.",
    "Sirve y disfruta."
  ],
  "duración": 10,
  "tipo": "desayuno"
},
{
  "title": "Pechuga de pollo al limón con brócoli al vapor",
  "description": "Pechuga de pollo al limón con brócoli al vapor para 1 persona",
  "image": "https://www.delish.com/cooking/recipe-ideas/a29245082/lemon-chicken-broccoli-recipe/",
  "ingredientes": [
    {
      "cantidad": "150",
      "nombre": "pechuga de pollo",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "limón",
      "unidad": "unidades"
    },
    {
      "cantidad": "100",
      "nombre": "brócoli",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en proteínas",
      "Bajo índice glucémico",
      "Sin gluten"
    ]
  },
  "pasos": [
    "Exprimir el jugo de un limón y mezclar con el aceite de oliva.",
    "Marinar la pechuga de pollo con la mezcla de limón, sal y pimienta durante al menos 10 minutos.",
    "Cocer el brócoli al vapor hasta que esté tierno.",
    "En una sartén, cocinar la pechuga de pollo a fuego medio hasta que esté dorada y bien cocida.",
    "Servir la pechuga de pollo con el brócoli al vapor y disfrutar."
  ],
  "duración": 20,
  "tipo": "comida"
},
{
  "title": "Batido de fresa y plátano",
  "description": "Batido de fresa y plátano para 1 persona",
  "image": "https://www.acouplecooks.com/wp-content/uploads/2020/01/strawberry-banana-smoothie.jpg",
  "ingredientes": [
    {
      "cantidad": "1",
      "nombre": "plátano",
      "unidad": "unidades"
    },
    {
      "cantidad": "100",
      "nombre": "fresas",
      "unidad": "g"
    },
    {
      "cantidad": "150",
      "nombre": "yogur griego natural",
      "unidad": "g"
    },
    {
      "cantidad": "200",
      "nombre": "agua",
      "unidad": "ml"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en fibra",
      "Sin gluten",
      "Vegana"
    ]
  },
  "pasos": [
    "Pela el plátano y córtalo en trozos.",
    "Lava las fresas y córtales las hojas.",
    "Coloca el plátano, las fresas y el yogur en la licuadora.",
    "Añade el agua y licúa hasta obtener una mezcla suave.",
    "Sirve y disfruta."
  ],
  "duración": 5,
  "tipo": "merienda"
},
{
  "title": "Pasta integral con salsa de tomate y albahaca",
  "description": "Pasta integral con salsa de tomate y albahaca para 1 persona",
  "image": "https://www.cookingclassy.com/wp-content/uploads/2018/02/whole-wheat-pasta-2-600x900.jpg",
  "ingredientes": [
    {
      "cantidad": "100",
      "nombre": "pasta integral",
      "unidad": "g"
    },
    {
      "cantidad": "200",
      "nombre": "tomates frescos",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "dientes de ajo",
      "unidad": "unidades"
    },
    {
      "cantidad": "10",
      "nombre": "hojas de albahaca",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en carbohidratos",
      "Bajo índice glucémico"
    ]
  },
  "pasos": [
    "Cocer la pasta integral según las indicaciones del paquete.",
    "Mientras tanto, en una sartén, calienta el aceite de oliva y sofríe el ajo picado.",
    "Añadir los tomates picados y cocinar a fuego medio hasta que se forme una salsa espesa.",
    "Agregar las hojas de albahaca picadas, salpimentar al gusto.",
    "Mezcla la pasta cocida con la salsa y sirve."
  ],
  "duración": 25,
  "tipo": "comida"
},
{
  "title": "Panqueques de avena con miel",
  "description": "Panqueques de avena con miel para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2022/01/oatmeal-pancakes.jpg",
  "ingredientes": [
    {
      "cantidad": "50",
      "nombre": "avena",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "huevo",
      "unidad": "unidades"
    },
    {
      "cantidad": "100",
      "nombre": "leche de almendra",
      "unidad": "ml"
    },
    {
      "cantidad": "1",
      "nombre": "plátano maduro",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "miel",
      "unidad": "cucharadas"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en carbohidratos",
      "Bajo índice glucémico",
      "Alta en fibra"
    ]
  },
  "pasos": [
    "Tritura el plátano hasta obtener un puré.",
    "Mezcla el puré de plátano con el huevo, la avena y la leche de almendra hasta obtener una masa suave.",
    "Cocina la mezcla en una sartén a fuego medio hasta que los panqueques estén dorados por ambos lados.",
    "Sirve los panqueques con un poco de miel por encima."
  ],
  "duración": 15,
  "tipo": "desayuno"
},
{
  "title": "Arroz integral con verduras salteadas",
  "description": "Arroz integral con verduras salteadas para 1 persona",
  "image": "https://www.loveandlemons.com/wp-content/uploads/2019/04/vegetable-fried-rice.jpg",
  "ingredientes": [
    {
      "cantidad": "100",
      "nombre": "arroz integral",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "zanahoria",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "pimiento rojo",
      "unidad": "unidades"
    },
    {
      "cantidad": "50",
      "nombre": "guisantes verdes",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en carbohidratos",
      "Alta en fibra"
    ]
  },
  "pasos": [
    "Cocer el arroz integral según las indicaciones del paquete.",
    "Mientras tanto, corta las verduras en tiras pequeñas.",
    "En una sartén, calienta el aceite y saltea las verduras hasta que estén tiernas.",
    "Añadir el arroz cocido a las verduras, salpimentar y mezclar bien.",
    "Cocina durante unos minutos y sirve caliente."
  ],
  "duración": 30,
  "tipo": "comida"
},
{
  "title": "Tortilla de calabacín y queso feta",
  "description": "Tortilla de calabacín y queso feta para 1 persona",
  "image": "https://www.thekitchn.com/wp-content/uploads/2021/01/zucchini-frittata-2.jpg",
  "ingredientes": [
    {
      "cantidad": "1",
      "nombre": "calabacín",
      "unidad": "unidades"
    },
    {
      "cantidad": "2",
      "nombre": "huevos",
      "unidad": "unidades"
    },
    {
      "cantidad": "50",
      "nombre": "queso feta",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en carbohidratos",
      "Alta en proteínas",
      "Bajo índice glucémico"
    ]
  },
  "pasos": [
    "Ralla el calabacín y exprime el exceso de agua.",
    "Bate los huevos y mézclalos con el calabacín rallado.",
    "En una sartén, calienta el aceite de oliva y vierte la mezcla de huevo y calabacín.",
    "Cocina a fuego medio hasta que esté cuajada por ambos lados.",
    "Añade el queso feta desmenuzado por encima y sirve."
  ],
  "duración": 15,
  "tipo": "cena"
},
{
  "title": "Hamburguesa con queso y bacon",
  "description": "Hamburguesa con queso y bacon para 1 persona",
  "image": "https://www.delish.com/cooking/recipe-ideas/a20089372/bacon-cheeseburger-recipe/",
  "ingredientes": [
    {
      "cantidad": "150",
      "nombre": "carne de res molida",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "pan de hamburguesa",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "lonja de queso cheddar",
      "unidad": "unidades"
    },
    {
      "cantidad": "2",
      "nombre": "lonjas de bacon",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "tomate",
      "unidad": "unidades"
    },
    {
      "cantidad": "mayonesa y mostaza",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en calorías",
      "Alta en grasas"
    ]
  },
  "pasos": [
    "Cocina la carne de res a la plancha o parrilla hasta que esté bien hecha.",
    "Fría el bacon en una sartén hasta que esté crujiente.",
    "Coloca el queso cheddar sobre la carne para que se derrita.",
    "Coloca la carne con queso y el bacon entre el pan de hamburguesa.",
    "Agrega tomate y condimentos al gusto."
  ],
  "duración": 20,
  "tipo": "comida"
},
{
  "title": "Tacos de carne con guacamole y crema agria",
  "description": "Tacos de carne con guacamole y crema agria para 1 persona",
  "image": "https://www.foodnetwork.com/recipes/food-network-kitchen/ground-beef-tacos-recipe-2119489",
  "ingredientes": [
    {
      "cantidad": "150",
      "nombre": "carne molida de res",
      "unidad": "g"
    },
    {
      "cantidad": "2",
      "nombre": "tortillas de maíz",
      "unidad": "unidades"
    },
    {
      "cantidad": "50",
      "nombre": "guacamole",
      "unidad": "g"
    },
    {
      "cantidad": "30",
      "nombre": "crema agria",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "cebolla morada",
      "unidad": "unidades"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en calorías",
      "Alta en grasas"
    ]
  },
  "pasos": [
    "Cocina la carne molida con sal y pimienta hasta que esté dorada.",
    "Calienta las tortillas en una sartén.",
    "Coloca la carne en las tortillas, añade guacamole y crema agria.",
    "Añadir cebolla morada picada al gusto."
  ],
  "duración": 20,
  "tipo": "comida"
},
{
  "title": "Pizza con pepperoni y masa gruesa",
  "description": "Pizza con pepperoni y masa gruesa para 1 persona",
  "image": "https://www.delish.com/cooking/recipe-ideas/a20099609/pepperoni-pizza-recipe/",
  "ingredientes": [
    {
      "cantidad": "1",
      "nombre": "masa para pizza gruesa",
      "unidad": "unidades"
    },
    {
      "cantidad": "100",
      "nombre": "salsa de tomate",
      "unidad": "g"
    },
    {
      "cantidad": "150",
      "nombre": "mozzarella rallada",
      "unidad": "g"
    },
    {
      "cantidad": "50",
      "nombre": "pepperoni",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Alta en calorías",
      "Alta en grasas"
    ]
  },
  "pasos": [
    "Precalienta el horno a 220°C.",
    "Extiende la masa de pizza sobre una bandeja de horno.",
    "Cubre la masa con salsa de tomate y mozzarella.",
    "Añade las rodajas de pepperoni.",
    "Hornea durante 12-15 minutos hasta que la pizza esté dorada y crujiente."
  ],
  "duración": 30,
  "tipo": "comida"
},
{
  "title": "Ensalada de atún con vegetales",
  "description": "Ensalada de atún con vegetales para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2020/12/tuna-salad.jpg",
  "ingredientes": [
    {
      "cantidad": "1",
      "nombre": "lata de atún en agua",
      "unidad": "unidades"
    },
    {
      "cantidad": "50",
      "nombre": "lechuga",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "tomate",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "pepino",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Alta en proteínas",
      "Bajo índice glucémico"
    ]
  },
  "pasos": [
    "Escurre el atún de la lata y colócalo en un bol.",
    "Lava y corta los vegetales.",
    "Mezcla el atún con los vegetales en un bol.",
    "Aliña con aceite de oliva, sal y pimienta."
  ],
  "duración": 10,
  "tipo": "comida"
},
{
  "title": "Sopa de calabaza ligera",
  "description": "Sopa de calabaza ligera para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2021/01/healthy-butternut-squash-soup.jpg",
  "ingredientes": [
    {
      "cantidad": "200",
      "nombre": "calabaza",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "cebolla",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "ajo",
      "unidad": "dientes"
    },
    {
      "cantidad": "500",
      "nombre": "caldo de verduras",
      "unidad": "ml"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en calorías",
      "Bajo en grasas"
    ]
  },
  "pasos": [
    "Corta la calabaza, cebolla y ajo en trozos pequeños.",
    "En una sartén, calienta el aceite y sofríe la cebolla y el ajo hasta que estén tiernos.",
    "Añade la calabaza y el caldo de verduras.",
    "Cocina a fuego medio durante 20 minutos.",
    "Tritura la mezcla hasta obtener una sopa suave y sazona al gusto."
  ],
  "duración": 30,
  "tipo": "comida"
},
{
  "title": "Ensalada de espinacas y fresas",
  "description": "Ensalada de espinacas frescas y fresas para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2020/12/spinach-strawberry-salad.jpg",
  "ingredientes": [
    {
      "cantidad": "50",
      "nombre": "espinacas frescas",
      "unidad": "g"
    },
    {
      "cantidad": "100",
      "nombre": "fresas",
      "unidad": "g"
    },
    {
      "cantidad": "10",
      "nombre": "nueces",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "1",
      "nombre": "vinagre balsámico",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en grasas",
      "Baja en calorías",
      "Alta en fibra"
    ]
  },
  "pasos": [
    "Lava y seca las espinacas y fresas.",
    "Corta las fresas en láminas finas.",
    "Mezcla las espinacas, fresas y nueces en un bol.",
    "Aliña con aceite de oliva, vinagre balsámico, sal y pimienta."
  ],
  "duración": 10,
  "tipo": "media mañana"
},
{
  "title": "Merluza al vapor con espárragos",
  "description": "Merluza al vapor acompañada de espárragos para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2020/12/steamed-fish-asparagus.jpg",
  "ingredientes": [
    {
      "cantidad": "150",
      "nombre": "filete de merluza",
      "unidad": "g"
    },
    {
      "cantidad": "100",
      "nombre": "espárragos verdes",
      "unidad": "g"
    },
    {
      "cantidad": "1",
      "nombre": "limón",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "aceite de oliva",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal y pimienta",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en grasas",
      "Alta en proteínas",
      "Bajo índice glucémico"
    ]
  },
  "pasos": [
    "Coloca la merluza y los espárragos en una vaporera.",
    "Cocina al vapor durante 10-12 minutos.",
    "Aliña con limón, aceite de oliva, sal y pimienta."
  ],
  "duración": 15,
  "tipo": "comida"
},
{
  "title": "Gazpacho andaluz ligero",
  "description": "Gazpacho andaluz bajo en grasa para 1 persona",
  "image": "https://www.eatthis.com/wp-content/uploads/2020/12/gazpacho.jpg",
  "ingredientes": [
    {
      "cantidad": "2",
      "nombre": "tomates",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "pepino",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "pimiento verde",
      "unidad": "unidades"
    },
    {
      "cantidad": "1",
      "nombre": "diente de ajo",
      "unidad": "unidades"
    },
    {
      "cantidad": "200",
      "nombre": "agua fría",
      "unidad": "ml"
    },
    {
      "cantidad": "1",
      "nombre": "vinagre de vino",
      "unidad": "cucharadas"
    },
    {
      "cantidad": "sal",
      "unidad": "al gusto"
    }
  ],
  "objetivo": {
    "objetivos": [
      "Baja en grasas",
      "Baja en calorías",
      "Vegana"
    ]
  },
  "pasos": [
    "Lava y corta los tomates, pepino y pimiento.",
    "Mezcla todos los ingredientes en una licuadora.",
    "Añade agua fría y vinagre. Sazona al gusto.",
    "Refrigera durante 1 hora antes de servir."
  ],
  "duración": 15,
  "tipo": "media mañana"
},
{
    "title": "Yogur con Frutas y Miel",
    "description": "Un desayuno ligero y saludable para 1 persona",
    "image": "https://example.com/yogur_frutas.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "yogur natural",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "fresas",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "plátano",
            "unidad": "g"
        },
        {
            "cantidad": "10",
            "nombre": "miel",
            "unidad": "g"
        },
        {
            "cantidad": "10",
            "nombre": "semillas de chía",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en fibra",
            "Sin gluten"
        ]
    },
    "pasos": [
        "Lava y corta las fresas y el plátano en rodajas.",
        "En un bol, sirve el yogur natural.",
        "Añade las frutas sobre el yogur.",
        "Rocía con miel y espolvorea las semillas de chía.",
        "Mezcla antes de consumir si lo prefieres."
    ],
    "duración": 5,
    "tipo": "desayuno"
},
{
    "title": "Avena con Manzana y Canela",
    "description": "Un desayuno nutritivo para 1 persona",
    "image": "https://example.com/avena_manzana.jpg",
    "ingredientes": [
        {
            "cantidad": "40",
            "nombre": "avena",
            "unidad": "g"
        },
        {
            "cantidad": "200",
            "nombre": "leche",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "manzana",
            "unidad": "unidades"
        },
        {
            "cantidad": "5",
            "nombre": "canela en polvo",
            "unidad": "g"
        },
        {
            "cantidad": "10",
            "nombre": "miel",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en fibra",
            "Bajo índice glucémico",
            "Sin gluten (si se usa avena certificada)"
        ]
    },
    "pasos": [
        "En una olla, calienta la leche y añade la avena.",
        "Remueve constantemente hasta que la mezcla espese.",
        "Corta la manzana en cubos pequeños.",
        "Sirve la avena en un bol y añade la manzana.",
        "Espolvorea canela y añade miel al gusto."
    ],
    "duración": 10,
    "tipo": "desayuno"
},
{
    "title": "Smoothie Verde de Espinaca y Piña",
    "description": "Una merienda refrescante para 1 persona",
    "image": "https://example.com/smoothie_verde.jpg",
    "ingredientes": [
        {
            "cantidad": "50",
            "nombre": "espinacas frescas",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "piña",
            "unidad": "g"
        },
        {
            "cantidad": "200",
            "nombre": "agua",
            "unidad": "ml"
        },
        {
            "cantidad": "10",
            "nombre": "semillas de chía",
            "unidad": "g"
        },
        {
            "cantidad": "10",
            "nombre": "miel",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en fibra",
            "Vegana"
        ]
    },
    "pasos": [
        "Coloca todos los ingredientes en una licuadora.",
        "Mezcla hasta obtener una consistencia suave.",
        "Sirve y disfruta frío."
    ],
    "duración": 5,
    "tipo": "merienda"
},
{
    "title": "Tostada de Requesón y Tomate",
    "description": "Un desayuno ligero para 1 persona",
    "image": "https://example.com/tostada_requeson.jpg",
    "ingredientes": [
        {
            "cantidad": "1",
            "nombre": "pan integral",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "requesón",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "tomate",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en proteínas",
            "Sin gluten (si se usa pan sin gluten)"
        ]
    },
    "pasos": [
        "Tuesta el pan integral.",
        "Unta el requesón sobre el pan.",
        "Corta el tomate en rodajas finas y colócalo encima.",
        "Rocía aceite de oliva y sazona con sal."
    ],
    "duración": 5,
    "tipo": "desayuno"
},
{
    "title": "Pollo a la Plancha con Verduras Asadas",
    "description": "Una cena saludable y ligera para 1 persona",
    "image": "https://example.com/pollo_verduras.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "pechuga de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "calabacín",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "berenjena",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "pimiento rojo",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal y pimienta",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en proteínas",
            "Baja en carbohidratos"
        ]
    },
    "pasos": [
        "Corta las verduras en rodajas finas.",
        "Rocía las verduras con aceite de oliva, sal y pimienta.",
        "Ásalas en el horno a 200°C durante 20 minutos.",
        "Mientras, cocina la pechuga de pollo a la plancha con un poco de sal.",
        "Sirve el pollo junto con las verduras asadas."
    ],
    "duración": 25,
    "tipo": "cena"
},
{
    "title": "Tortilla de Espinacas y Queso Cottage",
    "description": "Una cena ligera para 1 persona",
    "image": "https://example.com/tortilla_espinacas.jpg",
    "ingredientes": [
        {
            "cantidad": "2",
            "nombre": "huevos",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "espinacas frescas",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "queso cottage",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "sal y pimienta",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Baja en carbohidratos",
            "Baja en calorías"
        ]
    },
    "pasos": [
        "Bate los huevos con sal y pimienta.",
        "Calienta el aceite en una sartén y añade las espinacas.",
        "Cuando las espinacas se reduzcan, añade los huevos batidos.",
        "Cocina hasta que cuaje y añade el queso cottage.",
        "Sirve caliente."
    ],
    "duración": 10,
    "tipo": "cena"
},
{
    "title": "Filete de Ternera a la Plancha con Puré de Batata",
    "description": "Una comida saciante para 1 persona",
    "image": "https://example.com/filete_ternera_pure.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "filete de ternera",
            "unidad": "g"
        },
        {
            "cantidad": "200",
            "nombre": "batata",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "leche",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal y pimienta",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Alta en carbohidratos",
            "Sin gluten"
        ]
    },
    "pasos": [
        "Pela y corta la batata. Cuécela en agua hasta que esté tierna.",
        "Escúrrela y tritúrala con leche para hacer un puré.",
        "Calienta una sartén y cocina el filete al punto deseado.",
        "Sirve el filete junto al puré de batata."
    ],
    "duración": 25,
    "tipo": "comida"
},
{
    "title": "Yogur con Frutas y Semillas",
    "description": "Una opción saludable para media mañana para 1 persona",
    "image": "https://example.com/yogur_frutas.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "yogur natural",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "fresas",
            "unidad": "g"
        },
        {
            "cantidad": "30",
            "nombre": "plátano",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "semillas de chía",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "miel",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Baja en calorías",
            "Baja en grasas"
        ]
    },
    "pasos": [
        "En un bol, añade el yogur natural.",
        "Corta las fresas y el plátano en rodajas y agrégalas al yogur.",
        "Espolvorea las semillas de chía y rocía con miel.",
        "Mezcla y disfruta."
    ],
    "duración": 5,
    "tipo": "media mañana"
},
{
    "title": "Crema de Calabaza con Jengibre",
    "description": "Una cena ligera y reconfortante para 1 persona",
    "image": "https://example.com/crema_calabaza.jpg",
    "ingredientes": [
        {
            "cantidad": "300",
            "nombre": "calabaza",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "zanahoria",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "cebolla",
            "unidad": "unidades"
        },
        {
            "cantidad": "10",
            "nombre": "jengibre fresco",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "caldo de verduras",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en fibra",
            "Vegana"
        ]
    },
    "pasos": [
        "Pela y corta la calabaza, zanahoria y cebolla.",
        "En una olla, calienta el aceite y añade las verduras.",
        "Ralla el jengibre y agrégalo a la olla.",
        "Añade el caldo de verduras y cocina a fuego medio hasta que las verduras estén tiernas.",
        "Tritura todo hasta obtener una crema suave."
    ],
    "duración": 25,
    "tipo": "cena"
},
{
    "title": "Rollitos de Pechuga de Pollo y Espinacas",
    "description": "Una comida alta en proteínas para 1 persona",
    "image": "https://example.com/rollitos_pollo_espinacas.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "pechuga de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "espinacas",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "queso ricotta",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "ajo en polvo",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Baja en carbohidratos",
            "Sin gluten"
        ]
    },
    "pasos": [
        "Extiende las pechugas de pollo y sazónalas.",
        "Rellena con espinacas y queso ricotta.",
        "Enrolla y asegura con palillos.",
        "Cocina en una sartén con aceite de oliva hasta dorar.",
        "Sirve caliente."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Bowl de Quinoa con Mango y Pollo Teriyaki",
    "description": "Una comida fresca y exótica para 1 persona",
    "image": "https://example.com/bowl_quinoa_mango.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "quinoa",
            "unidad": "g"
        },
        {
            "cantidad": "150",
            "nombre": "pechuga de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "mango",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "salsa teriyaki",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "aguacate",
            "unidad": "unidades"
        },
        {
            "cantidad": "10",
            "nombre": "semillas de sésamo",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Alta en fibra",
            "Sin gluten"
        ]
    },
    "pasos": [
        "Cocina la quinoa según las instrucciones del paquete y reserva.",
        "Corta la pechuga de pollo en tiras y saltéala en una sartén con salsa teriyaki.",
        "Pela y corta el mango y el aguacate en láminas.",
        "En un bowl, coloca la quinoa como base y añade el pollo, el mango y el aguacate.",
        "Espolvorea con semillas de sésamo y sirve."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Hummus de Remolacha y Manzana",
    "description": "Un hummus diferente, perfecto para media mañana para 1 persona",
    "image": "https://example.com/hummus_remolacha.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "garbanzos cocidos",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "remolacha cocida",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "manzana verde",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "limón",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "comino en polvo",
            "unidad": "cucharaditas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en grasas",
            "Alta en fibra",
            "Vegana"
        ]
    },
    "pasos": [
        "En una licuadora, mezcla los garbanzos, la remolacha y la manzana.",
        "Añade el aceite de oliva, el zumo de limón y el comino.",
        "Tritura hasta obtener una textura suave.",
        "Sirve con pan integral o vegetales."
    ],
    "duración": 10,
    "tipo": "media mañana"
},
{
    "title": "Smoothie de Espinacas, Piña y Coco",
    "description": "Un desayuno refrescante para 1 persona",
    "image": "https://example.com/smoothie_espinacas.jpg",
    "ingredientes": [
        {
            "cantidad": "50",
            "nombre": "espinacas frescas",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "piña",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "leche de coco",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "semillas de chía",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en fibra",
            "Sin lactosa"
        ]
    },
    "pasos": [
        "Lava las espinacas y corta la piña en trozos.",
        "Añade todos los ingredientes en una licuadora.",
        "Bate hasta obtener una textura suave.",
        "Sirve frío."
    ],
    "duración": 5,
    "tipo": "desayuno"
},
{
    "title": "Wrap de Pollo, Manzana y Mostaza",
    "description": "Una comida rápida y ligera para 1 persona",
    "image": "https://example.com/wrap_pollo_manzana.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "pechuga de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "tortilla integral",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "manzana verde",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "mostaza",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "30",
            "nombre": "rúcula",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en grasas",
            "Alta en proteínas",
            "Sin lactosa"
        ]
    },
    "pasos": [
        "Cocina la pechuga de pollo a la plancha y córtala en tiras.",
        "Lava y corta la manzana en láminas finas.",
        "Extiende la tortilla, añade el pollo, la manzana y la rúcula.",
        "Rocía con mostaza, enrolla y sirve."
    ],
    "duración": 10,
    "tipo": "comida"
},
{
    "title": "Ensalada de Pulpo y Wakame con Vinagreta de Sésamo",
    "description": "Una ensalada marina y exótica para 1 persona",
    "image": "https://example.com/ensalada_pulpo_wakame.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "pulpo cocido",
            "unidad": "g"
        },
        {
            "cantidad": "20",
            "nombre": "alga wakame hidratada",
            "unidad": "g"
        },
        {
            "cantidad": "30",
            "nombre": "pepino",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "salsa de soja",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de sésamo",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "10",
            "nombre": "semillas de sésamo tostadas",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Baja en grasas",
            "Alta en proteínas"
        ]
    },
    "pasos": [
        "Hidrata el alga wakame en agua durante 10 minutos y escúrrela bien.",
        "Corta el pepino en finas rodajas.",
        "En un bowl, mezcla el pulpo cocido, el wakame y el pepino.",
        "Aliña con salsa de soja y aceite de sésamo.",
        "Espolvorea las semillas de sésamo y sirve frío."
    ],
    "duración": 15,
    "tipo": "comida"
},

{
    "title": "Tostada de Paté de Hígado de Bacalao y Encurtidos",
    "description": "Una merienda sofisticada y llena de sabor para 1 persona",
    "image": "https://example.com/tostada_pate_bacalao.jpg",
    "ingredientes": [
        {
            "cantidad": "1",
            "nombre": "rebanada de pan integral",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "paté de hígado de bacalao",
            "unidad": "g"
        },
        {
            "cantidad": "20",
            "nombre": "pepino en vinagre",
            "unidad": "g"
        },
        {
            "cantidad": "10",
            "nombre": "cebolla encurtida",
            "unidad": "g"
        },
        {
            "cantidad": "5",
            "nombre": "alcaparras",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Baja en carbohidratos",
            "Baja en grasas"
        ]
    },
    "pasos": [
        "Tuesta la rebanada de pan integral.",
        "Unta el paté de hígado de bacalao en el pan.",
        "Añade los encurtidos (pepino, cebolla y alcaparras) encima.",
        "Rocía con un poco de aceite de oliva y sirve."
    ],
    "duración": 5,
    "tipo": "merienda"
},

{
    "title": "Curry de Garbanzos y Calabaza con Leche de Coco",
    "description": "Un curry cremoso y especiado para 1 persona",
    "image": "https://example.com/curry_garbanzos_calabaza.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "garbanzos cocidos",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "calabaza",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "leche de coco",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "pasta de curry rojo",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "10",
            "nombre": "cilantro fresco",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de coco",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Vegana",
            "Baja en grasas",
            "Sin gluten"
        ]
    },
    "pasos": [
        "Corta la calabaza en cubos pequeños.",
        "Calienta el aceite de coco en una sartén y añade la pasta de curry.",
        "Añade la calabaza y cocina hasta que esté tierna.",
        "Incorpora los garbanzos y la leche de coco.",
        "Deja cocinar a fuego lento durante 15 minutos.",
        "Sirve con cilantro fresco por encima."
    ],
    "duración": 25,
    "tipo": "comida"
},
{
    "title": "Crepes de Harina de Almendra y Yogur Griego",
    "description": "Un desayuno sin gluten y bajo en carbohidratos para 1 persona",
    "image": "https://example.com/crepes_harina_almendra.jpg",
    "ingredientes": [
        {
            "cantidad": "50",
            "nombre": "harina de almendra",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "huevos",
            "unidad": "unidades"
        },
        {
            "cantidad": "100",
            "nombre": "yogur griego",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "miel",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de coco",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Bajo en carbohidratos",
            "Sin gluten",
            "Alta en proteínas"
        ]
    },
    "pasos": [
        "En un bowl, mezcla la harina de almendra y los huevos.",
        "Calienta el aceite de coco en una sartén y añade la mezcla para formar crepes.",
        "Cocina por ambos lados hasta dorar.",
        "Sirve con yogur griego y miel por encima."
    ],
    "duración": 15,
    "tipo": "desayuno"
},
{
    "title": "Tartar de Atún con Mango y Sriracha",
    "description": "Un tartar fresco y picante para 1 persona",
    "image": "https://example.com/tartar_atun_mango.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "atún fresco",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "mango",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "salsa sriracha",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "salsa de soja",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "10",
            "nombre": "cebolla morada",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "sésamo tostado",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en carbohidratos",
            "Alta en proteínas",
            "Baja en calorías"
        ]
    },
    "pasos": [
        "Corta el atún y el mango en cubos pequeños.",
        "Mezcla con la sriracha, soja y cebolla picada.",
        "Sirve y espolvorea con sésamo."
    ],
    "duración": 10,
    "tipo": "comida"
},
{
    "title": "Avena Nocturna con Frutas y Miel",
    "description": "Un desayuno saludable y rápido para 1 persona",
    "image": "https://example.com/avena_nocturna.jpg",
    "ingredientes": [
        {
            "cantidad": "50",
            "nombre": "avena",
            "unidad": "g"
        },
        {
            "cantidad": "150",
            "nombre": "leche de almendras",
            "unidad": "ml"
        },
        {
            "cantidad": "50",
            "nombre": "frutas (fresas y plátano)",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "miel",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "5",
            "nombre": "semillas de chía",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en fibra",
            "Bajo en grasas",
            "Bajo índice glucémico"
        ]
    },
    "pasos": [
        "En un recipiente, mezcla la avena con la leche de almendras y las semillas de chía.",
        "Deja reposar en el refrigerador durante al menos 4 horas o toda la noche.",
        "Antes de servir, añade las frutas frescas y la miel."
    ],
    "duración": 5,
    "tipo": "desayuno"
},
{
    "title": "Pasta al Pesto con Pollo",
    "description": "Un plato clásico y delicioso de pasta para 1 persona",
    "image": "https://example.com/pasta_pesto.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "pasta (espagueti o fusilli)",
            "unidad": "g"
        },
        {
            "cantidad": "150",
            "nombre": "pechuga de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "salsa pesto",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "20",
            "nombre": "queso parmesano",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal y pimienta",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Alta en calorías",
            "Alta en carbohidratos"
        ]
    },
    "pasos": [
        "Cocina la pasta en agua con sal hasta que esté al dente.",
        "Mientras tanto, cocina la pechuga de pollo a la plancha con sal y pimienta.",
        "Escurre la pasta y mezcla con la salsa pesto.",
        "Corta el pollo en tiras y agrégalo a la pasta.",
        "Sirve con queso parmesano rallado por encima."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Yogur Griego con Miel y Nueces",
    "description": "Un desayuno o merienda saludable para 1 persona",
    "image": "https://example.com/yogur_miel_nueces.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "yogur griego",
            "unidad": "g"
        },
        {
            "cantidad": "20",
            "nombre": "miel",
            "unidad": "g"
        },
        {
            "cantidad": "20",
            "nombre": "nueces",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Bajo índice glucémico",
            "Bajo en grasas"
        ]
    },
    "pasos": [
        "Sirve el yogur griego en un bowl.",
        "Rocía con miel por encima.",
        "Añade las nueces troceadas y sirve."
    ],
    "duración": 5,
    "tipo": "desayuno"
},
{
    "title": "Hamburguesa Doble con Queso y Bacon",
    "description": "Una hamburguesa jugosa y llena de sabor para 1 persona",
    "image": "https://example.com/hamburguesa_doble.jpg",
    "ingredientes": [
        {
            "cantidad": "200",
            "nombre": "carne de res molida",
            "unidad": "g"
        },
        {
            "cantidad": "4",
            "nombre": "lonchas de queso cheddar",
            "unidad": "unidades"
        },
        {
            "cantidad": "3",
            "nombre": "lonchas de bacon",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "pan de hamburguesa",
            "unidad": "unidades"
        },
        {
            "cantidad": "2",
            "nombre": "cucharadas de mayonesa",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "lechuga",
            "unidad": "hoja"
        },
        {
            "cantidad": "1",
            "nombre": "tomate en rodajas",
            "unidad": "unidades"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Forma dos hamburguesas con la carne molida y sazona con sal y pimienta.",
        "Cocina las hamburguesas en una sartén hasta que estén doradas.",
        "Agrega las lonchas de queso cheddar sobre cada hamburguesa mientras están calientes.",
        "Cocina el bacon hasta que esté crujiente.",
        "Arma la hamburguesa: pan, mayonesa, lechuga, tomate, hamburguesa, queso, bacon y otra hamburguesa.",
        "Cierra con la tapa del pan y disfruta."
    ],
    "duración": 15,
    "tipo": "comida"
},
{
    "title": "Hamburguesa Doble con Queso y Bacon",
    "description": "Una hamburguesa jugosa y llena de sabor para 1 persona",
    "image": "https://example.com/hamburguesa_doble.jpg",
    "ingredientes": [
        {
            "cantidad": "200",
            "nombre": "carne de res molida",
            "unidad": "g"
        },
        {
            "cantidad": "4",
            "nombre": "lonchas de queso cheddar",
            "unidad": "unidades"
        },
        {
            "cantidad": "3",
            "nombre": "lonchas de bacon",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "pan de hamburguesa",
            "unidad": "unidades"
        },
        {
            "cantidad": "2",
            "nombre": "cucharadas de mayonesa",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "lechuga",
            "unidad": "hoja"
        },
        {
            "cantidad": "1",
            "nombre": "tomate en rodajas",
            "unidad": "unidades"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Forma dos hamburguesas con la carne molida y sazona con sal y pimienta.",
        "Cocina las hamburguesas en una sartén hasta que estén doradas.",
        "Agrega las lonchas de queso cheddar sobre cada hamburguesa mientras están calientes.",
        "Cocina el bacon hasta que esté crujiente.",
        "Arma la hamburguesa: pan, mayonesa, lechuga, tomate, hamburguesa, queso, bacon y otra hamburguesa.",
        "Cierra con la tapa del pan y disfruta."
    ],
    "duración": 15,
    "tipo": "comida"
},
{
    "title": "Brownie de Chocolate con Helado",
    "description": "Un postre delicioso para 1 persona",
    "image": "https://example.com/brownie_helado.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "chocolate negro",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "mantequilla",
            "unidad": "g"
        },
        {
            "cantidad": "80",
            "nombre": "azúcar",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "huevo",
            "unidad": "unidades"
        },
        {
            "cantidad": "40",
            "nombre": "harina",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "bolas de helado de vainilla",
            "unidad": "unidades"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en azúcares"
        ]
    },
    "pasos": [
        "Derrite el chocolate y la mantequilla al baño maría.",
        "Agrega el azúcar y mezcla bien.",
        "Incorpora el huevo y mezcla nuevamente.",
        "Añade la harina y mezcla hasta obtener una masa homogénea.",
        "Vierte la mezcla en un molde y hornea a 180°C durante 15-20 minutos.",
        "Sirve caliente con una bola de helado de vainilla."
    ],
    "duración": 30,
    "tipo": "merienda"
},
{
    "title": "Nachos con Queso y Guacamole",
    "description": "Un snack delicioso para 2 personas",
    "image": "https://example.com/nachos_queso.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "nachos",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "queso cheddar derretido",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "guacamole",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "jalapeños",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en grasas",
            "Alta en calorías"
        ]
    },
    "pasos": [
        "Coloca los nachos en un plato para hornear.",
        "Cubre con el queso cheddar derretido.",
        "Agrega el guacamole y los jalapeños por encima.",
        "Sirve inmediatamente."
    ],
    "duración": 10,
    "tipo": "media mañana"
},

{
    "title": "Tarta de Queso con Caramelo",
    "description": "Una tarta suave y dulce para 2 personas",
    "image": "https://example.com/tarta_queso.jpg",
    "ingredientes": [
        {
            "cantidad": "200",
            "nombre": "queso crema",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "azúcar",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "huevos",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "galletas trituradas",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "mantequilla derretida",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "caramelo líquido",
            "unidad": "g"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Precalienta el horno a 180°C.",
        "Mezcla las galletas trituradas con la mantequilla y forma la base.",
        "Bate el queso crema con el azúcar y los huevos.",
        "Vierte la mezcla sobre la base de galletas.",
        "Hornea por 25 minutos y deja enfriar.",
        "Sirve con caramelo por encima."
    ],
    "duración": 40,
    "tipo": "merienda"
},
{
    "title": "Pancakes con Nutella y Plátano",
    "description": "Un desayuno dulce para 1 persona",
    "image": "https://example.com/pancakes_nutella.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "harina de trigo",
            "unidad": "g"
        },
        {
            "cantidad": "150",
            "nombre": "leche",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "huevo",
            "unidad": "unidades"
        },
        {
            "cantidad": "2",
            "nombre": "cucharadas de Nutella",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "plátano",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "mantequilla",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en azúcares"
        ]
    },
    "pasos": [
        "Mezcla la harina, el huevo y la leche en un bol hasta obtener una masa suave.",
        "Calienta una sartén y agrega un poco de mantequilla.",
        "Vierte pequeñas porciones de masa para formar los pancakes.",
        "Cocina hasta que aparezcan burbujas, voltea y cocina por el otro lado.",
        "Sirve los pancakes con Nutella y rodajas de plátano."
    ],
    "duración": 15,
    "tipo": "desayuno"
},
{
    "title": "Hot Dog con Bacon y Queso",
    "description": "Un hot dog lleno de sabor para 1 persona",
    "image": "https://example.com/hotdog_bacon_queso.jpg",
    "ingredientes": [
        {
            "cantidad": "1",
            "nombre": "pan de hot dog",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "salchicha grande",
            "unidad": "unidades"
        },
        {
            "cantidad": "2",
            "nombre": "lonchas de bacon",
            "unidad": "unidades"
        },
        {
            "cantidad": "2",
            "nombre": "queso cheddar",
            "unidad": "lonchas"
        },
        {
            "cantidad": "2",
            "nombre": "cucharadas de mayonesa",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Envuelve la salchicha con las lonchas de bacon y cocina hasta que estén crujientes.",
        "Calienta el pan de hot dog y coloca la salchicha envuelta en bacon.",
        "Agrega el queso cheddar para que se derrita.",
        "Añade mayonesa al gusto y sirve."
    ],
    "duración": 10,
    "tipo": "merienda"
},
{
    "title": "Pollo Frito Crujiente",
    "description": "Un plato de pollo frito para 2 personas",
    "image": "https://example.com/pollo_frito.jpg",
    "ingredientes": [
        {
            "cantidad": "500",
            "nombre": "alitas de pollo",
            "unidad": "g"
        },
        {
            "cantidad": "200",
            "nombre": "harina de trigo",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "huevos",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "cucharaditas"
        },
        {
            "cantidad": "1",
            "nombre": "pimienta negra",
            "unidad": "cucharaditas"
        },
        {
            "cantidad": "500",
            "nombre": "aceite para freír",
            "unidad": "ml"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Sazona las alitas de pollo con sal y pimienta.",
        "Bate los huevos en un bol y pasa las alitas por el huevo.",
        "Empaniza las alitas en la harina.",
        "Calienta el aceite y fríe las alitas hasta que estén doradas y crujientes.",
        "Retira el exceso de aceite con papel absorbente y sirve."
    ],
    "duración": 25,
    "tipo": "comida"
},
{
    "title": "Quesadilla de Pollo y Queso",
    "description": "Una cena rápida y deliciosa para 1 persona",
    "image": "https://example.com/quesadilla.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "pollo cocido desmenuzado",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "tortillas de trigo",
            "unidad": "unidades"
        },
        {
            "cantidad": "100",
            "nombre": "queso rallado",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "cucharada de aceite",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en grasas"
        ]
    },
    "pasos": [
        "Calienta una sartén con el aceite.",
        "Coloca una tortilla y añade el pollo y el queso.",
        "Cubre con otra tortilla y cocina hasta que esté dorada.",
        "Voltea y cocina por el otro lado.",
        "Sirve cortada en triángulos."
    ],
    "duración": 10,
    "tipo": "cena"
},
{
    "title": "Donuts Glaseados",
    "description": "Un dulce irresistible para 1 persona",
    "image": "https://example.com/donuts.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "harina de trigo",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "azúcar",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "huevo",
            "unidad": "unidades"
        },
        {
            "cantidad": "100",
            "nombre": "leche",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "mantequilla",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "200",
            "nombre": "aceite para freír",
            "unidad": "ml"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en calorías",
            "Alta en azúcares"
        ]
    },
    "pasos": [
        "Mezcla la harina, el azúcar, el huevo y la leche.",
        "Forma una masa y amasa bien.",
        "Corta en forma de donuts y fríe en aceite caliente.",
        "Deja enfriar y decora con glaseado."
    ],
    "duración": 20,
    "tipo": "merienda"
},
{
    "title": "Pasta con Salsa de Tomate",
    "description": "Un plato sencillo y rápido para 1 persona",
    "image": "https://example.com/pasta_salsa_tomate.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "pasta",
            "unidad": "g"
        },
        {
            "cantidad": "150",
            "nombre": "tomate triturado",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "diente de ajo",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "albahaca",
            "unidad": "ramitas"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "cucharaditas"
        },
        {
            "cantidad": "1",
            "nombre": "pimienta",
            "unidad": "cucharaditas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en grasas",
            "Baja en calorías",
            "Alta en carbohidratos"
        ]
    },
    "pasos": [
        "Cocina la pasta según las instrucciones del paquete.",
        "Sofríe el ajo picado en aceite hasta que esté dorado.",
        "Añade el tomate triturado, sal, pimienta y albahaca.",
        "Deja cocinar a fuego lento unos minutos.",
        "Mezcla la salsa con la pasta cocida y sirve."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Tacos de Carne Asada",
    "description": "Tacos sabrosos y rápidos para 1 persona",
    "image": "https://example.com/tacos_carne_asada.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "carne asada",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "tortillas de maíz",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "cebolla morada",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "cilantro fresco",
            "unidad": "ramitas"
        },
        {
            "cantidad": "1",
            "nombre": "limón",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "salsa de chile",
            "unidad": "cucharadas"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Alta en proteínas",
            "Moderada en calorías"
        ]
    },
    "pasos": [
        "Cocina la carne asada a la parrilla o en una sartén.",
        "Calienta las tortillas y corta la carne en trozos pequeños.",
        "Pica la cebolla y el cilantro.",
        "Rellena las tortillas con la carne, cebolla, cilantro y un poco de salsa.",
        "Añade jugo de limón y disfruta."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Sándwich de Atún",
    "description": "Un sándwich sencillo y nutritivo para 1 persona",
    "image": "https://example.com/sandwich_atun.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "atún en conserva",
            "unidad": "g"
        },
        {
            "cantidad": "2",
            "nombre": "rebanadas de pan integral",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "hoja de lechuga",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "cucharada de mayonesa",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "tomate",
            "unidad": "unidades"
        }
    ],
    "objetivo": {
        "objetivos": [
            "Baja en calorías",
            "Alta en proteínas"
        ]
    },
    "pasos": [
        "Escurre el atún y mézclalo con la mayonesa.",
        "Coloca las rebanadas de pan y pon la mezcla de atún.",
        "Añade lechuga y rodajas de tomate.",
        "Cubre con la otra rebanada de pan y sirve."
    ],
    "duración": 10,
    "tipo": "comida"
},
{
    "title": "Carne de Cochino a la Plancha",
    "description": "Un plato sencillo y sabroso de carne de cochino",
    "image": "https://example.com/carne_cochino.jpg",
    "ingredientes": [
        {
            "cantidad": "200",
            "nombre": "carne de cochino",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "diente de ajo",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "cucharaditas"
        },
        {
            "cantidad": "1",
            "nombre": "pimienta",
            "unidad": "cucharaditas"
        }
    ],
    "pasos": [
        "Sazona la carne de cochino con sal, pimienta y ajo picado.",
        "Calienta una sartén con el aceite de oliva.",
        "Cocina la carne de cochino por ambos lados hasta que esté bien dorada y cocida al gusto."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Medallones de Solomillo",
    "description": "Medallones jugosos de solomillo a la plancha",
    "image": "https://example.com/medallones_solomillo.jpg",
    "ingredientes": [
        {
            "cantidad": "200",
            "nombre": "solomillo de cerdo",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "cucharaditas"
        },
        {
            "cantidad": "1",
            "nombre": "pimienta",
            "unidad": "cucharaditas"
        }
    ],
    "pasos": [
        "Sazona los medallones de solomillo con sal y pimienta.",
        "Calienta una sartén con aceite de oliva.",
        "Cocina los medallones de solomillo por ambos lados hasta que estén dorados y cocidos a tu gusto."
    ],
    "duración": 15,
    "tipo": "comida"
},
{
    "title": "Marmitako de Atún",
    "description": "Un guiso tradicional del País Vasco con atún",
    "image": "https://example.com/marmitako_atun.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "atún fresco",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "patata",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "pimiento verde",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "tomate",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "cebolla",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "agua",
            "unidad": "ml"
        }
    ],
    "pasos": [
        "Sofríe la cebolla y el pimiento picados en aceite de oliva.",
        "Añade el tomate picado y las patatas en trozos.",
        "Vierte agua suficiente para cubrir las verduras y deja cocer hasta que las patatas estén tiernas.",
        "Añade el atún en trozos y cocina por unos minutos más.",
        "Rectifica de sal y pimienta antes de servir."
    ],
    "duración": 35,
    "tipo": "comida"
},
{
    "title": "Croquetas de Jamón",
    "description": "Deliciosas croquetas caseras con jamón",
    "image": "https://example.com/croquetas_jamon.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "jamón serrano",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "leche",
            "unidad": "ml"
        },
        {
            "cantidad": "50",
            "nombre": "mantequilla",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "harina",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "huevo",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "pan rallado",
            "unidad": "g"
        }
    ],
    "pasos": [
        "Derrite la mantequilla en una sartén, añade la harina y cocina unos minutos.",
        "Vierte la leche poco a poco y remueve hasta que espese.",
        "Añade el jamón picado y mezcla bien.",
        "Deja enfriar la masa, forma las croquetas, pásalas por huevo batido y pan rallado.",
        "Fría las croquetas en aceite caliente hasta que estén doradas."
    ],
    "duración": 45,
    "tipo": "comida"
},
{
    "title": "Lentejas Estofadas",
    "description": "Un guiso de lentejas sencillo y nutritivo",
    "image": "https://example.com/lentejas_estofadas.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "lentejas",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "zanahoria",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "pimiento verde",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "tomate",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "agua",
            "unidad": "ml"
        }
    ],
    "pasos": [
        "Sofríe la zanahoria, el pimiento y el tomate picados en aceite.",
        "Añade las lentejas y suficiente agua para cubrirlas.",
        "Cocina a fuego lento durante 40 minutos o hasta que las lentejas estén tiernas.",
        "Sazona al gusto con sal y pimienta antes de servir."
    ],
    "duración": 50,
    "tipo": "comida"
},
{
    "title": "Garbanzada",
    "description": "Un delicioso guiso de garbanzos con chorizo",
    "image": "https://example.com/garbanzada.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "garbanzos",
            "unidad": "g"
        },
        {
            "cantidad": "100",
            "nombre": "chorizo",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "tomate",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "agua",
            "unidad": "ml"
        }
    ],
    "pasos": [
        "Sofríe el chorizo y el tomate picado en aceite.",
        "Añade los garbanzos cocidos y suficiente agua para cubrir.",
        "Cocina durante 30-40 minutos hasta que todo esté bien cocido.",
        "Rectifica de sal y pimienta antes de servir."
    ],
    "duración": 45,
    "tipo": "comida"
},
{
    "title": "Potaje de Berros",
    "description": "Un reconfortante potaje con berros y verduras",
    "image": "https://example.com/potaje_berros.jpg",
    "ingredientes": [
        {
            "cantidad": "100",
            "nombre": "berros",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "patata",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "zanahoria",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "agua",
            "unidad": "ml"
        }
    ],
    "pasos": [
        "Sofríe la zanahoria y la patata en trozos en aceite.",
        "Añade agua y deja cocinar hasta que las verduras estén tiernas.",
        "Añade los berros y cocina 10 minutos más.",
        "Sazona con sal y pimienta al gusto."
    ],
    "duración": 40,
    "tipo": "comida"
},
{
    "title": "Berenjenas Fritas",
    "description": "Berenjenas crujientes y sabrosas, perfectas como acompañamiento o tapa.",
    "image": "https://example.com/berenjenas_fritas.jpg",
    "ingredientes": [
        {
            "cantidad": "1",
            "nombre": "berenjena",
            "unidad": "unidades"
        },
        {
            "cantidad": "1",
            "nombre": "huevo",
            "unidad": "unidades"
        },
        {
            "cantidad": "50",
            "nombre": "pan rallado",
            "unidad": "g"
        },
        {
            "cantidad": "50",
            "nombre": "harina",
            "unidad": "g"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        }
    ],
    "pasos": [
        "Corta las berenjenas en rodajas finas.",
        "Pásalas primero por harina, luego por huevo batido y finalmente por pan rallado.",
        "Fríe las berenjenas en aceite caliente hasta que estén doradas y crujientes.",
        "Sírvelas calientes, como aperitivo o acompañamiento."
    ],
    "duración": 20,
    "tipo": "comida"
},
{
    "title": "Gofio Escaldado",
    "description": "Plato tradicional de Canarias, hecho con gofio y caldo de pescado o carne.",
    "image": "https://example.com/gofio_escaldado.jpg",
    "ingredientes": [
        {
            "cantidad": "150",
            "nombre": "gofio",
            "unidad": "g"
        },
        {
            "cantidad": "500",
            "nombre": "caldo de pescado o carne",
            "unidad": "ml"
        },
        {
            "cantidad": "1",
            "nombre": "aceite de oliva",
            "unidad": "cucharadas"
        },
        {
            "cantidad": "1",
            "nombre": "sal",
            "unidad": "cucharadita"
        }
    ],
    "pasos": [
        "Calienta el caldo de pescado o carne en una olla.",
        "Cuando el caldo esté caliente, añade el gofio poco a poco, removiendo constantemente para evitar que se formen grumos.",
        "Cocina a fuego lento durante unos 5 minutos, removiendo para que el gofio se hidrate bien.",
        "Añade sal y un chorrito de aceite de oliva para darle más sabor.",
        "Sirve el gofio escaldado como acompañante o como plato principal."
    ],
    "duración": 15,
    "tipo": "comida"
}






































]

  };

  try {
    await setDoc(ref, sugerencias, { merge: true });
    console.log("Sugerencias agregadas correctamente.");
  } catch (error) {
    console.error("Error al agregar sugerencias:", error);
  }
};
