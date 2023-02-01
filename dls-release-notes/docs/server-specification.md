# API Server specifications

The [api folder](../public/api) contains mock data that is used for the [demo website](https://sage.github.io/dls-release-notes/).

There is also an Open API 3 specification for this server: [Open API Specification](./openapi.yaml). More details on Open API can be found [here](https://github.com/OAI/OpenAPI-Specification). Along with this there is a disection of each of the endpoints below, along with the expected behaviour based on what is provided.

## Isomorphic behaviour

The application is _isomorphic_; the behaviour of the output depends on what optional properties are provided.

### Archive

```js
{
  "__self": "[url]",
  // The text that appears after "What's new in ..." under the title. Will not display if not provided or empty string
  "product": "Example Product",
  // Current language
  "language": "en-GB",
  // Url of the endpoint for the labels
  "labels": "[url]",
  // Url of the endpoint for the taxonomies
  "taxonomies": "[url]",
  // If there is 0 or 1 language options then it will not display the language dropdown
  "alternative_langauges": [
    {
      "title": "English",
      "id": "en-GB",
      "url": "[url]"
    },
    {
      "title": "French",
      "id": "fr-FR",
      "url": "[url]"
    }
  ],
  // The releases. These should be appeared in the order you want users to view them (usually latest first).
  "releases": [
    {
      "id": "demo",
      "title": "Demo",
      "url": "[url]"
    }
  ]
}
```

### Release Note

The release notes endpoints

```js
{
  // This id should match the id in the archive
  "id": "demo",
  // The title is optional. If provided it will put the date in brackets after
  "title": "Demo Version",
  // The date is required and will always be in the title of the page.
  "date": "18 October 2020",
  // Current language. Needs to match the language above
  "language": "en-GB",
  // URL of the archive endpoint
  "__archive": "[url]",
  // The id of the previous item. If not provided then the previous link will not appear
  "previous": "prev-demo",
  // The id of the next item. If not provided then the next link will not appear
  "next": "prev-demo",
  "content_parts": [
    {
      "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
      // "All" taxonomies will mean that this content part will never be removed by filters
      "taxonomies": "all"
    },
    {
      // Modules require an id and title
      "type": "module",
      "id": "accounting",
      "title": "Accounting",
      // You can have nested content parts which will render children
      "content_parts": [
        {
          // Tabs don't need a title or id, but do need content parts with each part having a title
          // Tabs also won't get removed by filters
          "type": "tabs",
          "content_parts": [
            {
              // As a child of the tabs type this title will be used as the title of the tab
              "title": "Tab 1",
              "content_parts": [
                {
                  "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
                  // This component will remain when the "software > cloud" taxonomy is selected
                  "taxonomies": {
                    "software": ["cloud"]
                  }
                },
                {
                  "title": "Insertion of the logo in emails",
                  "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>"
                }
              ]
            },
            {
              // As a child of the tabs type this title will be used as the title of the tab
              "title": "Tab 2",
              "content_parts": [
                {
                  "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
                  "taxonomies": {
                    "software": ["on-premise"]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Taxonomies

The taxonomies endpoint should include all taxonomies used across the different release notes. This ensures that the terminology used between each is unified and the size of each release note is reduced.

These taxonomies should be provided for each alternative language, with the order and IDs remaining the same, but the titles translated.

```js
{
    "__self": "[url]",
    "taxonomies": [
        {
            // unique id for the taxonomy
            "id": "legislations",
            // This title is displayed in the sidebar of the application
            "title": "Legislation",
            // These are the options available
            // If there are more than 2 options then it will display these using a dropdown
            "options": [
                {
                    "id": "belgium-be",
                    "title": "BE Belgium"
                },
                {
                    "id": "france-fr",
                    "title": "FR France"
                }
            ]
        },
        {
            "id": "contract",
            "title": "Contract",
            "options": [
                {
                    "id": "essential",
                    "title": "Essential"
                },
                {
                    "id": "standard",
                    "title": "Standard"
                }
            ]
        },
    ]
}

```

### Labels

To allow for translations and the ability to customize the content of the application, all static text is rendered by labels. These need to be provided. If you don't make use of i18n then you may want to update [../src/context/Labels.context.tsx](../src/context/Labels.context.tsx) to provide a static value for these labels to improve performance.

```js
{
    // Labels for buttons
    "buttons.clear": "Clear",

    // Text for links
    "links.next": "Next version",
    "links.previous": "Previous version",
    "links.back-to-top": "Back to top",
    "links.see-all-versions": "View all versions",
    "links.go-back": "Go back",
    "links.view-latest": "View latest version",

    // Titles
    "titles.modules": "Module",
    "titles.language": "Language",
    "titles.version": "Version",
    "titles.filters": "Filters",
    "titles.not-found": "Version not found",

     // Subtitles
    "subtitle.prefix": "What's new in",

    // Filters
    "filters.applied": "applied",

    // Text for dropdowns
    "dropdown.select": "Select",
    "dropdown.selected": "selected",
    "dropdown.select-language": "Select Language",
    "dropdown.select-version": "Select Version",

    // User messages
    "messages.not-found": "We can’t find what you’re looking for. Please try again using a different version or language.",
    "messages.all-parts-filtered": "Try changing your filters to see content.",

    // HTML page title text
    "page-title.divider": " | ",
    "page-title.suffix": "Release Notes Demo"
}
```
