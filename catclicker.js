function init() {

  function catClicker(data) {
    let imageContainer = document.querySelector('.imageContainer');
    let menuContainer = document.querySelector('.menuContainer');

    let model = {
      data: [],
      currentCat: 0,
      loadImgCounter: 0
    };

    let view = {
      initMenu: function() {
        let menu = document.createElement('ul');
        menu.classList.add('menuList');
        controller.getAllCats().forEach(function(catObj, num){
          let catLi = document.createElement('li');
          catLi.textContent = catObj.name;
          catLi.addEventListener('click', function(e){
            controller.setCurrentCat(num);
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

this.cat.classList.add('cat--hidden');  // по умолчанию скрываем поле вывода котов

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
        this.cat.classList.remove('cat--hidden');
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

    let controller = {
      init: function() {
        controller.initModel();
        view.initMenu();
        view.initShowcase();
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
      }
    };
    controller.init();
  }



  let listOfCats = [
    {url: 'https://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg',
      name: 'Meowie'
    },
    {url: 'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
      name: 'Betsy'
    },
    {url: 'http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-cat_thumb.ngsversion.1472140774957.adapt.1900.1.jpg',
      name: 'Мурка'
    },
    {url: 'https://www.petfinder.com/wp-content/uploads/2012/11/152177319-declawing-cats-632x475-e1354303246526-632x353.jpg',
      name: 'Туся'
    },
    {url: 'http://media1.santabanta.com/full1/Animals/Cats/cats-85a.jpg',
      name: 'Mr. pur-fur'},
    {url: 'https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg',
      name: 'Бася'}
  ];

  catClicker(listOfCats);

}

window.addEventListener('DOMContentLoaded', init);