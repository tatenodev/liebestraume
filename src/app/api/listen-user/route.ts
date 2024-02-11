type ClerkWebhookMessage = {
  data: {
    id: string;
  }
  type: "user.created" | "user.updated" | "user.deleted";
}

export async function POST(req: Request) {
  const { data, type }: ClerkWebhookMessage = await req.json();

  console.log(type);
  console.log(data);

  return new Response("Success!", {
    status: 200,
  });
}
