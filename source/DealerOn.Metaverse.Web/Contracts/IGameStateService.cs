using DealerOn.Metaverse.Web.Models;

namespace DealerOn.Metaverse.Web.Contracts
{
  public interface IGameStateService
  {
    PlayerRegistration Register(string connection);
    bool TryFind(string connection, out PlayerRegistration registration);
    bool TryRemove(string connection, out PlayerRegistration registration);
  }
}