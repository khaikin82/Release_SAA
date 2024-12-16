const exchangeRateStatusCounts = { up: 0, down: 0, partial: 0 };
const goldStatusCounts = { up: 0, down: 0, partial: 0 };

const exchangeRateStatusCountsSave =
  JSON.parse(localStorage.getItem("exchangeRateStatusCounts")) || {};
if (exchangeRateStatusCountsSave.up)
  exchangeRateStatusCounts.up = exchangeRateStatusCountsSave.up;
if (exchangeRateStatusCountsSave.down)
  exchangeRateStatusCounts.down = exchangeRateStatusCountsSave.down;
if (exchangeRateStatusCountsSave.partial)
  exchangeRateStatusCounts.partial = exchangeRateStatusCountsSave.partial;

const goldStatusCountsSave =
  JSON.parse(localStorage.getItem("goldStatusCounts")) || {};
if (goldStatusCountsSave.up) goldStatusCounts.up = goldStatusCountsSave.up;
if (goldStatusCountsSave.down)
  goldStatusCounts.down = goldStatusCountsSave.down;
if (goldStatusCountsSave.partial)
  goldStatusCounts.partial = goldStatusCountsSave.partial;

const trafficChartContext = document
  .getElementById("trafficChart")
  .getContext("2d");

const trafficChart = new Chart(trafficChartContext, {
  type: "line",
  data: {
    labels: [], // Thời gian
    datasets: [
      {
        label: "Traffic",
        data: [], // Số lượng yêu cầu
        borderColor: "rgb(77, 97, 97)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Request Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  },
});

const trafficChartContextGold = document
  .getElementById("trafficChartGold")
  .getContext("2d");

const trafficChartGold = new Chart(trafficChartContextGold, {
  type: "line",
  data: {
    labels: [], // Thời gian
    datasets: [
      {
        label: "Traffic",
        data: [], // Số lượng yêu cầu
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Request Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  },
});

function loadTrafficData() {
  const trafficData = JSON.parse(localStorage.getItem("trafficData")) || {
    labels: [],
    data: [],
  };

  trafficChart.data.labels = trafficData.labels;
  trafficChart.data.datasets[0].data = trafficData.data;
  trafficChart.update();
}

// Gọi hàm này khi bạn muốn tải dữ liệu từ localStorage, ví dụ: khi khởi tạo biểu đồ
loadTrafficData();

// let prevReqCountExchangeRateApi = 0
// Hàm để cập nhật dữ liệu biểu đồ

function updateTrafficChart(time, req) {
  // Lấy mảng lưu trữ từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
  const trafficData = JSON.parse(localStorage.getItem("trafficData")) || {
    labels: [],
    data: [],
  };

  // Thêm time và req vào mảng
  trafficData.labels.push(time);
  trafficData.data.push(req);

  // Lưu mảng cập nhật vào localStorage
  localStorage.setItem("trafficData", JSON.stringify(trafficData));

  // Cập nhật biểu đồ
  trafficChart.data.labels.push(time);
  trafficChart.data.datasets[0].data.push(req);
  trafficChart.update();
}

function loadTrafficDataGold() {
  const trafficDataGold = JSON.parse(
    localStorage.getItem("trafficDataGold")
  ) || { labels: [], data: [] };

  trafficChartGold.data.labels = trafficDataGold.labels;
  trafficChartGold.data.datasets[0].data = trafficDataGold.data;
  trafficChartGold.update();
}

// Gọi hàm này khi bạn muốn tải dữ liệu từ localStorage, ví dụ: khi khởi tạo biểu đồ
loadTrafficDataGold();

// let prevReqCountGoldApi = 0
function updateTrafficChartGold(time, req) {
  // Lấy mảng lưu trữ từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
  const trafficDataGold = JSON.parse(
    localStorage.getItem("trafficDataGold")
  ) || { labels: [], data: [] };

  // Thêm time và req vào mảng
  trafficDataGold.labels.push(time);
  trafficDataGold.data.push(req);

  // Lưu mảng cập nhật vào localStorage
  localStorage.setItem("trafficDataGold", JSON.stringify(trafficDataGold));

  // Cập nhật biểu đồ
  trafficChartGold.data.labels.push(time);
  trafficChartGold.data.datasets[0].data.push(req);
  trafficChartGold.update();
}

// Tạo biểu đồ cho Exchange Rate API
const exchangeRatePieCtx = document
  .getElementById("exchangeRatePieChart")
  .getContext("2d");
const exchangeRatePieChart = new Chart(exchangeRatePieCtx, {
  type: "doughnut",
  data: {
    labels: ["Up", "Down", "Partially Up"],
    datasets: [
      {
        data: [
          exchangeRateStatusCounts.up,
          exchangeRateStatusCounts.down,
          exchangeRateStatusCounts.partial,
        ],
        backgroundColor: ["#4caf50", "#f44336", "#ffeb3b"],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Exchange Rate API Status",
        position: "bottom",
        padding: 20,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        position: "right",
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, index) => {
                const value = data.datasets[0].data[index];
                return {
                  text: `${label}: ${value}`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                  strokeStyle: data.datasets[0].backgroundColor[index],
                  lineWidth: 0,
                  hidden: false,
                  index: index,
                };
              });
            }
            return [];
          },
        },
      },
    },
  },
});

