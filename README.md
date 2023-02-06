Floating Tooltip
==============

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

A floating tooltip JS component.

## Quick start

```js
import Tooltip from 'float-tooltip';
```
or using a *script* tag
```html
<script src="//unpkg.com/float-tooltip"></script>
```
then
```js
const myTooltip = Tooltip();
myTooltip
  (<triggerDOMElement>)
  .content('<div>Hello World!</div>');
```

## API reference

| Method | Description | Default |
| --- | --- | --- |
| <b>content</b>([<i>string</i>]) | Specify the content of the tooltip. Supports plain text or HTML content. If a falsy value is supplied the tooltip will automatically hide. | `false` |

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!

[npm-img]: https://img.shields.io/npm/v/float-tooltip
[npm-url]: https://npmjs.org/package/float-tooltip
[build-size-img]: https://img.shields.io/bundlephobia/minzip/float-tooltip
[build-size-url]: https://bundlephobia.com/result?p=float-tooltip
[npm-downloads-img]: https://img.shields.io/npm/dt/float-tooltip
[npm-downloads-url]: https://www.npmtrends.com/float-tooltip
