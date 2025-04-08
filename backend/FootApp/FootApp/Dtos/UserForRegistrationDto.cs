using System.ComponentModel.DataAnnotations;

namespace FootApp.Dtos
{
    public partial class UserForRegistrationDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
        [Required]
        public string Password { get; set; } = "";
        [Required]
        public string PasswordConfirm { get; set; } = "";
        [Required]
        public string FirstName { get; set; } = "";
        [Required]
        public string LastName { get; set; } = "";
 
    }
}
