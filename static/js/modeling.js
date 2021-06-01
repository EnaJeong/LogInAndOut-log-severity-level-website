const Modeling = {
  SELECTED : "focus",

  lastFocusedBtn : null,
  resultChart : null,

  init(category){
    Modeling.resultChart = LevelChart.genBarChart(
      document.getElementById("resultChart"),
      {
        labels: LevelChart.LEVEL_LABELS,
        datasets: [{
          label: "Count",
          backgroundColor: LevelChart.LEVEL_COLORS,
          data: RESULTS[category]["result"],
        }],
      },
    );
    Modeling.changeState(category);
  },

  changeState(category) {
    let doc = document;

    let btn = doc.querySelector(`.category-button[data-category='${category}']`);
    if (Modeling.lastFocusedBtn == btn){
      return;
    }

    if (Modeling.lastFocusedBtn){
      Modeling.lastFocusedBtn.classList.remove(Modeling.SELECTED);
    }
    btn.classList.add(Modeling.SELECTED);
    Modeling.lastFocusedBtn = btn;

    // model detail
    doc.getElementById(RESULTS[category]['model']).checked = true;
    doc.getElementById(RESULTS[category]['vectorizer']).checked = true;
    doc.getElementById(RESULTS[category]['masking']).checked = true;
    doc.getElementById(RESULTS[category]['outlier']).checked = true;

    // score
    doc.getElementById("detail-score").innerHTML = RESULTS[category]["score"];
      doc.getElementById("detail-rank").innerHTML = ` (${RESULTS[category]["rank"]}위)`;

    // Level Counts Chart
    Modeling.resultChart.reset();
    Modeling.resultChart.data.datasets[0].data = RESULTS[category]["result"];
    Modeling.resultChart.update();
  },
};

(function(){
  Modeling.init("%EC%B5%9C%EC%A2%85");
})();
