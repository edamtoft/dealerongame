﻿using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Models;
using Microsoft.AspNetCore.SignalR;

namespace DealerOn.Metaverse.Web.Hubs
{
  public sealed class GameHub : Hub
  {
    private readonly IGameStateService _game;

    public GameHub(IGameStateService game) => _game = game;
    
    public async Task<int> Register()
    {
      var registration = _game.Register(Context.ConnectionId);
      await Groups.AddToGroupAsync(Context.ConnectionId, $"room-{registration.Room}", Context.ConnectionAborted);
      return registration.PlayerId;
    }

    public async Task UpdateState(PlayerState state)
    {
      if (_game.TryFind(Context.ConnectionId, out var registration))
      {
        await Clients
          .OthersInGroup($"room-{registration.Room}")
          .SendAsync("playerUpdated", registration.PlayerId, state, Context.ConnectionAborted);
      }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
      if (_game.TryRemove(Context.ConnectionId, out var registration))
      {
        await Clients
          .OthersInGroup($"room-{registration.Room}")
          .SendAsync("playerLeft", registration.PlayerId);
      }
    }
  }
}
