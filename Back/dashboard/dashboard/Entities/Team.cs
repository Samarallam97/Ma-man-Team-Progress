using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dashboard.Entities
{
	public class Team
	{
		[BsonId]
		[BsonRepresentation(BsonType.String)]
		public string Id { get; set; }
		public string Name { get; set; }
		public string Icon { get; set; }
		public string Color { get; set; }
		public List<string> Members { get; set; }
	}
}
