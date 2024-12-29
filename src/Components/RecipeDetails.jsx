import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recipeDetail } from '../Redux/Slice/recipeSlice';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Box,
  Grid,
  Divider,
} from "@mui/material";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe, status } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(recipeDetail(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Error: Failed to fetch recipe details
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        alt={recipe.name}
        height="400"
        image={recipe.image}
        sx={{ objectFit: 'cover', borderRadius: 2 }}
      />
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {recipe.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {recipe.cuisine} | {recipe.difficulty} | {recipe.caloriesPerServing} Calories
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Prep Time: {recipe.prepTimeMinutes} mins | Cook Time: {recipe.cookTimeMinutes} mins | Servings: {recipe.servings}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Rating: ⭐ {recipe.rating} ({recipe.reviewCount} reviews)
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Ingredients
              </Typography>
              <List>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Instructions
              </Typography>
              <List>
                {recipe.instructions && recipe.instructions.map((instruction, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={`${index + 1}. ${instruction}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" display="block" align="center" color="textSecondary">
          © 2024 Recipe App - All Rights Reserved
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;
