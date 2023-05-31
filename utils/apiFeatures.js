class APIFeatures {

    constructor(query, queryString) {

        this.query = query;

        this.queryString = queryString;

    }

    /**
     * Filters the query from the client's request and
     * excludes page, sort, limit and fields variables.
     * 
     * Replace in the query gte/gt/lte/lt with the coresponding
     * mongoDB $operators.
     * 
     */
    filter() {
        const queryObj = {...this.queryString};
            //-> Needs to create a new object bc in JS, create a variable 
                //from an object just creates a reference of that variable
            //... : destructuring to get every variables from req.query
            //{}  : to create a new object
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((element) => {
            delete queryObj[element];
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            return `$${match}`;
        });

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    /**
     * Sort the query from the client's request.
     * If sorting not specified, default sort by createdAt.
     */
    sort() {
        if (this.queryString.sort) {

            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);

        } else {

            this.query = this.query.sort('-createdAt');

        }

        return this;
    }

    /**
     * Limit the fields to show to the user.
     */
    limitFields() {
        if (this.queryString.fields) {

            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);

        } else {

            this.query = this.query.select('-__v')

        }

        return this;
    }

    /**
     * Implement pagination.
     */
    pagination() {
        const page = this.queryString.page * 1 || 1; // * 1 : convert string to number
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        console.log("page", page, "limit", limit, "skip", skip);

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

module.exports = APIFeatures;