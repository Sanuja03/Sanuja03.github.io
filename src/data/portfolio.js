export const profile = {
  name: 'Sanuja',
  fullName: 'Sanuja Nimsith Alphonsus',
  role: 'IT & Management undergraduate',
  email: 'nimsith@gmail.com',
  github: 'https://github.com/Sanuja03',
  linkedin: 'https://www.linkedin.com/in/sanuja-alphonsus/',
  Instagram: 'https://www.instagram.com/sanuja_a/',
  location: 'Based in Sri Lanka',
}

export const skills = [
  {
    category: 'Programming and web',
    description: 'The languages and frameworks I build most of my projects with.',
    items: ['Java', 'Python', 'C', 'JavaScript', 'PHP', 'React', 'Spring Boot', 'Node.js', 'Express', 'Astro'],
  },
  {
    category: 'Backend and data',
    description: 'Storing data, designing APIs and connecting services together.',
    items: ['REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'OpenAI APIs', 'Power BI'],
  },
  {
    category: 'Tools and workflow',
    description: 'How I work with a team and keep a project moving.',
    items: ['Git', 'GitHub', 'Docker', 'Jira', 'Figma', 'Postman'],
  },
]

export const professionalSkills = {
  category: 'Business and professional',
  description: 'What I have picked up through IT & Management, CIMA, project work and my internship.',
  items: [
    'Problem solving',
    'Analytical thinking',
    'Communication',
    'Teamwork',
    'Leadership',
    'Decision-making',
    'Relationship management',
    'Financial management',
    'Risk awareness',
    'Presenting',
  ],
}

export const additionalSkills = {
  category: 'Also worked with',
  description: 'Things I have used in coursework, hardware projects and experiments.',
  items: ['HTML', 'CSS', 'Angular', 'jQuery', 'ESP32', 'Arduino IDE', 'IoT sensors', 'Cybersecurity basics'],
}

/*
 * Every project has its own case page at /projects/<slug>/.
 * `media.base` is the folder in /public that holds the project's images.
 * `media.ratio` is the shared frame ratio for that project's screenshots,
 * so every image in a gallery sits in an identical frame.
 */
export const projects = [
  {
    slug: 'interlink',
    title: 'InterLink',
    summary: 'A recruitment platform for companies, candidates and interviewers. I built the Super Admin side and the AI chatbot.',
    meta: 'Group project · 2025–2026',
    technologies: ['React', 'Spring Boot', 'PostgreSQL', 'OpenAI'],
    image: '/images/projects/interlink/cover.jpg',
    imageAlt: 'InterLink Super Admin dashboard shown on a laptop',
    links: [],
    caseStudy: {
      kind: 'University group project',
      facts: [
        ['Module', 'IS2901 Software Development Project'],
        ['Team', 'SyncX'],
        ['Client', 'Inova IT Systems (Pvt) Ltd.'],
        ['When', 'Sep 2025 – Aug 2026'],
      ],
      lead: 'A multi-tenant recruitment platform that connects companies, candidates, interviewers and platform administrators through shared hiring workflows.',
      hero: { src: 'dashboard.png', alt: 'InterLink public landing page' },
      overview: [
        'InterLink brings recruitment into one place. Companies post jobs and run interviews, candidates apply and track their progress, interviewers record their feedback, and platform administrators keep an eye on everything.',
        'Hiring involves a lot of people with different permissions. The goal was to give each role a workspace that fits what they need to do, while giving administrators a clear view of the whole platform.',
      ],
      highlights: [
        ['Super Admin', 'Platform-wide governance, settings and activity visibility.'],
        ['Company Admin', 'Company-side hiring and job workflows.'],
        ['Candidate', 'Finding jobs, applying and following applications.'],
        ['Interviewer', 'Interview scheduling and feedback.'],
      ],
      highlightsTitle: 'Four roles, one platform',
      stack: {
        Frontend: ['React 19', 'JavaScript', 'Tailwind CSS', 'Vite', 'React Router', 'Axios'],
        Backend: ['Java 21', 'Spring Boot 3.4.4', 'Spring Data JPA', 'REST APIs', 'WebClient'],
        'Data and AI': ['PostgreSQL', 'Supabase', 'pgvector', 'Supabase Storage', 'OpenAI GPT-4.1-mini'],
        Workflow: ['Git', 'GitHub', 'Jira', 'Figma', 'Postman'],
      },
      architecture: {
        title: 'A layered client–server design',
        text: [
          'A React frontend talks to a Spring Boot backend over REST. The backend is organised into controllers, services, repositories, entities and DTOs, with PostgreSQL on Supabase for storage and OpenAI called through WebClient for the chatbot.',
          'My work sat mainly in the Super Admin area: platform administration, activity logging, system settings and the chatbot integration, all built on this shared architecture.',
        ],
        image: 'architecture.png',
        imageAlt: 'InterLink architecture: a React presentation layer calling a Spring Boot application layer over HTTPS with JWT, which uses Supabase PostgreSQL with pgvector for data and Supabase Auth, Storage, OpenAI and Gmail SMTP as external services.',
        width: 937,
        height: 492,
      },
      contributionIntro: 'InterLink was a team project. These are the parts I was responsible for; other modules were built by my teammates.',
      contributions: [
        ['Super Admin dashboard', 'A central overview for keeping track of companies, interviews, jobs, users and recent activity across the platform.'],
        ['User management', 'Listing, search, filters and pagination, role-specific profiles, suspending and restoring accounts, flagging and unflagging, with permission checks and clear feedback after each action.'],
        ['Company management', 'Approving and rejecting companies, search and filters, and suspending or restoring a company together with its users and jobs. Every administrative action is logged.'],
        ['Job management', 'Platform-wide job monitoring with search, filters, flagging and restoring, plus a hierarchy check that stops a job being restored while its company is still suspended.'],
        ['Activity logs', 'Logging for key authentication, company, user, job and settings actions, with pagination, date and role filters, and debounced search.'],
        ['AI chatbot', 'A role-aware assistant for all four roles, using GPT-4.1-mini through Spring WebClient. It answers from an internal knowledge base using keyword-based context routing, keeps conversations, and enforces daily limits with warnings.'],
        ['System settings', 'A database-backed settings page for changing the chatbot’s daily limit and warning threshold without touching code.'],
      ],
      challenges: [
        ['Bringing modules together', 'Frontend and backend work was built separately by different people, so integration meant branches, pull requests and a fair amount of merge-conflict resolution.'],
        ['Keeping the database consistent', 'The Supabase schema and the Java entities had to stay in step, including a change to job IDs between UUID and BigInt.'],
        ['Roles and hierarchy', 'Administrative actions had to respect permissions and parent–child relationships, like not restoring a job while its company is suspended.'],
        ['Useful, bounded AI', 'The chatbot needed a focused knowledge base, sensible routing, saved conversations and limits enforced on the backend rather than in the browser.'],
      ],
      learnings: [
        'Administrative features are mostly about relationships: who is allowed to do what, and what else changes when they do it.',
        'When a React frontend, a Spring Boot backend and a PostgreSQL schema all evolve at once, keeping them consistent is a job in itself.',
        'A useful AI feature depends as much on context, limits, configuration and error handling as it does on the model call.',
      ],
      media: {
        base: '/images/projects/interlink/',
        ratio: '1900 / 911',
        fit: 'contain',
        title: 'Screens from my work',
        items: [
          ['dashboard1.png', 'Super Admin dashboard showing platform totals and recent activity.', 'Super Admin dashboard'],
          ['user-management.png', 'User management list with search, role filters and account actions.', 'User management'],
          ['company-management.png', 'Company management with approval and rejection controls.', 'Company management'],
          ['job-management.png', 'Platform-wide job list with filters.', 'Job management'],
          ['activity-logs.png', 'Activity log with role, date and keyword filters.', 'Activity logs'],
          ['ai-chatbot.png', 'InterLink chatbot conversation.', 'AI chatbot'],
          ['system-settings.png', 'Settings for the chatbot’s daily limit and warning threshold.', 'System settings'],
        ],
      },
    },
  },
  {
    slug: 'racetrack-circuit',
    title: 'RaceTrack Circuit',
    summary: 'An RC car racing game on a sensor-filled track, with live lap, crash and score data on a website. I built the track’s moving barriers.',
    meta: 'Group project · 2024–2025',
    technologies: ['ESP32', 'C++', 'Sensors', 'React', 'WebSockets'],
    image: '/images/projects/racetrack/cover.jpg',
    imageAlt: 'The RaceTrack Circuit track lit up beside the RC car',
    links: [
      { label: 'Track code on GitHub', href: 'https://github.com/sanjalee2003/Track-IOT' },
      { label: 'Car code on GitHub', href: 'https://github.com/sanjalee2003/IOT-Car' },
    ],
    caseStudy: {
      kind: 'University group project',
      facts: [
        ['Module', 'IS1901 Microcontroller Based ICT Project'],
        ['Team', 'CodeByBit, five members'],
        ['When', 'Jul 2024 – Aug 2025'],
        ['My part', 'Track barriers, wiring and build'],
      ],
      lead: 'An interactive RC car racing game. Sensors on the car and around the track record laps, crashes and time, moving obstacles react as the car passes, and a website keeps a live leaderboard.',
      video: {
        src: '/videos/racetrack-demo.mp4',
        caption: 'Project demo video, including the track, the car and the live website.',
      },
      overview: [
        'Each player drives the car around the track for two laps with a four-minute limit. An IR sensor at the start line starts the timer and counts laps, an accelerometer on the car counts collisions, and the number of crashes in a lap decides whether the player gets a penalty or a benefit.',
        'Two ESP32 boards run the system: one in the car and one under the track. The track controls three up-and-down barriers, a rotating obstacle and a section that shifts to open a new route. A small display beside the track and the website both show the timer, collisions and the final score.',
      ],
      highlights: [
        ['On the car', 'An MPU6050 accelerometer detects crashes, an ultrasonic sensor warns about obstacles, and colour-coded LEDs and a buzzer show what is happening.'],
        ['On the track', 'Five TCRT5000 IR sensors detect the car, triggering three servo barriers, a stepper-driven track shift and a DC-motor obstacle.'],
        ['On the website', 'Race data arrives over WebSockets, so lap time, collisions and score update live, and results go into a leaderboard.'],
      ],
      highlightsTitle: 'Three connected parts',
      stack: {
        Embedded: ['ESP32 DevKit V1', 'C/C++', 'Arduino IDE'],
        Sensors: ['TCRT5000 IR', 'MPU6050', 'HC-SR04 ultrasonic'],
        Actuators: ['SG90 servos', 'NEMA 17 stepper with A4988', 'DC motor with L298N', '1.8" TFT display'],
        Web: ['React', 'Vite', 'Node.js', 'Express', 'WebSockets', 'JSON'],
        Hardware: ['Custom PCBs', 'LM2596 buck converters', '12V supply', '2S LiPo battery'],
      },
      architecture: {
        title: 'How the pieces talk to each other',
        text: [
          'The car and the track each have their own ESP32 and power circuit. Both send their readings to a Node.js and Express backend, which pushes updates to the React website over WebSockets.',
          'The track display mirrors the website, so people watching beside the track and people watching online see the same race at the same time.',
        ],
        image: '/images/projects/racetrack/block-diagram.jpg',
        imageAlt: 'Block diagram of the RC car circuit and the race track circuit, both connected to the website.',
        width: 1026,
        height: 548,
        dark: true,
      },
      contributionIntro: 'My part of the project was on the track: the three up-and-down barriers that force the driver to stop and wait, plus wiring and building the track itself.',
      contributions: [
        ['Servo-driven barriers', 'Three SG90 servos lower a barrier about 90° when the car approaches, so the driver has to stop and wait for it to lift before finishing the lap.'],
        ['Detecting the car', 'Three TCRT5000 sensors on GPIO 32, 34 and 35. I used analogue readings averaged over five samples instead of a digital read, which gave a far more reliable trigger than a single noisy value.'],
        ['Calibrating the servos', 'Each servo has its own home and target position, set by hand, so the three barriers move together even though the motors are not perfectly identical.'],
        ['Timing and cool-downs', 'Once triggered, a barrier holds for a set time and then returns home. A cool-down period stops the same barrier firing again by accident while the car is still nearby.'],
        ['Power and wiring', 'The servos run from their own LM2596 regulator at 5V, isolating them from the sensors and display so a current spike cannot damage anything else. I wired my components from the track to the PCB and checked for shorts.'],
        ['Building the track', 'I helped build, paint and secure the physical track, worked on pin allocation for the PCB, split the project scope across the team, and helped fix issues on the website.'],
      ],
      challenges: [
        ['Sunlight and IR sensors', 'Infrared sensors behave differently in bright light, so a fixed digital read was unreliable. Averaged analogue readings and a tuned threshold made detection consistent.'],
        ['Servos that do not match', 'Cheap servos vary slightly. Calibrating each one separately was simpler and more reliable than trying to find a single angle that suited all three.'],
        ['Accidental re-triggers', 'A car sitting near a sensor could trigger a barrier repeatedly. A cool-down per barrier fixed this without blocking the rest of the code.'],
        ['Power spikes', 'Motors draw sudden current. Giving the servos their own regulator protected the more sensitive parts of the circuit.'],
      ],
      learnings: [
        'A sensor reading is only useful once you know how it behaves in the real environment, not just on the bench.',
        'Small decisions about power and wiring matter as much as the code when everything has to run together on a physical track.',
        'Hardware projects need a lot of coordination: pins, power budgets and who owns which part all have to be agreed early.',
      ],
      related: { label: 'Read my notes on the TCRT5000 sensor', href: '/blogs/tcrt5000-sensor-challenges/' },
      media: {
        base: '/images/projects/racetrack/',
        ratio: '4 / 3',
        fit: 'cover',
        title: 'Photos from the build',
        items: [
          ['track.jpg', 'The finished race track lit with red LED strips.', 'The finished track', 'cover', '50% 45%'],
          ['car.jpg', 'The RC car with its ultrasonic sensor and status LEDs.', 'The car', 'cover', '50% 55%'],
          ['servo-barrier-test.jpg', 'Breadboard test of a servo barrier driven by an ESP32.', 'Testing a servo barrier'],
          ['car-prototype.jpg', 'An early prototype of the car with sensors on a chassis.', 'Early car prototype'],
          ['track-pcb.jpg', 'PCB layout for the track controller.', 'Track PCB layout', 'contain'],
          ['leaderboard.jpg', 'The RaceTrack Circuit website leaderboard.', 'Website leaderboard', 'contain'],
        ],
      },
    },
  },
  {
    slug: 'swiftdrop',
    title: 'SwiftDrop',
    summary: 'A parcel delivery and courier management system. I set up the Docker environment and built booking, pricing, delivery zones and parts of the frontend.',
    meta: 'Group project · In progress',
    technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Sanuja03/swiftdrop' }],
    caseStudy: {
      kind: 'University group project',
      facts: [
        ['Module', 'Enterprise Application Development'],
        ['Team', 'Five members'],
        ['When', 'Nov 2026 – present'],
        ['Status', 'In development'],
      ],
      lead: 'A web platform for running a parcel delivery service: booking deliveries, pricing them by zone, assigning couriers and tracking parcels.',
      overview: [
        'SwiftDrop covers the day-to-day work of a courier business. Customers book a delivery and see the price before confirming, parcels get a tracking number, dispatchers assign couriers, and administrators manage delivery zones and pricing.',
        'It is built as a modular monolith: one Spring Boot application split into clear modules, so the team can work in parallel without the overhead of separate services. The project is still in progress, so this page describes the work done so far.',
      ],
      highlights: [
        ['Identity and accounts', 'Sign-in with JWT, with customers, couriers, dispatchers and administrators.'],
        ['Booking and tracking', 'Creating deliveries, tracking numbers, estimates and live status.'],
        ['Pricing and zones', 'Zone-based delivery fees calculated by pricing strategies.'],
        ['Dispatch and couriers', 'Assigning deliveries and recording proof of delivery.'],
        ['Notifications and webhooks', 'Messaging through RabbitMQ and outgoing webhooks for merchants.'],
      ],
      highlightsTitle: 'The main modules',
      stack: {
        Backend: ['Java 21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'WebSockets', 'JWT'],
        Frontend: ['React 19', 'Vite', 'React Router', 'STOMP'],
        'Data and messaging': ['PostgreSQL 17', 'RabbitMQ', 'MinIO'],
        Infrastructure: ['Docker', 'Docker Compose', 'Nginx', 'GitHub'],
      },
      contributionIntro: 'SwiftDrop is a team project. These are the areas I have built so far, based on my own commits to the repository.',
      contributions: [
        ['Project and Docker setup', 'Set up the repository structure, initialised the Spring Boot and React apps, wrote the Dockerfiles, and created the Docker Compose environment for the frontend, backend, PostgreSQL and later RabbitMQ, with credentials read from environment files.'],
        ['Booking flow', 'Parcel creation with tracking numbers and delivery estimates, a booking confirmation step, and a lookup by tracking number that only the parcel’s owner can use.'],
        ['Pricing and delivery zones', 'A zone catalogue with seed data, fee estimates calculated by pricing strategies (including a first-kilogram rule), and a public price list.'],
        ['Admin controls', 'APIs and pages for administrators to manage zones and pricing rules, with safeguards so the last active zone or the last active pricing rule cannot be switched off.'],
        ['Security rules', 'API access rules per role, resolving the signed-in customer from the JWT, and keeping error responses consistent between pricing and authentication.'],
        ['Customer frontend', 'A shared session and API client, a create-delivery page with live prices, and dashboard, shipment and tracking pages working on real data.'],
        ['Tests', 'Tests for the pricing strategies and the estimate API, and security tests that check admin endpoints respond correctly to admins, customers and anonymous users.'],
      ],
      challenges: [
        ['One environment for everyone', 'Five people need the same database and services. Docker Compose with per-person environment files gave everyone the same setup without sharing credentials.'],
        ['Pricing that can change', 'Delivery fees depend on zones and weight. Using separate pricing strategies kept the rules easy to test and easy to change.'],
        ['Admin edits versus seed data', 'Seed data must not overwrite changes made by an administrator, so the seeds only insert rows that are not already there.'],
      ],
      learnings: [
        'Setting up the shared environment early saved the whole team time later.',
        'Writing security tests for each role is the quickest way to find out whether access rules actually do what you think.',
      ],
    },
  },
  {
    slug: 'event-management',
    title: 'Happenza',
    summary: 'An event platform for university clubs and societies, with event approval, registrations and role-based access. Built on my own with the MERN stack.',
    meta: 'Individual project · 2025',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Sanuja03/Event-management-system' }],
    caseStudy: {
      kind: 'Individual project',
      facts: [
        ['Context', 'Certificate course project'],
        ['When', 'Apr – May 2025'],
        ['Role', 'Built on my own'],
        ['Type', 'Online event management system'],
      ],
      lead: 'An online event management system for university clubs, societies and community groups. People can find events and register; organisers submit events; administrators review them.',
      overview: [
        'Happenza has three kinds of user. Attendees browse upcoming events and register. Organisers submit and manage their events. Administrators approve or reject submissions and decide who can organise.',
        'I built the whole application: the React frontend, the Express API, the MongoDB models and the tests.',
      ],
      highlights: [
        ['Attendees', 'Browse and search upcoming or past events, register, see their bookings and cancel.'],
        ['Organisers', 'Create events, which wait for approval, then edit or cancel them.'],
        ['Administrators', 'Approve or reject events with a reason, and grant or remove organiser access.'],
      ],
      highlightsTitle: 'Three roles',
      stack: {
        Frontend: ['React 18', 'Create React App', 'Axios'],
        Backend: ['Node.js', 'Express 5', 'JWT', 'bcrypt'],
        Data: ['MongoDB Atlas', 'Mongoose'],
      },
      contributionIntro: 'This was an individual project, so everything here is my own work.',
      contributions: [
        ['Accounts and roles', 'Registration and login with hashed passwords and one-hour JWTs. Public sign-up can only create attendees; organiser access is granted by an administrator.'],
        ['Event approval', 'New events start as pending. Administrators approve or reject them, optionally with a reason, and only approved events appear publicly.'],
        ['Registrations', 'Attendees register for events, see their bookings and cancel them. A unique index prevents duplicate bookings, and capacity is enforced with an atomic update so events cannot be overbooked.'],
        ['Discovery', 'Search and category filters, with upcoming and past views.'],
        ['Tests', 'API, model and event-visibility tests to check that the rules hold.'],
      ],
      challenges: [
        ['Overbooking', 'Two people registering for the last seat at the same moment could both succeed. A conditional, atomic counter update fixed it at the database level.'],
        ['Privilege escalation', 'If public registration could set a role, anyone could make themselves an admin. Roles can only be changed by an existing administrator.'],
        ['Older records', 'Events created before approval existed have no status field, so the visibility rules treat them as already published without a data migration.'],
      ],
      learnings: [
        'Rules like “no overbooking” belong in the database, not just in the interface.',
        'Thinking about how a feature could be misused is part of designing it.',
      ],
    },
  },
  {
    slug: 'blogd',
    title: 'BlogD',
    summary: 'A blog management system with user and admin roles, posts, comments, categories and activity logs. Built in PHP and MySQL.',
    meta: 'Individual assignment · 2025',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Sanuja03/Blogd' }],
    caseStudy: {
      kind: 'Individual university assignment',
      facts: [
        ['Module', 'IN2120 Web Programming'],
        ['When', 'Oct – Nov 2025'],
        ['Role', 'Built on my own'],
        ['Stack', 'PHP and MySQL'],
      ],
      lead: 'A blog platform where people sign up, write and manage their own posts and comment on others, while administrators look after categories, posts and activity.',
      video: {
        src: '/videos/blogd-demo.mp4',
        caption: 'Demo walkthrough of BlogD.',
      },
      overview: [
        'BlogD has two kinds of account. Users write, edit and delete their own posts, comment on posts and see their own activity. Administrators create categories, manage every post and can see what everyone has been doing.',
        'It is a server-rendered PHP application backed by MySQL, written without a framework, so I handled sessions, routing between pages and database access myself.',
      ],
      highlights: [
        ['For readers and writers', 'Sign up, write posts with images, edit or delete them, and comment on other posts.'],
        ['For administrators', 'A dashboard for managing categories and posts, plus an activity log for the whole site.'],
        ['Throughout', 'Responsive layouts that work on phones, tablets and desktops.'],
      ],
      highlightsTitle: 'What it does',
      stack: {
        Backend: ['PHP', 'MySQL', 'Sessions'],
        Frontend: ['HTML', 'CSS', 'JavaScript'],
      },
      contributionIntro: 'This was an individual assignment, so everything here is my own work.',
      contributions: [
        ['Accounts and roles', 'Registration and login with hashed passwords, and separate user and admin areas protected by sessions.'],
        ['Posts and comments', 'Creating, editing and deleting posts, a page for each post, and comments from signed-in users.'],
        ['Administration', 'Category management, the ability to manage any post, and activity logs for both users and administrators.'],
        ['Safer database access', 'Database queries use prepared statements, which protects against SQL injection.'],
      ],
      challenges: [
        ['Keeping roles apart', 'Every protected page checks the session and the role, so a user cannot reach admin pages by typing the address.'],
        ['Building without a framework', 'Without a framework, the structure was up to me: shared header and footer files and a single place for the database connection kept the pages consistent.'],
      ],
      learnings: [
        'Working without a framework showed me what frameworks normally handle for you, such as sessions, escaping and structure.',
        'Security basics like prepared statements and password hashing are easy to add from the start and hard to retrofit.',
      ],
      media: {
        base: '/images/projects/blogd/',
        ratio: '1900 / 869',
        fit: 'contain',
        title: 'Screens',
        items: [
          ['home.jpg', 'BlogD home page with post cards.', 'Home page'],
          ['login.jpg', 'BlogD sign-in page.', 'Sign in'],
          ['user-dashboard.jpg', 'User dashboard with quick actions for posts and activity.', 'User dashboard'],
          ['admin-dashboard.jpg', 'Admin dashboard for categories, posts and the activity log.', 'Admin dashboard'],
          ['post.jpg', 'A single post with update, delete and comment options.', 'Reading a post'],
        ],
      },
    },
  },
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug && project.caseStudy)
}

/* Short summary used on the home page. */
export const background = [
  {
    title: 'BSc (Hons) in Information Technology & Management',
    place: 'University of Moratuwa',
    period: '2024 – present',
  },
  {
    title: 'CIMA, Operational Level',
    place: 'Chartered Institute of Management Accountants',
    period: '2023 – present',
  },
  {
    title: 'Corporate Banking Intern',
    place: 'Seylan Bank PLC',
    period: 'Internship',
  },
]

export const journey = {
  intro:
    'I study IT & Management because I like understanding both how software is built and why an organisation needs it. Alongside my degree I am working through CIMA, and an internship in corporate banking showed me how decisions are made inside a real business.',
  groups: [
    {
      title: 'Education',
      entries: [
        {
          period: '2024 – present',
          title: 'BSc (Hons) in Information Technology & Management',
          place: 'University of Moratuwa',
          detail:
            'My degree covers programming, software engineering, databases, web development and systems, alongside management subjects. Most of what I have learned in practice has come from group projects: a sensor-driven racing game in my first year, a recruitment platform for a real client in my second, and now a courier management system.',
        },
        {
          period: '2023 – present',
          title: 'CIMA, Operational Level',
          place: 'Chartered Institute of Management Accountants',
          detail:
            'I am studying management accounting, financial management and business decision-making alongside my degree. It helps me understand the business side of the systems I build.',
        },
      ],
    },
    {
      title: 'Experience',
      entries: [
        {
          period: 'Internship',
          title: 'Corporate Banking Intern',
          place: 'Seylan Bank PLC',
          detail:
            'Working in corporate banking gave me a close look at relationship management, credit risk and how decisions are made in a large organisation.',
        },
      ],
    },
    {
      title: 'School',
      entries: [
        {
          period: '2023',
          title: 'GCE Advanced Level',
          place: 'Commerce stream',
          detail: 'Three A passes.',
        },
        {
          period: '2021 – 2023',
          title: 'Junior and Senior Prefect',
          place: 'School',
          detail:
            'Two years in the prefects’ guild, first as a junior and then as a senior prefect, helping to organise school events and look after students.',
        },
        {
          period: 'School years',
          title: 'Clubs and societies',
          place: 'Interact Club, Photography Club and others',
          detail: 'Took part in several clubs alongside my studies.',
        },
        {
          period: '2019',
          title: 'GCE Ordinary Level',
          place: 'School',
          detail: 'Eight A passes.',
        },
      ],
    },
  ],
}

export const skillPage = {
  title: 'Skills',
  lead:
    'Most of my work is in software and web development, with a good amount of database and API work along the way. Studying IT & Management also means I spend time on the business side of technology.',
}

export const contact = {
  title: 'Get in touch',
  description:
    'I am open to internships and to conversations about software, IT and interesting problems.',
}
