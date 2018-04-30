///global container
window.movies = {
    params: {},
    data: {},
    raleigh_number:[],
    durham_number:[],
    ch_number:[],

    name:[],
    name2:[],
    name3:[],
};



function fetchData2() {
  $.getJSON('https://raw.githubusercontent.com/echo-zhou/final/master/data_all.json', function(data) {
      window.movies.data = data;

      var movie_number_ch = []
      for (i = 0; i < window.movies.data[0]["theaters"].length; i++){
        try {
        var ch_movie_count = window.movies.data[0]["theaters"][i]["movies"].length;
        movie_number_ch.push(ch_movie_count)
        }
        catch(err) {
              console.log("error");
          }
      }

      theSum = movie_number_ch.reduce(function(a, b) { return a + b; }, 0);

      window.movies.ch_number = theSum;



      var movie_number_durham = []
      for (i = 0; i < window.movies.data[1]["theaters"].length; i++){
        try {
        var dur_movie_count = window.movies.data[1]["theaters"][i]["movies"].length;
        movie_number_durham.push(dur_movie_count)
        }
        catch(err) {
              console.log("error");
          }
      }
      theSum = movie_number_durham.reduce(function(a, b) { return a + b; }, 0);
      window.movies.durham_number = theSum;



      var movie_number_Ra = []
      for (i = 0; i < window.movies.data[2]["theaters"].length; i++){
        try {
        var Ra_count = window.movies.data[2]["theaters"][i]["movies"].length;
        movie_number_Ra.push(Ra_count)
        }
        catch(err) {
            console.log("error");
          }
      }
      theSum = movie_number_Ra.reduce(function(a, b) { return a + b; }, 0);
      window.movies.raleigh_number = theSum;


      var theater_number = []
      var Length = window.movies.data[0]["theaters"].length
      for (i = 0; i < Length-1; i++) {
        try {
        var tempMovieCount = window.movies.data[0]["theaters"][i]["name"];
        theater_number.push(tempMovieCount)
        console.log(tempMovieCount);
        }
        catch(err) {
              console.log("error");
          }
      }

      var theater_number2 = []
      for (i = 0; i < window.movies.data[1]["theaters"].length; i++) {
        try {
        var tempMovieCount = window.movies.data[1]["theaters"][i]["name"];
        theater_number2.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }

      var theater_number3 = []
      for (i = 0; i < window.movies.data[2]["theaters"].length; i++) {
        try {
        var tempMovieCount = window.movies.data[2]["theaters"][i]["name"];
        theater_number3.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }

        window.movies.name = theater_number;
        window.movies.name2 = theater_number2;
        window.movies.name3 = theater_number3;

      fillBar();
      fillPie();

  });
}



function fillBar(){

  var data = [ window.movies.ch_number, window.movies.durham_number, window.movies.raleigh_number];

  var array = ['Chapel Hill', 'Durham', 'Raleigh']

  var svgContainer = d3.select("#barchart");
  //append svg
  // var svg = svgContainer.append("svg");


  var margin = {top: 0, right: 5, bottom: 50, left: 50};
  var fullWidth = 900;
  var fullHeight = 350;
  var width = fullWidth - margin.right - margin.left;
  var height = fullHeight - margin.top - margin.bottom;


  var svg = d3.select("#barchart").append("svg")
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .classed('bar-svg', true)
  // draw barchart
  .append('g')
    // translate it to leave room for the left and top margins
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  var chart = svg.append("g");

  var boundingRect = svgContainer.node().getBoundingClientRect();
  var width = boundingRect.width;
  var height = boundingRect.height;
  var x = d3.scaleLinear()
              .domain([0,90])
              .range([0,290]);

  var y = d3.scaleLinear()
              .domain([0,180])
              .range([0,width]);

  var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

  var xAxis = d3.axisLeft(y)
  var yAxis = d3.axisBottom(x);

// draw bar rectangles
  svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
                  .attr("height",60 )
                  .attr("width",function(d,i){ return d*6;})
                  .attr("fill","#fd9735")
                  .attr("y",function(d,i){ return 70+90*i; })
                  .attr("x",190 );

 // text of the category name
      var textArray = array;
      svg.append("text").selectAll("tspan")
          .data(textArray)
          .enter().append("tspan")
            .attr("y",function(d,i){ return 100+90*i; })
            .attr("x",0)
            .attr("fill","#38618f")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","32")
            .text(function(d){ return d; })

// text of the data
        var textArray2 = data;
        svg.append("text").selectAll("tspan")
            .data(textArray2)
            .enter().append("tspan")
              .attr("y",function(d,i){ return 100+90*i; })
              .attr("x",550)
              .attr("fill","white")
              .attr("dominant-baseline","middle")
              .attr("text-anchor","start")
              .attr("font-size","18")
              .text(function(d){ return d; })


              }




/////// code for piechart

    function fillPie(){
      //codes from http://zeroviscosity.com/d3-js-step-by-step/step-1-a-basic-pie-chart
      //codes from Juan Cruz-Benito (juancb)’s Block 1984c7f2b446fffeedde

      var totalCount = 18;

      var data = [
    { label: 'Chapel Hill', count: window.movies.name.length, percentage:((window.movies.name.length/totalCount)*100).toPrecision(3)  },
    { label: 'Durham', count: window.movies.name2.length, percentage:((window.movies.name2.length/totalCount)*100).toPrecision(3) },
    { label: 'Raleigh', count: window.movies.name3.length, percentage:((window.movies.name3.length/totalCount)*100).toPrecision(3) },
  ];
  console.log(data);

///// determine the size and color of the piechart
  var width = 450;
  var height = 450;
  var radius = Math.min(width, height) / 3;
  var donutWidth = 75;                            // NEW

  var color = d3.scaleOrdinal(["#38618f", "#fd9735", "#ff6745"]);

  var svg = d3.select('#movie-pie')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +
    ',' + (height / 2) + ')');

  var arc = d3.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

  var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);


  var path = svg.selectAll('path')
  .data(pie(data))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) {
    return color(d.data.label);
  });

  var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g");

  g.append("text")
        .attr("transform", function(d) {
           var _d = arc.centroid(d);
           _d[0] *= 1;
           _d[1] *= 1;
           return "translate(" + _d + ")";
         })
        .attr("dy", ".50em")
        .attr('fill','white')
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.percentage + '%';
        });

      g.append("text")
      .attr("text-anchor", "middle")
     .attr('font-size', '2em')
     .attr('fill','#8c857d')
     .attr('y', 20)

                  }

                  fetchData2()
