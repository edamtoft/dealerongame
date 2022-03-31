# DealerOn Metaverse Game

This multiplayer platformer game was developed as part of an april fools prank at [DealerOn](https://dealeron.com).

## Running this Application

### Docker

To build locally and run via docker, call:

```
docker build -t metaverse:local .
docker run -it -p 8080:80 metaverse:local
```

### Visual Studio

This application should run out-of-the-box with visual studio with the included launch settings. It uses SpaProxy middleware to provide live hot module replacement
of front-end files.

## Configuration

The following environment variables can be used to configure the application:

|Variable|Description|Default|
|---|---|---|
|Game:MaxPlayersPerRoom|Maximum number of active players before a new 'room' is created|100|