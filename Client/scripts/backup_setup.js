//-- Setup
var width = 1000;
var height = 600;
var link, node;
var nodes;

var singleLinkData = { source: [25,25], target: [75,75] } ;  


var svg = d3.select("#vis").append("svg")
  .attr("viewBox", [0,0,width, height]);

d3.json("nodes.json", function (error, _graph) {
  if (error) throw error;
  nodes = _graph.nodes;
  initializeDisplay();
  initializeSimulation();
  console.log(nodes);
});

function initializeDisplay() {
  var u = d3.select('svg')
    .selectAll('circle')
    .data(nodes)

  u.enter()
    .append('circle')
    .attr('r', 5)
    .merge(u)
    .attr('cx', 5)
    .attr('cy', 5)
    

  u.exit().remove()
}

var simulation = d3.forceSimulation(nodes);

function initializeSimulation(){
  simulation.nodes(nodes)
  initializeForces();
  simulation.on('tick', ticked);
}


function initializeForces() {
  // add forces and associate each with a name
  simulation
      //.force("link", d3.forceLink())
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide())
      .force("center", d3.forceCenter(width / 2, height / 2))
      //.force("forceX", d3.forceX())
      //.force("forceY", d3.forceY());
  // apply properties to each of the forces
  //updateForces();
}

function ticked() {
  var u = d3.select('svg')
    .selectAll('circle')
    .data(nodes)

  u.enter()
    .append('circle')
    .attr('r', 5)
    .merge(u)
    .attr('cx', function(d) {
      return d.x
    })
    .attr('cy', function(d) {
      return d.y
    })
    .style("fill", function (d){
      return d.color;
    })
    .on("click", function(d) {
      d3.select("#titel").text(d.name)

    })
  u.exit().remove()
}
