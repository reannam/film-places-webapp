// src/utils/getFilmingLocations.ts
export async function getFilmingLocations(movieTitle: string): Promise<string[]> {
  try {
    // Step 1: Get section list to find "Filming" index
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

    // Step 2: Fetch "Filming" section text
    const textRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
        movieTitle
      )}&section=${sectionIndex}&prop=text&format=json&origin=*`
    );
    const textData = await textRes.json();
    const html = textData?.parse?.text?.["*"];

    if (!html) throw new Error("No HTML returned.");

    // Step 3: Extract filming locations from HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const paragraphs = Array.from(tempDiv.querySelectorAll("p")).map(p => p.textContent?.trim() ?? "");

    // Optional: extract only lines mentioning places
    const locations = paragraphs
      .join(" ")
      .split(/[.?!]/) // split by sentence
      .filter(sentence =>
        /(filmed in|filming took place|shot in|locations included|scenes were filmed)/i.test(sentence)
      )
      .map(sentence => sentence.trim());

    return locations.length ? locations : ["No specific filming locations found."];
  } catch (error) {
    console.error("Error fetching filming locations:", error);
    return ["Could not retrieve filming location."];
  }
}
