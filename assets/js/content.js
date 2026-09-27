
const PRODUCTS = [
{slug:'ilma-cms', name:'ILMA CMS', tag:'Schools & Colleges',
 blurb:'A complete campus management system covering admissions, attendance, academics, fees, LMS and AI-assisted grading — built for institutes with multiple branches.',
 plans:[
  {name:'Starter', price:'Low fixed fee / mo', note:'Up to 200 students, 1 branch', items:['Student & staff records','Attendance tracking','Communication tools','Basic fee tracking']},
  {name:'Growth', price:'Base + per-student', note:'201–1,000 students', items:['Everything in Starter','LMS','Exams & grading','AI chatbot & auto-grading add-on']},
  {name:'Institute Pro', price:'Discounted per-student', note:'1,001–5,000 / multi-branch', items:['Everything in Growth','Multi-branch console','Full AI suite bundled','Transport & hostel modules']},
  {name:'Enterprise', price:'Custom', note:'5,000+ students / university', items:['Full platform','Dedicated infrastructure','Custom integrations','SLA-backed support']},
 ],
 features:[
  {h:'Academics & Records', items:['Student & staff profiles','Admissions & enrollment','Classes & sections','Subjects, timetable, exams & results']},
  {h:'Attendance & Communication', items:['Manual / QR / RFID / biometric attendance','Announcements & messaging','Parent, teacher & student notifications']},
  {h:'Finance', items:['Fee structure, invoices & payments','Discounts & scholarships','Refunds','Financial reports']},
  {h:'Learning (LMS)', items:['Course materials & past papers','Assignments & MCQ auto-grading','Progress tracking']},
  {h:'AI Copilots (per role)', items:['AI Study Buddy for students','AI Teacher Copilot for lesson plans & quizzes','AI Assessment Assistant (human-reviewed)','AI Admin & Finance Copilots']},
  {h:'Multi-Branch', items:['Branch switcher & cross-branch dashboards','Institute-wide reports','Plans, billing & feature flags']},
 ]},
{slug:'ilma-islamic', name:'ILMA — Islamic Institutions Edition', tag:'Madrasas · Masajid · Quran Academies',
 blurb:'The ILMA platform adapted for madrasas, Quran academies, Islamic schools and masajid — where donations, zakat and sponsorships replace standard fee collection.',
 plans:[
  {name:'Starter', price:'Free', note:'Masjid essentials', items:['Donor records','Donation entry & receipts','Prayer timings & announcements']},
  {name:'Growth', price:'Paid modules', note:'Active donation programs', items:['Payment gateway','Recurring donations & pledges','Donor portal','Advanced reports']},
  {name:'Institution', price:'Tiered by size', note:'Madrasas, Quran academies', items:['Everything in Growth','Quran / Hifz class management','Student sponsorship tracking','AI copilot (limited scope)']},
  {name:'Enterprise', price:'Custom', note:'Multi-branch Waqf / NGO networks', items:['Full ILMA platform','Multi-branch consolidation','Custom terminology & workflows','Dedicated support']},
 ],
 features:[
  {h:'Money', items:['Donations with donor, amount & fund type','Fund types: Zakat, Sadaqah, general, construction','Recurring donors & pledges with reminders','Campaigns with progress bars & public page','Fund-wise balances kept separate']},
  {h:'Community & People', items:['Member & donor directory by household','Committee roles & permissions','Volunteer management','Donor portal with history']},
  {h:'Masjid Operations', items:['Prayer & Jummah timings + announcements','Event management (Ramadan, Taraweeh, Eid, Ijtema)','Janazah & urgent announcements','Imam & staff records incl. salary','Hall booking, inventory & assets']},
  {h:'Student Sponsorship', items:['Sponsor ↔ student ↔ commitment tracking','Remaining balance & sponsorship history','Monthly sponsorship report for donors']},
  {h:'Communication', items:['WhatsApp / SMS broadcasts','Public masjid page with timings & campaigns']},
  {h:'AI (Limited Scope)', items:['Admin copilot for collection & pledge questions','Automatic monthly reports & draft announcements','Never classifies Zakat or issues religious rulings']},
 ]},
{slug:'mantiq-os', name:'Mantiq Business OS', tag:'Inventory · Sales · Payments · Accounting · AI',
 blurb:'A Pakistan-first business operating system connecting inventory, sales, payments, customers and AI in one platform — not just a POS.',
 plans:[
  {name:'Starter', price:'Entry pricing', note:'Core operations', items:['Inventory / stock tracking','Payment due (customer udhaar)','Payment integration','WhatsApp messaging','Big-purchase receipts']},
  {name:'Growth', price:'Mid-tier', note:'Growing businesses', items:['Everything in Starter','Smart business dashboard','Multi-warehouse / branches','Purchasing & supplier management']},
  {name:'Enterprise', price:'Custom', note:'Larger operations', items:['Everything in Growth','AI Business Copilot','Automation rules','Full accounting & e-commerce integrations']},
 ],
 features:[
  {h:'Inventory / Stock', items:['Real-time stock: available, reserved, sold, damaged, in-transit','Full stock ledger per product','Purchase → warehouse → sale → return → adjustment','Low/out-of-stock alerts','Stock counts & audits with full trail']},
  {h:'Product Setup', items:['SKU, barcode, QR, category, brand, supplier','Purchase / selling / wholesale / retail pricing','Variants & multiple units','Serial numbers, batches, expiry dates']},
  {h:'Payment Due (Receivables)', items:['Customer profiles with credit limit & history','Outstanding balance with aging','Partial-payment tracking','Automatic overdue reminders']},
  {h:'Payment Integration', items:['Cash, card, bank transfer, Raast, QR, wallets','Payment links & QR invoices','Auto-matching payment → invoice → ledger','Review queue for unmatched payments']},
  {h:'WhatsApp Messaging', items:['Invoices, receipts & reminders via WhatsApp','Order confirmations & delivery updates','Payment links sent directly in chat']},
  {h:'Smart Dashboard & AI', items:['Sales, profit & cash-flow trends','Best-selling & dead-stock products','AI Business Copilot for natural-language insights','Automation rules to cut manual work']},
 ]},
{slug:'education-ai', name:'Pakistan Education AI Agent', tag:'Students & Teachers',
 blurb:"An AI study and teaching companion trained on Pakistan's board curricula — not a generic chatbot — working in Urdu, English and Roman Urdu.",
 plans:[
  {name:'Basic', price:'Free', note:'1 subject, 1 board', items:['15–20 Q&A per day','One board/curriculum','Sample past papers & MCQs','Text-only']},
  {name:'Subscription', price:'Monthly or termly', note:'All boards & subjects', items:['Unlimited Q&A, all subjects','All boards + Cambridge O/A Level','Full past-paper archive & mock tests','Voice + snap-a-photo doubt solving','Offline / low-bandwidth mode']},
  {name:'Institution', price:'Custom', note:'Schools, academies, tuition centers', items:['Multi-teacher, multi-class dashboard','Bulk student onboarding','Custom branding','Bulk WhatsApp broadcast to parents']},
 ],
 features:[
  {h:'Learning & Doubt-Solving', items:['Subject-wise Q&A tutor mapped to board & grade','Step-by-step solutions, not just answers','Snap-a-photo doubt solving','Voice-based Q&A','Bilingual Urdu/English + Roman Urdu']},
  {h:'Exam Preparation', items:['Solved & unsolved past papers by board/year','Auto-generated MCQ & short-question practice','MDCAT / ECAT / NAT entry-test prep','Personalized revision schedule','Mock tests with instant scoring']},
  {h:'Study Tools', items:['Flashcards & spaced repetition','Essay assistant with plagiarism check','Progress dashboard & streaks','Gamification: badges & leaderboards']},
  {h:'Teacher Tools', items:['Lesson-plan generator aligned to SLOs','Quiz, worksheet & test generator','Slide-deck generator & rubric builder','Auto-grading + AI-assisted essay grading (teacher confirms)']},
  {h:'Institution Layer', items:['Multi-teacher, multi-class dashboard','Bulk onboarding & analytics','Custom branding','Bulk WhatsApp broadcasts']},
 ]},
{slug:'law-quest', name:'Law Quest', tag:'Legal Client–Lawyer Platform',
 blurb:'An enterprise-grade platform where clients and verified lawyers run a case end to end — consultation, documents, hearings and payments — in one secure workspace.',
 plans:[
  {name:'Starter', price:'PKR 3,000–5,000 / mo', note:'Solo lawyer, limited matters', items:['Verified profile','Limited active matters','Basic case workspace']},
  {name:'Professional', price:'PKR 10,000–20,000 / mo', note:'Solo / small chambers', items:['Full case management','E-sign','Video consultations']},
  {name:'Chambers', price:'PKR 40,000–90,000 / mo', note:'Up to ~10 users', items:['Team roles','Analytics','Everything in Professional']},
  {name:'Enterprise', price:'Custom annual contract', note:'Firms, banks, corporate legal', items:['Multi-tenant organizations','Ethical walls','SSO, API, data residency','SLA support']},
 ],
 features:[
  {h:'Onboarding & Verification', items:['Client OTP/email + CNIC verification','Lawyer bar-council & court-level verification','Practice-area tagging with proof','Firm/chambers onboarding with roles']},
  {h:'Discovery & Matching', items:['Search by practice area, city, court, fee range','Guided intake with category suggestion','Verified reviews from completed engagements only']},
  {h:'Engagement', items:['In-platform chat with attachments','Voice & video consultations','Automated off-platform contact detection','Engagement letter with e-sign','Urdu/English UI with RTL support']},
  {h:'Case Management', items:['Matter workspace: parties, court, stage, timeline','Court hierarchy & case-type templates','Hearing calendar with reminders','Document vault with versioning']},
  {h:'Documents & Drafting', items:['Wakalatnama, affidavits, notices & more','Bilingual clause library','E-sign with audit trail','Optional AI drafting — always lawyer-reviewed']},
  {h:'Payments & Research', items:['Raast, JazzCash, Easypaisa, cards','Milestone-based protected payments','Case-law citation support','Complaint & dispute resolution center']},
 ]},
];

