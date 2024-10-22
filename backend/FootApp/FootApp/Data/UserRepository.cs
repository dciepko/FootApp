using FootApp.Models;
using FootApp.Dtos;

namespace FootApp.Data
{
    public class UserRepository
    {
        private readonly DataContext _dbContext;

        public UserRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetAllUsers()
        {
            string sql = @"
                SELECT [UserId],
                    [FirstName],
                    [LastName],
                    [Email],
                    [Active] 
                FROM TutorialAppSchema.Users";

            return _dbContext.LoadData<User>(sql);
        }

        public User GetUserById(int userId)
        {
            string sql = @"
                SELECT [UserId],
                    [FirstName],
                    [LastName],
                    [Email],
                    [Active] 
                FROM TutorialAppSchema.Users
                WHERE UserId = @UserId";

            return _dbContext.LoadDataSingle<User>(sql);
        }

        public bool UpdateUser(User user)
        {
            string sql = @"
                UPDATE TutorialAppSchema.Users
                SET FirstName = @FirstName, 
                    LastName = @LastName,
                    Email = @Email, 
                    Gender = @Gender, 
                    Active = @Active
                WHERE UserId = @UserId";

            return _dbContext.ExecuteSql(sql);
        }

        public bool AddUser(UserToAddDto userDto)
        {
            var parameters = new
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Gender = userDto.Gender,
                Active = userDto.Active
            };

            string sql = @"
                INSERT INTO TutorialAppSchema.Users 
                (FirstName, LastName, Email, Active) 
                VALUES (@FirstName, @LastName, @Email, @Active)";

     
            return _dbContext.ExecuteSql(sql);
        }

        public bool DeleteUser(int userId)
        {
            string sql = "DELETE FROM TutorialAppSchema.Users WHERE UserId = @UserId";
            return _dbContext.ExecuteSql(sql);
        }
    }
}
