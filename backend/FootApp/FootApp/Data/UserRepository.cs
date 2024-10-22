using FootApp.Models;
using FootApp.Dtos;
using Microsoft.Data.SqlClient;
using System.Data;

namespace FootApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dbContext;

        public UserRepository(IConfiguration config)
        {
            _dbContext = new DataContext(config);
        }

        public IEnumerable<User> GetAllUsers()
        {
            string sql = @"
                SELECT [UserId],
                    [FirstName],
                    [LastName],
                    [Email],
                    [Active] 
                FROM GoalVisionSchema.Users";

            return _dbContext.LoadData<User>(sql);
        }

        public User GetUserById(int userId)
        {
            string sql = $@"
                SELECT [UserId],
                    [FirstName],
                    [LastName],
                    [Email],
                    [Active] 
                FROM GoalVisionSchema.Users
                WHERE UserId = {userId}";

            return _dbContext.LoadDataSingle<User>(sql);
        }

        public bool UpdateUser(User user)
        {
            string sql = $@"
                UPDATE GoalVisionSchema.Users
                SET FirstName = '{user.FirstName}', 
                    LastName = '{user.LastName}',
                    Email = '{user.Email}', 
                    Active = {user.Active}
                WHERE UserId = {user.UserId}";

            return _dbContext.ExecuteSql(sql);
        }

        public bool AddUser(UserToAddDto userDto)
        {
      

            string sql = @"
                INSERT INTO GoalVisionSchema.Users 
                (FirstName, LastName, Email, Active) 
                VALUES (@FirstName, @LastName, @Email, @Active)";
            var parameters = new List<SqlParameter>
            {
                new SqlParameter("@FirstName", SqlDbType.NVarChar) { Value = userDto.FirstName },
                new SqlParameter("@LastName", SqlDbType.NVarChar) { Value = userDto.LastName },
                new SqlParameter("@Email", SqlDbType.NVarChar) { Value = userDto.Email },
                new SqlParameter("@Active", SqlDbType.Bit) { Value = userDto.Active }
            };

            return _dbContext.ExecuteSqlWithParameters(sql, parameters);
        }

        public bool DeleteUser(int userId)
        {
            string sql = $"DELETE FROM GoalVisionSchema.Users WHERE UserId = {userId}";
            return _dbContext.ExecuteSql(sql);
        }
    }
}
