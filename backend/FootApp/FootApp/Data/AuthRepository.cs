using FootApp.Dtos;
using FootApp.Helpers;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Security.Cryptography;

namespace FootApp.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _dbContext;
        private readonly AuthHelper _authHelper;

        public AuthRepository(IConfiguration config)
        {
            _dbContext = new DataContext(config);
            _authHelper = new AuthHelper(config);
        }

        public bool RegisterUser(UserForRegistrationDto userForRegistration)
        {
            byte[] passwordSalt = new byte[128 / 8];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetNonZeroBytes(passwordSalt);
            }

            byte[] passwordHash = _authHelper.GetPasswordHash(userForRegistration.Password, passwordSalt);

            string sqlAddAuth = @"
            INSERT INTO GoalVisionSchema.Auth  ([Email],
            [PasswordHash],
            [PasswordSalt]) VALUES ('" + userForRegistration.Email +
                "', @PasswordHash, @PasswordSalt)";

            List<SqlParameter> sqlParameters = new List<SqlParameter>
        {
            new SqlParameter("@PasswordSalt", SqlDbType.VarBinary) { Value = passwordSalt },
            new SqlParameter("@PasswordHash", SqlDbType.VarBinary) { Value = passwordHash }
        };

            if (_dbContext.ExecuteSqlWithParameters(sqlAddAuth, sqlParameters))
            {
                string sqlAddUser = @"
                INSERT INTO GoalVisionSchema.Users(
                    [FirstName],
                    [LastName],
                    [Email],
                    [Active]
                ) VALUES (" +
                        "'" + userForRegistration.FirstName +
                        "', '" + userForRegistration.LastName +
                        "', '" + userForRegistration.Email +
                        "', 1)";
                return _dbContext.ExecuteSql(sqlAddUser);
            }
            return false;
        }

        public bool CheckIfUserExists(string email)
        {
            string sqlCheckUserExists = "SELECT Email FROM GoalVisionSchema.Auth WHERE Email = '" + email + "'";
            IEnumerable<string> existingUsers = _dbContext.LoadData<string>(sqlCheckUserExists);
            return existingUsers.Any();
        }

        public UserForLoginConfirmationDto GetUserHashAndSalt(string email)
        {
            string sqlForHashAndSalt = @"SELECT [PasswordHash], [PasswordSalt] FROM GoalVisionSchema.Auth WHERE Email = '" + email + "'";
            return _dbContext.LoadDataSingle<UserForLoginConfirmationDto>(sqlForHashAndSalt);
        }

        public int GetUserIdByEmail(string email)
        {
            string sql = @"SELECT UserId FROM GoalVisionSchema.Users WHERE Email = '" + email + "'";
            return _dbContext.LoadDataSingle<int>(sql);
        }

        public string GetUserFirstNameByUserId(int id)
        {
            string sql = @"SELECT FirstName FROM GoalVisionSchema.Users WHERE UserId = '" + id + "'";
            return _dbContext.LoadDataSingle<string>(sql);
        }
    }
}
