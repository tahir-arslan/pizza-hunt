const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// don't need to use special imported data types for the `types` definition
const PizzaSchema = new Schema(
        {
        pizzaName: {
            type: String,
            // since MongoDB doesn't care about rules at all, we need to use Mongoose to
            // implement these rules
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            // can also do the following for a custom message:
            // required: 'You need to provide a pizza name!',
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // this is a virtual that mongoose returns and we don't need it
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;