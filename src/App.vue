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
          <p><u>Click to shuffle your numbers</u></p>
        </b-col>
        <b-col>
          <b-button @click="shuffleNumbers()">Shuffle</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5">
          <svg id="viz" height="600" width="900"></svg>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const d3 = require('d3');

import chart from "@/assets/js/barchartvisualization";


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
      const barChart = chart().width(800).height(600);
      d3.select('#viz').datum(listOfNumbers).call(barChart);
    },
    shuffleNumbers() {
      const N = Math.round(Math.random() * 10);
      this.numbers = d3.range(N).map(d => Math.round(d + Math.random() * 400));
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
