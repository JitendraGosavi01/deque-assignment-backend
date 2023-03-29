import SearchService from "../service/SearchService.js";
const searchService = new SearchService();
export default class SearchController {
  /**
   * It takes the search context, start index and max result from the request query and then calls the
   * getSearchResult function of the searchService
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   * @returns The search result is being returned.
   */
  static async getSearchData(req, res, next) {
    const searchContext = req.query.text.trim();
    const startIndex = req.query.startIndex;
    const maxResult = req.query.maxResults;
    if (searchContext === "") {
      return res.status(400).json({
        data: "",
        message: "Invalid search string",
        status: 400,
      });
    } else {
      try {
        const { data, author } = await searchService.getSearchResult(
          searchContext,
          startIndex,
          maxResult
        );
        res.status(200).json({
          data,
          metadata: { mostCommonAuthor: author },
          msg: "success",
          status: 200,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}
