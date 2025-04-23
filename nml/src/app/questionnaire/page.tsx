"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container, Typography, FormControl, FormLabel,
  FormGroup, FormControlLabel, Checkbox, Button, Box, RadioGroup, Radio, TextField
} from "@mui/material";

export default function Questionnaire() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [storyLength, setStoryLength] = useState<string>("");
  const [specificInterest, setSpecificInterest] = useState<string>("");

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.name;
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoryLength(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      username,
      preferredGenres: selectedGenres,
      preferredLength: storyLength,
      specificInterest,
    };

    console.log("Questionnaire submitted:", formData);
    localStorage.setItem("userPreferences", JSON.stringify(formData));
    router.push("/recommendations");
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Questionnaire
        </Typography>

        {/* Genres */}
        <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
          <FormLabel component="legend">What kind of genres do you want to read?</FormLabel>
          <FormGroup>
            {[
              "Adventure", "Childrens", "Fantasy", "Gothic", "Horror",
              "Literary", "Mystery", "Poetry", "Quirky", "Sci-fi",
              "Tragedy", "War"
            ].map((genre) => (
              <FormControlLabel
                key={genre}
                control={<Checkbox name={genre} checked={selectedGenres.includes(genre)} onChange={handleGenreChange} />}
                label={genre}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Length */}
        <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
          <FormLabel component="legend">How long do you want the story to be?</FormLabel>
          <RadioGroup value={storyLength} onChange={handleLengthChange}>
            {[
              "< 5 minutes",
              "5 - 10 minutes",
              "10 - 15 minutes",
              "15 - 20 minutes",
              "20 - 30 minutes",
              "30 - 50 minutes",
              "50 - 80 minutes"
            ].map((length) => (
              <FormControlLabel
                key={length}
                value={length}
                control={<Radio />}
                label={length}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Free-text input */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <FormLabel component="legend">Are you interested in anything in particular?</FormLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="e.g. dragons, space travel, friendships..."
            sx={{ mt: 1 }}
            value={specificInterest}
            onChange={(e) => setSpecificInterest(e.target.value)}
          />
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
