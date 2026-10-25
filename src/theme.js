export const PRESETS = [
  { id:'monochrome', name:'Modern Monochrome', desc:'Minimal · clean', c:{ bg:'#FFFFFF',surface:'#F3F3F3',text:'#171717',muted:'#666666',accent:'#111111',onAccent:'#FFFFFF' } },
  { id:'forest', name:'Forest Green', desc:'Natural · confident', c:{ bg:'#FFFFFF',surface:'#E8EDE7',text:'#17251C',muted:'#59675C',accent:'#24683E',onAccent:'#FFFFFF' } },
  { id:'luxury', name:'Warm Luxury', desc:'Perfume · oud', c:{ bg:'#F8F5EF',surface:'#E9E2D8',text:'#2A231D',muted:'#665B50',accent:'#755437',onAccent:'#FFFFFF' } },
  { id:'ocean', name:'Ocean Blue', desc:'Modern · fresh', c:{ bg:'#FFFFFF',surface:'#E7EFF6',text:'#172B40',muted:'#506779',accent:'#176799',onAccent:'#FFFFFF' } },
  { id:'bloom', name:'Soft Bloom', desc:'Expressive · beauty', c:{ bg:'#FFF8FA',surface:'#F4E4ED',text:'#351F32',muted:'#775B70',accent:'#A02C64',onAccent:'#FFFFFF' } },
  { id:'olive', name:'Earth & Olive', desc:'Editorial · FORME default', c:{ bg:'#F7F6F2',surface:'#EEEDE9',text:'#171717',muted:'#5B5B52',accent:'#565A42',onAccent:'#FFFFFF' } },
];

export const COLOR_FIELDS = [
  ['bg','Background','Page sections'],['surface','Surface','Alternate sections, cards'],
  ['text','Primary text','Headings, body, outlines'],['muted','Secondary text','Captions, meta'],
  ['accent','Accent','Primary buttons, active states'],['onAccent','Accent contrast','Text on accent'],
];
export const DEFAULT_SCHEMES = { announce:'dark', reviews:'light', perks:'light', news:'light', footer:'dark' };
export const STORE_KEY = 'forme.theme.v1';

const normHex = (hex) => {
  let value = String(hex || '').trim().replace('#','');
  if (value.length === 3) value = value.split('').map((char) => char + char).join('');
  return /^[0-9a-fA-F]{6}$/.test(value) ? `#${value.toUpperCase()}` : null;
};
const rgb = (hex) => { const n = parseInt(normHex(hex).slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; };
const hex = (values) => `#${values.map((v) => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('').toUpperCase()}`;
const mix = (a,b,t) => { const A=rgb(a), B=rgb(b); return hex(A.map((v,i) => v+(B[i]-v)*t)); };
const luminance = (color) => { const values=rgb(color).map((v) => { v/=255; return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4); }); return .2126*values[0]+.7152*values[1]+.0722*values[2]; };
export const contrast = (a,b) => { const x=luminance(a), y=luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };
const ensure = (color,against,target) => {
  if (Math.min(...against.map((bg) => contrast(color,bg))) >= target) return color;
  const avg=against.reduce((sum,bg)=>sum+luminance(bg),0)/against.length;
  for (const end of avg>.18?['#000000','#FFFFFF']:['#FFFFFF','#000000']) {
    for (let t=.04;t<=1.001;t+=.04) { const candidate=mix(color,end,t); if (Math.min(...against.map((bg)=>contrast(candidate,bg)))>=target) return candidate; }
  }
  return '#000000';
};

export function buildTheme(c) {
  const L={ bg:c.bg, alt:c.surface };
  L.text=ensure(c.text,[L.bg,L.alt],4.5); L.muted=ensure(c.muted,[L.bg,L.alt],4.5); L.accent=c.accent;
  L.onAccent=ensure(c.onAccent,[L.accent],4.5); L.accentHover=mix(L.accent,luminance(L.onAccent)>.5?'#000000':'#FFFFFF',.16);
  L.accentText=ensure(c.accent,[L.bg,L.alt],4.5); L.focus=ensure(c.accent,[L.bg,L.alt],3); L.sale=ensure('#9C3F2A',[L.bg,L.alt],4.5); L.onSale=ensure('#FFFFFF',[L.sale],4.5); L.error=ensure('#A3321F',[L.bg,L.alt],4.5);
  let dark=luminance(c.text)<=luminance(c.bg)?c.text:c.bg; while(luminance(dark)>.045) dark=mix(dark,'#000000',.12);
  const D={bg:dark}; D.text=ensure(luminance(c.text)<=luminance(c.bg)?c.bg:c.text,[D.bg],7); D.alt=mix(D.bg,D.text,.07); D.muted=ensure(mix(D.text,D.bg,.3),[D.bg,D.alt],4.5);
  D.accent=contrast(c.accent,D.bg)>=3?c.accent:ensure(c.accent,[D.bg,D.alt],3); D.onAccent=ensure(c.onAccent,[D.accent],4.5); D.accentHover=mix(D.accent,luminance(D.onAccent)>.5?'#000000':'#FFFFFF',.16); D.accentText=ensure(mix(c.accent,D.text,.35),[D.bg,D.alt],4.5); D.focus=ensure(c.accent,[D.bg,D.alt],3); D.sale=ensure(mix('#9C3F2A','#FFFFFF',.45),[D.bg,D.alt],4.5); D.onSale=ensure(D.bg,[D.sale],4.5); D.error=ensure('#F08A75',[D.bg,D.alt],4.5);
  const vars={};
  const put=(prefix,o)=>{ Object.entries({bg:o.bg,alt:o.alt,text:o.text,muted:o.muted,accent:o.accent,'accent-hover':o.accentHover,'on-accent':o.onAccent,'accent-text':o.accentText,focus:o.focus,sale:o.sale,'on-sale':o.onSale,error:o.error}).forEach(([key,value])=>{vars[`${prefix}${key}`]=value;}); };
  put('--l-',L); put('--d-',D); vars['--img-btn-bg']=L.bg; vars['--img-btn-text']=L.text; vars['--on-image']='#FFFFFF';
  return {L,D,vars};
}

export function auditPalette(c) {
  const rows=[
    ['text','Primary text on background',c.text,c.bg,4.5,[c.bg,c.surface]],['text','Primary text on surface',c.text,c.surface,4.5,[c.bg,c.surface]],
    ['muted','Secondary text on background',c.muted,c.bg,4.5,[c.bg,c.surface]],['muted','Secondary text on surface',c.muted,c.surface,4.5,[c.bg,c.surface]],
    ['onAccent','Button label on accent',c.onAccent,c.accent,4.5,[c.accent]],['accent','Accent as text / links',c.accent,c.bg,4.5,[c.bg,c.surface]],
    ['accent','Accent buttons vs background',c.accent,c.bg,3,[c.bg]],
  ];
  return rows.map(([key,label,fg,bg,target,against])=>{const ratio=contrast(fg,bg);return {key,label,fg,bg,target,ratio:ratio.toFixed(1),ok:ratio>=target,fix:ratio>=target?null:ensure(fg,against,target)};});
}

export function loadTheme() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch { return null; }
}

export function persistTheme(value) {
  try { localStorage.setItem(STORE_KEY,JSON.stringify(value)); return true; } catch { return false; }
}
