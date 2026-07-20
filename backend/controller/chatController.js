import { askAI } from "../services/aiService.js";

export const chat = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const reply = await askAI(message);

        res.json({
            success: true,
            reply
        });

    // } catch (error) {


    } catch (error) {
  console.error("Backend Error:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}


};