import classes from "./PlayerAdditionalInfoPage.module.css";
import trophiesData from "../../../data/player/haalandTrophies.json";
import transfersData from "../../../data/player/haalandTransfers.json";

export default function PlayerAdditionalInfoPage() {
  const trophies = trophiesData;
  const transfers = transfersData[0];

  return (
    <>
      <div className={classes.transfersContainer}>
        <h2>Transfers:</h2>
        <div className={classes.transferList}>
          <div className={classes.helpBarTransfers}>
            <span>Date</span>
            <span>From</span>
            <span></span>
            <span>To</span>
            <span>Price</span>
          </div>
          <div className={classes.transfersList}>
            {transfers.transfers.map((transfer) => {
              return (
                <li className={classes.singleTransfer}>
                  <span>{transfer.date}</span>
                  <span>{transfer.teams.out.name}</span>
                  <span>&#129130;</span>
                  <span>{transfer.teams.in.name}</span>
                  <span>{transfer.type}</span>
                </li>
              );
            })}
          </div>
        </div>
      </div>
      <div className={classes.trophyContainer}>
        <h2>Trophies:</h2>
        <div className={classes.trophyList}>
          <div className={classes.helpBarTrophies}>
            <span>League</span>
            <span>Country</span>
            <span>Season</span>
            <span>Place</span>
          </div>
          <div className={classes.trophiesList}>
            {trophies.map((trophy) => {
              return (
                <li className={classes.singleTrophy}>
                  <span>{trophy.league}</span>
                  <span>{trophy.country}</span>
                  <span>{trophy.season}</span>
                  <span>{trophy.place}</span>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
