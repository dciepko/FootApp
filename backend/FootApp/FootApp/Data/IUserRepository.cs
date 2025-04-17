using FootApp.Models;
using FootApp.Dtos;

namespace FootApp.Data
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int userId);
        bool UpdateUser(User user);
        bool AddUser(UserToAddDto user);
        bool DeleteUser(int userId);
    }
}
