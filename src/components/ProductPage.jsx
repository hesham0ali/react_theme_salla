import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber, formatPrice, languageCode } from '../i18n.js';
import { images, products } from '../data.js';
import { linenProduct } from '../productData.js';
import { Icon, Stars } from './Icons.jsx';
import ProductCard from './ProductCard.jsx';

const assuranceIcons = ['truck','return','lock'];
const distribution = [[5,104],[4,16],[3,4],[2,1],[1,1]];

function makeProduct(base, t) {
  if (base.id === linenProduct.id) return linenProduct;
  return {
    ...linenProduct,
    id: base.id,
    slug: base.slug,
    price: base.price,
    compareAt: base.was || null,
    rating: Number(base.rating),
    reviewCount: base.reviews,
    localized: {
      ar: { name:t(`products.${base.id}.name`,{lng:'ar'}), category:t(`products.${base.id}.category`,{lng:'ar'}), description:t('pdp.productFallbackDescription',{lng:'ar',defaultValue:'قطعة يومية مصممة بعناية للراحة والأناقة.'}) },
      en: { name:t(`products.${base.id}.name`,{lng:'en'}), category:t(`products.${base.id}.category`,{lng:'en'}), description:t('pdp.productFallbackDescription',{lng:'en',defaultValue:'A considered everyday piece designed for lasting comfort and effortless wear.'}) },
    },
    images: [
      {id:'front',src:base.img,position:'50% 35%'},
      {id:'model',src:base.alt,position:'50% 35%'},
      {id:'detail',src:base.img,position:'58% 68%'},
      {id:'fabric',src:images.linenFabric,position:'50% 50%'},
    ],
  };
}

function Gallery({ product, name }) {
  const { t, i18n } = useTranslation();
  const rtl=languageCode(i18n.resolvedLanguage)==='ar';
  const [index,setIndex]=useState(0);
  const [lightbox,setLightbox]=useState(false);
  const [zoomed,setZoomed]=useState(false);
  const modal=useRef(null);
  const count=product.images.length;
  const move=(amount)=>setIndex((current)=>(current+amount+count)%count);
  useEffect(()=>{setIndex(0)},[product.slug]);
  useEffect(()=>{
    if(!lightbox)return;
    modal.current?.focus();
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=old};
  },[lightbox]);
  const onKey=(event)=>{
    if(event.key==='Escape')setLightbox(false);
    if(event.key==='ArrowLeft')move(rtl?1:-1);
    if(event.key==='ArrowRight')move(rtl?-1:1);
  };
  const shot=(image)=>t(`pdp.shots.${image.id}`);
  return <section className="pgal" aria-label={t('pdp.productImages')} aria-roledescription="carousel">
    <div className="gal-stage" onKeyDown={onKey}>
      <div className="gal">
        {product.images.map((image,i)=><button className={`gal__item ${i===index?'is-on':''}`} type="button" onClick={()=>setLightbox(true)} aria-label={`${t('pdp.zoomImage')} ${i+1}`} aria-hidden={i!==index} tabIndex={i===index?0:-1} key={`${image.id}-${i}`}>
          <img src={image.src} alt={`${name} — ${shot(image)}`} style={{objectPosition:image.position}} loading={i<2?'eager':'lazy'}/><span className="badge gal__tag">{shot(image)}</span>
        </button>)}
      </div>
      <button className="gal__nav gal__nav--prev" type="button" aria-label={t('pdp.previousImage')} onClick={()=>move(-1)}><Icon name={rtl?'right':'left'} className="icon icon--sm"/></button>
      <button className="gal__nav gal__nav--next" type="button" aria-label={t('pdp.nextImage')} onClick={()=>move(1)}><Icon name={rtl?'left':'right'} className="icon icon--sm"/></button>
      <span className="gal__count" aria-live="polite">{formatNumber(index+1,i18n.resolvedLanguage)} / {formatNumber(count,i18n.resolvedLanguage)}</span>
      <button className="gal__zoom" type="button" aria-label={t('pdp.zoomImage')} onClick={()=>setLightbox(true)}><Icon name="search" className="icon icon--sm"/></button>
    </div>
    <div className="gal-thumbs" role="group" aria-label={t('pdp.chooseImage')}>
      {product.images.map((image,i)=><button className={`gal-thumb ${i===index?'is-on':''}`} type="button" aria-label={`${shot(image)} ${i+1}`} aria-current={i===index} onClick={()=>setIndex(i)} key={`${image.id}-thumb-${i}`}><img src={image.src} alt="" style={{objectPosition:image.position}}/></button>)}
    </div>
    {lightbox&&<div className="lb scheme-light" role="dialog" aria-modal="true" aria-label={t('pdp.productImages')} tabIndex="-1" ref={modal} onKeyDown={onKey}>
      <div className="lb__top"><span className="lb__count">{index+1} / {count}</span><span className="lb__hint">{t('pdp.zoomHint')}</span><button className="mdl__x" type="button" style={{position:'static'}} aria-label={t('pdp.close')} onClick={()=>setLightbox(false)}><Icon name="close"/></button></div>
      <div className="lb__stage"><button className="circbtn lb__nav lb__nav--prev" type="button" aria-label={t('pdp.previous')} onClick={()=>move(-1)}><Icon name={rtl?'right':'left'}/></button><img className={`lb__img ${zoomed?'is-zoom':''}`} src={product.images[index].src} alt={`${name} — ${shot(product.images[index])}`} onClick={()=>setZoomed(!zoomed)} onMouseMove={(event)=>{if(zoomed){const rect=event.currentTarget.getBoundingClientRect();event.currentTarget.style.transformOrigin=`${(event.clientX-rect.left)/rect.width*100}% ${(event.clientY-rect.top)/rect.height*100}%`;}}}/><button className="circbtn lb__nav lb__nav--next" type="button" aria-label={t('pdp.next')} onClick={()=>move(1)}><Icon name={rtl?'left':'right'}/></button></div>
      <div className="lb__thumbs">{product.images.map((image,i)=><button className={`lb__thumb ${i===index?'is-on':''}`} type="button" onClick={()=>{setIndex(i);setZoomed(false)}} key={`${image.id}-lightbox-${i}`}><img src={image.src} alt=""/></button>)}</div>
    </div>}
  </section>;
}

