
window.onload = function() {
    // Length Conversion
    document.getElementById('MetricsLengthButton').addEventListener('click', function() {
        convertAndDisplay('Length', 'MetricsLengthValue', 'MetricsLengthFrom', 'MetricsLengthTo', 'Lengthresult');
    });

    // Temperature Conversion
    document.getElementById('MetricsTemperatureButton').addEventListener('click', function() {
        convertAndDisplay('Temperature', 'MetricsTemperatureValue', 'MetricsTemperatureFrom', 'MetricsTemperatureTo', 'Temperatureresult');
    });

    // Weight Conversion
    document.getElementById('MetricsWeightButton').addEventListener('click', function() {
        convertAndDisplay('Weight', 'MetricsWeightValue', 'MetricsWeightFrom', 'MetricsWeightTo', 'Weightresult');
    });

    // Volume Conversion
    document.getElementById('MetricsVolumeButton').addEventListener('click', function() {
        convertAndDisplay('Volume', 'MetricsVolumeValue', 'MetricsVolumeFrom', 'MetricsVolumeTo', 'Volumeresult');
    });

    function convertAndDisplay(unitType, valueId, fromUnitId, toUnitId, resultId) {
        var value = document.getElementById(valueId).value;
        var fromUnit = document.getElementById(fromUnitId).value;
        var toUnitElement = document.getElementById(toUnitId);
        var toUnit = toUnitElement.value;
        var toUnitText = toUnitElement.options[toUnitElement.selectedIndex].text;

        var result = convert(unitType, parseFloat(value), parseInt(fromUnit), parseInt(toUnit));

        if(result != null) {
            document.getElementById(resultId).innerHTML = result + " " + toUnitText;
        } else {
            document.getElementById(resultId).innerHTML = "An error occurred during conversion.";
        }
    }
};

var unitConversionData = {
    Length: { 
        1: { name: 'Metres (m)', toBase: val => val, fromBase: val => val },
        2: { name: 'Kilometres (km)', toBase: val => val * 1000, fromBase: val => val / 1000 },
        3: { name: 'Centimetres (cm)', toBase: val => val / 100, fromBase: val => val * 100 },
        4: { name: 'Milimetres (mm)', toBase: val => val / 1000, fromBase: val => val * 1000 },
        5: { name: 'Miles (mi)', toBase: val => val * 1609.34, fromBase: val => val / 1609.34 },
        6: { name: 'Yards (yrd)', toBase: val => val * 0.9144, fromBase: val => val / 0.9144 },
        7: { name: 'Feet (ft)', toBase: val => val * 0.3048, fromBase: val => val / 0.3048 },
        8: { name: 'Inches (in)', toBase: val => val * 0.0254, fromBase: val => val / 0.0254 }
    },
    Weight: {
        1: { name: 'Kilograms (kg)', toBase: val => val, fromBase: val => val },
        2: { name: 'Grams (g)', toBase: val => val / 1000, fromBase: val => val * 1000 },
        3: { name: 'Miligrams (mg)', toBase: val => val / 1e6, fromBase: val => val * 1e6 },
        4: { name: 'Pounds (lb)', toBase: val => val * 0.453592, fromBase: val => val / 0.453592 },
        5: { name: 'Ounces (oz)', toBase: val => val * 0.0283495, fromBase: val => val / 0.0283495 },
        6: { name: 'Stones (st)', toBase: val => val * 6.35029, fromBase: val => val / 6.35029 }
    },
    Temperature: {
        1: { name: 'Celsius (°C)', toBase: val => val, fromBase: val => val },
        2: { name: 'Fahrenheit (°F)', toBase: val => (val - 32) / 1.8, fromBase: val => val * 1.8 + 32 }
    },
    Volume: {
        1: { name: 'Litres (l)', toBase: val => val, fromBase: val => val },
        2: { name: 'Gallons', toBase: val => val * 3.78541, fromBase: val => val / 3.78541 }
    }
};

function convert(unitType, value, fromUnit, toUnit) {
    var unitData = unitConversionData[unitType];
    if (unitData) {
        var fromUnitData = unitData[fromUnit];
        var toUnitData = unitData[toUnit];
        if (fromUnitData && toUnitData) {
            var baseValue = fromUnitData.toBase(value);
            var convertedValue = toUnitData.fromBase(baseValue);
            return convertedValue;
        } else {
            console.error("Invalid fromUnit or toUnit for " + unitType);
        }
    } else {
        console.error("Invalid unitType: " + unitType);
    }
    return null;
}

function ClickConvert(buttonType) {
    // Make sure jQuery is available
    if (typeof $ === 'undefined') {
        console.error("jQuery is not available. Please ensure jQuery is included in your project.");
        return;
    }

    if (($('#Metrics' + buttonType + 'Value').val().length == 0) || (!$.isNumeric($('#Metrics' + buttonType + 'Value').val()))) {
        $('#Metrics' + buttonType + 'Value').focus();
        if ($('#Metrics' + buttonType + 'Value').val().length == 0) {
            $('#Metrics' + buttonType + 'Value').select();
        }
    } else {
        var value = $('#Metrics' + buttonType + 'Value').val();
        var from = $('#Metrics' + buttonType + 'From').find("option:selected").val();
        var to = $('#Metrics' + buttonType + 'To').find("option:selected").val();
        var textto = $('#Metrics' + buttonType + 'To option:selected').text();

        // Use the new convert function
        var convertedValue = convert(buttonType, parseFloat(value), parseInt(from), parseInt(to));
        if (convertedValue !== null) {
            var html = convertedValue.toString() + " " + textto;
            $("#" + buttonType + "result").html(html);
            $("#" + buttonType + "result").show();
        }
    }

    // If the masonry plugin exists then reload it.
    if (jQuery().masonry) {
        if ($('#column1').length > 0) {
            $('#column1').masonry('reload');
        }
    }
    return false;
}

// Usage example
var value = 10; // 10 km
var fromUnit = 2; // kilometres
var toUnit = 1; // metres
var result = convert('Length', value, fromUnit, toUnit);
console.log(result);  // 10000 (m)
