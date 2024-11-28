namespace FootApp.Models
{
    public class FavouritePlayer
    {
        public int Id { get; set; } 
        public int UserId { get; set; }  
        public int PlayerId { get; set; } 
        public int ViewCount { get; set; }  
        public int LeagueId { get; set; }

        public FavouritePlayer()
        {
        }
    }
}
