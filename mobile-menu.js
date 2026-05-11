(function () {
  function init() {
    var burger = document.querySelector('.nav-burger');
    var navR = document.querySelector('.nav-r');
    if (!burger || !navR) return;
    if (burger.dataset.mmInit) return;
    burger.dataset.mmInit = '1';

    if (!document.getElementById('mm-styles')) {
      var style = document.createElement('style');
      style.id = 'mm-styles';
      style.textContent = [
        '.mobile-menu{position:fixed;top:72px;left:0;right:0;bottom:0;background:#0F4A5E;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:56px 24px 64px;gap:26px;z-index:99;opacity:0;visibility:hidden;transition:opacity .25s ease,visibility 0s linear .25s;overflow-y:auto}',
        '.mobile-menu.open{opacity:1;visibility:visible;transition:opacity .25s ease,visibility 0s}',
        '.mobile-menu a{font-family:\'Poppins\',sans-serif;font-size:22px;font-weight:500;color:rgba(255,255,255,.85);text-decoration:none;letter-spacing:.01em;padding:10px 16px}',
        '.mobile-menu a.mm-active{color:#DB6F2A}',
        '.mobile-menu a.mm-cta{margin-top:18px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:#0F4A5E;background:#fff;padding:16px 32px}',
        'body.menu-open{overflow:hidden}',
        '.nav-burger{padding:8px;z-index:101;position:relative}',
        '.nav-burger span{transition:transform .25s ease,opacity .2s ease;transform-origin:center}',
        '.nav-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}',
        '.nav-burger.open span:nth-child(2){opacity:0}',
        '.nav-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
        '@media (min-width:769px){.mobile-menu{display:none!important}body.menu-open{overflow:auto}}'
      ].join('');
      document.head.appendChild(style);
    }

    var menu = document.createElement('div');
    menu.className = 'mobile-menu';

    Array.prototype.forEach.call(navR.children, function (node) {
      if (node.tagName !== 'A') return;
      var clone = node.cloneNode(true);
      var isCta = node.classList.contains('nav-cta');
      var isActive = node.classList.contains('active');
      clone.className = '';
      if (isCta) clone.classList.add('mm-cta');
      if (isActive) clone.classList.add('mm-active');
      menu.appendChild(clone);
    });
    document.body.appendChild(menu);

    function closeMenu() {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      menu.classList.add('open');
      burger.classList.add('open');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
    }

    burger.setAttribute('role', 'button');
    burger.setAttribute('tabindex', '0');
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenu(); else openMenu();
    });
    burger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); burger.click(); }
    });

    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 769) closeMenu();
      }, 80);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
