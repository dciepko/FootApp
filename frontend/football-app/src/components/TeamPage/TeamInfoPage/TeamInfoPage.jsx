import { useAuth } from "../../../context/AuthContext";
import FavouriteSign from "../../FavouriteSign/FavouriteSign";
import classes from "./TeamInfoPage.module.css";

export default function TeamInfoPage({ data }) {
  const teamInfo = data[0].response[0];
  const { user } = useAuth();

  return (
    <div className={classes.infoContainer}>
      <div className={classes.imagesPart}>
        {user !== null && (
          <FavouriteSign
            type={"team"}
            user={user.id}
            entityId={teamInfo.team.id}
          />
        )}
        <div className={classes.logoImageContainer}>
          <img src={teamInfo.team.logo} alt="Team logo" />
        </div>
      </div>
      <div className={classes.infoPart}>
        <div className={classes.namesPart}>
          <div className={classes.name}>{teamInfo.team.name}</div>
          <div className={classes.code}>{teamInfo.team.code}</div>
        </div>
        <div className={classes.restInfoPart}>
          <div>
            <span>Country:&nbsp;</span>
            <span>{teamInfo.team.country}</span>
          </div>
          <div>
            <span>Founded:&nbsp;</span>
            <span>{teamInfo.team.founded}</span>
          </div>
          <div>
            <span>Stadium:&nbsp;</span>
            <span>{teamInfo.venue.name}</span>
          </div>
          <div>
            <span>Capacity:&nbsp;</span>
            <span>{teamInfo.venue.capacity}</span>
          </div>
          <div>
            <span>Address:&nbsp;</span>
            <span>
              {teamInfo.venue.address},&nbsp;{teamInfo.venue.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
