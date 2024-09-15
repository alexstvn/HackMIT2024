const Client = require('@veryfi/veryfi-sdk')

//Set up
const client_id = 'vrfhA614n1ZhtvyyyNRecLvUYdfb4aNwiMNklYz';
const client_secret = 'oDs63i6J48dNyc2dAV84EH1aDRVK0rw7IR9xt1s52iDoHW0FHFgCU9HTeENCZPzCZFbJCuSTGl49T8aPnkIgJPiG06ClgGZNmooLT2FExY75hFCm6o3FppVezK7l9uvO';
const username = 'astevenson';
const api_key = 'f7ce1022dafe0b6934b3828554eb72e8';

let veryfi_client = new Client(client_id, client_secret, username, api_key);
const processReceipt = async (filePath) => {
    try {
      const response = await veryfi_client.process_document(filePath);
      console.log(response); // Output the result to the console
      return response;
    } catch (error) {
      console.error("Error processing receipt:", error);
      throw error; // You can throw or handle the error based on your needs
    }
  };
  
  // Example usage:
  const filePath = "./public/image/SampleReceipt.jpg"; // Replace with actual file path
  processReceipt(filePath).then((result) => {
    // You can handle the result here
    console.log("Processed receipt:", result);
  });