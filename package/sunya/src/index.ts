#!/usr/bin/env node

interface User {
  name: string;
}

const greet = (user: User): void => {
  console.log(`Hello, ${user.name}! This is how Sunya was started!`);
};

greet({ name: "Developer" });