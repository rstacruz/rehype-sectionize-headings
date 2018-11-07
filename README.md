<p align='center'>
<br><img src='https://user-images.githubusercontent.com/74385/47948807-e0779800-df72-11e8-81e8-68ec5c61de46.png' width='160'><br>
</p>

<h1 align='center'>
rehype-sectionize-headings
</h1>

<p align='center'>
Separates headings into sections in Rehype
</p>

<p align='center'>
<img src='https://img.shields.io/badge/build-pending-lightgrey.svg'>
</p>

<br>

`rehype-sectionize-headings` Creates sections based on h2 and h3 headings in Rehype.

## Usage

To wrap h2's and h3's:

```js
import wrap from 'rehype-sectionize-headings'

hast = wrap(hast)
```

Or to specify class names:

```js
hast = wrap(hast, {
  h2: {
    sectionClass: ['h2-section'],
    bodyClass: ['body']
  },
  h3: {
    sectionClass: ['h3-section'],
    bodyClass: ['body']
  }
})
```

## Thanks

**rehype-sectionize-headings** © 2018+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[![](https://img.shields.io/github/followers/rstacruz.svg?style=social&label=@rstacruz)](https://github.com/rstacruz) &nbsp;
[![](https://img.shields.io/twitter/follow/rstacruz.svg?style=social&label=@rstacruz)](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/rehype-sectionize-headings/contributors
