<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <h1>D3 visualization within Vue</h1>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <p>Click to shuffle your numbers</p>
        </b-col>
        <b-col>
          <b-button @click="shuffleNumbers()">Shuffle</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5">
          <svg id="viz" height="600" width="800"></svg>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'App',
  components: {

  },
  // store is an element that generate a data section that stores all data of my component. Is a function that
  data(){
    return {
      numbers: [100, 250, 160, 80, 200]
    }
  },

  mounted() {
    this.refreshChart(this.numbers)
  },
  // i can put here functions that are named with one of the properties of our data, in this case for example numbers, and this function are passed two values, a new val and an old val. Everytime we change one of the element in our vue, vue will notify the function and change the values
  watch: {
    numbers(newVal){
      this.refreshChart(newVal);
    }
  },
  methods: {
    refreshChart(listOfNumbers){
      //  select the visual environment
      const svg = d3.select('#viz');

      const scaleLenght = d3.scaleLinear()
          // setting a min and a max value
          .domain([0, d3.max(listOfNumbers)])
          // setting a min and a max value for our representation
          .range([0, 600]);

      const lAxis = d3.axisTop(scaleLenght);

      const scalePos = d3.scaleBand()
          //setting our ordinal values
          .domain(d3.range(listOfNumbers.length))
          //setting a min and a max values for our visual representations
          .range([0, 300])
          //delete any decimal values
          .round(true)
          //apply a padding to our visual representations
          .paddingInner(0.05)
          .paddingOuter(0.05);


      // ******* Create g groups ********
      svg.selectAll('g.lAxis')
          .data([0])
          .join('g')
          .attr('class', 'lAxis')
          .attr('transform', 'translate(20, 20)')
          .call(lAxis);


      // G is an element widely used in visual representation, each g contains one of our bars, we arent getting all the possible gs within our visualization but only those that have a specific class called "bars".
      const gs = svg.selectAll('g.bars')
          .data(listOfNumbers)
          .join('g').attr('class', 'bars');

      gs.attr('transform', (d,i) => `translate(20, ${30 + scalePos(i)})`);

      gs.selectAll('rect')
          .data((d) => [d])
          .join('rect')
          .attr('height', scalePos.bandwidth())
          .attr('width', scaleLenght)
          .attr('fill', '#0c8e8e');

      gs.selectAll('text')
          .data(d => [d])
          .join('text')
          .text((d) => d)
          .attr('y', scalePos.bandwidth()/2)
          .attr('x', scaleLenght);
    },
    shuffleNumbers(){
      const N = Math.round(Math.random()*10);
      this.numbers = d3.range(N).map(d => Math.round(d+Math.random()*400));
    }
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
