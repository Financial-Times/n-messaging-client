# How to add or remove corporate cancellation message across the site

If you’re adding a message, your ticket should have details as outlined in the following document (including message copy, how we’re catching the cohort, if it’s in the top or bottom message slot, etc): https://docs.google.com/document/d/1a8VJfK0sLfaS4bZs3ZTteGSkNeGqMzK4pmaQ3uwZn1g/ 

These steps describe updating n-messaging-client and NOT n-messaging-guru, but I’m guessing it would be a similar process.

If you’re removing the message, find the PRs that created the message so you know what you can remove. 

## Step 1 : Update [n-messaging-client](https://github.com/Financial-Times/n-messaging-client)

### Create the message component in the server/templates/partials/ ‘top’ or ‘bottom’ depending where you want it /company-name.html

Example code for bottom message(check past PRs for other variants)

```
server/templates/partials/bottom/company-x.html

<div class="n-messaging-client-messaging-banner">	
	{{#> n-messaging-client/server/templates/components/o-banner	
		themeCompact=true	
		renderOpen=true	
		suppressCloseButton=true	
	}}	
	<div class="o-banner__inner" data-o-banner-inner="" data-o-banner-inner="">	
		<div class="o-banner__content">	
			<header class="o-banner__heading">	
				<h1>Company X Cancellation</h1>	
			</header>	
			<p>	
				Company X  has decided not to renew their corporate subscription to FT.com. If you have any questions about this please email	
				<a href="mailto:info@companyx.com?subject=Keep my access to FT.com">info@companyx.com</a>.	
			</p>	
		</div>	
		<div class="o-banner__actions">	
			<div class="o-banner__action">	
				<a href="mailto:info@companyx.com?subject=Keep my access to FT.com" class="o-banner__button">	
					Keep my access	
				</a>	
			</div>	
		</div>	
	</div>	
	{{/n-messaging-client/server/templates/components/o-banner}}	
</div>
```

### Update manifest.js to be linked to above file

manifest.js
```
${corporateClient}Licence: {	
		path: 'bottom/${corporate-client}-licence'	
	}
```

## Step 2: get the above PR approved and merged. Do NOT make the release yet!

## Step 3: Update the relevant messageSlot flag 

(PUT request to flags API - see more instructions, including how to get the auth code - here: https://github.com/Financial-Times/next-flags-api#edit-an-existing-flag). 

When updating, make sure you send in the whole `ammitSetup` body to prevent overwriting the other variants. 
To update the CorporateClient variant, add a remove the variant name (this needs to match what you put in manifest.js in step 1) to the variants array

Example for messageSlotBottom:

PUT request to https://next-flags.ft.com/api/v1/messageSlotBottom with post body

```
   "ammitSetup": {
        "isAbTest": false,
        "isBrain": true,
        "urlPatterns": "all",
        "offset": 1,
        "range": 100,
        "cohorts": [
            "messaging"
        ],
        "variants": [    
            "licenceJoinPromptSsiClient",
            "cookieConsentC",
            "digestReader",
            "Control",
            "knowledgeBuilderOnboarding",
            "swgEntitlementsPrompt",
            "bookYourConsult",
            "onboardingMyFt",
            "onboardingPremium",
            "onboardingApp",
            "techScrollAsia",
            "appPromoMobile",
            "b2bTrialAnon",
            "b2bTrialNewsletter",
            "b2bTrialMyFt",
            "b2bTrialContactUs",
            "b2bTrialMember",
            "b2bTrialMobile",
            "contentMessage",
            "b2cTrialAcquisitions",
            "b2cSubAcquisitions",
            "ftWeekendPromo",
            "dailyDigest",
            "newsletterPromo",
            "usNewsletterPromo",
            "myFtFeedpageOverview",
            "marketsData",
            "marketingPopupPrompt",
            "oneClickDailyDigest",
            "myFtAccountTopicRecs",
            "usElection2020Promo",
            "coronavirusNewsletterPromo",
            "tbybInTrialSubscribe",
            "tbybPostTrialSubscribe",
            "remainingArticlesTest"
        ],
        "consent": []
    }
```

## Step 4: Make the release of n-messaging-client

## Step 5: update [next-ammit-api](https://github.com/Financial-Times/next-ammit-api/)

In server/config/messaging.json add the properties and rules about the message - its priority etc

```
    {
      "variant": "${corporateClient}Licence",
      "messageId": "${corporateClient}Licence", ← this messageId needs to match the key of the update you made to manifest.js in step 1
      "rules": {
        "userDataProperties": [
          "is${corporateClient}" ← this is the key for the check you add in format-user-data (step below)
        ]
      },
      "priority": 2
    },
```

In server/lib/format-user-data.js in the return object add a check for your cohort.

For check by licence number it would be 
`is${corporateClient}: checkCompanyLicence(membershipUserAccess, 'licenceID')`

Make a PR and get it approved and merged

## Step 6: For the n-messaging-client changes to be propagated throughout the system. Ensure those PRs are merged

Renovate bot will open PRs in:
- [next-stream-page](https://github.com/Financial-Times/next-stream-page)
- [next-front-page](https://github.com/Financial-Times/next-front-page)
- [next-article](https://github.com/Financial-Times/next-article)

You will need to find those PRs, and bring them to the attention of the relevant team to have those PRs approved and merged quickly. 
