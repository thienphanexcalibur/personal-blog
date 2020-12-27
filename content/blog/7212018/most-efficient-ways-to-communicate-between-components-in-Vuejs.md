---
layout: Post
title: Most efficient ways to communicate between components in Vuejs
thumbnail: /img/vuejs.png
content: VueJS has increasingly become a top of mind framework in front end development lately. By reckoning, it harnesses the best features of both ReactJS and AngularJS and did a good job in both DOM manipulations and State Mangement (Vuex).
pageClass: post
sidebar: false
footer: Thien
id: 7856
---
VueJS has increasingly become a top of mind framework in front end development lately.

By reckoning, it harnesses the best features of both ReactJS and AngularJS and did a good job in both DOM manipulations and State Mangement ([Vuex](https://vuex.vuejs.org/)).

In this article, we shall take a closer view at most efficient ways to pass data between components in VueJS. The explanations below are in [Singe File Component](https://vuejs.org/v2/guide/single-file-components.html) format.

## **1. Passing through props:**

- **UserDetails.vue**

`embed:userdetails.vue`

We decide to make the user detail component reusable with 2 props: `name` and `id`. Hence, we will pass the data via props:

- **ParentComponent.vue**

`embed:parentscomponent.vue`

The user details are now a child component, it receives the data in the parent as the result of doing some async work. The data maybe retrieved from an API. After having dispatched the action `getUserDetail`, the state now received retrieved a new user object. We assigned the new value into the `UserDetail` component by writing them inline just like HTML attributes. Easy Peasy!

## **2. Passing through state:**

You can read more about Vuex [here](https://vuex.vuejs.org/)

Every components can have global access to state through this.\$store.state or using helper mapState.

## **3. Passing through Event:**

### **3.1. Emit/Listen to events in instance scope:**

Supposedly we have a component:

`embed:emit.vue`

At instance scope (or at single file component scope), we are only able to emit and listen to event freely. Outside this scope, it can’t be done. In this example, when we click the button to run `emitEvent` to emit a local event named `INIT_USER`, then listen to the event whenever it’s emitted by running `listenEvent` function. So here comes another problem, what if we want to communicate with another component in another instance scope? Keep readin’!

### **3.2. Emit/Listen to events in global scope:**

This is a little bit tricky for a beginner who have just started to learn VueJS. Global Event Bus is here to control all of the events emit from Root.

First, we create `event-bus.js` then declare a Vue instance as an export. Now we can emit and listen to an event in any components in our application.

- **event-bus.js**

`embed:bus.js`

Second, learn how to play with it:

- **ComponentA.vue**

`embed:globalbusevent.vue`

When component A is mounted, we emit a global event named `INIT_USER`, passing a arbitrary value. In other component:

- **ComponentB.vue**

`embed:listen.vue`

When component B is mounted, we listen to a global event named `INIT_USER`, passing a callback function with argument is message which is the value emitted from Component A then execute the callback function with given value.</b></a></b></p>

## **4. Passing through vue-router:**

Demonstrations:

::: tip
There are 3 modes when passing data to props through routers.
:::

### **4.1. Boolean mode:**

It will only receive a boolean value either true or false, each parameters passed from components A is going to be the value of component B’s props. For example:

`embed:boolean.js`

When routing to Component B, the props inside will receive the reflected value. It’s equivalent when we declared a default value for props id in Component B.

:::warning
`id` must be declared as a prop in component B
:::

### **4.2. Object mode:**

Just like the Boolean Mode, we will decouple the props in Component B using [Object Destructuring (ES6)](https://babeljs.io/docs/en/learn/#destructuring) and pass the value we want through router. Props declared in Component B:

`embed:object.js`

### **4.3. Function mode**

`embed:function.js`

You can pass the route argument here is \$route contain the route data from Comp B in the callback. Extracting data from `$route` and do something before routing to Comp B. Otherwise, the argument of the function is optional yet you must return an object contain props.

Personally, I love this feature from VueJS due to its amazing versatility. If it’s done right, then it will be quite powerful.

## **5. Passing through LocalStorage or Cookies (disencouraged)**
