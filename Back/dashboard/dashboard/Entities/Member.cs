using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace dashboard.Entities
{
	public class Member
	{
		[BsonId]
		[BsonElement("_id")]
		[JsonPropertyName("id")]
		[BsonRepresentation(BsonType.String)]
		public string Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public double TotalHours { get; set; }
		public double LastWeekHours { get; set; }
		public string GoalStatus { get; set; }
		public string Avatar { get; set; }
		public int OffWeekNumbers { get; set; }

		[BsonIgnore]
		public int ActiveCoursesCount => Courses?.Count(c => c.Progress < 100) ?? 0;

		[BsonIgnore]

		private const int InitialWeeks = 5;

		private DateTime _startDate = new DateTime(2025, 7, 5);

		public int NumberOfWeeks
		{
			get
			{
				if (_startDate == default)
					_startDate = DateTime.Now;

				DateTime now = DateTime.Now;
				int weeks = 0;
				DateTime currentFriday = GetNextFriday(_startDate);

				while (currentFriday <= now)
				{
					weeks++;
					currentFriday = currentFriday.AddDays(7);
				}

				return Math.Max(weeks, InitialWeeks);
			}
		}


		[BsonIgnore]
		public int EffectiveWeeks => NumberOfWeeks - OffWeekNumbers;

		public double AverageWeekHours => Math.Round(TotalHours / EffectiveWeeks, 1);

		private DateTime GetNextFriday(DateTime fromDate)
		{
			int daysUntilFriday = ((int)DayOfWeek.Friday - (int)fromDate.DayOfWeek + 7) % 7;
			return fromDate.Date.AddDays(daysUntilFriday);
		}
		public List<Course> Courses { get; set; }
	}
}
