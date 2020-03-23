# `chargeCustomer`

Create and capture a charge for a specified amount using the saved default payment source of a Stripe customer.

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | stripeCustomerId    | ((string))    | The ID of the Stripe customer to charge
| 2 | amount        | ((number))    | The amount of currency to charge, expressed in the smallest currency unit. Must be greater than or equal to $0.50 US or equivalent in charge currency.
| 3 | chargeDescription    | ((string))    | The text to include in automatic email receipts (if in use) and to display in the Stripe web interface alongside this charge.
| 4 | statementDescriptor    | ((string))    | The text to be displayed on the customer’s credit card statement
| 5 | currency        | ((string))    | The three-letter ISO currency code in lowercase indicating the currency used in this transaction.
| 6 | secret        | ((string))    | The secret API key

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((string))     | The ID of the processed Stripe charge