using FootApp.Dtos;

namespace FootApp.Data
{
    public interface IAuthRepository
    {
        bool RegisterUser(UserForRegistrationDto userForRegistration);
        bool CheckIfUserExists(string email);
        UserForLoginConfirmationDto GetUserHashAndSalt(string email);
        int GetUserIdByEmail(string email);
        public string GetUserFirstNameByUserId(int id);

    }
}
