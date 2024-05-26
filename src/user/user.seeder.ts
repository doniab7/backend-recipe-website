import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { Meal } from '../entities/meal.entity';
import { Ingredient, IngredientType } from '../entities/ingredient.entity';
import { Step } from '../entities/step.entity';
import { Category } from '../entities/category.entity';
import { CategoryName } from '../entities/category.entity';
import * as bcrypt from 'bcrypt';

const userSeedData = [
  {
    username: 'donia',
    email: 'donia@example.com',
    password: 'admin',
    ImageProfile: 'profile_donia.jpg',
    meals: [
      {
        name: 'Spaghetti Carbonara',
        duration: 30,
        numberLikes: 0,
        description:
          'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
        region: 'Italy',
        thumbnail: '1714734679363.jpg',
        category: { name: CategoryName.PASTA },
        ingredients: [
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Spaghetti', type: IngredientType.PIECE, quantity: 200 },
          { name: 'Eggs', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Pancetta', type: IngredientType.PIECE, quantity: 100 },
          { name: 'Black pepper', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Parmesan cheese', type: IngredientType.KG, quantity: 0.05 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Cook the spaghetti in boiling salted water until al dente.',
          },
          {
            rank: 2,
            description: 'In a separate pan, cook the pancetta until crispy.',
          },
          {
            rank: 3,
            description:
              'In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.',
          },
          {
            rank: 4,
            description:
              'Once the spaghetti is cooked, drain it and add it to the pan with the pancetta.',
          },
          {
            rank: 5,
            description:
              'Pour the egg and cheese mixture over the hot spaghetti and toss until the pasta is coated and the sauce thickens.',
          },
          {
            rank: 6,
            description:
              'Serve immediately, garnished with additional grated Parmesan cheese and black pepper.',
          },
        ],
      },
      {
        name: 'Beef Stroganoff',
        duration: 45,
        numberLikes: 0,
        description:
          'A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).',
        region: 'Russia',
        thumbnail: 'beef_stroganoff.jpg',
        category: { name: CategoryName.BEEF },
        ingredients: [
          { name: 'Beef', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Mushrooms', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Onion', type: IngredientType.PIECE, quantity: 1 },
          { name: 'Butter', type: IngredientType.KG, quantity: 0.05 },
          { name: 'Flour', type: IngredientType.KG, quantity: 0.03 },
          { name: 'Beef broth', type: IngredientType.ML, quantity: 250 },
          { name: 'Sour cream', type: IngredientType.ML, quantity: 150 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Black pepper', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'In a large skillet, melt butter and sauté onions and mushrooms until soft.',
          },
          {
            rank: 2,
            description: 'Add sliced beef and cook until browned on all sides.',
          },
          {
            rank: 3,
            description: 'Sprinkle flour over the beef and stir to combine.',
          },
          {
            rank: 4,
            description: 'Slowly add beef broth while stirring continuously.',
          },
          {
            rank: 5,
            description:
              'Reduce heat and let it simmer until the sauce thickens.',
          },
          {
            rank: 6,
            description: 'Stir in sour cream and cook for a few more minutes.',
          },
          {
            rank: 7,
            description: 'Serve hot over egg noodles or rice.',
          },
        ],
      },
      {
        name: 'Chocolate Cake',
        duration: 60,
        numberLikes: 0,
        description: 'A rich and moist chocolate cake perfect for dessert.',
        region: 'Global',
        thumbnail: 'chocolate_cake.jpg',
        category: { name: CategoryName.DESSERT },
        ingredients: [
          { name: 'Flour', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Sugar', type: IngredientType.KG, quantity: 0.25 },
          { name: 'Cocoa powder', type: IngredientType.KG, quantity: 0.075 },
          { name: 'Baking powder', type: IngredientType.KG, quantity: 0.01 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Eggs', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Milk', type: IngredientType.ML, quantity: 250 },
          { name: 'Vegetable oil', type: IngredientType.ML, quantity: 100 },
          { name: 'Vanilla extract', type: IngredientType.ML, quantity: 5 },
          { name: 'Boiling water', type: IngredientType.ML, quantity: 250 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Preheat the oven to 175°C (350°F) and grease a cake pan.',
          },
          {
            rank: 2,
            description:
              'In a large bowl, mix together flour, sugar, cocoa powder, baking powder, and salt.',
          },
          {
            rank: 3,
            description:
              'Add eggs, milk, oil, and vanilla extract and mix until smooth.',
          },
          {
            rank: 4,
            description: 'Stir in boiling water (batter will be thin).',
          },
          {
            rank: 5,
            description: 'Pour the batter into the prepared cake pan.',
          },
          {
            rank: 6,
            description:
              'Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.',
          },
          {
            rank: 7,
            description:
              'Let the cake cool in the pan for 10 minutes, then transfer to a wire rack to cool completely.',
          },
          {
            rank: 8,
            description:
              'Frost with your favorite chocolate frosting and serve.',
          },
        ],
      },
    ],
  },
  {
    username: 'farah',
    email: 'farah@example.com',
    password: 'admin',
    ImageProfile: 'profile_farah.jpg',
    meals: [
      {
        name: 'Beef Tacos',
        duration: 25,
        numberLikes: 0,
        description:
          'Delicious beef tacos made with seasoned ground beef, fresh vegetables, and tortillas.',
        region: 'Mexico',
        thumbnail: 'beef_tacos.jpg',
        category: { name: CategoryName.BEEF },
        ingredients: [
          { name: 'Ground beef', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Taco seasoning', type: IngredientType.KG, quantity: 0.03 },
          { name: 'Tortillas', type: IngredientType.PIECE, quantity: 8 },
          { name: 'Lettuce', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Tomatoes', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Cheddar cheese', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Sour cream', type: IngredientType.ML, quantity: 100 },
          { name: 'Salsa', type: IngredientType.ML, quantity: 150 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Cook the ground beef with taco seasoning until browned.',
          },
          {
            rank: 2,
            description: 'Warm the tortillas in a skillet or microwave.',
          },
          {
            rank: 3,
            description:
              'Assemble the tacos with beef, lettuce, tomatoes, cheese, sour cream, and salsa.',
          },
          {
            rank: 4,
            description: 'Serve immediately and enjoy.',
          },
        ],
      },
      {
        name: 'Caesar Salad',
        duration: 20,
        numberLikes: 0,
        description:
          'A classic Caesar salad with fresh romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.',
        region: 'Italy',
        thumbnail: 'caesar_salad.jpg',
        category: { name: CategoryName.SALAD },
        ingredients: [
          { name: 'Romaine lettuce', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Croutons', type: IngredientType.KG, quantity: 0.05 },
          { name: 'Parmesan cheese', type: IngredientType.KG, quantity: 0.03 },
          { name: 'Caesar dressing', type: IngredientType.ML, quantity: 100 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Black pepper', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description: 'Wash and chop the romaine lettuce.',
          },
          {
            rank: 2,
            description:
              'Toss the lettuce with Caesar dressing in a large bowl.',
          },
          {
            rank: 3,
            description: 'Add croutons and Parmesan cheese.',
          },
          {
            rank: 4,
            description: 'Season with salt and black pepper to taste.',
          },
          {
            rank: 5,
            description: 'Serve immediately.',
          },
        ],
      },
      {
        name: 'Chicken Noodle Soup',
        duration: 40,
        numberLikes: 0,
        description:
          'A hearty chicken noodle soup with tender chicken, vegetables, and egg noodles in a savory broth.',
        region: 'Global',
        thumbnail: 'chicken_noodle_soup.jpg',
        category: { name: CategoryName.SOUP },
        ingredients: [
          { name: 'Chicken breast', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Carrots', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Celery', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Onion', type: IngredientType.PIECE, quantity: 1 },
          { name: 'Egg noodles', type: IngredientType.KG, quantity: 0.15 },
          { name: 'Chicken broth', type: IngredientType.ML, quantity: 1000 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Black pepper', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Parsley', type: IngredientType.KG, quantity: 0.01 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'In a large pot, cook the chicken breast until fully cooked, then shred into pieces.',
          },
          {
            rank: 2,
            description:
              'Add chopped carrots, celery, and onion to the pot and sauté until tender.',
          },
          {
            rank: 3,
            description: 'Pour in the chicken broth and bring to a boil.',
          },
          {
            rank: 4,
            description: 'Add the egg noodles and cook until tender.',
          },
          {
            rank: 5,
            description: 'Season with salt, black pepper, and parsley.',
          },
          {
            rank: 6,
            description: 'Serve hot and enjoy.',
          },
        ],
      },
    ],
  },
  {
    username: 'ahmed',
    email: 'ahmed@example.com',
    password: 'admin',
    ImageProfile: 'profile_ahmed.jpg',
    meals: [
      {
        name: 'Greek Salad',
        duration: 15,
        numberLikes: 0,
        description:
          'A refreshing Greek salad with cucumbers, tomatoes, olives, and feta cheese.',
        region: 'Greece',
        thumbnail: 'greek_salad.jpg',
        category: { name: CategoryName.SALAD },
        ingredients: [
          { name: 'Cucumbers', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Tomatoes', type: IngredientType.PIECE, quantity: 4 },
          { name: 'Olives', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Feta cheese', type: IngredientType.KG, quantity: 0.15 },
          { name: 'Olive oil', type: IngredientType.ML, quantity: 50 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Oregano', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Chop the cucumbers and tomatoes into bite-sized pieces.',
          },
          {
            rank: 2,
            description:
              'Combine the cucumbers, tomatoes, and olives in a large bowl.',
          },
          {
            rank: 3,
            description: 'Crumble the feta cheese over the salad.',
          },
          {
            rank: 4,
            description:
              'Drizzle with olive oil and season with salt and oregano.',
          },
          {
            rank: 5,
            description: 'Toss gently and serve immediately.',
          },
        ],
      },
      {
        name: 'Penne Arrabbiata',
        duration: 25,
        numberLikes: 0,
        description:
          'A spicy Italian pasta dish made with penne, tomatoes, and red chili peppers.',
        region: 'Italy',
        thumbnail: 'penne_arrabbiata.jpg',
        category: { name: CategoryName.PASTA },
        ingredients: [
          { name: 'Penne', type: IngredientType.KG, quantity: 0.3 },
          { name: 'Tomato sauce', type: IngredientType.ML, quantity: 500 },
          { name: 'Garlic', type: IngredientType.PIECE, quantity: 3 },
          {
            name: 'Red chili peppers',
            type: IngredientType.PIECE,
            quantity: 2,
          },
          { name: 'Olive oil', type: IngredientType.ML, quantity: 50 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Parsley', type: IngredientType.KG, quantity: 0.01 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Cook the penne in salted boiling water until al dente.',
          },
          {
            rank: 2,
            description:
              'In a pan, heat olive oil and sauté minced garlic and chopped red chili peppers.',
          },
          {
            rank: 3,
            description:
              'Add tomato sauce to the pan and simmer for 10 minutes.',
          },
          {
            rank: 4,
            description:
              'Drain the penne and add it to the sauce, tossing to coat.',
          },
          {
            rank: 5,
            description: 'Garnish with chopped parsley and serve hot.',
          },
        ],
      },
      {
        name: 'Minestrone Soup',
        duration: 45,
        numberLikes: 0,
        description:
          'A hearty Italian soup made with vegetables, beans, and pasta.',
        region: 'Italy',
        thumbnail: 'minestrone_soup.jpg',
        category: { name: CategoryName.SOUP },
        ingredients: [
          { name: 'Carrots', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Celery', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Onion', type: IngredientType.PIECE, quantity: 1 },
          { name: 'Zucchini', type: IngredientType.PIECE, quantity: 1 },
          { name: 'Canned tomatoes', type: IngredientType.ML, quantity: 400 },
          { name: 'Cannellini beans', type: IngredientType.ML, quantity: 400 },
          { name: 'Vegetable broth', type: IngredientType.ML, quantity: 1000 },
          { name: 'Ditalini pasta', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Olive oil', type: IngredientType.ML, quantity: 30 },
          { name: 'Salt', type: IngredientType.TO_SERVE, quantity: 0 },
          { name: 'Black pepper', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Heat olive oil in a large pot and sauté chopped onions, carrots, and celery until tender.',
          },
          {
            rank: 2,
            description: 'Add diced zucchini and cook for a few more minutes.',
          },
          {
            rank: 3,
            description:
              'Stir in canned tomatoes and vegetable broth, and bring to a boil.',
          },
          {
            rank: 4,
            description:
              'Add drained cannellini beans and ditalini pasta to the pot.',
          },
          {
            rank: 5,
            description:
              'Simmer until the pasta is cooked and the soup thickens.',
          },
          {
            rank: 6,
            description: 'Season with salt and black pepper to taste.',
          },
          {
            rank: 7,
            description:
              'Serve hot, garnished with grated Parmesan cheese if desired.',
          },
        ],
      },
    ],
  },
  {
    username: 'oumayma',
    email: 'oumayma@example.com',
    password: 'admin',
    ImageProfile: 'profile_oumayma.jpg',
    meals: [
      {
        name: 'Sushi Rolls',
        duration: 30,
        numberLikes: 0,
        description:
          'Delicious sushi rolls with fresh fish, avocado, and rice, served with soy sauce and wasabi.',
        region: 'Japan',
        thumbnail: 'sushi_rolls.jpg',
        category: { name: CategoryName.SEAFOOD },
        ingredients: [
          { name: 'Fresh fish', type: IngredientType.PIECE, quantity: 3 },
          { name: 'Avocado', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Rice', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Soy sauce', type: IngredientType.ML, quantity: 30 },
          { name: 'Wasabi', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description: 'Slice the fish and avocado into thin strips.',
          },
          { rank: 2, description: 'Spread rice evenly over a sheet of nori.' },
          {
            rank: 3,
            description: 'Place fish and avocado strips on top of the rice.',
          },
          { rank: 4, description: 'Roll tightly and slice into pieces.' },
          { rank: 5, description: 'Serve with soy sauce and wasabi.' },
        ],
      },
      {
        name: 'Chicken Tikka Masala',
        duration: 45,
        numberLikes: 0,
        description:
          'A classic Indian dish of marinated chicken cooked in a rich, creamy tomato sauce, served with rice.',
        region: 'India',
        thumbnail: 'chicken_tikka_masala.jpg',
        category: { name: CategoryName.CHICKEN },
        ingredients: [
          { name: 'Chicken breasts', type: IngredientType.PIECE, quantity: 4 },
          { name: 'Tomatoes', type: IngredientType.KG, quantity: 1 },
          { name: 'Cream', type: IngredientType.ML, quantity: 100 },
          { name: 'Rice', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Spices', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description: 'Marinate chicken breasts in yogurt and spices.',
          },
          { rank: 2, description: 'Grill chicken until cooked through.' },
          { rank: 3, description: 'Simmer tomatoes and cream to make sauce.' },
          { rank: 4, description: 'Add grilled chicken to the sauce.' },
          {
            rank: 5,
            description: 'Serve hot with rice and sprinkle with spices.',
          },
        ],
      },
      {
        name: 'Caprese Salad',
        duration: 10,
        numberLikes: 0,
        description:
          'A simple Italian salad made with fresh tomatoes, mozzarella cheese, basil leaves, and balsamic glaze.',
        region: 'Italy',
        thumbnail: 'caprese_salad.jpg',
        category: { name: CategoryName.SALAD },
        ingredients: [
          { name: 'Tomatoes', type: IngredientType.PIECE, quantity: 4 },
          { name: 'Mozzarella cheese', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Basil leaves', type: IngredientType.TO_SERVE, quantity: 0 },
          {
            name: 'Balsamic glaze',
            type: IngredientType.TO_SERVE,
            quantity: 0,
          },
        ],
        steps: [
          { rank: 1, description: 'Slice tomatoes and mozzarella cheese.' },
          {
            rank: 2,
            description: 'Arrange tomato and mozzarella slices on a plate.',
          },
          { rank: 3, description: 'Garnish with fresh basil leaves.' },
          { rank: 4, description: 'Drizzle with balsamic glaze.' },
          { rank: 5, description: 'Serve immediately.' },
        ],
      },
    ],
  },
  {
    username: 'nour',
    email: 'nour@example.com',
    password: 'admin',
    ImageProfile: 'profile_nour.jpg',
    meals: [
      {
        name: 'Beef Stir-Fry',
        duration: 20,
        numberLikes: 0,
        description:
          'Quick and easy Chinese stir-fry with tender beef, colorful vegetables, and savory sauce, served with steamed rice.',
        region: 'China',
        thumbnail: 'beef_stir_fry.jpg',
        category: { name: CategoryName.BEEF },
        ingredients: [
          { name: 'Beef sirloin', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Bell peppers', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Broccoli', type: IngredientType.KG, quantity: 0.3 },
          { name: 'Soy sauce', type: IngredientType.ML, quantity: 50 },
          { name: 'Rice', type: IngredientType.KG, quantity: 0.5 },
        ],
        steps: [
          { rank: 1, description: 'Slice beef thinly against the grain.' },
          { rank: 2, description: 'Stir-fry beef in a hot pan until browned.' },
          {
            rank: 3,
            description: 'Add sliced bell peppers and broccoli florets.',
          },
          {
            rank: 4,
            description: 'Pour soy sauce over the beef and vegetables.',
          },
          {
            rank: 5,
            description:
              'Cook until vegetables are tender-crisp and serve with rice.',
          },
        ],
      },
      {
        name: 'Greek Moussaka',
        duration: 90,
        numberLikes: 0,
        description:
          'A traditional Greek dish made with layers of eggplant, minced meat, and creamy béchamel sauce, baked to perfection.',
        region: 'Greece',
        thumbnail: 'greek_moussaka.jpg',
        category: { name: CategoryName.VEGETARIAN },
        ingredients: [
          { name: 'Eggplant', type: IngredientType.PIECE, quantity: 3 },
          { name: 'Ground beef', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Tomatoes', type: IngredientType.KG, quantity: 1 },
          { name: 'Potatoes', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Milk', type: IngredientType.ML, quantity: 300 },
          { name: 'Flour', type: IngredientType.KG, quantity: 0.2 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Slice eggplant and potatoes and fry until golden brown.',
          },
          {
            rank: 2,
            description:
              'Cook ground beef with diced tomatoes to make the meat sauce.',
          },
          {
            rank: 3,
            description:
              'Layer fried eggplant, potatoes, and meat sauce in a baking dish.',
          },
          {
            rank: 4,
            description:
              'Prepare béchamel sauce by cooking flour and milk until thickened.',
          },
          {
            rank: 5,
            description:
              'Pour béchamel sauce over the layers and bake until golden.',
          },
        ],
      },
      {
        name: 'Chocolate Lava Cake',
        duration: 25,
        numberLikes: 0,
        description:
          'A decadent dessert with a gooey chocolate center, served warm with a scoop of vanilla ice cream.',
        region: 'International',
        thumbnail: 'chocolate_lava_cake.jpg',
        category: { name: CategoryName.DESSERT },
        ingredients: [
          { name: 'Dark chocolate', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Butter', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Eggs', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Sugar', type: IngredientType.KG, quantity: 0.15 },
          { name: 'Flour', type: IngredientType.KG, quantity: 0.1 },
          {
            name: 'Vanilla ice cream',
            type: IngredientType.TO_SERVE,
            quantity: 0,
          },
        ],
        steps: [
          { rank: 1, description: 'Melt chocolate and butter together.' },
          { rank: 2, description: 'Beat eggs and sugar until fluffy.' },
          {
            rank: 3,
            description: 'Mix melted chocolate into the egg mixture.',
          },
          { rank: 4, description: 'Fold in flour until just combined.' },
          {
            rank: 5,
            description:
              'Bake until the edges are set but the center is still soft.',
          },
        ],
      },
    ],
  },
  {
    username: 'walid',
    email: 'walid@example.com',
    password: 'admin',
    ImageProfile: 'profile_walid.jpg',
    meals: [
      {
        name: 'Vegetable Pad Thai',
        duration: 30,
        numberLikes: 0,
        description:
          'A popular Thai stir-fried noodle dish with tofu, bean sprouts, peanuts, and a tangy tamarind sauce.',
        region: 'Thailand',
        thumbnail: 'vegetable_pad_thai.jpg',
        category: { name: CategoryName.VEGETARIAN },
        ingredients: [
          { name: 'Rice noodles', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Tofu', type: IngredientType.KG, quantity: 0.3 },
          { name: 'Bean sprouts', type: IngredientType.KG, quantity: 0.2 },
          { name: 'Peanuts', type: IngredientType.KG, quantity: 0.1 },
          { name: 'Tamarind paste', type: IngredientType.ML, quantity: 50 },
          { name: 'Soy sauce', type: IngredientType.ML, quantity: 50 },
        ],
        steps: [
          {
            rank: 1,
            description: 'Soak rice noodles in hot water until softened.',
          },
          { rank: 2, description: 'Stir-fry tofu until golden brown.' },
          { rank: 3, description: 'Add bean sprouts and peanuts to the pan.' },
          { rank: 4, description: 'Mix in cooked noodles and tamarind paste.' },
          { rank: 5, description: 'Season with soy sauce and serve hot.' },
        ],
      },
      {
        name: 'Mediterranean Grilled Lamb Chops',
        duration: 40,
        numberLikes: 0,
        description:
          'Tender lamb chops marinated in Mediterranean spices, grilled to perfection, and served with a side of couscous salad.',
        region: 'Mediterranean',
        thumbnail: 'grilled_lamb_chops.jpg',
        category: { name: CategoryName.BEEF },
        ingredients: [
          { name: 'Lamb chops', type: IngredientType.PIECE, quantity: 4 },
          { name: 'Olive oil', type: IngredientType.ML, quantity: 50 },
          { name: 'Lemon juice', type: IngredientType.ML, quantity: 30 },
          { name: 'Garlic', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Couscous', type: IngredientType.KG, quantity: 0.3 },
          { name: 'Vegetables', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          {
            rank: 1,
            description:
              'Marinate lamb chops in olive oil, lemon juice, and minced garlic.',
          },
          {
            rank: 2,
            description:
              'Grill lamb chops over medium-high heat until desired doneness.',
          },
          {
            rank: 3,
            description: 'Prepare couscous salad with mixed vegetables.',
          },
          {
            rank: 4,
            description: 'Serve grilled lamb chops with couscous salad.',
          },
          {
            rank: 5,
            description: 'Garnish with fresh herbs and lemon wedges.',
          },
        ],
      },
      {
        name: 'Spanish Paella',
        duration: 45,
        numberLikes: 0,
        description:
          'A flavorful Spanish rice dish cooked with saffron, seafood, chicken, and vegetables, perfect for sharing with friends and family.',
        region: 'Spain',
        thumbnail: 'spanish_paella.jpg',
        category: { name: CategoryName.SEAFOOD },
        ingredients: [
          { name: 'Rice', type: IngredientType.KG, quantity: 0.5 },
          { name: 'Shrimp', type: IngredientType.KG, quantity: 0.3 },
          { name: 'Chicken thighs', type: IngredientType.PIECE, quantity: 4 },
          { name: 'Bell peppers', type: IngredientType.PIECE, quantity: 2 },
          { name: 'Tomatoes', type: IngredientType.PIECE, quantity: 4 },
          {
            name: 'Saffron threads',
            type: IngredientType.TO_SERVE,
            quantity: 0,
          },
          { name: 'Lemon wedges', type: IngredientType.TO_SERVE, quantity: 0 },
        ],
        steps: [
          { rank: 1, description: 'Sear chicken thighs until golden brown.' },
          {
            rank: 2,
            description: 'Saute shrimp and bell peppers in the same pan.',
          },
          { rank: 3, description: 'Add chopped tomatoes and rice to the pan.' },
          {
            rank: 4,
            description: 'Stir in saffron threads and chicken broth.',
          },
          {
            rank: 5,
            description:
              'Simmer until rice is cooked and flavors are melded. Serve with lemon wedges.',
          },
        ],
      },
    ],
  },
];

export const seedUsers = async (entityManager: EntityManager) => {
  // Check if users already exist
  const existingUsers = await entityManager.find(User);
  if (existingUsers.length > 0) {
    console.log('Users already seeded.');
    return;
  }

  // Create instances of User using seed data
  for (const userData of userSeedData) {
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userData.password, user.salt);
    user.ImageProfile = userData.ImageProfile; // Set the profile image

    // Create meals for the user
    user.meals = [];
    for (const mealData of userData.meals) {
      const meal = new Meal();
      meal.name = mealData.name;
      meal.duration = mealData.duration;
      meal.numberLikes = mealData.numberLikes;
      meal.description = mealData.description;
      meal.region = mealData.region;
      meal.thumbnail = mealData.thumbnail;

      // Fetch the existing category by name
      const category = await entityManager.findOne(Category, {
        where: { name: mealData.category.name },
      });
      if (!category) {
        console.error(
          `Category with name ${mealData.category.name} not found.`,
        );
        continue;
      }
      meal.category = category;

      // Set the ingredients
      meal.ingredients = mealData.ingredients.map((ingredientData) => {
        const ingredient = new Ingredient();
        ingredient.name = ingredientData.name;
        ingredient.type = ingredientData.type;
        ingredient.quantity = ingredientData.quantity;
        ingredient.meal = meal; // Set the meal relationship
        return ingredient;
      });

      // Set the steps
      meal.steps = mealData.steps.map((stepData) => {
        const step = new Step();
        step.rank = stepData.rank;
        step.description = stepData.description;
        step.meal = meal; // Set the meal relationship
        return step;
      });

      user.meals.push(meal);
    }

    // Save the user and their meals to the database
    await entityManager.save(user);
    await entityManager.save(user.meals);
    await entityManager.save(user.meals.flatMap((meal) => meal.ingredients));
    await entityManager.save(user.meals.flatMap((meal) => meal.steps));
  }

  console.log('Users seeded successfully.');
};
