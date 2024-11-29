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

        public bool IsClubFavourite(int userId, int clubId)
        {
            var existingFavouriteClub = _favouriteRepository.GetFavouriteClub(userId, clubId);
            return existingFavouriteClub != null;
        }

        public bool IsPlayerFavourite(int userId, int playerId, int leagueId)
        {
            var existingFavouritePlayer = _favouriteRepository.GetFavouritePlayer(userId, playerId);
            return existingFavouritePlayer != null && existingFavouritePlayer.LeagueId == leagueId;
        }

        public bool RemoveClubFromFavourites(int userId, int clubId)
        {
            var existingFavouriteClub = _favouriteRepository.GetFavouriteClub(userId, clubId);
            if (existingFavouriteClub != null)
            {
                return _favouriteRepository.RemoveClub(userId, clubId);
            }
            return false;
        }

        public bool RemovePlayerFromFavourites(int userId, int playerId, int leagueId)
        {
            var existingFavouritePlayer = _favouriteRepository.GetFavouritePlayer(userId, playerId);
            if (existingFavouritePlayer != null && existingFavouritePlayer.LeagueId == leagueId)
            {
                return _favouriteRepository.RemovePlayer(userId, playerId);
            }
            return false;
        }

        public bool IncrementClubViewCount(int userId, int clubId)
        {
            var favouriteClub = _favouriteRepository.GetFavouriteClub(userId, clubId);
            if (favouriteClub != null)
            {
                favouriteClub.ViewCount++;
                return _favouriteRepository.UpdateFavouriteClub(favouriteClub);
            }
            return false;
        }

        public bool IncrementPlayerViewCount(int userId, int playerId)
        {
            var favouritePlayer = _favouriteRepository.GetFavouritePlayer(userId, playerId);
            if (favouritePlayer != null)
            {
                favouritePlayer.ViewCount++;
                return _favouriteRepository.UpdateFavouritePlayer(favouritePlayer);
            }
            return false;
        }


    }
}
