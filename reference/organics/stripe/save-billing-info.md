# `saveBillingInfo`

Save the latest billing details in Stripe for a new or existing customer

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | stripeCustomerId    | ((string))    | The ID of the Stripe customer whose information should be updated. If unspecified, this creates a new customer entry in Stripe.
| 2 | token        | ((string))    | The token used to create the source
| 3 | emailAddress    | ((string))    | The email address of the Stripe customer
| 4 | plan        | ((string))    | The unique identifier for the plan object
| 5 | secret        | ((string))    | The secret API key.

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((string))     | The ID of the Stripe customer updated or created.