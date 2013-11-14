// where.md
================

// Simplest example:
User.find()
.where({
  name: 'mike'
})





The argument to where is a "criteria object."
Let's learn about criteria objects.


// Example criteria object:

// People named "mike", or "mIKe", etc. (case-insensitive!)
{
  name: 'mike'
}



// Example criteria object:

// People who are 30 and are named Mike or Nick
{
  or: [
    {name: 'Mike'},
    {name: 'Nick'}
  ],
  age: 30
}



// Example criteria object:

// People who are over 40
{
  age: { '>': 40 }
}

// People who are over 40, or 40
{
  age: { '>=': 40 }
}

// People who are not 40
{
  age: { '>=': 40 }
}


// Example criteria object:

// People who are younger than 40
{
  age: { '<': 40 }
}

// People who are younger than 40, or 40
{
  age: { '<=': 40 }
}



// People who are not 40 years old.
{
  age: { '!': 40 }
}




// Example criteria object:

// People whose name starts with "micke" (case-insensitive)
// e.g. the following criteria object might be used to find Mickey Mouse.

{
  name: {
    startsWith: 'micke
  }
}


// Example criteria object:

// A SQL like query
{
  name: {
    like: '%foo%bar'
  }
}




// OTHER THINGS
endsWith
contains








// NON-Examples 
// THESE DO NOT WORK

// Cannot have more than one sub-attribute query modifier
// This restriction may be lifted in future versions.
{
	name: {
		startsWith: 'micke,
		'>=': 'b'
	}
}










// limit.md
================

# .limit()


// Example:

// Get **up to** 30 users.
User.find()
.where({ name: 'mike' })
limit(30)




// skip.md
================

# .skip()

// Example:

// Get second page (25 users per page)
User.find()
.skip(25)
.limit(25);

// Example:
User.find()
.where({ name: 'mike' })
.skip()




// sort.md
================

# .sort()

// Example:


// Sort A-Z by name
User.find()
.sort('name ASC').exec(..)



// Sort oldest to youngest
User.find()
.sort('age DESC').exec(..)







More examples


User.find()
	.where({
		firstName: { '>': 'r' }
	})
	.sort('firstName ASC')
	.exec(…)








// Old way (this is not the right way)

User.find({
  where: {
    name: 'mike'
  }
})


