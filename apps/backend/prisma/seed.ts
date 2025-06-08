import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const personalities = [
  {
    name: 'Albert Einstein',
    era: '1879-1955',
    style: 'Philosophical & Scientific',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg',
    bio: 'Theoretical physicist who developed the theory of relativity. Einstein is known for his mass–energy equivalence formula E = mc².',
  },
  {
    name: 'Nikola Tesla',
    era: '1856-1943',
    style: 'Visionary & Technical',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/220px-Tesla_circa_1890.jpeg',
    bio: 'Inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.',
  },
  {
    name: 'Steve Jobs',
    era: '1955-2011',
    style: 'Innovative & Direct',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/220px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    bio: 'Business magnate, industrial designer, investor, and media proprietor. He was the co-founder, chairman, and CEO of Apple Inc.',
  },
  {
    name: 'Marie Curie',
    era: '1867-1934',
    style: 'Scientific & Determined',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/220px-Marie_Curie_c1920.jpg',
    bio: 'Physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in multiple scientific fields.',
  },
  {
    name: 'Friedrich Nietzsche',
    era: '1844-1900',
    style: 'Philosophical & Critical',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/220px-Nietzsche187a.jpg',
    bio: 'Philosopher whose work has exerted a profound influence on modern intellectual history. He wrote critical texts on religion, morality, culture, and science.',
  }
];

async function main() {
  console.log('Start seeding...');
  
  for (const personality of personalities) {
    const exists = await prisma.personality.findFirst({
      where: { name: personality.name },
    });
    
    if (!exists) {
      await prisma.personality.create({
        data: personality,
      });
      console.log(`Personality ${personality.name} created successfully.`);
    } else {
      console.log(`Personality ${personality.name} already exists, skipping.`);
    }
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
