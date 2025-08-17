using dashboard.Entities;
using dashboard.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dashboard.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MembersController : ControllerBase
	{
		private readonly IMemberRepository _memberRepository;

		public MembersController(IMemberRepository memberRepository)
		{
			_memberRepository=memberRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetMembers()
		{
			var members = await _memberRepository.GetAllMembersAsync();

			return Ok(members);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetMemberById(string id)
		{
			var member = await _memberRepository.GetMemberByIdAsync(id);

			return Ok(member);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateMember(string id , [FromBody] Member member)
		{
			await _memberRepository.UpdateMemberAsync(member);

			return Ok(member);
		}
	}
}
