using FootApp.Data;
using FootApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace FootApp.Services
{
    public class FavouriteService
    {
        private readonly IFavouritesRepository _favouriteRepository;

        public FavouriteService(IFavouritesRepository favouriteRepository)
        {
            _favouriteRepository = favouriteRepository;
        }

        public bool AddClubToFavourites(int userId, int clubId, int viewCount)
        {
            var existingFavouriteClub = _favouriteRepository.GetFavouriteClub(userId, clubId);

            if (existingFavouriteClub == null)
            {
                return _favouriteRepository.AddClub(userId, clubId);
            }
            else return false;
        }

        public bool AddPlayerToFavourites(int userId, int playerId, int leagueId)
        {
            var existingFavouritePlayer = _favouriteRepository.GetFavouritePlayer(userId, playerId);

            if (existingFavouritePlayer == null)
            {
                return _favouriteRepository.AddPlayer(userId, playerId, leagueId);
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<FavouritePlayer> GetUserFavouritePlayers(int userId)
        {
            return _favouriteRepository.GetFavouritePlayers(userId);
        }

        public IEnumerable<FavouriteClub> GetUserFavouriteClubs(int userId)
        {
            return _favouriteRepository.GetFavouriteClubs(userId);
        }

        public object GetUserFavourites(int userId)
        {
            var favouritePlayers = GetUserFavouritePlayers(userId)
                .Select(player => new
                {
                    Type = "Player",
                    Id = player.PlayerId,
                    ViewCounts = player.ViewCount,
                    League = player.LeagueId
                });

            var favouriteClubs = GetUserFavouriteClubs(userId)
                .Select(club => new
                {
                    Type = "Club",
                    Id = club.ClubId,
                    ViewCounts = club.ViewCount,
                    League = 0
                });

            var allFavourites = favouritePlayers.Concat(favouriteClubs).ToList();


            var random = new Random();
            return allFavourites
                .OrderByDescending(f => f.ViewCounts) 
                .ThenBy(_ => random.Next());       
        }
    }
}
