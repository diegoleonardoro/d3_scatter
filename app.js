// @TODO: YOUR CODE HERE!

// Define the svg area dimensions:
var margin = { top: 10, right: 20, bottom: 30, left: 120 },
    width = 500 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;



// Select the tag where the chart will be and set the dimensions and append svg to it:

const scatter = d3.select("#scatter")

const svg = scatter.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



//The following creates the text that will go in the x axis:

svg.append("g").attr("class", "textXaxis");
const textXaxis = d3.select(".textXaxis")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//poverty text:
textXaxis.append("text")
    .attr("y", 410) //this will place the text below the x-axis 
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .text("Poverty %")

//age text:
textXaxis.append("text")
    .attr("y", 430)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .text("Age Median")

// Income text:
textXaxis.append("text")
    .attr("y", 450)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .text("Household Income (Median)")



//The following creates the text that will go in the y axis:
svg.append("g").attr("class", "textYaxis");
const textYaxis = d3.select(".textYaxis")
    .attr("transform", `translate(${30}, ${20}) `)


// Obesity text:
textYaxis.append("text")
    .attr("y", 210)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .text("Obesity %")

// Smoke text:
textYaxis.append("text")
    .attr("y", 230)
    .attr("data-name", "smoke")
    .attr("data-axis", "y")
    .text("Smoke %")

// Smoke text:
textYaxis.append("text")
    .attr("y", 250)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .text("Lacks healthcare %")




// load the data it:
d3.csv("assets/data/data.csv").then(function (HealthData) {

    // Create a scale for the x coordinates:

    // Poverty scale:
    var povertyXscale = d3.scaleLinear()
        .domain([0, 23])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(povertyXscale));
    // Age scale:
    var ageXscale = d3.scaleLinear()
        .domain([30, 44])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(ageXscale));

    // Household income scale:

    var houseHoldIncomeXscale = d3.scaleLinear()
        .domain([39680, 73971])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(houseHoldIncomeXscale));


    // Create a scale for the Y coordinates:

    // Healthcare y scale 
    var healthcareYscale = d3.scaleLinear()
        .domain([4, 26])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(healthcareYscale));

    // Smoke y scale
    var smokeYscale = d3.scaleLinear()
        .domain([9, 27])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(smokeYscale));

    // Obesity y scale
    var obesityYscale = d3.scaleLinear()
        .domain([20, 36])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(obesityYscale));

    // add the data points that will be in the scatter plot:
    svg.append('g')
        .selectAll("dot")
        .data(HealthData)
        .enter()
        .append("circle")

        .attr("cx", function (d) { return povertyXscale(d.poverty); })
        .attr("cy", function (d) { return healthcareYscale(d.healthcare); })

        .attr("cx", function (d) { return ageXscale(d.age); })
        .attr("cy", function (d) { return obesityYscale(d.obesity); })

        .attr("cx", function (d) { return houseHoldIncomeXscale(d.income); })
        .attr("cy", function (d) { return smokeYscale(d.smokes); })


});

//cx is the x-axis coordinate of the center of the circle.
//cy is the y-axis coordinate of the center of the circle.
//r is the radius of the circle.



//.domain(d3.extent(HealthData, d => d.poverty))