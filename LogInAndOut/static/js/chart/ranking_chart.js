(function(){
  const LABELS = ["May 5", "May 6", "May 7", "May 8", "May 9", "May 10", "May 11", "May 12", "May 13", "May 14"];
  const RANKING = [61, 51, 56, 14, 14, 8, 8, 8, 6, 6];
  const BASE_COLOR = "rgba(78, 115, 223, 1)";
  const FILLING_COLOR = "rgba(78, 115, 223, 0.05)";

  const delayBetweenPoints = 600;

  const drawDataLabel = function(chart) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function(dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)';

          var fontSize = Chart.defaults.font.size;
          var fontStyle = Chart.defaults.font.style;
          var fontFamily = Chart.defaults.font.family;
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          // Just naively convert to string for now
          var dataString = dataset.data[index].toString() + '위';

          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }

  // Ranking Chart
  var ctx = document.getElementById("rankingChart");
  var rankingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: LABELS.slice(0, 1),
      datasets: [{
        label: "Public Ranking",
        data: RANKING.slice(0, 1),
        fill: "start",
        lineTension: 0,
        backgroundColor: FILLING_COLOR,
        borderColor: BASE_COLOR,
        pointRadius: 3,
        pointBackgroundColor: BASE_COLOR,
        pointBorderColor: BASE_COLOR,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: BASE_COLOR,
        pointHoverBorderColor: BASE_COLOR,
        pointHitRadius: 10,
        pointBorderWidth: 2,
      }],
    },
    plugins: [{
      afterDatasetsDraw: drawDataLabel,
    }],
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
        },
        y: {
          reverse: true,
          min: 1,
          max: 70,
          ticks: {
            padding: 10,
            callback: function(value, index, values) {
              return value + '위';
            }
          },
          grid: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        },
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          // backgroundColor: "rgb(255,255,255)",
          // bodyFontColor: "#858796",
          // titleMarginBottom: 10,
          // titleFontColor: '#6e707e',
          // titleFontSize: 14,
          // borderColor: '#dddfeb',
          // borderWidth: 1,
          // xPadding: 15,
          // yPadding: 15,
          // displayColors: false,
          // intersect: false,
          // mode: 'index',
          // caretPadding: 10,
          callbacks: {
            label: function(context) {
              let datasetLabel = context.dataset.label || '';
              return `${datasetLabel} : ${context.raw}위`;
            }
          }
        },
      }
    }
  });

  let count = 1;
  var interval = setInterval(function() {
    const data = rankingChart.data;
    data.labels = LABELS.slice(0, count+1);
    data.datasets[0].data.push(RANKING[count]);
    rankingChart.update();

    if (++count === RANKING.length){
      clearInterval(interval);
    }
  }, delayBetweenPoints);
})();
