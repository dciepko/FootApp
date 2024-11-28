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

        [HttpPost("addFav/club")]
        public IActionResult AddFavClub([FromBody] AddFavouriteRequest request)
        {
            if (_favouriteService.AddClubToFavourites(request.UserId, request.ClubId, request.ViewCount))
            {
                return Ok("Club added to favourites.");
            }
            return BadRequest("Could not add club to favourites.");
        }

        [HttpPost("addFav/player")]
        public IActionResult AddFavPlayer([FromBody] AddFavouriteRequest request)
        {
            if (_favouriteService.AddPlayerToFavourites(request.UserId, request.PlayerId, request.LeagueId))
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
