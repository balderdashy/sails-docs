# `simultaneously`

Run multiple functions at the same time, then assembles the return values into the structure defined by stencil.

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | stencil        | ((ref))        | The one-dimensional array or dictionary, consisting of functions to run in parallel.

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((ref))         | An array or dictionary of the return values of the functions run in parallel.