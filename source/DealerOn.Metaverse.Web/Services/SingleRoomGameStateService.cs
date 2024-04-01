using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Models;
using System.Collections.Concurrent;

namespace DealerOn.Metaverse.Web.Services
{
  public sealed class SingleROomGameStateService : IGameStateService
  {
    private int _id = 0;
    private readonly ConcurrentDictionary<string, PlayerRegistration> _players = new();

    public PlayerRegistration Register(string connection)
    {
      return _players.GetOrAdd(connection, _ =>
      {
        var id = Interlocked.Increment(ref _id);
        return new PlayerRegistration(0, id);
      });
    }

    public bool TryFind(string connection, out PlayerRegistration registration)
    {
      return _players.TryGetValue(connection, out registration);
    }


    public bool TryRemove(string connection, out PlayerRegistration registration)
    {
      return _players.TryRemove(connection, out registration);
    }
  }
}
