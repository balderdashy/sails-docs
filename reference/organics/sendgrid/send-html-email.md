# `sendHtmlEmail`

Send an automated HTML email using the SendGrid API.

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | to            | ((string))    | The email address of the desired recipient 
| 2 | subject        | ((string))    | The subject line of the email
| 3 | htmlMessage    | ((string))    | The HTML body of the email
| 4 | from        | ((string))    | The email address of the sender
| 5 | fromName        | ((string))    | The display name of the sender, to be displayed in the recipient inbox
| 6 | secret        | ((string))    | The secret API key from a valid SendGrid developer account
| 7 | toName        | ((string))    | The full name of the primary recipient
| 8 | bcc            | ((string))    | The list of email addresses of recipients secretly copied on the email
| 9 | attachments        | ((string))    | The attachments to include on the email, with file content encoded as base64

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((string))     | A SendGrid message ID; does not guarantee successful delivery.