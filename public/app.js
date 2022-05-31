console.log("hi");

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "#YY",
            alias: "Year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "MM",
            alias: "Month",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DD",
            alias: "Day",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "hh",
            alias: "Hour"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "mm",
            alias: "Minute"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "WDIR",
            alias: "Wind_Direction"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "WSPD",
            alias: "Wind_Speed"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "GST",
            alias: "Gust_Speed"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "WVHT",
            alias: "Wave_Height"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DPD",
            alias: "Dominant_Wave_Period"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "APD",
            alias: "Avg_Wave_Period"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "MWD",
            alias: "Wave_Direction"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PRES",
            alias: "Pressure"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ATMP",
            alias: "Air_Temp"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "WTMP",
            alias: "Surf_Temp"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DEWP",
            alias: "Dewpoint_Temp"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "VIS",
            alias: "Station_Visibility"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PTDY",
            alias: "Pressure_Tendency"
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TIDE",
            alias: "Water_Level"
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "nbdc_feed",
            alias: "Hourly buoy data for 45 days",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
})();



$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "NBDC Feed";
        tableau.submit();
    });
});


myConnector.getSchema = function (schemaCallback) {
    tableau.log("Hello WDC!");
};



myConnector.getData = function(table, doneCallback) {

    url = "https://www.ndbc.noaa.gov/data/realtime2/44099.txt"

// getJSON can't read a *.txt???

    $.getJSON(url, function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "mag": feat[i].properties.mag,
                "title": feat[i].properties.title,
                "location": feat[i].geometry
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};
