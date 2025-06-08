import Parser from 'rss-parser';
import logger from '../../utils/logger';
import fs from 'fs';
import path from 'path';

// Типы для новостей
interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
}

interface RssSource {
  name: string;
  url: string;
}

// Список источников RSS
const RSS_SOURCES: RssSource[] = [
  { name: 'BBC News International', url: 'https://feeds.bbci.co.uk/news/rss.xml?edition=int' },
  { name: 'BBC Science & Environment', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
  { name: 'BBC Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml' },
  { name: 'BBC Politics', url: 'https://feeds.bbci.co.uk/news/politics/rss.xml' },
  { name: 'BBC Health', url: 'https://feeds.bbci.co.uk/news/health/rss.xml' },
];

// Путь к файлу для хранения индекса последнего использованного источника
const LAST_SOURCE_INDEX_FILE = path.join(__dirname, '../../../../data/lastSourceIndex.json');

// Создаем директорию data, если она не существует
const dataDir = path.join(__dirname, '../../../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Инициализация парсера RSS
const parser = new Parser();

/**
 * Получает индекс последнего использованного источника
 * @returns Индекс последнего использованного источника
 */
const getLastSourceIndex = (): number => {
  try {
    if (fs.existsSync(LAST_SOURCE_INDEX_FILE)) {
      const data = fs.readFileSync(LAST_SOURCE_INDEX_FILE, 'utf8');
      const { index } = JSON.parse(data);
      return index;
    }
  } catch (error) {
    logger.error('Error reading last source index:', error);
  }
  return -1; // Если файл не существует или произошла ошибка, возвращаем -1
};

/**
 * Сохраняет индекс последнего использованного источника
 * @param index Индекс для сохранения
 */
const saveLastSourceIndex = (index: number): void => {
  try {
    fs.writeFileSync(LAST_SOURCE_INDEX_FILE, JSON.stringify({ index }), 'utf8');
  } catch (error) {
    logger.error('Error saving last source index:', error);
  }
};

/**
 * Получает следующий источник RSS в очереди
 * @returns Следующий источник RSS
 */
export const getNextRssSource = (): RssSource => {
  const lastIndex = getLastSourceIndex();
  const nextIndex = (lastIndex + 1) % RSS_SOURCES.length;
  saveLastSourceIndex(nextIndex);
  return RSS_SOURCES[nextIndex];
};

/**
 * Получает новости из указанного источника RSS
 * @param source Источник RSS
 * @param limit Максимальное количество новостей для получения
 * @returns Массив новостей
 */
export const fetchNewsFromSource = async (source: RssSource, limit: number = 5): Promise<NewsItem[]> => {
  try {
    logger.info(`Fetching news from ${source.name} (${source.url})`);
    
    const feed = await parser.parseURL(source.url);
    
    if (!feed.items || feed.items.length === 0) {
      logger.warn(`No items found in feed from ${source.name}`);
      return [];
    }
    
    // Ограничиваем количество новостей и преобразуем их в нужный формат
    const newsItems = feed.items
      .slice(0, limit)
      .map(item => ({
        title: item.title || 'No title',
        description: item.contentSnippet || item.content || 'No description',
        link: item.link || '',
        pubDate: item.pubDate,
        content: item.content,
        contentSnippet: item.contentSnippet
      }));
    
    logger.info(`Successfully fetched ${newsItems.length} news items from ${source.name}`);
    return newsItems;
  } catch (error) {
    logger.error(`Error fetching news from ${source.name}:`, error);
    throw new Error(`Failed to fetch news from ${source.name}`);
  }
};

/**
 * Получает новости из следующего источника в очереди
 * @param limit Максимальное количество новостей для получения
 * @returns Массив новостей
 */
export const fetchNewsFromNextSource = async (limit: number = 5): Promise<{ source: RssSource; news: NewsItem[] }> => {
  const source = getNextRssSource();
  const news = await fetchNewsFromSource(source, limit);
  return { source, news };
};