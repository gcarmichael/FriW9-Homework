var PieChart = function(achiList){
  var container = document.getElementById('pieChart');
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
      text: "% of users with achievement",
      style: {
        "font-weight": "bold"
      }
    },
    series: [{
      showInLegend: true,
      name: "Completion",
      data: [{
        name: achiList.achievementpercentages.achievements[0].name + " achieved",
        y: achiList.achievementpercentages.achievements[0].percent
      },
      {
        name: achiList.achievementpercentages.achievements[0].name + " not achieved",
        y: 100 - (achiList.achievementpercentages.achievements[0].percent)
      }]
    }],
    legend: {
      enabled: true
    }
  });
  console.log(chart);
}