export const SelectTraveleesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "👱‍♂️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two traveles in tandem",
    icon: "👭",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A fun loving family",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Group of adventurous friends",
    icon: "👯‍♀️",
    people: "4 to 7 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Have to stick with low budget",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Need to be economical",
    icon: "💵",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💰",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";