// Tạo biểu đồ cho Gold API
const goldPieCtx = document.getElementById("goldPieChart").getContext("2d");
const goldPieChart = new Chart(goldPieCtx, {
  type: "doughnut",
  data: {
    labels: ["Up", "Down", "Partially Up"],
    datasets: [
      {
        data: [
          goldStatusCounts.up,
          goldStatusCounts.down,
          goldStatusCounts.partial,
        ],
        backgroundColor: ["#4caf50", "#f44336", "#ffeb3b"],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Gold Price API Status",
        position: "bottom",
        padding: 20,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        position: "right",
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, index) => {
                const value = data.datasets[0].data[index];
                return {
                  text: `${label}: ${value}`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                  strokeStyle: data.datasets[0].backgroundColor[index],
                  lineWidth: 0,
                  hidden: false,
                  index: index,
                };
              });
            }
            return [];
          },
        },
      },
    },
  },
});
// Mảng để lưu trữ thời gian phản hồi cho mỗi container
// const responseTimeDataContainer1 = [];
// const responseTimeDataContainer2 = [];
// const responseTimeLabelsContainer1 = [];
// const responseTimeLabelsContainer2 = [];
// const responseTimeColorsContainer1 = [];
// const responseTimeColorsContainer2 = [];
// const responseTimeBgColorsContainer1 = [];
// const responseTimeBgColorsContainer2 = [];

// Lấy object từ localStorage
const savedResponseContainers =
  JSON.parse(localStorage.getItem("responseContainers")) || {};

// Truy cập lại các biến từ object đã lưu
const responseTimeDataContainer1 =
  savedResponseContainers.responseTimeDataContainer1 || [];
const responseTimeDataContainer2 =
  savedResponseContainers.responseTimeDataContainer2 || [];
const responseTimeLabelsContainer1 =
  savedResponseContainers.responseTimeLabelsContainer1 || [];
const responseTimeLabelsContainer2 =
  savedResponseContainers.responseTimeLabelsContainer2 || [];
const responseTimeColorsContainer1 =
  savedResponseContainers.responseTimeColorsContainer1 || [];
const responseTimeColorsContainer2 =
  savedResponseContainers.responseTimeColorsContainer2 || [];
const responseTimeBgColorsContainer1 =
  savedResponseContainers.responseTimeBgColorsContainer1 || [];
const responseTimeBgColorsContainer2 =
  savedResponseContainers.responseTimeBgColorsContainer2 || [];

function getColorForStatus(status, isBackground = false) {
  if (status === "DOWN") {
    return isBackground ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 0, 0, 1)";
  } else if (status === "UP") {
    return isBackground ? "rgba(0, 255, 0, 0.2)" : "rgba(0, 255, 0, 1)";
  } else {
    return isBackground ? "rgba(255, 255, 0, 0.2)" : "rgba(255, 255, 0, 1)";
  }
}
// Tạo biểu đồ cho Container 1 (Exchange Rate API)
const responseTimeChartContext1 = document
  .getElementById("trafficChart1")
  .getContext("2d");

