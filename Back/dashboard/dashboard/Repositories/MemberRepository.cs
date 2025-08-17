using dashboard.Entities;
using MongoDB.Driver;

namespace dashboard.Repositories
{
	public class MemberRepository : IMemberRepository
	{
		private readonly IMongoCollection<Member> _members;

		public MemberRepository(IMongoClient client)
		{
			var database = client.GetDatabase("students");
			_members = database.GetCollection<Member>("members");
		}

		public async Task<List<MemberSummary>> GetAllMembersAsync()
		{
			var projection = Builders<Member>.Projection
									.Include(m => m.Id)
									.Include(m => m.Name);

			var result = await  _members
											.Find(FilterDefinition<Member>.Empty)
											.Project<Member>(projection)
											.ToListAsync();

			var studentsSummary = new List<MemberSummary>();

			foreach (var item in result)
			{
				var memeber = new MemberSummary()
				{
					Id = item.Id,
					Name = item.Name,
				};
				studentsSummary.Add(memeber);
			}

			return studentsSummary;
		}

		public async Task<Member> GetMemberByIdAsync(string id)
		{
			return await _members.Find(s => s.Id == id).FirstOrDefaultAsync();
		}

		public async Task UpdateMemberAsync(Member member)
		{
			 await _members.ReplaceOneAsync(s => s.Id == member.Id, member);
		}
	}
}
