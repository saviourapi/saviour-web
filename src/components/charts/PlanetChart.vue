<template>
  <div class="graph">
    <canvas :id="'planet-chart' + id"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
// import planetChartData from "./planet-data.js";

export default {
  name: "PlanetChart",
  props: {
    data: {
      type: Object,
    },
    nameX: String,
    nameY: String,
    id: Number,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      graph: null,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    this.createChart();
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    chartData: function () {
      return this.data;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    labelXData: function () {
      return this.nameX;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    labelYData: function () {
      return this.nameY;
    },
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    createChart() {
      const ctx = document.getElementById("planet-chart" + this.id);
      // console.log(this.data);
      this.graph = new Chart(ctx, {
        type: "scatter",
        data: this.chartData,
        options: {
          plugins: {
            legend: {
              title: {
                display: true,
                text: "Legend Title",
              },
            },
          },
          responsive: true,
          lineTension: 1,
          scales: {
            xAxes: [
              {
                type: "time",
                display: true,
                position: "bottom",
                id: "xAxeTime",
                scaleLabel: {
                  display: true,
                  labelString: this.labelXData,
                  fontColor: "black",
                },
                time: {
                  unit: "month",
                  // parser: "moment.ISO_8601", // -> remove this line
                  tooltipFormat: "ll",
                },
              },
            ],
            yAxes: [
              {
                type: "linear",
                display: true,
                position: "left",
                id: "yAxeTemperature",
                scaleLabel: {
                  display: true,
                  labelString: this.labelYData,
                  fontColor: "bkack",
                },
              },
            ],
          },
        },
      });
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data: function () {
      this.graph.destroy();
      //this.renderChart(this.data, this.options);
      this.createChart();
    },
  },
};
</script>
