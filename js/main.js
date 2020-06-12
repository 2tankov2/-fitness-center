'use strict';

(function () {
  /* маска для поля ввода телефонного номера */
  var orderPhone = document.getElementById('imaskjs__input-tel');

  var maskOptions = {
    mask: '+{7}(000)000-00-00',
    max: 16
  };

  window.IMask(orderPhone, maskOptions);
}());
