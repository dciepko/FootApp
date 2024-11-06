import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TeamBarChart = ({ data }) => {
  const teams = [...new Set(data.map((entry) => entry.team))];

  const categories = [...new Set(data.map((entry) => entry.name))];

  const prepareDataForChart = () => {
    return categories.map((category) => {
      const categoryData = {
        name: category,
      };

      teams.forEach((team) => {
        const teamData = data.find(
          (entry) => entry.name === category && entry.team === team
        );
        categoryData[team] = teamData ? teamData.value : 0;
      });

      return categoryData;
    });
  };

  const chartData = prepareDataForChart();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width="100%" height="100%" data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {teams.map((team) => (
          <Bar
            key={team}
            dataKey={team}
            name={team}
            fill={data.find((entry) => entry.team === team).color} // Przypisanie koloru drużyny
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TeamBarChart;
