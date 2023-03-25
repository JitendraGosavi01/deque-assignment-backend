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
    return searchedData.data.items;
  }
}
