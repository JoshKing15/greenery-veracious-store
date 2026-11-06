import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

/* ---------- Edit this block. Anything left empty is hidden from the page. ---------- */
const SHOP={
 name:'Greenery Veracious © Multipurpose Oil',
 price:150,
 meetupFee:50,
 whatsapp:'27693015439',
 phoneDisplay:'069 301 5439',
 size:'',                                   // e.g. '100 ml'
 ingredients:'',                            // full list, as printed on the label
 directions:{Face:'',Body:'',Hair:''},      // one short line each
 deliveryTime:'',                           // e.g. '2–4 working days after payment'
 payment:'',                                // e.g. 'We accept EFT.'
 returns:'',                                // damaged or wrong-item policy
 replyHours:'',                             // e.g. 'We reply 8am–6pm, Mon–Sat'
 instagram:'',                              // full URL
 tiktok:''                                  // full URL
};
const photos=[
 {src:'/oil-studio.webp',label:'Bottle',alt:'A single bottle of Greenery Veracious multipurpose oil on a cream background'},
 {src:'/oil-studio-trio.webp',label:'Three bottles',alt:'Three bottles of Greenery Veracious multipurpose oil side by side'},
 {src:'/oil-in-hand.webp',label:'In hand',alt:'Greenery Veracious oil held in a hand with a blush-pink manicure'}
];
const chat=text=>`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
const orderLink=({qty,subtotal,total,suburb,name,phone,email,address})=>chat([
 'Hello Greenery Veracious! I’d like to enquire about an order.',
 `${qty} × ${SHOP.name}`,
 `Product subtotal: R${subtotal}`,
 `Durban meet-up: R${SHOP.meetupFee}`,
 `Total: R${total}`,
 `Meet-up suburb: ${suburb}`,
 `Name: ${name}`,
 `Phone: ${phone}`,
 `Email: ${email}`,
 `Delivery address:\n${address}`,
 'Please confirm stock, the meet-up location and payment instructions.'
].join('\n'));
const askLink=chat('Hello Greenery Veracious! I have a question about the multipurpose oil: ');

function App(){
 const [qty,setQty]=useState(1),[shot,setShot]=useState(0),[showBar,setShowBar]=useState(false);
 const cta=useRef(null);
 const orderDialog=useRef(null);
 const suburbField=useRef(null);
 const [suburb,setSuburb]=useState('');
 const [showSuburbError,setShowSuburbError]=useState(false);
 const subtotal=qty*SHOP.price;
 const total=subtotal+SHOP.meetupFee;

 function openOrder(){
  if(!suburb.trim()){
   setShowSuburbError(true);
   suburbField.current.focus();
   return;
  }
  orderDialog.current.showModal();
 }

 function continueOrder(event){
  event.preventDefault();
  const form=event.currentTarget;
  const details=new FormData(form);
  const address=details.get('address').trim();
  if(!address){
   const field=form.elements.namedItem('address');
   field.setCustomValidity('Enter your full delivery address.');
   field.reportValidity();
   return;
  }
  window.location.assign(orderLink({
   qty,subtotal,total,suburb:suburb.trim(),
   name:details.get('name').trim(),
   phone:details.get('phone').trim(),
   email:details.get('email').trim(),
   address
  }));
 }

 useEffect(()=>{
  const el=cta.current;
  if(!el||!('IntersectionObserver' in window))return;
  const headerHeight=document.querySelector('.header').getBoundingClientRect().height;
  const io=new IntersectionObserver(([e])=>setShowBar(!e.isIntersecting),{
   rootMargin:`-${headerHeight}px 0px 0px`
  });
  io.observe(el);
  return ()=>io.disconnect();
 },[]);

 const facts=[
  ['Size',SHOP.size],
  ['Ingredients',SHOP.ingredients],
  ...Object.entries(SHOP.directions).map(([k,v])=>['Use on '+k.toLowerCase(),v])
 ].filter(([,v])=>v);
 const faqs=[
  ['How much is a Durban meet-up?',`A Durban meet-up costs R${SHOP.meetupFee}. Enter your suburb and we’ll agree on a meeting spot in WhatsApp before you pay.`],
  SHOP.deliveryTime&&['How long does delivery take?',SHOP.deliveryTime],
  ['When do I pay?',('Wait until we’ve confirmed stock, the meet-up location and payment instructions in WhatsApp. '+SHOP.payment).trim()],
  SHOP.returns&&['What if something goes wrong?',SHOP.returns]
 ].filter(Boolean);
 const socials=[['Instagram',SHOP.instagram],['TikTok',SHOP.tiktok]].filter(([,u])=>u);
 const steps=[
  ['Choose your quantity','Enter your suburb and review the total with the Durban meet-up fee.'],
  ['Fill in your details','Add your name, contact details and full delivery address, then send the prepared message in WhatsApp.'],
  ['We confirm the details','We’ll confirm stock, the meeting spot and how to pay.'],
  ['Pay, then collect','Meet us at the agreed spot after we confirm payment.']
 ];

 return <>
 <a className="skip" href="#shop">Skip to product</a>
 <div className="announce">Durban-based beauty. Nationwide delivery enquiries.</div>
 <header className="header"><div className="wrap bar">
  <a className="brand" href="#top">Greenery Veracious</a>
  <nav aria-label="Main"><a href="#shop">Shop</a><a href="#how">How it works</a><a href="#delivery">Delivery</a><a href="#about">About</a></nav>
  <a className="headLink" href={askLink}>Message us</a>
 </div></header>

 <main id="top">
 <section className="wrap product" id="shop">
  <div className="gallery">
   <img className="stage" src={photos[shot].src} alt={photos[shot].alt} width="1000" height="1250" fetchPriority="high"/>
   <div className="thumbs" role="group" aria-label="Product photos">
    {photos.map((p,i)=><button key={p.src} className={i===shot?'on':''} aria-label={'Show photo: '+p.label} aria-pressed={i===shot} onClick={()=>setShot(i)}><img src={p.src.replace('.webp','-thumb.webp')} alt="" width="160" height="200" loading={i?'lazy':undefined}/></button>)}
   </div>
  </div>
  <div className="info">
   <h1>One oil for face, body and hair.</h1>
   <p className="lede">{SHOP.name}. A multipurpose beauty oil for your face, body and hair routine.</p>
   <p className="price">R{SHOP.price} <span>per bottle</span></p>
   <div className="qty"><span id="qlabel">Quantity</span>
    <div className="stepper" role="group" aria-labelledby="qlabel">
     <button aria-label="One fewer" disabled={qty===1} onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
     <output aria-live="polite">{qty}</output>
     <button aria-label="One more" disabled={qty===99} onClick={()=>setQty(q=>Math.min(99,q+1))}>+</button>
    </div>
   </div>
   <fieldset className="deliver">
    <legend>Delivery option</legend>
    <p className="meetupOption"><strong>Durban meet-up</strong><strong>R{SHOP.meetupFee}</strong></p>
    <label htmlFor="meetup-suburb">Your suburb</label>
    <input ref={suburbField} id="meetup-suburb" autoComplete="address-level3" maxLength={100} required value={suburb}
     onChange={event=>{setSuburb(event.target.value);setShowSuburbError(false)}}
     aria-invalid={showSuburbError||undefined} aria-describedby={showSuburbError?'meetup-help meetup-error':'meetup-help'}/>
    <p className="note" id="meetup-help">We’ll agree on a meeting spot in WhatsApp.</p>
    {showSuburbError&&<p className="orderError" id="meetup-error" role="alert">Enter your suburb to continue.</p>}
   </fieldset>
   <dl className="sum" aria-live="polite">
    <div><dt>{qty} × bottle</dt><dd>R{subtotal}</dd></div>
    <div><dt>Durban meet-up</dt><dd>R{SHOP.meetupFee}</dd></div>
    <div className="tot"><dt>Total</dt><dd>R{total}</dd></div>
   </dl>
   <button ref={cta} className="btn orderButton" type="button" onClick={openOrder}>Order on WhatsApp · R{total}</button>
   <p className="note">We’ll confirm stock, the meet-up location and payment details in WhatsApp.</p>
   {facts.length>0&&<dl className="facts">{facts.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
   <a className="ask" href={askLink}>Have a question first? Message us</a>
  </div>
 </section>

 <section className="band" id="how"><div className="wrap">
  <h2>How ordering works</h2>
  <ol className="steps">{steps.map(([t,d])=><li key={t}><b>{t}</b><span>{d}</span></li>)}</ol>
 </div></section>

 <section className="wrap split" id="delivery">
  <h2>Delivery and payment</h2>
  <div className="faq">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
 </section>

 <section className="band about" id="about"><div className="wrap">
  <h2>About Greenery Veracious</h2>
  <p>Greenery Veracious is a Durban-based beauty brand for everyday skincare and self-confidence.</p>
 </div></section>
 </main>

 <footer className="foot"><div className="wrap">
  <p className="brand">Greenery Veracious</p>
  <p>Durban, South Africa</p>
  <p><a href={askLink}>WhatsApp {SHOP.phoneDisplay}</a>{SHOP.replyHours&&<> · {SHOP.replyHours}</>}</p>
  {socials.length>0&&<p>{socials.map(([n,u],i)=><React.Fragment key={n}>{i>0&&' · '}<a href={u} target="_blank" rel="noopener noreferrer">{n}</a></React.Fragment>)}</p>}
  <p className="fine">© {new Date().getFullYear()} Greenery Veracious. All rights reserved.</p>
 </div></footer>

 <div className={'orderBar'+(showBar?' on':'')}>
  <span>R{total}<small>incl. meet-up</small></span>
  <button className="btn" type="button" onClick={openOrder}>{suburb.trim()?'Order on WhatsApp':'Choose delivery'}</button>
 </div>

 <dialog ref={orderDialog} className="orderDialog" aria-labelledby="order-title">
  <form onSubmit={continueOrder}>
   <h2 id="order-title">Your order details</h2>
   <p>{qty} × {SHOP.name}<br/>R{subtotal} + R{SHOP.meetupFee} Durban meet-up<br/><strong>Total R{total}</strong></p>
   <label htmlFor="order-name">Full name</label>
   <input id="order-name" name="name" autoComplete="name" maxLength={100} pattern={'.*\\S.*'} title="Enter your name" required autoFocus/>
   <label htmlFor="order-phone">Phone number</label>
   <input id="order-phone" name="phone" type="tel" autoComplete="tel" maxLength={32} pattern={'\\+?(?:[ .\\(\\)\\-]*[0-9]){7,15}[ .\\(\\)\\-]*'} title="Enter a phone number with 7 to 15 digits, including any area code." required/>
   <label htmlFor="order-email">Email address</label>
   <input id="order-email" name="email" type="email" autoComplete="email" maxLength={254} required/>
   <label htmlFor="order-address">Full delivery address</label>
   <textarea id="order-address" name="address" autoComplete="street-address" rows={3} maxLength={300} aria-describedby="address-help" onInput={event=>event.currentTarget.setCustomValidity('')} required/>
   <p id="address-help" className="note">Include the street number and name, unit or complex if applicable, suburb, city and postcode.</p>
   <p className="note">You’ll review and send your message in WhatsApp. We’ll confirm stock and the meet-up location before you pay.</p>
   <div className="orderActions">
    <button type="button" className="orderCancel" onClick={()=>orderDialog.current.close()}>Back</button>
    <button type="submit" className="btn">Continue to WhatsApp</button>
   </div>
  </form>
 </dialog>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
