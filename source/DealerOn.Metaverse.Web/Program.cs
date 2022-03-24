using DealerOn.Metaverse.Web.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapHub<GameHub>("/push", options =>
{
  options.Transports = Microsoft.AspNetCore.Http.Connections.HttpTransportType.ServerSentEvents;
});
app.MapFallbackToFile("index.html"); ;

app.Run();
