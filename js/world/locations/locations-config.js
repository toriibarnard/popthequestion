// Configuration file for locations - Update this to add or modify locations

// Define the locations of special interactions (in order)
// Updated with more spread out locations and added camera location
const locations = [
    {
      id: "instagram",
      x: 300,
      y: 380, // Above the road
      width: 100,
      height: 120,
      name: "First Interaction",
      description: "Our first Instagram DM 'hey gorgeous'",
      objectType: "phoneBox"
    },
    {
      id: "restaurant",
      x: 800,
      y: 380, // Above the road
      width: 150,
      height: 120,
      name: "First Date",
      description: "Restauranté Amano",
      objectType: "restaurant"
    },
    {
      id: "song",
      x: 1400,
      y: 410, // Above the road, slightly different height due to object type
      width: 100,
      height: 90,
      name: "Our Song",
      description: "Lover, You Should've Come Over by Joel Plaskett",
      objectType: "musicShop"
    },
    {
      id: "camera",
      x: 1900, // New camera location
      y: 390, // Above the road
      width: 120,
      height: 120,
      name: "Our Picture",
      description: "Our favorite picture together",
      objectType: "camera"
    },
    {
      id: "dateRanking",
      x: 2400, // Moved further to make space for camera
      y: 370, // Above the road
      width: 130,
      height: 130,
      name: "Our Dates",
      description: "Ranking our favorite dates",
      objectType: "dateRanking"
    },
    {
      id: "ramen",
      x: 2900, // Moved further to make space
      y: 380, // Above the road
      width: 150,
      height: 120,
      name: "Favorite Food",
      description: "Buta Ramen",
      objectType: "ramenShop"
    },
    {
      id: "proposal",
      x: 3400, // Moved further to make space
      y: 350, // Above the road
      width: 200,
      height: 150,
      name: "Special Moment",
      description: "Will you go out with me?",
      objectType: "gazebo"
    }
  ];
  
  // Update world-core.js to set the correct map width based on furthest location
  // Recommend updating mapWidth to at least 3700 to accommodate all locations