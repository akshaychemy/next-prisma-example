import prisma from "@/lib/prisma";

// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// POST new user
export async function POST(req) {
  const body = await req.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return Response.json(user);
}
