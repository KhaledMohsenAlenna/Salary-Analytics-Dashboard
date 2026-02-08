function createAgeDistributionChart3() {
    fetch('/get-datchar3')
        .then(response => response.json())
        .then(data3 => {
            updateChart24(data3);
        })
        .catch(error => console.error('Error:', error));
}
function updateChart24(data_df3) {
    console.log(data_df3)

    // am5.ready(function() {
    //     var root = am5.Root.new("chart3");

    //     root.setThemes([am5themes_Animated.new(root)]);
    //     var chart = root.container.children.push(am5xy.XYChart.new(root, {
    //         responsive: true
    //     }));

    //     // Create X-Axis with title
    //     var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    //         renderer: am5xy.AxisRendererX.new(root, {}),
    //     }));
    //     // Add X-Axis title
    //     xAxis.set("title", am5.Label.new(root, {
    //         fontSize: 18,
    //         fontWeight: "bold",
    //         dy: -20 // Adjust the position as needed
    //     }));

    //     // Create Y-Axis with title
    //     var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //         renderer: am5xy.AxisRendererY.new(root, {}),
    //     }));
    //     // Add Y-Axis title
    //     yAxis.set("title", am5.Label.new(root, {
    //         fontSize: 18,
    //         fontWeight: "bold",
    //         rotation: -90, // Vertical text for y-axis title
    //         dx: -20// Adjust the position as needed
    //     }));

    //     var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
    //         xAxis: xAxis,
    //         yAxis: yAxis,
    //         valueXField: "value2",
    //         valueYField: "class2",
    //         sequencedInterpolation: true
    //     }));

    //     series2.columns.template.setAll({
    //         tooltipText: "class2 {valueX}: value2 {valueY} ",
    //         width: 35
    //     });

    //     series2.columns.template.adapters.add("fill", function (fill, target) {
    //         return chart.get("colors").getIndex(series2.columns.indexOf(target));
    //     });

    //     series2.columns.template.adapters.add("stroke", function (stroke, target) {
    //         return chart.get("colors").getIndex(series2.columns.indexOf(target));
    //     });

    //     xAxis.data.setAll(data_df3);
    //     series2.data.setAll(data_df3);
    // });
   
    am5.ready(function() {


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chart3");
        
        
        var myTheme = am5.Theme.new(root);
        
        myTheme.rule("Grid", ["base"]).setAll({
          strokeOpacity: 0.1
        });
        
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
        
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0
          })
        );
        
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var yRenderer = am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true
        });
        yRenderer.grid.template.set("location", 1);
        
        var yAxis = chart.yAxes.push(
          am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "class",
            renderer: yRenderer
          })
        );
        
        var xAxis = chart.xAxes.push(
          am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            renderer: am5xy.AxisRendererX.new(root, {
              visible: true,
              strokeOpacity: 0.1,
              minGridDistance: 80
            })
          })
        );
        
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series3 = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            sequencedInterpolation: true,
            categoryYField: "class"
          })
        );
        
        var columnTemplate = series3.columns.template;
        
        columnTemplate.setAll({
          draggable: true,
          cursorOverStyle: "pointer",
          tooltipText: "drag to rearrange",
          cornerRadiusBR: 10,
          cornerRadiusTR: 10,
          strokeOpacity: 0
        });
        columnTemplate.adapters.add("fill", (fill, target) => {
          return chart.get("colors").getIndex(series3.columns.indexOf(target));
        });
        
        columnTemplate.adapters.add("stroke", (stroke, target) => {
          return chart.get("colors").getIndex(series3.columns.indexOf(target));
        });
        
        columnTemplate.events.on("dragstop", () => {
          sortCategoryAxis();
        });
        
        // Get series item by category
        function getSeriesItem(category) {
          for (var i = 0; i < series3.dataItems.length; i++) {
            var dataItem = series3.dataItems[i];
            if (dataItem.get("categoryY") == category) {
              return dataItem;
            }
          }
        }
        
        
        // Axis sorting
        function sortCategoryAxis() {
          // Sort by value
          series3.dataItems.sort(function (x, y) {
            return y.get("graphics").y() - x.get("graphics").y();
          });
        
          var easing = am5.ease.out(am5.ease.cubic);
        
          // Go through each axis item
          am5.array.each(yAxis.dataItems, function (dataItem) {
            // get corresponding series item
            var seriesDataItem = getSeriesItem(dataItem.get("category"));
        
            if (seriesDataItem) {
              // get index of series data item
              var index = series.dataItems.indexOf(seriesDataItem);
        
              var column = seriesDataItem.get("graphics");
        
              // position after sorting
              var fy =
                yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
                column.height() / 2;
        
              // set index to be the same as series data item index
              if (index != dataItem.get("index")) {
                dataItem.set("index", index);
        
                // current position
                var x = column.x();
                var y = column.y();
        
                column.set("dy", -(fy - y));
                column.set("dx", x);
        
                column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
                column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
              } else {
                column.animate({ key: "y", to: fy, duration: 600, easing: easing });
                column.animate({ key: "x", to: 0, duration: 600, easing: easing });
              }
            }
          });
        
          // Sort axis items by index.
          // This changes the order instantly, but as dx and dy is set and animated,
          // they keep in the same places and then animate to true positions.
          yAxis.dataItems.sort(function (x, y) {
            return x.get("index") - y.get("index");
          });
        }
        
        // Set data
        series3.data.setAll(data_df3);
        
        yAxis.data.setAll(data_df3);
        series3.data.setAll(data_df3);
        
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series3.appear(1000);
        chart.appear(1000, 100);
        
        });
}


document.addEventListener('DOMContentLoaded', function() {
    createAgeDistributionChart3();
});
