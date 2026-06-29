(function () {
  'use strict';
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = document.body.getAttribute('data-page');

  /* ---------- Header ---------- */
  function nav(href,label){var a=((page==='home'&&href==='index.html')||(page==='products'&&href==='products.html')||(page==='about'&&href==='about.html')||(page==='contact'&&href==='contact.html'))?' class="active"':'';return '<a href="'+href+'"'+a+'>'+label+'</a>';}
  var headerMount=document.getElementById('header-mount');
  if(headerMount){headerMount.innerHTML='<header class="site-header" id="siteHeader"><div class="container site-header__inner"><a href="index.html" class="brand"><span class="brand__mark">⚡</span><span class="brand__name">Samrat<strong>Power</strong></span></a><nav class="site-nav" id="siteNav">'+nav('index.html','Home')+nav('products.html','Products')+nav('about.html','Our Story')+nav('contact.html','Contact')+'<a href="contact.html" class="btn btn--primary btn--sm nav-cta magnetic">Get a Quote</a></nav><button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>';}

  /* ---------- Footer ---------- */
  var footerMount=document.getElementById('footer-mount');
  if(footerMount){footerMount.innerHTML='<footer class="site-footer"><div class="container site-footer__grid"><div class="site-footer__brand"><a href="index.html" class="brand"><span class="brand__mark">⚡</span><span class="brand__name">Samrat<strong>Power</strong></span></a><p>Empowering your journey with eco-friendly EV batteries, chargers and power solutions for a greener future.</p></div><div><h4>Quick Links</h4><a href="products.html">Products</a><a href="about.html">Our Story</a><a href="contact.html">Contact</a></div><div><h4>Products</h4><a href="products.html#lithium">Lithium Battery</a><a href="products.html#charger">EV Charger</a><a href="products.html#inverter">Inverter &amp; UPS</a></div><div class="site-footer__sub"><h4>Newsletter</h4><p>Don\'t miss our future updates! Get subscribed today.</p><form class="sub-form" onsubmit="return false"><input type="email" placeholder="Your email" aria-label="Email" /><button class="btn btn--primary btn--sm">Subscribe</button></form></div></div><div class="container site-footer__bottom"><span>© '+new Date().getFullYear()+' Samrat Power System Pvt Ltd. All rights reserved.</span></div></footer>';}

  /* ---------- Mobile nav ---------- */
  var navToggle=document.getElementById('navToggle'),siteNav=document.getElementById('siteNav');
  if(navToggle&&siteNav){navToggle.addEventListener('click',function(){siteNav.classList.toggle('open');navToggle.classList.toggle('active');});siteNav.addEventListener('click',function(e){if(e.target.tagName==='A'){siteNav.classList.remove('open');navToggle.classList.remove('active');}});}

  /* ---------- Scroll: header + progress + parallax ---------- */
  var header=document.getElementById('siteHeader'),progress=document.getElementById('scrollProgress'),parallaxEls=[].slice.call(document.querySelectorAll('[data-parallax]')),ticking=false;
  function onScroll(){var y=window.pageYOffset;if(header)header.classList.toggle('scrolled',y>20);if(progress){var h=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+(h>0?y/h:0)+')';}if(!prefersReduced){for(var i=0;i<parallaxEls.length;i++){var el=parallaxEls[i],speed=parseFloat(el.getAttribute('data-parallax'))||0;el.style.transform='translate3d(0,'+(y*speed)+'px,0)';}}ticking=false;}
  window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(onScroll);ticking=true;}},{passive:true});onScroll();

  /* ---------- Reveal observer ---------- */
  var ioSupported='IntersectionObserver' in window;
  function observeReveal(els,cls){cls=cls||'in';if(ioSupported&&!prefersReduced){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add(cls);io.unobserve(e.target);}});},{threshold:0.15});els.forEach(function(el){io.observe(el);});}else{els.forEach(function(el){el.classList.add(cls);});}}

  var revealEls=[].slice.call(document.querySelectorAll('.reveal'));
  observeReveal(revealEls);

  /* ---------- TEXT ANIMATIONS ---------- */

  // Split element text into word spans for staggered reveal
  function splitWords(el){
    if(el.dataset.split) return;
    el.dataset.split='1';
    var text=el.textContent;
    el.setAttribute('aria-label',text);
    el.textContent='';
    var words=text.trim().split(/\s+/);
    var frag=document.createDocumentFragment();
    words.forEach(function(w,i){
      var span=document.createElement('span');
      span.className='word';
      span.style.setProperty('--i',i);
      span.setAttribute('aria-hidden','true');
      span.textContent=w+'\u00A0';
      frag.appendChild(span);
    });
    el.appendChild(frag);
  }
  // Split into characters
  function splitLetters(el){
    if(el.dataset.split) return;
    el.dataset.split='1';
    var text=el.textContent;
    el.setAttribute('aria-label',text);
    el.textContent='';
    var frag=document.createDocumentFragment();
    text.split('').forEach(function(ch,i){
      var span=document.createElement('span');
      span.className='char';
      span.style.setProperty('--i',i);
      span.setAttribute('aria-hidden','true');
      var ws=(ch===' ')?'\u00A0':ch;
      span.textContent=ws;
      frag.appendChild(span);
    });
    el.appendChild(frag);
  }

  // Prepare split-text targets
  [].slice.call(document.querySelectorAll('[data-split-words]')).forEach(splitWords);
  [].slice.call(document.querySelectorAll('[data-split-letters]')).forEach(splitLetters);

  // Observe split-text + blur-in + stagger
  observeReveal([].slice.call(document.querySelectorAll('.split-words,.split-letters,.blur-in')));
  // stagger groups
  [].slice.call(document.querySelectorAll('.stagger')).forEach(function(g){
    if(ioSupported&&!prefersReduced){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.2});io.observe(g);}else{g.classList.add('in');}
  });

  // Typewriter effect for [data-typewriter]
  [].slice.call(document.querySelectorAll('[data-typewriter]')).forEach(function(el){
    var full=el.getAttribute('data-typewriter')||el.textContent;
    el.textContent='';el.classList.add('typewriter');
    var speed=parseInt(el.getAttribute('data-speed'),10)||70;
    function start(){var i=0;(function tick(){el.textContent=full.slice(0,i);i++;if(i<=full.length){setTimeout(tick,speed);}else{el.classList.add('done');}})();}
    if(ioSupported&&!prefersReduced){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){start();io.unobserve(el);}});},{threshold:0.6});io.observe(el);}else{el.textContent=full;el.classList.add('done');}
  });

  /* ---------- Magnetic buttons ---------- */
  if(!prefersReduced&&window.matchMedia('(pointer:fine)').matches){
    [].slice.call(document.querySelectorAll('.magnetic')).forEach(function(el){
      el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;el.style.transform='translate('+(x*0.25)+'px,'+(y*0.35)+'px)';});
      el.addEventListener('mouseleave',function(){el.style.transform='';});
    });
  }

  /* ---------- FAQ accordion ---------- */
  [].slice.call(document.querySelectorAll('.faq__item')).forEach(function(item){
    var btn=item.querySelector('.faq__q'),panel=item.querySelector('.faq__a');
    if(!btn||!panel) return;
    btn.addEventListener('click',function(){
      var open=item.classList.contains('open');
      // close siblings within same .faq
      var group=item.closest('.faq');
      if(group){[].slice.call(group.querySelectorAll('.faq__item.open')).forEach(function(o){if(o!==item){o.classList.remove('open');o.querySelector('.faq__a').style.maxHeight=null;}});}
      item.classList.toggle('open',!open);
      panel.style.maxHeight=open?null:(panel.scrollHeight+'px');
    });
  });

  /* ---------- Counters ---------- */
  var counters=[].slice.call(document.querySelectorAll('[data-count]'));
  if(counters.length&&ioSupported){var cio=new IntersectionObserver(function(en){en.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,target=parseInt(el.getAttribute('data-count'),10),start=null;function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/1400,1);el.textContent=Math.floor(p*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;}requestAnimationFrame(step);cio.unobserve(el);});},{threshold:0.5});counters.forEach(function(c){cio.observe(c);});}

  /* ---------- Products ---------- */
  var products=window.SAMRAT_PRODUCTS||[];
  function starHtml(n){var f=Math.floor(n),half=n%1>=0.5,s='';for(var i=0;i<f;i++)s+='★';if(half)s+='½';var count=f+(half?1:0);while(count<5){s+='☆';count++;}return s;}
  function cardHtml(p){return '<article class="product-card reveal" data-id="'+p.id+'"><div class="product-card__media"><img src="'+p.images[0]+'" alt="'+p.title+'" loading="lazy" /><span class="product-card__badge">'+p.category+'</span></div><div class="product-card__body"><h3>'+p.title+'</h3><p>'+p.desc+'</p><button class="btn btn--ghost btn--sm" data-view="'+p.id+'">View Gallery</button></div></article>';}
  var featuredGrid=document.getElementById('featuredGrid');
  if(featuredGrid){featuredGrid.innerHTML=products.slice(0,3).map(cardHtml).join('');observeReveal([].slice.call(featuredGrid.querySelectorAll('.reveal')));}
  var productGrid=document.getElementById('productGrid'),filtersWrap=document.getElementById('filters');
  function renderProducts(filter){if(!productGrid)return;var list=filter&&filter!=='all'?products.filter(function(p){return p.cat===filter;}):products;productGrid.innerHTML=list.map(cardHtml).join('');[].slice.call(productGrid.querySelectorAll('.reveal')).forEach(function(el){el.classList.add('in');});}
  if(filtersWrap){var filters=window.SAMRAT_FILTERS||[];filtersWrap.innerHTML=filters.map(function(f,i){return '<button class="chip'+(i===0?' active':'')+'" data-filter="'+f.key+'">'+f.label+'</button>';}).join('');filtersWrap.addEventListener('click',function(e){var b=e.target.closest('[data-filter]');if(!b)return;[].slice.call(filtersWrap.children).forEach(function(c){c.classList.remove('active');});b.classList.add('active');renderProducts(b.getAttribute('data-filter'));});renderProducts('all');}

  /* ---------- Modal ---------- */
  var modal=document.getElementById('productModal'),galleryTrack=document.getElementById('galleryTrack'),galleryViewport=document.getElementById('galleryViewport'),rafId=null,offset=0,halfWidth=0;
  function buildGallery(p){var imgs=p.images.concat(p.images);galleryTrack.innerHTML=imgs.map(function(src){return '<div class="gallery__item"><img src="'+src+'" alt="'+p.title+'" loading="lazy" /></div>';}).join('');document.getElementById('modalCat').textContent=p.category;document.getElementById('modalTitle').textContent=p.title;document.getElementById('modalDesc').textContent=p.desc;document.getElementById('modalSpecs').innerHTML=p.specs.map(function(s){return '<li>'+s+'</li>';}).join('');}
  function startAutoScroll(){if(prefersReduced)return;cancelAnimationFrame(rafId);offset=0;halfWidth=galleryTrack.scrollWidth/2;var speed=0.5,paused=false;galleryViewport.onmouseenter=function(){paused=true;};galleryViewport.onmouseleave=function(){paused=false;};function loop(){if(!paused){offset+=speed;if(offset>=halfWidth)offset=0;galleryTrack.style.transform='translate3d('+(-offset)+'px,0,0)';}rafId=requestAnimationFrame(loop);}rafId=requestAnimationFrame(loop);}
  function openModal(id){var p=products.filter(function(x){return x.id===id;})[0];if(!p||!modal)return;buildGallery(p);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(startAutoScroll,60);}
  function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';cancelAnimationFrame(rafId);}
  document.addEventListener('click',function(e){var view=e.target.closest('[data-view]');if(view){openModal(view.getAttribute('data-view'));return;}if(e.target.hasAttribute('data-close'))closeModal();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
  if(page==='products'&&location.hash){var hash=location.hash.replace('#','');var chip=filtersWrap&&filtersWrap.querySelector('[data-filter="'+hash+'"]');if(chip)chip.click();}

  /* ---------- Reviews ---------- */
  var reviewsTrack=document.getElementById('reviewsTrack');
  if(reviewsTrack){var reviews=(window.SAMRAT_REVIEWS||[]).concat(window.SAMRAT_REVIEWS||[]);reviewsTrack.innerHTML=reviews.map(function(r){return '<figure class="review"><div class="review__stars">'+starHtml(r.stars)+'</div><blockquote>“'+r.text+'”</blockquote><figcaption><strong>'+r.name+'</strong><span>'+r.role+'</span></figcaption></figure>';}).join('');}

  /* ---------- FAQ render ---------- */
  var faqHost=document.getElementById('faqHost');
  if(faqHost&&(window.SAMRAT_FAQ||[]).length){faqHost.innerHTML=window.SAMRAT_FAQ.map(function(f){return '<div class="faq__item reveal"><button class="faq__q"><span>'+f.q+'</span><span class="faq__ic">+</span></button><div class="faq__a"><p>'+f.a+'</p></div></div>';}).join('');observeReveal([].slice.call(faqHost.querySelectorAll('.reveal')));}

  /* ---------- Contact form ---------- */
  var contactForm=document.getElementById('contactForm');
  if(contactForm){contactForm.addEventListener('submit',function(e){e.preventDefault();if(!contactForm.checkValidity()){contactForm.reportValidity();return;}document.getElementById('formNote').hidden=false;contactForm.reset();});}
})();
