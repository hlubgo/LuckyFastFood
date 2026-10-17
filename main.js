(function ($) {
  'use strict';

  /* ── Language ── */
  var currentLang = 'sr';

  window.setLang = function (lang) {
    currentLang = lang;
    $('html').attr('lang', lang);

    // Update all translatable text nodes
    $('[data-' + lang + ']').each(function () {
      var $el = $(this);
      var text = $el.attr('data-' + lang);
      // If it's a title tag, update document title separately
      if (this.tagName === 'TITLE') {
        document.title = text;
      } else if ($el.children().length === 0) {
        $el.text(text);
      }
    });

    // Update document title
    $('title').each(function () {
      document.title = $(this).attr('data-' + lang) || document.title;
    });

    // Update lang buttons
    $('#btn-sr').toggleClass('active', lang === 'sr').attr('aria-pressed', lang === 'sr');
    $('#btn-en').toggleClass('active', lang === 'en').attr('aria-pressed', lang === 'en');

    // Update hamburger aria-label
    $('#hamburger').attr('aria-label', lang === 'sr' ? 'Otvori meni' : 'Open menu');
  };

  /* ── Hamburger ── */
  $('#hamburger').on('click', function () {
    var open = $(this).hasClass('open');
    $(this).toggleClass('open').attr('aria-expanded', !open);
    $('#mobile-menu').slideToggle(200);
  });

  // Close mobile menu on link click
  $('#mobile-menu a').on('click', function () {
    $('#hamburger').removeClass('open').attr('aria-expanded', false);
    $('#mobile-menu').slideUp(200);
  });

  /* ── Smooth scroll ── */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 60 }, 480, 'swing');
    }
  });

  /* ── Sticky nav ── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 40) {
      $('#main-nav').addClass('scrolled');
    } else {
      $('#main-nav').removeClass('scrolled');
    }
  });

  /* ── Active nav link via Intersection Observer ── */
  var sections = document.querySelectorAll('section[id]');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        $('.nav-links a').removeClass('active');
        $('.nav-links a[href="#' + id + '"]').addClass('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { observer.observe(s); });

  /* ── Footer year ── */
  var yr = new Date().getFullYear();
  $('footer span').each(function () {
    $(this).attr('data-sr', '© ' + yr + ' Naziv Restorana — Subotica, Srbija');
    $(this).attr('data-en', '© ' + yr + ' Restaurant Name — Subotica, Serbia');
    $(this).text('© ' + yr + ' Naziv Restorana — Subotica, Srbija');
  });

})(jQuery);