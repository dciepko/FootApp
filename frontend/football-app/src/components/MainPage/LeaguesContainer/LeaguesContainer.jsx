import React, { useState, useEffect } from "react";
import classes from "./LeaguesContainer.module.css";
import LeaguesContainerPlaceBar from "../LeaguesContainerPlaceBar/LeaguesContainerPlaceBar";
import { Link } from "react-router-dom";
import { useLeagueStandingsData } from "../../../hooks/useLeagueStandingsData";
import { fetchFootballData } from "../../../utils/fetchFootballData";

const leagueIds = [39, 140, 78, 135, 61, 106]; // Identyfikatory lig

export default function LeaguesContainer() {
  const [leagues, setLeagues] = useState([]); // Stan do przechowywania danych lig
  const [currentLeagueId, setCurrentLeagueId] = useState(null); // Domyślna liga

  // Hook do pobierania danych lig
  useEffect(() => {
    const endpoint = "leagues"; // Przykład, dostosuj do swojego API
    const fetchLeagues = async () => {
      try {
        const data = await fetchFootballData(endpoint);
        // Filtrowanie i sortowanie lig na podstawie leagueIds
        const filteredLeagues = data.response
          .filter((league) => leagueIds.includes(league.league.id)) // Filtrowanie lig
          .sort(
            (a, b) =>
              leagueIds.indexOf(a.league.id) - leagueIds.indexOf(b.league.id)
          ); // Sortowanie w kolejności z leagueIds

        setLeagues(filteredLeagues); // Ustawienie przefiltrowanych i posortowanych lig
        if (filteredLeagues.length > 0) {
          setCurrentLeagueId(filteredLeagues[0].league.id); // Ustaw pierwszą ligę jako aktualną
        }
      } catch (error) {
        console.error("Błąd podczas pobierania lig:", error);
      }
    };

    fetchLeagues();
  }, []);

  // Użycie useLeagueData dla aktualnie wybranej ligi
  const {
    data: leagueData,
    isLoading,
    error,
  } = useLeagueStandingsData(currentLeagueId);

  if (isLoading) return <div>Ładowanie lig...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  return (
    <div className={classes.leaguesList}>
      <div className={classes.leagueChoosePanel}>
        {leagues.map((league) => (
          <button
            key={league.league.id}
            className={classes.leagueButton}
            onClick={() => setCurrentLeagueId(league.league.id)} // Zmiana aktualnej ligi
          >
            <img
              className={classes.leagueImage}
              src={league.league.logo} // Logo ligi
              alt={`League ${league.league.name}`} // Poprawiony alt
            />
          </button>
        ))}
      </div>
      <div className={classes.leagueContainer}>
        <div className={classes.helpBar}>
          <span>Pos.</span>
          <span>Team</span>
          <span>+/-</span>
          <span>Pts.</span>
        </div>
        {leagueData?.response[0]?.league?.standings[0].map((place) => (
          <Link
            className="disablingLinks"
            to={`/team/${place.team.id}`}
            key={place.team.id}
          >
            <LeaguesContainerPlaceBar place={place} />
          </Link>
        ))}
      </div>
    </div>
  );
}
