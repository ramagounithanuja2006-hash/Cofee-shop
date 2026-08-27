const defaultCart=[
{id:1,name:"Caramel Latte",category:"Coffee",price:180,qty:2,description:"Smooth espresso with creamy caramel and steamed milk.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=85"},
{id:2,name:"Mocha Delight",category:"Coffee",price:200,qty:1,description:"Rich chocolate blended with espresso and silky milk.",image:"https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=85"},
{id:3,name:"Chocolate Frappe",category:"Cold Coffee",price:220,qty:1,description:"Creamy iced coffee topped with chocolate.",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=85"}];

let cart=JSON.parse(localStorage.getItem("brewHavenCartV2"))||defaultCart;
let coupon=localStorage.getItem("brewHavenCouponV2")||"BREW10";
const money=n=>"₹"+n.toFixed(2);

function save(){localStorage.setItem("brewHavenCartV2",JSON.stringify(cart));localStorage.setItem("brewHavenCouponV2",coupon)}
async function render(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty"><div>☕</div><h3>Your cart is empty</h3><p>Add something delicious from our menu.</p></div>';update();return}
 let t=await fetch("../components/cart-item.html").then(r=>r.text());
 box.innerHTML=cart.map(x=>t.replaceAll("{{IMAGE}}",x.image).replaceAll("{{NAME}}",x.name).replaceAll("{{CATEGORY}}",x.category).replaceAll("{{DESCRIPTION}}",x.description).replaceAll("{{PRICE}}",x.price.toFixed(2)).replaceAll("{{QTY}}",x.qty).replaceAll("{{ITEMTOTAL}}",(x.price*x.qty).toFixed(2)).replaceAll("{{ID}}",x.id)).join("");
 update();
}
function changeQty(id,n){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=n;if(x.qty<1)cart=cart.filter(i=>i.id!==id);save();render()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();render()}
function clearCart(){if(confirm("Clear all items from your cart?")){cart=[];save();render()}}
function update(){
 let sub=cart.reduce((a,x)=>a+x.price*x.qty,0), del=sub?40:0, dis=coupon==="BREW10"?sub*.1:0;
 document.getElementById("subtotal").textContent=money(sub);
 document.getElementById("discount").textContent="- "+money(dis);
 document.getElementById("total").textContent=money(sub+del-dis);
 document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 document.getElementById("itemCount").textContent=`(${cart.reduce((a,x)=>a+x.qty,0)} items)`;
 document.getElementById("couponMsg").textContent=coupon==="BREW10"?"✓ Coupon applied! You saved 10%.":"";
}
function applyCoupon(){coupon=document.getElementById("coupon").value.trim().toUpperCase()==="BREW10"?"BREW10":"";save();update();document.getElementById("couponMsg").textContent=coupon?"✓ Coupon applied! You saved 10%.":"Invalid coupon. Try BREW10."}
function goCheckout(){if(!cart.length)return alert("Your cart is empty.");location.href="checkout.html"}
render();