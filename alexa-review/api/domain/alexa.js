export class alexa {
    constructor(review, author, review_source, rating, title, product_name, reviewed_date) {
        this.review = review;
        this.author = author;
        this.review_source = review_source;
        this.rating = rating;
        this.title = title;
        this.product_name = product_name;
        this.reviewed_date = reviewed_date;
    }

     getAvgRating(reviewObjs){
        const count = reviewObjs.length;
        for (let index = 0; index < reviewObjs.length; index++) {
            const element = reviewObjs[index];
            
        }
    }


}