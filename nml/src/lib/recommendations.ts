interface Story {
  [""]: number; // ID
  Title: string;
  Author: string;
  Rating: number;
  Img: string;
  Minutes: number;
  Genres: string;
}

export interface Preferences {
  preferredGenres: string[];
  preferredLength: string;
}

function parseLengthRange(length: string): [number, number] {
  switch (length) {
    case "< 5 minutes":
      return [0, 5];
    case "5 - 10 minutes":
      return [5, 10];
    case "10 - 15 minutes":
      return [10, 15];
    case "15 - 20 minutes":
      return [15, 20];
    case "20 - 30 minutes":
      return [20, 30];
    case "30 - 50 minutes":
      return [30, 50];
    case "50 - 80 minutes":
      return [50, 80];
    default:
      return [0, Infinity]; // Fallback in case no length is selected
  }
}

export function getRecommendedStories(
  allStories: Story[],
  preferences: Preferences
): Story[] {
  const [minMinutes, maxMinutes] = parseLengthRange(preferences.preferredLength);

  return allStories
    .filter((story) => {
      const genreMatch =
        preferences.preferredGenres.length === 0 ||
        preferences.preferredGenres.some((genre) =>
          story.Genres.toLowerCase().includes(genre.toLowerCase())
        );

      const lengthMatch =
        story.Minutes >= minMinutes && story.Minutes <= maxMinutes;

      return genreMatch && lengthMatch;
    })
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 5);
}
