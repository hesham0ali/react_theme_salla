import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber, formatPrice } from '../i18n.js';
import { Icon, Stars } from './Icons.jsx';

export default function ProductCard({ product, rating = false, wished = false, onWish, onAdd }) {
  const { t, i18n } = useTranslation();
  const [swatch, setSwatch] = useState(0);
  const [added, setAdded] = useState(false);
  const sizes = product.oneSize ? [] : ['XS','S','M','L','XL'];
  const sale = Boolean(product.was);
  const name=t(`products.${product.id}.name`);
  const category=t(`products.${product.id}.category`);
  const add = (size) => {
    setAdded(true);
    onAdd(product, size);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return <article className="pc">
    <div className="pc__media">
      <a href="#" aria-label={name}>
        <img className="pc__img pc__img--main has-alt" src={product.img} alt={name} loading="lazy" />
        <img className="pc__img pc__img--alt" src={product.alt} alt="" aria-hidden="true" loading="lazy" />
      </a>
      {(product.badge || sale) && <div className="pc__badges"><span className={`badge ${sale ? 'badge--sale' : 'badge--new'}`}>{sale ? `−${formatNumber(Math.round((1-product.price/product.was)*100),i18n.resolvedLanguage)}%` : t('common.new')}</span></div>}
      <button className={`pc__wish ${wished ? 'is-on' : ''}`} type="button" aria-label={t(`common.${wished?'removeWishlist':'saveWishlist'}`)} aria-pressed={wished} onClick={() => onWish(product.id)}><span><Icon name="heart" className="icon icon--sm" /></span></button>
      <div className="pc__quick">
        {added ? <div className="pc__added" role="status"><Icon name="check" className="icon icon--sm" />{t('common.addedToBag')}</div> : sizes.length ? <>
          <div className="pc__quick-t"><span>{t('common.quickAdd')}</span><span>{t('common.selectSize')}</span></div>
          <div className="pc__sizes" dir="ltr">{sizes.map((size) => <button className="pc__size" type="button" key={size} onClick={() => add(size)}>{size}</button>)}</div>
        </> : <button className="pc__add" type="button" onClick={() => add(null)}>{t('common.quickAdd')} <Icon name="plus" className="icon icon--sm" /></button>}
      </div>
      <button className="pc__plus" type="button" aria-label={`${t('common.quickAdd')} ${name}`} onClick={() => add(sizes[2] || null)}><Icon name="plus" className="icon icon--sm" /></button>
    </div>
    <div className="pc__info">
      <p className="pc__cat">{category}</p>
      <h3 className="pc__name"><a href="#">{name}</a></h3>
      <div className={`pc__price ${sale ? 'is-sale' : ''}`}><b>{formatPrice(product.price,i18n.resolvedLanguage)}</b>{sale && <s>{formatPrice(product.was,i18n.resolvedLanguage)}</s>}</div>
      <div className="pc__row">
        <div className="pc__swatches" role="group" aria-label={t('common.colour')}>
          {product.sw.map(([key,color],index) => <button className={`sw ${swatch===index?'is-on':''}`} type="button" key={key} aria-label={t(`colors.${key}`)} aria-pressed={swatch===index} onClick={() => setSwatch(index)}><i style={{background:color}} /></button>)}
          <span className="pc__swname">{t(`colors.${product.sw[swatch]?.[0]}`)}</span>
        </div>
        {rating && <div className="pc__rating" aria-label={t('common.rated',{rating:formatNumber(Number(product.rating),i18n.resolvedLanguage)})}><Stars count={1}/><b>{formatNumber(Number(product.rating),i18n.resolvedLanguage)}</b><span>({formatNumber(product.reviews,i18n.resolvedLanguage)})</span></div>}
      </div>
    </div>
  </article>;
}

export function ProductCarousel({ products, wished, onWish, onAdd, trackRef, onScroll }) {
  const { t } = useTranslation();
  return <div className="track" ref={trackRef} onScroll={onScroll} tabIndex="0" aria-label={t('fresh.carouselLabel')}>
    {products.map((product) => <div key={product.id}><ProductCard product={product} wished={Boolean(wished[product.id])} onWish={onWish} onAdd={onAdd} /></div>)}
  </div>;
}
