import { Icon } from './Icons.jsx';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return <a className={`btn btn--${variant} ${className}`} href="#" {...props}>{children}</a>;
}

export function SectionHeading({ eyebrow, title, action = 'View all', controls, children }) {
  return <div className="shead reveal">
    <div className="shead__l"><p className="eyebrow">{eyebrow}</p><h2 className="h2">{title}</h2>{children}</div>
    <div className="shead__r">{action && <a className="link-u" href="#">{action}</a>}{controls}</div>
  </div>;
}

export function CategoryCard({ name, meta, img, className }) {
  return <a className={`cat ${className}`} href="#">
    <img src={img} alt={`${name} collection`} loading="lazy" />
    <div className="cat__label"><div><p className="cat__name">{name}</p><p className="cat__meta">{meta}</p></div><span className="cat__go"><Icon name="right" /></span></div>
  </a>;
}
