using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Models;
using System.Collections.Concurrent;

namespace DealerOn.Metaverse.Web.Services
{
  public sealed class InMemoryGameStateService : IGameStateService
  {
    private volatile int _id = 0;
    private readonly ConcurrentDictionary<string, Player> _players = new();

    public int UpdateState(string connection, PlayerState state)
    {
      var player = _players.AddOrUpdate(connection, 
        _ => new Player(Interlocked.Increment(ref _id), state), 
        (_, player) => player with { State = state });

      return player.Id;
    }


    public bool TryRemove(string connection, out int playerId)
    {
      if (_players.TryRemove(connection, out var player))
      {
        playerId = player.Id;
        return true;
      };
      playerId = default;
      return false;
    }

    public List<Player> GetAll() => _players.Values.ToList();
  }
}
