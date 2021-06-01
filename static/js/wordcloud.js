const WordCloud = {
  DEACTIVATE: "deactivate",
  NOT_INCLUDED : "not-included",

  changeState(category) {
    let doc = document;

    let btn = doc.querySelector(`.category-button[data-category='${category}']`);
    let img = doc.querySelector(`.wordcloud-image[data-category='${category}']`);

    btn.classList.toggle(WordCloud.DEACTIVATE);
    img.classList.toggle(WordCloud.NOT_INCLUDED);
  },

  viewAll(){
    let doc = document;

    let btn = doc.querySelector(`.category-button[data-category='all']`);
    let imgs = doc.querySelectorAll(".wordcloud-image");
    let btns = doc.querySelectorAll(".category-button");

    if (btn.classList.contains(WordCloud.DEACTIVATE)){
      for (let i=0, n=imgs.length; i < n; i++){
        imgs[i].classList.remove(WordCloud.NOT_INCLUDED);
      }
      for (let i=0, n=btns.length; i < n; i++){
        btns[i].classList.remove(WordCloud.DEACTIVATE);
      }
    }
    else {
      for (let i=0, n=imgs.length; i < n; i++){
        imgs[i].classList.add(WordCloud.NOT_INCLUDED);
      }
      for (let i=0, n=btns.length; i < n; i++){
        btns[i].classList.add(WordCloud.DEACTIVATE);
      }
    }
  },
};
