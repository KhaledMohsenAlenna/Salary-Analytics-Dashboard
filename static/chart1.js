function createAgeDistributionChart() {
    fetch('/get-datchar')
        .then(response => response.json())
        .then(data => {
            updateChart3(data);
        })
        .catch(error => console.error('Error:', error));
}
function updateChart3(data_df) {
    console.log(data_df)
    am5.ready(function() {
        var root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            responsive: true
        }));

        // Create X-Axis with title
        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
        }));
        // Add X-Axis title
        xAxis.set("title", am5.Label.new(root, {
            text: "Age",
            fontSize: 18,
            fontWeight: "bold",
            dy: -20 // Adjust the position as needed
        }));

        // Create Y-Axis with title
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
        }));
        // Add Y-Axis title
        yAxis.set("title", am5.Label.new(root, {
            text: "Number of Students",
            fontSize: 18,
            fontWeight: "bold",
            rotation: -90, // Vertical text for y-axis title
            dx: -20// Adjust the position as needed
        }));

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            valueYField: "class",
            sequencedInterpolation: true
        }));

        series.columns.template.setAll({
            tooltipText: "class {valueX}: value {valueY} ",
            width: 35
        });

        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        xAxis.data.setAll(data_df);
        series.data.setAll(data_df);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    createAgeDistributionChart();
});
