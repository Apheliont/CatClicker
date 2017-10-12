import catController from '../controllers/catController';
import adminFormView from '../views/adminFormView';

const catView = {
  init() {
    this.catNameElement = document.querySelector('.cat__name');
    this.catImageElement = document.querySelector('.cat__image');
    this.catClickCounterElement = document.querySelector('.cat__clickCounter');
    this.cat = document.querySelector('.cat');
    this.adminBtn = document.querySelector('.cat__adminBtn');
    this.cat.style.display = 'none'; // по умолчанию скрываем поле вывода котов

    this.adminBtn.addEventListener('click', () => {
      if (!catController.adminFormOpenState()) {
        adminFormView.render();
      }
    });
    this.catImageElement.addEventListener('click', () => {
      catController.increaseCounter();
    });
    // Кешируем картинки и после полной их загрузки показываем окно с кошками
    catController.loadAllCats();
  },
  show() {
    this.cat.style.display = 'block';
  },
  render() {
    const currentCat = catController.getCurrentCat();
    this.catNameElement.textContent = currentCat.name;
    this.catImageElement.src = currentCat.url;
    this.catClickCounterElement.textContent = currentCat.clicks;
  },
};

export default catView;