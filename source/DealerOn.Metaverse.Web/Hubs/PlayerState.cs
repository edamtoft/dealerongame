namespace DealerOn.Metaverse.Web.Hubs
{
  public record PlayerState(double X, double Y, double XVel, double YVel, string Facing, bool OnGround);
}