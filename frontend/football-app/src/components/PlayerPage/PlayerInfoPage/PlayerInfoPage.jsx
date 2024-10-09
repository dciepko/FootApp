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
        <div className={classes.clubAndCountryImage}>
          {" "}
          <div className={classes.clubImageContainer}>
            <img src={playerInfo.statistics[0].team.logo} alt="Club Logo" />
          </div>
          <div className={classes.countryImageContainer}>
            <img
              src={
                playerInfo.statistics[playerInfo.statistics.length - 1].team
                  .logo
              }
              alt="Club Logo"
            />
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
            <span>{playerInfo.statistics[0].team.name}</span>
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
