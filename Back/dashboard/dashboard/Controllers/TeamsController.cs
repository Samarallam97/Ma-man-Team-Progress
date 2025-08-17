using dashboard.Entities;
using dashboard.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace dashboard.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TeamsController : ControllerBase
	{
		private readonly ITeamRepository _teamRepository;

		public TeamsController(ITeamRepository teamRepository)
		{
			_teamRepository=teamRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllStudents()
		{
			var teams = await _teamRepository.GetTeamsWithMembersAsync();
			return Ok(teams);
		}

	}
}