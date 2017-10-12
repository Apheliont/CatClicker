import catController from '../controllers/catController';

const progressBarView = {
  init() {
    this.progressBarContainer = document.querySelector('.progressBarContainer');
    this.progressBar = document.querySelector('.progressBar');
  },
  renderProgressBar() {
    this.progressBar.style.width = `${catController.getLoadedPercent()}%`;
  },
  hideProgressBar() {
    this.progressBarContainer.style.display = 'none';
  },
};

export default progressBarView;