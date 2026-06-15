/* RICE 2026 — shared interactions */
(function () {
  // Sticky header solid-on-scroll
  var head = document.querySelector('.site-head');
  function onScroll() {
    if (head) head.classList.toggle('solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (Math.min(i, 6) * 0.06) + 's';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Countdown (only if present)
  var elD = document.getElementById('cd-d');
  if (elD) {
    var target = new Date('2026-11-05T09:00:00+05:30').getTime();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) { ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(function (k) { set(k, '00'); }); return; }
      set('cd-d', Math.floor(diff / 86400000));
      set('cd-h', pad(Math.floor(diff % 86400000 / 3600000)));
      set('cd-m', pad(Math.floor(diff % 3600000 / 60000)));
      set('cd-s', pad(Math.floor(diff % 60000 / 1000)));
    };
    tick();
    setInterval(tick, 1000);
  }

  // Schedule day tabs (only if present)
  var tabs = document.querySelectorAll('[data-day-tab]');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var day = tab.getAttribute('data-day-tab');
        tabs.forEach(function (t) {
          var on = t.getAttribute('data-day-tab') === day;
          t.classList.toggle('btn-glow', on);
          t.classList.toggle('btn-out', !on);
        });
        document.querySelectorAll('[data-day-panel]').forEach(function (p) {
          p.style.display = p.getAttribute('data-day-panel') === day ? '' : 'none';
        });
      });
    });
  }
})();
