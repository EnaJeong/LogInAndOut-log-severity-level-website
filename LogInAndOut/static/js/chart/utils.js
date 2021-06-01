// Chart.defaults.font.family = ""; // 'Roboto'
Chart.defaults.font.size = 16;
Chart.defaults.color = '#000';
Chart.defaults.borderColor = '#DDD';

const ChartUtils = {
  calculatePoint(i, intervalSize, colorRangeInfo) {
    var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
    return (useEndAsStart
      ? (colorEnd - (i * intervalSize))
      : (colorStart + (i * intervalSize)));
  },
  interpolateColors(dataLength, colorScale, colorRangeInfo) {
    var { colorStart, colorEnd } = colorRangeInfo;
    var colorRange = colorEnd - colorStart;
    var intervalSize = colorRange / dataLength;
    var i, colorPoint;
    var colorArray = [];

    for (i = 0; i < dataLength; i++) {
      colorPoint = ChartUtils.calculatePoint(i, intervalSize, colorRangeInfo);
      colorArray.push(colorScale(colorPoint));
    }

    return colorArray;
  },
  transparent(color, alpha) {
    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },

  drawDataLabel(chart) {
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
          var dataString = ChartUtils.number_format(dataset.data[index].toString());

          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  },

  getSuitableY(y, yArray=[], direction) {
    let result = y;
    yArray.forEach((existedY) => {
      if (existedY - 14 < result && existedY + 14 > result) {
        if (direction === "right") {
          result = existedY + 14;
        } else {
          result = existedY - 14;
        }
      }
    });

    return result;
  },

  drawDonutDataLabel(chart) {
    const ctx = chart.ctx;
    ctx.save();

    const leftLabelCoordinates = [];
    const rightLabelCoordinates = [];
    const chartCenterPoint = {
      x:
        (chart.chartArea.right - chart.chartArea.left) / 2 +
        chart.chartArea.left,
      y:
        (chart.chartArea.bottom - chart.chartArea.top) / 2 +
        chart.chartArea.top
    };
    const legendItems = chart.legend.legendItems;

    let lables = chart.config.data.labels;
    chart.config.data.labels.forEach((label, i) => {
      if (legendItems[i]['hidden']){
        return;
      }

      const meta = chart.getDatasetMeta(0);
      const arc = meta.data[i];
      const dataset = chart.config.data.datasets[0];

      // Percentage
      let sum = chart._metasets[0].total;
      let value = dataset.data[i] / sum * 100;
      value = (value < 10) ? value.toFixed(4) : value.toFixed(3);

      // Prepare data to draw
      const centerPoint = arc.getCenterPoint();
      let labelX = centerPoint.x;
      let labelY = centerPoint.y;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let color = Chart.defaults.color;
      let labelColor = Chart.defaults.color;

      if (value < 10){
        const model = arc.options;

        const angle = Math.atan2(
          centerPoint.y - chartCenterPoint.y,
          centerPoint.x - chartCenterPoint.x
        );
        // this point overlapsed with existed points
        // so we will reduce y by 14 if it's on the right
        // or add by 14 if it's on the left
        const point2X =
          chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius + 15);
        let point2Y =
          chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius + 15);

        let suitableY;
        if (point2X < chartCenterPoint.x) {
          suitableY = ChartUtils.getSuitableY(point2Y, leftLabelCoordinates, "left");
        } else {
          suitableY = ChartUtils.getSuitableY(point2Y, rightLabelCoordinates, "right");
        }
        point2Y = suitableY;

        let edgePointX =
          point2X < chartCenterPoint.x ? point2X - 10 : point2X + 10;

        if (point2X < chartCenterPoint.x) {
          leftLabelCoordinates.push(point2Y);
        } else {
          rightLabelCoordinates.push(point2Y);
        }

        //DRAW
        ctx.strokeStyle = color;
        // first line: connect between arc's center point and outside point
        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(point2X, point2Y);
        ctx.stroke();
        // second line: connect between outside point and chart's edge
        ctx.beginPath();
        ctx.moveTo(point2X, point2Y);
        ctx.lineTo(edgePointX, point2Y);
        ctx.stroke();

        // custom label
        labelX = edgePointX;
        labelY = point2Y;
        ctx.textAlign = edgePointX < chartCenterPoint.x ? "right" : "left";
      }

      ctx.fillStyle = labelColor;
      ctx.fillText(value+"%", labelX, labelY);
    });
    ctx.restore();
  },

  drawStackedDataLabel(chart) {
    let ctx = chart.ctx;
    let datasets = chart.data.datasets;
    let labels = chart.data.labels;

    let padding = 5;
    let fontSize = Chart.defaults.font.size;
    let fontStyle = Chart.defaults.font.style;
    let fontFamily = Chart.defaults.font.family;
    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let checked = new Array(labels.length);
    checked.fill(false);

    for (let i=datasets.length-1; i > -1; i--){
      let meta = chart.getDatasetMeta(i);
      if (meta.hidden){
        continue;
      }

      for (let index=0; index < labels.length; index++){
        if (checked[index] || (datasets[i].data[index] == 0)) {
          continue;
        }

        let sum = 0;
        for (let j=0; j < datasets.length; j++){
          if (!chart.getDatasetMeta(j).hidden){
            sum += datasets[j].data[index];
          }
        }
        sum = ChartUtils.number_format(sum.toString());

        let position = meta.data[index].tooltipPosition();
        ctx.fillText(sum, position.x, position.y - (fontSize / 2) - padding);

        checked[index] = true;
      }
    }
  },

  drawHStackedDataLabel(chart) {
    let ctx = chart.ctx;
    let datasets = chart.data.datasets;
    let labels = chart.data.labels;

    let padding = 5;
    let fontSize = Chart.defaults.font.size;
    let fontStyle = Chart.defaults.font.style;
    let fontFamily = Chart.defaults.font.family;
    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let checked = new Array(labels.length);
    checked.fill(false);

    for (let i=datasets.length-1; i > -1; i--){
      let meta = chart.getDatasetMeta(i);
      if (meta.hidden){
        continue;
      }

      for (let index=0; index < labels.length; index++){
        if (checked[index] || (datasets[i].data[index] == 0)) {
          continue;
        }

        let sum = 0;
        for (let j=0; j < datasets.length; j++){
          if (!chart.getDatasetMeta(j).hidden){
            sum += datasets[j].data[index];
          }
        }
        sum = ChartUtils.number_format(sum.toString());

        let position = meta.data[index].tooltipPosition();
        var x =  position.x + (fontSize * sum.length / 4) + padding;

        ctx.fillText(sum, x, position.y);

        checked[index] = true;
      }
    }
  },
}

