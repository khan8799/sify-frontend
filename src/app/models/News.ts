export interface News {
  _id: string;
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
  source: {
    id: string;
    name: string;
  };
  isBookmark?: boolean;
  publishedAt: string;
}