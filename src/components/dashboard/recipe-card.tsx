import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Star } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      {recipe.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </div>
          <Badge variant="outline" className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.cookingTime} mins
          </div>
          <div className="flex items-center">
            <ChefHat className="w-4 h-4 mr-1" />
            {recipe.calories} cal
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" fill="currentColor" />
            {recipe.ratings.toFixed(1)} ({recipe.reviewCount})
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.category.map((cat) => (
            <Badge key={cat} variant="secondary">{cat}</Badge>
          ))}
          {Object.entries(recipe.dietaryInfo)
            .filter(([, value]) => value)
            .map(([key]) => (
              <Badge key={key} variant="outline">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}