const catModel = {
  // Внутри data лежат объекты котов которые содержат url: 'httpX://....' и name: 'имя котика'
  data: [
    {
      url: 'https://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg',
      name: 'Кися',
    },
    {
      url: 'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
      name: 'Блохастик',
    },
    {
      url: 'http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-cat_thumb.ngsversion.1472140774957.adapt.1900.1.jpg',
      name: 'Мурка',
    },
    {
      url: 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
      name: 'Туся',
    },
    {
      url: 'http://media1.santabanta.com/full1/Animals/Cats/cats-85a.jpg',
      name: 'Мр. мур-мур',
    },
    {
      url: 'https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg',
      name: 'Барсик',
    },
  ],
    currentCat: 0,
    loadImgCounter: 0,
    adminFormOpenState: false,
};

export default catModel;