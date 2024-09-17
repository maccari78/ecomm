import { Controller } from "@hotwired/stimulus"
import Chart from 'chart.js/auto'

export default class extends Controller {
  static values = { revenue: Array }

  connect() {
    console.log("Dashboard controller connected")
    console.log("Revenue data:", this.revenueValue)
    this.initializeChart()
  }

  initializeChart() {
    const canvas = this.element.querySelector('canvas')
    if (!canvas) {
      console.error('Canvas element not found')
      return
    }

    console.log("Canvas found, initializing chart")

    const ctx = canvas.getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.revenueValue.map(item => item[0]),
        datasets: [{
          label: 'Revenue',
          data: this.revenueValue.map(item => item[1] / 100), // Convert cents to dollars
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of Week'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($)'
            },
            ticks: {
              callback: function(value, index, values) {
                return '$' + value.toFixed(2);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    })

    console.log("Chart initialized")
  }
}