# `getAvatarUrl`

Determine the source URL for the gravatar image belonging to a particular email address

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | emailAddress    | ((string))    | The email address associated with the desired avatar image.
| 2 | gravatarSize    | ((number))    | The desired height and width of the avatar image in pixels (between 1 and 2048).
| 3 | defaultImage    | ((string))    | The backup image to use in case this email address has no matching avatar.
| 4 | rating        | ((string))    | The most extreme rating level to consider "appropriate" for your audience ("G", "PG", "R", or "X".)
| 5 | useHttps        | ((boolean))    | Whether to build a secure avatar URL ("https://".)

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((string))     | Avatar source URL