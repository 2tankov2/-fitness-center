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

var multiItemSlider = (function () {
  return function (selector, config) {
    var mainElement = document.querySelector(selector); // основной элемент блока
    var sliderWrapper = mainElement.querySelector('.slider__wrapper'); // обёртка для slider__item
    var sliderItems = mainElement.querySelectorAll('.slider__item'); // элементы (.slider-item)
    var sliderControls = mainElement.querySelectorAll('.slider__control'); // элементы управления
    var sliderControlLeft = mainElement.querySelector('.slider__control-left'); // кнопка LEFT
    var sliderControlRight = mainElement.querySelector('.slider__control-right'); // кнопка RIGHT
    var wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width); // ширина обёртки
    var itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    var positionLeftItem = 0; // позиция левого активного элемента
    var transform = 0; // значение трансформации .slider_wrapper
    var step = itemWidth / wrapperWidth * 100; // величина шага (для трансформации)
    var items = []; // массив элементов
    var startX = 0;
    // наполнение массива _items
    sliderItems.forEach(function (item, index) {
      items.push({
        item: item, position: index, transform: 0
      });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    };

    var transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform -= step;
      }
      if (direction === 'left') {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control-right') ? 'right' : 'left';
        var count = Math.round(100 / step);
        while (count > 0) {
          transformItem(direction);
          count--;
        }
      }
    };

    mainElement.addEventListener('mousedown', function (e) {
      startX = e.clientX;
    });
    mainElement.addEventListener('mouseup', function (e) {
      var endX = e.clientX;
      var deltaX = endX - startX;
      if (deltaX > 50) {
        transformItem('left');
      } else if (deltaX < -50) {
        transformItem('right');
      }
    });

    var setUpListeners = function () {
    // добавление к кнопкам "назад" и "вперед" обработчика _controlClick для события click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });

      mainElement.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].clientX;
      });
      mainElement.addEventListener('touchend', function (e) {
        var endX = e.changedTouches[0].clientX;
        var deltaX = endX - startX;
        if (deltaX > 50) {
          transformItem('left');
        } else if (deltaX < -50) {
          transformItem('right');
        }
      });
    };

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    };
  };
}());

var slider = multiItemSlider('.slider');

/*
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

// слайдер блока <тренеры> №2
let mouse = {
  pressed: false,
  lastX: 0
};
let ul = null;

function mouseDown(e) {
  mouse.pressed = true;
  ul.style.transition = 'all 0s';
  mouse.lastX = e.clientX;
}

function mouseUp(e) {
  if (!mouse.pressed) {
    return;
  }
  mouse.pressed = false;
  ul.style.transition = 'all 0.5s';
  let trainers = document.body.querySelector('.trainers').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - trainers.x;
  left = Math.round(left / 300) * 300;
  let maxLeft = document.querySelector('.trainers-list li:last-child');
  maxLeft = -(maxLeft.offsetLeft + maxLeft.offsetWidth - trainers.width);
  if (left < maxLeft) {
    left = maxLeft;
  }
  if (left > 0) {
    left = 0;
  }
  ul.style.left = left + 'px';
}

function mouseMove(e) {
  if (!mouse.pressed) {
    return;
  }
  if (e.buttons === 0) {
    return;
  }
  let trainers = document.body.querySelector('.trainers').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - trainers.x;
  ul.style.left = left + e.clientX - mouse.lastX + 'px';
  console.log(e);
  mouse.lastX = e.clientX;
}

function move(direction) {
  let trainers = document.body.querySelector('.trainers').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - trainers.x;
  let maxLeft = document.querySelector('.trainers-list li:last-child');
  maxLeft = -(maxLeft.offsetLeft + maxLeft.offsetWidth - trainers.width);
  switch (direction) {
    case 'left':
      left = left - trainers.width;
      ul.style.left = left + 'px';
      if (left < maxLeft) {
        ul.style.left = maxLeft - 200 + 'px';
        setTimeout(() => {
          ul.style.left = maxLeft + 'px'
        }, 400);
      }
      break;
    case 'right':
      left = left + trainers.width;
      ul.style.left = left + 'px';
      if (left > 0) {
        ul.style.left = 200 + 'px';
        setTimeout(() => {
          ul.style.left = 0 + 'px'
        }, 400);
      }
      break;
  }
}

var carousel = document.querySelector('.container--trainers');

carousel.onmousedown = mouseDown;
carousel.onmouseup = mouseUp;
carousel.onmouseout = mouseUp;
carousel.onmousemove = mouseMove;
ul = document.body.querySelector('.trainers-list');
*/

// слайдер блока <отзывы>
window.onload = function () {
  var reviewsSwiper = new Swiper ('.swiper-container', {
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
