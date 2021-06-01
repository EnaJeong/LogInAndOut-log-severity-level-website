(function(){
  const LEVEL_COUNTS_DATA = LevelChart.genDataSet([334065, 132517, 12, 4141, 10, 2219, 8]);
  const FIRST_WORD_COUNTS_DATA = {
    labels: ["<DATE>", "type=SYSCALL", "level", "ossec:", "File", "System",
             "error:", "type=AVC", "oscap:", "E:", "<YEAR>", "NTFS",
             "Trojaned", "Windows", "--MARK--:", "The", "juniper", "OpenSCAP",
             "type=USER_AVC"],
    datasets: [
      {
        label: LevelChart.LEVEL_LABELS[0],
        backgroundColor: LevelChart.LEVEL_COLORS[0],
        data: [331771, 0, 1519, 0, 0, 0, 459, 0, 0, 297, 0, 0, 0, 0, 12, 0, 4, 3, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[1],
        backgroundColor: LevelChart.LEVEL_COLORS[1],
        data: [14051, 116496, 736, 29, 0, 820, 0, 369, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 3],
      },
      {
        label: LevelChart.LEVEL_LABELS[2],
        backgroundColor: LevelChart.LEVEL_COLORS[2],
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[3],
        backgroundColor: LevelChart.LEVEL_COLORS[3],
        data: [3719, 0, 11, 0, 181, 0, 0, 0, 198, 0, 31, 0, 0, 0, 0, 0, 1, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[4],
        backgroundColor: LevelChart.LEVEL_COLORS[4],
        data: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[5],
        backgroundColor: LevelChart.LEVEL_COLORS[5],
        data: [16, 0, 65, 1289, 641, 0, 0, 0, 168, 0, 0, 25, 15, 0, 0, 0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[6],
        backgroundColor: LevelChart.LEVEL_COLORS[6],
        data: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    ]
  }

  const SECOND_KEYWORD_COUNTS_DATA = {
    labels: ['--MARK--:', 'E: probe_rpminfo:', 'E: probe_rpmverifyfile:',
             'File <FILE> checksum changed.', 'File <FILE> is owned by root',
             'File <FILE> was added.', 'NTFS', 'OpenSCAP', 'System CIS',
             'System SSH Hardening', 'The', 'Trojaned', 'Windows',
             '[MON] localhost auditd[<NUM>]', '[MON] localhost augenrules',
             '[MON] localhost bluetoothd', '[MON] localhost dbus-daemon',
             '[MON] localhost dbus[<NUM>]', '[MON] localhost elasticsearch',
             '[MON] localhost esild-mlstart.sh', '[MON] localhost gnome-session',
             '[MON] localhost journal', '[MON] localhost kdumpctl', '[MON] localhost kernel',
             '[MON] localhost kibana', '[MON] localhost logstash', '[MON] localhost mcelog',
             '[MON] localhost polkitd', '[MON] localhost postfix/master', '[MON] localhost pulseaudio[<NUM>]',
             '[MON] localhost rc.local', '[MON] localhost sshd[<NUM>]', '[MON] localhost su', '[MON] localhost sudo',
             '[MON] localhost suricata', '[MON] localhost systemd', '[MON] localhost unix_chkpwd[<NUM>]',
             '[MON] localhost useradd[<NUM>]', '[MON] localhost yum[<NUM>]', '[MON] m2datateksolaris SC Alert',
             '[MON] sv260 sshd[<NUM>]', '[MON] sv260 telnetd[<NUM>]', '[YEAR] WinEvtLog: Application: ERROR',
             '[YEAR] WinEvtLog: System: ERROR', 'error:', 'juniper', 'level : %{rule.level}', 'level : 10',
             'level : 2', 'level : 3', 'level : 4', 'level : 5', 'level : 7', 'level : 8',
             'oscap: ERROR: Timeout expired.', 'oscap: "xccdf-overview"',
             'oscap: "xccdf-result" severity: "low"', 'oscap: "xccdf-result" severity: "medium"',
             'ossec: Agent started:', 'ossec: File rotated (inode changed):',
             'ossec: output: \'netstat listening ports\':',
             'type=AVC', 'type=SYSCALL', 'type=USER_AVC'],
    datasets: [
      {
        label: LevelChart.LEVEL_LABELS[0],
        backgroundColor: LevelChart.LEVEL_COLORS[0],
        data: [12, 249, 48,   0, 0, 0, 0, 3, 0,    0,
                0,   0,  0, 510, 8, 2, 1, 1, 7, 4383,
                1,  90,  1, 146, 170219, 138436, 2, 2, 0, 1,
                2, 3, 0, 0, 17948, 0, 0, 0, 0, 4,
                1, 1, 0, 0, 459, 4, 10, 27, 18, 593,
                2, 859, 10, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[1],
        backgroundColor: LevelChart.LEVEL_COLORS[1],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 532, 288,
               0, 0, 13, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 22, 0, 0, 0, 0, 3, 0,
               0, 210, 2, 13812, 0, 0, 0, 0, 0, 0,
               2, 0, 0, 0, 0, 0, 8, 13, 6, 282,
               2, 422, 2, 1, 0, 0, 0, 0, 5, 24,
               0, 369, 116496, 3],
      },
      {
        label: LevelChart.LEVEL_LABELS[2],
        backgroundColor: LevelChart.LEVEL_COLORS[2],
        data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               11, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[3],
        backgroundColor: LevelChart.LEVEL_COLORS[3],
        data: [  0,    0,  0,  0, 0,  181,   0, 0, 0, 0,
                 0,    0,  0,  0, 0,    0,   0, 0, 0, 0,
                 0,    0,  0,  0, 0,    0,   0, 0, 0, 0,
                 0, 1156,  1,  0, 1, 2210, 122, 0, 0, 0,
               229,    0, 20, 11, 0,    1,   0, 0, 0, 7,
                 0,    4,  0,  0, 0,    2, 196, 0, 0, 0,
                 0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[4],
        backgroundColor: LevelChart.LEVEL_COLORS[4],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 5, 0, 0, 0, 0, 0, 0, 0, 0,
               5, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[5],
        backgroundColor: LevelChart.LEVEL_COLORS[5],
        data: [   0,  0, 0, 397, 244, 0, 25,   0,  0,  0,
                  0, 15, 0,   0,   0, 0,  0,   0,  0,  0,
                  0,  0, 0,   0,   0, 0,  0,   0,  0,  0,
                  0,  0, 0,   0,   0, 0,  0,   0, 16,  0,
                  0,  0, 0,   0,   0, 0,  0,   3,  2, 18,
                  0, 41, 0,   1,   1, 2,  0, 165,  0,  0,
               1289,  0, 0, 0],
      },
      {
        label: LevelChart.LEVEL_LABELS[6],
        backgroundColor: LevelChart.LEVEL_COLORS[6],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 5, 0, 0, 0, 0, 0, 0,
               0, 2, 0, 0, 0, 0, 0, 1, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0],
      }
    ]
  }


  // Level Counts Chart
  var resultsChart = LevelChart.genBarChart(
    document.getElementById("levelCountsChart"),
    LEVEL_COUNTS_DATA,
  );

  // Level Counts Donut
  var ctx = document.getElementById("levelDonutChart");
  var levelDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: LEVEL_COUNTS_DATA,
    plugins: [{
      afterDraw: ChartUtils.drawDonutDataLabel,
    }],
    options: {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 100,
          right: 0,
          top: 100,
          bottom: 25,
        }
      },
      plugins: {
        // title: {
        //   display: true,
        //   text: '위험도별 로그 비율',
        //   position: 'bottom',
        //   font: {
        //     size: 20,
        //   }
        // },
        legend: {
          position: 'right'
        },
        tooltip: {
          enabled: false,
        },
      },
    }
  });

  var ctx = document.getElementById("firstWordLevelCountsChart");
  var firstWordLevelCountsChart = new Chart(ctx, {
    type: 'bar',
    data: FIRST_WORD_COUNTS_DATA,
    plugins: [{
      afterDraw: ChartUtils.drawStackedDataLabel,
    }],
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          type: 'logarithmic',
          min:1,
          ticks: {
            maxTicksLimit: 10,
            padding: 10,
          },
          grid: {
            drawBorder: false,
            borderDash: [1],
            beginAtZero: true,
          }
        }
      },
    },
  });



  var ctx = document.getElementById("secondKeywordLevelCountsChart");
  var secondKeywordLevelCountsChart = new Chart(ctx, {
    type: 'bar',
    data: SECOND_KEYWORD_COUNTS_DATA,
    plugins: [{
      afterDraw: ChartUtils.drawHStackedDataLabel,
    }],
    options: {
      maintainAspectRatio: false,
      responsive: true,
      indexAxis: 'y',
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        x: {
          stacked: true,
          type: 'logarithmic',
          min:1,
          ticks: {
            maxTicksLimit: 10,
            padding: 10,
          },
          grid: {
            drawBorder: false,
            borderDash: [1],
            beginAtZero: true,
          }
        }
      },
      layout: {
        padding: {
          left: 0,
          right: 100,
          top: 0,
          bottom: 0,
        }
      },
    },
  });

})();
