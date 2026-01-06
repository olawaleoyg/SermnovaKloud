export const PROJECTS = [
    {
        id: 'p1',
        title: 'E-commerce API with Node.js',
        status: 'reviewed',
        submittedAt: '2023-10-15',
        feedback: 'Excellent work on the middleware. Consider optimizing the database queries.',
        score: 9,
        mentor: 'Sarah Lin'
    },
    // ... other old student projects ...
];

export const MENTOR_QUEUE = [
    // ... same as before ...
    {
        id: 's1',
        projectTitle: 'Weather App UI',
        studentName: 'Alex K.',
        submittedTime: '2 hours ago',
        tags: ['React', 'CSS']
    },
];

export const TRACKS = [
    {
        id: 'p_frontend_01',
        title: 'Real-Time Financial Crypto Dashboard',
        description: 'Build a high-performance dashboard visualizing real-time cryptocurrency data with WebSockets. Handle rapid state updates, complex charting, and connection resiliency.',
        level: 'Intermediate',
        tags: ['React', 'WebSockets', 'D3.js', 'State Management'],
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        est_hours: 15,
        projects: [
            {
                id: 'fp1_1',
                title: 'Data Ingestion Layer',
                type: 'project',
                access_level: 'free',
                outcome: 'Establish a resilient WebSocket connection to a public crypto API (e.g. Coinbase). Handle reconnection logic, buffering, and data normalization for the UI.',
                notes: 'Focus on separating the socket logic from the view layer. How do you handle a sudden flood of messages?'
            },
            {
                id: 'fp1_2',
                title: 'Live Candlestick Chart',
                type: 'project',
                access_level: 'free',
                outcome: 'Implement a specific time-window candlestick chart that updates effectively without re-rendering the entire DOM.',
                notes: 'Performance is key here. Avoid unnecessary React re-renders. Consider Canvas vs SVG.'
            },
            {
                id: 'fp1_3',
                title: 'Portfolio Tracking & Alerts',
                type: 'project',
                access_level: 'free',
                outcome: 'Allow users to "buy" coins and track P&L in real-time. Set up client-side alerts when price thresholds are crossed.',
                notes: 'Think about client-side state persistence. What happens if the browser tab closes?'
            }
        ],
        submission_req: 'Deploy link (Vercel/Netlify) + Public GitHub Repo. Include a Loom video demonstrating the disconnect/reconnect resiliency.'
    },
    {
        id: 'p_backend_01',
        title: 'Distributed Rate Limiter Service',
        description: 'Design and implement a scalable rate limiting service to protect APIs from abuse. Use Redis for sliding window counters and handle race conditions.',
        level: 'Advanced',
        tags: ['Node.js/Go', 'Redis', 'Lua Scripts', 'System Design'],
        color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        est_hours: 20,
        projects: [
            {
                id: 'bp1_1',
                title: 'Fixed Window Counter',
                type: 'project',
                access_level: 'free',
                outcome: 'Build a basic middleware that limits IP addresses to X requests per minute using a Redis integer counter.',
                notes: 'Understand the edge cases. What happens at the very specific moment the minute flips?'
            },
            {
                id: 'bp1_2',
                title: 'Sliding Window Log Algorithm',
                type: 'project',
                access_level: 'free',
                outcome: 'Upgrade to a sliding window log approach for smoother traffic shaping. Use Redis Sorted Sets.',
                notes: 'Analyze the memory footprint. Is this approach sustainable for 10 million users?'
            },
            {
                id: 'bp1_3',
                title: 'Distributed State & Race Conditions',
                type: 'project',
                access_level: 'free',
                outcome: 'Ensure counters are atomic using Lua scripts. Simulate concurrent requests to verify accuracy.',
                notes: 'This is the "real world" part. Test it with a load testing tool like k6.'
            }
        ],
        submission_req: 'GitHub Repo with Docker Compose file. Include a load test report (screenshot or text) showing the limiter holding up under pressure.'
    },
    {
        id: 'p_devops_01',
        title: 'Zero-Downtime Deployment Pipeline',
        description: 'Automate a CI/CD pipeline that deploys a containerized application to a cluster using a Blue/Green or Rolling update strategy with no failures.',
        level: 'Intermediate',
        tags: ['Docker', 'GitHub Actions', 'AWS/DigitalOcean', 'Nginx'],
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        est_hours: 12,
        projects: [
            {
                id: 'dp1_1',
                title: 'Containerization & Health Checks',
                type: 'project',
                access_level: 'free',
                outcome: 'Create a robust Dockerfile for a dummy API. Implement `/healthz` and `/readyz` endpoints.',
                notes: 'The orchestrator needs to know when your app is actually ready to take traffic, not just when the process starts.'
            },
            {
                id: 'dp1_2',
                title: 'The Blue/Green Switch Script',
                type: 'project',
                access_level: 'free',
                outcome: 'Write a shell script or Ansible playbook that spins up the new version (Green) alongside the old (Blue) and swaps the Nginx traffic pointer only when Green is healthy.',
                notes: 'Avoid manual intervention. If Green fails health checks, the swap should never happen.'
            },
            {
                id: 'dp1_3',
                title: 'Automated Rollback',
                type: 'project',
                access_level: 'free',
                outcome: 'Detect high error rates immediately after deployment and automatically revert traffic to the Blue environment.',
                notes: 'Think about monitoring. How does your script know "error rates are high"?'
            }
        ],
        submission_req: 'GitHub Repo with pipeline configuration files. Readme must explain the specific switching logic used.'
    },
    {
        id: 'p_system_01',
        title: 'Custom Load Balancer Implementation',
        description: 'Stop using off-the-shelf LBs and build your own L7 Load Balancer. Understand Weighted Round Robin, Least Connections, and Active Health Checking.',
        level: 'Advanced',
        tags: ['Networking', 'Round Robin', 'Concurrency', 'TCP/HTTP'],
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        est_hours: 25,
        projects: [
            {
                id: 'sp1_1',
                title: 'Basic Proxy Forwarding',
                type: 'project',
                access_level: 'free',
                outcome: 'Create a server that accepts HTTP requests and forwards them to a single backend server, returning the response to the client.',
                notes: 'Don\'t use a library like `http-proxy`. Handle the streams and headers manually to learn how they work.'
            },
            {
                id: 'sp1_2',
                title: 'Load Balancing Algorithms',
                type: 'project',
                access_level: 'free',
                outcome: 'Implement Round Robin and Weighted Round Robin strategies to distribute traffic across 3 backend mock servers.',
                notes: 'How do you persist state (which server is next) safely across concurrent requests?'
            },
            {
                id: 'sp1_3',
                title: 'Active Health Monitoring',
                type: 'project',
                access_level: 'free',
                outcome: 'The LB should periodically ping backends. If one is dead, remove it from the rotation. seamlessy re-add it when it recovers.',
                notes: 'This prevents the "black hole" problem where users get 502s because one server is down.'
            }
        ],
        submission_req: 'GitHub Repo. Include a demo script that spins up 3 backends and curls the LB 100 times to show distribution.'
    },
    {
        id: 'p_backend_02',
        title: 'Secure Authentication & Authorization Service',
        description: 'Build a production-grade authentication service supporting JWTs, refresh tokens, and role-based access control. Secure APIs, protect routes, and handle token rotation safely.',
        level: 'Intermediate',
        tags: ['Auth', 'JWT', 'RBAC', 'Security'],
        color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
        est_hours: 18,
        projects: [
            {
                id: 'ba1_1',
                title: 'JWT Identity Provider',
                type: 'project',
                access_level: 'free',
                outcome: 'Implement a service that issues signed JWTs upon user login and provides a public key endpoint for verification.',
                notes: 'Understand the difference between symmetric (HS256) and asymmetric (RS256) signing.'
            },
            {
                id: 'ba1_2',
                title: 'Refresh Token Rotation',
                type: 'project',
                access_level: 'free',
                outcome: 'Secure simple access tokens with short-lived expiration and a robust refresh token rotation strategy stored in Redis.',
                notes: 'This detects token theft. If a refresh token is reused, invalidate the entire chain.'
            },
            {
                id: 'ba1_3',
                title: 'RBAC Middleware',
                type: 'project',
                access_level: 'free',
                outcome: 'Create middleware that checks user roles (admin, editor, viewer) against route permissions before executing business logic.',
                notes: 'Keep it declarative. Decorators or higher-order functions work well here.'
            }
        ],
        submission_req: 'GitHub Repo + Postman Collection demonstrating the full login/refresh/access flow.'
    },
    {
        id: 'p_system_02',
        title: 'Event-Driven Notification System',
        description: 'Design and implement an asynchronous notification system that processes events reliably using queues. Handle retries, idempotency, and failure scenarios at scale.',
        level: 'Advanced',
        tags: ['Event-Driven Architecture', 'Message Queues', 'Retries & Idempotency', 'Observability'],
        color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        est_hours: 22,
        projects: [
            {
                id: 'sys2_1',
                title: 'Event Producer Service',
                type: 'project',
                access_level: 'free',
                outcome: 'Decouple your services. Emit structured "UserJoined" or "OrderPlaced" events to a message broker (RabbitMQ/Kafka).',
                notes: 'Define a strict schema for your events (e.g., using Protobuf or JSON Schema) to prevent breaking consumers.'
            },
            {
                id: 'sys2_2',
                title: 'Reliable Queue Consumer',
                type: 'project',
                access_level: 'free',
                outcome: 'Build a worker that processes notification events. Ensure at-least-once delivery handling.',
                notes: 'What happens if the email provider API is down? Do not drop the message.'
            },
            {
                id: 'sys2_3',
                title: 'Idempotency & DLQs',
                type: 'project',
                access_level: 'free',
                outcome: 'Ensure processing the same event twice causes no side effects. Implement a Dead Letter Queue for permanently failed messages.',
                notes: 'Use a Redis key with a TTL to track processed event IDs.'
            }
        ],
        submission_req: 'GitHub Repo + Docker Compose (Broker + App). Include a diagram of the event flow.'
    }
];
