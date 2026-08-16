document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body;
  requestAnimationFrame(()=>body.classList.add('page-ready'));
  const navToggle=document.querySelector('.mobile-nav-toggle');
  const nav=document.querySelector('#main-nav');
  if(navToggle && nav){navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}));}
  const progress=document.querySelector('.page-progress span');
  const updateProgress=()=>{if(!progress)return;const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';};window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
  document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('javascript:')||a.target==='_blank'||a.hasAttribute('download'))return;let url;try{url=new URL(href,location.href)}catch{return}if(url.origin!==location.origin)return;a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return; if(url.pathname===location.pathname && url.search===location.search)return;e.preventDefault();body.classList.add('page-leaving');setTimeout(()=>{location.href=url.href},170);});});
  document.querySelectorAll('.flash').forEach(el=>setTimeout(()=>{el.style.opacity='.0';el.style.transform='translateY(-6px)';setTimeout(()=>el.remove(),220)},5200));
});

function initChat(){
  const roots = document.querySelectorAll('[data-chat-root], .team-chat[data-chat-channel]');
  if(!roots.length) return;
  roots.forEach(root=>{
    const messagesEl = root.querySelector('[data-chat-messages]');
    const form = root.querySelector('[data-chat-form]');
    if(!messagesEl || !form) return;
    const channel = root.dataset.chatChannel || 'general';
    let teamId = root.dataset.teamId || '';
    let lastSignature = '';
    const render = data => {
      const sig = (data.messages||[]).map(m=>m.id+':'+m.body).join('|');
      if(sig === lastSignature && messagesEl.dataset.ready) return;
      lastSignature = sig; messagesEl.dataset.ready='1';
      messagesEl.innerHTML='';
      if(!data.messages || !data.messages.length){messagesEl.innerHTML='<div class="chat-empty">Hali xabarlar yo‘q. Birinchi xabarni yuboring.</div>';return;}
      data.messages.forEach(m=>{
        const row=document.createElement('div'); row.className='chat-message'+(m.mine?' mine':'');
        const meta=document.createElement('div'); meta.className='chat-meta';
        const ts=document.createElement('span'); ts.className='chat-time'; ts.textContent='['+m.created_at+']';
        const who=document.createElement('span'); who.className='chat-user'; who.textContent=m.username+'@cybertrip:~$';
        meta.append(ts,document.createTextNode(' '),who);
        const bubble=document.createElement('div'); bubble.className='chat-bubble'; bubble.textContent=m.body;
        row.append(meta,bubble); messagesEl.appendChild(row);
      });
      messagesEl.scrollTop=messagesEl.scrollHeight;
    };
    const load = async()=>{
      try{
        const q=new URLSearchParams({channel}); if(teamId) q.set('team_id',teamId);
        const r=await fetch('/chat/messages?'+q.toString(),{headers:{'Accept':'application/json'}});
        if(r.ok) render(await r.json());
      }catch(e){}
    };
    form.addEventListener('submit', async e=>{
      e.preventDefault(); const input=form.querySelector('input[name="body"]'); if(!input.value.trim()) return;
      const body=new URLSearchParams({channel,body:input.value.trim()}); if(teamId) body.set('team_id',teamId);
      const btn=form.querySelector('button'); btn.disabled=true;
      try{const r=await fetch('/chat/send',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','Accept':'application/json'},body}); if(r.ok){input.value='';await load();}else{const d=await r.json().catch(()=>({})); if(d.error==='rate_limited') alert('Juda tez yuboryapsiz. Biroz kuting.');}}finally{btn.disabled=false;}
    });
    load(); root._chatLoad=()=>load(); setInterval(()=>{ if(document.visibilityState==='visible') load(); },4000);
  });
  document.querySelectorAll('[data-chat-select]').forEach(btn=>btn.addEventListener('click',()=>{
    const ch=btn.dataset.chatSelect, tid=btn.dataset.teamId||'';
    const url=new URL(location.href); if(ch==='general') url.searchParams.delete('team'); else url.searchParams.set('team',tid); location.href=url.toString();
  }));
}
document.addEventListener('DOMContentLoaded', initChat);


document.addEventListener('click',e=>{
  const b=e.target.closest('[data-copy-secret]'); if(!b) return;
  navigator.clipboard?.writeText(b.dataset.copySecret).then(()=>{const old=b.textContent;b.textContent='Nusxalandi ✓';setTimeout(()=>b.textContent=old,1600)});
});
