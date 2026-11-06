import React, {useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
const PRICE=150;
const PRODUCT_NAME="Greenery Veracious © Multipurpose Oil";
const WHATSAPP_URL='https://wa.me/27693015439';
const images={hero:'/oil-studio.webp',bottles:'/oil-studio-trio.webp',hand:'/oil-in-hand.webp'};

function orderLink(quantity){
 const message=[
  'Hello Greenery Veracious! I’d like to enquire about an order.',
  `${quantity} × ${PRODUCT_NAME}`,
  `Product subtotal: R${quantity*PRICE} (delivery excluded)`,
  'Delivery suburb or postcode: ',
  'Please confirm stock, delivery cost and payment instructions.'
 ].join('\n');
 return WHATSAPP_URL+'?text='+encodeURIComponent(message);
}

function App(){
 const [quantity,setQuantity]=useState(1),[cart,setCart]=useState(0);
 const bag=useRef(null);
 const total=cart*PRICE;
 function openBag(){bag.current.showModal()}
 function closeBag(){bag.current.close()}
 return <><div className="announcement">DURBAN-BASED BEAUTY • NATIONWIDE DELIVERY ENQUIRIES</div><header className="header"><a className="brand" href="#"><span className="brandmark">✺</span><span>GREENERY<br/><b>VERACIOUS</b></span></a><nav><a href="#story">Our Story</a><a href="#shop">Shop</a><a href="#delivery">Delivery</a></nav><button className="bag" onClick={openBag}>Bag <span>{cart}</span></button></header>
 <main><section className="hero">
 <div className="heroText"><p className="eyebrow">GREENERY VERACIOUS © MULTIPURPOSE OIL</p><h1>One oil for <em>face, body and hair.</em></h1>
 <p className="heroPrice"><strong>R{PRICE} per bottle</strong><br/>Delivery quoted separately.</p>
 <a className="primary" href={orderLink(1)}>Order on WhatsApp <span aria-hidden="true">↗</span></a>
 <a className="heroShopLink" href="#shop">See product photos and quantities</a></div>
 <div className="heroVisual"><img src={images.hero} alt="Greenery Veracious multipurpose oil on a cream studio background" width="1000" height="1250" fetchPriority="high"/></div>
 </section>
 <section className="section shop" id="shop"><div className="sectionTitle"><p className="eyebrow">THE COLLECTION</p><h2>One bottle. <em>Three uses.</em></h2><p>For face, body and hair.</p></div><div className="product"><div className="productGallery">
 <img className="productMain" loading="lazy" src={images.bottles} alt="Three bottles of Greenery Veracious multipurpose oil on a cream studio background" width="1000" height="1250"/>
 <div className="miniImages">
  <img loading="lazy" src={images.hero} alt="A single bottle of Greenery Veracious multipurpose oil" width="1000" height="1250"/>
  <img loading="lazy" src={images.hand} alt="Greenery Veracious oil held by a hand with a blush-pink manicure" width="1000" height="1250"/>
 </div>
 </div><div className="productInfo"><p className="eyebrow">GREENERY VERACIOUS ORIGINAL</p><h3>{PRODUCT_NAME}</h3><p className="price">R{PRICE} <small>per bottle · delivery calculated separately</small></p><p>A multipurpose beauty oil for your face, body and hair routine.</p><div className="qtyLine"><span>Quantity</span><div className="quantity"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity">−</button><strong>{quantity}</strong><button onClick={()=>setQuantity(Math.min(99,quantity+1))} aria-label="Increase quantity">+</button></div></div><a className="primary wide" href={orderLink(quantity)}>Order on WhatsApp <span>R{PRICE*quantity} ↗</span></a><button className="outline wide" onClick={()=>{setCart(c=>Math.min(99,c+quantity));openBag()}}>Add to bag</button><p className="smallNote">Orders are confirmed only after stock and delivery fees are agreed.</p></div></div></section>
 <section className="story" id="story"><div><p className="eyebrow">OUR STORY</p><h2>Beauty that feels <em>personal.</em></h2><p>Greenery Veracious is a Durban-based beauty brand with a passion for everyday skincare and self-confidence.</p><p>Healthy Benefits Meets Beauty Outcomes.</p><a href="#shop" className="outline">Shop the collection ↗</a></div><img loading="lazy" src={images.hand} alt="Greenery Veracious oil held by a hand with a blush-pink manicure" width="1000" height="1250"/></section>
 <section className="section delivery" id="delivery"><p className="eyebrow">GOOD TO KNOW</p><h2>From Durban, <em>with love.</em></h2><div className="features"><article><span>01</span><h3>Nationwide enquiries</h3><p>We welcome orders across South Africa. Delivery coverage, fees and estimated arrival times are confirmed individually.</p></article><article><span>02</span><h3>Order with confidence</h3><p>Share your order details and receive a confirmation of stock and total cost before making payment.</p></article><article><span>03</span><h3>Get a delivery quote</h3><p>Include your suburb or postcode in your WhatsApp enquiry. You can share your full address after we confirm the quote.</p></article></div></section>
 <section className="bottomCta"><p className="eyebrow">GREENERY VERACIOUS</p><h2>Your glow starts <em>here.</em></h2><a className="primary light" href={orderLink(1)}>Order on WhatsApp · R{PRICE} ↗</a></section></main>
 <footer><div className="brand footbrand"><span className="brandmark">✺</span><span>GREENERY<br/><b>VERACIOUS</b></span></div><p>Healthy Benefits Meets Beauty Outcomes</p><p>Durban, South Africa · Nationwide delivery enquiries</p><p><a href={WHATSAPP_URL}>WhatsApp · 069 301 5439</a></p><p>© {new Date().getFullYear()} Greenery Veracious. All rights reserved.</p></footer>
 <dialog ref={bag} className="drawer" aria-labelledby="bag-title" onClick={event=>{const bounds=event.currentTarget.getBoundingClientRect();if(event.target===event.currentTarget&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))closeBag()}}>
 <div className="drawerHead"><h2 id="bag-title">Your bag</h2><button type="button" aria-label="Close bag" onClick={closeBag}>✕</button></div>
 {cart===0?<div className="empty"><p>Your bag is empty.</p><button className="primary" onClick={closeBag}>Continue shopping</button></div>:<>
 <div className="cartItem"><img src={images.hero} alt="Greenery Veracious multipurpose oil"/><div><b>{PRODUCT_NAME}</b><p>R{PRICE} each</p>
 <div className="quantity"><button aria-label="Remove one bottle from bag" onClick={()=>setCart(c=>Math.max(0,c-1))}>−</button><strong aria-live="polite">{cart}</strong><button aria-label="Add one bottle to bag" onClick={()=>setCart(c=>Math.min(99,c+1))}>+</button></div></div><strong>R{total}</strong></div>
 <div className="checkout"><div className="total"><span>Product subtotal</span><b>R{total}</b></div>
 <p className="smallNote">Delivery is quoted separately. Add your suburb or postcode in WhatsApp so we can confirm the total before you pay.</p>
 <a className="primary wide" href={orderLink(cart)}>Order on WhatsApp <span aria-hidden="true">↗</span></a></div>
 </>}
 </dialog></>
}
createRoot(document.getElementById('root')).render(<App/>);
