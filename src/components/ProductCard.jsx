import { useState } from 'react';
import { Icon, Stars } from './Icons.jsx';

export default function ProductCard({ product, rating = false, wished = false, onWish, onAdd }) {
  const [swatch, setSwatch] = useState(0);
  const [added, setAdded] = useState(false);
  const sizes = product.oneSize ? [] : ['XS','S','M','L','XL'];
  const sale = Boolean(product.was);
  const add = (size) => {
    setAdded(true);
    onAdd(product, size);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return <article className="pc">
    <div className="pc__media">
      <a href="#" aria-label={product.name}>
        <img className="pc__img pc__img--main has-alt" src={product.img} alt={product.name} loading="lazy" />
        <img className="pc__img pc__img--alt" src={product.alt} alt="" aria-hidden="true" loading="lazy" />
      </a>
      {(product.badge || sale) && <div className="pc__badges"><span className={`badge ${sale ? 'badge--sale' : 'badge--new'}`}>{sale ? `−${Math.round((1-product.price/product.was)*100)}%` : product.badge}</span></div>}
      <button className={`pc__wish ${wished ? 'is-on' : ''}`} type="button" aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={wished} onClick={() => onWish(product.id)}><span><Icon name="heart" className="icon icon--sm" /></span></button>
      <div className="pc__quick">
        {added ? <div className="pc__added" role="status"><Icon name="check" className="icon icon--sm" />Added to bag</div> : sizes.length ? <>
          <div className="pc__quick-t"><span>Quick add</span><span>Select size</span></div>
          <div className="pc__sizes">{sizes.map((size) => <button className="pc__size" type="button" key={size} onClick={() => add(size)}>{size}</button>)}</div>
        </> : <button className="pc__add" type="button" onClick={() => add(null)}>Quick add <Icon name="plus" className="icon icon--sm" /></button>}
      </div>
      <button className="pc__plus" type="button" aria-label={`Quick add ${product.name}`} onClick={() => add(sizes[2] || null)}><Icon name="plus" className="icon icon--sm" /></button>
    </div>
    <div className="pc__info">
      <p className="pc__cat">{product.cat}</p>
      <h3 className="pc__name"><a href="#">{product.name}</a></h3>
      <div className={`pc__price ${sale ? 'is-sale' : ''}`}><b>${product.price}</b>{sale && <s>${product.was}</s>}</div>
      <div className="pc__row">
        <div className="pc__swatches" role="group" aria-label="Colour">
          {product.sw.map(([name,color],index) => <button className={`sw ${swatch===index?'is-on':''}`} type="button" key={name} aria-label={name} aria-pressed={swatch===index} onClick={() => setSwatch(index)}><i style={{background:color}} /></button>)}
          <span className="pc__swname">{product.sw[swatch]?.[0]}</span>
        </div>
        {rating && <div className="pc__rating" aria-label={`Rated ${product.rating} out of 5`}><Stars count={1}/><b>{product.rating}</b><span>({product.reviews})</span></div>}
      </div>
    </div>
  </article>;
}

export function ProductCarousel({ products, wished, onWish, onAdd, trackRef, onScroll }) {
  return <div className="track" ref={trackRef} onScroll={onScroll} tabIndex="0" aria-label="Fresh Finds products">
    {products.map((product) => <div key={product.id}><ProductCard product={product} wished={Boolean(wished[product.id])} onWish={onWish} onAdd={onAdd} /></div>)}
  </div>;
}
