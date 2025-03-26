import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Reports() {
  const paymentStatusData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const productPerformanceData = {
    labels: ['Top Seller', 'Average', 'Low Performer'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="reports">
      <h2>Financial Reports</h2>
      <div className="report-charts">
        <div className="chart">
          <h3>Payment Status</h3>
          <Pie data={paymentStatusData} />
        </div>
        <div className="chart">
          <h3>Product Performance</h3>
          <Pie data={productPerformanceData} />
        </div>
      </div>
    </div>
  );
}