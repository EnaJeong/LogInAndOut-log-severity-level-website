const PredictionChart = {
  THRESHOLDS : [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
  SEVERITY_COLORS : {
    "0": "#3ED53A",
    "1": "#ECB864",
    "2": "#ECB864",
    "4": "#DA6A41",
    "3": "#DA6A41",
    "5": "#A62B18",
    "6": "#A62B18",
    "7": "#891F51",
  },

  genRadarChart(data, level){
    let ctx = document.getElementById("predictionChart");
    let thresholds = PredictionChart.THRESHOLDS;
    let baseColor = PredictionChart.SEVERITY_COLORS[level];
    let backgroundColor = ChartUtils.transparent(baseColor, 0.2);
    let thresholdColor = "#ff0017";
    let borderColor = "#15628E";

    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: LevelChart.LEVEL_LABELS.slice(0, data.length),
        datasets: [
          {
            label: 'Probability',
            data: data,
            fill: true,
            backgroundColor: backgroundColor,
            borderColor: baseColor,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: baseColor,
            pointBorderColor: baseColor,
            // borderWidth: 10,
          },
          {
            label: 'Threshold',
            data: thresholds,
            fill: false,
            borderColor: thresholdColor,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointBackgroundColor: thresholdColor,
            pointBorderColor: thresholdColor,
            borderDash: [1],
            borderWidth: 5,
            pointBorderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        elements: {
          line: {
            borderWidth: 10,
          }
        },
        scales: {
          r: {
            max: 1.0,
            min: 0,
            ticks: {
              stepSize: 0.1,
              z: 1,
              display: false,
            },
            pointLabels: {
              font: {
                size: Chart.defaults.font.size,
              }
            },
            angleLines: {
              color: ChartUtils.transparent(borderColor, 0.5),
            },
            grid: {
              color: borderColor,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
            position: "bottom",
          },
          tooltip: {
            position: "nearest",
          }
        },
      },
    })
  },
}
