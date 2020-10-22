# `iterate`

Run a given function every time the given wellspring says to run it.
Note on ‘splash’: A splash is the moment in time when the wellspring invokes the given function, eachSplash. 

### Usage

|    |    Argument    | Type        | Details        |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | wellspring        | ((ref))        | The function that triggers a sequence of splashes, saying when, how many times, and with what value to run the given eachSplash function.
| 2 | eachSplash        | ((ref))         | The function to run each time the wellspring splashes out a value.
| 3 | eachBatch        | ((ref))        | The function to run when the current batch of values fills up and if the wellspring finishes without filling up the last batch
| 4 | skipDuplicates    | ((boolean))     | Whether or not to skip running eachSplash if the splashed value has been seen before. Uses a strict equality check (===).
| 5 | batchSize        | ((number))    | The number of un-skipped times the wellspring can splash before considering the batch full and invoking eachBatch with an array of the values of the batch.