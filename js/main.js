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

// слайдер блока <тренеры>
var sectionTrainers = document.querySelector('.trainers');
var trainers = sectionTrainers.querySelectorAll('.trainers-list__item');
var btnPrev = sectionTrainers.querySelector('.button--trainers-back');
var btnNext = sectionTrainers.querySelector('.button--trainers-next');

function viewBlock(index) {
  trainers.forEach((item, i) => {
    if (i >= index) {
      item.classList.add('trainers-list__item--closed');
    } else {
      item.classList.remove('trainers-list__item--closed');
    }
  });
}

if (window.screen.width < 768) {
  viewBlock(1);
} else if (window.screen.width < 1200) {
  viewBlock(2);
} else if (window.screen.width >= 1200) {
  viewBlock(4);
}

function viewBlock2(i, count) {
  trainers.forEach((item, index) => {
    if (index < i || (index >= (i + count))) {
      item.classList.add('trainers-list__item--closed');
    } else {
      item.classList.remove('trainers-list__item--closed');
    }
  });
}

let currentTrainer = 0;

btnNext.onclick = function () {
  let i = currentTrainer;
  if (trainers.length > i) {
    if (window.screen.width < 768 && (i < trainers.length - 1 && i < currentTrainer + 1)) {
      i++;
      viewBlock2(i, 1);
    } else if (window.screen.width < 1200 && (i < trainers.length - 2 && i < currentTrainer + 2)) {
      i = i + 2;
      viewBlock2(i, 2);
    } else if (window.screen.width >= 1200 && (i < trainers.length - 4 && i < currentTrainer + 4)) {
      i = i + 4;
      viewBlock2(i, 4);
    }
  }
  currentTrainer = i;
};

btnPrev.onclick = function () {
  let i = currentTrainer;
  if (i > 0) {
    if (window.screen.width < 768 && (i >= 1)) {
      i--;
      viewBlock2(i, 1);
    } else if (window.screen.width < 1200 && (i >= 2)) {
      i = i - 2;
      viewBlock2(i, 2);
    } else if (window.screen.width >= 1200 && (i >= 4)) {
      i = i - 4;
      viewBlock2(i, 4);
    }
  }
  currentTrainer = i;
};

window.onload = function () {
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

// одинаковая высота слайдов Swiper при увеличении контента внутри слайдов
var sliders = document.querySelectorAll('.reviews__item');
const wrapper = document.querySelector('.swiper-wrapper');

sliders.forEach((slide) => {
  slide.style.height = '';
});

setTimeout(() => {
  sliders.forEach((slide) => {
    slide.style.height = wrapper.clientHeight + 'px';
  });
}, 300);
