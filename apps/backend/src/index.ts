import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

// Import routes
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import personalityRoutes from './routes/personalityRoutes';
import generateRoutes from './routes/generateRoutes';

// Import utilities
import logger from './utils/logger';
import { errorHandler } from './middleware/errorMiddleware';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/personalities', personalityRoutes);
app.use('/api/generate', generateRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Human Paloma API' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Функция для генерации постов
async function generatePosts() {
  logger.info('Running post generation');
  try {
    // Получаем список всех личностей из базы данных
    const personalities = await prisma.personality.findMany();
    
    if (personalities.length === 0) {
      logger.warn('No personalities found in database for content generation');
      return { success: false, message: 'No personalities found in database' };
    }
    
    // Выбираем случайную личность для создания поста
    const randomIndex = Math.floor(Math.random() * personalities.length);
    const postAuthor = personalities[randomIndex];
    
    // Получаем новости из RSS-ленты
    const { fetchNewsFromNextSource } = await import('./services/news/rssService');
    
    let postContent;
    let sourceUrl;
    try {
      // Получаем новости из следующего источника в очереди (до 5 новостей)
      const { source, news } = await fetchNewsFromNextSource(5);
      
      if (news.length === 0) {
        logger.warn(`No news found from source ${source.name}`);
        return { success: false, message: 'No news found from RSS source' };
      }
      
      // Выбираем случайную новость из полученных
      const randomNewsIndex = Math.floor(Math.random() * news.length);
      const selectedNews = news[randomNewsIndex];
      
      logger.info(`Selected news: ${selectedNews.title} from ${source.name}`);
      
      // Используем заголовок новости как тему для генерации поста
      const randomTopic = selectedNews.title;
      sourceUrl = selectedNews.link; // Используем реальный URL новости
      
      // Генерируем контент поста с помощью AI
      const { generatePostContent } = await import('./services/ai/generator');
      postContent = await generatePostContent(
        {
          name: postAuthor.name,
          era: postAuthor.era,
          style: postAuthor.style,
          bio: postAuthor.bio
        },
        randomTopic
      );
    } catch (rssError) {
      logger.error('Error fetching news from RSS:', rssError);
      return { success: false, message: 'Failed to fetch news from RSS sources', error: rssError };
    }
    
    // Сохраняем пост в базу данных
    const post = await prisma.post.create({
      data: {
        content: postContent,
        sourceUrl,
        personalityId: postAuthor.id
      }
    });
    
    logger.info(`Created new post by ${postAuthor.name} with ID: ${post.id}`);
    
    // Выбираем несколько случайных личностей для комментариев (исключая автора поста)
    const commenters = personalities.filter(p => p.id !== postAuthor.id);
    
    // Выбираем от 1 до 3 случайных комментаторов
    const commentCount = Math.floor(Math.random() * 3) + 1;
    const selectedCommenters = [];
    
    for (let i = 0; i < Math.min(commentCount, commenters.length); i++) {
      const randomCommenterIndex = Math.floor(Math.random() * commenters.length);
      selectedCommenters.push(commenters[randomCommenterIndex]);
      commenters.splice(randomCommenterIndex, 1); // Удаляем выбранного комментатора из списка
    }
    
    // Генерируем и сохраняем комментарии
    const { generateCommentContent } = await import('./services/ai/generator');
    
    for (const commenter of selectedCommenters) {
      const commentContent = await generateCommentContent(
        {
          name: commenter.name,
          era: commenter.era,
          style: commenter.style,
          bio: commenter.bio
        },
        { content: postContent },
        {
          name: postAuthor.name,
          era: postAuthor.era
        }
      );
      
      await prisma.comment.create({
        data: {
          content: commentContent,
          postId: post.id,
          personalityId: commenter.id
        }
      });
      
      logger.info(`Created new comment by ${commenter.name} on post ${post.id}`);
    }
    
    logger.info(`Successfully generated post and ${selectedCommenters.length} comments`);
    return { success: true, message: 'Posts generated successfully', post };
  } catch (error) {
    logger.error('Error in post generation:', error);
    return { success: false, message: 'Failed to generate posts', error };
  }
}

app.get('/generate-posts', async (req, res) => {
  try {
    const result = await generatePosts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate posts' });
  }
});

// Schedule cron jobs for content generation
cron.schedule('*/5 * * * *', async () => {
  logger.info('Running scheduled post generation');
  await generatePosts();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
