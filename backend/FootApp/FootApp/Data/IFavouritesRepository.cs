﻿using FootApp.Dtos;
using FootApp.Models;
using Microsoft.Data.SqlClient;

namespace FootApp.Data
{
    public interface IFavouritesRepository
    {
        public bool AddClub(int userId, int clubId);

        public bool AddPlayer(int userId, int playerId,  int leagueId);

        public IEnumerable<FavouritePlayer> GetFavouritePlayers(int userId);

        public IEnumerable<FavouriteClub> GetFavouriteClubs(int userId);

        public FavouriteClub GetFavouriteClub(int userId, int clubId);

        public FavouritePlayer GetFavouritePlayer(int userId, int playerId);
        public bool RemovePlayer(int userId, int playerId);
        public bool RemoveClub(int userId, int clubId);
        public bool UpdateFavouriteClub(FavouriteClub club);
        public bool UpdateFavouritePlayer(FavouritePlayer player);




    }
}
