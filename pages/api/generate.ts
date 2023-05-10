import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export type GenerateResponseData = {
  original: string | null;
  generated: string | null;
  id: string;
};

export default async function (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GenerateResponseData | any>
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const prompt = req.body.prompt || "";
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(prompt),
      temperature: 0.6,
      max_tokens: 300,
    });
    console.log(completion);
    console.log(completion.data.choices[0].text);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(prompt: string) {
  // const capitalizedprompt =
  //   prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  // return `Given a linkedin post, summarize the post in form of image carousels to tell a story. Create the copies for the carousels with the following structure:
  // First slide: Hook to get people to read more
  // Subsequent slides: content summaries in form of heading and excerpts
  // Last slide: Click to action

  // Sample output:
  // 1. Unlock the secrets to maximizing your productivity with these proven tips!
  // 2. Set specific goals: Define clear objectives that you want to achieve and create a plan of action to accomplish them. This will help you prioritize your tasks and stay focused on what's most important.
  // 3. Use the Pomodoro technique: Break down your work into 25-minute intervals with short breaks in between. This method can help you stay productive and avoid burnout.
  // 4. Avoid multitasking: Multitasking can be counterproductive as it can decrease your efficiency and focus. Instead, focus on one task at a time to achieve better results.
  // 5. Ready to boost your productivity? Try these time management strategies today!

  // LinkedIn Post:
  return `Turn this copy into 5-7 slide linkedin carousel, with less than 50 words per slide to tell a story. The first slide should be a hook to get people to read more and the last slide should be a call to action. Make sure to display the carousel in the following format {slide #}. {heading}: {description} in continous sentences. Do not explicity mention the text "Slide", "Hook", or "Call to Action". Do not use any emojis. LinkedIn copy:
 ${prompt}`;
}
