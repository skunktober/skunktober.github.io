var PopulateweatherData = {
    Init: function(contentHolder) {
        this.RetrieveServiceData(contentHolder);
    },

    BuildHtml: function(data) {
        var outputHtml = "<div>There was a problem loading the weather</div>";
        if (data) {
            var currentConditions = data.days[0];
            var weatherImage = '';
            var currentHour = new Date().getUTCHours();

            if (currentHour >= 21 || currentHour < 5) {
                weatherImage = 'images/content/weather33.png';
            } else {
                switch (currentConditions.icon.toLowerCase()) {
                    case 'clear':
                    case 'sunny':
                        weatherImage = 'images/content/weather28.png';
                        break;
                    case 'cloudy':
                    case 'partly cloudy':
                        weatherImage = 'images/content/weather44.png';
                        break;
                    case 'rain':
                    case 'rain showers':
                        weatherImage = 'images/content/weather11.png';
                        break;
                    case 'frost':
                        weatherImage = 'images/content/weather15.png';
                        break;
                    case 'thunder':
                    case 'lightning':
                        weatherImage = 'images/content/weather3.png';
                        break;
                    case 'snow':
                    case 'snowing':
                        weatherImage = 'images/content/weather46.png';
                        break;
                    default:
                        weatherImage = 'images/content/weather33.png';
                        break;
                }
            }

            var conditions = currentConditions.conditions.split(",")[0];

            outputHtml = "<div class=\"current-conditions\"><img class=\"weather-img\" src=\"" + weatherImage + "\" alt=\"Today's weather\" /><p class=\"txt\">Current Conditions<br/><span class=\"deg\">";
            outputHtml += Math.round(currentConditions.temp);
            outputHtml += "&deg;C";
            outputHtml += "</span><br/><span class=\"condition\">";
            outputHtml += conditions.charAt(0).toUpperCase() + conditions.slice(1);
            outputHtml += "</span></p></div>";

            // Forecast for the next two days
            outputHtml += "<div class=\"forecast\"><p>Forecast</p>";
            for (var i = 1; i <= 2; i++) {
                var forecastConditions = data.days[i].conditions.split(",")[0];
                outputHtml += "<div class=\"forecast-day\"><strong>" + new Date(data.days[i].datetime).toLocaleString('en-us', { weekday: 'long' }) + "</strong>";
                outputHtml += forecastConditions.charAt(0).toUpperCase() + forecastConditions.slice(1) + "<br>";
                outputHtml += "High: " + Math.round(data.days[i].tempmax) + "&deg;C<br>";
                outputHtml += "Low: " + Math.round(data.days[i].tempmin) + "&deg;C";
                outputHtml += "</div>";
            }
            outputHtml += "</div>";
        }

        return outputHtml;
    },

    RetrieveServiceData: function(contentHolder) {
        var parentObject = this;

        $.ajax({
            async: true,
            type: "GET",
            url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Newtownards%2C%20Northern%20Ireland?unitGroup=metric&key=7Q4GVKYH6REKK3EE96U5W25X7&contentType=json',
            success: function(data) {
                var htmlContent = parentObject.BuildHtml(data);
                $("#" + contentHolder).html(htmlContent);
            },
            error: function() {
                $("#" + contentHolder).html('<div>There was a problem loading the weather </div>');
            }
        });
    }
};

PopulateweatherData.Init('778617Content1137147');
