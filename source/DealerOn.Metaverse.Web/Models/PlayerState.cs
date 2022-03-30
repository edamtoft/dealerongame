namespace DealerOn.Metaverse.Web.Models
{
  public record struct PlayerState(
    double X, 
    double Y, 
    double XVel, 
    double YVel, 
    string Facing, 
    bool OnGround);
}