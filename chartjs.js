// Get the canvas element for the bar chart
const ctx = document.getElementById("myChart");

// Initialize the bar chart
new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [
          2000, 1900, 3400, 5000, 2893, 3839, 6980, 3254, 3256, 7654, 12000,
          15234,
        ],
        borderWidth: 1,
        label: "Amount of Sales",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Get the canvas element for the pie chart
const pie = document.getElementById("myPie");

// Initialize the pie chart
new Chart(pie, {
  type: "pie",
  data: {
    labels: ["Towels", "Singlets", "Camisole", "Boxers", "Pants", "T-shirts"],
    datasets: [
      {
        data: [2000, 1900, 3400, 5000, 2893, 3839],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgba(75,  192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

// Get the canvas elements for the doughnut charts
const doughnutCtx = document.getElementById("myDough");
const doughnutCtx1 = document.getElementById("myDough1");
const doughnutCtx2 = document.getElementById("myDough2");

// Initialize the first doughnut chart
new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [
          { id: "Sales", nested: { value: 20 } },
          { id: "Purchases", nested: { value: 50 } },
        ],
      },
    ],
  },
  options: {
    parsing: {
      key: "nested.value",
    },
  },
});

// Initialize the second doughnut chart
new Chart(doughnutCtx1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [
          { id: "Sales", nested: { value: 1500 } },
          { id: "Purchases", nested: { value: 500 } },
        ],
      },
    ],
  },
  options: {
    parsing: {
      key: "nested.value",
    },
  },
});

// Initialize the third doughnut chart
new Chart(doughnutCtx2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [
          { id: "Sales", nested: { value: 1500 } },
          { id: "Purchases", nested: { value: 500 } },
        ],
      },
    ],
  },
  options: {
    parsing: {
      key: "nested.value",
    },
  },
});
