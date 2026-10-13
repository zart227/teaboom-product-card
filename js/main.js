'use strict';

(function () {
  var form = document.querySelector('[data-product-form]');
  if (!form) return;

  var skuEl = document.querySelector('span[data-sku]');
  var priceEl = form.querySelector('.price__current');
  var oldPriceEl = form.querySelector('.price__old');
  var discountEl = form.querySelector('[data-discount]');
  var statusEl = form.querySelector('[data-status]');

  var formatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

  function formatPrice(value) {
    var n = Number(value);
    var text = n % 1 ? n.toFixed(2).replace('.', ',') : formatter.format(n);
    return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\u00A0').replace(/\s/g, '\u00A0') + '\u00A0₽';
  }

  function update(input) {
    var price = Number(input.dataset.price);
    var old = Number(input.dataset.oldPrice);
    skuEl.textContent = input.dataset.sku;
    priceEl.textContent = formatPrice(price);
    var hasDiscount = old > price;
    oldPriceEl.hidden = discountEl.hidden = !hasDiscount;
    if (hasDiscount) {
      oldPriceEl.textContent = formatPrice(old);
      discountEl.textContent = '−' + Math.round((1 - price / old) * 100) + '%';
    }
    statusEl.textContent = '';
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'packing') update(e.target);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var checked = form.querySelector('input[name="packing"]:checked');
    statusEl.textContent = 'Добавлено в корзину: ' + checked.value + ' г (арт. ' + checked.dataset.sku + ')';
  });

  update(form.querySelector('input[name="packing"]:checked'));
})();
