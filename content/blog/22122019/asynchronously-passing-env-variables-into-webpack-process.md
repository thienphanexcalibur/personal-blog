---
title: Asynchronously passing env variables into webpack process
description: Finding an elegant and maintainable way to passing webpack env variables asynchronously?
id: 7486
---

This is my take when dealing with asynchronous passing env variables into webpack process.
It should keep your code maintainable and more readable

__1.__ Supposedly we are using ```cross-env``` to pass variables into webpack process.

`embed:crossenv.js`

```av``` is an arbitrary variable and it needs to have the value from a series of  asynchronous actions

__2.__ Now define ```stdou.js``` as a nodejs process in which output of this acts as a stdout to our webpack process

`embed:async.js`

__3.__ Next, using ```xargs``` with ```{}``` placeholder to replace the value of our ```av```

`embed:xargs.bash`

The outpout from stdou.js process is piped to webpack env variables ```av```

__4.__ For example:

The output from stdou.js is:

`embed:output.json`

It is now ```av``` value you passed into webpack process asynchronously

__5.__ Finally, calling ```process.env.av``` in your webpack config to use the value normally.

