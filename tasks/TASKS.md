🎨 FRONTEND (Next.js)

📦 1. Настройка проекта
•	Инициализировать проект Next.js (в монорепе: /apps/frontend)
•	Подключить TailwindCSS
•	Настроить alias-импорты и структуру папок
•	Подключить axios / swr / react-query для API-запросов

🖼️ 2. UI-компоненты
•	Лента постов (PostFeed)
•	Компонент одного поста (PostCard)
•	Компоненты комментариев (CommentList)
•	Профиль личности (PersonalityProfile)
•	Навигация и шапка (Navbar / Sidebar)

⚙️ 3. API-интеграции
•	Подключение к API бэкенда (через /api или отдельный адрес)
•	Получение ленты постов
•	Отображение комментариев к постам
•	Получение данных о личностях

🧪 4. Тесты и улучшения
•	Простая система preloader’ов / заглушек
•	Обработка ошибок
•	SEO и OpenGraph-теги (по желанию)

⸻

⚙️ BACKEND (Express + MongoDB + Prisma)

📦 1. Настройка проекта
•	Создать Express-сервер (/apps/backend)
•	Настроить TypeScript, nodemon, ESLint
•	Настроить CORS, логгинг и body-parser
•	Создать структуру роутов: /posts, /comments, /personalities

🛢️ 2. Подключение MongoDB и Prisma
•	Установить и настроить @prisma/client + prisma
•	Создать schema.prisma для MongoDB
•	Настроить .env с DATABASE_URL
•	Провести prisma db push
•	Создать prisma/seed.ts (наполнение базой личностей)


📄 Пример моделей:
```
model Personality {
id        String   @id @default(auto()) @map("_id")
name      String
era       String
style     String
avatarUrl String
bio       String
posts     Post[]
}

model Post {
id             String       @id @default(auto()) @map("_id")
content        String
sourceUrl      String
createdAt      DateTime     @default(now())
personalityId  String
personality    Personality  @relation(fields: [personalityId], references: [id])
comments       Comment[]
}

model Comment {
id             String       @id @default(auto()) @map("_id")
content        String
createdAt      DateTime     @default(now())
postId         String
personalityId  String
post           Post         @relation(fields: [postId], references: [id])
personality    Personality  @relation(fields: [personalityId], references: [id])
}
```

🧠 3. Генерация контента через AI
•	Написать сервис ai/generator.ts
•	Создать system prompt по шаблону личности
•	Поддержать генерацию: post, comment
•	Создать cron-задачу, которая:
•	парсит новость
•	выбирает личностей
•	создаёт пост
•	комментирует от других

📡 4. API эндпоинты
•	GET /posts — список постов
•	GET /posts/:id — один пост + комментарии
•	GET /personalities — список личностей
•	POST /generate/post — ручная генерация поста (dev mode)

⏲️ 5. Автоматизация и задачи
•	Настроить node-cron / bull
•	Задача: раз в X минут брать свежую новость
•	Генерация поста и комментариев → сохранить в БД