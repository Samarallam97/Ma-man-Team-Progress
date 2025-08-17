using MongoDB.Bson.Serialization.Attributes;

namespace dashboard.Entities
{
	public class Course
	{
		public string CrsId { get; set; }
		public string Name { get; set; }
		public double TotalHours { get; set; }
		public double ElapsedHours { get; set; }

		[BsonIgnore]
		public double Progress => TotalHours > 0
								? Math.Round((ElapsedHours / TotalHours) * 100, 1)
								: 0;

	}
}
