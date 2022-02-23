# Lab2 a.k.a. Linked List Editor (LLE)

### Variant of Laboratory Work#2

    410 % 2 = 0 --> Circular Linked List

### Theory

Circular Linked List is a data structure which represents a list of nodes. Each of nodes contains 2 types of data: value
and link to the next node. "Circular" means that link to next node in the last element of the list (tail) will point at 
the first element of the list (head).

### Usage

This is a simple JS script for Node.js, which lets you create and edit circular linked list. Just follow the instructions
below to run LLE. You can use LLE for different list manipulations (extend, delete, copy, get elements...). 
Terminal commands to install Node.js and download this project:

    sudo apt-get install nodejs
    sudo apt-get install npm
    git clone https://github.com/stormy131/Lab2.git
    cd Lab2
    npm i
    npm i -D typescript

Go to the directory of LLE project and now you can use it. All possible usage is shown in "list.ts" below the List class. 
Just write down your manipulations instead of demo-usage and run the commands below to run the project:

    tsc -t es5 list.ts
    node list.js

To run tests and check the correctness of the script type and run this command:

    npm run test

### Commit with failed tests in CI 

https://github.com/stormy131/Lab2/commit/57b0db44f7de3a8c92e46c3964b97a035e128e3e