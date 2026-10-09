
// Presentation and keyboard enhancements for the finalized website.
function enhancePresentation(){
 const routeName=location.hash.replace(/^#\/?/,'');
 document.body.dataset.page=routeName.startsWith('product/')?'product':(['products','services','contact'].includes(routeName)?routeName:'home');
 document.querySelectorAll('a[onclick]').forEach(a=>{const match=a.getAttribute('onclick').match(/go\('([^']*)'\)/);if(match)a.setAttribute('href',match[1]?'#/'+match[1]:'#');});
 const logo=document.querySelector('.logo');logo.setAttribute('role','link');logo.tabIndex=0;logo.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go('');}};
 document.querySelectorAll('.faqq').forEach(q=>{q.tabIndex=0;q.setAttribute('role','button');q.setAttribute('aria-controls','faqa'+q.dataset.i);q.setAttribute('aria-expanded','false');q.addEventListener('click',()=>q.setAttribute('aria-expanded',String(document.getElementById('faqa'+q.dataset.i).classList.contains('open'))));q.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}};});
 document.querySelectorAll('input,textarea').forEach(el=>{if(el.placeholder)el.setAttribute('aria-label',el.placeholder)});
 document.querySelectorAll('select').forEach(el=>el.setAttribute('aria-label',el.options[0].text));
}
window.addEventListener('hashchange',enhancePresentation);
enhancePresentation();
