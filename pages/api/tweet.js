import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(404).json({ message: 'Not logged in.'});
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found'});
  }

  if (req.method === 'POST') {
    const { content } = req.body;
    await prisma.tweet.create({
      data: {
        content,
        author: {
          connect: { id: user.id }
        }
      }
    });
    res.end();
    return;
  }
}