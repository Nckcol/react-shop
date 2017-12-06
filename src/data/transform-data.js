let fs = require('fs')
let chalk = require('chalk')
let input = require('./result.json')

let output = {
  products: input.products.map(
    (product, index) => ({
      id: index,
      sku: product.sku,
      available: product.availability,
      brand: product.brand,
      title: product.title,
      description: product.description,
      price: product.price,
      properties: product.properties.map(
        (property, index) => ({
          id: index,
          title: property.title,
          value: property.value
        })
      ),
      photos: product.photos
    })
  )
}

fs.writeFile('./data.json', JSON.stringify(output), (error) => {
  if(error) throw new Error(error)

  console.log(chalk.green.bold('Successful!'))
})