import OpenAI from "openai"

import {
  NextResponse,
} from "next/server"

const openai =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY,
  })

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json()

    const {
      prompt,
    } = body

    const completion =
      await openai
        .chat
        .completions
        .create({

          model:
            "gpt-4.1-mini",

          messages: [

            {
              role:
                "system",

              content: `
You generate productivity tasks.

Rules:
- Generate 5 concise actionable tasks
- Include priorities:
  low, medium, high
- Return ONLY valid JSON array

Example:

[
  {
    "title": "Design landing page",
    "priority": "high"
  }
]
              `,
            },

            {
              role:
                "user",

              content:
                prompt,
            },
          ],
        })

    const response =
      completion
        .choices[0]
        .message
        .content

    return NextResponse.json({

      response,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json({

      response: "[]",
    })
  }
}