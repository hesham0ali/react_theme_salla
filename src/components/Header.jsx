import { useEffect, useState } from 'react';
import { images } from '../data.js';
import { Icon } from './Icons.jsx';

const announcements = [
  ['Complimentary shipping on orders over $100','Discover the Collection','Free shipping on orders over $100'],
  ['Free 30-day returns and exchanges','How it works','Free 30-day returns & exchanges'],
  ['The Autumn Coat Edit has landed','Shop Outerwear','The Autumn Coat Edit is here'],
];

function MegaMenu({ men = false }) {
  return <div className="mega"><div className="wrap mega__in">
    <div className="mega__col"><h4>Clothing</h4>{(men?['Outerwear','Knitwear','Shirts','Trousers','Denim','Shop all men']:['Coats & Jackets','Knitwear','Shirts & Tops','Trousers','Denim','Shop all women']).map((x)=><a href="#" key={x}>{x}</a>)}</div>
    <div className="mega__col"><h4>Essentials</h4>{['T-shirts','Sweatshirts','Loungewear','Layering'].map((x)=><a href="#" key={x}>{x}</a>)}</div>
    <div className="mega__col"><h4>Accessories</h4>{['Bags','Sunglasses','Footwear','Gift cards'].map((x)=><a href="#" key={x}>{x}</a>)}</div>
    <a className="mega__feat" href="#"><img src={men?images.man:images.woman} alt=""/><span>{men?'Tailored Outerwear':'New In: Women'}</span></a>
    <a className="mega__feat" href="#"><img src={men?images.denim:images.trench} alt=""/><span>{men?'Denim, Reworked':'The Coat Edit'}</span></a>
  </div></div>;
}

export default function Header({ bag, wishCount, toast, announceScheme = 'dark' }) {
  const [announcement,setAnnouncement] = useState(0);
  const [drawer,setDrawer] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(() => {
    const onScroll=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  const ann=announcements[announcement];
  const move=(amount)=>setAnnouncement((announcement+amount+announcements.length)%announcements.length);

  return <>
    <div className={`announce scheme-${announceScheme}`} role="region" aria-label="Announcements"><div className="wrap announce__in">
      <div className="announce__side"><a href="#">Help</a><a href="#">Find a store</a></div>
      <button className="announce__arrow" onClick={()=>move(-1)} aria-label="Previous announcement"><Icon name="left" className="icon icon--sm"/></button>
      <p className="announce__msg" aria-live="polite"><span className="ann-long">{ann[0]}</span><span className="ann-short">{ann[2]}</span><span className="announce__sep"> — </span><a href="#">{ann[1]}</a></p>
      <button className="announce__arrow" onClick={()=>move(1)} aria-label="Next announcement"><Icon name="right" className="icon icon--sm"/></button>
      <div className="announce__side announce__side--r"><a href="#">United States · USD $</a></div>
    </div></div>
    <header className={`hdr ${scrolled?'is-solid':''} ${drawer?'is-open':''}`}>
      <div className="wrap hdr__in">
        <div style={{display:'flex',alignItems:'center'}}>
          <button className="iconbtn hdr__burger" aria-label={drawer?'Close menu':'Open menu'} aria-expanded={drawer} onClick={()=>setDrawer(!drawer)}><Icon name={drawer?'close':'menu'}/></button>
          <nav className="nav" aria-label="Primary">
            <div className="nav__item"><a className="nav__link" href="#">New Arrivals</a></div>
            <div className="nav__item"><a className="nav__link" href="#">Women <Icon name="down" className="icon icon--sm"/></a><MegaMenu /></div>
            <div className="nav__item"><a className="nav__link" href="#">Men <Icon name="down" className="icon icon--sm"/></a><MegaMenu men /></div>
            <div className="nav__item"><a className="nav__link" href="#">Essentials</a></div><div className="nav__item"><a className="nav__link" href="#">Collections</a></div><div className="nav__item"><a className="nav__link nav__link--sale" href="#">Sale</a></div>
          </nav>
        </div>
        <a className="logo" href="#" aria-label="FORME home">FORME</a>
        <div className="hdr__actions"><button className="iconbtn" aria-label="Search"><Icon name="search"/></button><a className="iconbtn acct" href="#" aria-label="Account"><Icon name="user"/></a><a className="iconbtn wish" href="#" aria-label={`Wishlist, ${wishCount} items`}><Icon name="heart"/></a><a className="iconbtn bag" href="#" aria-label={`Shopping bag, ${bag} items`}><Icon name="bag"/><span className="bag__count">{bag}</span></a></div>
      </div>
      {drawer && <div className="drawer" role="dialog" aria-label="Menu"><nav className="drawer__nav">{['New Arrivals','Women','Men','Essentials','Collections','Sale'].map((item)=><a href="#" className={item==='Sale'?'drawer__sale':''} key={item}>{item}<Icon name="right"/></a>)}</nav><div className="drawer__feat"><a href="#"><img src={images.scarf} alt=""/><span>The Coat Edit</span></a><a href="#"><img src={images.rail} alt=""/><span>Essentials</span></a></div><div className="drawer__foot"><a href="#"><Icon name="user"/>Sign in / Create account</a><a href="#"><Icon name="heart"/>Wishlist ({wishCount})</a><a href="#"><Icon name="globe"/>United States · USD $</a></div></div>}
      {toast && <div className="toast" role="status"><img src={toast.img} alt=""/><div><small>Added to bag</small><strong>{toast.name}</strong><span className="toast__meta">{toast.meta}</span></div><a href="#">View bag</a></div>}
    </header>
  </>;
}
