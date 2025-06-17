// backend/config/businessProfile.js
module.exports = {
  industries: {
    "real-estate": {
      industry: "Real Estate",
      qualifyingQuestions: [
        "Which location are you looking for?",
        "What type of property?",
        "What’s your budget range?",
        "Timeline to move?",
        "Purpose of buying? (investment/personal)"
      ],
      keywords: {
        propertyTypes: ["flat", "villa", "plot", "1bhk", "2bhk", "3bhk", "acres"],
        purposes: ["personal use", "investment", "for family"],
        urgency: ["urgent", "asap", "within", "soon"]
      },
      rules: {
        hot: "Specific budget, location, property type, and urgency.",
        cold: "Vague responses or no urgency.",
        invalid: "Gibberish, empty, or test input."
      }
    },

    "automobile": {
      industry: "Automobile",
      qualifyingQuestions: [
        "Are you looking for a new or used vehicle?",
        "Which brand/model are you interested in?",
        "What is your budget?",
        "When are you planning to purchase?",
        "Personal or business use?"
      ],
      keywords: {
        vehicleTypes: ["suv", "sedan", "hatchback", "bike", "electric", "ev"],
        purposes: ["personal", "business", "rental"],
        urgency: ["urgent", "asap", "within", "soon"]
      },
      rules: {
        hot: "Specific model/brand, budget, and timeline.",
        cold: "Browsing with no urgency.",
        invalid: "Spam, gibberish, or fake lead."
      }
    },

    "education": {
      industry: "Education",
      qualifyingQuestions: [
        "Which course or subject are you interested in?",
        "Preferred mode: online or offline?",
        "What is your budget for the course?",
        "When would you like to start?",
        "Are you looking for a degree or a certification?"
      ],
      keywords: {
        courseTypes: ["btech", "mba", "design", "python", "data science", "certification", "online", "offline"],
        purposes: ["career change", "upskilling", "college admission"],
        urgency: ["urgent", "asap", "within", "soon"]
      },
      rules: {
        hot: "Clear course, start date, and purpose.",
        cold: "Just exploring or not decided.",
        invalid: "Fake or junk message."
      }
    }
  }
};
