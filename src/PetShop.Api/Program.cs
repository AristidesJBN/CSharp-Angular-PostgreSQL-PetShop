using PetShop.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("AngularClient");
app.UseAuthentication();
app.UseAuthorization();

await app.SeedAsync();

app.MapControllers();

app.Run();
