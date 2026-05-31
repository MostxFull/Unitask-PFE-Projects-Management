// import React from 'react';
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
//
// const statusColors = {
//   "In_progress": "#FFA500",
//   "Completed": "#00C49F",
//   "Pending": "#8884d8",
//   "Blocked": "#FF8042"
// };
//
// export default function ProgressTimelineChart({ userData }) {
//   // Transformation des données des tâches
//   const tasks = userData?.tache || [];
//
//   // Calcul des statistiques
//   const statusData = tasks.reduce((acc, task) => {
//     acc[task.status] = (acc[task.status] || 0) + 1;
//     return acc;
//   }, {});
//
//   const chartData = Object.keys(statusData).map(status => ({
//     name: status.replace(/_/g, ' '),
//     value: (statusData[status] / tasks.length) * 100,
//     fill: statusColors[status] || '#8884d8'
//   }));
//
//   return (
//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <h3 className="text-xl font-semibold mb-4">Task Progress Overview</h3>
//         <div className="h-96">
//           {tasks.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <RadialBarChart
//                     innerRadius="20%"
//                     outerRadius="90%"
//                     data={chartData}
//                     startAngle={180}
//                     endAngle={-180}
//                 >
//                   <RadialBar
//                       minAngle={15}
//                       label={{ position: 'insideStart', fill: '#fff' }}
//                       background
//                       clockWise
//                       dataKey="value"
//                   />
//                   <Legend
//                       iconSize={10}
//                       layout="vertical"
//                       verticalAlign="middle"
//                       align="right"
//                       wrapperStyle={{
//                         right: -20,
//                         top: '50%',
//                         transform: 'translateY(-50%)'
//                       }}
//                       formatter={(value) => (
//                           <span className="text-gray-600 text-sm">{value}</span>
//                       )}
//                   />
//                 </RadialBarChart>
//               </ResponsiveContainer>
//           ) : (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 No tasks available
//               </div>
//           )}
//         </div>
//
//         {/* Timeline des commentaires */}
//         <div className="mt-6">
//           <h4 className="text-lg font-semibold mb-3">Recent Activity</h4>
//           <div className="space-y-4">
//             {tasks.flatMap(task =>
//                 task.commentaireList?.map(comment => ({
//                   ...comment,
//                   taskTitle: task.titre
//                 })) || []
//             )
//                 .sort((a, b) => new Date(b.date) - new Date(a.date))
//                 .slice(0, 3)
//                 .map((comment, index) => (
//                     <div key={index} className="flex items-start gap-3">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
//                       <div>
//                         <p className="text-sm font-medium">{comment.taskTitle}</p>
//                         <p className="text-sm text-gray-600">{comment.content}</p>
//                         <time className="text-xs text-gray-500">
//                           {new Date(comment.date).toLocaleDateString()}
//                         </time>
//                       </div>
//                     </div>
//                 ))}
//           </div>
//         </div>
//       </div>
//   );
// }


import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

export default function DynamicRadialBarChart({ tasks }) {
  // Regrouper les tâches par statut et calculer les pourcentages
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const totalTasks = tasks.length;

  const data = Object.keys(statusCounts).map((status, index) => ({
    name: status,
    uv: (statusCounts[status] / totalTasks) * 100, // Pourcentage
    fill: ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"][index % 5],
  }));

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
        data={data}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise
          dataKey="uv"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

