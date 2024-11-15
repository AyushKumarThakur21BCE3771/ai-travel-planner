import Joi from "joi";

const responseSchema = Joi.object({
  location: Joi.string().required(),
  duration: Joi.number().required(),
  groupSize: Joi.string().required(),
  budget: Joi.string().required(),
  hotels: Joi.array().items(
    Joi.object({
      hotelName: Joi.string().required(),
      hotelAddress: Joi.string().required(),
      price: Joi.string().required(),
      hotelImageURL: Joi.string().uri().required(),
      geoCoordinates: Joi.string().required(),
      rating: Joi.string().required(),
      description: Joi.string().required(),
    })
  ),
  itinerary: Joi.array().items(
    Joi.object({
      day: Joi.number().required(),
      plan: Joi.array().items(
        Joi.object({
          placeName: Joi.string().required(),
          placeDetails: Joi.string().required(),
          placeImageURL: Joi.string().uri().required(),
          geoCoordinates: Joi.string().required(),
          ticketPricing: Joi.string().required(),
          timeToTravel: Joi.string().required(),
        })
      ),
      bestTime: Joi.string().required(),
    })
  ),
});

export default responseSchema;