const SERVICES = [
 ['Web Development','Marketing sites, dashboards and custom web platforms built to scale.'],
 ['Mobile App Development','Native and cross-platform apps for iOS and Android.'],
 ['AR / VR Development','Immersive experiences for training, retail and product visualization.'],
 ['WordPress Development','Custom themes, plugins and full WordPress builds for content-driven sites.'],
 ['UI/UX Design','Research-backed interfaces that are easy to use and on-brand.'],
 ['Cloud & DevOps','Infrastructure, CI/CD pipelines and cloud architecture that scales with you.'],
 ['AI/ML Integration','Copilots, chatbots and automation built into your existing product.'],
 ['E-commerce Development','Online stores with payments, inventory and order management built in.'],
 ['Custom Software & SaaS','End-to-end product builds, from first prototype to a live platform.'],
 ['QA & Testing','Manual and automated testing to catch issues before your users do.'],
 ['Maintenance & Support','Ongoing updates, monitoring and support after launch.'],
 ['Product Strategy & Consulting','Idea validation, roadmapping and technical direction.'],
];

const TESTIMONIALS = [
 ["Mantiq took our idea from a rough spec to a working platform faster than any team we've worked with.", "Ayesha R.", "Operations Lead, education sector"],
 ["The AI features actually get used by our staff — not just a demo feature nobody touches.", "Bilal K.", "Founder, retail business"],
 ["They understood our local payment and compliance needs from day one — no back and forth explaining basics.", "Sana M.", "Product Manager, fintech"],
];

