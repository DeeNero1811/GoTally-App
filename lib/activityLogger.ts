import {
  supabase,
} from "@/lib/supabase/client"

export async function logActivity({

  title,
  description,
  type,
}: {

  title: string
  description?: string
  type?: string
}) {

  const {
    data: {
      user,
    },
  } = await supabase
    .auth
    .getUser()

  if (!user)
    return

  await supabase
    .from("activity_logs")
    .insert({

      user_id:
        user.id,

      title,

      description,

      type,
    })
}