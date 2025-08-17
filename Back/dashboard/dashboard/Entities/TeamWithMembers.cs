namespace dashboard.Entities
{
	public class TeamWithMembers
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Icon { get; set; }
		public string Color { get; set; }
		public List<Member> Members { get; set; }
	}
}