const responseTimeChart1 = new Chart(responseTimeChartContext1, {
  type: "line",
  data: {
    labels: responseTimeLabelsContainer1,
    datasets: [
      {
        label: "Exchange Rate API Response Time (ms)",
        data: responseTimeDataContainer1,
        borderColor: function (context) {
          const index = context.dataIndex;
          return responseTimeColorsContainer1[index];
        },
        backgroundColor: function (context) {
          const index = context.dataIndex;
          return responseTimeBgColorsContainer1[index];
        },
        fill: true,
        segment: {
          borderColor: function (context) {
            const index = context.p0DataIndex;
            return responseTimeColorsContainer1[index];
          },
          backgroundColor: function (context) {
            const index = context.p0DataIndex;
            return responseTimeBgColorsContainer1[index];
          },
        },
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Response Time (ms)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  },
});

// Tạo biểu đồ cho Container 2 (Gold Price API)
const responseTimeChartContext2 = document
  .getElementById("trafficChart2")
  .getContext("2d");

const responseTimeChart2 = new Chart(responseTimeChartContext2, {
  type: "line",
  data: {
    labels: responseTimeLabelsContainer2,
    datasets: [
      {
        label: "Gold Price API Response Time (ms)",
        data: responseTimeDataContainer2,
        borderColor: function (context) {
          const index = context.dataIndex;
          return responseTimeColorsContainer2[index];
        },
        backgroundColor: function (context) {
          const index = context.dataIndex;
          return responseTimeBgColorsContainer2[index];
        },
        fill: true,
        segment: {
          borderColor: function (context) {
            const index = context.p0DataIndex;
            return responseTimeColorsContainer2[index];
          },
          backgroundColor: function (context) {
            const index = context.p0DataIndex;
            return responseTimeBgColorsContainer2[index];
          },
        },
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Response Time (ms)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  },
});

function updateChartData(container, time, responseTime, status) {
  if (container === 1) {
    responseTimeLabelsContainer1.push(time);
    responseTimeDataContainer1.push(responseTime);
    responseTimeColorsContainer1.push(getColorForStatus(status));
    responseTimeBgColorsContainer1.push(getColorForStatus(status, true));
    responseTimeChart1.update();
  } else if (container === 2) {
    responseTimeLabelsContainer2.push(time);
    responseTimeDataContainer2.push(responseTime);
    responseTimeColorsContainer2.push(getColorForStatus(status));
    responseTimeBgColorsContainer2.push(getColorForStatus(status, true));
    responseTimeChart2.update();
  }
}

const exchangeRateChartContainer = document.getElementById(
  "exchangeRateChartContainer"
);
const goldChartContainer = document.getElementById("goldChartContainer");

// Hàm để mở popup
function showPopup() {
  var popup = document.getElementById("myPopup");
  document.getElementById("overlay").style.display = "block";
  document.body.classList.add("no-scroll");
  popup.style.display = "block";
}

// Hàm để đóng popup
function closePopup() {
  var popup = document.getElementById("myPopup");
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
  popup.style.display = "none";
}

function showPopup2() {
  var popup = document.getElementById("myPopup2");
  document.getElementById("overlay").style.display = "block";
  document.body.classList.add("no-scroll");
  popup.style.display = "block";
}

// Hàm để đóng popup
function closePopup2() {
  var popup = document.getElementById("myPopup2");
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
  popup.style.display = "none";
}

exchangeRateChartContainer.addEventListener("click", showPopup);
goldChartContainer.addEventListener("click", showPopup2);

const cpuCtx = document.getElementById("cpuChart").getContext("2d");
const memoryCtx = document.getElementById("memoryChart").getContext("2d");
const networkCtx = document.getElementById("networkChart").getContext("2d");

// Lấy các biến từ localStorage
const cpuUsageData = JSON.parse(localStorage.getItem("cpuUsageData")) || [];
const memoryUsageData =
  JSON.parse(localStorage.getItem("memoryUsageData")) || [];
const networkReceivedData =
  JSON.parse(localStorage.getItem("networkReceivedData")) || [];
const networkTransmittedData =
  JSON.parse(localStorage.getItem("networkTransmittedData")) || [];
const labels = JSON.parse(localStorage.getItem("labels")) || [];

// const cpuUsageData = [];
// const memoryUsageData = [];
// const networkReceivedData = [];
// const networkTransmittedData = [];
// const labels = [];

const cpuCtx2 = document.getElementById("cpuChart2").getContext("2d");
const memoryCtx2 = document.getElementById("memoryChart2").getContext("2d");
const networkCtx2 = document.getElementById("networkChart2").getContext("2d");

// Lấy các biến từ localStorage
const cpuUsageData2 = JSON.parse(localStorage.getItem("cpuUsageData2")) || [];
const memoryUsageData2 =
  JSON.parse(localStorage.getItem("memoryUsageData2")) || [];
const networkReceivedData2 =
  JSON.parse(localStorage.getItem("networkReceivedData2")) || [];
const networkTransmittedData2 =
  JSON.parse(localStorage.getItem("networkTransmittedData2")) || [];
const labels2 = JSON.parse(localStorage.getItem("labels2")) || [];

// const cpuUsageData2 = [];
// const memoryUsageData2 = [];
// const networkReceivedData2 = [];
// const networkTransmittedData2 = [];
// const labels2 = [];

const commonConfig = (labels, data, label, borderColor, maxValue) => ({
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        time: {
          unit: "second",
        },
      },
      y: {
        beginAtZero: true,
        max: Math.max(maxValue, data),
      },
    },
  },
});
const networkConfig = (labels, data1, data2, label, borderColor, maxValue) => ({
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data1,
        borderColor: borderColor,
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Network Transmitted (MB)",
        data: data2,
        borderColor: "rgb(178,34,34)",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        time: {
          unit: "second",
        },
      },
      y: {
        beginAtZero: true,
        max: maxValue,
      },
    },
  },
});

