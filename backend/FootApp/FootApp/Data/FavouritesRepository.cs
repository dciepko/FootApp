﻿using FootApp.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace FootApp.Data
{
    public class FavouritesRepository(DataContext dataContext) : IFavouritesRepository
    {
        private readonly DataContext _dataContext = dataContext;

        public bool AddClub(int userId, int clubId)
        {
            var sql = "INSERT INTO GoalVisionSchema.FavouriteClubs (UserId, ClubId, ViewCount) VALUES (@UserId, @ClubId, 0)";
            return _dataContext.ExecuteSqlWithParameters(sql, new List<SqlParameter>
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@ClubId", clubId),
            });
        }

        public bool AddPlayer(int userId, int playerId, int leagueId)
        {
            var sql = "INSERT INTO GoalVisionSchema.FavouritePlayers (UserId, PlayerId, ViewCount, LeagueId) VALUES (@UserId, @PlayerId, 0, @leagueId)";
            return _dataContext.ExecuteSqlWithParameters(sql, new List<SqlParameter>
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@PlayerId", playerId),
                new SqlParameter("@leagueId", leagueId)
            });
        }

        public IEnumerable<FavouritePlayer> GetFavouritePlayers(int userId)
        {
            var sql = $"SELECT * FROM GoalVisionSchema.FavouritePlayers WHERE UserId = {userId}";
            return _dataContext.LoadData<FavouritePlayer>(sql);
        }

        public IEnumerable<FavouriteClub> GetFavouriteClubs(int userId)
        {
            var sql = $"SELECT * FROM GoalVisionSchema.FavouriteClubs WHERE UserId = {userId}";
            return _dataContext.LoadData<FavouriteClub>(sql);
        }

        public FavouriteClub GetFavouriteClub(int userId, int clubId)
        {
            var sql = $"SELECT * FROM GoalVisionSchema.FavouriteClubs WHERE UserId = {userId}  AND ClubId = {clubId}";
            return _dataContext.LoadDataSingle<FavouriteClub>(sql);
        }

        public FavouritePlayer GetFavouritePlayer(int userId, int playerId)
        {
            var sql = $"SELECT * FROM GoalVisionSchema.FavouritePlayers WHERE UserId = {userId} AND PlayerId = {playerId}";
            return _dataContext.LoadDataSingle<FavouritePlayer>(sql);
        }
    }
}
