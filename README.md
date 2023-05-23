# Setup

## Requirements

- A Mac, Linux, Windows computer.
- [NVM](https://github.com/creationix/nvm).
- [NodeJS](https://nodejs.org/). Install using nvm > 10: example: `nvm install v16.18.1`. Remember to add `nvm use v16.18.1` to your preferred shell startup file. I'm using `v12.19.0`
- You may need to install npm globally `npm install -g npm`.
- It is recommended you restart your shell to ensure changes added the startup file are applied.

## Developing

**Clone this repository**

```bash
$ git clone https://github.com/4sskick/rn_minima_weather.git
```

**Install**

```bash
$ cd rn_minima_weather
$ npm install or yarn install or yarn
```

### Running on iOS simulator

- Cd folder IOS `cd ios` and `pod install`
- After install back folder `cd ..`
- Run `yarn start` and `yarn ios`

### Running on Android simulator

- Install dependency `yarn install`
- Run `yarn start` and `yarn android`
