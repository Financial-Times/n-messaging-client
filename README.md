# n-messaging-client [![CircleCI](https://circleci.com/gh/Financial-Times/n-messaging-client.svg?style=svg&circle-token=309996b6bdbe638678ee73353626606adf61693b)](https://circleci.com/gh/Financial-Times/n-messaging-client)

**Lightweight, consistent, smart, targeted and behaviourally driven first party messaging on FT.com**

:construction: _Currently in active development / testing._ :construction:

**Todo** :rocket:
- [ ] The "top" message slot, aka service messages ([`n-alert-banner`](https://github.com/Financial-Times/n-alert-banner))
- [x] [`next-messaging-guru`](https://github.com/Financial-Times/next-messaging-guru) api aka async message configuration
- [ ] polish
- [ ] port over existing messages
- [ ] unit tests
- [ ] a11y tests for all messages
- [x] a11y tests
- [x] demo mode

### Monitoring

- [Messaging Grafana Board](http://grafana.ft.com/dashboard/db/next-messaging-guru?orgId=1)
- [Messaging Beacon Board](https://beacon.ft.com/dashboard/messaging/)

# Usage

The easiest way to enable client side messaging for an application is via the `n-ui` config (TBC).
Alternatively you can import and initialise the component manually on an application level.

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

Now you can inject the message "slot" template in the relevant place in your markup (as close to the bottom of the `body` tag as possible):

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

Note: optionally you may only want to init if a message flag is on the page

```javascript
if ( window.FT.flags.messageSlotBottom || window.FT.flags.messageSlotTop ) {
  nMessagingClient.init();
}
```

**note:** CSS could be loaded asyncronously so the ```n-ui-hide``` class is used to stop unstyled content flash, ensure your application has ```n-ui-foundations``` to take advantage of this.

# Development

## Running locally

- `make install`
- `make demo`
-  visit http://local.ft.com:5005 (make sure you are on `ft.com` so that toggler cookies are used).

## Configuring Messages

### Viewing messages

To view a message you can pick the relevant variant on toggler: [messageSlotBottom](https://toggler.ft.com/#messageSlotBottom) / [messageSlotTop](https://toggler.ft.com/#messageSlotTop)

### Configuration

Messaging slot ammit "flags" use "Brain™" logic to decide which variant to pick (unlike the usual random % allocation).

- Firstly you must update the relevant flag to have your new variant.
- Secondly you must update the appropriate slot array in [`messaging.json`](https://github.com/Financial-Times/next-ammit-api/blob/master/server/config/messaging.json) in `next-ammit-api` with your new message config. (If you want to test a message before releasing to the public, you could simply add the variant to the flag and hold off updating `messaging.json`).
- Variants will not work until both the previous steps are met.
- You can now add your new variant config within `n-messaging-client` in the [`manifest.js`](https://github.com/Financial-Times/n-messaging-client/blob/master/manifest.js).
- Add the relevant templates, css and js to this component (`n-messaging-client`).
- If your new message variant is `client` (aka lazy / async) then you will need to set up a new matcher on [`next-messaging-guru`](https://github.com/Financial-Times/next-messaging-guru).
- Build and test your new variant with `make demo`
- Ship your changes by versioning this component and updating the relevant apps (`next-article` etc.)(`n-ui` dependants (tbc)) to pull it in

### Under the hood :wrench:

- The "bottom" message slot uses [`o-banner`](http://registry.origami.ft.com/components/o-banner)
- The "top" message slot uses [`n-alert-banner`](https://github.com/Financial-Times/n-alert-banner)

## Overview

### The Problem

- Too many messages shown to the user at the same time
- No context or holistic view of what messages to show on a page (conflicting / overlapping)
- No priority or hierarchy to messages
- Fickle Cookie / session based tracking of message interactions (view, close, act) which must be duplicated each time
- No consistent tracking / validation of message interactions
- No oversight of new messages that are added and how they fit into the holistic view
- No consistency in design and behaviour

### The Solution

- Message hierarchy as decided by "The Brain™" (`next-ammit-api`)
- Consistent design and clear usage guidlines (`o-banner` and `n-alert-banner`)
- Simple integration to applications (`n-messaging-client`)
- No conflicting messages on the page at once ("top" & "bottom" slots)
- Standardised, user based and persistent interaction event tracking (`n-messaging-client`, VoltDB & `next-ammit-api`)
- Targeted user messaging from previous interactions, cohorts and behaviour ("The Brain™" `next-ammit-api`)
- Clear overview of all our first party messages, to whom they show, on what pages, and when (`messaging.json` in `next-ammit-api`)
- No more message overload for our users! :tada:

### Parts of `n-messaging-client`

- **The Presenter**: A handlebars helper that is used within the main `slot.html` template. The presenter will interpret the users flags, load the relevant config from the `manifest` and populate a data object that is referenced by the handlebars templates.
- **The Components**: The various message resources including: templates, js and css.
- **The Client js**: In addition to individual message js there is shared "interaction" and initialisation scripts. Interactions include "act", "view", "close, "skip" and these message events flow back into VoltDB for use by "The Brain™"
- **The Lazy Load js**: Client side code to load in and init async messages that require a client side call to [`next-messaging-guru`](https://github.com/Financial-Times/next-messaging-guru)

### Holistic Messaging Flow

![next-messaging - flow overview](https://user-images.githubusercontent.com/660635/34673188-45e2193a-f479-11e7-8c80-69ca88a9e8d1.png)
