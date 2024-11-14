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

const PlayerBarChart = ({ data }) => {
  // Wyodrębniamy unikalnych zawodników z danych
  const players = [...new Set(data.map((entry) => entry.player))];

  // Kategoriami będą statystyki (np. goals, assists itd.)
  const categories = [...new Set(data.map((entry) => entry.name))];

  // Funkcja przygotowująca dane do wykresu
  const prepareDataForChart = () => {
    return categories.map((category) => {
      const categoryData = {
        name: category,
      };

      // Dla każdego zawodnika sprawdzamy, jaka jest jego wartość w danej kategorii
      players.forEach((player) => {
        const playerData = data.find(
          (entry) => entry.name === category && entry.player === player
        );
        categoryData[player] = playerData ? playerData.value : 0;
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
        {players.map((player) => (
          <Bar
            key={player}
            dataKey={player} // Używamy zawodnika jako dataKey
            name={player}
            fill={data.find((entry) => entry.player === player).color} // Kolor przypisany do zawodnika
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PlayerBarChart;
