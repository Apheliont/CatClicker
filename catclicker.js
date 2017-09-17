function init() {

  function catClicker(data) {

    let model = {
      data: [],
      currentCat: 0,
      loadImgCounter: 0
    };

    let view = {
      initMenu: function() {
        let menuContainer = document.querySelector('.menuContainer');
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
          });
        });
        view.render();
      },
      render: function() {
        let imageContainer = document.querySelector('.imageContainer');
        if (!controller.isAllImgLoaded()) {
          imageContainer.innerHTML = 'Loading...';
          setTimeout(function(){view.render()}, 2000);
          return false;
        }

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
      isAllImgLoaded: function() {
        return model.data.length === model.loadImgCounter;
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
      name: 'Mr. pur-fur'}
  ];

  catClicker(listOfCats);

}

window.addEventListener('DOMContentLoaded', init);