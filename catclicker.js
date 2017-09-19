function init() {

  function catClicker(data) {
    let imageContainer = document.querySelector('.imageContainer');
    let menuContainer = document.querySelector('.menuContainer');

    let model = {
      data: [],
      currentCat: 0,
      loadImgCounter: 0,
      adminFormOpenState: false
    };

    let view = {
      initMenu: function() {
        this.menuContainer = document.querySelector('.menuContainer');
        this.menuContainer.innerHTML = '';
        let menu = document.createElement('ul');
        menu.classList.add('menuList');
        controller.getAllCats().forEach(function(catObj, num){
          let catLi = document.createElement('li');
          catLi.textContent = catObj.name;
          catLi.addEventListener('click', function(e){
            controller.setCurrentCat(num);
            if (controller.adminFormOpenState()) {
              adminFormView.render();
            }
            view.render();
          });
          menu.appendChild(catLi);
        });
        menuContainer.appendChild(menu);
      },

      initShowcase: function() {
        this.catNameElement = document.querySelector('.cat__name');
        this.catImageElement = document.querySelector('.cat__image');
        this.catClickCounterElement = document.querySelector('.cat__clickCounter');
        this.cat = document.querySelector('.cat');
        this.progressBarContainer = document.querySelector('.progressBarContainer');
        this.progressBar = document.querySelector('.progressBar');
        this.adminBtn = document.querySelector('.cat__adminBtn');

        this.cat.style.display = 'none';  // по умолчанию скрываем поле вывода котов

        this.adminBtn.addEventListener('click', function(){
          if (!controller.adminFormOpenState()) {
            adminFormView.render();
          }
        });

        view.catImageElement.addEventListener('click', function(e){
          controller.increaseCounter();
        });
        controller.getAllCats().forEach(function(catObj, num){
          let image = new Image();
          image.src = catObj.url;

          image.addEventListener('load', function(){
            controller.increaseLoadedImageCounter();
            view.renderProgressBar();

            if (controller.getLoadedPercent() === 100) {
              setTimeout(function(){          //чтобы увидеть 100% загрузки на прогрессбаре
                view.hideProgressBar();
                view.showShowcase();
                view.render();
              }, 500);
            }
          });
        });
      },

      showShowcase: function() {
        this.cat.style.display = 'block';
      },

      render: function() {
        let currentCat = controller.getCurrentCat();

        this.catNameElement.textContent = currentCat.name;
        this.catImageElement.src = currentCat.url;
        this.catClickCounterElement.textContent = currentCat.clicks;
      },

      renderProgressBar: function() {
        this.progressBar.style.width = controller.getLoadedPercent() + '%';
      },

      hideProgressBar: function() {
        this.progressBarContainer.style.display = 'none';
      }
    };

    let adminFormView = {
        init: function() {
          this.form = document.querySelector('.admin-form');
          this.catName = document.querySelector('.admin-form__cat-name');
          this.catURL = document.querySelector('.admin-form__cat-url');
          this.catClicks = document.querySelector('.admin-form__cat-clicks');
          this.cancelBtn = document.querySelector('.admin-form-cancel');
          this.submitBtn = document.querySelector('.admin-form-submit');

          this.cancelBtn.addEventListener('click', function(e){
            adminFormView.close();
            e.preventDefault();
          });
          this.submitBtn.addEventListener('click', function(e){
              let updateObj = { name: adminFormView.catName.value,
                                url: adminFormView.catURL.value,
                                clicks: adminFormView.catClicks.value};
              controller.updateInfo(updateObj);
            adminFormView.close();
              e.preventDefault();
          });

          this.form.style.display = 'none';
        },

      render: function() {
        this.form.style.display = 'block';
        let currentCat = controller.getCurrentCat();
        this.catName.value = currentCat.name;
        this.catURL.value = currentCat.url;
        this.catClicks.value = currentCat.clicks;
        controller.adminFormOpenState(true);
      },
      close: function() {
        this.catName.value = '';
        this.catURL.value = '';
        this.catClicks.value = '';
        this.form.style.display = 'none';
        controller.adminFormOpenState(false);
      }

    };

    let controller = {
      init: function() {
        controller.initModel();
        view.initMenu();
        view.initShowcase();
        adminFormView.init();
      },
      initModel: function() {
        data.forEach(function(catObj){
          catObj.clicks = 0;
          model.data.push(catObj);
        });
      },
      getAllCats: function() {
        return model.data;
      },
      increaseCounter: function() {
        model.data[model.currentCat].clicks++;
        view.render();
      },
      increaseLoadedImageCounter: function() {
        model.loadImgCounter++;
      },
      getCurrentCat: function() {
        return model.data[model.currentCat];
      },
      setCurrentCat: function(id) {
        model.currentCat = id;
      },
      getLoadedPercent: function() {
        return (model.loadImgCounter * 100 / model.data.length);
      },
      updateInfo: function(obj) {
          for (let prop in obj) {
              if (model.data[model.currentCat].hasOwnProperty(prop)) {
                model.data[model.currentCat][prop] = obj[prop];
              }
          }
        view.initMenu();
          view.render();
      },
      adminFormOpenState: function() {
        if (arguments.length > 0 && typeof arguments[0] === 'boolean') {
          model.adminFormOpenState = arguments[0];
        } else {
          return model.adminFormOpenState;
        }
      }
    };
    controller.init();
  }



  let listOfCats = [
    {url: 'https://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg',
      name: 'Кися'
    },
    {url: 'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
      name: 'Блохастик'
    },
    {url: 'http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-cat_thumb.ngsversion.1472140774957.adapt.1900.1.jpg',
      name: 'Мурка'
    },
    {url: 'https://www.petfinder.com/wp-content/uploads/2012/11/152177319-declawing-cats-632x475-e1354303246526-632x353.jpg',
      name: 'Туся'
    },
    {url: 'http://media1.santabanta.com/full1/Animals/Cats/cats-85a.jpg',
      name: 'Мр. мур-мур'
    },
    {url: 'https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg',
      name: 'Барсик'
    }
  ];

  catClicker(listOfCats);

}

window.addEventListener('DOMContentLoaded', init);