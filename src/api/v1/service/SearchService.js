import axios from "axios";
export default class SearchService {
  /**
   * It takes in a search context, a start index and a max result, and returns a list of books that
   * match the search context
   * @param searchContext - The search context, which is the keyword that the user is searching for.
   * @param startIndex - The position in the collection at which to start. The index of the first item
   * is 0.
   * @param maxResult - The maximum number of results to return. Acceptable values are 0 to 40,
   * inclusive. The default is 10.
   * @returns The data from the API call is being returned.
   */
  async getSearchResult(searchContext, startIndex, maxResult) {
    const url = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyA4_EneAdQ8A68E-_XWMm-RNgfULxkMsXs&q=${searchContext}&startIndex=${startIndex}&maxResults=${maxResult}`;
    const searchedData = await axios.get(url);
    const author = this.mostCommonAuthor(searchedData?.data?.items);
    return { data: searchedData.data.items, author };
  }

  /**
   * It takes an array of objects, maps the authors from each object, flattens the array, filters out
   * any undefined values, creates an object with the author as the key and the number of times the
   * author appears as the value, sorts the object by the number of times the author appears, and
   * returns the author with the highest count
   * @param items - The array of items returned from the API call.
   * @returns The most common author in the list of books.
   */
  mostCommonAuthor(items) {
    const authors = items
      ?.map((ele) => ele?.volumeInfo?.authors)
      .flat(1)
      .filter((ele) => ele);

    let authorsByCount = {};
    for (const ele of authors) {
      if (authorsByCount[ele.toLowerCase()] !== undefined) {
        authorsByCount[ele.toLowerCase()] += 1;
      } else {
        authorsByCount[ele.toLowerCase()] = 1;
      }
    }

    let sortedObj = Object.entries(authorsByCount).sort((a, b) => a[1] - b[1]);
    let len = sortedObj.length;
    if (sortedObj[len - 1][1] > 1) {
      return sortedObj[len - 1][0].toUpperCase();
    }
    return "";
  }
}