const cpuChart = new Chart(
  cpuCtx,
  commonConfig(
    labels,
    cpuUsageData,
    "CPU Usage (%)",
    "rgba(75, 192, 192, 1)",
    5
  )
);
const memoryChart = new Chart(
  memoryCtx,
  commonConfig(
    labels,
    memoryUsageData,
    "Memory Usage (MB)",
    "rgba(255, 99, 132, 1)",
    200
  )
);
const networkChart = new Chart(
  networkCtx,
  networkConfig(
    labels,
    networkReceivedData,
    networkTransmittedData,
    "Network Received (MB)",
    "rgba(54, 162, 235, 1)",
    20
  )
);

// chart 2
const cpuChart2 = new Chart(
  cpuCtx2,
  commonConfig(
    labels2,
    cpuUsageData2,
    "CPU Usage (%)",
    "rgba(75, 192, 192, 1)",
    5
  )
);
const memoryChart2 = new Chart(
  memoryCtx2,
  commonConfig(
    labels2,
    memoryUsageData2,
    "Memory Usage (MB)",
    "rgba(255, 99, 132, 1)",
    200
  )
);
const networkChart2 = new Chart(
  networkCtx2,
  networkConfig(
    labels2,
    networkReceivedData2,
    networkTransmittedData2,
    "Network Received (MB)",
    "rgba(54, 162, 235, 1)",
    20
  )
);

