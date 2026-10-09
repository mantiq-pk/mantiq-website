const SERVICES = [
  {name:'Custom ERP Development', description:'Run your business on software built around the way you actually work — not the other way around.', includes:['Operations','Finance','HR','Inventory','Workflows','Reporting'], cta:'Build My ERP'},
  {name:'Software Development', description:'From an idea to a production-ready product — web platforms, SaaS products, enterprise applications and APIs.', includes:['Web Platforms','SaaS','Enterprise Apps','APIs'], cta:'Build My Product'},
  {name:'Mobile App Development', description:'Mobile experiences people actually want to use — built for performance, usability and scale.', includes:['iOS','Android','Cross-Platform'], cta:'Build My App'},
  {name:'Salesforce Development', description:'Make Salesforce work harder for your business, with development and integrations tailored to your workflows.', includes:['Custom Development','Integrations','Automation','Customization'], cta:'Optimize My Salesforce'},
  {name:'AR / VR / XR Development', description:'Turn digital experiences into immersive ones — for training, education, real estate and enterprise use cases.', includes:['Training','Simulation','Visualization','Enterprise XR'], cta:'Build My XR Experience'},
  {name:'QA & Testing', description:'Ship with confidence. Manual and automated testing that catches what matters before your users do.', includes:['Functional','API','Performance','Regression'], cta:'Request a QA Audit'},
  {name:'Project Management', description:'Keep products moving from idea to launch, with dedicated leadership and agile delivery.', includes:['Sprint Planning','Stakeholder Coordination','Risk Management'], cta:'Request Delivery Support'},
];

const PRODUCTS = [
  {
    slug:'ilma-cms', name:'ILMA CMS', category:'Education · AI',
    headline:'An AI-Powered Operating System for Modern Education.',
    blurb:'ILMA connects schools, teachers, students and parents through one intelligent ecosystem for management, learning, communication and assessment.',
    problems:[
      ['Fragmented workflows','School operations, learning and communication often live in separate tools that never share the full picture.'],
      ['Too much manual work','Attendance, assessments, lesson planning and reporting take time away from teaching and improvement.'],
      ['Disconnected roles','Administrators, teachers, students and parents need one source of truth with an experience built for each role.'],
      ['Limited visibility','Institutions need timely signals across performance, attendance, fees and engagement — not reports that arrive too late.'],
    ],
    features:[
      ['AI Teacher Copilot','Generate lesson plans, quizzes, worksheets, tests, slides and rubrics.'],
      ['AI Assessment Assistant','AI suggests grades and feedback while keeping the teacher in control.'],
      ['Smart Attendance','Mark and monitor attendance with class and student-level reporting.'],
      ['Unified Roles','Admin, teacher, student and parent experiences within one connected platform.'],
      ['AI Risk Intelligence','Surface performance and payment signals that may require attention.'],
      ['WhatsApp / SMS Communication','Create and distribute announcements through channels parents already use.'],
    ],
    roles:[['Admin','Run the institution.'],['Teacher','Teach and manage students.'],['Student','Learn, submit and track progress.'],['Parent','Stay informed and connected.']],
    plans:[
      {name:'Starter', price:'PKR 8,999 / month', note:'For small academies & tuition centers', items:['Up to 100 students','Core student management','Attendance','Basic assignments','Parent communication','Basic analytics','Mobile access']},
      {name:'Growth', price:'PKR 19,999 / month', note:'For growing schools & academies', items:['Up to 300 students','Everything in Starter','Fees & finance','Exams & marks','Learning materials','Advanced analytics','Teacher AI tools','Priority support']},
      {name:'Professional', price:'PKR 39,999 / month', note:'For established institutions', featured:true, items:['Up to 750 students','Everything in Growth','AI Assessment Assistant','AI Teacher Copilot','Smart timetable','AI risk insights','WhatsApp/SMS integrations','Advanced reports']},
      {name:'Enterprise', price:'Custom pricing', note:'For multi-campus organizations', items:['Custom student capacity','Multi-campus management','Custom modules & branding','Advanced integrations','Dedicated infrastructure options','Account manager','SLA & priority support']},
    ],
    billing:'Annual billing can save 15–20%. Modules remain flexible, so smaller institutions can activate what they need without buying an oversized plan.',
  },
  {
    slug:'pakistan-education-ai', name:'Pakistan Education AI', category:'AI · Education',
    headline:'An AI Tutor Built for Pakistan.',
    blurb:"A specialized study and teaching companion designed around Pakistan's board curricula, examination patterns and local learning needs — not a generic chatbot.",
    problems:[
      ['Generic answers','General-purpose AI does not reliably follow local boards, grades, syllabi or examination patterns.'],
      ['One-size-fits-all learning','Students need explanations and revision shaped around their subjects, mistakes and pace.'],
      ['Scattered exam preparation','Past papers, MCQs, mock tests and revision planning should work together in one study flow.'],
      ['Teacher workload','Lesson plans, worksheets, quizzes and rubrics consume time that teachers could spend with students.'],
    ],
    features:[
      ['Ask Anything','Subject-specific Q&A across core school subjects, grounded in the selected board and grade.'],
      ['Solve With a Photo','Photograph a textbook question or handwritten work and receive a step-by-step explanation.'],
      ['Exam Preparation','Practice with past papers, MCQs, mock tests, mistake analysis and personalized revision plans.'],
      ['AI for Teachers','Generate lesson plans, quizzes, worksheets, tests, slides and grading rubrics.'],
      ['Personalized Learning','Detect weak topics, track progress and adapt the study plan over time.'],
      ['Built for Pakistan','Support for English, Urdu and Roman Urdu across Federal, provincial and Cambridge curricula.'],
    ],
    roles:[['Student','Ask, practice and revise.'],['Teacher','Plan lessons and create assessments.'],['Parent','Follow meaningful progress.'],['Institution','Support classes at scale.']],
    plans:[],
  },
];

