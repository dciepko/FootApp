import { useState } from "react";
import classes from "./PlayerStatisticsPage.module.css";
import seasons from "../../../data/player/haalandSeasons.json";
import playerinfo from "../../../data/player/haaland.json";
import DropdownOption from "../../DropdownOption/DropdownOption";
import Pagination from "../../../components/Pagination/Pagination";

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
    },
    {
      statName: "Substitutes",
      in: currentCompetitionStats.substitutes.in,
      out: currentCompetitionStats.substitutes.out,
      bench: currentCompetitionStats.substitutes.bench,
    },
    {
      statName: "Shots",
      total: currentCompetitionStats.shots.total,
      on: currentCompetitionStats.shots.on,
    },
    {
      statName: "Goals",
      total: currentCompetitionStats.goals.total,
      conceded: currentCompetitionStats.goals.conceded,
      assists: currentCompetitionStats.goals.assists,
      saves: currentCompetitionStats.goals.assists,
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
    },
    {
      statName: "Duels",
      total: currentCompetitionStats.duels.total,
      won: currentCompetitionStats.duels.won,
    },
    {
      statName: "Dribbles",
      attempts: currentCompetitionStats.dribbles.attempts,
      success: currentCompetitionStats.dribbles.success,
      past: currentCompetitionStats.dribbles.past,
    },
    {
      statName: "Fouls",
      drawn: currentCompetitionStats.fouls.drawn,
      committed: currentCompetitionStats.fouls.committed,
    },
    {
      statName: "Cards",
      yellow: currentCompetitionStats.cards.yellow,
      red: currentCompetitionStats.cards.red,
    },
    {
      statName: "Penalties",
      won: currentCompetitionStats.penalty.won,
      committed: currentCompetitionStats.penalty.commited,
      scored: currentCompetitionStats.penalty.scored,
      missed: currentCompetitionStats.penalty.missed,
      saved: currentCompetitionStats.penalty.saved,
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
              {Object.entries(currentStat).map(([key, value]) => {
                if (key !== "statName") {
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
          </div>
        ) : (
          <p>No statistics available for this page.</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
}
