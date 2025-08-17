using dashboard.Entities;
using dashboard.Repositories;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace dashboard
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


			var conventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
			ConventionRegistry.Register("CamelCase", conventionPack, t => true);


			builder.Services.AddSingleton<IMongoClient>(new MongoClient(builder.Configuration.GetConnectionString("mongo")));
            builder.Services.AddScoped<ITeamRepository , TeamRepository>();
			builder.Services.AddScoped<IMemberRepository, MemberRepository>();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowAllOrigins", policy =>
				{
					policy
						.AllowAnyOrigin()
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
			});

			var app = builder.Build();

			app.UseCors("AllowAllOrigins");

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
