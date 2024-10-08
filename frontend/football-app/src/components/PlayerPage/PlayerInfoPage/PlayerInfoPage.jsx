import classes from "./PlayerInfoPage.module.css";
import infoData from "../../../data/player/haaland.json";

export default function PlayerInfoPage() {
  const playerInfo = infoData[0];
  return (
    <div className={classes.infoContainer}>
      <div className={classes.imagesPart}>
        <div className={classes.faceImageContainer}>
          <img src={playerInfo.player.photo} alt="Player face" />
        </div>
        <div className={classes.clubImageContainer}>
          <img src={playerInfo.statistics[0].team.logo} alt="Club Logo" />
        </div>
        <div className={classes.countryImageContainer}>
          <img
            src={
              playerInfo.statistics[playerInfo.statistics.length - 1].team.logo
            }
            alt="Club Logo"
          />
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
          <span>Nationality:&nbsp;{playerInfo.player.nationality}</span>
          <span>Club:&nbsp;{playerInfo.player.nationality}</span>
          <span>
            Birth date:&nbsp;{playerInfo.player.birth.date}&nbsp;
            {playerInfo.player.age}&nbsp;Years&nbsp;Old
          </span>
          <span>
            Birthplace:&nbsp;{playerInfo.player.birth.place},&nbsp;
            {playerInfo.player.birth.country}
          </span>
          <span>Height:&nbsp;{playerInfo.player.height}</span>
          <span>Weight:&nbsp;{playerInfo.player.weight}</span>
        </div>
      </div>
    </div>
  );
}
