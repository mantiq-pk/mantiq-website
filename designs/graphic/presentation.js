
(()=>{
const art=`<svg viewBox="0 0 560 490" aria-hidden="true" focusable="false">
<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#484c3d" stroke-width=".5"/></pattern></defs>
<path d="M44 384L293 237L535 377L285 523Z" fill="url(#grid)" opacity=".5"/>


<g fill="none" stroke="#71795c" stroke-width="1"><path d="M145 207L283 127L423 207L284 288Z"/><path d="M145 207V368L284 449L423 368V207M284 288V449M145 368L283 288L423 368M283 127V288"/><path d="M191 181L331 260V422M237 154L377 235V396M191 395V234L330 154M237 422V261L376 180M145 260L284 342L423 261M145 314L284 395L423 314"/></g>
<g stroke="#dcf88a" stroke-width="1.2"><path d="M192 179L238 152L284 179L238 207Z" fill="#dcf88a"/><path d="M192 179V233L238 260V207Z" fill="#9eaf64"/><path d="M238 207L284 179V233L238 260Z" fill="#bdcf80"/>
<path d="M284 179L331 152L377 179L331 206Z" fill="#dcf88a"/><path d="M284 179V233L331 260V206Z" fill="#9eaf64"/><path d="M331 206L377 179V233L331 260Z" fill="#bdcf80"/>
<path d="M238 99L284 72L331 99L284 126Z" fill="#e7ffab"/><path d="M238 99V153L284 180V126Z" fill="#a5ba67"/><path d="M284 126L331 99V153L284 180Z" fill="#c9e188"/>
<path d="M238 260L284 233L331 260L284 287Z" fill="#dcf88a"/><path d="M238 260V314L284 341V287Z" fill="#9eaf64"/><path d="M284 287L331 260V314L284 341Z" fill="#bdcf80"/>
</g>


<path d="M365 101H452V86M179 344H79V359" fill="none" stroke="#929a7a" stroke-width=".7"/>
<g fill="#a7af91" font-size="9" font-family="monospace"></g><g stroke="#dcf88a" stroke-width="1"><path d="M479 345V359M472 352H486M107 124V136M101 130H113"/></g>
</svg>`;
function enhance(){
const hash=location.hash.replace(/^#\/?/,'');
const home=!hash||!['products','services','contact'].includes(hash)&&!hash.startsWith('product/');
document.body.dataset.page=home?'home':hash.startsWith('product/')?'product':hash;
document.title=document.title.replace(/ \| Design 3 — Graphic$/,'')+' | Design 3 — Graphic';
if(matchMedia('(max-width:760px)').matches)document.querySelector('[aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'center'});
if(home){const hero=document.querySelector('#app>section:first-child>.wrap');if(hero&&!hero.querySelector('.builder-art')){const illustration=document.createElement('div');illustration.className='builder-art';illustration.setAttribute('aria-hidden','true');illustration.innerHTML=art;const summary=document.createElement('div');summary.className='hero-summary';const message=document.createElement('div');message.className='hero-message';message.append(hero.querySelector('.lead'),' ');hero.querySelectorAll(':scope > .cta').forEach(link=>message.append(link,' '));summary.append(message,illustration);hero.insertBefore(summary,hero.querySelector('.focusrow'));}}
}
new MutationObserver(enhance).observe(document.getElementById('app'),{childList:true});
enhance();
})();
