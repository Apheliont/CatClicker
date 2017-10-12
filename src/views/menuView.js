import catController from '../controllers/catController';
import catView from '../views/catView';
import adminFormView from '../views/adminFormView';

// Боковая менюшка со списком котиков
const menuView = {
  init() {
    this.menuContainer = document.querySelector('.menuContainer');
    this.menuContainer.innerHTML = '';
    const menu = document.createElement('ul');
    menu.classList.add('menuList');
    const allCats = catController.getAllCats();

    for (const [index, cat] of allCats.entries()) {
      const catLi = document.createElement('li');
      catLi.textContent = cat.name;
      catLi.addEventListener('click', () => {
        catController.setCurrentCat(index);
        if (catController.adminFormOpenState()) {
          adminFormView.render();
        }
        catView.render();
      });
      menu.appendChild(catLi);
    }
    this.menuContainer.appendChild(menu);
  },
};

export default menuView;