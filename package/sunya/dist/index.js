#!/usr/bin/env node
"use strict";
const greet = (user) => {
    console.log(`Hello, ${user.name}! This is how Sunya was started!`);
};
greet({ name: "Developer" });