async function updatePopupChart(data) {
  try {
    const cpuUsagePercent = parseFloat(
      data?.exchangeRateApi?.data?.cpuUsagePercent
    );
    const memoryUsageInMB = parseFloat(
      data?.exchangeRateApi?.data?.memoryUsageInMB
    );
    const networkReceivedMB = parseFloat(
      data?.exchangeRateApi?.data?.networkReceivedMB
    );
    const networkTransmittedMB = parseFloat(
      data?.exchangeRateApi?.data?.networkTransmittedMB
    );

    document.getElementById("cpuUsage").textContent = cpuUsagePercent + "%";
    document.getElementById("memoryUsage").textContent = memoryUsageInMB + "MB";
    document.getElementById("networkIo").textContent =
      networkReceivedMB + "MB / " + networkTransmittedMB + "MB";

    const now = new Date().toLocaleTimeString();
    labels.push(now);
    cpuUsageData.push(cpuUsagePercent);
    memoryUsageData.push(memoryUsageInMB);
    networkReceivedData.push(networkReceivedMB);
    networkTransmittedData.push(networkTransmittedMB);

    cpuChart.update();
    memoryChart.update();
    networkChart.update();
  } catch (error) {
    console.error("Error fetching system metrics:", error);
  }
}
async function updatePopupChart2(data) {
  try {
    const cpuUsagePercent = parseFloat(data?.goldApi?.data?.cpuUsagePercent);
    const memoryUsageInMB = parseFloat(data?.goldApi?.data?.memoryUsageInMB);
    const networkReceivedMB = parseFloat(
      data?.goldApi?.data?.networkReceivedMB
    );
    const networkTransmittedMB = parseFloat(
      data?.goldApi?.data?.networkTransmittedMB
    );

    document.getElementById("cpuUsage2").textContent = cpuUsagePercent + "%";
    document.getElementById("memoryUsage2").textContent =
      memoryUsageInMB + "MB";
    document.getElementById("networkIo2").textContent =
      networkReceivedMB + "MB / " + networkTransmittedMB + "MB";

    const now = new Date().toLocaleTimeString();
    labels2.push(now);
    cpuUsageData2.push(cpuUsagePercent);
    memoryUsageData2.push(memoryUsageInMB);
    networkReceivedData2.push(networkReceivedMB);
    networkTransmittedData2.push(networkTransmittedMB);

    cpuChart2.update();
    memoryChart2.update();
    networkChart2.update();
  } catch (error) {
    console.error("Error fetching system metrics:", error);
  }
}

let prevReqCountExchangeRate = 0;
let prevRequestCountGold = 0;

// Hàm lấy trạng thái sức khỏe từ server và tính thời gian phản hồi
const API_KEY = "anhHiepDepTrai";

