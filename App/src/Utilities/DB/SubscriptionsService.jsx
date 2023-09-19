import axios from "axios";

// add sunbscription
export const addSubscriptionToMember = async (sub) => {
  try {
    let res = await axios.post("http://127.0.0.1:3800/subs", sub);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(`Can't subscribe member to movie from service: ${err}`);
  }
};

