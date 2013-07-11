##Log

There are 5 different levels to the log:

1. **error**
  * `sails.log.error('hello');` only logs errors.

2. **warn**
  * `sails.log.warn('hello');` contains both warn and errors.

3. **debug**
  * Debug is the default level. `sails.log.debug('hello');` is the same as just typing `sails.log('hello');`

4. **info**
  * `sails.log.info('hello');` also contains error, warn, and debug.

5. **verbose**
  * `sails.log.verbose('hello');` has information from all of the levels.
