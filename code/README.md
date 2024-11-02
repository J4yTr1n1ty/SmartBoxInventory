# SmartBox

This is a template project containing an Angular application with PWA, Capacitor (Android & IOS) setup.

It is intended to be used in conjunction with a rest api.

## Build/Run

Install all npm packages

``` shell
npm install
```

### Web

You can either run it using Docker or locally

**With Docker**

``` shell
docker compose up
```

You'll need to setup [traefik](https://traefik.io/) to reach the application under `smart-box.test`.
You'll also need to add a hosts file entry `127.0.0.1 smart-box.test`

or you can run it **locally**

``` shell
ng serve
```

This command will serve the application on `localhost:4200`

When working with a backend it is strongly recommended to use the Docker approach since it allows you to get closer to a production environment.

### Android

https://capacitorjs.com/docs/basics/workflow

To update your Android code, run

``` shell
ng build
npx cap sync
```
