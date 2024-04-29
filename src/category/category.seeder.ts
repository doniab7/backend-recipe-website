import { EntityManager } from 'typeorm';
import { Category, CategoryName } from '../entities/category.entity';

const categorySeedData = [
  { name: CategoryName.BEEF, thumbnail: '/assets/categories/beef.jpg' },
  {
    name: CategoryName.CHICKEN,
    thumbnail: '/assets/categories/chicken.jpg',
  },
  {
    name: CategoryName.SEAFOOD,
    thumbnail: '/assets/categories/seafood.jpg',
  },
  {
    name: CategoryName.VEGETARIAN,
    thumbnail: '/assets/categories/vegetarian.jpg',
  },
  {
    name: CategoryName.DESSERT,
    thumbnail: '/assets/categories/dessert.jpg',
  },
  {
    name: CategoryName.SALAD,
    thumbnail: '/assets/categories/salad.jpg',
  },
  {
    name: CategoryName.PASTA,
    thumbnail: '/assets/categories/pasta.jpg',
  },
  { name: CategoryName.SOUP, thumbnail: '/assets/categories/soup.jpg' },
  {
    name: CategoryName.APPETIZER,
    thumbnail: '/assets/categories/appetizer.jpg',
  },
];

export const seedCategories = async (entityManager: EntityManager) => {
  // Check if categories already exist
  const existingCategories = await entityManager.find(Category);
  if (existingCategories.length > 0) {
    console.log('Categories already seeded.');
    return;
  }

  // Create instances of Category using seed data
  const categories = categorySeedData.map((category) => {
    const cat = new Category();
    cat.name = category.name;
    cat.thumbnail = category.thumbnail;
    return cat;
  });

  // Save the categories to the database
  await entityManager.save(categories);
  console.log('Categories seeded successfully.');
};
