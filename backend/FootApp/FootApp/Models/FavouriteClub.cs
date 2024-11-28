namespace FootApp.Models
{
    public class FavouriteClub
    {
        public int Id { get; set; }  
        public int UserId { get; set; }  
        public int ClubId { get; set; }  
        public int ViewCount { get; set; }  

        public FavouriteClub()
        {
        }
    }
}
