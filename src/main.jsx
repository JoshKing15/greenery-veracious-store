import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

/* ---------- Edit this block. Anything left empty is hidden from the page. ---------- */
const SHOP={
 name:'Greenery Veracious © Multipurpose Oil',
 price:150,
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
const orderLink=qty=>chat([
 'Hello Greenery Veracious! I’d like to enquire about an order.',
 `${qty} × ${SHOP.name}`,
 `Product subtotal: R${qty*SHOP.price} (delivery excluded)`,
 'Delivery suburb or postcode: ',
 'Please confirm stock, delivery cost and payment instructions.'
].join('\n'));
const askLink=chat('Hello Greenery Veracious! I have a question about the multipurpose oil: ');

function App(){
 const [qty,setQty]=useState(1),[shot,setShot]=useState(0),[showBar,setShowBar]=useState(false);
 const cta=useRef(null);
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
  ['How much is delivery?','It depends on where you are, so we quote it separately. Send your suburb or postcode and we’ll reply with the cost before you pay.'],
  SHOP.deliveryTime&&['How long does delivery take?',SHOP.deliveryTime],
  ['When do I pay?',('Wait until we’ve confirmed stock, delivery cost and payment instructions in WhatsApp. '+SHOP.payment).trim()],
  SHOP.returns&&['What if something goes wrong?',SHOP.returns]
 ].filter(Boolean);
 const socials=[['Instagram',SHOP.instagram],['TikTok',SHOP.tiktok]].filter(([,u])=>u);
 const steps=[
  ['Tap Order on WhatsApp','Your order message is already written.'],
  ['Add your suburb or postcode','So we can work out delivery.'],
  ['We confirm the details','Stock, delivery cost and how to pay.'],
  ['Pay, then we deliver','Only once you have our payment instructions.']
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
   <p className="price">R{SHOP.price} <span>per bottle. Delivery quoted separately.</span></p>
   <div className="qty"><span id="qlabel">Quantity</span>
    <div className="stepper" role="group" aria-labelledby="qlabel">
     <button aria-label="One fewer" disabled={qty===1} onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
     <output aria-live="polite">{qty}</output>
     <button aria-label="One more" disabled={qty===99} onClick={()=>setQty(q=>Math.min(99,q+1))}>+</button>
    </div>
   </div>
   <a ref={cta} className="btn" href={orderLink(qty)}>Order on WhatsApp · R{SHOP.price*qty}</a>
   <p className="note">Nothing is charged on this site. We confirm stock and delivery before you pay.</p>
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
  <span>R{SHOP.price*qty}<small> delivery extra</small></span>
  <a className="btn" href={orderLink(qty)}>Order on WhatsApp</a>
 </div>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
