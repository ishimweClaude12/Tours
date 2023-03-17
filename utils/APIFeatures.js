class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;

    }
    filter(){
        const queryObj = {...this.queryString};
        console.log(this.queryString)
        const excludedFields = ["page",  "sort", "limit", "fields"];
        excludedFields.forEach(el => delete queryObj[el]);
        
// Advanced Filtering
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);

        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort(){
        if(this.queryString.sort){
            this.query = this.query.sort(this.queryString.sort)
        }
        return this;
    }
    limit(){
        //Limitting some fields
if(this.queryString.fields){
    const fields = this.queryString.fields.split(',').join(' ');
    this.query = this.query.select(fields)
}
else
{
    this.query = this.query.select('-__v')
}
return this;

    }
    paginate(){
        //Paginaiton

const page = this.queryString.page * 1 || 1
const limit = this.queryString.limit * 1 || 100;
const skip = (page -1) * limit;
this.query = this.query.skip(skip).limit(limit);


return this;
    }
}

module.exports = APIFeatures;