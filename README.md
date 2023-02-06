# MO-ICONS

Svg material icons for Lit Element.

## Usage

```javascript
import "mo-icons/mo-icon";
```

```html
<mo-icon icon="mail" mode="round"></mo-icon>
```

### icon attribute:

Is a string with icon name. You can find a complete list of icons names in dist folder of package.

### mode attribute:

The mode attribute value can be:

```javascript
/** @type {"round"|"filled"|"outlined"|"two-tone"|"sharp"} */
```

### Custom icons:

You can add custom icons with **src** attribute using svg file.

```html
<mo-icon src="./myicon.svg"></mo-icon>
```

_myicon.svg:_

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 15H7.5v-4.5H6V9h3v6zm4.75 0L12 12.75V15h-1.5V9H12v2.25L13.75 9h1.75l-2.25 3 2.25 3h-1.75zm5.75-2.5H18V14h-1v-1.5h-1.5v-1H17V10h1v1.5h1.5v1z"/></svg>
```
