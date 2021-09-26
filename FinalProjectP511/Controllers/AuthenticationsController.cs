using Logo.Application.Authentication;
using Logo.Application.Helpers.Services;
using Logo.Application.Models.DataContext;
using Logo.Application.Models.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Logo.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthenticationsController : ControllerBase
    {
        private readonly UserManager<LogoUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        public AuthenticationsController(UserManager<LogoUser> _userManager, RoleManager<IdentityRole> _roleManager, IConfiguration _configuration)
        {
            this.userManager = _userManager;
            this.roleManager = _roleManager;
            configuration = _configuration;
        }
        [HttpPost]
        [Route("register")]
        public async Task< IActionResult> Register([FromBody] Register model)
        {
            var userExist = await userManager.FindByNameAsync(model.Name);
            if (userExist!=null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User is already exist" });
           }
            LogoUser user = new LogoUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName=model.Name
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var message = string.Join(", ", result.Errors.Select(x => "Code " + x.Code + " Description" + x.Description));
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = message });
            }
            return Ok(new Response { Status = "Succeed", Message = "User Created successfully" });
            //123123werrrA!
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await userManager.FindByNameAsync(model.Name);
            if (user != null&& await userManager.CheckPasswordAsync(user,model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    };
                var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                foreach (var userRole in userRoles)
                {

                }
                var token = new JwtSecurityToken
                (
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                    ); 
                return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    });

            }
            return Unauthorized();
        
            //123123werrrA!
        }
    }
}
