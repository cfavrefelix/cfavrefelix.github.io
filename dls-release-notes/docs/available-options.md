# Available options

Below are the options that can be provided on the "dls-release-notes-root" element as a json object like so:

```html
<div
  id="dls-release-notes-root"
  data-release-note-options='{ 
    "archiveUrl": "/dls-release-notes/api/en-GB/archive.json",
    "setPageTitle": true, 
    "productName": "Release Notes Demo", 
    "showHeader": true, 
    "routingStrategy": "hash"
    }'
></div>
```

| Name                   | Type      | Required | Options                      | Default | Details                                                                                                |
| ---------------------- | --------- | -------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| archiveUrl             | `string`  | `true`   | n/a                          |         | This property is required and should be the url of the api endpoint for the archive data.              |
| showHeader             | `boolean` | `false`  | n/a                          | `true`  | Whether the blue header and logo should be displayed at the top of the application                     |
| routingStrategy        | `string`  | `false`  | 'hash' , 'browser', 'memory' | 'hash'  | What kind of routing strategy should be used. Defaults to hash.                                        |
| currentReleaseNote     | `string`  | `false`  | n/a                          | `null`  | Which release note to render on loading. Defaults to the latest release note.                          |
| setPageTitle           | `boolean` | `false`  | n/a                          | `true`  | Should the application update the document title when changing release notes.                          |
| productName            | `string`  | `false`  | n/a                          | ''      | The name of the product                                                                                |
| alwaysDisplayAnchorNav | `boolean` | `false`  | n/a                          | `false` | Should the anchor navigation always display in the sidebar, even if there is only one option available |
