function createAgeDistributionChart2() {
    fetch('/get-datchar2')
        .then(response => response.json())
        .then(data2 => {
            updateChart23(data2);
        })
        .catch(error => console.error('Error:', error));
}
function updateChart23(data_df1) {
    console.log(data_df1)
    //pie chart with job_tile data
    am5.ready(function() {


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chart2");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(am5percent.PieChart.new(root, {
          radius: am5.percent(90),
          innerRadius: am5.percent(50),
          layout: root.horizontalLayout
        }));
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series1 = chart.series.push(am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "class"
        }));
        
        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series1.data.setAll(data_df1);
        
        // Disabling labels and ticks
        series1.labels.template.set("visible", false);
        series1.ticks.template.set("visible", false);
        
        // Adding gradients
        series1.slices.template.set("strokeOpacity", 0);
        series1.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
          stops: [{
            brighten: -0.8
          }, {
            brighten: -0.8
          }, {
            brighten: -0.5
          }, {
            brighten: 0
          }, {
            brighten: -0.5
          }]
        }));
        
        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        var legend = chart.children.push(am5.Legend.new(root, {
          centerY: 95,
          y: 120,
          layout: root.verticalLayout
        }));
        // set value labels align to right
        legend.valueLabels.template.setAll({ textAlign: "right" })
        // set width and max width of labels
        legend.labels.template.setAll({ 
          maxWidth: 100,
          width: 140,
          oversizedBehavior: "wrap"
        });
        
        legend.data.setAll(series1.dataItems);
        
        
        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series1.appear(1000, 100);
        
        });
   
    // am5.ready(function() {

    //     // Create root element
    //     // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //     var root1 = am5.Root.new("chart2");
        
    //     // Set themes
    //     // https://www.amcharts.com/docs/v5/concepts/themes/
    //     root1.setThemes([
    //       am5themes_Animated.new(root)
    //     ]);
        
    //     // Create chart
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //     var chart = root1.container.children.push(am5xy.XYChart.new(root, {
    //       panX: true,
    //       panY: true,
    //       wheelX: "panX",
    //       wheelY: "zoomX",
    //       pinchZoomX: true,
    //       paddingLeft:0,
    //       paddingRight:1
    //     }));
        
    //     // Add cursor
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //     var cursor = chart.set("cursor", am5xy.XYCursor.new(root1, {}));
    //     cursor.lineY.set("visible", false);
        
        
    //     // Create axes
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //     var xRenderer = am5xy.AxisRendererX.new(root1, { 
    //       minGridDistance: 30, 
    //       minorGridEnabled: true
    //     });
        
    //     xRenderer.labels.template.setAll({
    //       rotation: -90,
    //       centerY: am5.p50,
    //       centerX: am5.p100,
    //       paddingRight: 15
    //     });
        
    //     xRenderer.grid.template.setAll({
    //       location: 1
    //     })
        
    //     var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root1, {
    //       maxDeviation: 0.3,
    //       categoryField: "class2",
    //       renderer: xRenderer,
    //       tooltip: am5.Tooltip.new(root1, {})
    //     }));
        
    //     var yRenderer = am5xy.AxisRendererY.new(root1, {
    //       strokeOpacity: 0.1
    //     })
        
    //     var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root1, {
    //       maxDeviation: 0.3,
    //       renderer: yRenderer
    //     }));
        
    //     // Create series
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //     var series1 = chart.series.push(am5xy.ColumnSeries.new(root1, {
    //       name: "Series 1",
    //       xAxis: xAxis,
    //       yAxis: yAxis,
    //       valueYField: "value2",
    //       sequencedInterpolation: true,
    //       categoryXField: "class2",
    //       tooltip: am5.Tooltip.new(root1, {
    //         labelText: "{valueY}"
    //       })
    //     }));
        
    //     series1.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    //     series.columns.template.adapters.add("fill", function (fill, target) {
    //       return chart.get("colors").getIndex(series.columns.indexOf(target));
    //     });
        
    //     series1.columns.template.adapters.add("stroke", function (stroke, target) {
    //       return chart.get("colors").getIndex(series.columns.indexOf(target));
    //     });
        
        
    //     // Set data
    //     var data = [{
    //       country: "USA",
    //       value: 2025
    //     }, {
    //       country: "China",
    //       value: 1882
    //     }, {
    //       country: "Japan",
    //       value: 1809
    //     }, {
    //       country: "Germany",
    //       value: 1322
    //     }, {
    //       country: "UK",
    //       value: 1122
    //     }, {
    //       country: "France",
    //       value: 1114
    //     }, {
    //       country: "India",
    //       value: 984
    //     }, {
    //       country: "Spain",
    //       value: 711
    //     }, {
    //       country: "Netherlands",
    //       value: 665
    //     }, {
    //       country: "South Korea",
    //       value: 443
    //     }, {
    //       country: "Canada",
    //       value: 441
    //     }];
        
    //     xAxis.data.setAll(data_df1);
    //     series1.data.setAll(data_df1);
        
        
    //     // Make stuff animate on load
    //     // https://www.amcharts.com/docs/v5/concepts/animations/
    //     series1.appear(1000);
    //     chart.appear(1000, 100);
        
    //     });
}

document.addEventListener('DOMContentLoaded', function() {
    createAgeDistributionChart2();
});
