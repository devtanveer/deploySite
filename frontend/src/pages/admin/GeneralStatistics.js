import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [complaintsData, setComplaintsData] = useState({
    labels: ['Resolved Complaints', 'Progress Complaints', 'Total Complaints'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedResponse = await axios.get('http://localhost:4000/complaints/resolved/count');
        const progressResponse = await axios.get('http://localhost:4000/complaints/progress/count');
        const totalResponse = await axios.get('http://localhost:4000/complaints/count');

        const resolvedCount = resolvedResponse.data.resolvedCount || 0;
        const progressCount = progressResponse.data.progressCount || 0;
        const totalCount = totalResponse.data.count || 0;

        // Update the data for the pie chart
        setComplaintsData({
          ...complaintsData,
          datasets: [
            {
              ...complaintsData.datasets[0],
              data: [resolvedCount, progressCount, totalCount],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Complaints Distribution</h2>
      <div style={{ width: '400px', height: '400px' }}>
        <Doughnut data={complaintsData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
