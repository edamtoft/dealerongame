using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Hubs;
using DealerOn.Metaverse.Web.Options;
using DealerOn.Metaverse.Web.Services;
using Microsoft.AspNetCore.Http.Connections;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<GameOptions>(builder.Configuration.GetSection("Game"));
builder.Services.AddSingleton<IGameStateService, InMemoryGameStateService>();
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
  if (app.Environment.IsDevelopment())
  {
    // Ran into apparent issue with websocket proxying
    // with the SPA proxy. Easier to just disable for now.
    options.Transports &= ~HttpTransportType.WebSockets;
  }
});
app.MapFallbackToFile("index.html"); ;

app.Run();
