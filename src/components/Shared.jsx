import { Icon } from './Icons.jsx';
import { useTranslation } from 'react-i18next';
import { isRtlLanguage } from '../i18n.js';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return <a className={`btn btn--${variant} ${className}`} href="#" {...props}>{children}</a>;
}

export function SectionHeading({ eyebrow, title, action, controls, children }) {
  const { t } = useTranslation();
  const actionText=action===undefined?t('common.viewAll'):action;
  return <div className="shead reveal">
    <div className="shead__l"><p className="eyebrow">{eyebrow}</p><h2 className="h2">{title}</h2>{children}</div>
    <div className="shead__r">{actionText && <a className="link-u" href="#">{actionText}</a>}{controls}</div>
  </div>;
}

export function CategoryCard({ name, meta, img, className }) {
  const { t, i18n } = useTranslation();
  return <a className={`cat ${className}`} href="#">
    <img src={img} alt={t('categories.collectionAlt',{name})} loading="lazy" />
    <div className="cat__label"><div><p className="cat__name">{name}</p><p className="cat__meta">{meta}</p></div><span className="cat__go"><Icon name={isRtlLanguage(i18n.resolvedLanguage)?'left':'right'} /></span></div>
  </a>;
}