const CLIENT_EMAIL = "2202829@vnu.edu.vn";
async function fetchHealthStatus() {
  try {
    const healthData = await $.ajax({
      url: "http://localhost:8020/api/health",
      method: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("api-key", API_KEY);
        xhr.setRequestHeader("dest-email", CLIENT_EMAIL);
      },
    });

    const responseTimeGold = healthData?.goldApi?.responseTime;
    const responseTimeExchangeRate = healthData?.exchangeRateApi?.responseTime;
    const currentTime = new Date().toLocaleTimeString();

    // Kiểm tra trạng thái Exchange Rate API
    const exchangeRateStatus =
      healthData?.exchangeRateApi?.data?.status ?? "DOWN";
    const exchangeRateEndpoint =
      healthData?.exchangeRateApi?.data?.endpointStatus ?? "DOWN";
    const exchangeRateContainer =
      healthData?.exchangeRateApi?.data?.containerStatus ?? "DOWN";

    updateChartData(
      1,
      currentTime,
      responseTimeExchangeRate,
      exchangeRateStatus
    );
    // Kiểm tra chi tiết trạng thái Exchange Rate
    if (
      exchangeRateStatus === "UP" &&
      exchangeRateEndpoint === "UP" &&
      exchangeRateContainer === "UP"
    ) {
      exchangeRateStatusCounts.up++;
    } else if (exchangeRateStatus === "PARTIALLY_UP") {
      // Partially up khi endpoint down nhưng service vẫn chạy
      exchangeRateStatusCounts.partial++;
    } else if (
      exchangeRateStatus === "DOWN" ||
      exchangeRateContainer !== "UP"
    ) {
      exchangeRateStatusCounts.down++;
    }

    // Kiểm tra trạng thái Gold API
    const goldStatus = healthData?.goldApi?.data?.status ?? "DOWN";
    const goldEndpoint = healthData?.goldApi?.data?.endpointStatus ?? "DOWN";

    const goldContainer = healthData?.goldApi?.data?.containerStatus ?? "DOWN";

    // console.log(goldStatus, goldEndpoint, goldContainer);

    // Kiểm tra chi tiết trạng thái Gold
    if (
      goldStatus === "UP" &&
      goldEndpoint === "UP" &&
      goldContainer === "UP"
    ) {
      goldStatusCounts.up += 1;
    } else if (goldStatus === "PARTIALLY_UP") {
      goldStatusCounts.partial += 1;
    } else if (goldStatus === "DOWN" || goldContainer !== "UP") {
      goldStatusCounts.down += 1;
    }

    // Cập nhật biểu đồ tròn
    exchangeRatePieChart.data.datasets[0].data = [
      exchangeRateStatusCounts.up,
      exchangeRateStatusCounts.down,
      exchangeRateStatusCounts.partial,
    ];
    goldPieChart.data.datasets[0].data = [
      goldStatusCounts.up,
      goldStatusCounts.down,
      goldStatusCounts.partial,
    ];

    // Cập nhật biểu đồ
    exchangeRatePieChart.update();
    goldPieChart.update();

    updateTrafficChart(
      currentTime,
      healthData?.exchangeRateApi?.data?.requestCount
    );
    updateTrafficChartGold(
      currentTime,
      healthData?.goldApi?.data?.requestCount
    );

    // prevReqCountExchangeRate = healthData?.exchangeRateApi?.data?.requestCount;
    // prevRequestCountGold = healthData?.goldApi?.data?.requestCount;

    // console.log(healthData.exchangeRateApi.data.reqpersec);
    updateChartData(2, currentTime, responseTimeGold, goldStatus);

    $("#reqCount1").html(
      `<h4> Request Count: <span>${healthData?.exchangeRateApi?.data?.requestCount}</span>  </h4>`
    );
    $("#reqCount2").html(
      `<h4> Request Count: <span>${healthData?.goldApi?.data?.requestCount}</span>  </h4>`
    );
    $("#health-status").html(`
      <h3>API Health</h3>
      <p>Exchange Rate API: ${exchangeRateStatus} (Endpoint: ${exchangeRateEndpoint})</p>
      <p>Gold Price API: ${goldStatus} (Endpoint: ${goldEndpoint})</p>
    `);

    $("#resources").html(`
      <h3>Memory Usage</h3>
      <p>Exchange Rate API: ${healthData?.exchangeRateApi?.data?.memoryUsageInMB} MB / ${healthData?.exchangeRateApi?.data?.totalMemoryInMB}</p>
      <p>Gold Price API: ${healthData?.goldApi?.data?.memoryUsageInMB} MB / ${healthData?.goldApi?.data?.totalMemoryInMB}</p>
    `);

    $("#container-status").html(`
      <h3>Container Status</h3>
      <p>Exchange Rate API: ${exchangeRateContainer}</p>
      <p>Gold Price API: ${goldContainer}</p>
    `);

    // popup
    updatePopupChart(healthData);
    updatePopupChart2(healthData);

    localStorage.setItem("cpuUsageData", JSON.stringify(cpuUsageData));
    localStorage.setItem("memoryUsageData", JSON.stringify(memoryUsageData));
    localStorage.setItem(
      "networkReceivedData",
      JSON.stringify(networkReceivedData)
    );
    localStorage.setItem(
      "networkTransmittedData",
      JSON.stringify(networkTransmittedData)
    );
    localStorage.setItem("labels", JSON.stringify(labels));

    localStorage.setItem("cpuUsageData2", JSON.stringify(cpuUsageData2));
    localStorage.setItem("memoryUsageData2", JSON.stringify(memoryUsageData2));
    localStorage.setItem(
      "networkReceivedData2",
      JSON.stringify(networkReceivedData2)
    );
    localStorage.setItem(
      "networkTransmittedData2",
      JSON.stringify(networkTransmittedData2)
    );
    localStorage.setItem("labels2", JSON.stringify(labels2));

    localStorage.setItem("goldStatusCounts", JSON.stringify(goldStatusCounts));
    localStorage.setItem(
      "exchangeRateStatusCounts",
      JSON.stringify(exchangeRateStatusCounts)
    );

    const responseContainers = {
      responseTimeDataContainer1,
      responseTimeDataContainer2,
      responseTimeLabelsContainer1,
      responseTimeLabelsContainer2,
      responseTimeColorsContainer1,
      responseTimeColorsContainer2,
      responseTimeBgColorsContainer1,
      responseTimeBgColorsContainer2,
    };
    localStorage.setItem(
      "responseContainers",
      JSON.stringify(responseContainers)
    );

    // end popup
  } catch (error) {
    console.error("Error fetching health status:", error);
    $("#health-status").html("<p>Error fetching health status.</p>");
  }
}

// Khởi tạo và gọi hàm
setInterval(fetchHealthStatus, 5000);
fetchHealthStatus();
