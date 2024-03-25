 const ctx = document.getElementById('myChart');

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              data: [2000, 1900, 3400, 5000, 2893, 3839, 6980, 3254, 3256, 7654, 12000, 15234],
              borderWidth: 1,
              label: 'Amount of Sales',
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        const pie = document.getElementById('myPie');

          new Chart(pie, {
            type: 'pie',
           data: {
              labels: ['Towels', 'Singlets', 'Camisole', 'Boxers', 'Pants', 'T-shirts'],
              datasets: [{
                data: [2000, 1900, 3400, 5000, 2893, 3839],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgba(75,  192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                hoverOffset: 4
              }]
            },
            
          });