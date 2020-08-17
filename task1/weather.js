$(document).ready(function() {
	getWeather();
	// Session 7 Resources/classexamples/settimeout
	setTimeout(() => {
		getWeather();
	}, 5000);
});

function getWeather () {
	//Session 6 - Ajax Convenience Methods
	//Session 6 - Resources/classexamples/ajaxjquerygetjson
	$.getJSON("weather.json", function(response) {
		if (!response) {
			 return;
		}
		let sTxt = "<table> <thead> <th> ID </th> <th> City Name </th>"
			+ "<th> Current Conditions </th> <th> Temperature </th> "
			+ "<th> Wind Speed</th>  <th> Wind Direction</th> <th> Chill Factor</th> </thead><tbody>";

		//Session 6 Slide 26 - process JSON with jQuery
		$.each(response.cities, function(index) {
			let currentConditions = response.cities[index].currentConditions;
			let weatherIcon = '<img src="./weather_icons/' + currentConditions + '.png" alt="weatherIcon" width="25px"/>';

			sTxt += "<tr> <th>" + response.cities[index].cityId + "</th> <td>" + response.cities[index].cityName
				+ "</td> <td id='#condition'>" + weatherIcon + " " + currentConditions + "</td><td>"
				+ response.cities[index].temperature + " C &deg </td> <td>" + response.cities[index].windSpeed
				+ " m/sec </td> <td>" + response.cities[index].windDirection + "</td> <td>"
				+ response.cities[index].windChillFactor + "</td> </tr>";

		});

		sTxt += '</tbody></table>';
		$('#weather').html(sTxt);
	});
}
