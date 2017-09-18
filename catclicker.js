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
        controller.getAllCats().forEach(function(catObj, num){
          let image = new Image();
          image.src = catObj.url;
          image.style.width = 400 + 'px';
          image.addEventListener('click', function(){
            controller.increaseCounter();
          });
          image.addEventListener('load', function(){
            controller.addImageObj(image, num);
            if (controller.getLoadedPercent() === 100) {
              view.render();
            } else {
              view.renderProgressBar();
            }

          });
        });
      },
      render: function() {
        imageContainer.innerHTML = '';
        let currentCat = controller.getCurrentCat();
        let figure = document.createElement('figure');
        let catNameElement = document.createElement('p');
        let figcaption = document.createElement('figcaption');

        catNameElement.textContent = currentCat.name;
        figcaption.textContent = currentCat.clicks;
        figure.appendChild(catNameElement);
        figure.appendChild(currentCat.image);
        figure.appendChild(figcaption);
        imageContainer.appendChild(figure);
      },
      renderProgressBar() {
        let progressBar = document.querySelector('.progressBar');
        if (!progressBar) {
          let progressContainer = document.createElement('div');
          progressBar = document.createElement('div');
          progressContainer.classList.add('progressContainer');
          progressBar.classList.add('progressBar');
          progressContainer.appendChild(progressBar);
          imageContainer.appendChild(progressContainer);
        }
        console.log(progressBar);
        progressBar.style.width = controller.getLoadedPercent() + '%';
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
      addImageObj: function(image, num) {
        model.data[num].image = image;
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