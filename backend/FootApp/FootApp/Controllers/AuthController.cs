using FootApp.Data;
using FootApp.Dtos;
using FootApp.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly AuthHelper _authHelper;

        public AuthController(IAuthRepository authRepo, AuthHelper authHelper)
        {
            _authRepo = authRepo;
            _authHelper = authHelper;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register(UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration.Password != userForRegistration.PasswordConfirm)
            {
                return BadRequest("Passwords do not match!");
            }

            if (_authRepo.CheckIfUserExists(userForRegistration.Email))
            {
                return BadRequest("User with this email already exists!");
            }

            if (_authRepo.RegisterUser(userForRegistration))
            {
                return Ok();
            }

            throw new Exception("Failed to register user.");
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login(UserForLoginDto userForLogin)
        {
            var userForConfirmation = _authRepo.GetUserHashAndSalt(userForLogin.Email);

            byte[] passwordHash = _authHelper.GetPasswordHash(userForLogin.Password, userForConfirmation.PasswordSalt);

            for (int index = 0; index < passwordHash.Length; index++)
            {
                if (passwordHash[index] != userForConfirmation.PasswordHash[index])
                {
                    return Unauthorized("Incorrect password!");
                }
            }

            int userId = _authRepo.GetUserIdByEmail(userForLogin.Email);

            return Ok(new Dictionary<string, string> {
                {"token", _authHelper.CreateToken(userId)}
            });
        }

        [HttpGet("RefreshToken")]
        public string RefreshToken()
        {
            int userId = int.Parse(User.FindFirst("userId")?.Value);
            return _authHelper.CreateToken(userId);
        }
    }
}
