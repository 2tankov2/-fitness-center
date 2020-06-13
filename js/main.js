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

window.onload = function () {
  var trainersSwiper = new Swiper ('.trainers-swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: getPerViews(),
    /*slidesPerView: 4,*/
    slidesPerGroup: 4,
    spaceBetween: 40,
    // Navigation arrows
    navigation: {
      nextEl: '.button--trainers-next',
      prevEl: '.button--trainers-back',
    },
    on: {
      resize: function () {
        trainersSwiper.update(getPerViews());
      }
    }
  });

  function getPerViews() {
    var windowWidth = window.innerWidth;
    var slidesPerView = windowWidth <= 768 ? 2 : 4;

    return slidesPerView;
  }

  var reviewsSwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    effect: 'flip',
    grabCursor: true,
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.button--reviews-next',
      prevEl: '.button--reviews-back',
    },
  });
};
