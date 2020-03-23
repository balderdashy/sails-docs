# `until`

Run a given function repeatedly until its return value is `true`.

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | checker        | ((ref))        | The function to be run until it returns `true`
| 2 | timeout        | ((number))    | (optional) A timeout value, in milliseconds