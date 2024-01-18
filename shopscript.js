console.log(products)

let productsHTML = "<h2>Ninjago</h2>"

products.map(product => productsHTML += `<article>
<img src="website_images/PROD_${product.imagefile}" alt="${product.title}"/>
<a href="#">${product.category}</a>
<h3>${product.title}</h3>
<span>Kr. ${product.price}</span>
<button onclick="addToCart(${product.prodid})">Legg i handlekurv</button>
</article>`)

const main = document.getElementsByTagName("main")

main[0].innerHTML = productsHTML

// Handlevognfunksjonalitet 
document.getElementById("carttoggle").addEventListener("click", function() {
    const cart = document.getElementById("cart")
    cart.classList.toggle("show")
})

function addToCart(productid) {
    //console.log("addToCart kjører: " + productid)

    let exist = cart.findIndex(p => productid === p.product)
    console.log("exist: " + exist)

    if(exist === -1) {
        cart.push({product: productid, quantity: 1})
    } else {
        cart[exist].quantity += 1 
    }

    
    console.log(cart)

    updateCartDisplay()
}

function updateCartDisplay(){

    let cartCount = 0

    cart.map(p => cartCount += p.quantity)
    document.getElementById("cartCount").innerHTML = cartCount

    let cartHTML = ""

    if(cart.length === 0){
        cartHTML += "<li>Du har ingen produkter i handlevognen</li>"
    } else{
        cart.map((prod, index) => {
            let filterProduct = products.filter(filterprod => prod.product === filterprod.prodid)
            console.log(filterProduct)
            cartHTML += ` <li>
                <span class="title">${filterProduct[0].title}</span>
                <span class="price">${filterProduct[0].price}</span>
                <span class="quantity">${prod.quantity}</span>
                <span class="functions">
                    <button onclick="removeFromCart(${index})">X</button>
                </span>
            </li>`
            })
    }
    document.getElementById("cartlist").innerHTML = cartHTML
}

function removeFromCart(index){
    console.log("Removing " + index)

    if(cart[index].quantity > 1) {
        cart[index].quantity -= 1
    } else{
        cart.splice(index,1)
    }

    updateCartDisplay()
}

updateCartDisplay()