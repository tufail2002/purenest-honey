const products = [
  {id:1,name:"Wildflower Honey",size:"500 g",price:499,tag:"BESTSELLER",desc:"Floral, rich and naturally aromatic."},
  {id:2,name:"Forest Honey",size:"500 g",price:549,tag:"POPULAR",desc:"Deep, warm notes inspired by forest blooms."},
  {id:3,name:"Acacia Honey",size:"250 g",price:329,tag:"LIGHT & MILD",desc:"Delicate sweetness with a smooth finish."},
  {id:4,name:"Kashmir Blossom",size:"500 g",price:599,tag:"PREMIUM",desc:"A premium floral profile for special moments."}
];

let cart = JSON.parse(localStorage.getItem("purenest-cart") || "[]");

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const paymentModal = document.getElementById("paymentModal");

function money(value){ return `₹${value.toLocaleString("en-IN")}`; }

function renderProducts(){
  productGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-visual">
        <span class="badge">${p.tag}</span>
        <div class="jar"></div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc} ${p.size}</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add" onclick="addToCart(${p.id})">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function saveCart(){
  localStorage.setItem("purenest-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id){
  const item = cart.find(x => x.id === id);
  if(item) item.qty++;
  else cart.push({id,qty:1});
  saveCart();
  openCart();
}

function changeQty(id,delta){
  const item = cart.find(x => x.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
}

function removeItem(id){
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function renderCart(){
  const count = cart.reduce((sum,x)=>sum+x.qty,0);
  const total = cart.reduce((sum,x)=>{
    const p = products.find(p=>p.id===x.id);
    return sum + p.price*x.qty;
  },0);
  cartCount.textContent = count;
  cartTotal.textContent = money(total);

  if(!cart.length){
    cartItems.innerHTML = `<div style="text-align:center;padding:70px 20px;color:#887d6b">
      <div style="font-size:50px">🛒</div><h3>Your cart is empty</h3><p>Add some honey to get started.</p>
    </div>`;
    return;
  }

  cartItems.innerHTML = cart.map(x=>{
    const p = products.find(p=>p.id===x.id);
    return `<div class="cart-item">
      <div class="mini-jar"></div>
      <div>
        <h4>${p.name}</h4>
        <p>${money(p.price)} • ${p.size}</p>
        <div class="qty">
          <button onclick="changeQty(${p.id},-1)">−</button>
          <b>${x.qty}</b>
          <button onclick="changeQty(${p.id},1)">+</button>
          <button class="remove" onclick="removeItem(${p.id})">Remove</button>
        </div>
      </div>
      <strong>${money(p.price*x.qty)}</strong>
    </div>`;
  }).join("");
}

function openCart(){
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
}
function openPayment(){
  if(!cart.length){ alert("Please add a product to your cart first."); return; }
  const total = cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("paymentSummary").textContent = `Order total: ${money(total)}. Select a payment method below.`;
  paymentModal.classList.add("open");
}
function closePayment(){ paymentModal.classList.remove("open"); }

document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",openPayment);
document.getElementById("closePayment").addEventListener("click",closePayment);

document.querySelectorAll(".payment-options button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const method = btn.dataset.method;
    const box = document.getElementById("selectedPayment");
    box.classList.remove("hidden");
    box.innerHTML = `<strong>${method} selected.</strong><br>
      This is a front-end demo. Connect Razorpay, Cashfree, Stripe or your preferred gateway on the server before taking real payments.`;
  });
});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Thank you! This demo form is ready to connect to your backend/email service.";
  e.target.reset();
});

document.getElementById("menuToggle").addEventListener("click",()=>{
  document.getElementById("mainNav").classList.toggle("open");
});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{
  document.getElementById("mainNav").classList.remove("open");
}));

renderProducts();
renderCart();
