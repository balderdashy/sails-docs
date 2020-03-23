# `simultaneouslyForEach`

Run a given function once for each item in an array or a dictionary.

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | arrayOrDictionary    | ((ref))        | The array or dictionary over which to loop
| 2 | iteratee        | ((ref))         | The function to run for each item in the object

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((ref))         | An array or dictionary of the results, which is the combined result of running iteratee on each item/property