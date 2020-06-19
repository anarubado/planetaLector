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
        },

        getNProducts: function(quantityProducts){
            let products = this.readJson();
            let nProducts = [];
            for (let i = 0; i < quantityProducts; i++){
                nProducts.push(products[i]);
            }

            return nProducts;
        },

        processSlideProducts: function(quantityProducts, nItemsPerSlide){

            let slideProducts = this.getNProducts(quantityProducts);
            let products = [];
            
            let position = 0;
            
            while((position + nItemsPerSlide) < slideProducts.length){
                let product = [];
                for (let i = position; i < nItemsPerSlide + position; i++){
                    product.push(

                        `<div class = 'col-xs-12 col-md-6 col-lg-4'>
                            <div>
                                <img src="${slideProducts[i].imagen}" class="d-block w-100" alt="...">
                                <p>${slideProducts[i].titulo}</p>
                            </div>                    
                        </div>`
                    )                    
                }
                products.push(product);
                position += nItemsPerSlide;
            }

            return products;           
                       
        }


    }
    
    return functions;


}

module.exports = model;