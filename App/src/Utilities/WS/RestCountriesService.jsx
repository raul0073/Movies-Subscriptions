import axios from "axios";

// function will get all countries from rest countries api and extract name and code for add member page
export const getAllCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const data = response.data;

    let countries = data.map((country) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flag,
    }));

    return countries;
  } catch (error) {
    return "Error fetching countries from service:", error;
  }
};


