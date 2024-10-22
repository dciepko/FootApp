using FootApp.Models;

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
                FROM GoalVisionDB.Users";

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
                FROM GoalVisionDB.Users
                WHERE UserId = @UserId";

            return _dbContext.LoadDataSingle<User>(sql);
        }

        public bool UpdateUser(User user)
        {
            string sql = @"
                UPDATE GoalVisionDB.Users
                SET FirstName = @FirstName, 
                    LastName = @LastName,
                    Email = @Email, 
                    Active = @Active
                WHERE UserId = @UserId";

            return _dbContext.ExecuteSql(sql);
        }

        public bool AddUser(User user)
        {
            string sql = @"
                INSERT INTO GoalVisionDB.Users 
                (FirstName, LastName, Email, Active) 
                VALUES (@FirstName, @LastName, @Email, @Active)";

            return _dbContext.ExecuteSql(sql);
        }

        public bool DeleteUser(int userId)
        {
            string sql = "DELETE FROM GoalVisionDB.Users WHERE UserId = @UserId";
            return _dbContext.ExecuteSql(sql);
        }
    }
}
