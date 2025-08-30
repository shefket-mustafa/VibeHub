export default function timeAgo(iso: string) {
    const t = new Date(iso).getTime();
    const diff = Date.now() - t;
  
    const m = Math.floor(diff / 60000);
    if (m < 1) return "now";
    if (m < 60) return `${m}m`;
  
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
  
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d`;
  
    const w = Math.floor(d / 7);
    if (w < 4) return `${w}w`;
  
    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo}mo`;
  
    const y = Math.floor(d / 365);
    return `${y}y`;
  }