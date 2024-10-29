// import data array which contains the menu
import { menuArray } from './data.js'

// define UI elements
const mainEl = document.querySelector("main")
const footerEl = document.querySelector("footer")
const orderDetailsEl = document.getElementById("orderDetails")
const totalEl = document.getElementById("total")
const enterCardDetailsEl = document.getElementById("enterCardDetails")

let order = []

// initiate total to $0
let total

// Display each item in the array
menuArray.forEach(displayMenu)

// each item in menuArray becomes item and is passed to displayMenu
function displayMenu(item) {
    
    // join the ingredients array into a string
    const ingredients = (item.ingredients).join(", ");

    mainEl.innerHTML += `
    <section class="menuItem" id="${item.id}"> 
        <div class="itemDescription" >
            <div id="emoji">
                <h1>${item.emoji}</h1>
            </div>
            <div>
                <h1>${item.name}</h1>
                <p>${ingredients}</p>
                <p>$${item.price}</p>
            </div>
        </div>
        <div class="btnDiv">
            <button id="item${item.id}">+</button>
        </div>
    </section>
`
}

// add event listener to clicks in main
mainEl.addEventListener("click", function (e) {
    console.log(`clicked item id is ${e.target.parentElement.parentElement.id}`)
    // check if click/event id corresponse to a menu item
    if (e.target.id === "item0" || e.target.id === "item1" || e.target.id === "item2") {
        //if yes, display items in order
        footerEl.style.display = 'block'
        addToOrder(e.target.parentElement.parentElement.id)
    }
})

// update order object
function addToOrder(menuIndex) {
    // create a newItem object that contains only the name and price of the selected item
    let newItem = {
        itemName: menuArray[menuIndex].name,
        itemPrice: menuArray[menuIndex].price
    }

    // push the newItem to the order array
    order.push(newItem)

    // log order to confirm everything is working as expected so far
    console.log("order is:")
    console.log(order)

    renderOrderUI(order)

}

function renderOrderUI(order) {

    // clear out variables to avoid duplicates
    orderDetailsEl.innerHTML = ``
    total = 0

    // update order UI
    order.forEach((orderItem, index) => {
        orderDetailsEl.innerHTML += `
        <div class="orderItem" id=${index}>
            <div>
                <p>${orderItem.itemName}</p>
                <button class="removeBtn">remove</button>
            </div>
            <p class="price">$${orderItem.itemPrice}</p>
        </div>
        `

        // calculate total and display it
        total += orderItem.itemPrice
        totalEl.innerHTML = `
        <p>Total Price</p>
        <p>$${total}</p>
        <button id="completeOrder">Complete order</button>
        `

        const completeOrder = document.getElementById("completeOrder")
        console.log(completeOrder)
        completeOrder.addEventListener("click", function (e) {
            enterCardDetails()
        })

    })


}

orderDetailsEl.addEventListener("click", function (e) {
    console.log("you clikced on an orderItem.")
    console.log(e.target.parentElement.parentElement.id)
    if (e.target.className === "removeBtn") {
        removeFromOrder(e.target.parentElement.parentElement.id)
    }
    if (total == 0) {
        footerEl.style.display = 'none'
    }
})

function removeFromOrder(orderId) {
    var removedItem = order.splice(orderId, 1)
    console.log("removedItem is:")
    console.log(removedItem)
    console.log("order now is:")
    console.log(order)
    renderOrderUI(order)
}

function enterCardDetails() {
    enterCardDetailsEl.classList.remove('hidden')
    enterCardDetailsEl.style.display = 'flex'
    enterCardDetailsEl.addEventListener("click", function (e) {
        console.log(e.target.id)
        if (e.target.id === "payBtn") {


            // hides Enter Card Details menu
            enterCardDetailsEl.style.display = 'none'

            footerEl.innerHTML =
                `
            <div id="thankYou">
            <h2 id="thankYouText">Thanks, Zach! Your order is on the way!</h2>
            </div>
            `
        }
    })
}


/*
TO DO:
- Prevent the user from clicking any buttons while the pay screen is up
- Use Reducer to calculate total
- Replace "remove" with a minus button simmilar to plus
- Display item count instead of listing every single item in cart
*/
