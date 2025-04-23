"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getRecommendedStories, Preferences } from "@/lib/recommendations"; // 👈 import logic

interface Story {
  "": number;
  Title: string;
  Author: string;
  Img: string;
  Rating: number;
  Minutes: number;
  Genres: string;
}

export default function Recommendations() {
  const [stories, setStories] = useState<Story[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch("/mock_data/short_stories.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: Story[] = await response.json();

        const storedPrefs = localStorage.getItem("userPreferences");
        if (!storedPrefs) {
          setError("No preferences found.");
          return;
        }

        const preferences: Preferences = JSON.parse(storedPrefs);
        const recommended = getRecommendedStories(data, preferences);
        setStories(recommended);
      } catch (err) {
        console.error("Error loading stories:", err);
        setError("Failed to load stories. Please try again later.");
      }
    }

    fetchStories();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recommended Stories</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {stories.length > 0 ? (
          stories.map((story) => (
            <Card key={story[""]} sx={{ width: 200 }}>
              <Image src={story.Img} alt={story.Title} width={200} height={300} />
              <CardContent>
                <Typography variant="h6">{story.Title}</Typography>
                <Typography variant="body2">By {story.Author}</Typography>
                <Button component={Link} href={`/book_information/${story[""]}`} sx={{ mt: 1 }}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
