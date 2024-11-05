import classes from "./PlayerAdditionalInfoPage.module.css";
import trophiesData from "../../../data/player/haalandTrophies.json"; // Przykład danych, możesz usunąć, jeśli nieużywane
import transfersData from "../../../data/player/haalandTransfers.json"; // Przykład danych, możesz usunąć, jeśli nieużywane
import { usePlayerTransfersData } from "../../../hooks/usePlayer/usePlayerTransfersData";
import { usePlayerTrophiesData } from "../../../hooks/usePlayer/usePlayerTrophiesData";

export default function PlayerAdditionalInfoPage({ id }) {
  const {
    data: playerTransferData,
    isLoading: transferIsLoading,
    error: transferError,
  } = usePlayerTransfersData(id);

  const {
    data: playerTrophiesData,
    isLoading: trophiesIsLoading,
    error: trophiesError,
  } = usePlayerTrophiesData(id);

  // Zabezpieczenie dla ładowania transferów
  if (transferIsLoading || trophiesIsLoading) {
    return <div>Loading additional player information...</div>;
  }

  // Zabezpieczenie dla błędów transferów
  if (transferError) {
    return <div>Error loading transfers: {transferError.message}</div>;
  }

  // Zabezpieczenie dla błędów trofeów
  if (trophiesError) {
    return <div>Error loading trophies: {trophiesError.message}</div>;
  }

  const trophies = playerTrophiesData?.response || [];
  const transfers = playerTransferData?.response[0] || { transfers: [] };

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
            {transfers.transfers.length > 0 ? (
              transfers.transfers.map((transfer, index) => (
                <li key={index} className={classes.singleTransfer}>
                  <span>{transfer.date}</span>
                  <span>{transfer.teams.out.name}</span>
                  <span>&#129130;</span>
                  <span>{transfer.teams.in.name}</span>
                  <span>{transfer.type}</span>
                </li>
              ))
            ) : (
              <li>No transfers available.</li>
            )}
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
            {trophies.length > 0 ? (
              trophies.map((trophy, index) => (
                <li key={index} className={classes.singleTrophy}>
                  <span>{trophy.league}</span>
                  <span>{trophy.country}</span>
                  <span>{trophy.season}</span>
                  <span>{trophy.place}</span>
                </li>
              ))
            ) : (
              <li>No trophies available.</li>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
