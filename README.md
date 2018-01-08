# n-messaging-client [![CircleCI](https://circleci.com/gh/Financial-Times/n-messaging-client.svg?style=svg&circle-token=309996b6bdbe638678ee73353626606adf61693b)](https://circleci.com/gh/Financial-Times/n-messaging-client)

**Lightweight, smart, targeted and behaviourally driven first party messaging on FT.com**

_Currently in active development / testing._

# Usage

## Via `n-ui` (TBC)

**This PR needs merging before this would work: https://github.com/Financial-Times/n-ui/pull/1143**

Enable the messaging feature in your app config via `n-ui`:

```javascript
// app.js

const nUi = require('@financial-times/n-ui');
const app = nUi({
  withMessaging: true
});

app.locals.nUiConfig = {
  preset: 'complete',
  features: {
    messaging: true
  }
};

```

## Application specific

Install client side dependencies (css, js templates) via bower:

```bower install --save n-messaging-client```

Install server side dependencies (handlebars presenter/helper) via npm:

```npm install --save @financial-times/n-messaging-client```

Add the handlebars helper to app config, you can do this via `n-ui` like so:

```javascript
// app.js

const nUi = require('@financial-times/n-ui');
const app = nUi({
  systemCode: 'my-example-app',
  helpers: {
    nMessagingPresenter: require('@financial-times/n-messaging-client').presenter
  }
});
```

Now you can inject the message "slot" template in the relevant place in you markup (as close to the bottom of the `body` tag as possible):

```html
 <!-- wrapper.html -->

<div>
  <h1>My Example Page</h1>
</div>

{{> n-messaging-client/templates/slot type='bottom'}}
```

Import `n-messaging-client`'s styles to your main css entry:

```scss
/* main.scss */

@import 'n-messaging-client/main';
```

And finally import and initialise the client side component via your main js entry:

```javascript
// main.js

import { nMessagingClient } from 'n-messaging-client';
nMessagingClient.init();
```

## The Problem
- Too many messages shown to the user at the same time
- No context or hollistic view of what messages to show on a page (conflicting / overlapping)
- No priority or hierarchy to messages
- Fickle Cookie / session based tracking of message interactions (view, close, act) which must be duplicated each time
- No consistent tracking / validation of message interactions
- No oversight of new messages that are added and how they fit into the hollistic view
- No consistency in design and behaviour

## The Solution


## Overview

![next-messaging - flow overview](https://user-images.githubusercontent.com/660635/34673188-45e2193a-f479-11e7-8c80-69ca88a9e8d1.png)

  

