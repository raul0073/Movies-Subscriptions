const Member = {
  email: String,
  name: String,
  country: String,
  city: String,
  dob: Date,
  avatar: String,
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

    if (value === "") {
      return `Looks like you left ${key} blank...`;
    }

    if (key === "name") {
      if (!/^[a-zA-Z\s']+$/i.test(value) || value === undefined) {
        return "Enter valid name";
      }
    }
  }
  return null;
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



export const validateMovieDetails = (objToValidate) => {
  if (!objToValidate) {
    return "All input fields must be filled";
  }

  let keys = Object.keys(Movie);
  // loop on all object keys and check if exists
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = objToValidate[key];

    if (value === "") {
      return `Looks like you left ${key} blank...`;
    }

    if (key === "premiered") {
      if (!/^[0-9]{4}$/.test(value) || value === undefined) {
        return "Enter valid Year";
      }
    }
    if (key === "views") {
      if (!/^[0-9]$/i.test(value) || value === undefined) {
        return "Enter valid views ";
      }
    }
    if (key === "rating") {
      if (!/^(10|[1-9])$/.test(value) || value === undefined) {
        return "Enter valid rating";
      }
    }
  }
  return null;
};