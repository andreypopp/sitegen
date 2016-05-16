# sitegen

## Installation & Usage

```
% npm install sitegen
```

Create `sitegen.config.js` with the following contents:

```
export let route = './site'
```

Create `site.js` with the following content:

```
import React from 'react'

export default function Site() {
  return <div>Hello, world!</div>
}
```

Serve site:

```
% sitegen serve
```

Build site:

```
% sitegen build
```
