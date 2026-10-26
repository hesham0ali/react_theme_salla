export function Icon({ name, className = 'icon', ...props }) {
  const paths = {
    left: <><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>,
    right: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    down: <path d="M6 9l6 6 6-6"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/></>,
    close: <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></>,
    user: <><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/></>,
    heart: <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/>,
    bag: <><path d="M5 8.5h14l-1 12H6z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5"/>,
    instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></>,
    globe: <><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5s1.1-5.9 3.6-8.5z"/></>,
    truck: <><path d="M2.5 7h11v9h-11z"/><path d="M13.5 10h4l3 3v3h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></>,
    return: <><path d="M4 10a8 8 0 1 1 1.6 6.6"/><path d="M4 4.5V10h5.5"/></>,
    lock: <><rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></>,
    support: <><path d="M4.5 18.5V12a7.5 7.5 0 0 1 15 0v6.5"/><rect x="3" y="13" width="4" height="6" rx="1"/><rect x="17" y="13" width="4" height="6" rx="1"/></>,
  };
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

export function Stars({ count = 5 }) {
  return <span className="stars" aria-hidden="true">{Array.from({ length: count }, (_, i) => <svg key={i} viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>)}</span>;
}
