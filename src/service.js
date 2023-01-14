import axios from "axios";
export const fetchSoal3 = async () => {
  try {
    const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
    if (res) return res;
    else throw res;
  } catch (err) {
    return err;
  }
};

export const Get = async (header) => {
  return await axios({
    method: "GET",
    baseURL: "http://localhost:8800/",
    headers: {
      Scope: header.Scope,
      "User-id": header["User-id"],
    },
  });
};
export const Post = async (header,data) => {
  return await axios({
    method: "POST",
    baseURL: "http://localhost:8800/",
    headers: {
      Scope: header.Scope,
      "User-id": header["User-id"],
    },
    data:data
  });
};
