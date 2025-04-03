
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
    // Using a general image classification model
    // For production, you would want to use a model fine-tuned specifically for waste classification
    classifier = await pipeline(
      'image-classification',
      'Xenova/vit-base-patch16-224',
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
  // Map of keywords to waste categories
  const keywordMap: Record<string, string> = {
    'bottle': 'plastic',
    'plastic': 'plastic',
    'cup': 'plastic',
    'container': 'plastic',
    'paper': 'paper',
    'document': 'paper',
    'newspaper': 'paper',
    'glass': 'glass',
    'bottle': 'glass',
    'jar': 'glass',
    'can': 'metal',
    'metal': 'metal',
    'aluminum': 'metal',
    'cardboard': 'cardboard',
    'box': 'cardboard',
    'fruit': 'organic',
    'vegetable': 'organic',
    'food': 'organic',
    'computer': 'electronic',
    'phone': 'electronic',
    'electronics': 'electronic',
    'device': 'electronic',
    'clothing': 'textile',
    'fabric': 'textile',
    'cloth': 'textile'
  };

  // Check top 3 results for keywords
  for (const result of classificationResults.slice(0, 3)) {
    const label = result.label.toLowerCase();
    
    // Check if any keywords match
    for (const [keyword, category] of Object.entries(keywordMap)) {
      if (label.includes(keyword)) {
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
