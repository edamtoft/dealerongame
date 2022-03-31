using DealerOn.Metaverse.Web.Contracts;
using DealerOn.Metaverse.Web.Models;
using DealerOn.Metaverse.Web.Options;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Collections.Immutable;

namespace DealerOn.Metaverse.Web.Services
{
  public sealed class InMemoryGameStateService : IGameStateService
  {
    private int _id = 0;
    private int _currentRoom = 0;
    private int _roomOccupancy = 0;
    private readonly object _lock = new();
    private readonly ConcurrentDictionary<string, PlayerRegistration> _players = new();
    private readonly GameOptions _options;

    public InMemoryGameStateService(IOptions<GameOptions> options) => _options = options.Value;

    public PlayerRegistration Register(string connection)
    {
      return _players.GetOrAdd(connection, _ =>
      {
        lock(_lock)
        {
          if (_roomOccupancy >= _options.MaxPlayersPerRoom)
          {
            _roomOccupancy = 0;
            _id = 0;
            _currentRoom++;
          }

          _id++;
          _roomOccupancy++;
          return new PlayerRegistration(_currentRoom, _id);
        }
      });
    }

    public bool TryFind(string connection, out PlayerRegistration registration)
    {
      return _players.TryGetValue(connection, out registration);
    }


    public bool TryRemove(string connection, out PlayerRegistration registration)
    {
      var removed= _players.TryRemove(connection, out registration);
      if (removed)
      {
        lock (_lock)
        {
          if (registration.Room == _currentRoom)
          {
            _roomOccupancy--;
          }
        }
      }
      return removed;
    }
  }
}
