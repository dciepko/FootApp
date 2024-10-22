using FootApp.Data;
using FootApp.Dtos;
using FootApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FootApp.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public UserController(IConfiguration config)
    {
        _userRepository = new UserRepository(config);
    }


    [HttpGet("GetUsers")]
    public IActionResult GetUsers()
    {
        var users = _userRepository.GetAllUsers();
        return Ok(users);
    }

    [HttpGet("GetSingleUser/{userId}")]
    public IActionResult GetSingleUser(int userId)
    {
        var user = _userRepository.GetUserById(userId);
        if (user != null)
        {
            return Ok(user);
        }
        return NotFound();
    }

    [HttpPut("EditUser")]
    public IActionResult EditUser(User user)
    {
        if (_userRepository.UpdateUser(user))
        {
            return Ok();
        }
        return StatusCode(500, "Failed to Update User");
    }

    [HttpPost("AddUser")]
    public IActionResult AddUser(UserToAddDto userDto)
    {
        if (_userRepository.AddUser(userDto))
        {
            return Ok();
        }
        return StatusCode(500, "Failed to Add User");
    }

    [HttpDelete("DeleteUser/{userId}")]
    public IActionResult DeleteUser(int userId)
    {
        if (_userRepository.DeleteUser(userId))
        {
            return Ok();
        }
        return StatusCode(500, "Failed to Delete User");
    }
}
