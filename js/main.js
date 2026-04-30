$(function(){
  // ----- Navbar shrink on scroll -----
  $(window).on('scroll', function(){
    if($(window).scrollTop() > 30){ $('.navbar-custom').addClass('scrolled'); }
    else{ $('.navbar-custom').removeClass('scrolled'); }
  });

  // ----- Hero slider -----
  let heroIndex = 0;
  const $slides = $('.hero-slide');
  const $dots = $('.hero-dot');
  const total = $slides.length;
  let heroTimer;

  function showSlide(i){
    heroIndex = (i + total) % total;
    $slides.removeClass('active').eq(heroIndex).addClass('active');
    $dots.removeClass('active').eq(heroIndex).addClass('active');
  }
  function startHero(){
    heroTimer = setInterval(()=> showSlide(heroIndex+1), 6000);
  }
  if(total){
    startHero();
    $('.hero-next').on('click', ()=>{ clearInterval(heroTimer); showSlide(heroIndex+1); startHero(); });
    $('.hero-prev').on('click', ()=>{ clearInterval(heroTimer); showSlide(heroIndex-1); startHero(); });
    $dots.on('click', function(){ clearInterval(heroTimer); showSlide($(this).index()); startHero(); });
  }

  // ----- Product slider -----
  $('.product-slider-wrap').each(function(){
    const $wrap = $(this);
    const $track = $wrap.find('.product-track');
    const cardWidth = () => $track.find('.product-card').outerWidth(true);
    let pos = 0;
    function maxPos(){
      return Math.max(0, $track[0].scrollWidth - $track[0].clientWidth);
    }
    function update(){
      pos = Math.max(0, Math.min(pos, maxPos()));
      $track.animate({scrollLeft: pos}, 500);
    }
    $wrap.find('.slider-next').on('click', function(){ pos += cardWidth(); update(); });
    $wrap.find('.slider-prev').on('click', function(){ pos -= cardWidth(); update(); });
  });

  // ----- Testimonial slider -----
  let tIdx = 0;
  const $tSlides = $('.testimonial-slide');
  const $tDots = $('.testimonial-dots span');
  function showT(i){
    tIdx = (i + $tSlides.length) % $tSlides.length;
    $tSlides.removeClass('active').eq(tIdx).addClass('active');
    $tDots.removeClass('active').eq(tIdx).addClass('active');
  }
  if($tSlides.length){
    setInterval(()=> showT(tIdx+1), 5500);
    $tDots.on('click', function(){ showT($(this).index()); });
  }

  // ----- Reveal on scroll -----
  function checkReveal(){
    const wt = $(window).scrollTop();
    const wh = $(window).height();
    $('.reveal').each(function(){
      const top = $(this).offset().top;
      if(top < wt + wh - 80){ $(this).addClass('in'); }
    });
  }
  $(window).on('scroll resize', checkReveal);
  checkReveal();

  // ----- Filter pills (shop) -----
  $('.filter-pill').on('click', function(){
    $('.filter-pill').removeClass('active');
    $(this).addClass('active');
    const cat = $(this).data('cat');
    if(cat === 'all'){
      $('.shop-grid .product-card').fadeIn(300);
    } else {
      $('.shop-grid .product-card').hide();
      $('.shop-grid .product-card[data-cat="'+cat+'"]').fadeIn(300);
    }
  });

  // ----- Cart counter demo -----
  let cart = 2;
  $(document).on('click', '.product-quick-add, .add-to-cart', function(e){
    e.preventDefault();
    cart++;
    $('.cart-badge').text(cart).css('transform','scale(1.4)');
    setTimeout(()=> $('.cart-badge').css('transform','scale(1)'), 200);
  });

  // ----- Form demo -----
  $('form.demo-form').on('submit', function(e){
    e.preventDefault();
    const $btn = $(this).find('button[type=submit]');
    const orig = $btn.html();
    $btn.html('<i class="fas fa-check"></i> Sent');
    setTimeout(()=> $btn.html(orig), 2200);
    this.reset();
  });

  // ----- Smooth scroll for in-page anchors -----
  $('a[href^="#"]').on('click', function(e){
    const target = $(this).attr('href');
    if(target.length > 1 && $(target).length){
      e.preventDefault();
      $('html,body').animate({scrollTop: $(target).offset().top - 80}, 600);
    }
  });
});
