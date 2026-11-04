const target = document.querySelector('#target');
const browserData = navigator.userAgentData;
const browserBrands = browserData?.brands ?? [];
const preferredBrowser = browserBrands.find(
  ({brand}) => !/not.?a.?brand|chromium/i.test(brand)
);

let browserName = preferredBrowser?.brand;
let browserVersion = preferredBrowser?.version;

if (!browserName) {
  const userAgent = navigator.userAgent;
  const browserMatch =
    userAgent.match(/(Edg|OPR|Chrome|Firefox|Version|Safari)\/([\d.]+)/) ??
    userAgent.match(/(MSIE )([\d.]+)/);

  browserName = browserMatch
    ? {
        Edg: 'Microsoft Edge',
        OPR: 'Opera',
        Chrome: 'Google Chrome',
        Firefox: 'Mozilla Firefox',
        Version: 'Safari',
        Safari: 'Safari',
      }[browserMatch[1].trim()] ?? browserMatch[1]
    : 'Tuntematon selain';
  browserVersion = browserMatch?.[2] ?? 'tuntematon versio';
}

const platform =
  browserData?.platform || navigator.platform || navigator.userAgent;
const operatingSystem = /android/i.test(platform)
  ? 'Android'
  : /iphone|ipad|ipod|ios/i.test(platform)
  ? 'iOS'
  : /win/i.test(platform)
  ? 'Windows'
  : /mac/i.test(platform)
  ? 'macOS'
  : /cros/i.test(platform)
  ? 'ChromeOS'
  : /linux/i.test(platform)
  ? 'Linux'
  : platform;
const browserDetails = browserBrands
  .map(({brand, version}) => `${brand} ${version}`)
  .join(', ');
const now = new Date();
const date = now.toLocaleDateString('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const time = now.toLocaleTimeString('fi-FI', {
  hour: '2-digit',
  minute: '2-digit',
});

const details = [
  `Selain: ${browserName}, versio ${browserVersion}${
    browserDetails ? ` (${browserDetails})` : ''
  }`,
  `Käyttöjärjestelmä: ${operatingSystem}`,
  `Näytön koko: ${screen.width} × ${screen.height}`,
  `Näytön käytettävissä oleva tila: ${screen.availWidth} × ${screen.availHeight}`,
  `Selainikkunan koko: ${window.innerWidth} × ${window.innerHeight}`,
  `Päivämäärä: ${date}`,
  `Kellonaika: ${time}`,
];

details.forEach(detail => {
  const paragraph = document.createElement('p');
  paragraph.textContent = detail;
  target.append(paragraph);
});
