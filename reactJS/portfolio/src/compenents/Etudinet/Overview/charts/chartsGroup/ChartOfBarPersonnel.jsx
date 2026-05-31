import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const processUserData = (userData) => {
  const statusCounts = {};

  // Compter les tâches par statut
  userData.tache.forEach(tache => {
    const status = tache.status;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Transformer en format adapté pour le graphique
  return Object.keys(statusCounts).map(status => ({
    status,
    count: statusCounts[status]
  }));
};

const MyBarChart = ({ userData }) => {
  const chartData = processUserData(userData);

  return (
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="status"
                // label={{
                //   value: 'Statut des tâches',
                //   position: 'bottom'
                // }}
            />
            <YAxis
                label={{
                  value: 'Nombre de tâches',
                  angle: -90,
                  position: 'insideLeft'
                }}
            />
            <Tooltip />
            <Legend />
            <Bar
                dataKey="count"
                name="Nombre de tâches"
                fill="#8884d8"
                stroke="#4834d4"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
};

export default MyBarChart;

//import React from 'react';
// import { BarChart, Bar, ResponsiveContainer } from 'recharts';
//
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
//
// function MyBarChart() {
//   const demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';
//
//   return (
//     <div>
//       <ResponsiveContainer width="100%" height={300} >
//         <BarChart data={data}>
//           <Bar dataKey="uv" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
//
// export default MyBarChart;//