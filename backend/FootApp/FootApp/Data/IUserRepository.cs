using FootApp.Models;

namespace FootApp.Data
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int userId);
        bool UpdateUser(User user);
        bool AddUser(User user);
        bool DeleteUser(int userId);
    }
}
