import catController from './controllers/catController';

function init() {
  {
    catController.init();
  }
}
window.addEventListener('DOMContentLoaded', init);
