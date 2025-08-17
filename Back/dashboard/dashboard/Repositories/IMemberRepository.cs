using dashboard.Entities;

namespace dashboard.Repositories
{
	public interface IMemberRepository
	{
		Task<List<MemberSummary>> GetAllMembersAsync();
		Task<Member> GetMemberByIdAsync(string id);
		Task UpdateMemberAsync(Member member);

	}
}
