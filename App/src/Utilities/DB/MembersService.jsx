import axios from "axios";

// add new member
export const addMember = async (memberObj) => {
  try {
    let res = await axios.post("http://127.0.0.1:3800/members", memberObj);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(`Can't add new member from service: ${err}`);
  }
}


// get all users
export const getAllMembers = async () => {
  try {
    let res = await axios.get("http://127.0.0.1:3800/members");
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(`Can't get members from service: ${err}`);
  }
};

// get member by id
export const getMember = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3800/members/${id}`);
    const member = response.data;
    return member;
  } catch (err) {
    throw new Error(`Can't get member via service: ${err}`);
  }
};

// delete member
export const delMember = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:3800/members/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(`Can't delete member via service: ${err}`);
  }

}

//update member
export const updateMember = async (id, memObj) => {
  try{
    const resp = await axios.put(`http://127.0.0.1:3800/members/${id}`, memObj)
    const data = resp.data
    return data
  } catch (err) {
    throw new Error(`Cant update member from service ${err}`)
  }
}

