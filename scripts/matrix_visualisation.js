google.charts.load('current', {'packages':['corechart', 'table']});
google.charts.setOnLoadCallback(drawSeriesChart);

var mapping = {"69": "", "70":"Numerical Data", "71":"Geospatial Data", "72":"Network Data", "73":"Textual Data", "74":"Other", "75": "",
		"76": "", "77":"Maps", "78":"Relations/ dependencies", "79":"Lines", "80":"Dots/ bubbles", "81":"Bars", "82":"Grids", "83":"Shapes/ proportions", "84":"Infographics",  "85":"Other" };
		
var mapping_inverse = {"70":"70", "71":"71", "72":"72", "73":"73", "74":"141",
		"77":"74", "78":"75", "79":"76", "80":"77", "81":"78", "82":"79", "83":"80", "84":"81",  "85":"142",
		"Static":"60", "Dynamic":"61"};

function drawSeriesChart() {
	var test = "";
	
	$.ajax({
		type: "GET",
		url: "./scripts/query_database.php",
		data: {  },
		async: false,
		success: function (response) {
			test = response;
		},
	});
	
  //Transform the data received into an array [Static/Dynamic, data_type, viz_type, interactivity_type, num_tools]
  
  var test_clean = test.split(",");
  var aux_final = [];
  var aux_interm = [];
  var i=0, j=0, num=0, counter = 0;
  
  for (i=0; counter<test_clean.length; i++) {
	  aux_interm = [];
	  for (j=0; j<5; j++) {
		  if (i!=0) {
			  if (j!=0 && j!=3) {
				  num = parseInt(test_clean[counter]);
				  if (j == 2) num = num + 3; //For the mapping
				  if (j==1 && num==141) num = 74; //For the mapping with data type
				  if (j==2 && num==145) num = 85; //For the mapping with visualisation type
				  aux_interm.push(num);
			  }
			  else {
				aux_interm.push(test_clean[counter]);
			  }
		  }
		  else 
			aux_interm.push(test_clean[counter]);
		counter ++;
	  }
	  aux_final.push(aux_interm);
	  
  }
  
  var data = google.visualization.arrayToDataTable(aux_final);
  
  
  var options = {
	title: 'Correlation between data type, visualisation type and interaction type of the existing tools',
	hAxis: { //Data type
		title: 'Data type',
		minValue:69,
        maxValue:75,
        gridlines: { count:7, color: '#ffffff'},
		ticks: [{v:69, f:''}, {v:70, f:'Numerical Data'}, {v:71, f:'Geospatial Data'}, {v:72, f:'Network Data'}, {v:73, f:'Textual Data'}, {v:74, f:'Other'}, {v:75, f:''} ],
		textStyle: { 
			fontName: 'Arial',
			fontSize: 12,
			color: '#444444'
		}
	},
	vAxis : { //Visualisation type
        title: 'Visualisation type',
        minValue:76,
        maxValue:86,
        gridlines: { count:11, color: '#ffffff'},
		ticks: [ {v:76, f:''}, {v:77, f:'Maps'}, {v:78, f:'Relations/ dependencies'}, {v:79, f:'Lines'}, {v:80, f:'Dots/ bubbles'}, {v:81, f:'Bars'}, {v:82, f:'Grids'}, {v:83, f:'Shapes/ proportions'}, {v:84, f:'Infographics'}, {v:85, f:'Other'}, {v:86, f:''} ],
		textStyle: { 
			fontName: 'Arial',
			fontSize: 12,
			color: '#444444'
		}
    },
	bubble: {
      textStyle: {
        color: 'none',
      }},
	colors: ['f59832', 'c53864'],
	width: '100%',
	tooltip: {
        trigger: 'none'
    },
	legend: {
		textStyle: {
        fontSize: 12,
        fontName: 'Arial',
		color: '#444444'
    }}
	/* ,
	width: '100%',
	tooltip: {
        trigger: 'none'
    } */
  };
   
  //When the mouse is over the bubble, show on the custom_tooltip the values of the data type, visualisation type and interaction type
  function handler1(e) {
	var h = data.getValue(e.row, 1);
	var v = data.getValue(e.row, 2);
	var interaction = data.getValue(e.row, 3);
	var ntools = data.getValue(e.row, 4);
	
	$('#custom_tooltip').html('<div><b>Data type: </b>' + mapping[h] + '</div><div><b>Visualisation type: </b>' + mapping[v] + '</div><div><b>Interaction type: </b>' + interaction + '</div><div><b>Number of tools: </b>' + ntools + '</div>').fadeIn('slow');
  }
  
  //When the mouse is out the bubble, remove the information on the custom_tooltip
  function handler2(e) {
	$('#custom_tooltip').fadeOut('fast');
  }
  
  //When the user clicks the bubble, redirect to the page that shows the tools that fulfil the criteria
  function redirect() {
	  var e = chart.getSelection()[0];
	  
	  var h = data.getValue(e.row, 1);
	  var v = data.getValue(e.row, 2);
	  var i = data.getValue(e.row, 3);
	  var data_type = mapping_inverse[h];
	  var viz_type = mapping_inverse[v];
	  var inter_type = mapping_inverse[i];
	  window.location.href = "http://52.50.205.146:8890/data_visualisation_catalogue/tools_page/"+data_type+"/"+viz_type+"/"+inter_type;
  }

  //var table = new google.visualization.Table(document.getElementById('tools_matrix2'));
  var chart = new google.visualization.BubbleChart(document.getElementById('tools_matrix'));
  google.visualization.events.addListener(chart, 'onmouseover', handler1);
  google.visualization.events.addListener(chart, 'onmouseout', handler2);
  google.visualization.events.addListener(chart, 'select', redirect);
  chart.draw(data, options);
}

//To draw again the chart in case that the user zooms in or out the window
window.addEventListener("resize", function(){
    drawSeriesChart();
});

