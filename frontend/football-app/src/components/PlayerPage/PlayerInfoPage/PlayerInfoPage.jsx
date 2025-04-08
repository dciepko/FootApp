import classes from "./PlayerInfoPage.module.css";
import { usePlayerStatisticsAndInfoData } from "../../../hooks/usePlayer/usePlayerStatisticsAndInfo";
import { useAuth } from "../../../context/AuthContext";
import FavouriteSign from "../../FavouriteSign/FavouriteSign";

export default function PlayerInfoPage({ id, newestSeason }) {
  const {
    data: playerStatisticsAndInfoData,
    isLoading,
    error,
  } = usePlayerStatisticsAndInfoData(id, newestSeason);

  const { user } = useAuth();

  if (isLoading) {
    return <div className={classes.loading}>Loading player info...</div>;
  }

  if (error) {
    return (
      <div className={classes.error}>
        An error occurred while loading player data: {error.message}
      </div>
    );
  }

  if (
    !playerStatisticsAndInfoData ||
    playerStatisticsAndInfoData.response.length === 0 ||
    !playerStatisticsAndInfoData.response[0]
  ) {
    return (
      <div className={classes.error}>
        Player data is not available or is incomplete.
      </div>
    );
  }

  const playerInfo = playerStatisticsAndInfoData.response[0];

  const clubInfo = playerInfo.statistics.find(
    (stat) => stat.team.name !== playerInfo.player.nationality
  );

  const clubName = clubInfo ? clubInfo.team.name : "No club";
  const clubLogo = clubInfo ? clubInfo.team.logo : null;

  return (
    <div className={classes.infoContainer}>
      <div className={classes.imagesPart}>
        {user !== null && (
          <FavouriteSign
            type={"player"}
            user={user.id}
            entityId={playerInfo.player.id}
            leagueId={playerInfo.statistics[0].league.id}
          />
        )}
        <div className={classes.faceImageContainer}>
          <img src={playerInfo.player.photo} alt="Player face" />
        </div>
        <div className={classes.clubAndCountryImage}>
          <div className={classes.clubImageContainer}>
            {clubLogo ? (
              <img src={clubLogo} alt="Club Logo" />
            ) : (
              <span>No Club Logo Available</span>
            )}
          </div>
        </div>
      </div>
      <div className={classes.infoPart}>
        <div className={classes.namesPart}>
          <div className={classes.name}>{playerInfo.player.name}</div>
          <div className={classes.fullName}>
            {playerInfo.player.firstname}&nbsp;{playerInfo.player.lastname}
          </div>
        </div>
        <div className={classes.restInfoPart}>
          <div>
            <span>Nationality:&nbsp;</span>
            <span>{playerInfo.player.nationality}</span>
          </div>
          <div>
            <span>Club:&nbsp;</span>
            <span>{clubName}</span>
          </div>
          <div>
            <span>Birth date:&nbsp;</span>
            <span>
              {playerInfo.player.birth.date},&nbsp;
              {playerInfo.player.age}&nbsp;Years&nbsp;Old
            </span>
          </div>
          <div>
            <span>Birthplace:&nbsp;</span>
            <span>
              {playerInfo.player.birth.place},&nbsp;
              {playerInfo.player.birth.country}
            </span>
          </div>
          <div>
            <span>Height:&nbsp;</span>
            <span>{playerInfo.player.height}</span>
          </div>
          <div>
            <span>Weight:&nbsp;</span>
            <span>{playerInfo.player.weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
