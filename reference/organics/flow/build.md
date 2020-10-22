# `build`

Build a value by running some logic, then using the return value. 

### Usage

|    |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | builder        | ((ref))        | The function to be run in order to build the result. Note that this function should not cause any side effects.


##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((ref))     | The value returned by the builder function