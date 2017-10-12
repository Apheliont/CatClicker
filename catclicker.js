function init() {
  {
    const catClicker = {
      // ------- Model Section ----------
      model: {
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
      },

      // ------- View Section ----------
      // Боковая менюшка со списком котов
      menuView: {
        init() {
          this.menuContainer = document.querySelector('.menuContainer');
          this.menuContainer.innerHTML = '';
          const menu = document.createElement('ul');
          menu.classList.add('menuList');
          const allCats = catClicker.controller.getAllCats();

          for (const [index, cat] of allCats.entries()) {
            const catLi = document.createElement('li');
            catLi.textContent = cat.name;
            catLi.addEventListener('click', () => {
              catClicker.controller.setCurrentCat(index);
              if (catClicker.controller.adminFormOpenState()) {
                catClicker.adminFormView.render();
              }
              catClicker.catView.render();
            });
            menu.appendChild(catLi);
          }
          this.menuContainer.appendChild(menu);
        },
      },


      catView: {
        init() {
          this.catNameElement = document.querySelector('.cat__name');
          this.catImageElement = document.querySelector('.cat__image');
          this.catClickCounterElement = document.querySelector('.cat__clickCounter');
          this.cat = document.querySelector('.cat');
          this.adminBtn = document.querySelector('.cat__adminBtn');
          this.cat.style.display = 'none'; // по умолчанию скрываем поле вывода котов

          this.adminBtn.addEventListener('click', () => {
            if (!catClicker.controller.adminFormOpenState()) {
              catClicker.adminFormView.render();
            }
          });
          this.catImageElement.addEventListener('click', () => {
            catClicker.controller.increaseCounter();
          });
          // Кешируем картинки и после полной их загрузки показываем окно с кошками
          catClicker.controller.loadAllCats();
        },
        show() {
          this.cat.style.display = 'block';
        },
        render() {
          const currentCat = catClicker.controller.getCurrentCat();
          this.catNameElement.textContent = currentCat.name;
          this.catImageElement.src = currentCat.url;
          this.catClickCounterElement.textContent = currentCat.clicks;
        },
      },


      progressBarView: {
        init() {
          this.progressBarContainer = document.querySelector('.progressBarContainer');
          this.progressBar = document.querySelector('.progressBar');
        },
        renderProgressBar() {
          this.progressBar.style.width = `${catClicker.controller.getLoadedPercent()}%`;
        },
        hideProgressBar() {
          this.progressBarContainer.style.display = 'none';
        },
      },


      adminFormView: {
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
              name: catClicker.adminFormView.catName.value,
              url: catClicker.adminFormView.catURL.value,
              clicks: +catClicker.adminFormView.catClicks.value,
            };
            catClicker.controller.updateInfo(updateObj);
            this.close();
            e.preventDefault();
          });
          this.form.style.display = 'none';
        },
        render() {
          this.form.style.display = 'block';
          const currentCat = catClicker.controller.getCurrentCat();
          this.catName.value = currentCat.name;
          this.catURL.value = currentCat.url;
          this.catClicks.value = currentCat.clicks;
          catClicker.controller.adminFormOpenState(true);
        },
        close() {
          this.catName.value = '';
          this.catURL.value = '';
          this.catClicks.value = '';
          this.form.style.display = 'none';
          catClicker.controller.adminFormOpenState(false);
        },
      },

      // ------- Controller Section ----------
      controller: {
        init() {
          catClicker.controller.initModel();
          catClicker.progressBarView.init();
          catClicker.menuView.init();
          catClicker.catView.init();
          catClicker.adminFormView.init();
        },
        initModel() {
          for (const cat of catClicker.model.data) {
            cat.clicks = 0;
          }
        },
        getAllCats() {
          return catClicker.model.data;
        },
        increaseCounter() {
          catClicker.model.data[catClicker.model.currentCat].clicks += 1;
          catClicker.catView.render();
        },
        increaseLoadedImageCounter() {
          catClicker.model.loadImgCounter += 1;
        },
        getCurrentCat() {
          return catClicker.model.data[catClicker.model.currentCat];
        },
        setCurrentCat(id) {
          catClicker.model.currentCat = id;
        },
        getLoadedPercent() {
          return ((catClicker.model.loadImgCounter * 100) / catClicker.model.data.length);
        },
        updateInfo(obj) {
          const currentCat = catClicker.model.data[catClicker.model.currentCat];
          const objKeys = Object.keys(obj);
          for (const key of objKeys) {
            currentCat[key] = obj[key];
          }
          catClicker.menuView.init();
          catClicker.catView.render();
        },
        loadAllCats() {
          const allCats = catClicker.controller.getAllCats();
          const imageArr = [];
          for (const cat of allCats) {
            const catImagePromise = new Promise((resolve, reject) => {
              const img = new Image();
              img.src = cat.url;
              img.onload = () => {
                catClicker.controller.increaseLoadedImageCounter();
                catClicker.progressBarView.renderProgressBar();
                resolve(cat.url);
              };
              img.onerror = () => reject(cat.url);
            });
            imageArr.push(catImagePromise);
          }
          Promise.all(imageArr).then(() => {
            setTimeout(() => {
              catClicker.progressBarView.hideProgressBar();
              catClicker.catView.show();
              catClicker.catView.render();
            }, 500);
          });
        },
        adminFormOpenState(state) {
          if (state !== null && typeof state === 'boolean') {
            catClicker.model.adminFormOpenState = state;
            return false;
          }
          return catClicker.model.adminFormOpenState;
        },
      },
    };

    catClicker.controller.init();
  }
}

window.addEventListener('DOMContentLoaded', init);
