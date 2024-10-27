import { useState } from "react";
import classes from "./TeamStatisticsPage.module.css";
import leaguesData from "../../../data/team/MULeagues.json"; // Zaktualizowane źródło
import statisticsData from "../../../data/team/MUStatistics.json";
import DropdownOption from "../../DropdownOption/DropdownOption";
import Pagination from "../../../components/Pagination/Pagination";
import SimplePieChart from "../../Charts/SimplePieChart";
import SimpleBarChart from "../../Charts/SimpleBarChart";
import noFormationField from "../../../assets/field-no-formation.svg";

export default function TeamStatisticsPage() {
  const availableSeasons = Array.from(
    new Set(
      leaguesData.flatMap((league) =>
        league.seasons.map((season) => season.year)
      )
    )
  ).sort((a, b) => b - a);

  const [chosenSeason, setChosenSeason] = useState(availableSeasons[0]);
  const [chosenLeague, setChosenLeague] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const leaguesForChosenSeason = leaguesData.filter((league) =>
    league.seasons.some((season) => season.year === chosenSeason)
  );

  if (!chosenLeague && leaguesForChosenSeason.length > 0) {
    setChosenLeague(leaguesForChosenSeason[0].league.name);
  }

  // // Pobieramy dane statystyczne dla wybranej ligi i sezonu
  // const selectedLeagueData = statisticsData.find(
  //   (league) => league.league.name === chosenLeague
  // );

  // const selectedSeasonData = selectedLeagueData?.seasons.find(
  //   (season) => season.year === chosenSeason
  // );

  // const teamStatsData = selectedSeasonData?.statistics || {};
  const teamStatsData = statisticsData;

  const totalYellow = Object.values(teamStatsData.cards.yellow).reduce(
    (acc, card) => {
      return acc + (card.total || 0);
    },
    0
  );
  const totalRed = Object.values(teamStatsData.cards.red).reduce(
    (acc, card) => {
      return acc + (card.total || 0);
    },
    0
  );
  const statProperties = [
    {
      statName: "Fixtures",
      played: teamStatsData.fixtures?.played?.total,
      wins: teamStatsData.fixtures?.wins?.total,
      draws: teamStatsData.fixtures?.draws?.total,
      loses: teamStatsData.fixtures?.loses?.total,
      chart: (
        <SimplePieChart
          data={[
            { name: "Wins", value: teamStatsData.fixtures?.wins?.total },
            { name: "Draws", value: teamStatsData.fixtures?.draws?.total },
            { name: "Loses", value: teamStatsData.fixtures?.loses?.total },
          ]}
        />
      ),
    },
    {
      statName: "Goals",
      scored: teamStatsData.goals?.for?.total?.total,
      conceded: teamStatsData.goals?.against?.total?.total,
      chart: (
        <SimplePieChart
          data={[
            { name: "Scored", value: teamStatsData.goals?.for?.total?.total },
            {
              name: "Conceded",
              value: teamStatsData.goals?.against?.total?.total,
            },
          ]}
        />
      ),
    },
    {
      statName: "Average Goals",
      averageFor: teamStatsData.goals?.for?.average?.total,
      averageAgainst: teamStatsData.goals?.against?.average?.total,
      chart: (
        <SimpleBarChart
          data={[
            { name: "For", value: teamStatsData.goals?.for?.average?.total },
            {
              name: "Against",
              value: teamStatsData.goals?.against?.average?.total,
            },
          ]}
        />
      ),
    },
    {
      statName: "Clean Sheets",
      home: teamStatsData.clean_sheet?.home,
      away: teamStatsData.clean_sheet?.away,
      total: teamStatsData.clean_sheet?.total,
      chart: (
        <SimplePieChart
          data={[
            { name: "Home", value: teamStatsData.clean_sheet?.home },
            {
              name: "Away",
              value: teamStatsData.clean_sheet?.away,
            },
          ]}
        />
      ),
    },
    {
      statName: "Penalties",
      scored: teamStatsData.penalty?.scored?.total,
      missed: teamStatsData.penalty?.missed?.total,
      chart: (
        <SimplePieChart
          data={[
            { name: "Scored", value: teamStatsData.penalty?.scored?.total },
            {
              name: "Missed",
              value: teamStatsData.penalty?.missed?.total,
            },
          ]}
        />
      ),
    },
    {
      statName: "Lineups",
      mostUsedFormation: teamStatsData.lineups?.[0]?.formation,
      gamesPlayed: teamStatsData.lineups?.[0]?.played,
      formationField: "",
    },
    {
      statName: "Cards",
      yellow: totalYellow,
      red: totalRed,
      chart: (
        <SimpleBarChart
          data={[
            { name: "Yellow", value: totalYellow },
            {
              name: "Red",
              value: totalRed,
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

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <div className={classes.statisticsPage}>
      <div className={classes.choosePart}>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={availableSeasons}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={leaguesForChosenSeason.map((league) => league.league.name)}
            chosenOption={chosenLeague}
            setChosenOption={setChosenLeague}
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
                  if (
                    key !== "statName" &&
                    key !== "chart" &&
                    key !== "formationField"
                  ) {
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
              {currentStat.statName !== "Lineups" ? (
                <div className={classes.chartContainer}>
                  {currentStat.chart}
                </div>
              ) : currentStat.formationField ? null : (
                <div className={classes.chartContainer}>
                  <img src={noFormationField} alt="No Formation Available" />
                </div>
              )}
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
    </div>
  );
}
