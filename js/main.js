'use strict';

(function () {
  /* маска для поля ввода телефонного номера */
  var orderPhone = document.getElementById('imaskjs__input-tel');

  var maskOptions = {
    mask: '+{7}(000)000-00-00',
    max: 16
  };

  window.IMask(orderPhone, maskOptions);

  /* переключение абонементов */
  var subscription = document.querySelector('.subscription');
  var btnMonths = subscription.querySelectorAll('.months-list__button');
  var listSub = subscription.querySelectorAll('.catalog');

  function dataid() {
    for (let i = 0; i < btnMonths.length; i++) {
      btnMonths[i].setAttribute('data-id', i);
      listSub[i].setAttribute('data-id', i);
    }
  }

  dataid();

  function showHide(b) {
    btnMonths.forEach((btn) => {
      if (btn.getAttribute('data-id') !== b) {
        btn.classList.remove('months-list__button--active');
      }
    });
    listSub.forEach((item) => {
      if (item.getAttribute('data-id') !== b) {
        item.classList.add('catalog--closed');
      } else {
        item.classList.remove('catalog--closed');
      }
    });
  }

  function whereTab(evt) {
    let target = evt.target;
    if (target.className === 'months-list__button') {
      let attrItem = target.getAttribute('data-id');
      target.classList.add('months-list__button--active');
      showHide(attrItem);
    }
  }

  subscription.addEventListener('click', whereTab);
  subscription.addEventListener('focus', function (evt) {
    whereTab(evt);
  }, true);
}());

window.onload = function () {
  var trainersSwiper = new Swiper ('.trainers-swiper-container', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 40,
    slidesPerGroup: 4,
    slidesOffsetBefore: 20,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        autoHeight: true,
        slidesOffsetBefore: 20,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        slidesOffsetBefore: 30,
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
    effect: 'flip',
    grabCursor: true,
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
