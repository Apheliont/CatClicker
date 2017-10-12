/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_catModel__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_catView__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_menuView__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_progressBarView__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_adminFormView__ = __webpack_require__(1);






const catController = {
  init() {
    catController.initModel();
    __WEBPACK_IMPORTED_MODULE_3__views_progressBarView__["a" /* default */].init();
    __WEBPACK_IMPORTED_MODULE_2__views_menuView__["a" /* default */].init();
    __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].init();
    __WEBPACK_IMPORTED_MODULE_4__views_adminFormView__["a" /* default */].init();
  },
  initModel() {
    for (const cat of __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data) {
      cat.clicks = 0;
    }
  },
  getAllCats() {
    return __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data;
  },
  increaseCounter() {
    __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data[__WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].currentCat].clicks += 1;
    __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].render();
  },
  increaseLoadedImageCounter() {
    __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].loadImgCounter += 1;
  },
  getCurrentCat() {
    return __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data[__WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].currentCat];
  },
  setCurrentCat(id) {
    __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].currentCat = id;
  },
  getLoadedPercent() {
    return ((__WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].loadImgCounter * 100) / __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data.length);
  },
  updateInfo(obj) {
    const currentCat = __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].data[__WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].currentCat];
    const objKeys = Object.keys(obj);
    for (const key of objKeys) {
      currentCat[key] = obj[key];
    }
    __WEBPACK_IMPORTED_MODULE_2__views_menuView__["a" /* default */].init();
    __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].render();
  },
  loadAllCats() {
    const allCats = catController.getAllCats();
    const imageArr = [];
    for (const cat of allCats) {
      const catImagePromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.src = cat.url;
        img.onload = () => {
          catController.increaseLoadedImageCounter();
          __WEBPACK_IMPORTED_MODULE_3__views_progressBarView__["a" /* default */].renderProgressBar();
          resolve(cat.url);
        };
        img.onerror = () => reject(cat.url);
      });
      imageArr.push(catImagePromise);
    }
    Promise.all(imageArr).then(() => {
      setTimeout(() => {
        __WEBPACK_IMPORTED_MODULE_3__views_progressBarView__["a" /* default */].hideProgressBar();
        __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].show();
        __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].render();
      }, 500);
    });
  },
  adminFormOpenState(state) {
    if (state !== null && typeof state === 'boolean') {
      __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].adminFormOpenState = state;
      return false;
    }
    return __WEBPACK_IMPORTED_MODULE_0__models_catModel__["a" /* default */].adminFormOpenState;
  },
};

/* harmony default export */ __webpack_exports__["a"] = (catController);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_catController__ = __webpack_require__(0);


const adminFormView = {
  init() {
    this.form = document.querySelector('.admin-form');
    this.catName = document.querySelector('.admin-form__cat-name');
    this.catURL = document.querySelector('.admin-form__cat-url');
    this.catClicks = document.querySelector('.admin-form__cat-clicks');
    this.cancelBtn = document.querySelector('.admin-form-cancel');
    this.submitBtn = document.querySelector('.admin-form-submit');
    this.cancelBtn.addEventListener('click', (e) => {
      this.close();
      e.preventDefault();
    });
    this.submitBtn.addEventListener('click', (e) => {
      const updateObj = {
        name: adminFormView.catName.value,
        url: adminFormView.catURL.value,
        clicks: +adminFormView.catClicks.value,
      };
      __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].updateInfo(updateObj);
      this.close();
      e.preventDefault();
    });
    this.form.style.display = 'none';
  },
  render() {
    this.form.style.display = 'block';
    const currentCat = __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].getCurrentCat();
    this.catName.value = currentCat.name;
    this.catURL.value = currentCat.url;
    this.catClicks.value = currentCat.clicks;
    __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].adminFormOpenState(true);
  },
  close() {
    this.catName.value = '';
    this.catURL.value = '';
    this.catClicks.value = '';
    this.form.style.display = 'none';
    __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].adminFormOpenState(false);
  },
};

