import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { images } from '../data.js';
import { formatNumber, formatPrice, isRtlLanguage } from '../i18n.js';
import { Icon } from './Icons.jsx';

function MegaMenu({ men = false }) {
  const { t } = useTranslation();
  const first = men
    ? ['outerwear','knitwear','shirts','trousers','denim','shopAllMen']
    : ['coats','knitwear','tops','trousers','denim','shopAllWomen'];
  return <div className="mega"><div className="wrap mega__in">
    <div className="mega__col"><h4>{t('header.mega.clothing')}</h4>{first.map((key)=><a href="#" key={key}>{t(`header.mega.${key}`)}</a>)}</div>
    <div className="mega__col"><h4>{t('header.mega.essentials')}</h4>{['tshirts','sweatshirts','loungewear','layering'].map((key)=><a href="#" key={key}>{t(`header.mega.${key}`)}</a>)}</div>
    <div className="mega__col"><h4>{t('header.mega.accessories')}</h4>{['bags','sunglasses','footwear','giftCards'].map((key)=><a href="#" key={key}>{t(`header.mega.${key}`)}</a>)}</div>
    <a className="mega__feat" href="#"><img src={men?images.man:images.woman} alt=""/><span>{t(`header.mega.${men?'tailoredOuterwear':'newWomen'}`)}</span></a>
    <a className="mega__feat" href="#"><img src={men?images.denim:images.trench} alt=""/><span>{t(`header.mega.${men?'denimReworked':'coatEdit'}`)}</span></a>
  </div></div>;
}

export default function Header({ bag, wishCount, toast, announceScheme = 'dark', solid = false }) {
  const { t, i18n } = useTranslation();
  const rtl = isRtlLanguage(i18n.resolvedLanguage);
  const nextLanguage = rtl ? 'en' : 'ar';
  const [announcement,setAnnouncement] = useState(0);
  const [drawer,setDrawer] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const announcements = t('header.announcements', { returnObjects: true });
  useEffect(() => {
    const onScroll=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  const ann=announcements[announcement] || announcements[0];
  const move=(amount)=>setAnnouncement((current)=>(current+amount+announcements.length)%announcements.length);
  const changeLanguage=()=>{ i18n.changeLanguage(nextLanguage); setDrawer(false); };
  const directionIcon=(logical)=>rtl?(logical==='previous'?'right':'left'):(logical==='previous'?'left':'right');
  const navItems=['new','women','men','essentials','collections','sale'];
  const formattedWishCount=formatNumber(wishCount,i18n.resolvedLanguage);
  const formattedBagCount=formatNumber(bag,i18n.resolvedLanguage);

  return <>
    <div className={`announce scheme-${announceScheme}`} role="region" aria-label={t('header.announcementsLabel')}><div className="wrap announce__in">
      <div className="announce__side"><a href="#">{t('header.help')}</a><a href="#">{t('header.findStore')}</a></div>
      <button className="announce__arrow" onClick={()=>move(-1)} aria-label={t('header.previousAnnouncement')}><Icon name={directionIcon('previous')} className="icon icon--sm"/></button>
      <p className="announce__msg" aria-live="polite"><span className="ann-long">{ann.long}</span><span className="ann-short">{ann.short}</span><span className="announce__sep"> — </span><a href="#">{ann.action}</a></p>
      <button className="announce__arrow" onClick={()=>move(1)} aria-label={t('header.nextAnnouncement')}><Icon name={directionIcon('next')} className="icon icon--sm"/></button>
      <div className="announce__side announce__side--r"><a href="#">{t('header.region')}</a></div>
    </div></div>
    <header className={`hdr ${solid||scrolled?'is-solid':''} ${drawer?'is-open':''}`}>
      <div className="wrap hdr__in">
        <div className="hdr__navwrap">
          <button className="iconbtn hdr__burger" aria-label={t(`header.${drawer?'closeMenu':'openMenu'}`)} aria-expanded={drawer} onClick={()=>setDrawer(!drawer)}><Icon name={drawer?'close':'menu'}/></button>
          <nav className="nav" aria-label={t('header.primaryNav')}>
            <div className="nav__item"><a className="nav__link" href="#">{t('header.nav.new')}</a></div>
            <div className="nav__item"><a className="nav__link" href="#">{t('header.nav.women')} <Icon name="down" className="icon icon--sm"/></a><MegaMenu /></div>
            <div className="nav__item"><a className="nav__link" href="#">{t('header.nav.men')} <Icon name="down" className="icon icon--sm"/></a><MegaMenu men /></div>
            <div className="nav__item"><a className="nav__link" href="#">{t('header.nav.essentials')}</a></div><div className="nav__item"><a className="nav__link" href="#">{t('header.nav.collections')}</a></div><div className="nav__item"><a className="nav__link nav__link--sale" href="#">{t('header.nav.sale')}</a></div>
          </nav>
        </div>
        <a className="logo" href="/" aria-label={t('header.home')}>FORME</a>
        <div className="hdr__actions"><button className="lang-switch" type="button" onClick={changeLanguage} aria-label={t(`language.${rtl?'switchToEnglish':'switchToArabic'}`)}>{t(`language.${rtl?'englishShort':'arabicShort'}`)}</button><button className="iconbtn" aria-label={t('header.search')}><Icon name="search"/></button><a className="iconbtn acct" href="#" aria-label={t('header.account')}><Icon name="user"/></a><a className="iconbtn wish" href="#" aria-label={t('header.wishlist',{count:formattedWishCount})}><Icon name="heart"/></a><a className="iconbtn bag" href="#" aria-label={t('header.shoppingBag',{count:formattedBagCount})}><Icon name="bag"/><span className="bag__count">{formattedBagCount}</span></a></div>
      </div>
      {drawer && <div className="drawer" role="dialog" aria-label={t('header.menu')}><nav className="drawer__nav">{navItems.map((item)=><a href="#" className={item==='sale'?'drawer__sale':''} key={item}>{t(`header.nav.${item}`)}<Icon name={directionIcon('next')}/></a>)}</nav><div className="drawer__feat"><a href="#"><img src={images.scarf} alt=""/><span>{t('header.mega.coatEdit')}</span></a><a href="#"><img src={images.rail} alt=""/><span>{t('header.nav.essentials')}</span></a></div><div className="drawer__foot"><button type="button" className="drawer__language" onClick={changeLanguage}><Icon name="globe"/>{t(`language.${rtl?'switchToEnglish':'switchToArabic'}`)}</button><a href="#"><Icon name="user"/>{t('header.signIn')}</a><a href="#"><Icon name="heart"/>{t('header.wishlist',{count:formattedWishCount})}</a><a href="#"><Icon name="globe"/>{t('header.region')}</a></div></div>}
      {toast && <div className="toast" role="status"><img src={toast.img} alt=""/><div><small>{t('common.addedToBag')}</small><strong>{t(`products.${toast.id}.name`)}</strong><span className="toast__meta">{toast.size?`${t('common.size',{size:toast.size})} · `:''}{formatPrice(toast.price,i18n.resolvedLanguage)}</span></div><a href="#">{t('header.viewBag')}</a></div>}
    </header>
  </>;
}
