import { useEffect, useState } from "react";
import classes from "./FavouriteSign.module.css";
import emptyImg from "../../assets/icons8-favourite-empty.png";
import fullImg from "../../assets/icons8-favourite-full.png";

export default function FavouriteSign({ type, user, entityId, leagueId }) {
  const [isFavourite, setIsFavourite] = useState(null);

  useEffect(() => {
    if (!user || !entityId || (type === "player" && !leagueId)) return;

    const fetchFavouriteStatus = async () => {
      const url =
        type === "player"
          ? `http://localhost:5156/api/favourites/isFav/player/${user}/${entityId}/${leagueId}`
          : `http://localhost:5156/api/favourites/isFav/club/${user}/${entityId}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setIsFavourite(result);
      } catch (error) {
        console.error("Error fetching favourite status:", error);
        setIsFavourite(false);
      }
    };

    fetchFavouriteStatus();
  }, [type, user, entityId, leagueId]);

  const toggleFavourite = async () => {
    if (!user || !entityId || (type === "player" && !leagueId)) return;

    const url = isFavourite
      ? type === "player"
        ? `http://localhost:5156/api/favourites/removeFav/player/${user}/${entityId}/${leagueId}`
        : `http://localhost:5156/api/favourites/removeFav/club/${user}/${entityId}`
      : type === "player"
      ? `http://localhost:5156/api/favourites/addFav/player/${user}/${entityId}/${leagueId}`
      : `http://localhost:5156/api/Favourites/addFav/club/${user}/${entityId}`;

    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(url, { method });
      if (response.ok) {
        setIsFavourite(!isFavourite);
      } else {
        console.error("Failed to update favourite status.");
      }
    } catch (error) {
      console.error("Error updating favourite status:", error);
    }
  };

  if (isFavourite === null) {
    return <div className={classes.starContainer}>Loading...</div>;
  }

  return (
    <div className={classes.starContainer} onClick={toggleFavourite}>
      {isFavourite ? (
        <span className={classes.favourite}>
          <img src={fullImg} alt="Favourite" />
        </span>
      ) : (
        <span className={classes.notFavourite}>
          <img src={emptyImg} alt="Not Favourite" />
        </span>
      )}
    </div>
  );
}
