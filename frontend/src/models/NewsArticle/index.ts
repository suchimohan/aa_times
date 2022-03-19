class NewsArticle {
	title: string;
	abstract: string;
	byline: string;
	short_url: string;
	multimedia: any;
	published_date: string;

	static fromJSON(item: any) {
		return new NewsArticle(item.title, item.abstract, item.byline, item.short_url, item.multimedia, item.published_date);
	}

	constructor(title: string, abstract: string, byline:string, short_url: string, multimedia: any, published_date: string) {
    	this.title = title;
    	this.abstract = abstract;
    	this.byline = byline;
    	this.short_url = short_url;
    	this.multimedia = multimedia;
    	this.published_date = published_date;
  	}

	firstImage() {
		return this.multimedia?.[0]?.url
	}

	altImage() {
		return "alt-img"
	}
}

export default NewsArticle;
