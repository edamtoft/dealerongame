namespace DealerOn.Metaverse.Web.Models
{
  public record struct PlayerState(
    string Name, 
    double X, 
    double Y, 
    double XVel, 
    double YVel, 
    string Facing, 
    bool OnGround);
}