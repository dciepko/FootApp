import { useEffect, useState } from "react";
import classes from "./AdditionalContainer.module.css";
import star from "../../../assets/Star_Full.png";
import { useAuth } from "../../../context/AuthContext";
import DotNavigation from "../../DotNavigation/DotNavigation";
import { Link } from "react-router-dom";

export default function AdditionalContainer() {
  const { user } = useAuth();
  const [hasFavourites, setHasFavourites] = useState(null);
  const [favouritesData, setFavouritesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  console.log(favouritesData);
  useEffect(() => {
    if (user) {
      const userId = user.id;
      const checkFavourites = async () => {
        try {
          const response = await fetch(
            `http://localhost:5156/api/favourites/getFav/${userId}`
          );
          const data = await response.json();

          if (data && data.length > 0) {
            setHasFavourites(true);

            const fetchedData = await Promise.all(
              data.map(async (fav) => {
                let favDetails = null;

                if (fav.type === "Player") {
                  const playerResponse = await fetch(
                    "http://localhost:5156/api/APIFootball",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(`/players?id=${fav.id}&season=2024`),
                    }
                  );
                  favDetails = await playerResponse.json();
                } else if (fav.type === "Club") {
                  const teamResponse = await fetch(
                    "http://localhost:5156/api/APIFootball",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(`/teams?id=${fav.id}`),
                    }
                  );
                  favDetails = await teamResponse.json();
                }

                return favDetails?.response?.[0] || null;
              })
            );

            setFavouritesData(fetchedData.filter((item) => item !== null));
          } else {
            setHasFavourites(false);
          }
        } catch (error) {
          console.error("Error fetching favourites:", error);
          setHasFavourites(false);
        }
      };

      checkFavourites();
    } else {
      setHasFavourites(null);
    }
  }, [user]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleLinkClick = async (fav) => {
    try {
      if (fav.team) {
        await fetch(
          `http://localhost:5156/api/favourites/incrementView/club/${user.id}/${fav.team.id}`,
          { method: "POST" }
        );
      } else if (fav.player) {
        await fetch(
          `http://localhost:5156/api/favourites/incrementView/player/${user.id}/${fav.player.id}`,
          { method: "POST" }
        );
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  return (
    <div className={classes.additionalContent}>
      <img className={classes.star} src={star} alt="star" />
      {user === null ? (
        <h2 className={classes.announceText}>
          Login to check your favourites!
        </h2>
      ) : hasFavourites === null ? (
        <h2 className={classes.announceText}>Loading favourites...</h2>
      ) : hasFavourites ? (
        <>
          <div className={classes.favouritesContainer}>
            {favouritesData.length > 0 && (
              <Link
                onClick={() => handleLinkClick(favouritesData[currentPage])}
                className="disablingLinks"
                to={
                  favouritesData[currentPage].team
                    ? `/team/${favouritesData[currentPage].team.id}`
                    : `/player/${favouritesData[currentPage].player.id}`
                }
              >
                <div className={classes.favouriteItem}>
                  <h2>
                    {favouritesData[currentPage].team
                      ? favouritesData[currentPage].team.name
                      : favouritesData[currentPage].player.name}
                  </h2>
                  <div className={classes.favoruiteImg}>
                    <img
                      src={
                        favouritesData[currentPage].team
                          ? favouritesData[currentPage].team.logo
                          : favouritesData[currentPage].player.photo
                      }
                      alt="Favourite's image"
                    />
                  </div>
                </div>
              </Link>
            )}
            <DotNavigation
              pages={favouritesData.map((_, index) => index)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              additionalStyle={{ position: "absolute", bottom: 0 }}
            />
          </div>
        </>
      ) : (
        <h2>You don't have any favourites added!</h2>
      )}
    </div>
  );
}
