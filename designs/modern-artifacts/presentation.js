
// Presentation and keyboard enhancements; original content and router are preserved above.
function enhancePresentation(){
 document.title=document.title.replace(/ \| Design 4 — Systems$/,'')+' | Design 4 — Systems';
 const routeName=location.hash.replace(/^#\/?/,'');
 document.body.dataset.page=routeName.startsWith('product/')?'product':(['products','services','contact'].includes(routeName)?routeName:'home');
 if(document.body.dataset.page==='home') injectSystemArtifacts();
 document.querySelectorAll('a[onclick]').forEach(a=>{const match=a.getAttribute('onclick').match(/go\('([^']*)'\)/);if(match)a.setAttribute('href',match[1]?'#/'+match[1]:'#');});
 const logo=document.querySelector('.logo');logo.setAttribute('role','link');logo.tabIndex=0;logo.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go('');}};
 document.querySelectorAll('.faqq').forEach(q=>{q.tabIndex=0;q.setAttribute('role','button');q.setAttribute('aria-controls','faqa'+q.dataset.i);q.setAttribute('aria-expanded','false');q.addEventListener('click',()=>q.setAttribute('aria-expanded',String(document.getElementById('faqa'+q.dataset.i).classList.contains('open'))));q.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}};});
 document.querySelectorAll('input,textarea').forEach(el=>{if(el.placeholder)el.setAttribute('aria-label',el.placeholder)});
 document.querySelectorAll('select').forEach(el=>el.setAttribute('aria-label',el.options[0].text));
}

function injectSystemArtifacts(){
 const hero=document.querySelector('#app>section:first-child');
 const heroWrap=hero&&hero.querySelector('.wrap');
 if(!heroWrap||heroWrap.querySelector('.hero-artifacts'))return;
 heroWrap.insertAdjacentHTML('afterbegin',`<div class="hero-artifacts" aria-hidden="true">
  <svg class="system-artifact system-artifact--modules" viewBox="0 0 180 260" focusable="false">
   <defs><linearGradient id="module-fill" x1="0" y1="0" x2="1" y2="1"><stop stop-color="currentColor" stop-opacity=".12"/><stop offset="1" stop-color="currentColor" stop-opacity=".025"/></linearGradient></defs>
   <g class="module-stack">
    <rect x="22" y="104" width="118" height="82" rx="17" transform="rotate(-8 81 145)"/>
    <rect x="30" y="78" width="118" height="82" rx="17" transform="rotate(-8 89 119)"/>
    <rect class="module-stack__top" x="38" y="52" width="118" height="82" rx="17" transform="rotate(-8 97 93)" fill="url(#module-fill)"/>
    <path d="M64 78h27v20H64zM99 73h31v20H99zM68 106h62"/>
    <circle cx="69" cy="116" r="3"/><circle cx="91" cy="113" r="3"/><circle cx="113" cy="110" r="3"/><path class="module-signal" d="m69 116 22-3 22-3"/>
   </g>
   <path class="artifact-accent" d="M42 207h78M42 218h50"/><circle class="artifact-dot" cx="130" cy="207" r="4"/>
  </svg>
  <svg class="system-artifact system-artifact--logic" viewBox="0 0 180 260" focusable="false">
   <circle class="logic-orbit" cx="91" cy="116" r="63"/>
   <path class="logic-route" d="M91 116 51 76M91 116l49-28M91 116l39 49M91 116l-47 31"/>
   <g class="logic-core"><path d="m91 83 29 17v33l-29 17-29-17v-33z"/><path d="m76 127 15-23 15 23M81 119h20"/></g>
   <g class="logic-nodes"><circle cx="51" cy="76" r="8"/><circle cx="140" cy="88" r="8"/><circle cx="130" cy="165" r="8"/><circle cx="44" cy="147" r="8"/></g>
   <path class="artifact-accent" d="M59 210h79M87 221h51"/><circle class="artifact-dot" cx="49" cy="210" r="4"/>
  </svg>
 </div>`);
}
window.addEventListener('hashchange',enhancePresentation);
enhancePresentation();
