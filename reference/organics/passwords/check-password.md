# `checkPassword`

Check a password attempt by comparing an inputted password with the existing bcrypt hash of the correct password.

### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | passwordAttempt    | ((string))    | The new password attempt (unencrypted)
| 2 | hashedPassword        | ((string))    | The existing password hash against which to compare the attempt
