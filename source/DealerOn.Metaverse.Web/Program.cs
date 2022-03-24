using DealerOn.Metaverse.Web.Hubs;
using Microsoft.AspNetCore.Http.Connections;

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
  if (app.Environment.IsDevelopment())
  {
    options.Transports &= ~HttpTransportType.WebSockets;
  }
});
app.MapFallbackToFile("index.html"); ;

app.Run();
