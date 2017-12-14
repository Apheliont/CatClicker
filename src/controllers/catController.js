import catModel from '../models/catModel';
import catView from '../views/catView';
import menuView from '../views/menuView';
import progressBarView from '../views/progressBarView';
import adminFormView from '../views/adminFormView';

const catController = {
  init() {
    catController.initModel();
    progressBarView.init();
    menuView.init();
    catView.init();
    adminFormView.init();
  },
  initModel() {
    for (const cat of catModel.data) {
      cat.clicks = 0;
    }
  },
  getAllCats() {
    return catModel.data;
  },
  increaseCounter() {
    catModel.data[catModel.currentCat].clicks += 1;
    catView.render();
  },
  increaseLoadedImageCounter() {
    catModel.loadImgCounter += 1;
  },
  getCurrentCat() {
    return catModel.data[catModel.currentCat];
  },
  setCurrentCat(id) {
    catModel.currentCat = id;
  },
  getLoadedPercent() {
    return ((catModel.loadImgCounter * 100) / catModel.data.length);
  },
  updateInfo(obj) {
    const currentCat = catModel.data[catModel.currentCat];
    const objKeys = Object.keys(obj);
    for (const key of objKeys) {
      currentCat[key] = obj[key];
    }
    menuView.init();
    catView.render();
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
          progressBarView.renderProgressBar();
          resolve(cat.url);
        };
        img.onerror = () => {
            img.src = '';
            catController.increaseLoadedImageCounter();
            progressBarView.renderProgressBar();
            resolve('');
        };
      });
      imageArr.push(catImagePromise);
    }
    Promise.all(imageArr).then(() => {
      setTimeout(() => {
        progressBarView.hideProgressBar();
        catView.show();
        catView.render();
      }, 500);
    });
  },
  adminFormOpenState(state) {
    if (state !== null && typeof state === 'boolean') {
      catModel.adminFormOpenState = state;
      return false;
    }
    return catModel.adminFormOpenState;
  },
};

export default catController;