function SizeGuide({ product, selectedSize, onClose }) {
  const {t}=useTranslation();
  const [unit,setUnit]=useState('cm');
  const modal=useRef(null);
  useEffect(()=>{modal.current?.focus();const key=(event)=>event.key==='Escape'&&onClose();document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[onClose]);
  const measure=(value)=>unit==='cm'?value:(value/2.54).toFixed(1);
  return <div className="mdl" role="dialog" aria-modal="true" aria-labelledby="size-guide-title"><div className="mdl__box" tabIndex="-1" ref={modal}><button className="mdl__x" aria-label={t('pdp.close')} onClick={onClose}><Icon name="close"/></button><h2 id="size-guide-title">{t('pdp.size.title')}</h2><p>{t('pdp.size.intro')}</p><div className="mdl__seg" role="group" aria-label={t('pdp.size.unit')}><button className={unit==='cm'?'is-on':''} aria-pressed={unit==='cm'} onClick={()=>setUnit('cm')}>{t('pdp.size.cm')}</button><button className={unit==='in'?'is-on':''} aria-pressed={unit==='in'} onClick={()=>setUnit('in')}>{t('pdp.size.inch')}</button></div><div className="size-table-scroll"><table className="stbl"><thead><tr>{['size','chest','length','shoulder','sleeve'].map((key)=><th key={key}>{t(`pdp.size.${key}`)}</th>)}</tr></thead><tbody>{product.sizeTable.map((row)=><tr className={selectedSize===row[0]?'is-sel':''} key={row[0]}><th>{row[0]}</th>{row.slice(1).map((value)=><td key={value}>{measure(value)}</td>)}</tr>)}</tbody></table></div></div></div>;
}

export default function ProductPage({ baseProduct, wished, onWish, onAdd }) {
  const {t,i18n}=useTranslation();
  const lang=languageCode(i18n.resolvedLanguage);
  const product=useMemo(()=>makeProduct(baseProduct,t),[baseProduct,t]);
  const copy=product.localized[lang];
  const [selected,setSelected]=useState({color:'offwhite',size:null});
  const [quantity,setQuantity]=useState(1);
  const [need,setNeed]=useState(null);
  const [adding,setAdding]=useState(false);
  const [added,setAdded]=useState(false);
  const [message,setMessage]=useState(null);
  const [openAccordion,setOpenAccordion]=useState(0);
  const [guide,setGuide]=useState(false);
  const [reviewStar,setReviewStar]=useState(0);
  const [reviewSort,setReviewSort]=useState('new');
  const [buyVisible,setBuyVisible]=useState(true);
  const [footerVisible,setFooterVisible]=useState(false);
  const [relatedProgress,setRelatedProgress]=useState({left:0,width:45});
  const buyRef=useRef(null);
  const relatedTrack=useRef(null);
  const optionRefs=useRef({});
  const timers=useRef([]);
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  useEffect(()=>{setMessage(null);setAdded(false)},[lang]);
  useEffect(()=>{setSelected({color:'offwhite',size:null});setQuantity(1);setMessage(null);window.scrollTo({top:0})},[product.slug]);
  useEffect(()=>{
    const buyObserver=new IntersectionObserver(([entry])=>setBuyVisible(entry.isIntersecting),{threshold:.2,rootMargin:'-84px 0px 0px'});
    if(buyRef.current)buyObserver.observe(buyRef.current);
    const footer=document.querySelector('.foot');
    const footerObserver=new IntersectionObserver(([entry])=>setFooterVisible(entry.isIntersecting),{threshold:.02});
    if(footer)footerObserver.observe(footer);
    return()=>{buyObserver.disconnect();footerObserver.disconnect()};
  },[]);
  const measureRelated=()=>{const node=relatedTrack.current;if(!node)return;setRelatedProgress({left:(Math.abs(node.scrollLeft)/node.scrollWidth)*100,width:Math.min(100,(node.clientWidth/node.scrollWidth)*100)});};
  const moveRelated=(direction)=>{const node=relatedTrack.current;const card=node?.firstElementChild;node?.scrollBy({left:(lang==='ar'?-direction:direction)*((card?.getBoundingClientRect().width||320)+20)*2,behavior:'smooth'});};
  useEffect(()=>{measureRelated();window.addEventListener('resize',measureRelated);return()=>window.removeEventListener('resize',measureRelated)},[lang]);
  const optionValue=(option)=>option.values.find((value)=>value.id===selected[option.id]);
  const missing=product.options.find((option)=>option.required&&!selected[option.id]);
  const unavailable=product.options.some((option)=>optionValue(option)?.available===false);
  const selectionSummary=product.options.map((option)=>optionValue(option)?.label?.[lang]||optionValue(option)?.id).filter(Boolean).join(' · ');
  const attempt=(checkout=false)=>{
    if(missing){setNeed(missing.id);optionRefs.current[missing.id]?.scrollIntoView({behavior:'smooth',block:'center'});optionRefs.current[missing.id]?.querySelector('button:not([aria-disabled="true"])')?.focus();return;}
    if(unavailable||adding)return;
    if(checkout){setMessage(t('pdp.demoCheckout'));return;}
    setAdding(true);setMessage(null);
    const timer=window.setTimeout(()=>{onAdd({...baseProduct,img:product.images[0].src},selectionSummary,quantity);setAdding(false);setAdded(true);setMessage(t('pdp.addedMessage',{quantity,name:copy.name,options:selectionSummary}));timers.current.push(window.setTimeout(()=>setAdded(false),2200));},650);
    timers.current.push(timer);
  };
  const reviews=t('pdp.reviews.items',{returnObjects:true});
  const visibleReviews=reviews.filter((review)=>!reviewStar||review.rating===reviewStar).sort((a,b)=>reviewSort==='high'?b.rating-a.rating:reviewSort==='low'?a.rating-b.rating:0);
  const assurances=t('pdp.assurances',{returnObjects:true});
  const accordions=t('pdp.accordions',{returnObjects:true});
  const facts=t('pdp.facts',{returnObjects:true});
  const related=product.relatedIds.map((id)=>products[id]).filter(Boolean);
  const discount=product.compareAt?Math.round((1-product.price/product.compareAt)*100):0;
  const showSticky=!buyVisible&&!footerVisible;
  const ctaLabel=unavailable?t('pdp.unavailable'):adding?t('pdp.adding'):added?t('pdp.added'):missing?t('pdp.select',{option:missing.label[lang].toLowerCase()}):t('pdp.add');

  return <>
    <main>
      <nav className="wrap crumbs" aria-label={t('header.primaryNav')}><ol>{t('pdp.breadcrumb',{returnObjects:true}).map((item)=><li key={item}><a href="/">{item}</a><Icon name={lang==='ar'?'left':'right'} className="icon icon--sm"/></li>)}<li><span aria-current="page">{copy.name}</span></li></ol></nav>
      <div className="wrap pdp"><Gallery product={product} name={copy.name}/><div className="pinfo">
        <div className="pinfo__head"><p className="eyebrow pinfo__brand">{product.brand}</p><h1 className="pinfo__title">{copy.name}</h1><a className="pinfo__rating" href="#reviews"><Stars/><b>{formatNumber(product.rating,i18n.resolvedLanguage)}</b><span>{t('pdp.ratingCount',{count:formatNumber(product.reviewCount,i18n.resolvedLanguage)})}</span></a><div className="price"><b>{formatPrice(product.price,i18n.resolvedLanguage)}</b>{product.compareAt&&<s>{formatPrice(product.compareAt,i18n.resolvedLanguage)}</s>}{discount>0&&<span className="badge badge--sale">{t('pdp.save',{percent:formatNumber(discount,i18n.resolvedLanguage)})}</span>}</div><p className="price__meta"><span className={`stock ${unavailable?'is-out':''}`}><i/>{unavailable?t('pdp.unavailable'):t('pdp.inStock')}</span><span className="price__note">{t('pdp.vat')}</span></p></div>
        <p className="pinfo__desc">{copy.description}</p>
        {product.options.map((option)=>{const current=optionValue(option);const hasError=need===option.id;return <fieldset className={`opt ${hasError?'is-err':''}`} ref={(node)=>{optionRefs.current[option.id]=node}} key={option.id}><div className="opt__head"><p><b>{option.label[lang]}:</b> <span className={`opt__val ${!current?'is-empty':''} ${current?.available===false?'is-na':''}`}>{current?.label?.[lang]||current?.id||t('pdp.select',{option:option.label[lang]})}</span></p>{option.guide&&<button className="link-sm" type="button" onClick={()=>setGuide(true)}>{t('pdp.sizeGuide')}</button>}</div><div className={option.type==='swatch'?'opt__swatches':'opt__pills'}>{option.values.map((value)=>{const active=selected[option.id]===value.id;const label=value.label?.[lang]||value.id;return <button className={`${option.type==='swatch'?'vsw':'pill'} ${active?'is-on':''} ${value.available===false?'is-na':''}`} type="button" aria-label={label} aria-pressed={active} aria-disabled={value.available===false} onClick={()=>{setSelected((state)=>({...state,[option.id]:value.id}));setNeed(null);setMessage(null)}} key={value.id}>{option.type==='swatch'?<i style={{background:value.hex}}/>:label}</button>})}</div>{hasError&&<p className="opt__hint is-err" role="alert">{t('pdp.missing',{option:option.label[lang].toLowerCase()})}</p>}{current?.available===false&&<p className="opt__hint is-err" role="status">{t('pdp.unavailableHint')}</p>}</fieldset>})}
        <div className="buy"><div className="buy__row" ref={buyRef}><div className="qty" role="group" aria-label={t('pdp.quantity')}><button aria-label={t('pdp.decrease')} disabled={quantity===1} onClick={()=>setQuantity(Math.max(1,quantity-1))}><Icon name="minus" className="icon icon--sm"/></button><output>{formatNumber(quantity,i18n.resolvedLanguage)}</output><button aria-label={t('pdp.increase')} disabled={quantity===10} onClick={()=>setQuantity(Math.min(10,quantity+1))}><Icon name="plus" className="icon icon--sm"/></button></div><button className={`btn btn--primary buy__atc ${unavailable?'is-na':''} ${adding?'is-loading':''} ${added?'is-done':''}`} type="button" onClick={()=>attempt(false)} aria-disabled={unavailable} aria-busy={adding}><span className="spin"/><span>{ctaLabel}</span></button><button className={`wishbtn ${wished?'is-on':''}`} aria-label={t(`pdp.${wished?'removeWishlist':'saveWishlist'}`)} aria-pressed={wished} onClick={()=>onWish(product.id)}><Icon name="heart"/></button></div><button className="btn btn--block buy__now" type="button" onClick={()=>attempt(true)} disabled={unavailable}>{t('pdp.buyNow')}</button>{quantity>1&&<p className="buy__total"><span>{t('pdp.total')} · {quantity} × {formatPrice(product.price,i18n.resolvedLanguage)}</span><b>{formatPrice(product.price*quantity,i18n.resolvedLanguage)}</b></p>}{message&&<div className="buy__msg" role="status"><Icon name="check"/><span>{message}</span>{added&&<a href="#">{t('pdp.viewBag')}</a>}</div>}</div>
        <ul className="assure">{assurances.map((item,index)=><li key={item.title}><Icon name={assuranceIcons[index]}/><div><strong>{item.title}</strong><span>{item.body}</span></div></li>)}</ul>
        <div className="pacc">{accordions.map((item,index)=><div className={`acc ${openAccordion===index?'is-open':''}`} key={item.title}><h2><button className="acc__btn" aria-expanded={openAccordion===index} onClick={()=>setOpenAccordion(openAccordion===index?null:index)}>{item.title}<span className="acc__ic"/></button></h2><div className="acc__panel"><div><p>{item.body}</p>{index===2&&<button className="link-sm" onClick={()=>setGuide(true)}>{t('pdp.sizeGuide')}</button>}</div></div></div>)}</div>
      </div></div>
      <section className="section section--alt"><div className="wrap pstory"><div className="pstory__main"><img src={images.linenStory} alt={t('pdp.story.imageAlt')}/></div><div className="pstory__copy"><div className="pstory__inset"><img src={images.linenFabric} alt={t('pdp.story.fabricAlt')}/></div><p className="eyebrow">{t('pdp.story.eyebrow')}</p><h2 className="display pstory__title">{t('pdp.story.title')}</h2><p className="lede">{t('pdp.story.body')}</p><ul className="pstory__facts">{facts.map((fact)=><li key={fact.value}><b>{fact.value}</b><span>{fact.label}</span></li>)}</ul><div><a className="link-u" href="#">{t('pdp.story.cta')}</a></div></div></div></section>
      <section className="section" id="reviews"><div className="wrap rv"><div className="rv__sum"><p className="eyebrow">{t('pdp.reviews.eyebrow')}</p><h2 className="h2">{t('pdp.reviews.title')}</h2><div className="rv__avg"><strong>{formatNumber(product.rating,i18n.resolvedLanguage)}</strong><div><Stars/><small>{t('pdp.reviews.based')}</small></div></div><div className="rv__bars" role="group" aria-label={t('pdp.reviews.filter')}>{distribution.map(([star,count])=><button className={`rv__bar ${reviewStar===star?'is-on':''}`} aria-pressed={reviewStar===star} onClick={()=>setReviewStar(reviewStar===star?0:star)} key={star}><span>{star} ★</span><i><b style={{width:`${count/126*100}%`}}/></i><em>{formatNumber(count,i18n.resolvedLanguage)}</em></button>)}</div><button className="btn btn--outline" type="button">{t('pdp.reviews.write')}</button></div><div><div className="rv__tools"><p>{t('pdp.reviews.showing',{count:formatNumber(visibleReviews.length,i18n.resolvedLanguage)})}{reviewStar>0&&<button className="rv__clear" onClick={()=>setReviewStar(0)}> {t('pdp.reviews.clear')}</button>}</p><label className="rv__sort">{t('pdp.reviews.sort')}<select value={reviewSort} onChange={(event)=>setReviewSort(event.target.value)}><option value="new">{t('pdp.reviews.newest')}</option><option value="high">{t('pdp.reviews.highest')}</option><option value="low">{t('pdp.reviews.lowest')}</option></select></label></div>{visibleReviews.map((review)=><article className="rcard" key={`${review.name}-${review.date}`}><div className="rcard__who"><strong>{review.name}</strong><span>{review.variant}</span><span className="ok"><Icon name="check" className="icon icon--sm"/>{t('pdp.reviews.verified')}</span></div><div className="rcard__body"><div className="rcard__top"><span aria-label={t('pdp.reviews.stars',{count:review.rating})}><Stars count={review.rating}/></span><time>{review.date}</time></div><h3>{review.title}</h3><p>{review.text}</p></div></article>)}{visibleReviews.length===0&&<p className="rv__empty">{t('pdp.reviews.empty')}</p>}<p className="rv__note">{t('pdp.reviews.note')}</p></div></div></section>
      <section className="section section--alt"><div className="wrap"><div className="shead"><div className="shead__l"><p className="eyebrow">{t('pdp.related.eyebrow')}</p><h2 className="h2">{t('pdp.related.title')}</h2></div><div className="shead__r"><a className="link-u" href="/">{t('pdp.related.viewAll')}</a><button className="circbtn" type="button" aria-label={t('pdp.previous')} onClick={()=>moveRelated(-1)}><Icon name={lang==='ar'?'right':'left'}/></button><button className="circbtn" type="button" aria-label={t('pdp.next')} onClick={()=>moveRelated(1)}><Icon name={lang==='ar'?'left':'right'}/></button></div></div><div className="track" ref={relatedTrack} onScroll={measureRelated} tabIndex="0" aria-label={t('pdp.related.title')}>{related.map((item)=><div key={item.id}><ProductCard product={item} rating wished={false} onWish={onWish} onAdd={onAdd}/></div>)}</div><div className="track__progress"><i style={{insetInlineStart:`${relatedProgress.left}%`,width:`${relatedProgress.width}%`}}/></div></div></section>
      <div className={`satc ${showSticky?'is-on':''}`} aria-hidden={!showSticky} role="region" aria-label={t('pdp.quickPurchase')}><div className="wrap satc__in"><img className="satc__img" src={product.images[0].src} alt=""/><div className="satc__info"><b className="satc__name">{copy.name}</b><span className={`satc__meta ${missing?'is-warn':''}`}>{missing?t('pdp.missingSelection',{option:missing.label[lang]}):t('pdp.selectedOptions',{color:optionValue(product.options[0])?.label?.[lang],size:selected.size,quantity})}</span></div><p className="satc__price"><b>{formatPrice(product.price*quantity,i18n.resolvedLanguage)}</b>{product.compareAt&&<s>{formatPrice(product.compareAt*quantity,i18n.resolvedLanguage)}</s>}</p><button className={`btn btn--primary satc__btn ${unavailable?'is-na':''} ${adding?'is-loading':''}`} type="button" onClick={()=>attempt(false)} tabIndex={showSticky?0:-1} aria-disabled={unavailable}><span className="spin"/><span>{ctaLabel}</span></button></div></div>
    </main>
    {guide&&<SizeGuide product={product} selectedSize={selected.size} onClose={()=>setGuide(false)}/>}
  </>;
}
