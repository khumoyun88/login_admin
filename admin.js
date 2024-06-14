import { checkToken, logout, redirect } from "./utils.js";





const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const logOut = document.getElementById("btn")

logOut.onclick = logout

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();

  if (!hasToken) {
    redirect("/login.html");
  }
});

const form = document.forms[0];
const products = [];

form.onsubmit = function(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: title.value,
    price: price.value,
    description: description.value,
  }

  title.value = '';
  price.value = '';
  description.value = '';

  products.push(newProduct);

  const productsString = JSON.stringify(products);
  localStorage.setItem('products', productsString);

  showProducts()
}

function showProducts() {

    const productsString = localStorage.getItem('products');
    const products = JSON.parse(productsString);

    
    const $listProducts = document.getElementById("products")
    $listProducts.innerHTML = ""

    products.forEach(product => {

        const $listProduct = document.createElement('div')
        $listProducts.append($listProduct)



      const $title = document.createElement("h2")
      $title.textContent = product.title
      $listProduct.append($title)
  
      const $price = document.createElement("h3")
      $price.textContent = ` ${product.price}$`
      $listProduct.append($price)
  
      const $description = document.createElement("p")
      $description.textContent = product.description
      $listProduct.append($description)

      // const $deleteBtn = document.createElement("button")
      // $deleteBtn.textContent = "Delete"
      // $listProduct.append($deleteBtn)
  
    });

}

showProducts()

