import { useState, useEffect } from "react";
import classes from "./TeamStatisticsPage.module.css";
import DropdownOption from "../../DropdownOption/DropdownOption";
import Pagination from "../../../components/Pagination/Pagination";
import SimplePieChart from "../../Charts/SimplePieChart";
import SimpleBarChart from "../../Charts/SimpleBarChart";
import noFormationField from "../../../assets/field-no-formation.svg";
import { useTeamStatisticsData } from "../../../hooks/useTeam/useTeamStatisticsData";

export default function TeamStatisticsPage({ data }) {
  const leaguesData = data[1].response;
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

  useEffect(() => {
    if (!chosenLeague && leaguesForChosenSeason.length > 0) {
      setChosenLeague(leaguesForChosenSeason[0].league);
    }
  }, [chosenLeague, leaguesForChosenSeason]);

  const {
    data: teamStatsData,
    isLoading,
    error,
  } = useTeamStatisticsData(
    chosenLeague ? chosenLeague.id : null,
    chosenSeason,
    data[0].response[0].team.id
  );

  const teamStatitsticsData = teamStatsData?.response || {};

  if (isLoading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={classes.error}>Error: {error.message}</div>;
  }

  if (!teamStatitsticsData) {
    return <div className={classes.error}>No statistics available.</div>;
  }

  const totalYellow = Object.values(
    teamStatitsticsData.cards?.yellow || {}
  ).reduce((acc, card) => acc + (card.total || 0), 0);

  const totalRed = Object.values(teamStatitsticsData.cards?.red || {}).reduce(
    (acc, card) => acc + (card.total || 0),
    0
  );

  const statProperties = [
    {
      statName: "Fixtures",
      played: teamStatitsticsData.fixtures?.played?.total,
      wins: teamStatitsticsData.fixtures?.wins?.total,
      draws: teamStatitsticsData.fixtures?.draws?.total,
      loses: teamStatitsticsData.fixtures?.loses?.total,
      chart: (
        <SimplePieChart
          data={[
            {
              name: "Wins",
              value: teamStatitsticsData.fixtures?.wins?.total || 0,
            },
            {
              name: "Draws",
              value: teamStatitsticsData.fixtures?.draws?.total || 0,
            },
            {
              name: "Loses",
              value: teamStatitsticsData.fixtures?.loses?.total || 0,
            },
          ]}
        />
      ),
    },
    {
      statName: "Goals",
      scored: teamStatitsticsData.goals?.for?.total?.total || 0,
      conceded: teamStatitsticsData.goals?.against?.total?.total || 0,
      chart: (
        <SimplePieChart
          data={[
            {
              name: "Scored",
              value: teamStatitsticsData.goals?.for?.total?.total || 0,
            },
            {
              name: "Conceded",
              value: teamStatitsticsData.goals?.against?.total?.total || 0,
            },
          ]}
        />
      ),
    },
    {
      statName: "Average Goals",
      averageFor: teamStatitsticsData.goals?.for?.average?.total || 0,
      averageAgainst: teamStatitsticsData.goals?.against?.average?.total || 0,
      chart: (
        <SimpleBarChart
          data={[
            {
              name: "For",
              value: teamStatitsticsData.goals?.for?.average?.total || 0,
            },
            {
              name: "Against",
              value: teamStatitsticsData.goals?.against?.average?.total || 0,
            },
          ]}
        />
      ),
    },
    {
      statName: "Clean Sheets",
      home: teamStatitsticsData.clean_sheet?.home || 0,
      away: teamStatitsticsData.clean_sheet?.away || 0,
      total: teamStatitsticsData.clean_sheet?.total || 0,
      chart: (
        <SimplePieChart
          data={[
            { name: "Home", value: teamStatitsticsData.clean_sheet?.home || 0 },
            { name: "Away", value: teamStatitsticsData.clean_sheet?.away || 0 },
          ]}
        />
      ),
    },
    {
      statName: "Penalties",
      scored: teamStatitsticsData.penalty?.scored?.total || 0,
      missed: teamStatitsticsData.penalty?.missed?.total || 0,
      chart: (
        <SimplePieChart
          data={[
            {
              name: "Scored",
              value: teamStatitsticsData.penalty?.scored?.total || 0,
            },
            {
              name: "Missed",
              value: teamStatitsticsData.penalty?.missed?.total || 0,
            },
          ]}
        />
      ),
    },
    {
      statName: "Lineups",
      mostUsedFormation: teamStatitsticsData.lineups?.[0]?.formation || "",
      gamesPlayed: teamStatitsticsData.lineups?.[0]?.played || 0,
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
            { name: "Red", value: totalRed },
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

  const formatStatName = (name) => {
    return name.replace(/([A-Z])/g, " $1").trim();
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
            chosenOption={chosenLeague ? chosenLeague.name : ""}
            setChosenOption={(selectedLeagueName) => {
              const selectedLeague = leaguesForChosenSeason.find(
                (league) => league.league.name === selectedLeagueName
              );
              setChosenLeague(selectedLeague ? selectedLeague.league : null);
            }}
          />
        </div>
      </div>

      <div className={classes.statisticsSection}>
        {chosenLeague && teamStatitsticsData ? (
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
                        <strong>{formatStatName(key)}:</strong>{" "}
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
          <p>Wybierz ligę, aby zobaczyć statystyki.</p>
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
