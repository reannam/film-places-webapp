/**
 * Fetches movie-specific Wikipedia pages for a search term, filtering out people/crew.
 * @param {string} movieTitle - The title of the movie or series.
 * @returns {Promise<string[]>} - Titles of matching movies/films only for that page.
 */
export async function getMovies(movieTitle: string): Promise<string[]> {
  try {

    movieTitle = movieTitle.toLowerCase().split(' ').map((word: any) => {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join('+'); // this changes the movie title to be in the correct format for the wikipedia api 
        // (e.g. "the lord of the rings" becomes "The+Lord+Of+The+Rings")
    console.log(movieTitle);


    // Fetch search results from Wikipedia
    const response = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(movieTitle)}&limit=50&format=json&origin=*`
    );
    const data = await response.json();
    const pages = data.pages;

    // potential words to exclude from titles
    const excludeWords = ["series", "tv", "show", "television", "episode", "fandom", "soundtrack", "character", "score"];

    // Filter for pages whose description contains 'film' or 'movie'
    const filteredMovies = pages.filter((page: any) => {
      const desc = page.description?.toLowerCase() || "";
      return (desc.includes("film") || desc.includes("movie")) && !excludeWords.some(term => page.title.toLowerCase().includes(term));
    });

    
    if (!filteredMovies.length) {
      console.log("No matching movie pages found.");
      return ["No clear movies found."];
    }

    // Return their titles, with the word "film" removed if present
    const movieTitles = filteredMovies.map((page: any) => page.title);
    var trimmedMovieTitles;
    if (movieTitles.some((title: string | string[]) => title.includes("film"))) {
        trimmedMovieTitles = movieTitles.map((title: string) => title.replace("(film)", " ").trim());
    }
    else { trimmedMovieTitles = movieTitles; }



    console.log("Movies found:", trimmedMovieTitles);
    
    return trimmedMovieTitles;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return ["Could not retrieve any matching movies."];
  }
}