const FAQ = [
 ["How do I get a quote?", "Fill out the contact form with a short project description — we typically reply within one business day with a scoping call."],
 ["Do you offer fixed-price or hourly billing?", "Both. Most product builds run fixed-price per milestone; ongoing support and small changes are billed hourly."],
 ["Can you sign an NDA before we share details?", "Yes — happy to sign an NDA before any detailed discussion of your project."],
 ["Do you work with international clients?", "Yes, we work with clients across time zones and can accommodate async communication."],
];

function slugName(s){ return (PRODUCTS.find(p=>p.slug===s)||{}).name || ''; }

function renderHome(){
 return `
 <section style="padding-top:110px;">
  <div class="wrap">
   <div class="eyebrow">Digital Products · SaaS · AI Platforms</div>
   <h1>We build digital products that solve real problems.</h1>
   <p class="lead">Mantiq is a product studio designing and building AI-powered SaaS, business platforms, and web &amp; mobile products from idea to launch.</p>
   <a onclick="go('products')" class="cta">View Our Products</a>
   <a onclick="go('contact')" class="cta ghost">Get in Touch</a>
   <div class="focusrow">
    <span>AI-Powered SaaS</span><span>Business Platforms</span><span>Web &amp; Mobile Products</span><span>Product Strategy &amp; Development</span>
   </div>
  </div>
 </section>
 <section style="padding-top:0;">
  <div class="wrap">
   <div class="eyebrow">What We Know</div>
   <h2>Built from real sector research</h2>
   <p class="lead">Every product starts from a documented spec for its sector, not a generic template.</p>
   <div class="grid3">
    <div class="card"><h3>Pakistan-first by default</h3><p>PKR pricing, Raast, JazzCash and Easypaisa, plus Urdu and Roman Urdu support built in from day one.</p></div>
    <div class="card"><h3>AI with guardrails</h3><p>Every AI suggestion — grading, drafting, fund classification — stays reviewed by a human before it's final.</p></div>
    <div class="card"><h3>Deep sector context</h3><p>Education, campus management, legal services and community finance each get their own workflows, not a one-size-fits-all screen.</p></div>
   </div>
  </div>
 </section>
 <section style="padding-top:0;">
  <div class="wrap">
   <div class="eyebrow">Benefits</div>
   <h2>Why teams choose Mantiq</h2>
   <div class="grid2">
    <div class="card"><h3>Fast to launch</h3><p>Modular products you can start small with and grow into as your needs change.</p></div>
    <div class="card"><h3>Local payments built-in</h3><p>Raast, JazzCash, Easypaisa and cards, connected straight to your ledger.</p></div>
    <div class="card"><h3>AI-assisted, human-approved</h3><p>Automation that speeds up work without removing your oversight.</p></div>
    <div class="card"><h3>One partner, many products</h3><p>From campus management to legal platforms — one team you can call for all of it.</p></div>
   </div>
  </div>
 </section>
 <section style="padding-top:0;">
  <div class="wrap">
   <div class="eyebrow">Testimonials</div>
   <h2>What people say</h2>
   <div class="tgrid">
    ${TESTIMONIALS.map(t=>`<div class="tcard"><p class="quote">"${t[0]}"</p><div class="who">${t[1]} — ${t[2]}</div></div>`).join('')}
   </div>
  </div>
 </section>`;
}

