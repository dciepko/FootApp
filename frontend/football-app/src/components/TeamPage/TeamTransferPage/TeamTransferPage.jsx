import { useState } from "react";
import classes from "./TeamTransferPage.module.css";
import DropdownOption from "../../DropdownOption/DropdownOption";
import { Link } from "react-router-dom";
import { useTeamTransfersData } from "../../../hooks/useTeam/useTeamTransfersData";

export default function TeamTransferPage({ data, id }) {
  const leaguesData = data[1].response;
  const availableSeasons = Array.from(
    new Set(
      leaguesData.flatMap((league) =>
        league.seasons.map((season) => season.year)
      )
    )
  ).sort((a, b) => b - a);

  const [chosenSeason, setChosenSeason] = useState(availableSeasons[0]);

  const {
    data: teamTransfersData,
    isLoading,
    error,
  } = useTeamTransfersData(data[0].response[0].team.id);

  if (isLoading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={classes.error}>Error: {error.message}</div>;
  }

  if (!teamTransfersData) {
    return <div className={classes.error}>No statistics available.</div>;
  }

  const selectedTransfers = teamTransfersData.response.filter((transfer) =>
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
                        <Link
                          className="disablingLinks"
                          to={`/player/${transfer.player.id}`}
                        >
                          {transfer.player.name}
                        </Link>
                      </span>
                      <span>
                        <Link
                          className="disablingLinks"
                          to={`/team/${t.teams.out.id}`}
                        >
                          {t.teams.out.name}
                        </Link>
                      </span>
                      <span>&#129130;</span>
                      <span>
                        {" "}
                        <Link
                          className="disablingLinks"
                          to={`/team/${t.teams.in.id}`}
                        >
                          {t.teams.in.name}
                        </Link>
                      </span>
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