const ILMA_ONBOARDING_URL = 'https://ilma.almantiqhub.com/onboarding?source=almantiq';

function productBySlug(slug){ return PRODUCTS.find(product => product.slug === slug); }
function productName(slug){ return productBySlug(slug)?.name || ''; }

function serviceCards(limit){
  return SERVICES.slice(0, limit || SERVICES.length).map((service, index) => `
    <article class="service-card"><div class="service-number">0${index + 1}</div><h3>${service.name}</h3><p>${service.description}</p>
    <div class="chip-row">${service.includes.map(item => `<span>${item}</span>`).join('')}</div><a class="text-link" onclick="go('contact')">${service.cta} →</a></article>`).join('');
}

function renderHome(){
  return `
  <section class="hero-section"><div class="wrap"><div class="eyebrow">AI PRODUCTS · DIGITAL ENGINEERING · TECHNOLOGY</div><h1>We Build Intelligent Products. And the Teams Behind Them.</h1><p class="lead">AL MANTIQ is a product-driven technology company building AI-powered software while helping businesses turn ambitious ideas into reliable, scalable digital products.</p><p class="hero-support">From custom ERP platforms to AI, mobile, XR and Salesforce solutions — we bring product thinking, engineering and quality together under one team.</p><a onclick="go('contact')" class="cta">Build With Us →</a><a onclick="go('products')" class="cta ghost">Explore Our Products →</a><div class="focusrow"><span>AI-Powered Products</span><span>Digital Engineering</span><span>Flexible Teams</span><span>Quality Built In</span></div></div></section>
  <section><div class="wrap split-intro"><div><div class="eyebrow">MORE THAN SOFTWARE DEVELOPMENT</div><h2>We Build What Businesses Need Next.</h2></div><div><p class="lead">AL MANTIQ combines AI, software engineering, product development and quality engineering.</p><p class="body-copy">We build our own products — and work with companies that need an experienced offshore technology team or specialized individual talent in their timezone. From one expert to an entire product team, we plug into the way you work.</p></div></div></section>
  <section class="section-tint"><div class="wrap"><div class="eyebrow">SERVICES</div><h2>One Team. Every Layer of Product Development.</h2><div class="service-grid home-service-grid">${serviceCards(7)}</div><a onclick="go('services')" class="cta ghost">Explore All Services →</a></div></section>
  <section><div class="wrap team-callout"><div><div class="eyebrow">OFFSHORE TEAM</div><h2>Your Product Team. Without the Hiring Headache.</h2><p class="lead">Tell us what you're building, what expertise you need and how you want to work. We'll match you with developers, engineers, QA specialists and project leaders.</p></div><div class="team-points"><span>Your Timezone</span><span>Your Workflow</span><span>Your Technology Stack</span><span>Your Team Size</span></div><div class="button-row"><a onclick="go('services')" class="cta">Find Your Team →</a><a onclick="go('contact')" class="cta ghost">Schedule an Interview →</a></div></div></section>
  <section class="section-tint"><div class="wrap"><div class="eyebrow">OUR PRODUCTS</div><h2>We Don't Just Build Products. We Use What We Build.</h2><p class="lead">Our products are born from the same engineering discipline we bring to client projects — combining AI, automation, product design and real-world problem solving.</p><div class="product-showcase">${PRODUCTS.map((product,index)=>`<article class="product-feature"><div class="product-index">0${index+1} / ${product.category}</div><h3>${product.name}</h3><h4>${product.headline}</h4><p>${product.blurb}</p><a class="text-link" onclick="go('product/${product.slug}')">Explore ${product.name} →</a></article>`).join('')}</div></div></section>
  <section><div class="wrap"><div class="eyebrow">OUR APPROACH</div><h2>Think Clearly. Build Intelligently.</h2><div class="process-grid"><div><span>01</span><h3>Think</h3><p>Understand the problem before writing the solution.</p></div><div><span>02</span><h3>Build</h3><p>Turn ideas into products people can actually use.</p></div><div><span>03</span><h3>Improve</h3><p>Measure, test and continuously make the product better.</p></div></div></div></section>
  <section class="section-tint"><div class="wrap"><div class="eyebrow">WHY AL MANTIQ</div><h2>Built Around How Modern Teams Actually Work.</h2><div class="value-grid">${[['Product Mindset','We focus on the complete product, not isolated features.'],['AI-Native','We use AI where it improves products, workflows and decisions.'],['Engineering + QA','Development and quality stay in the same conversation.'],['Flexible Teams','Hire a specialist, a dedicated team or full delivery capability.'],['Timezone Compatible','Work with a team that fits your hours and communication rhythm.'],['Long-Term Partnership','Continuous product development, not one-off tickets.']].map(item=>`<div><h3>${item[0]}</h3><p>${item[1]}</p></div>`).join('')}</div></div></section>
  ${renderFinalCta()}`;
}

