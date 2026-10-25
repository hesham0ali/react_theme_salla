import { useEffect, useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import ThemeCustomizer from './components/ThemeCustomizer.jsx';
import {
  BestSellersGrid, CategoryShowcase, EditorialStory, FAQ, FeaturedProductsCarousel,
  Footer, HeroSlider, Newsletter, PromotionalBanners, ShoppableLookbook,
  SocialGallery, TabbedCollections, Testimonials, TrustBenefits,
} from './components/Sections.jsx';
import { freshIds, lovedIds, products } from './data.js';
import { buildTheme, DEFAULT_SCHEMES, loadTheme, persistTheme, PRESETS } from './theme.js';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const {t,i18n}=useTranslation();
  const saved=useMemo(()=>loadTheme(),[]);
  const[selected,setSelected]=useState(saved?.selected||'preset:olive');
  const[customs,setCustoms]=useState(saved?.customs||[]);
  const[schemes,setSchemes]=useState({...DEFAULT_SCHEMES,...saved?.schemes});
  const[draft,setDraft]=useState(null);
  const[persisted,setPersisted]=useState(null);
  const[bag,setBag]=useState(2);
  const[wished,setWished]=useState({p2:true});
  const[toast,setToast]=useState(null);
  const root=useRef(null);

  const active=useMemo(()=>{
    if(draft)return{id:'draft',name:draft.name,c:draft.c};
    if(selected.startsWith('custom:')){const custom=customs.find((x)=>`custom:${x.id}`===selected);if(custom)return{id:selected,name:custom.name,c:custom.c}}
    const preset=PRESETS.find((p)=>`preset:${p.id}`===selected)||PRESETS[5];return{id:`preset:${preset.id}`,name:preset.id,presetId:preset.id,c:preset.c};
  },[selected,customs,draft]);
  const theme=useMemo(()=>buildTheme(active.c),[active]);

  useEffect(()=>{setPersisted(persistTheme({selected,customs,schemes}))},[selected,customs,schemes]);
  useEffect(()=>{if(!toast)return;const id=window.setTimeout(()=>setToast(null),3200);return()=>window.clearTimeout(id)},[toast]);
  useEffect(()=>{
    document.title=t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content',t('meta.description'));
  },[t,i18n.resolvedLanguage]);

  useGSAP(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    gsap.utils.toArray('.reveal').forEach((element)=>gsap.from(element,{opacity:0,y:32,duration:.8,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 88%',once:true}}));
  },{scope:root});

  const toggleWish=(id)=>setWished((current)=>({...current,[id]:!current[id]}));
  const addToBag=(product,size)=>{setBag((value)=>value+1);setToast({id:product.id,img:product.img,size,price:product.price})};

  return <div className="fm-root" ref={root}><div className="fm" style={{...theme.vars,'--font-display':'"Archivo", "Helvetica Neue", Arial, sans-serif','--display-stretch':'112%'}}>
    <Header bag={bag} wishCount={Object.values(wished).filter(Boolean).length} toast={toast} announceScheme={schemes.announce}/>
    <main>
      <HeroSlider/>
      <CategoryShowcase/>
      <FeaturedProductsCarousel products={freshIds.map((id)=>products[id])} wished={wished} onWish={toggleWish} onAdd={addToBag}/>
      <PromotionalBanners/>
      <BestSellersGrid products={lovedIds.map((id)=>products[id])} wished={wished} onWish={toggleWish} onAdd={addToBag}/>
      <EditorialStory/>
      <TabbedCollections productsById={products} wished={wished} onWish={toggleWish} onAdd={addToBag}/>
      <ShoppableLookbook productsById={products}/>
      <Testimonials scheme={schemes.reviews}/>
      <TrustBenefits scheme={schemes.perks}/>
      <SocialGallery/>
      <FAQ/>
      <Newsletter scheme={schemes.news}/>
    </main>
    <Footer scheme={schemes.footer}/>
  </div><ThemeCustomizer selected={selected} setSelected={setSelected} customs={customs} setCustoms={setCustoms} schemes={schemes} setSchemes={setSchemes} active={active} draft={draft} setDraft={setDraft} persisted={persisted}/></div>;
}
