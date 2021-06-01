<template>
  <div id="app">
    <h1>D3 visualization within Vue</h1>
    <svg id="viz" height="600" width="800"></svg>
  </div>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'App',
  components: {

  },
  mounted() {
    let numbers=[150,250,160,80,200];

    //  select the visual environment
    const svg = d3.select('#viz');
    //  join my data
    const rects = svg.selectAll('rect')
        .data(numbers)
        .join('rect');
    //  enter + exit + update: join()
    const scaleLenght = d3.scaleLinear()
        // setting a min and a max value
        .domain([0, d3.max(numbers)])
        // setting a min and a max value for our rappresentation
        .range([0, 400]);

    const scalePosition = function (d, i){
      return 20 * i + 20;
    }

    rects
        .attr('x', 20)
        .attr('height', 19)
        .attr('y', scalePosition)
        .attr('width', scaleLenght)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
