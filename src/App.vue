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
    let numbers = [150, 250, 160, 80, 200, 300, 120, 240, 1000, 13];

    //  select the visual environment
    const svg = d3.select('#viz');

    const scaleLenght = d3.scaleLinear()
        // setting a min and a max value
        .domain([0, d3.max(numbers)])
        // setting a min and a max value for our representation
        .range([0, 600]);

    const lAxis = d3.axisTop(scaleLenght);

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


    // ******* Create g groups ********
    svg.append('g')
        .attr('class', 'lAxis')
        .attr('transform', 'translate(20, 20)')
        .call(lAxis);


    // G is an element widely used in visual representation, each g contains one of our bars, we arent getting all the possible gs within our visualization but only those that have a specific class called "bars".
    const gs = svg.selectAll('g.bars')
        .data(numbers)
        .join('g').attr('class', 'bars');

    gs.attr('transform', (d,i) => `translate(20, ${30 + scalePos(i)})`);

    gs.append('rect')
        .attr('height', scalePos.bandwidth())
        .attr('width', scaleLenght)
        .attr('fill', '#0c8e8e');

    gs.append('text')
        .text((d) => d)
        .attr('y', scalePos.bandwidth()/2)
        .attr('x', scaleLenght);
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
