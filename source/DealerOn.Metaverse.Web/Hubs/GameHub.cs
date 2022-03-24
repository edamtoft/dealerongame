using Microsoft.AspNetCore.SignalR;

namespace DealerOn.Metaverse.Web.Hubs
{
  public sealed class GameHub : Hub
  {
    public async Task UpdatePosition(PlayerState state)
    {
      await Clients.Others.SendAsync("playerUpdate", Context.ConnectionId, state);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
      await Clients.Others.SendAsync("playerLeft", Context.ConnectionId);
    }
  }
}
