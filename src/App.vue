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
  mounted: function () {
    let numbers = [150, 250, 160, 80, 200, 300, 120, 240];

    //  select the visual environment
    const svg = d3.select('#viz');

    const scaleLenght = d3.scaleLinear()
        // setting a min and a max value
        .domain([0, d3.max(numbers)])
        // setting a min and a max value for our representation
        .range([0, 600]);

    const scalePos = d3.scaleBand()
        //setting our ordinal values
        .domain(d3.range(numbers.length))
        //setting a min and a max values for our visual representations
        .range([0, 300])
        //delete any decimal values
        .round(true)
        //apply a padding to our visual representations
        .paddingInner(0.05)
        .paddingOuter(0.05);


    //   ****** creating the bars ******
    //  join my data
    const rects = svg.selectAll('rect')
        .data(numbers)
        .join('rect');
    //  enter + exit + update: join()


    rects
        .attr('x', 20)
        .attr('height', scalePos.bandwidth())
        .attr('y', (d, i) => scalePos(i))
        .attr('width', scaleLenght)
        .attr('fill', '#0c8e8e');


    //  ******* create the text labels ********
    const labels = svg.selectAll('text')
        .data(numbers)
        .join('text');

    labels
    .text((d) => d)
    .attr('x', scaleLenght)
    .attr('y', (d,i) => scalePos(i))
    .attr('dy', scalePos.bandwidth() / 2)
    .attr('dx', -20);

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
