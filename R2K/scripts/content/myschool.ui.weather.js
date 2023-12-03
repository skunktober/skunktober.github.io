var PopulateweatherData = {
    Init: function(contentHolder) {
        this.RetrieveServiceData(contentHolder);
    },

    BuildHtml: function(data) {
        var outputHtml = "<div>There was a problem loading the weather</div>";
        if (data) {
            var currentConditions = data.current;
            var weatherImage;
            var currentDate = new Date();
            var timeZoneOffset = currentDate.getTimezoneOffset();

            // Adjust time to GMT
            const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
            let adjustedDate = new Date(dateString)
            const isNightTime = adjustedDate.getHours() >= 21 || adjustedDate.getHours() < 5;

            if (isNightTime) {
                weatherImage = 'images/content/weather33.png';
            } else {
                // Process weather image based on conditions
                switch (currentConditions.condition.text.toLowerCase()) {
                    case 'clear':
                    case 'sunny':
                        weatherImage = 'images/content/weather28.png';
                        break;
                    case 'cloudy':
                        weatherImage = 'images/content/weather44.png';
                        break;
                    case 'partly cloudy':
                        weatherImage = 'images/content/weather44.png';
                        break;
                    case 'rain':
                    case 'showers':
                        weatherImage = 'images/content/weather11.png';
                        break;
                    case 'heavy showers':
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
                        weatherImage = 'images/content/weather44.png';
                        break;
                }
            }

            var conditions = currentConditions.condition.text;

            outputHtml = "<div class=\"current-conditions\"><img class=\"weather-img\" src=\"" + weatherImage + "\" alt=\"Today's weather\" /><p class=\"txt\">Current Conditions<br/><span class=\"deg\">";
            outputHtml += Math.round(currentConditions.temp_c);
            outputHtml += "&deg;C";
            outputHtml += "</span><br/><span class=\"condition\">";
            outputHtml += conditions.charAt(0).toUpperCase() + conditions.slice(1);
            outputHtml += "</span></p></div>";

            outputHtml += "<div class=\"forecast\"><p>Forecast</p>";
            for (var i = 1; i < 3; i++) {
                var forecastConditions = data.forecast.forecastday[i].day.condition.text;

                // Replace "Partially cloudy" with "Cloudy" in the two-day forecast only
                if (forecastConditions.toLowerCase() === 'partially cloudy') {
                    forecastConditions = 'Cloudy';
                }

                outputHtml += "<div class=\"forecast-day\">";
                outputHtml += "<div class=\"day-name\"><strong>" + new Date(data.forecast.forecastday[i].date).toLocaleString('en-us', { weekday: 'long' }) + "</strong></div>";
                outputHtml += "<div class=\"forecast-details\">";
                outputHtml += forecastConditions.charAt(0).toUpperCase() + forecastConditions.slice(1) + "<br>";
                outputHtml += "High: " + Math.round(data.forecast.forecastday[i].day.maxtemp_c) + "&deg;C<br>";
                outputHtml += "Low: " + Math.round(data.forecast.forecastday[i].day.mintemp_c) + "&deg;C";
                outputHtml += "</div></div>";
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
            url: 'https://api.weatherapi.com/v1/forecast.json?key=a948d2f7e8d44b538c5123014231806&q=Newtownards,Northern%20Ireland&days=4&aqi=no&alerts=no',
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