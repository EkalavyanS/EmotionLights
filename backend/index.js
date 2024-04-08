// Replace the import statement with require if you're using CommonJS
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import multer from "multer";

const openai = new OpenAI({
  
});
const app = express();
const PORT = 8902;
const upload = multer();

app.use(
  cors({
    origin: "*", // Replace with your frontend's domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  })
);

app.post("/emotion", upload.single("file"), async (req, res) => {
  try {
    const image = req.file;
    const base64Image = image.buffer.toString("base64");
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "A face of a person is given in the image your job is to predict the emotion of the face The option are only :Happy, Nervous, Sad, Anger, Fear, Disgust ONLY GIVE THE NAME OF THE EMOTION ONLY AND NOTHING ELSE!!! gIVE ONLY ONE EMOTION",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0].message.content);
    res.send(response.choices[0].message.content);
  } catch (error) {
    console.error("Error predicting emotions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while predicting emotions" });
  }
});

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
