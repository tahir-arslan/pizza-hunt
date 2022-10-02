Modul 18
`NoSQL`: learn about NoSQL databases that allow you to easily store and retrieve unstructured data (can sig improve performance for some applications especially the ones that use a lot of data)
    use `MongoDB` (popular NoSQL db) to store data using `documents` in `BSON format` (JSON-like object) (aka binary javascript object notation) allows us to do CRUD operations
    use `Mongoose` (object document mapper or ODM) to map MongoDB's document representations of data to a virtual object database. This uses an object-oriented approach similar to how an ORM maps relational representations of data to objects.

MongoDB stores data similar to JSON format, organized in `collections` rather than tables (with no reliance on schemas to help normalize data, we could add both objects into same `collection`:
        {
            "name": "Lernantino",
            "age": 100
        }

        {
            "username": "Lernantino",
            "userAge": 100
        }

can add different property names in same collection, but now as developer it is our responsibility for adding data normalization rules to enure predictability. However with this method we don't need to update database to accept more data. After the previous BSON object, we can also add the following:
        {
            "username": "Lernantino",
            "userAge": 100,
            "email": "lernantino@mongo.com"
        }

Differences between MongoDB and SQL
- data organized into collections instead of tables
- single set of data in collection is called a `document` (instead of row like in SQL)
- `fields` instead of `columns`
- MongoDB commands resemble JS commands
- SQL can only grow vertically on same server with predefined tables
- NoSQL can grow horizontally and scale over mutliple servers with 'dynamic' tables
- NoSQL bd allows data to be organized in a heirarchy (ex. subdocuments)
Similarities:
- can access both via command line

sometimes SQL is the right answer:
- fast response time, consistent dataset size

somethings NoSQL is the right answer:
- large dataset, evolving data

Library `Mongoose` will be used to handle connection between API and MongoDB db
    can use `MongoDB Node.js` library, but `Mongoose` (ODM) has more features

like all Node.js libraries, need to install it first with `npm install mongoose`

then create `models` folder in root for Mongoose collections just like Sequelize

when coding connection to Mongoose in `server.js` we did not define db but still told it to connecto to a db called `pizza-hunt`. If mongoose is told to connect to a db it cannot find, then it will create it.

                                        const dogObject = {
                                        // this...
                                        bark: function() {
                                            console.log('Woof!');
                                        },

                                        // ... is the same as this
                                        bark() {
                                            console.log('Woof!');
                                        }
                                        }

after starting server and posting new data, will see a `__v` field. this is added by Mongoose for it's own internal version tracking of a docment, and offers some advanced use cases for developers

18.2
`virtuals` allow you to add virtual properties to a document that aren't stored in the DB. normally are computed values that get evaluated when you try to access their properties
    in this lesson, we want to get a count of how many comments a pizza has. to maintain this count as persistent data in db, have to update it anytime someone adds/deletes a comment. but want to avoid helper function as it will then reduce complexity of controllers. therefore can use `virtuals`. 
        allow us to add more info to db respons so we don't have to add it manually with helper before responding to API request
    don't forget to tell schema that it can use virtuals with `toJSON` property in schema options

with SQL, we joined two tables together to resolve a problem. with MongoDB, we `populate` field with `.populate( )`

`getters` transforms data by default everytime it's queried. typically a special type of cuntion that takes stored data and modifies/formats it upon return (kind of like middleware for your data)
    in mongoose, just ned to add the `get` key to field we are looking to use (ex. in this case `createdAt` to modify date)

18.3
`accumulator` used inside `.reduce( )` by continually adding to a value within scope of method. by default, in `.reduce( )` then divides by length of entire array. this method is great for calculating value based off an accumulation of values in an array

using `{ $push }` operator allows for duplicates. to avoid this, can use the code `{ $addToSet }`