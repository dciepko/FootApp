import { useState } from "react";
import classes from "./TeamStatisticsPage.module.css";
import seasonsData from "../../../data/team/MUSeasons.json";
import leaguesData from "../../../data/team/MULeagues.json";
import DropdownOption from "../../DropdownOption/DropdownOption";
import Pagination from "../../../components/Pagination/Pagination";

export default function TeamStatisticsPage() {
  // const [chosenSeason, setChosenSeason] = useState(
  //   seasonsData[seasonsData.length - 1]
  // );
  // const [chosenLeague, setChosenLeague] = useState(leaguesData[0]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 1; // Liczba elementów na stronę

  // const teamStatsData = leaguesData.find(
  //   (league) => league.name === chosenLeague
  // ).statistics; // Statystyki wybranej ligi

  // const statProperties = [
  //   {
  //     statName: "Fixtures",
  //     played: teamStatsData.fixtures.played.total,
  //     wins: teamStatsData.fixtures.wins.total,
  //     draws: teamStatsData.fixtures.draws.total,
  //     loses: teamStatsData.fixtures.loses.total,
  //   },
  //   {
  //     statName: "Goals",
  //     scored: teamStatsData.goals.for.total.total,
  //     conceded: teamStatsData.goals.against.total.total,
  //   },
  //   {
  //     statName: "Average Goals",
  //     averageFor: teamStatsData.goals.for.average.total,
  //     averageAgainst: teamStatsData.goals.against.average.total,
  //   },
  //   {
  //     statName: "Clean Sheets",
  //     home: teamStatsData.clean_sheet.home,
  //     away: teamStatsData.clean_sheet.away,
  //     total: teamStatsData.clean_sheet.total,
  //   },
  //   {
  //     statName: "Penalties",
  //     scored: teamStatsData.penalty.scored.total,
  //     missed: teamStatsData.penalty.missed.total,
  //   },
  //   {
  //     statName: "Lineups",
  //     mostUsedFormation: teamStatsData.lineups[0].formation,
  //     gamesPlayed: teamStatsData.lineups[0].played,
  //   },
  //   {
  //     statName: "Cards",
  //     yellow: teamStatsData.cards.yellow["total"],
  //     red: teamStatsData.cards.red["total"] || 0,
  //   },
  // ];

  // const totalPages = Math.ceil(statProperties.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentStat = statProperties.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // )[0];

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const formatSeasonLabel = (season) => {
  //   return (
  //     season.toString().slice(2) +
  //     " / " +
  //     (Number(season.toString().slice(2)) + 1).toString()
  //   );
  // };

  return (
    <>
      {/* <div className={classes.chooseSection}>
        <div className={classes.seasonChoosePart}>
          <DropdownOption
            options={seasonsData}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
        <div className={classes.leagueChoosePart}>
          <DropdownOption
            options={leaguesData.map((league) => league.name)}
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
      </div> */}
      **Styatystyki**
    </>
  );
}
