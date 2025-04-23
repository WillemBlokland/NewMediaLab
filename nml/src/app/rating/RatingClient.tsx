'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Box, Button, Rating } from "@mui/material";

interface Story {
  "": number;
  Title: string;
  Author: string;
}

export default function RatingClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  useEffect(() => {
    if (!id) return;
    async function fetchStory() {
      try {
        const response = await fetch("/mock_data/short_stories.json");
        if (!response.ok) throw new Error("Failed to load stories");

        const data = await response.json();
        const parsedId = id ? parseInt(id) : null;
        const storyData = data.find((story: Story) => story[""] === parsedId);
        if (storyData) setStory(storyData);
        else console.error("Story not found.");
      } catch (err) {
        console.error("Error fetching story:", err);
      }
    }
    fetchStory();
  }, [id]);

  if (!story) return <Typography>Story not found.</Typography>;

  const handleRatingChange = (event: any, newValue: number | null) => {
    setRating(newValue);
  };

  const handleSubmitRating = () => {
    if (rating !== null) {
      console.log(`User rated "${story.Title}" by ${story.Author} with ${rating} stars.`);
      router.push("/recommendations");
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h3" gutterBottom>
        Rate "{story.Title}"
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        By {story.Author}
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Typography variant="body1">Rate this story:</Typography>
        <Rating
          value={rating}
          onChange={handleRatingChange}
          precision={0.5}
          size="large"
          sx={{ marginLeft: 2 }}
        />
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleSubmitRating}>
          Submit Rating
        </Button>
      </Box>
    </Box>
  );
}
