import { useState } from "react";
import classes from "./PlayerStatisticsPage.module.css";
import seasons from "../../../data/player/haalandSeasons.json";
import playerinfo from "../../../data/player/haaland.json";
import DropdownOption from "../../DropdownOption/DropdownOption";
import Pagination from "../../../components/Pagination/Pagination";
import SimplePieChart from "../../Charts/SimplePieChart";
import SimpleBarChart from "../../Charts/SimpleBarChart";

export default function PlayerStatisticsPage() {
  const seasonsData = seasons;
  const statisticsData = playerinfo[0].statistics;

  const competitionsData = [
    ...new Set(statisticsData.map((stat) => stat.league.name)),
  ];

  const [chosenSeason, setChosenSeason] = useState(
    seasonsData[seasonsData.length - 1]
  );
  const [chosenCompetition, setChosenCompetition] = useState(
    competitionsData[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  const currentCompetitionStats = statisticsData.find(
    (stat) => stat.league.name === chosenCompetition
  );

  const statProperties = [
    {
      statName: "Games",
      appearences: currentCompetitionStats.games.appearences,
      lineups: currentCompetitionStats.games.lineups,
      minutes: currentCompetitionStats.games.minutes,
      number: currentCompetitionStats.games.number,
      position: currentCompetitionStats.games.position,
      rating: currentCompetitionStats.games.rating,
      captain: currentCompetitionStats.games.captain,
      chart: (
        <SimpleBarChart
          data={[
            {
              name: "Appearences",
              value: currentCompetitionStats.games.appearences,
            },
            {
              name: "Lineups",
              value: currentCompetitionStats.games.lineups,
            },
          ]}
        />
      ),
    },
    {
      statName: "Substitutes",
      in: currentCompetitionStats.substitutes.in,
      out: currentCompetitionStats.substitutes.out,
      bench: currentCompetitionStats.substitutes.bench,
      chart: (
        <SimplePieChart
          data={[
            { name: "In", value: currentCompetitionStats.substitutes.in },
            { name: "Out", value: currentCompetitionStats.substitutes.out },
          ]}
        />
      ),
    },
    {
      statName: "Shots",
      total: currentCompetitionStats.shots.total,
      on: currentCompetitionStats.shots.on,
      chart: (
        <SimplePieChart
          data={[
            { name: "On", value: currentCompetitionStats.shots.on },
            {
              name: "Missed",
              value:
                currentCompetitionStats.shots.total -
                currentCompetitionStats.shots.on,
            },
          ]}
        />
      ),
    },
    {
      statName: "Goals",
      total: currentCompetitionStats.goals.total,
      conceded: currentCompetitionStats.goals.conceded,
      assists: currentCompetitionStats.goals.assists,
      saves: currentCompetitionStats.goals.assists,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Total", value: currentCompetitionStats.goals.total },
            {
              name: "Conceded",
              value: currentCompetitionStats.goals.conceded,
            },
            { name: "Assists", value: currentCompetitionStats.goals.assists },
            { name: "Saves", value: currentCompetitionStats.goals.assists },
          ]}
        />
      ),
    },
    {
      statName: "Passes",
      total: currentCompetitionStats.passes.total,
      key: currentCompetitionStats.passes.key,
      accuracy: currentCompetitionStats.passes.accuracy,
    },
    {
      statName: "Tackles",
      total: currentCompetitionStats.tackles.total,
      blocks: currentCompetitionStats.tackles.blocks,
      interceptions: currentCompetitionStats.tackles.interceptions,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Total", value: currentCompetitionStats.tackles.total },
            {
              name: "Blocks",
              value: currentCompetitionStats.tackles.blocks,
            },
            {
              name: "Interceptions",
              value: currentCompetitionStats.tackles.interceptions,
            },
          ]}
        />
      ),
    },
    {
      statName: "Duels",
      total: currentCompetitionStats.duels.total,
      won: currentCompetitionStats.duels.won,
      chart: (
        <SimplePieChart
          data={[
            { name: "Won", value: currentCompetitionStats.duels.won },
            {
              name: "Lost",
              value:
                currentCompetitionStats.duels.total -
                currentCompetitionStats.duels.won,
            },
          ]}
        />
      ),
    },
    {
      statName: "Dribbles",
      attempts: currentCompetitionStats.dribbles.attempts,
      success: currentCompetitionStats.dribbles.success,
      past: currentCompetitionStats.dribbles.past,
      chart: (
        <SimplePieChart
          data={[
            { name: "Won", value: currentCompetitionStats.dribbles.success },
            {
              name: "Lost",
              value:
                currentCompetitionStats.dribbles.attempts -
                currentCompetitionStats.dribbles.success,
            },
          ]}
        />
      ),
    },
    {
      statName: "Fouls",
      drawn: currentCompetitionStats.fouls.drawn,
      committed: currentCompetitionStats.fouls.committed,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Drawn", value: currentCompetitionStats.fouls.drawn },
            {
              name: "Committed",
              value: currentCompetitionStats.fouls.committed,
            },
          ]}
        />
      ),
    },
    {
      statName: "Cards",
      yellow: currentCompetitionStats.cards.yellow,
      red: currentCompetitionStats.cards.red,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Yellow", value: currentCompetitionStats.cards.yellow },
            {
              name: "Red",
              value: currentCompetitionStats.cards.red,
            },
          ]}
        />
      ),
    },
    {
      statName: "Penalties",
      won: currentCompetitionStats.penalty.won,
      committed: currentCompetitionStats.penalty.commited,
      scored: currentCompetitionStats.penalty.scored,
      missed: currentCompetitionStats.penalty.missed,
      saved: currentCompetitionStats.penalty.saved,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Won", value: currentCompetitionStats.penalty.won },
            {
              name: "Committed",
              value: currentCompetitionStats.penalty.commited,
            },
            {
              name: "Scored",
              value: currentCompetitionStats.penalty.scored,
            },
            {
              name: "Missed",
              value: currentCompetitionStats.penalty.missed,
            },
            {
              name: "Saved",
              value: currentCompetitionStats.penalty.saved,
            },
          ]}
        />
      ),
    },
  ];

  const totalPages = Math.ceil(statProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStat = statProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  )[0];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={classes.chooseSection}>
        <div className={classes.seasonChoosePart}>
          <DropdownOption
            options={seasonsData}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
        <div className={classes.competitionChoosePart}>
          <DropdownOption
            options={competitionsData}
            chosenOption={chosenCompetition}
            setChosenOption={setChosenCompetition}
          />
        </div>
      </div>

      <div className={classes.statisticsSection}>
        {currentStat ? (
          <div className={classes.statisticDetails}>
            <h3>{currentStat.statName}</h3>
            <div className={classes.statisticDetailsList}>
              <div className={classes.valuesContainer}>
                {Object.entries(currentStat).map(([key, value]) => {
                  if (key !== "statName" && key !== "chart") {
                    return (
                      <div key={key} className={classes.statisticItem}>
                        <strong>{key.toUpperCase()}:</strong>{" "}
                        {value !== null ? value : "N/A"}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className={classes.chartContainer}>{currentStat.chart}</div>
            </div>
          </div>
        ) : (
          <p>No statistics available for this page.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
