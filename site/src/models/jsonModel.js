const fs = require('fs');
const path = require('path');

const model = function(jsonFile){

    const functions = {
        path: path.join(__dirname, '..', 'data', jsonFile),

        readJson: function(){
            let products = fs.readFileSync(this.path, 'utf-8');
            products = JSON.parse(products);
            return products;
        },

        writeJson: function(products){
            products = JSON.stringify(products);
            return fs.writeFileSync(this.path, products, 'utf-8');
        },

        search: function(search){
            let products = this.readJson();
            let searchedProducts = products.filter(function(product){
                return product.titulo.includes(search) || product.autor.includes(search); // Filtra segun palabras que puedan aparecer en el titulo o en el nombre del autor
            });

            return searchedProducts;
        }



    }
    
    return functions;


}

module.exports = model;