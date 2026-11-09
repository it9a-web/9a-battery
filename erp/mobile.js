/* ============================================================
   9A ERP · H5 自适应层脚本  v1
   只做一件事：在窄屏下把左侧菜单变成可开合的抽屉（加一条顶栏）
   不改动任何业务逻辑，不影响 1024px 以上的桌面布局
   ============================================================ */
(function () {
  if (window.__h5Adapted) return;
  window.__h5Adapted = true;

  var BAR_ID = 'h5-bar';
  var OV_ID = 'h5-overlay';

  function build(aside) {
    if (document.getElementById(BAR_ID)) return;

    var bar = document.createElement('div');
    bar.id = BAR_ID;
    bar.innerHTML =
      '<button id="h5-burger" type="button" aria-label="打开菜单" aria-expanded="false">' +
      '<i></i><i></i><i></i>' +
      '</button>' +
      '<div class="h5-title"><span>9A</span> Battery · 进销存</div>' +
      '<a class="h5-home" href="/">官网</a>';
    document.body.appendChild(bar);

    var ov = document.createElement('div');
    ov.id = OV_ID;
    document.body.appendChild(ov);

    var burger = bar.querySelector('#h5-burger');

    function setOpen(v) {
      if (v) {
        document.body.classList.add('h5-nav-open');
      } else {
        document.body.classList.remove('h5-nav-open');
      }
      burger.setAttribute('aria-expanded', v ? 'true' : 'false');
    }

    burger.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('h5-nav-open'));
    });
    ov.addEventListener('click', function () { setOpen(false); });

    /* 点了菜单里的任意一项，自动收起抽屉 */
    aside.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== aside) {
        if (t.tagName === 'A' || t.tagName === 'BUTTON') { setOpen(false); return; }
        t = t.parentNode;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function boot() {
    var aside = document.querySelector('aside');
    if (!aside) return false;
    build(aside);
    return true;
  }

  if (!boot()) {
    /* 等 React 渲染出侧栏 */
    var timer = setInterval(function () {
      if (boot()) clearInterval(timer);
    }, 300);
    setTimeout(function () { clearInterval(timer); }, 20000);
  }
})();
