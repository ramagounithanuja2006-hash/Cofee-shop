const cart=JSON.parse(localStorage.getItem("brewHavenCartV2"))||[];
const coupon=localStorage.getItem("brewHavenCouponV2")||"BREW10";
const money=n=>"₹"+n.toFixed(2);
const sub=cart.reduce((a,x)=>a+x.price*x.qty,0),dis=coupon==="BREW10"?sub*.1:0,total=sub+40-dis;
document.getElementById("sub").textContent=money(sub);document.getElementById("dis").textContent="- "+money(dis);document.getElementById("total").textContent=money(total);
document.getElementById("items").innerHTML=cart.map(x=>`<div class="order-item"><img src="${x.image}"><div><b>${x.name}</b><small>Qty: ${x.qty}</small></div><strong>${money(x.price*x.qty)}</strong></div>`).join("");
function placeOrder(){
 const required=[["firstName","First name"],["lastName","Last name"],["phone","Phone number"],["email","Email"],["address","Address"],["city","City"],["pincode","Pincode"]];
 for(const [id,name] of required){if(!document.getElementById(id).value.trim()){alert("Please enter "+name+".");document.getElementById(id).focus();return}}
 if(!/^\d{10}$/.test(document.getElementById("phone").value.trim()))return alert("Enter a valid 10-digit phone number.");
 if(!/^\d{6}$/.test(document.getElementById("pincode").value.trim()))return alert("Enter a valid 6-digit pincode.");
 const no="BH-"+Math.floor(100000+Math.random()*900000);
 document.getElementById("orderNo").textContent="Order Number: "+no;
 document.getElementById("modal").classList.add("show");
 localStorage.removeItem("brewHavenCartV2");localStorage.removeItem("brewHavenCouponV2");
}