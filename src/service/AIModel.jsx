import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the above given location for above given number of days with each day plan with best time to visit and try planning atleast two itinerary for a day and also consider famous tourist attractions in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50 - $100 per night",\n      "hotelImageUrl": "https://www.theDlasvegas.com/media/images/gallery/exterior.jpg",\n      "geoCoordinates": "36.1699, -115.1427",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a vibrant atmosphere and access to live entertainment."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$70 - $150 per night",\n      "hotelImageUrl": "https://www.goldennugget.com/media/11001/gnl-exterior.jpg",\n      "geoCoordinates": "36.1692, -115.1425",\n      "rating": 4.5,\n      "description": "A historic hotel known for its elegant accommodations, a world-class casino, and a thrilling shark tank."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$40 - $80 per night",\n      "hotelImageUrl": "https://www.circuscircus.com/media/images/gallery/exterior.jpg",\n      "geoCoordinates": "36.1106, -115.1737",\n      "rating": 3.5,\n      "description": "A fun-filled hotel with a carnival theme, featuring thrilling rides, a midway, and affordable dining options."\n    },\n    {\n      "hotelName": "Main Street Station Casino, Brewery & Hotel",\n      "hotelAddress": "200 N Main St, Las Vegas, NV 89101",\n      "price": "$55 - $120 per night",\n      "hotelImageUrl": "https://www.mainstreetstationcasino.com/media/images/gallery/exterior.jpg",\n      "geoCoordinates": "36.1702, -115.1383",\n      "rating": 4.0,\n      "description": "A charming hotel with a vintage train station theme, offering a relaxed atmosphere and a unique brewery experience."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "bestTime": "Morning",\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian-friendly street lined with casinos, shops, and live entertainment. Enjoy the vibrant atmosphere and the iconic Viva Vision light show.",\n          "placeImageUrl": "https://www.fremontstreetexperience.com/wp-content/uploads/Viva-Vision-Screen-4-2018-1024x576.jpg",\n          "geoCoordinates": "36.1698, -115.1427",\n          "ticketPricing": "Free",\n          "timeToTravel": "2-3 hours"\n        },\n        {\n          "placeName": "Neon Museum",\n          "placeDetails": "A museum showcasing historic Las Vegas neon signs, offering a glimpse into the city\'s iconic past. ",\n          "placeImageUrl": "https://www.neonmuseum.org/wp-content/uploads/2018/04/Neon-Museum-Sign-1024x576.jpg",\n          "geoCoordinates": "36.1753, -115.1476",\n          "ticketPricing": "$20 - $30",\n          "timeToTravel": "1-2 hours"\n        }\n      ]\n    },\n    "day2": {\n      "bestTime": "Morning",\n      "plan": [\n        {\n          "placeName": "The Strip",\n          "placeDetails": "The iconic Las Vegas Boulevard, home to world-class resorts, casinos, and entertainment venues. Take a stroll, enjoy the ambiance, and visit some of the famous landmarks.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/gallery/the-strip.jpg",\n          "geoCoordinates": "36.1146, -115.1729",\n          "ticketPricing": "Free",\n          "timeToTravel": "3-4 hours"\n        },\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "A stunning display of seasonal flowers and botanical arrangements, offering a tranquil escape from the city\'s hustle and bustle. ",\n          "placeImageUrl": "https://www.bellagio.com/content/dam/bellagio/en/images/2023-conservatory-garden/conservatory-garden-summer-2023.jpg.transform/2048x1280/image",\n          "geoCoordinates": "36.1170, -115.1749",\n          "ticketPricing": "Free",\n          "timeToTravel": "1-2 hours"\n        }\n      ]\n    },\n    "day3": {\n      "bestTime": "Afternoon",\n      "plan": [\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "A scenic desert landscape with dramatic rock formations, hiking trails, and stunning views. Enjoy a day of outdoor adventure just a short drive from Las Vegas. ",\n          "placeImageUrl": "https://www.nps.gov/redr/planyourvisit/images/redrock-canyon-scenery-818.jpg",\n          "geoCoordinates": "36.1321, -115.3330",\n          "ticketPricing": "$15 per vehicle",\n          "timeToTravel": "4-5 hours"\n        }\n      ]\n    }\n  }\n}\n```',
        },
      ],
    },
  ],
});
