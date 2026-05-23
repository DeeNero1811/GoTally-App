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

      total,

      completed,

      active,

      productivity,

      overdue,

      highPriority,

      messages,
    } = body

    const prompt = `
You are GoTasklly AI,
an elite productivity strategist.

Analyze the user's productivity system.

PRODUCTIVITY DATA:

- Total Tasks: ${total}
- Completed Tasks: ${completed}
- Active Tasks: ${active}
- Overdue Tasks: ${overdue}
- High Priority Tasks: ${highPriority}
- Productivity Score: ${productivity}%

USER QUESTION:
"${messages?.[
  messages.length - 1
]?.content}"

Your job:

1. Give intelligent productivity advice
2. Recommend priorities
3. Detect productivity risks
4. Suggest workflow optimization
5. Be concise, modern, motivating, and smart

Respond like a premium AI productivity assistant.
`

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
You are GoTasklly AI,
an elite productivity strategist.

You help users:
- prioritize work
- improve focus
- reduce overwhelm
- optimize productivity
- stay motivated

Always sound:
- intelligent
- concise
- modern
- helpful
- premium
              `,
            },

            ...messages,

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

  } catch (error: any) {

    console.error(
      "OPENAI ERROR:",
      error
    )

    return NextResponse.json({

      response: `
📊 Productivity Summary

You currently have active productivity tracking enabled.

✅ Keep completing tasks consistently
🚀 Focus on finishing active tasks
🔥 Small daily progress creates momentum

(OpenAI quota exceeded — using fallback insights mode)
      `,
    })
  }
}