using FootApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly FavouriteService _favouriteService;

        public FavouritesController(FavouriteService favouriteService)
        {
            _favouriteService = favouriteService;
        }

        [HttpPost("addFav/club/{userId}/{clubId}")]
        public IActionResult AddFavClub(int userId, int clubId)
        {
            if (_favouriteService.AddClubToFavourites(userId, clubId, 0))
            {
                return Ok("Club added to favourites.");
            }
            return BadRequest("Could not add club to favourites.");
        }

        [HttpPost("addFav/player/{userId}/{playerId}/{leagueId}")]
        public IActionResult AddFavPlayer(int userId, int playerId, int leagueId)
        {
            if (_favouriteService.AddPlayerToFavourites(userId, playerId, leagueId))
            {
                return Ok("Player added to favourites.");
            }
            return BadRequest("Could not add player to favourites.");
        }


        [HttpGet("getFav/players/{userId}")]
        public IActionResult GetUserFavPlayers(int userId)
        {
            var favouritePlayers = _favouriteService.GetUserFavouritePlayers(userId);
            return Ok(favouritePlayers);
        }

        [HttpGet("getFav/clubs/{userId}")]
        public IActionResult GetUserFavClubs(int userId)
        {
            var favouriteClubs = _favouriteService.GetUserFavouriteClubs(userId);
            return Ok(favouriteClubs);
        }



        [HttpGet("getFav/{userId}")]
        public IActionResult GetUserFavs(int userId)
        {
            var favourites = _favouriteService.GetUserFavourites(userId);
            return Ok(favourites);
        }

        [HttpGet("isFav/club/{userId}/{clubId}")]
        public IActionResult IsClubFavourite(int userId, int clubId)
        {
            var isFavourite = _favouriteService.IsClubFavourite(userId, clubId);
            return Ok(isFavourite);
        }

        [HttpGet("isFav/player/{userId}/{playerId}/{leagueId}")]
        public IActionResult IsPlayerFavourite(int userId, int playerId, int leagueId)
        {
            var isFavourite = _favouriteService.IsPlayerFavourite(userId, playerId, leagueId);
            return Ok(isFavourite);
        }

        [HttpDelete("removeFav/club/{userId}/{clubId}")]
        public IActionResult RemoveFavClub(int userId, int clubId)
        {
            if (_favouriteService.RemoveClubFromFavourites(userId, clubId))
            {
                return Ok("Club removed from favourites.");
            }
            return BadRequest("Could not remove club from favourites.");
        }

        [HttpDelete("removeFav/player/{userId}/{playerId}/{leagueId}")]
        public IActionResult RemoveFavPlayer(int userId, int playerId, int leagueId)
        {
            if (_favouriteService.RemovePlayerFromFavourites(userId, playerId, leagueId))
            {
                return Ok("Player removed from favourites.");
            }
            return BadRequest("Could not remove player from favourites.");
        }
    }

    public class AddFavouriteRequest
    {
        public int UserId { get; set; }
        public int PlayerId { get; set; }
        public int ClubId { get; set; }
        public int ViewCount { get; set; }
        public int LeagueId { get; set; }
    }
}
