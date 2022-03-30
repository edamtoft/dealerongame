using DealerOn.Metaverse.Web.Models;

namespace DealerOn.Metaverse.Web.Contracts
{
  public interface IGameStateService
  {
    List<Player> GetAll();
    int UpdateState(string connection, PlayerState state);
    bool TryRemove(string connection, out int playerId);
  }
}