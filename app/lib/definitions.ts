// export type Hero = {
//   overline: string;
//   headline: string;
//   paragraph: string;
//   backgroundImage: string;
// };

export type NavLink = { id: number; linkName: string; url: string };

export type Chapter = {
  id: number,
  position: number,
  story_id: number,
  title: string,
  author: string,
  created_at: Date,
  contents: string
};

// export type Products = {
//   headline: string;
//   items: Product[];
//   totalPages: number;
// };

// export type Product = {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
//   price: number;
//   tag?: {text: string, highlighted: boolean};
// };

// export type Pagination = {
//   totalPages: number;
//   currentPage: number;
//   setCurrentPage: Function;
// };

// export type Filter = {
//   filterBy?: string;
//   setFilterBy: Function;
// };
