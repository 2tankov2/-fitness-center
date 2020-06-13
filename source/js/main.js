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
    slidesPerView: 1,
    spaceBetween: 0,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 40
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: '.button--trainers-next',
      prevEl: '.button--trainers-back',
    },
  });

  var reviewsSwiper = new Swiper ('.swiper-container', {
    // Optional parameter
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
