import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const student = await prisma.user.upsert({
    where: { email: 'student@maestro.com' },
    update: {},
    create: {
      id: "user_pravek_123",
      email: 'student@maestro.com',
      name: 'Pravek',
      role: 'STUDENT'
    }
  });

  const teacher = await prisma.teacher.create({
    data: {
      name: 'Sarah Jenkins',
      bio: 'Ex-Google engineer teaching Python.',
      subject: 'Coding',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      hourlyRate: 800,
      location: 'Gomti Nagar, Lucknow'
    },
  });
  // 3. Create the Admin
  await prisma.user.upsert({
    where: { email: 'admin@maestro.com' },
    update: {},
    create: {
      id: "user_admin_001",
      email: 'admin@maestro.com',
      name: 'Super Admin',
      role: 'ADMIN'
    }
  });

  console.log("Seeding complete! 🌱");
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })