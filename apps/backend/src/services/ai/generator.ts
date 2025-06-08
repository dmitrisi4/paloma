import logger from '../../utils/logger';
import {generateText, MessageType} from './geminiService';

/**
 * Creates a system prompt for a historical personality
 * @param personalityData The personality data to create a prompt for
 * @returns A system prompt string
 */
export const createPersonalitySystemPrompt = (personalityData: {
  name: string;
  era: string;
  style: string;
  bio: string;
}): string => {
  return `You are ${personalityData.name}, a historical figure from ${personalityData.era}.
Your writing style is described as: ${personalityData.style}.
Biographical information: ${personalityData.bio}

When generating content, you must:
1. Stay true to the historical context and knowledge available during your lifetime
2. Maintain your distinct writing style and personality traits
3. Apply your worldview and philosophy to the given topic
4. Use vocabulary and references appropriate to your era
5. Avoid anachronistic knowledge (things you couldn't have known during your lifetime)

Format your response in a thoughtful, engaging manner as if you were writing in your characteristic style.`;
};

/**
 * Generates a post from a historical personality on a given topic
 * @param personalityData The personality data
 * @param topic The topic to generate content about
 * @returns The generated post content
 */
export const generatePostContent = async (
  personalityData: { name: string; era: string; style: string; bio: string },
  topic: string
): Promise<string> => {
  try {
    logger.info(`Generating content for ${personalityData.name} on topic: ${topic}`);

    const systemPrompt = createPersonalitySystemPrompt(personalityData);
    const userPrompt = `Write a social media post about "${topic}". Be concise yet thoughtful, expressing your unique perspective as ${personalityData.name}.`;

    const messages: MessageType = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    // Вызываем Gemini API через наш сервис
    const generatedContent = await generateText(messages, {
      temperature: 0.8,
      maxOutputTokens: 400
    });

    logger.error(`CF - ${generatedContent}`);
    // This is a placeholder - in production, replace with actual AI generation
    return `This is a generated post by 
    ${personalityData.name} (${personalityData.era}) about ${topic}.
    ${!generatedContent ? `Message: Generation Error` : `Message ${generatedContent}`}`;
  logger.error

    return `This is a generated post by ${personalityData.name} (${personalityData.era}) about ${topic}.
    
As someone from ${personalityData.era}, I have unique perspectives on this modern topic.
My style is characterized as ${personalityData.style}, which influences how I approach this subject.

(This is placeholder text that will be replaced by actual AI-generated content using the system prompt)`;
  } catch (error) {
    logger.error('Error in AI content generation:', error);
    throw new Error('Failed to generate AI content');
  }
};

/**
 * Generates a comment from a historical personality on a given post
 * @param personalityData The personality data of the commenter
 * @param postData The post data to comment on
 * @param authorData The personality data of the post author
 * @returns The generated comment content
 */
export const generateCommentContent = async (
  personalityData: { name: string; era: string; style: string; bio: string },
  postData: { content: string },
  authorData: { name: string; era: string }
): Promise<string> => {
  try {
    logger.info(`Generating comment from ${personalityData.name} on post by ${authorData.name}`);

    const systemPrompt = createPersonalitySystemPrompt(personalityData);
    const userPrompt = `You are commenting on a social media post by ${authorData.name} from ${authorData.era}. 

The post says: "${postData.content}"

Write a thoughtful comment as ${personalityData.name}, expressing your unique perspective on this post. Be concise yet insightful, showing how your historical context influences your view on this topic.`;

    const messages: MessageType = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    // Вызываем Gemini API через наш сервис
    const generatedContent = await generateText(messages, {
      temperature: 0.8,
      maxOutputTokens: 300
    });

    return generatedContent ?? 'Message: Generation Error';
  } catch (error) {
    logger.error('Error in AI comment generation:', error);
    throw new Error('Failed to generate AI comment');
  }
};
