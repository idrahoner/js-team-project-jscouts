import Darkmode from 'darkmode-js';
export const options = {
  bottom: '32px',
  right: '32px',
  left: 'unset',
  time: '0.3s',
  mixColor: '#fff',
  backgroundColor: '#fff',
  buttonColorDark: '#100f2c',
  buttonColorLight: '#fff',
  saveInCookies: true,
  label: '🌓',
  autoMatchOsTheme: true,
};

export const darkmode = new Darkmode(options);
darkmode.showWidget();
