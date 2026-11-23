// Cache para o site abrir mais rápido e funcionar offline depois da primeira visita.
const V='cartucho-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range'))return;
  if(u.pathname.includes('/emulator/')){ // emulador: cache primeiro (não muda)
    e.respondWith(caches.match(r).then(c=>c||fetch(r).then(n=>{if(n.ok)caches.open(V).then(x=>x.put(r,n.clone()));return n})));
  }else{ // resto: rede primeiro, cache se estiver offline
    e.respondWith(fetch(r).then(n=>{if(n.ok)caches.open(V).then(x=>x.put(r,n.clone()));return n}).catch(()=>caches.match(r)));
  }
});