function renderProducts(){
  return `<section class="page-hero"><div class="wrap"><div class="eyebrow">PRODUCTS</div><h1>Intelligent Products Built by AL MANTIQ.</h1><p class="lead">Two focused products, each built around a real market and a clear operational problem.</p><div class="product-grid">${PRODUCTS.map((product,index)=>`<article class="product-card"><div class="product-index">0${index+1} / ${product.category}</div><h2>${product.name}</h2><h3>${product.headline}</h3><p>${product.blurb}</p><a class="cta" onclick="go('product/${product.slug}')">View Product →</a></article>`).join('')}</div></div></section>`;
}

function renderProductDetail(slug){
  const product = productBySlug(slug);
  if(!product) return `<section class="page-hero"><div class="wrap"><h1>Product not found.</h1><a class="cta" onclick="go('products')">Back to Products</a></div></section>`;
  const trialCta = product.slug === 'ilma-cms'
    ? `<a class="cta" href="${ILMA_ONBOARDING_URL}">Start Free Trial →</a>`
    : `<a class="cta" onclick="go('contact')">Get a Demo →</a>`;
  const pricing = product.plans.length ? `<section class="section-tint"><div class="wrap"><div class="eyebrow">PRICING</div><h2>Plans That Scale With Your Institution.</h2><div class="plans-grid">${product.plans.map(plan=>`<article class="plan ${plan.featured?'featured':''}">${plan.featured?'<div class="popular-badge">Most Popular</div>':''}<div class="pname">${plan.name}</div><div class="pprice">${plan.price}</div><div class="pnote">${plan.note}</div><ul>${plan.items.map(item=>`<li>${item}</li>`).join('')}</ul><a class="text-link" onclick="go('contact')">Get a Demo →</a></article>`).join('')}</div><p class="pricing-note">${product.billing}</p></div></section>` : '';
  return `<section class="product-hero"><div class="wrap"><a class="backlink" onclick="go('products')">← All Products</a><div class="eyebrow">${product.category}</div><h1>${product.name}</h1><h2>${product.headline}</h2><p class="lead">${product.blurb}</p>${trialCta}<a class="cta ghost" onclick="go('contact')">Talk to Our Team →</a></div></section><section class="section-tint"><div class="wrap"><div class="eyebrow">WHAT IT SOLVES</div><h2>Built to Solve the Problems That Slow You Down.</h2><div class="problem-grid">${product.problems.map((item,index)=>`<article><span>0${index+1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div><p class="section-statement">One platform. Less complexity. Better outcomes.</p></div></section><section><div class="wrap"><div class="eyebrow">FEATURES</div><h2>Everything You Need. Nothing You Don't.</h2><div class="feature-card-grid">${product.features.map(item=>`<article><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></div></section><section class="section-tint"><div class="wrap"><div class="eyebrow">HOW IT WORKS</div><h2>From Setup to Results.</h2><div class="timeline">${[['Set Up','Configure your organization.'],['Connect','Bring your users, workflows and data together.'],['Automate','Let the platform handle repetitive work.'],['Grow','Use insights to continuously improve.']].map((item,index)=>`<div><span>0${index+1}</span><h3>${item[0]}</h3><p>${item[1]}</p></div>`).join('')}</div></div></section><section><div class="wrap"><div class="eyebrow">PRODUCT EXPERIENCE</div><h2>One Platform. Distinct Experiences.</h2><div class="role-grid">${product.roles.map(item=>`<article><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></div></section>${pricing}${renderFinalCta('Ready to See What It Can Do?','See the product in action with a personalized demo.','Get a Demo →')}`;
}

function renderServices(){
  return `<section class="page-hero"><div class="wrap"><div class="eyebrow">SERVICES</div><h1>One Team. Every Layer of Product Development.</h1><p class="lead">From the first line of code to the product people actually use — AL MANTIQ brings engineering, design and quality together under one roof.</p><a class="cta" onclick="go('contact')">Start a Project →</a><a class="cta ghost" href="#team-configurator">Find Your Team →</a></div></section><section><div class="wrap"><div class="service-grid">${serviceCards()}</div></div></section><section class="section-tint" id="team-configurator"><div class="wrap"><div class="team-configurator"><div class="eyebrow">OFFSHORE TEAM</div><h2>Your Team. Your Timezone. Zero Hiring Headache.</h2><p class="lead">Skip the job posts, interviews and onboarding. Tell us what you're building — we'll match you with specialists who already fit how you work.</p><div class="config-grid"><label>Your Timezone<select id="team-timezone"><option>US (EST/PST)</option><option>UK</option><option>Europe</option><option>Middle East</option><option>Asia-Pacific</option><option>Flexible / Overlap Hours</option></select></label><label>Your Workflow<select id="team-workflow"><option>Agile / Scrum</option><option>Kanban</option><option>Waterfall</option><option>Hybrid</option><option>Not Sure Yet</option></select></label><label>Your Tech Stack<select id="team-stack"><option>React / Node.js</option><option>Python / Django</option><option>.NET</option><option>Java / Spring</option><option>Salesforce</option><option>AI / ML</option><option>Other</option></select></label><label>Your Team Size<select id="team-size"><option>1 Specialist</option><option>Small Team (2–4)</option><option>Full Pod (5–10)</option><option>Enterprise Team (10+)</option></select></label></div><button class="cta button-cta" type="button" onclick="startTeamRequest()">Find Your Team →</button><a class="cta ghost" onclick="go('contact')">Schedule an Interview →</a><p class="microcopy">Takes less than a minute. No commitment.</p></div></div></section>${renderFinalCta()}`;
}

function renderContact(){
  return `<section class="page-hero contact-hero"><div class="wrap"><div class="eyebrow">GET IN TOUCH</div><h1>Let's Talk About What You're Building.</h1><p class="lead">No contact forms that vanish into a queue. Tell us what you need — book a slot directly, or send a quick message and a real person replies within one business day.</p></div></section><section><div class="wrap"><div class="contact-paths"><article class="contact-path calendar-path"><div class="micro-label">STRAIGHT TO A CONVERSATION</div><h2>Already Know What You Need?</h2><p>Grab a slot for a 30-minute conversation about your product, your team or both.</p><div class="calendar-embed"><iframe title="Book a 30-minute discovery call" src="https://cal.com/al-mantiq/30min?embed=true&amp;layout=month_view&amp;useSlotsViewOnSmallScreen=true" allow="payment" loading="eager"></iframe></div><p class="calendar-fallback">Calendar not displaying? <a href="https://cal.com/al-mantiq/30min" target="_blank" rel="noopener noreferrer">Open the booking page →</a></p></article><article class="contact-path"><div class="micro-label">NOT READY TO TALK YET?</div><h2>Just Have a Question?</h2><p>Drop us a few details. We read every message ourselves — no auto-responders pretending to be a person.</p><form id="cform"><label>Name<input name="name" type="text" required></label><label>Email<input name="email" type="email" required></label><label>Company <span>(optional)</span><input name="company" type="text"></label><label>What are you looking for?<select name="service" required><option value="">Select one</option>${SERVICES.map(service=>`<option>${service.name}</option>`).join('')}<option>Offshore Team</option><option>Not Sure Yet</option></select></label><label>Message<textarea name="message" rows="4" required></textarea></label><button class="submit" type="submit">Send Message →</button><p class="form-status" id="form-status" aria-live="polite"></p></form></article></div></div></section><section class="section-tint"><div class="wrap"><div class="eyebrow">WHAT HAPPENS NEXT</div><div class="next-steps"><div><span>01</span><h3>We Read Every Message</h3><p>A real person reviews what you send within one business day — not a ticket number.</p></div><div><span>02</span><h3>We Ask the Right Questions</h3><p>A short call or email helps us understand scope properly before anyone quotes anything.</p></div><div><span>03</span><h3>We Propose a Path</h3><p>Team, timeline and next steps — clear and specific, with no obligation to proceed.</p></div></div></div></section><section class="direct-contact"><div class="wrap"><a href="mailto:hello@mantiq.io">hello@mantiq.io</a><span>We typically reply within 24 hours</span><div class="socialrow"><span>LinkedIn</span><span>Instagram</span><span>X</span><span>GitHub</span></div></div></section>`;
}

function renderFinalCta(title='Let\'s Build Something That Matters.', copy="Whether you're building a new product, modernizing an existing system or looking for an experienced technology team — start with a conversation.", primary='Start a Project →'){
  return `<section class="final-cta"><div class="wrap"><div class="eyebrow">HAVE AN IDEA? NEED A TEAM?</div><h2>${title}</h2><p class="lead">${copy}</p><a class="cta" onclick="go('contact')">${primary}</a><a class="cta ghost" onclick="go('contact')">Talk to an Expert →</a></div></section>`;
}

function startTeamRequest(){
  const fields = [['Timezone','team-timezone'],['Workflow','team-workflow'],['Tech stack','team-stack'],['Team size','team-size']];
  const summary = fields.map(([label,id]) => `${label}: ${document.getElementById(id).value}`).join('\n');
  sessionStorage.setItem('mantiq-team-request', `I'd like help building an offshore team.\n\n${summary}`);
  go('contact');
}

function wireContact(){
  const form = document.getElementById('cform');
  if(!form) return;
  const saved = sessionStorage.getItem('mantiq-team-request');
  if(saved){ form.elements.message.value = saved; form.elements.service.value = 'Offshore Team'; sessionStorage.removeItem('mantiq-team-request'); }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project inquiry — ${data.get('service')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '—'}\nLooking for: ${data.get('service')}`);
    document.getElementById('form-status').textContent = "Got it — your email app is opening. We'll reply within one business day.";
    window.location.href = `mailto:hello@mantiq.io?subject=${subject}&body=${body}`;
  });
}

function enhanceGlobalChrome(){
  document.addEventListener('click', event => {
    const jump = event.target.closest('a[href="#team-configurator"]');
    if(!jump) return;
    event.preventDefault();
    document.getElementById('team-configurator')?.scrollIntoView({behavior:'smooth'});
  });
  document.querySelectorAll('.logo').forEach(logo => {
    const symbol = logo.querySelector('.brand-symbol');
    logo.innerHTML = '';
    if(symbol) logo.append(symbol);
    logo.append(document.createTextNode('AL MANTIQ'));
  });
  const footer = document.querySelector('.site-footer');
  if(footer) footer.innerHTML = `<div class="footer-inner"><div><span class="footer-brand-text">AL MANTIQ</span><p>Intelligent Products. Digital Engineering.</p></div><div><strong>Products</strong><a href="#/product/ilma-cms">ILMA CMS</a><a href="#/product/pakistan-education-ai">Pakistan Education AI</a></div><div><strong>Services</strong><a href="#/services">Software Development</a><a href="#/services">Mobile App Development</a><a href="#/services">QA & Testing</a></div><div><strong>Company</strong><a href="#/contact">Contact</a><a href="#/contact">Start a Project</a></div></div><div class="footer-bottom"><span>© 2026 AL MANTIQ. All rights reserved.</span><span>Privacy Policy · Terms of Service</span></div>`;
}

function route(){
  const hash = location.hash.replace(/^#\/?/, '');
  const app = document.getElementById('app');
  document.querySelectorAll('.navlinks a').forEach(link => link.classList.remove('on'));
  if(hash.startsWith('product/')){ app.innerHTML = renderProductDetail(hash.split('/')[1]); document.title = `${productName(hash.split('/')[1])} — AL MANTIQ`; activateNav(1); }
  else if(hash === 'products'){ app.innerHTML = renderProducts(); document.title = 'Products — AL MANTIQ'; activateNav(1); }
  else if(hash === 'services'){ app.innerHTML = renderServices(); document.title = 'Services — AL MANTIQ'; activateNav(2); }
  else if(hash === 'contact'){ app.innerHTML = renderContact(); document.title = 'Contact — AL MANTIQ'; activateNav(3); wireContact(); }
  else { app.innerHTML = renderHome(); document.title = 'AL MANTIQ — Intelligent Products & Digital Engineering'; activateNav(0); }
  window.scrollTo(0,0);
}

function activateNav(index){ const links = document.querySelectorAll('.navlinks a'); if(links[index]) links[index].classList.add('on'); }
function go(path){ location.hash = path ? `#/${path}` : ''; }

enhanceGlobalChrome();
window.addEventListener('hashchange', route);
route();
