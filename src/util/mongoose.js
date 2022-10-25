module.exports = {
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((mongooseArray) => mongooseArray.toObject());
    },
    mongooseToObject: function (mongooseObject) {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject;
    },
};
