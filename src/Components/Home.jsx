import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../Redux/Slice/recipeSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  CardActionArea,
  Pagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, status } = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting: A-Z
  const recipesPerPage = 6;

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered recipes
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name); // A-Z
    }
    return b.name.localeCompare(a.name); // Z-A
  });

  // Pagination logic
  const totalRecipes = sortedRecipes.length;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, startIndex + recipesPerPage);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Error: Failed to fetch recipes
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Recipe Collection
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        {/* Sort Dropdown */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Recipes Grid */}
      <Grid container spacing={3}>
        {currentRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image || "https://via.placeholder.com/300"}
                  alt={recipe.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.cuisine} | {recipe.caloriesPerServing} Calories
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          siblingCount={1}
        />
      </Box>
    </Box>
  );
};

export default Home;
