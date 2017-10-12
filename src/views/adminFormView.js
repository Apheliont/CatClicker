import catController from '../controllers/catController';

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
      catController.updateInfo(updateObj);
      this.close();
      e.preventDefault();
    });
    this.form.style.display = 'none';
  },
  render() {
    this.form.style.display = 'block';
    const currentCat = catController.getCurrentCat();
    this.catName.value = currentCat.name;
    this.catURL.value = currentCat.url;
    this.catClicks.value = currentCat.clicks;
    catController.adminFormOpenState(true);
  },
  close() {
    this.catName.value = '';
    this.catURL.value = '';
    this.catClicks.value = '';
    this.form.style.display = 'none';
    catController.adminFormOpenState(false);
  },
};

export default adminFormView;