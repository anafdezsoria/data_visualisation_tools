google.charts.load('current', {'packages':['corechart', 'table']});
  google.charts.setOnLoadCallback(drawSeriesChart);
  
  /*var mapping = {"71":"Geospatial Data", "72":"Network Data", "70":"Numerical Data", "73":"Textual Data", "141":"Other",
				"74":"Maps", "75":"Relations/dependencies", "76":"Lines", "77":"Dots/bubbles", "78":"Bars", "79":"Grids", "80":"Shapes/proportions", "81":"Infographics", 142":"Other",
				"60":"Static", "61":"Dynamic"};*/

	var mapping = {"69": "", "70":"Numerical Data", "71":"Geospatial Data", "72":"Network Data", "73":"Textual Data", "74":"Other", "75": "",
		"76": "", "77":"Maps", "78":"Relations/dependencies", "79":"Lines", "80":"Dots/bubbles", "81":"Bars", "82":"Grids", "83":"Shapes/proportions", "84":"Infographics",  "85":"Other",
		"60":"Static", "61":"Dynamic"};
				
				
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
	
  //Transform the data received into an array
  
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
	hAxis: {
		title: 'Data type',
		minValue:69,
        maxValue:75,
        gridlines: { count:7},
	},
	vAxis : {
        title: 'Visualisation type'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n',
        minValue:76,
        maxValue:85,
        gridlines: { count:10},
    },
	/*vAxis: {title: 'Visualisation type'},*/
	bubble: {
      textStyle: {
        fontSize: 12,
        fontName: 'Georgia',
        color: 'white',
        bold: false,
        italic: false,
		auraColor: 'none'
      }},
	  width: '100%'
  };

  //var table = new google.visualization.Table(document.getElementById('tools_matrix2'));
  var chart = new google.visualization.BubbleChart(document.getElementById('tools_matrix'));
  
  google.visualization.events.addListener(chart, 'ready', axes_values);
  
  chart.draw(data, options);
  
  /*var container1 = $('[dir="ltr"]');
  var container2 = $('[aria-label="A chart."]');
  
  container1[0].setAttribute("style", "100%");
  container2[0].setAttribute("width", "100%");*/
  //table.draw(data, {});
}

function axes_values() {
	var keys = Object.keys(mapping);
	
	$.each($("text"),function(){
		if (keys.indexOf($(this).text()) >= 0 ) {
			$(this).text(mapping[$(this).text()]);
		}
	});

}

//To draw again the chart in case that the user zooms in or out the window
window.addEventListener("resize", function(){
    drawSeriesChart();
});