/* harmony default export */ __webpack_exports__["a"] = (adminFormView);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_catController__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_adminFormView__ = __webpack_require__(1);



const catView = {
  init() {
    this.catNameElement = document.querySelector('.cat__name');
    this.catImageElement = document.querySelector('.cat__image');
    this.catClickCounterElement = document.querySelector('.cat__clickCounter');
    this.cat = document.querySelector('.cat');
    this.adminBtn = document.querySelector('.cat__adminBtn');
    this.cat.style.display = 'none'; // по умолчанию скрываем поле вывода котов

    this.adminBtn.addEventListener('click', () => {
      if (!__WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].adminFormOpenState()) {
        __WEBPACK_IMPORTED_MODULE_1__views_adminFormView__["a" /* default */].render();
      }
    });
    this.catImageElement.addEventListener('click', () => {
      __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].increaseCounter();
    });
    // Кешируем картинки и после полной их загрузки показываем окно с кошками
    __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].loadAllCats();
  },
  show() {
    this.cat.style.display = 'block';
  },
  render() {
    const currentCat = __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].getCurrentCat();
    this.catNameElement.textContent = currentCat.name;
    this.catImageElement.src = currentCat.url;
    this.catClickCounterElement.textContent = currentCat.clicks;
  },
};

/* harmony default export */ __webpack_exports__["a"] = (catView);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_catController__ = __webpack_require__(0);


function init() {
  {
    __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].init();
  }
}
window.addEventListener('DOMContentLoaded', init);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const catModel =  {
  // Внутри data лежат объекты котов которые содержат url: 'httpX://....' и name: 'имя котика'
  data: [
    {
      url: 'https://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg',
      name: 'Кися',
    },
    {
      url: 'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
      name: 'Блохастик',
    },
    {
      url: 'http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-cat_thumb.ngsversion.1472140774957.adapt.1900.1.jpg',
      name: 'Мурка',
    },
    {
      url: 'https://www.petfinder.com/wp-content/uploads/2012/11/152177319-declawing-cats-632x475-e1354303246526-632x353.jpg',
      name: 'Туся',
    },
    {
      url: 'http://media1.santabanta.com/full1/Animals/Cats/cats-85a.jpg',
      name: 'Мр. мур-мур',
    },
    {
      url: 'https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg',
      name: 'Барсик',
    },
  ],
    currentCat: 0,
    loadImgCounter: 0,
    adminFormOpenState: false,
};

/* harmony default export */ __webpack_exports__["a"] = (catModel);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_catController__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_catView__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_adminFormView__ = __webpack_require__(1);




// Боковая менюшка со списком котиков
const menuView = {
  init() {
    this.menuContainer = document.querySelector('.menuContainer');
    this.menuContainer.innerHTML = '';
    const menu = document.createElement('ul');
    menu.classList.add('menuList');
    const allCats = __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].getAllCats();

    for (const [index, cat] of allCats.entries()) {
      const catLi = document.createElement('li');
      catLi.textContent = cat.name;
      catLi.addEventListener('click', () => {
        __WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].setCurrentCat(index);
        if (__WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].adminFormOpenState()) {
          __WEBPACK_IMPORTED_MODULE_2__views_adminFormView__["a" /* default */].render();
        }
        __WEBPACK_IMPORTED_MODULE_1__views_catView__["a" /* default */].render();
      });
      menu.appendChild(catLi);
    }
    this.menuContainer.appendChild(menu);
  },
};

/* harmony default export */ __webpack_exports__["a"] = (menuView);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_catController__ = __webpack_require__(0);


const progressBarView = {
  init() {
    this.progressBarContainer = document.querySelector('.progressBarContainer');
    this.progressBar = document.querySelector('.progressBar');
  },
  renderProgressBar() {
    this.progressBar.style.width = `${__WEBPACK_IMPORTED_MODULE_0__controllers_catController__["a" /* default */].getLoadedPercent()}%`;
  },
  hideProgressBar() {
    this.progressBarContainer.style.display = 'none';
  },
};

/* harmony default export */ __webpack_exports__["a"] = (progressBarView);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map