class NewsArticle {
	title: string;
	abstract: string;
	byline: string;
	short_url: string;
	image: string;
	published_date: string;
	is_favorite: boolean;

	static fromJSON(item: any) {
		return new NewsArticle(item.title, item.abstract, item.byline, item.short_url, item.image, item.published_date, item.is_favorite);
	}

	constructor(title: string, abstract: string, byline:string, short_url: string, image: string, published_date: string, is_favorite:boolean) {
    	this.title = title;
    	this.abstract = abstract;
    	this.byline = byline;
    	this.short_url = short_url;
    	this.image = image;
    	this.published_date = published_date;
    	this.is_favorite = is_favorite;
  	}

	firstImage() {
		if(this.image) return this.image;
		return 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg'
	}

	altImage() {
		return "alt-img"
	}
}

export default NewsArticle;
