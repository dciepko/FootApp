import { useState } from "react";
import classes from "./TeamTransferPage.module.css";
import seasonsData from "../../../data/team/MUSeasons.json";
import transfersData from "../../../data/team/MUTransfers.json";
import DropdownOption from "../../DropdownOption/DropdownOption";

export default function TeamTransferPage() {
  const availableSeasons = seasonsData;

  const [chosenSeason, setChosenSeason] = useState(
    availableSeasons[availableSeasons.length - 1]
  );

  const selectedTransfers = transfersData.filter((transfer) =>
    transfer.transfers.some(
      (t) => new Date(t.date).getFullYear() === chosenSeason
    )
  );

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <div className={classes.transfersPage}>
      <div className={classes.choosePart}>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={availableSeasons}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
      </div>

      <div className={classes.transfersSection}>
        {selectedTransfers.length > 0 ? (
          <div className={classes.transfersList}>
            {selectedTransfers.map((transfer) => (
              <div key={transfer.player.id} className={classes.transfer}>
                {transfer.transfers
                  .filter(
                    (t) => new Date(t.date).getFullYear() === chosenSeason
                  )
                  .map((t, index) => (
                    <div key={index} className={classes.transferDetails}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {transfer.player.name}
                      </span>
                      <span>{t.teams.out.name}</span>
                      <span>&#129130;</span>
                      <span>{t.teams.in.name}</span>
                      <span className={classes.transferType}>{t.type}</span>
                      <span className={classes.transferDate}>
                        {new Date(t.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No transfers available for this season.</p>
        )}
      </div>
    </div>
  );
}
