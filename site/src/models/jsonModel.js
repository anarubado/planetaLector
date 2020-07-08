const fs = require("fs");
const path = require("path");

const model = function (jsonFile) {
  const functions = {
    path: path.join(__dirname, "..", "data", jsonFile),

    readJson: function () {
      let products = fs.readFileSync(this.path, "utf-8");
      products = JSON.parse(products);
      return products;
    },

    writeJson: function (products) {
      products = JSON.stringify(products, null, ' ');
      return fs.writeFileSync(this.path, products );
    },

    saveOne: function (newData) {
      // Leer todo el json
      let allData = this.readJson();
      // Agregar la data
      allData = [...allData, newData];
      // Guarar la data
      this.writeJson(allData);
    },

    search: function (search) {
      let products = this.readJson();
      let searchedProducts = products.filter(function (product) {
        return (
          product.titulo.includes(search) || product.autor.includes(search)
        ); // Filtra segun palabras que puedan aparecer en el titulo o en el nombre del autor
      });

      return searchedProducts;
    },

    getNProducts: function (quantityProducts) {
      let products = this.readJson();
      let nProducts = [];
      for (let i = 0; i < quantityProducts; i++) {
        nProducts.push(products[i]);
      }

      return nProducts;
    },

    getNItemsSlide: function () {
      // Esto es imposible ya que claramente no se puede traer de forma sencilla informacion del navegador al backend ;(
      //if(window.screen.width <= 425){
      //return 1;
      //} else if (window.screen.width >= 426 && window.screen.width <= 768){
      //return 3;
      //}
      //return 5;
    },

    processSlideProducts: function (quantityProducts, nItemsPerSlide) {
      // EXPLICACION (Activar MODO PACIENCIA) //

      let slideProducts = this.getNProducts(quantityProducts); // Trae un array con N productos desde products.json
      let products = []; // Crea un array products el cual va a contener arrayS con la cantidad de divs que queramos mostrar...
      //... respetando la cantidad de productos en slideProducts.

      // CADA DIV representa la estructura HTML de 1 LIBRO
      // Podria en mobile, querer que haya 1 div por slide, o en tablet querer que haya 3 por ejemplo

      // Ejemplo, output en tablet (3 productos por slide, 15 productos en total ):

      // products = [ [{div}, {div}, {div}] , [{div}, {div}, {div}] , [{div}, {div}, {div}] , [{div}, {div}, {div}] , [{div}, {div}, {div}] ]

      // La CANTIDAD de veces que doy slide, seria la cantidad de arrays DENTRO de products.

      // El chiste sera poder crear tantos carrousel-items como cantidad de arrays tenga products (en el ejemplo, son 5)

      // La creacion de los carrousel-items se la delegue a la vista slide.ejs

      //-------------------------

      // Supongamos que pido 15 productos y quiero visualizarlos como 3 productos por slide. Podre hacer 5 vueltas de slide, efectivamente.

      // [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15] ]

      let position = 0; // Comienzo la posicion del array de products en cero

      // Con este while, quiero que me agregue mis DIVS organizados en la cantidad de arrays que decida y que PARE cuando esté en el "inicio" del ultimo array

      // Explicacion del flujo:

      // position se movera asi

      // [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15] ]

      //    |----------|----------|----------|--------------|

      // position = 0----position = 3----position = 6----position = 9----position = 12
      // Aumenta de 3 en 3
      // En este caso, parara cuando la posicion se incremente a 15. No entrara en el while de nuevo, y solo retornara el array products

      while (position + nItemsPerSlide < slideProducts.length) {
        let slide = [];

        // Con el siguiente for, estoy seteando que SIEMPRE se agreguen a mi slide, en este caso, 3 DIVS. Lo hago incrementando el numero de la posicion

        // Demostracion:

        // i = position = 0;    nitemsPerSlide = 3;    i < 3 + 0 --> El for itera 3 veces!

        // i = position = 3;    nitemsPerSlide = 3;    i < 3 + 3 --> El for sigue iterando 3 veces! Desde la posicion 3 hasta la 6

        for (let i = position; i < nItemsPerSlide + position; i++) {
          slide.push(
            `<div class = 'col-xs-12 col-md-6 col-lg-4'>
                            <div>
                                <img src="${slideProducts[i].imagen}" class="d-block w-100" alt="...">
                                <p>${slideProducts[i].titulo}</p>
                            </div>                    
                        </div>`
          );
        }
        products.push(slide); // Pushea en el array products el slide de 3 libros ya listo
        position += nItemsPerSlide; // Aca se cambiaria de 3 en 3 la posicion
      }

      return products; // Retorna el array products terminado

      // Dadas las complicaciones, se cancela la implementacion del metodo por no poder manejar los viewports facilmente desde el back. Quizas en el futuro, se encuentre una manera.
      // Ante la decepcion, se usara UIkit como fue recomendado por Gonza y a llorar a la lloreria.
    },

    filterNProducts: function (keywords, nProducts) {
      let products = this.readJson(); // Lee el JSON y lo convierte en objeto literal

      products = products.filter(function (product) {
        return (
          product.titulo.includes(keywords) ||
          product.autor.includes(keywords) ||
          product.categoria.includes(keywords) ||
          product.subcategoria.includes(keywords)
        ); // Filtra por titulo, autor, categoria o subcategoria
      });

      products.splice(nProducts + 1, products.length); // Ejemplo: Queremos un array de 15 productos, entonces se hace un splice desde la posicion 16 del array hasta la ultima, .length nos da el numero de posicion 'no inclusive' el cual podra borrar todos los productos sobrantes.

      return products;
    },

    findBySomething: function (callback) {
      let content = this.readJson();

      let element = content.find(callback);

      return element;
    },

    filterBySomething: function(callback){
      let content = this.readJson();
      let element = content.filter(callback);

      return element;
    }
  };

  return functions;
};

module.exports = model;
