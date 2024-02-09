import { get, post } from '../../../common/axiosApi';



export function getIframeView(requestData) {
  return get('adstudio-players', requestData)
    .then(response => {
      if (response.status === 200) {
        console.log("API call successful. Status: Done");
        return response;
      } else {
        console.error("Error creating payment. Unexpected status:", response.status);
        throw new Error("Unexpected API response status");
      }
    })
    .catch(error => {
      console.error("Error creating payment:", error);
      throw error; // You can choose to throw the error or handle it as needed
    });
}
