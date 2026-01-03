import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  
  // 1. Clean up old data to avoid duplicates
  await prisma.review.deleteMany();
  await prisma.classSession.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.teacher.deleteMany();

  console.log('Start seeding teachers...');

  // 2. Create Teachers with Emails and Video URLs
  const teachers = [
    {
      email: 'aarav.music@maestro.com', // <--- Added Email
      name: "Aarav Mishra",
      subject: "Music",
      bio: "Professional Guitarist with 7 years of stage experience. I have toured with indie bands across India.",
      teachingStyle: "I believe in 'Learn by Ear' first. We jump straight into songs you love, dissecting the chords and rhythm.",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 4.9,
      hourlyRate: 600,
      demoVideoUrl: "https://www.youtube.com/embed/S_8Zacp5e9w", // Guitar Demo
      linkedin: "linkedin.com/in/aaravm",
      twitter: "twitter.com/aarav_guitars",
      website: "aaravmusic.com",
    },
    {
      email: 'varun.code@maestro.com', // <--- Added Email
      name: "Varun Chopra",
      subject: "Computer Science",
      bio: "Ex-Google engineer specializing in Full Stack Development and AI. I help students build real-world portfolios.",
      teachingStyle: "Project-based learning. No boring theory without code. We build apps from Day 1.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.7,
      hourlyRate: 800,
      demoVideoUrl: "https://www.youtube.com/embed/bJzb-RuUcMU", // Coding Demo
      linkedin: "linkedin.com/in/varunc",
    },
    {
      email: 'zara.art@maestro.com', // <--- Added Email
      name: "Zara Khan",
      subject: "Arts",
      bio: "Fine Arts graduate teaching Sketching, Charcoal, and Portrait making. My students have won national awards.",
      teachingStyle: "Relaxed and therapeutic. Art is about expression, not perfection.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
      hourlyRate: 500,
      demoVideoUrl: "https://www.youtube.com/embed/7V6f-bA-X88", // Art Demo
    },
    {
      email: 'neha.math@maestro.com', // <--- Added Email
      name: "Neha Kapoor",
      subject: "Mathematics",
      bio: "PhD in Mathematics. I make Calculus and Algebra feel like solving a puzzle, not a chore.",
      teachingStyle: "Visual learning using graphs and real-world examples to explain complex theorems.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4.6,
      hourlyRate: 400,
      demoVideoUrl: "https://www.youtube.com/embed/ZNiRzZxf4tQ", // Math Demo
    },
    {
      email: 'aditya.physics@maestro.com', // <--- Added Email
      name: "Aditya Joshi",
      subject: "Physics",
      bio: "Aerospace enthusiast helping students ace JEE/NEET Physics with conceptual clarity.",
      teachingStyle: "First principles thinking. We derive formulas rather than memorizing them.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.7,
      hourlyRate: 600,
      demoVideoUrl: "https://www.youtube.com/embed/jNPUDA6B22A", // Physics Demo
    }
  ];

  for (const t of teachers) {
    const teacher = await prisma.teacher.create({
      data: t,
    });
    console.log(`Created teacher: ${teacher.name}`);
  }

  // 3. Create a Dummy Subscription for testing
  // Find the music teacher (Aarav) to attach the subscription to
  const musicTeacher = await prisma.teacher.findFirst({ where: { subject: 'Music' } });

  if (musicTeacher) {
    console.log('Seeding dummy subscription for Pravek...');
    
    // We use a fixed ID "user_123" so we can find it easily in the dashboard
    const studentId = "user_123"; 

    await prisma.subscription.create({
      data: {
        studentId: studentId,
        studentName: "Pravek (Student)",
        teacherId: musicTeacher.id,
        totalClasses: 10,
        classesUsed: 3,
        status: "ACTIVE",
        sessions: {
            create: [
                { date: new Date('2024-01-05'), topic: "Intro to Guitar Basics", status: "COMPLETED", duration: 60 },
                { date: new Date('2024-01-08'), topic: "Understanding Chords (A, D, E)", status: "COMPLETED", duration: 60 },
                { date: new Date('2024-01-12'), topic: "Strumming Patterns 101", status: "COMPLETED", duration: 60 },
                { date: new Date('2026-01-04'), topic: "Upcoming: Major Scales", status: "SCHEDULED", duration: 60 }
            ]
        }
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });