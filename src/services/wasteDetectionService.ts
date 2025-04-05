
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to improve browser performance
env.allowLocalModels = false;
env.useBrowserCache = true;

// Pre-defined waste categories and their properties
export const wasteCategories = {
  'plastic': {
    reusability: 85,
    pointsAwarded: 120,
    message: "Great job! This plastic is highly recyclable."
  },
  'paper': {
    reusability: 90,
    pointsAwarded: 100,
    message: "Awesome! Paper is easily recycled and reused."
  },
  'glass': {
    reusability: 95,
    pointsAwarded: 150,
    message: "Excellent! Glass is one of the most recyclable materials."
  },
  'metal': {
    reusability: 92,
    pointsAwarded: 135,
    message: "Perfect! Metal can be recycled indefinitely without quality degradation."
  },
  'cardboard': {
    reusability: 88,
    pointsAwarded: 110,
    message: "Great! Cardboard is highly recyclable."
  },
  'organic': {
    reusability: 80,
    pointsAwarded: 90,
    message: "Good! This can be composted and used as fertilizer."
  },
  'electronic': {
    reusability: 70,
    pointsAwarded: 200,
    message: "Important! Electronic waste contains valuable materials that can be recovered."
  },
  'textile': {
    reusability: 75,
    pointsAwarded: 100,
    message: "Nice! Textiles can be repurposed or recycled."
  },
  // New food-related categories
  'fruit': {
    reusability: 95,
    pointsAwarded: 130,
    message: "This fresh fruit could be donated to people in need! You'll earn extra points for donating.",
    donationSuggestion: true
  },
  'vegetable': {
    reusability: 95,
    pointsAwarded: 130,
    message: "These vegetables could be donated to people in need! You'll earn extra points for donating.",
    donationSuggestion: true
  },
  'bakery': {
    reusability: 90,
    pointsAwarded: 120,
    message: "Bakery items can be donated to local shelters if still fresh! Consider donation for extra points.",
    donationSuggestion: true
  },
  'prepared-food': {
    reusability: 85,
    pointsAwarded: 110,
    message: "If this food is still fresh, consider donating it to those in need for extra points!",
    donationSuggestion: true
  },
  'packaged-food': {
    reusability: 90,
    pointsAwarded: 120,
    message: "Unopened packaged food can be donated to food banks! You'll get bonus points for donation.",
    donationSuggestion: true
  }
};

// Default category if detection fails or returns unknown type
const defaultCategory = {
  wasteType: "Unknown",
  reusability: 50,
  pointsAwarded: 60,
  message: "We're not entirely sure what this is, but recycling is always good!"
};

let classifier: any = null;

/**
 * Initialize the waste detection model
 */
export const initWasteDetection = async () => {
  try {
    // Using a more capable image classification model that's better at identifying food items
    classifier = await pipeline(
      'image-classification',
      'Xenova/swin-tiny-patch4-window7-224',
      { device: 'webgpu', quantized: true }
    );
    return true;
  } catch (error) {
    console.error("Failed to initialize waste detection model:", error);
    return false;
  }
};

/**
 * Map general classification results to waste categories
 */
const mapToWasteCategory = (classificationResults: any[]) => {
  // Enhanced keyword map with more food categories
  const keywordMap: Record<string, string> = {
    // Original categories
    'bottle': 'plastic',
    'plastic': 'plastic',
    'cup': 'plastic',
    'container': 'plastic',
    'paper': 'paper',
    'document': 'paper',
    'newspaper': 'paper',
    'glass': 'glass',
    'jar': 'glass',
    'can': 'metal',
    'metal': 'metal',
    'aluminum': 'metal',
    'cardboard': 'cardboard',
    'box': 'cardboard',
    'food': 'organic',
    'computer': 'electronic',
    'phone': 'electronic',
    'electronics': 'electronic',
    'device': 'electronic',
    'clothing': 'textile',
    'fabric': 'textile',
    'cloth': 'textile',
    
    // Enhanced food detection
    'fruit': 'fruit',
    'apple': 'fruit',
    'banana': 'fruit',
    'orange': 'fruit',
    'grape': 'fruit',
    'strawberry': 'fruit',
    'blueberry': 'fruit',
    'peach': 'fruit',
    'pear': 'fruit',
    'mango': 'fruit',
    'pineapple': 'fruit',
    'watermelon': 'fruit',
    'melon': 'fruit',
    
    'vegetable': 'vegetable',
    'carrot': 'vegetable',
    'broccoli': 'vegetable',
    'lettuce': 'vegetable',
    'tomato': 'vegetable',
    'potato': 'vegetable',
    'cucumber': 'vegetable',
    'onion': 'vegetable',
    'pepper': 'vegetable',
    'cauliflower': 'vegetable',
    'cabbage': 'vegetable',
    
    'bread': 'bakery',
    'cake': 'bakery',
    'bakery': 'bakery',
    'pastry': 'bakery',
    'donut': 'bakery',
    'croissant': 'bakery',
    'muffin': 'bakery',
    'cookie': 'bakery',
    'pie': 'bakery',
    
    'meal': 'prepared-food',
    'dinner': 'prepared-food',
    'lunch': 'prepared-food',
    'leftover': 'prepared-food',
    'cooked': 'prepared-food',
    'plate': 'prepared-food',
    'soup': 'prepared-food',
    'rice': 'prepared-food',
    'pasta': 'prepared-food',
    'sandwich': 'prepared-food',
    'pizza': 'prepared-food',
    
    'canned': 'packaged-food',
    'packaged': 'packaged-food',
    'box': 'packaged-food',
    'snack': 'packaged-food',
    'cereal': 'packaged-food',
    'milk': 'packaged-food',
    'juice': 'packaged-food'
  };

  // Check top 5 results for keywords (increased from top 3)
  for (const result of classificationResults.slice(0, 5)) {
    const label = result.label.toLowerCase();
    console.log("Checking label:", label);
    
    // Check if any keywords match
    for (const [keyword, category] of Object.entries(keywordMap)) {
      if (label.includes(keyword)) {
        console.log(`Matched keyword "${keyword}" to category "${category}"`);
        return category;
      }
    }
  }
  
  // If no match found
  return 'unknown';
};

/**
 * Detect waste from image URL/data
 */
export const detectWaste = async (imageUrl: string) => {
  if (!classifier) {
    const initialized = await initWasteDetection();
    if (!initialized) {
      return defaultCategory;
    }
  }
  
  try {
    // Classify the image
    const results = await classifier(imageUrl);
    console.log("Classification results:", results);
    
    // Map to waste category
    const wasteType = mapToWasteCategory(results);
    
    if (wasteType === 'unknown' || !wasteCategories[wasteType]) {
      return {
        wasteType: "Unknown",
        ...defaultCategory
      };
    }
    
    // Return waste information
    return {
      wasteType: wasteType.charAt(0).toUpperCase() + wasteType.slice(1),
      ...wasteCategories[wasteType]
    };
  } catch (error) {
    console.error("Error detecting waste:", error);
    return defaultCategory;
  }
};
