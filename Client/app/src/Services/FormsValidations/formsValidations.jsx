const Member = {
  email: String,
  name: String,
  country: String,
  city: String,
  dob: Date,
  avatar: String,
};
const Movie = {
  title: String,
  premiered: String,
  genres: [String],
  thumbnail: String,
  rating: Number,
  trailer: String,
  duration: String,
  views: Number,
};

// function will get obj and then according to its keys will check if the inputs are valid
// return null if all good

export const validateMemberDetails = (objToValidate) => {
  if (!objToValidate) {
    return "All input fields must be filled";
  }

  let keys = Object.keys(Member);

  // loop on all object keys and check if exists
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = objToValidate[key];

    if (!value) {
      return `Looks like you left ${key} blank...`;
    }

    if (typeof value === "string") {
      if (value.length < 1) {
        return `${key} should have more characters`;
      }
    }
  }
  return null;
};


export const validateMovieDetails = (objToValidate) => {
  if (!objToValidate) {
    return "All input fields must be filled";
  }

  let keys = Object.keys(Movie);

  // loop on all object keys and check if exists
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = objToValidate[key];

    if (!value) {
      return `Looks like you left ${key} blank...`;
    }

    if (value === "genres") {
      if (value.length === 0) {
        return `Movie should have at least 1 genre`;
      }
    }
  }
  return null;
};
