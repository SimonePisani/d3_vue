const d3 = require('d3');

function chart(){
    let width = 600;
    let height = 300;

    const scaleLenght = d3.scaleLinear()
        // setting a min and a max value
        // .domain([0, d3.max(numbers)])
        // setting a min and a max value for our representation
        .range([0, width]);

    const lAxis = d3.axisTop(scaleLenght);

    const scalePos = d3.scaleBand()
        //setting our ordinal values
        // .domain(d3.range(numbers.length))
        //setting a min and a max values for our visual representations
        .range([0, height])
        //delete any decimal values
        .round(true)
        //apply a padding to our visual representations
        .paddingInner(0.05)
        .paddingOuter(0.05);

    function my(selection){
        let numbers = selection.datum();

        scaleLenght.domain([0, d3.max(numbers)]);
        scalePos.domain(d3.range(numbers.length));

        // ******* Create g groups ********
        selection.selectAll('g.lAxis')
            .data([0])
            .join('g')
            .attr('class', 'lAxis')
            .attr('transform', 'translate(20, 20)')
            .call(lAxis);


        // G is an element widely used in visual representation, each g contains one of our bars, we arent getting all the possible gs within our visualization but only those that have a specific class called "bars".
        const gs = selection .selectAll('g.bars')
            .data(numbers)
            .join('g').attr('class', 'bars');

        gs.attr('transform', (d,i) => `translate(20, ${20 + scalePos(i)})`);

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
    }

    my.width = function(value){
        if(!arguments.length) return width;
        width = value;
        scaleLenght.range([0, width]);
        return my;
    }

    my.height = function (value){
        if(!arguments.length) return height;
        height = value;
        scalePos.range([0, height - 50]);
        return my;
    }

    return my;
}

 export default chart;