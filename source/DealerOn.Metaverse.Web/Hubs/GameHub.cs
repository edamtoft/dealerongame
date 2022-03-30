using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Models;
using Microsoft.AspNetCore.SignalR;

namespace DealerOn.Metaverse.Web.Hubs
{
  public sealed class GameHub : Hub
  {
    private readonly IGameStateService _game;

    public GameHub(IGameStateService game) => _game = game;
    
    public async Task<int> UpdateState(PlayerState state)
    {
      var playerId = _game.UpdateState(Context.ConnectionId, state);
      await Clients.Others.SendAsync("playerUpdated", playerId, state, Context.ConnectionAborted);
      return playerId;
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
      if (_game.TryRemove(Context.ConnectionId, out var playerId))
      {
        await Clients.Others.SendAsync("playerLeft", playerId);
      }
    }
  }
}
