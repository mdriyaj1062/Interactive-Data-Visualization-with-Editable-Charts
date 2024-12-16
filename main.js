function getDataFromLocalStorage() {
    const defaultLineChartData = [
        { y: 50000 ,label:"Jan"},
        { y: 60000,label:"Feb" },
        { y: 65000 ,label:"Mar"},
        { y: 70000 ,label:"Apr"},
        { y: 80000 ,label:"May"},
        { y: 85000 ,label:"Jun"}
      
       
        
    ];

    const defaultColumnChartData = [      
        { y: 300878, label: "Venezuela" },
        { y: 266455,  label: "Saudi" },
        { y: 169709,  label: "Canada" },
        { y: 158400,  label: "Iran" },
        { y: 142503,  label: "Iraq" },
        { y: 101500, label: "Kuwait" },
        { y: 97800,  label: "UAE" },
        { y: 80000,  label: "Russia" }
    ];

    const defaultPieChartData = [
        {y: 78, label: "Google"},
        {y: 9, label: "Bing"},
        {y: 10, label: "Baidu"},
        {y: 7, label: "Yahoo"},
        {y:6, label: "Other"}
        
    ];

    // Retrieve data from local storage or use default if not found:--
    const lineChartData = JSON.parse(localStorage.getItem("lineChartData")) || defaultLineChartData;
    const columnChartData = JSON.parse(localStorage.getItem("columnChartData")) || defaultColumnChartData;
    const pieChartData = JSON.parse(localStorage.getItem("pieChartData")) || defaultPieChartData;

    return { lineChartData, columnChartData, pieChartData };
}

function renderLineChart(chartData) {
    const lineChart = new CanvasJS.Chart("lineChartContainer", {
        theme: "light2",
        title: { text: "company's monthly revenue" ,fontColor: "#6A5ACD"},
        axisY: {
            title: "Revenue ($)",
             prefix: "$"
           
          },
          axisX: {
            title: "Month "
            
            // titleFontColor: "blue"
          },
        data: [{ type: "line", dataPoints: chartData.lineChartData }]
    });
    lineChart.render();
}

function renderColumnChart(chartData) {
    const columnChart = new CanvasJS.Chart("columnChartContainer", {
       theme: "light2",
        title: { text: "Top Oil Reserves" ,fontColor: "#6A5ACD"},
        axisY: {
            title: "Reserves(MMbbl)"
           
          },
          axisX: {
            title: "Countries"
            
          },
        data: [{ type: "column", 
            legendMarkerColor: "grey",showInLegend: true,legendMarkerColor: "blue",
            legendText: "MMbbl = one million barrels", dataPoints: chartData.columnChartData }]
    });
    columnChart.render();
}

function renderPieChart(chartData) {
       // Calculate the total sum of all 'y' values :-
       const total = chartData.pieChartData.reduce((sum, dataPoint) => sum + dataPoint.y, 0);

       // Calculate percentage for each data point and add it to the data object :-
       chartData.pieChartData.forEach(dataPoint => {
           dataPoint.percent = ((dataPoint.y / total) * 100).toFixed(2);  // Calculate percentage and round it to 2 decimal places.
       });
   
    const pieChart = new CanvasJS.Chart("pieChartContainer", {
       theme: "light2",
        title: { text: "Desktop Search Engine Market Share - 2016",fontColor: "#6A5ACD" },
        legend: {
			maxWidth: 350,
			itemWidth: 120
		},
        data: [{ type: "pie",showInLegend: true,legendText: "{label}",titleFontWeight: "bold",indexLabel: "{label} {percent}% ",
             dataPoints: chartData.pieChartData }]
    });
    pieChart.render();
}

function renderCharts() {
    const { lineChartData, columnChartData, pieChartData } = getDataFromLocalStorage();
    renderLineChart({ lineChartData });
    renderColumnChart({ columnChartData });
    renderPieChart({ pieChartData });
}

function setupDoubleClickRedirect() {
    document.getElementById("lineChartContainer").addEventListener("dblclick", () => {
        localStorage.setItem("chartType", "lineChartData");
        localStorage.setItem("currentChartData", JSON.stringify(getDataFromLocalStorage().lineChartData));
        window.location.href = "dataTablePage.html";
    });

    document.getElementById("columnChartContainer").addEventListener("dblclick", () => {
        localStorage.setItem("chartType", "columnChartData");
        localStorage.setItem("currentChartData", JSON.stringify(getDataFromLocalStorage().columnChartData));
        window.location.href = "dataTablePage.html";
    });

    document.getElementById("pieChartContainer").addEventListener("dblclick", () => {
        localStorage.setItem("chartType", "pieChartData");
        localStorage.setItem("currentChartData", JSON.stringify(getDataFromLocalStorage().pieChartData));
        window.location.href = "dataTablePage.html";
    });
}

window.onload = function() {
    if (!localStorage.getItem("lineChartData") ||
        !localStorage.getItem("columnChartData") ||
        !localStorage.getItem("pieChartData")) {
        const { lineChartData, columnChartData, pieChartData } = getDataFromLocalStorage();
        localStorage.setItem("lineChartData", JSON.stringify(lineChartData));
        localStorage.setItem("columnChartData", JSON.stringify(columnChartData));
        localStorage.setItem("pieChartData", JSON.stringify(pieChartData));
    }
    renderCharts();
    setupDoubleClickRedirect();
};
// reload page:-
if (performance.navigation.type === 1) {
    
    localStorage.clear();
    
    
    window.location.href = "index.html";
}
