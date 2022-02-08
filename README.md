# n-messaging-client [![CircleCI](https://circleci.com/gh/Financial-Times/n-messaging-client.svg?style=svg&circle-token=309996b6bdbe638678ee73353626606adf61693b)](https://circleci.com/gh/Financial-Times/n-messaging-client)

**Lightweight, consistent, smart, targeted and behaviourally driven first party messaging on FT.com**

### Table of Contents

* [Monitoring](#monitoring)
* [Lazy and Static Messages](#lazy-and-static-messages)
* [Usage](#usage)
	- [Application specific](#application-specific)
* [Development](#development)
	- [Running locally](#running-locally)
	- [Configuring Messages](#configuring-messages)
		- [Viewing messages](#viewing-messages)
		- [Configuration](#configuration)
		- [Under the hood](#under-the-hood)
	- [Migration](#migration)
* [Overview](#overview)
	- [The Problem](#the-problem)
	- [The Solution](#the-solution)
	- [Parts of n-messaging-client](#parts-of)
	- [Holistic Messaging Flow](#holistic-messaging-flow)
* [Migration](#migration)

### Explainer
Presentation: [FOMO - a guide](https://docs.google.com/presentation/d/1QpEVjZYQ3bGka2XNS0OrOMowaqyGxZFmwZY831xtEJA/edit)

### Monitoring

- [Monitoring for `next-messaging-guru`](https://github.com/Financial-Times/next-messaging-guru#monitoring)

### Lazy and static messages
- [Lazy and static messages](./docs/lazy-and-static-messages.md)

# Usage

Install via npm:

```npm install --save @financial-times/n-messaging-client```

Add the Handlebars helper to Express config:

```javascript
  helpers: {
    nMessagingPresenter: require('@financial-times/n-messaging-client').presenter
  }
```

Now you can inject the message "slot" template in the relevant place in your markup (as close to the bottom of the `body` tag as possible):

```html
 <!-- wrapper.html -->

<div>
  <h1>My Example Page</h1>
</div>

{{> n-messaging-client/server/templates/slot type='bottom'}}
```

Import `n-messaging-client`'s styles to your main css entry.

If you're using a message type that is server-rendered, import the critical stylesheet into the 'head' section of your main.scss.

```scss
/* critical.scss */

@import 'n-messaging-client/critical';
```

In all cases, whether your messages will be client or server rendered, also include the n-messaging-client/main.scss *outside* the 'head' section of your main.scss, so it will be lazily loaded.

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

#### `variants` option

If `variants` option is provided to the slot partial only the messages specified as a string of comma separated values will be displayed.
For example:

```
{{> n-messaging-client/server/templates/slot type='bottom' variants='messageA,messageB'}}
```
would display ONLY `messageA` or `messageB` if the "Brain™" decides one of those should be displayed. All other messages will be ignored.

Example use case: on the paywall we want to start displaying the cookie consent message using our standard messaging but we don't want any other message there:

```
{{> n-messaging-client/server/templates/slot type='bottom' variants='cookieConsentC'}}
```
would achieve this.

# Development

## Running locally

1. `make install`
2. `make demo-certs` (to install self-signed SSL cert for HTTPS support, otherwise most service calls such as myFT will not work due to secure cookies)
3. `make demo-watch` (will build, run and watch the demo)
4.  [configure a message to show](#viewing-messages)
5.  visit https://local.ft.com:5005 (make sure you are on `ft.com` so that toggler cookies are used)


Note: before opening a PR, please run `make verify` to check things like linting
	-  in order to see and fix linting errors, please make sure you have Editor Config and ES Lint plugins installed on your editor of choice

## Configuring Messages

### Viewing messages

To view a message you can pick the relevant variant on toggler: [messageSlotBottom](https://toggler.ft.com/#messageSlotBottom) / [messageSlotTop](https://toggler.ft.com/#messageSlotTop)

### Configuration

Messaging slot ammit "flags" use "Brain™" logic to decide which variant to pick (unlike the usual random % allocation).

- Firstly you must update the relevant flag to have your new variant.
- Secondly you must update the appropriate slot array in [`messaging.json`](https://github.com/Financial-Times/next-ammit-api/blob/HEAD/server/config/messaging.json) in `next-ammit-api` with your new message config. (If you want to test a message before releasing to the public, you could simply add the variant to the flag and hold off updating `messaging.json`).
- Variants will not work until both the previous steps are met.
- You can now add your new variant config within `n-messaging-client` in the [`manifest.js`](https://github.com/Financial-Times/n-messaging-client/blob/HEAD/manifest.js).
- Add the relevant templates, css and js to this component (`n-messaging-client`).
- If your new message variant is `client` (aka lazy / async) then you will need to set up a new matcher on [`next-messaging-guru`](https://github.com/Financial-Times/next-messaging-guru).
- Build and test your new variant with `make demo`
- Ship your changes by versioning this component and updating the relevant apps (`next-article` etc.) to pull it in

### Under the hood :wrench:

- The "bottom" message slot uses [`o-banner`](http://registry.origami.ft.com/components/o-banner)
- The "top" message slot uses [`o-message`](http://registry.origami.ft.com/components/o-message)

### Releasing a message to production

Firstly this assumes you have versioned and published this module and have the new version installed and deployed in the relevant applications.

Two things have to be in place for a message to be "live":
1) the variant must exist on the flag
2) there must be config in [`messaging.json`](https://github.com/Financial-Times/next-ammit-api/blob/HEAD/server/config/messaging.json) for that variant

For easy client-side validation of the message, (does it render correctly on the page etc). Don't ship part 2. Just have a variant, and test the message via turning it on in toggler.

When you are ready to ship the best method is to: Remove the variant from the flag. Ship part 2 (`messaging.json`). And then when you are good to go, re-add the variant to the flag. This method avoids having to deploy code to turn the feature on.

If you need to turn a message off in production quickly, the only thing you need to do is remove the variant from the flag.

There are step by step instructions on [how to add or remove corporate cancellation message](/docs/corporate-cancellation-message.md)

### Images

To use images in your messages, upload them to [the `messages` bucket in S3](https://s3.console.aws.amazon.com/s3/buckets/ft-next-assets-prod/assets/messages/?region=eu-west-1). The only settings you need to change are the following:

+ Manage public permissions: Grant public read access to this object
+ Set permissions - Set the following headers:
	- `Content-Type`: `image/png` / `image/jpeg` (depending on the image being uploaded)
	- `Cache-Control`: `public, max-age=31536000` (1 year)

The image should now be available at https://www.ft.com/__assets/creatives/messages/YOUR_IMAGE.png

For bonus points, please run this image through the [Origami Image Service URL builder](https://www.ft.com/__origami/service/image/v2/docs/url-builder).

### Migration

#### v4.5 to v5.0

In v4.5, there wasn't a clear separation of concerns between client and server code. In v5.0, to address this, the code has been separate into client/ and server/ folders.

There is no JS or CSS changes needed because the main JS and SCSS files remain in the root folder.

There is however HTML changes needed because the templates have been moved into the server/ folder. You will need to replace all instances of:

```
{{> n-messaging-client/templates/slot type='...'}}
```

with:

```
{{> n-messaging-client/server/templates/slot type='...'}}
```

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
- Consistent design and clear usage guidelines (`o-banner` and `o-message`)
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
