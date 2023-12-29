import menuArray from "./data.js";
let menuHtml = document.getElementById("main-container");
let cartHtml = "";
let orderedListHtml = "";
let totalPrice = 0;

let arr = [];
document.addEventListener("click", (e) => {
  if (e.target.dataset.btn === e.target.id) {
    handleClick(e.target.id);
  } else if (e.target.id === "remove") {
    removeClick(e);
  } else if (e.target.id === "complete-btn") {
    completeClick();
  }
});

menuArray.forEach((menu) => {
  menuHtml.innerHTML += `<div class="item" id="item">
                  <img class="emoji" src="${menu.emoji}">
                  <div>
                      <p class="name">${menu.name}</p>
                      <p class=""ingredients>${menu.ingredients}</p>
                      <span>$${menu.price}</span>
                  </div>
                  <button class="order-btn" id="${menu.id}" data-btn="${menu.id}">+</button>
              </div>
              <div class="hr"></div>
              `;
});

function completeClick() {
  menuHtml.innerHTML += `<div class='payment' id="payment">
    <h2 class="card-details-title">Enter card details</h2>
    <form class="payment-form" id="payment-form">
      <input type='text' name='fullName' placeholder='Enter your name' class="input-field" required/>
      <input type='number' name='cardNumber' placeholder='Enter card number' class="input-field" required/>
      <input type='number' name='cvvNumer' placeholder='Enter CVV' class="input-field" required/>
      <button class="pay-btn" type="submit" id="pay-btn">Pay</button>
    </form>              
  </div>`;
  const paymentForm = document.getElementById('payment-form')
  paymentForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const clientName = paymentFormData.get('fullName')
    const cardNum = paymentFormData.get('cardNum')
    const cardCvc = paymentFormData.get('cardCvc')
    document.getElementById('payment').remove()
    document.getElementById('cart').innerHTML = `<div class="comment-order">Thanks, ${clientName}! Your order is on its way!</div>`
  })

}

function iterateArr() {
  totalPrice = 0;
  orderedListHtml = "";
  arr.forEach((order) => {
    totalPrice += order.foodPrice;
  });

  arr.forEach((food) => {
    orderedListHtml += `<div class="ordered">
    <p class="name">${food.foodName}</p>
    <span class="remove-btn" data-remove='${food.foodId}' id='remove'>remove</span>
    <span class="order-price">$${food.foodPrice}</span>
    </div>`;
  });
}

function removeClick(e) {
  arr = arr.filter(
    (element) => element.foodId !== Number(e.target.dataset.remove)
  );
  if (arr.length) {
    iterateArr();
    document.getElementById("ordered-list").innerHTML = orderedListHtml;
    document.getElementById("total-price").innerHTML = `$${totalPrice}`;
  } else {
    cartHtml = "";
    document.getElementById("cart").remove();
  }
}

let foodIdNumber = 0;
function handleClick(id) {
  const menuObj = menuArray[id];
  arr.push({
    foodName: menuObj.name,
    foodPrice: menuObj.price,
    foodId: foodIdNumber,
  });
  foodIdNumber++;

  iterateArr();

  if (!cartHtml) {
    cartHtml = `<div class="cart" id="cart">
                  <p class="title">Your order</p>
                  <div class="ordered-list" id="ordered-list">
                    ${orderedListHtml}
                  </div>
                  <div class="cart-hr"></div>
                  <div class="total">
                    <p class="total-price">Total price</p>
                    <span class="order-price" id="total-price">$${totalPrice}</span>
                  </div>
                  <div class="complete-btn" id="complete-btn">Complete order</div>
                </div>`;
    menuHtml.innerHTML += cartHtml;
  } else {
    document.getElementById("ordered-list").innerHTML = orderedListHtml;
    document.getElementById("total-price").innerHTML = `$${totalPrice}`;
  }
}
