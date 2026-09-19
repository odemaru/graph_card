import type { Prisma } from '../generated/prisma/client.js';

const skillGroups = {
  Frontend: [
    'React',
    'TypeScript',
    'Next.js',
    'Vue 3',
    'React Router',
    'Redux Toolkit',
    'TanStack Query',
    'React Hook Form',
    'Zod',
    'Tailwind CSS',
    'Vite',
    'PWA',
    'Feature-Sliced Design',
  ],
  Backend: [
    'Node.js',
    'NestJS',
    'Prisma',
    'GraphQL',
    'REST API',
    'WebSocket',
    'PostgreSQL',
    'Python',
  ],
  Тестирование: ['Vitest', 'Playwright', 'pytest', 'Selenium'],
  Инфраструктура: [
    'Git',
    'Docker',
    'GitHub Actions',
    'GitLab CI',
    'nginx',
    'Kubernetes',
    'Linux',
  ],
};

export const links: Prisma.LinkCreateWithoutProfileInput[] = [
  { label: 'GitHub', url: 'https://github.com/odemaru' },
  { label: 'Резюме', url: 'https://odemaru.github.io/resume/frontend' },
];

export const skills: Prisma.SkillCreateWithoutProfileInput[] = Object.entries(
  skillGroups,
).flatMap(([category, names]) => names.map((name) => ({ name, category })));

export const experience: Prisma.ExperienceCreateWithoutProfileInput[] = [
  {
    company: 'Deford',
    position: 'Fullstack-разработчик',
    startDate: new Date('2025-04-01'),
    achievements: [
      'Собрал с нуля фронтенд B2C-платформы «Спорт для всех» (React 19, TypeScript, PWA) и вывел его в прод за пять недель после первого коммита; сейчас на платформе больше 45 тысяч пользователей.',
      'Аутентификация: регистрация с OTP по телефону, детские профили со входом по QR, фоновое продление JWT и централизованная обработка 401 в перехватчиках axios.',
      'Программа лояльности с маркетплейсом наград: баллы начисляются только за подтверждённое по QR посещение, поэтому накрутка, с которой боролись в старой версии, стала невозможной.',
      'PWA: офлайн-оболочка на service worker и Web Push через VAPID, включая iOS, где уведомления работают только из установленного приложения.',
      'Админ-панель платформы на 20 разделов: собственный набор UI-компонентов, таблицы с фильтрами, роли через Keycloak.',
      'Десять парсеров сайтов автомобильных брендов на Python: реверс закрытых GraphQL- и REST-эндпоинтов, обход антибот-защиты через curl_cffi, выгрузка в Google Sheets и Яндекс.Диск.',
      'Docker-образ, nginx и деплой в Kubernetes; разбирал прод-инциденты по логам и метрикам k3s, от отвалившегося service worker до исчерпанного пула соединений PostgreSQL.',
    ],
  },
  {
    company: 'Новосибирский научно-технический центр',
    position: 'Инженер по автоматизации тестирования',
    startDate: new Date('2022-07-01'),
    endDate: new Date('2025-02-01'),
    achievements: [
      'В одиночку ввёл больше 300 тест-кейсов и автотестов и полностью покрыл интерфейс desktop-приложения на C#/Avalonia: регресс перед каждой сборкой шёл автоматически.',
      'Разработал библиотеку и инструменты для headless-тестирования интерфейса на Avalonia, на которых команда писала новые проверки, а не собирала их с нуля.',
      'Оформлял найденные дефекты в баг-репорты и доводил их до исправления; вручную проверял срочные сценарии перед выпуском.',
    ],
  },
];

export const projects: Prisma.ProjectCreateWithoutProfileInput[] = [
  {
    name: 'Спорт для всех',
    url: 'https://спортдлявсех.бел',
    description:
      'B2C-платформа бесплатных тренировок Президентского спортивного клуба Беларуси: расписание и запись на слоты, подтверждение посещения по QR, программа лояльности. Весь фронтенд на React 19 и TypeScript.',
  },
  {
    name: 'Gitboard',
    url: 'https://github.com/odemaru/gitboard',
    description:
      'Локальный дашборд над git-репозиториями: ветки, коммиты, заметки и задачи, подсветка вмерженных и протухших веток. Electron, Fastify, React, BlockNote.',
  },
  {
    name: 'Грузовые аукционы',
    url: 'https://github.com/odemaru/auctions-testing',
    description:
      'SPA по OpenAPI-схеме: список с фильтрами, карточка, история ставок, форма ставки. React 19, TanStack Router и Query, React Hook Form с Zod, MSW, Vitest, Feature-Sliced Design.',
  },
  {
    name: 'OwnCord',
    url: 'https://github.com/odemaru/owncord',
    description:
      'Форк self-hosted мессенджера с голосом и видео (TypeScript, React, Node.js, Socket.IO, WebRTC): шумоподавление на звонках и HTTPS для приватной сети.',
  },
  {
    name: 'Сайт-резюме',
    url: 'https://github.com/odemaru/resume',
    description:
      'Одни данные, два фреймворка: страница собрана на Next.js и на Vue 3 из общего JSON, PDF генерируется в GitHub Actions, деплой на GitHub Pages.',
  },
];

export const profile: Prisma.ProfileCreateInput = {
  name: 'Тимофей Гавриков',
  title: 'Fullstack-разработчик',
  description:
    'Четыре года в IT: полтора года в разработке и 2 года 8 месяцев в автоматизации тестирования. ' +
    'Делаю фронтенд на React и TypeScript для B2C-платформы с 45 тысячами пользователей, ' +
    'пишу бэкенд-инструменты на Python и Node.js. Опыт тестирования помогает продумывать ' +
    'краевые случаи заранее и разбирать баги на всём стеке, от DevTools до логов бэкенда и базы.',
  email: 'gavrikovtimofey@gmail.com',
  links: { create: links },
  skills: { create: skills },
  experience: { create: experience },
  projects: { create: projects },
};
