const fs = require('fs');
const path = require('path');

const model = function(jsonFile){

    const functions = {
        path: path.join(__dirname, '..', 'data', jsonFile, '.json'),

        readJson: function(){
            let products = fs.readFileSync(this.path, 'utf-8');
            products = JSON.parse(products);
            return products;
        },

        writeJson: function(products){
            products = JSON.stringify(products);
            return fs.writeFileSync(this.path, products, 'utf-8');
        }

    }
    
    return functions;


}

module.exports = model;