function renderProducts(){
 return `<section style="padding-top:100px;"><div class="wrap">
  <div class="eyebrow">Products</div>
  <h2>What we've built</h2>
  <p class="lead">Every product below is a full platform — open one to see pricing and the complete feature list.</p>
  <div class="plist">
   ${PRODUCTS.map(p=>`
    <div class="prow">
     <div>
      <div class="ptag">${p.tag}</div>
      <h3>${p.name}</h3>
      <p>${p.blurb}</p>
     </div>
     <div class="pside">
      <div class="starterbadge">Starter: ${p.plans[0].price}</div>
      <div class="otherplans">+ ${p.plans.length-1} more plan${p.plans.length>2?'s':''}: ${p.plans.slice(1).map(pl=>pl.name).join(', ')}</div>
      <a class="cta sm" target="_blank" href="#/product/${p.slug}">View Full Details ↗</a>
     </div>
    </div>`).join('')}
  </div>
 </div></section>`;
}

function renderProductDetail(slug){
 const p = PRODUCTS.find(x=>x.slug===slug);
 if(!p) return `<section style="padding-top:110px;"><div class="wrap"><p>Product not found. <a onclick="go('products')" style="color:var(--blue);">Back to Products</a></p></div></section>`;
 return `<section style="padding-top:100px;"><div class="wrap">
  <a class="backlink" onclick="go('products')">← All Products</a>
  <div class="eyebrow">${p.tag}</div>
  <h1 style="font-size:34px;">${p.name}</h1>
  <p class="lead">${p.blurb}</p>
  <div class="plans-grid">
   ${p.plans.map((pl,i)=>`
    <div class="plan ${i===0?'starter':''}">
     <div class="pname">${pl.name}${i===0?' · Starter':''}</div>
     <div class="pprice">${pl.price}</div>
     <div class="pnote">${pl.note}</div>
     <ul>${pl.items.map(it=>`<li>${it}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>
  <h2 style="margin-top:20px;">Full Functionality</h2>
  <div class="featgrid">
   ${p.features.map(f=>`
    <div class="featgroup"><h3>${f.h}</h3><ul>${f.items.map(it=>`<li>${it}</li>`).join('')}</ul></div>`).join('')}
  </div>
  <div class="comingsoon">Much more is coming… we're actively expanding this product. <a onclick="go('contact')" style="color:var(--blue);">Get in touch</a> to be first in line for new features.</div>
 </div></section>`;
}

function renderServices(){
 return `<section style="padding-top:100px;"><div class="wrap">
  <div class="eyebrow">Services</div>
  <h2>Everything a software house should offer</h2>
  <p class="lead">From AR/VR to WordPress, mobile apps to AI — under one roof.</p>
  <div class="servicelist">
   ${SERVICES.map(s=>`<div class="servicerow"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}
  </div>
 </div></section>`;
}

function renderContact(){
 return `<section style="padding-top:100px;"><div class="wrap">
  <div class="eyebrow">Contact</div>
  <h2>Let's build something.</h2>
  <p class="lead">Tell us what you're working on — we'll get back to you within one business day.</p>
  <div class="contactgrid">
   <div>
    <div class="chan"><span class="k">General</span><span>hello@mantiq.io</span></div>
    <div class="chan"><span class="k">Sales</span><span>sales@mantiq.io</span></div>
    <div class="chan"><span class="k">Support</span><span>support@mantiq.io</span></div>
    <div class="chan"><span class="k">WhatsApp</span><span>Chat with our team on WhatsApp Business</span></div>
    <div class="chan"><span class="k">Hours</span><span>Mon–Fri, 9:00–18:00</span></div>
    <div class="socialrow"><span>LinkedIn</span><span>X / Twitter</span><span>Instagram</span><span>Facebook</span><span>GitHub</span></div>
    <div style="margin-top:30px;">
     <h3 style="margin-bottom:12px;">Frequently Asked Questions</h3>
     <div id="faqlist">${FAQ.map((f,i)=>`<div class="faq"><div class="faqq" data-i="${i}">${f[0]}<span>+</span></div><div class="faqa" id="faqa${i}">${f[1]}</div></div>`).join('')}</div>
    </div>
    <div style="margin-top:30px;">
     <h3 style="margin-bottom:10px;">Stay updated</h3>
     <div class="newsletter"><input type="email" placeholder="Your email"><button class="submit" style="width:auto;">Subscribe</button></div>
    </div>
   </div>
   <form id="cform">
    <input type="text" placeholder="Your name" required>
    <input type="email" placeholder="Your email" required>
    <input type="text" placeholder="Company (optional)">
    <select><option>Project type…</option><option>New product / SaaS</option><option>Web development</option><option>Mobile app</option><option>AI / automation</option><option>Other</option></select>
    <select><option>Estimated budget…</option><option>Under $5,000</option><option>$5,000–$20,000</option><option>$20,000–$50,000</option><option>$50,000+</option></select>
    <textarea placeholder="Tell us about your project"></textarea>
    <button type="submit" class="submit">Send Message</button>
   </form>
  </div>
 </div></section>`;
}

function wireContactExtras(){
 document.querySelectorAll('.faqq').forEach(q=>q.onclick=()=>document.getElementById('faqa'+q.dataset.i).classList.toggle('open'));
 const f = document.getElementById('cform');
 if(f) f.addEventListener('submit', function(e){
  e.preventDefault();
  const [name,email,company] = this.querySelectorAll('input');
  const msg = this.querySelector('textarea').value;
  const subject = encodeURIComponent('Project inquiry from ' + name.value);
  const body = encodeURIComponent(msg + '\n\nFrom: ' + name.value + ' (' + email.value + ') — ' + (company.value||'—'));
  window.location.href = 'mailto:hello@mantiq.io?subject=' + subject + '&body=' + body;
 });
}

function route(){
 const h = location.hash.replace(/^#\/?/, '');
 const app = document.getElementById('app');
 document.querySelectorAll('.navlinks a').forEach(a=>a.classList.remove('on'));
 if(h.startsWith('product/')){
  app.innerHTML = renderProductDetail(h.split('/')[1]);
  document.title = slugName(h.split('/')[1]) + ' — Mantiq';
 } else if(h === 'products'){ app.innerHTML = renderProducts(); nthNav(1); document.title='Products — Mantiq'; }
 else if(h === 'services'){ app.innerHTML = renderServices(); nthNav(2); document.title='Services — Mantiq'; }
 else if(h === 'contact'){ app.innerHTML = renderContact(); nthNav(3); wireContactExtras(); document.title='Contact — Mantiq'; }
 else { app.innerHTML = renderHome(); nthNav(0); document.title='Mantiq — Digital Products That Solve Real Problems'; }
 window.scrollTo(0,0);
}
function nthNav(i){ const links=document.querySelectorAll('.navlinks a'); if(links[i]) links[i].classList.add('on'); }
function go(h){ location.hash = h ? '#/'+h : ''; }
window.addEventListener('hashchange', route);
route();
