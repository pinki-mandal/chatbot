import axios from "axios";

export const askAI = async (message) => {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.1",
      prompt: message,
      stream: false,
    }
  );

  return response.data.response;
};