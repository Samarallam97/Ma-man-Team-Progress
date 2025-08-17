using dashboard.Entities;
using MongoDB.Driver;
using static dashboard.Repositories.TeamRepository;

namespace dashboard.Repositories
{
	public class TeamRepository : ITeamRepository
	{
		private readonly IMongoCollection<Team> _teams;

		public TeamRepository(IMongoClient client)
		{
			var database = client.GetDatabase("students");
			_teams = database.GetCollection<Team>("teams");
		}

		public async Task<List<TeamWithMembers>> GetTeamsWithMembersAsync()
		{
			var pipeline = _teams.Aggregate()
				.Lookup<Member, TeamWithMembers>(
					foreignCollectionName: "members",
					localField: "members",
					foreignField: "_id",
					@as: "members"
				)
				.As<TeamWithMembers>();

			return await pipeline.ToListAsync();
		}

	}
	
}
