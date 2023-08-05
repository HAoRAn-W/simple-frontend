import axios from "axios";

const client = axios.create({});

const getMETObject = async () => {
    let cnt = 0;
    while (cnt < 10) {
      let id = Math.floor(Math.random() * 900748) + 1;
      try {
        const response = await client.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        if (response.status === 200 && response.data.isPublicDomain) {
          console.log(response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("404, try again");
        }
      }
      cnt += 1;
    }
    return null;
  };
  

const MuseService = {
  getMETObject,
};

export default MuseService;
