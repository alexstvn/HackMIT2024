const Client = require('@veryfi/veryfi-sdk')

//Set up
const client_id = 'vrfhA614n1ZhtvyyyNRecLvUYdfb4aNwiMNklYz';
const client_secret = 'oDs63i6J48dNyc2dAV84EH1aDRVK0rw7IR9xt1s52iDoHW0FHFgCU9HTeENCZPzCZFbJCuSTGl49T8aPnkIgJPiG06ClgGZNmooLT2FExY75hFCm6o3FppVezK7l9uvO';
const username = 'astevenson';
const api_key = 'f7ce1022dafe0b6934b3828554eb72e8';

let veryfi_client = new Client(client_id, client_secret, username, api_key);
let file_path = "./image/SampleReceipt.jpg"; // Corrected file path

// Takes in a file path to an image of a receipt
const response=async() => await veryfi_client.process_document(file_path)

// outputs anything we get back into the console
response().then(console.log)