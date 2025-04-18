import React, { useState, useEffect } from "react";
import classes from "./LeaguesContainer.module.css";
import LeaguesContainerPlaceBar from "../LeaguesContainerPlaceBar/LeaguesContainerPlaceBar";
import { Link, useNavigate } from "react-router-dom";
import { useLeagueStandingsData } from "../../../hooks/useLeagueStandingsData";
import { fetchFootballData } from "../../../utils/fetchFootballData";
import Loader from "../../Loader/Loader";

const leagueIds = [39, 140, 78, 135, 61, 106];

export default function LeaguesContainer() {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [currentLeagueId, setCurrentLeagueId] = useState(null);

  useEffect(() => {
    const endpoint = "leagues";
    const fetchLeagues = async () => {
      try {
        const data = await fetchFootballData(endpoint);
        const filteredLeagues = data.response
          .filter((league) => leagueIds.includes(league.league.id))
          .sort(
            (a, b) =>
              leagueIds.indexOf(a.league.id) - leagueIds.indexOf(b.league.id)
          );

        setLeagues(filteredLeagues);
        if (filteredLeagues.length > 0) {
          setCurrentLeagueId(filteredLeagues[0].league.id);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania lig:", error);
      }
    };

    fetchLeagues();
  }, []);

  function handleDoubleClick(id) {
    navigate(`/league/${id}`);
  }

  const {
    data: leagueData,
    isLoading,
    error,
  } = useLeagueStandingsData(currentLeagueId);

  if (isLoading || currentLeagueId === null)
    return (
      <div className={classes.leaguesList}>
        <Loader />
      </div>
    );
  if (error) return <div>Błąd: {error.message}</div>;

  return (
    <div className={classes.leaguesList}>
      <div className={classes.leagueChoosePanel}>
        {leagues.map((league) => (
          <button
            key={league.league.id}
            className={classes.leagueButton}
            onClick={() => setCurrentLeagueId(league.league.id)}
            onDoubleClick={() => {
              handleDoubleClick(league.league.id);
            }}
          >
            <img
              className={classes.leagueImage}
              src={league.league.logo}
              alt={`League ${league.league.name}`}
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