const LevelChart = {
  LEVEL_LABELS : ["위험도 0", "위험도 1", "위험도 2", "위험도 3", "위험도 4", "위험도 5", "위험도 6", "위험도 7"],
  LEVEL_COLORS : ChartUtils.interpolateColors(
    8,
    d3.interpolateSpectral,
    {
      colorStart: 0,
      colorEnd: 0.85,
      useEndAsStart: true,
      maxBarThickness: 60,
    },
  ),

  genDataSet(data) {
    return {
      labels: LevelChart.LEVEL_LABELS.slice(0, data.length),
      datasets: [{
        label: "Count",
        backgroundColor: LevelChart.LEVEL_COLORS,
        data: data,
      }],
    }
  },

  genBarChart(ctx, data) {
    return new Chart(ctx, {
      type: 'bar',
      data: data,
      plugins: [{
        afterDatasetsDraw: ChartUtils.drawDataLabel,
      }],
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
              // drawBorder: false,
            },
          },
          y: {
            type: 'logarithmic',
            ticks: {
              maxTicksLimit: 10,
              padding: 10,
            },
            grid: {
              drawBorder: false,
              borderDash: [1],
              beginAtZero: true,
            }
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 25,
            bottom: 0,
          }
        },
        plugins: {
          legend: false,
          tooltip: {
            // position: 'average',
            // titleMarginBottom: 10,
            // titleFontColor: '#6e707e',
            // titleFontSize: 14,
            // backgroundColor: "rgb(255,255,255)",
            // bodyFontColor: "#858796",
            // borderColor: '#dddfeb',
            // borderWidth: 1,
            // xPadding: 15,
            // yPadding: 15,
            // displayColors: false,
            // caretPadding: 10,
            callbacks: {
              label: function(context) {
                let datasetLabel = context.dataset.label || '';
                let dataset = context.dataset.data;
                let sum = 0;
                for (let i=0; i < dataset.length; i++){
                  sum += dataset[i];
                }
                // let sum = chart._metasets[0].total;
                let percentage = (context.raw / sum * 100).toFixed(4);

                return `${datasetLabel} : ${context.formattedValue} (${percentage}%)`;
              }
            }
          },
        },
      }
    })
  },

}
