import { Controller } from "@hotwired/stimulus"
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default class extends Controller {
  static values = { revenue: Array }
  
  chart = null

  connect() {
    this.initializeChart()
  }

  disconnect() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }

  initializeChart() {
    const data = this.revenueValue.map(item => item[1]/100.0)
    const labels = this.revenueValue.map(item => item[0])

    const ctx = this.element.getContext('2d')

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue $',
          data: data,
          borderWidth: 3,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              display: true
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            },
            border: {
              dash: [5, 5]
            },
            grid: {
              color: "#d4f3ef"
            }
          }
        }
      }
    })
  }
}
