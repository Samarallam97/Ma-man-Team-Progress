using dashboard.Entities;

namespace dashboard.Repositories
{
	public interface ITeamRepository
	{
		Task<List<TeamWithMembers>> GetTeamsWithMembersAsync();
	}
}
