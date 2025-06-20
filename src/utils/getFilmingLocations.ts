/**
 * Fetches filming locations for a given movie title from Wikipedia, using the Wikipedia api.
 * @param {string} movieTitle - The title of the movie the user has searched for.
 * @returns {Promise<string[]>} - A promise that resolves to an array of filming locations.
 */
export async function getFilmingLocations(movieTitle: string): Promise<string[]> {
  try {
    // GET section list to find "Filming" index

    movieTitle = movieTitle.toLowerCase().split(' ').map((word: any) => {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' '); // this changes the movie title to be in the correct format for the wikipedia api

    const sectionsRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&prop=sections&page=${encodeURIComponent(
        movieTitle
      )}&format=json&origin=*`
    );
    const sectionsData = await sectionsRes.json();

    const filmingSection = sectionsData?.parse?.sections.find(
      (section: any) => section.line.toLowerCase().includes("filming")
    );

    if (!filmingSection) {
      throw new Error("Filming section not found.");
    }

    const sectionIndex = filmingSection.index;

    // Fetch "Filming" section text
    const textRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
        movieTitle
      )}&section=${sectionIndex}&prop=text&format=json&origin=*`
    );
    const textData = await textRes.json();
    const html = textData?.parse?.text?.["*"];

    if (!html) throw new Error("No HTML returned.");

    // Extract links from HTML
const tempDiv = document.createElement("div");
tempDiv.innerHTML = html;

// Get all <a> tags with title attributes from the json response
const allLinks = Array.from(tempDiv.querySelectorAll("a[title]"));

// Filter out links that are not likely to be locations
const excludeTerms = [
  "Pictures",
  "Studios",
  "Films",
  "Director",
  "Producer",
  "Actor",
  "Screenplay",
  "Award",
  "Production",
  "Film",
];

const possibleLocations = allLinks
  .map(a => a.getAttribute("title"))
  .filter((title): title is string => !!title)
  .filter(title =>
    title.length > 2 && // Filter out very short titles
    !excludeTerms.some(term => title.includes(term))
  )
  .filter(title => // check for common location patterns
    /^[A-Z][a-z]+(, [A-Z][a-z]+)?$/.test(title) || // e.g. "Belfast, Northern Ireland"
    title.includes("Mountain") ||
    title.includes("Park") ||
    title.includes("Beach") ||
    title.includes("City") ||
    title.includes("Island") ||
    title.includes("County") ||
    title.includes("Province") ||
    title.includes("State") ||
    title.includes("Village") ||
    title.includes("Town") ||
    title.includes("District") ||
    title.includes("Square") ||
    title.includes("Street") ||
    title.includes("Road") ||
    title.includes("Avenue") ||
    title.includes("Boulevard") ||
    title.includes("Plaza") ||
    title.includes("Harbor") ||
    title.includes("Port") ||
    title.includes("Bay") ||
    title.includes("River") ||
    title.includes("Lake") ||
    title.includes("Waterfall") ||
    title.includes("Canyon") ||
    title.includes("Forest") ||
    title.includes("Woods") ||
    title.includes("Jungle") ||
    title.includes("Desert") ||
    title.includes("Valley") ||
    title.includes("Hill") ||
    title.includes("Cave") ||
    title.includes("Ruins") ||
    title.includes("Castle") ||
    title.includes("Palace") ||
    title.includes("Fort") ||
    title.includes("Monument") ||
    title.includes("Memorial")
  );

// Remove duplicates
const uniqueLocations = Array.from(new Set(possibleLocations));

return uniqueLocations.length ? uniqueLocations : ["No clear locations found."];

    
  } catch (error) {
    console.error("Error fetching filming locations:", error);
    return ["Could not retrieve filming location."];
  }
}
