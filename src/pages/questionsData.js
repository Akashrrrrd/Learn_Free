const questionsData = {
  "Introduction to Blockchain": [
    {
      question: "What is a blockchain?",
      options: [
        "A digital currency",
        "A decentralized ledger technology",
        "A type of software",
        "A social media platform",
      ],
      answer: 1,
    },
    {
      question: "What are the main characteristics of blockchain technology?",
      options: [
        "Centralized control",
        "Immutability and transparency",
        "Slow transaction speeds",
        "Unlimited data storage",
      ],
      answer: 1,
    },
    {
      question:
        "What is the difference between public and private blockchains?",
      options: [
        "Public blockchains are slower",
        "Private blockchains are restricted access",
        "Public blockchains cannot be audited",
        "There is no difference",
      ],
      answer: 1,
    },
    {
      question: "Explain what smart contracts are.",
      options: [
        "Contracts signed by lawyers",
        "Self-executing contracts with the terms directly written into code",
        "A type of blockchain",
        "Contracts that cannot be changed",
      ],
      answer: 1,
    },
    {
      question:
        "What are the advantages of using blockchain in supply chain management?",
      options: [
        "Increased transparency and traceability",
        "Higher costs",
        "Less security",
        "Slower processes",
      ],
      answer: 0,
    },
  ],
  "Web Development Basics": [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HyperText Machine Language",
        "Hyperlink and Text Markup Language",
        "HighText Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which language is primarily used for styling web pages?",
      options: ["HTML", "CSS", "JavaScript", "PHP"],
      answer: 1,
    },
    {
      question: "What is the purpose of JavaScript in web development?",
      options: [
        "To structure the content",
        "To style the web pages",
        "To create interactive elements",
        "To manage databases",
      ],
      answer: 2,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Colorful Style Sheets",
        "Computer Style Sheets",
        "Creative Style Systems",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is a front-end framework?",
      options: ["Django", "Ruby on Rails", "React", "Node.js"],
      answer: 2,
    },
  ],
  "Database Management": [
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
      answer: 2,
    },
    {
      question: "What does ACID stand for in database management?",
      options: [
        "Automatic, Consistent, Immediate, Data",
        "Atomicity, Consistency, Isolation, Durability",
        "Advanced, Controlled, Indexed, Distributed",
        "Analog, Computed, Indexed, Durable",
      ],
      answer: 1,
    },
    {
      question: "What is the purpose of indexing in a database?",
      options: [
        "To increase storage capacity",
        "To provide security",
        "To speed up the retrieval of records",
        "To ensure data consistency",
      ],
      answer: 2,
    },
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: ["GET", "SELECT", "FETCH", "PULL"],
      answer: 1,
    },
    {
      question:
        "What type of relationship does a foreign key define between two tables?",
      options: [
        "One-to-One",
        "One-to-Many",
        "Many-to-Many",
        "All of the above",
      ],
      answer: 3,
    },
  ],

  "Cloud Computing": [
    {
      question: "What is the main benefit of using cloud computing?",
      options: [
        "Higher latency",
        "Reduced operational costs",
        "More physical infrastructure required",
        "Less security",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is a type of cloud service?",
      options: [
        "Platform as a Service (PaaS)",
        "Hardware as a Service (HaaS)",
        "Application as a Service (AaaS)",
        "Database as a Service (DBaaS)",
      ],
      answer: 0,
    },
    {
      question: "What does SaaS stand for?",
      options: [
        "Software as a Service",
        "Storage as a Service",
        "System as a Service",
        "Server as a Service",
      ],
      answer: 0,
    },
    {
      question:
        "What type of cloud deployment model is characterized by a single organization using cloud resources?",
      options: [
        "Public Cloud",
        "Private Cloud",
        "Hybrid Cloud",
        "Community Cloud",
      ],
      answer: 1,
    },
    {
      question:
        "Which of the following is a key characteristic of cloud computing?",
      options: [
        "Scalability",
        "Fixed pricing",
        "Limited access",
        "Manual updates",
      ],
      answer: 0,
    },
  ],

  "Cybersecurity Fundamentals": [
    {
      question: "What is phishing?",
      options: [
        "A type of malware",
        "A social engineering attack to steal sensitive information",
        "A method to secure a network",
        "An encrypted communication protocol",
      ],
      answer: 1,
    },
    {
      question: "What does VPN stand for?",
      options: [
        "Virtual Public Network",
        "Very Private Network",
        "Virtual Private Network",
        "Visible Private Network",
      ],
      answer: 2,
    },
    {
      question: "What is the purpose of encryption?",
      options: [
        "To speed up internet browsing",
        "To protect sensitive data by converting it into a secure format",
        "To slow down attackers",
        "To increase data storage capacity",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is a common type of cyber attack?",
      options: ["Phishing", "Baiting", "Pretexting", "All of the above"],
      answer: 3,
    },
    {
      question: "What is a firewall used for?",
      options: [
        "To store user passwords",
        "To filter incoming and outgoing network traffic",
        "To encrypt data",
        "To speed up internet connection",
      ],
      answer: 1,
    },
  ],

  "Machine Learning": [
    {
      question: "What is machine learning?",
      options: [
        "A branch of artificial intelligence that involves the use of algorithms and statistical models",
        "A method for storing large amounts of data",
        "A type of computer programming",
        "A process for managing hardware components",
      ],
      answer: 0,
    },
    {
      question: "What are the different types of machine learning algorithms?",
      options: [
        "Classification, Regression, Clustering, and Reinforcement learning",
        "Data mining, Data analysis, and Data visualization",
        "Statistics, Probability, and Linear algebra",
        "None of the above",
      ],
      answer: 0,
    },
    {
      question: "What is overfitting and how can it be prevented?",
      options: [
        "Overfitting occurs when a model learns noise instead of the signal; it can be prevented with regularization",
        "Overfitting happens when a model is too simple; it can be prevented by using more data",
        "Overfitting is when the model performs well on training data but poorly on test data; it cannot be prevented",
        "Overfitting refers to the model's ability to make predictions",
      ],
      answer: 0,
    },
    {
      question:
        "What is a confusion matrix, and how is it used in machine learning?",
      options: [
        "A matrix used to store training data",
        "A table used to evaluate the performance of a classification model",
        "A method for cleaning data",
        "None of the above",
      ],
      answer: 1,
    },
    {
      question: "What is gradient descent, and how does it work?",
      options: [
        "An optimization algorithm used to minimize the cost function",
        "A method for cleaning data",
        "A way to visualize model performance",
        "None of the above",
      ],
      answer: 0,
    },
  ],
  "Digital Marketing Strategies": [
    {
      question: "What is the primary goal of digital marketing?",
      options: [
        "To increase website traffic",
        "To build brand awareness and engage customers online",
        "To reduce advertising costs",
        "To eliminate the need for traditional marketing",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is a key component of SEO?",
      options: [
        "Social media marketing",
        "Keyword research",
        "Email marketing",
        "Pay-per-click advertising",
      ],
      answer: 1,
    },
    {
      question: "What is content marketing?",
      options: [
        "The process of creating and distributing valuable content to attract and engage a target audience",
        "A form of online advertising",
        "A method for managing social media accounts",
        "The same as SEO",
      ],
      answer: 0,
    },
    {
      question: "What does PPC stand for in digital marketing?",
      options: [
        "Pay-Per-Click",
        "Pay-Per-Customer",
        "Pay-Per-Campaign",
        "Pay-Per-Conversion",
      ],
      answer: 0,
    },
    {
      question: "Which platform is most commonly used for B2B marketing?",
      options: ["Instagram", "LinkedIn", "TikTok", "Facebook"],
      answer: 1,
    },
  ],
  "Artificial Intelligence": [
    {
      question: "What is artificial intelligence (AI)?",
      options: [
        "A branch of computer science that aims to create machines that can perform tasks that typically require human intelligence",
        "A type of hardware that improves computer speed",
        "Software that prevents cyber attacks",
        "A system for managing big data",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is a common application of AI?",
      options: [
        "Predictive analytics",
        "Image processing",
        "Natural language processing",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "What does machine learning refer to?",
      options: [
        "A subset of AI that focuses on algorithms allowing computers to learn from data",
        "A method for increasing computer processing speed",
        "A way to encrypt data",
        "The process of creating robots",
      ],
      answer: 0,
    },
    {
      question: "What is a neural network?",
      options: [
        "A series of algorithms that mimic the operations of a human brain to recognize relationships in data",
        "A type of software used for data storage",
        "A hardware component in computers",
        "An encryption method",
      ],
      answer: 0,
    },
    {
      question: "What does 'deep learning' involve?",
      options: [
        "The use of complex neural networks with many layers to analyze various types of data",
        "Learning from user feedback on software",
        "Deep analysis of market trends",
        "Learning through simulations",
      ],
      answer: 0,
    },
  ],
  "Networking Fundamentals": [
    {
      question: "What is a computer network?",
      options: [
        "A group of interconnected computers that can share resources and data",
        "A single computer connected to the internet",
        "A type of server",
        "A device that stores data",
      ],
      answer: 0,
    },
    {
      question: "What does IP stand for in networking?",
      options: [
        "Internet Protocol",
        "Internal Protocol",
        "Interconnected Protocol",
        "Information Protocol",
      ],
      answer: 0,
    },
    {
      question: "What is a router?",
      options: [
        "A device that forwards data packets between computer networks",
        "A type of computer",
        "A server that stores files",
        "A software application for data processing",
      ],
      answer: 0,
    },
    {
      question: "What is the purpose of a firewall?",
      options: [
        "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
        "To speed up internet connections",
        "To store data securely",
        "To connect multiple devices to a network",
      ],
      answer: 0,
    },
    {
      question: "What is a subnet?",
      options: [
        "A smaller network within a larger network, used to segment network traffic",
        "A type of internet connection",
        "A protocol for data transfer",
        "A device that connects computers",
      ],
      answer: 0,
    },
  ],
  "Introduction to SQL Databases": [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Sequential Query Language",
        "Simple Query Language",
        "Standard Query Language",
      ],
      answer: 0,
    },
    {
      question: "What is the primary purpose of SQL?",
      options: [
        "To create graphical user interfaces",
        "To manage and manipulate relational databases",
        "To enhance website security",
        "To design software applications",
      ],
      answer: 1,
    },
    {
      question:
        "Which of the following is a SQL command used to retrieve data?",
      options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      answer: 0,
    },
    {
      question: "What is a primary key in a database table?",
      options: [
        "A unique identifier for each record in the table",
        "A key that encrypts data",
        "A key that links two tables together",
        "A type of database index",
      ],
      answer: 0,
    },
    {
      question: "What does the 'JOIN' operation do in SQL?",
      options: [
        "Combines rows from two or more tables based on a related column",
        "Inserts data into a table",
        "Updates existing records in a table",
        "Deletes records from a table",
      ],
      answer: 0,
    },
  ],
  "Advanced Python Programming": [
    {
      question: "What is a generator in Python?",
      options: [
        "A type of function that returns an iterator",
        "A method to generate random numbers",
        "A built-in function to create lists",
        "A way to manage memory",
      ],
      answer: 0,
    },
    {
      question:
        "Which of the following keywords is used to define a decorator in Python?",
      options: ["def", "lambda", "decorator", "@"],
      answer: 3,
    },
    {
      question: "What is the purpose of the 'with' statement in Python?",
      options: [
        "To create a new thread",
        "To simplify exception handling",
        "To manage resources efficiently",
        "To define a new function",
      ],
      answer: 2,
    },
    {
      question: "What does the 'self' parameter in a class method refer to?",
      options: [
        "The instance of the class",
        "The class itself",
        "A local variable",
        "A global variable",
      ],
      answer: 0,
    },
    {
      question:
        "Which of the following is a correct way to handle exceptions in Python?",
      options: [
        "try...except",
        "catch...finally",
        "except...throw",
        "try...throw",
      ],
      answer: 0,
    },
  ],
  "Natural Language Processing (NLP)": [
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Language Processing",
        "Neural Language Processing",
        "Natural Linguistic Programming",
        "Neural Linguistic Processing",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is a common task in NLP?",
      options: [
        "Image recognition",
        "Sentiment analysis",
        "Data encryption",
        "Voice modulation",
      ],
      answer: 1,
    },
    {
      question: "What is tokenization in NLP?",
      options: [
        "The process of converting text into numerical format",
        "Splitting text into smaller units, like words or phrases",
        "Identifying the sentiment of a text",
        "Translating text from one language to another",
      ],
      answer: 1,
    },
    {
      question:
        "Which algorithm is commonly used for text classification in NLP?",
      options: [
        "K-Means Clustering",
        "Linear Regression",
        "Support Vector Machine",
        "Random Forest",
      ],
      answer: 2,
    },
    {
      question: "What is the purpose of stemming in NLP?",
      options: [
        "To convert text into lowercase",
        "To remove stop words",
        "To reduce words to their base or root form",
        "To translate words into another language",
      ],
      answer: 2,
    },
  ],
  "Embedded Systems Programming": [
    {
      question: "What is an embedded system?",
      options: [
        "A standalone computer system designed for general-purpose tasks",
        "A computer system designed to perform specific tasks within a larger system",
        "A system that exclusively runs web applications",
        "A computer system that can be easily modified by users",
      ],
      answer: 1,
    },
    {
      question:
        "Which programming language is commonly used for embedded systems?",
      options: ["Java", "Python", "C", "Ruby"],
      answer: 2,
    },
    {
      question: "What does GPIO stand for in embedded systems?",
      options: [
        "General Purpose Input Output",
        "Global Peripheral Interface Operation",
        "General Processor Input Output",
        "Graphical Programming Input Output",
      ],
      answer: 0,
    },
    {
      question: "What is the primary function of a microcontroller?",
      options: [
        "To execute complex mathematical computations",
        "To interface with peripheral devices",
        "To process and control embedded systems tasks",
        "To provide a user interface for applications",
      ],
      answer: 2,
    },
    {
      question:
        "Which of the following is a common real-time operating system (RTOS) used in embedded systems?",
      options: ["Windows", "Linux", "FreeRTOS", "MacOS"],
      answer: 2,
    },
  ],
  "Introduction to VLSI Design": [
    {
      question: "What does VLSI stand for?",
      options: [
        "Very Large Scale Integration",
        "Variable Logic System Integration",
        "Visual Linear System Integration",
        "Vector Logic Scale Integration",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is a primary goal of VLSI design?",
      options: [
        "Increasing component size",
        "Decreasing power consumption",
        "Simplifying circuit complexity",
        "Minimizing the number of transistors",
      ],
      answer: 1,
    },
    {
      question: "What is the function of a layout in VLSI design?",
      options: [
        "To describe the behavior of the circuit",
        "To show the physical placement of components",
        "To simulate circuit operations",
        "To test the electrical performance of the design",
      ],
      answer: 1,
    },
    {
      question:
        "Which technology is commonly used for fabricating VLSI circuits?",
      options: [
        "Wire bonding",
        "Surface-mount technology (SMT)",
        "Photolithography",
        "3D printing",
      ],
      answer: 2,
    },
    {
      question: "What does ASIC stand for in the context of VLSI design?",
      options: [
        "Application-Specific Integrated Circuit",
        "Analog Signal Integration Circuit",
        "Automated System Interconnection Circuit",
        "Adaptive Signal Integrated Circuit",
      ],
      answer: 0,
    },
  ],
  "Real-Time Operating Systems (RTOS)": [
    {
      question:
        "What is the primary characteristic of a real-time operating system?",
      options: [
        "It can run multiple applications simultaneously.",
        "It guarantees response times within specified constraints.",
        "It prioritizes user interface design.",
        "It is optimized for power consumption.",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is a type of real-time system?",
      options: [
        "Hard real-time system",
        "Soft real-time system",
        "Firm real-time system",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "What is task scheduling in the context of RTOS?",
      options: [
        "Managing memory allocation",
        "Determining the order and timing of task execution",
        "Controlling device drivers",
        "Handling user inputs",
      ],
      answer: 1,
    },
    {
      question:
        "Which of the following scheduling algorithms is commonly used in RTOS?",
      options: [
        "Round Robin",
        "First-Come, First-Served",
        "Rate Monotonic Scheduling",
        "Shortest Job Next",
      ],
      answer: 2,
    },
    {
      question:
        "What is the role of interrupts in a real-time operating system?",
      options: [
        "To pause the system during high load",
        "To allow the CPU to handle events that require immediate attention",
        "To manage power consumption",
        "To enhance user interface responsiveness",
      ],
      answer: 1,
    },
  ],
  "Signal Processing Basics": [
    {
      question: "What is the primary goal of signal processing?",
      options: [
        "To enhance signal quality and extract useful information",
        "To generate random signals",
        "To transmit signals over long distances",
        "To visualize data in graphical form",
      ],
      answer: 0,
    },
    {
      question:
        "Which of the following is a common technique used in signal processing?",
      options: [
        "Fourier Transform",
        "Data Compression",
        "Filtering",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "What is the purpose of filtering in signal processing?",
      options: [
        "To remove unwanted components from a signal",
        "To amplify the signal",
        "To convert signals from analog to digital",
        "To encode signals for transmission",
      ],
      answer: 0,
    },
    {
      question: "What is the Nyquist theorem related to?",
      options: [
        "The maximum data transfer rate of a communication channel",
        "The minimum sampling rate required to avoid aliasing",
        "The efficiency of data compression algorithms",
        "The speed of signal propagation in different media",
      ],
      answer: 1,
    },
    {
      question: "Which type of signal is continuous in time and amplitude?",
      options: [
        "Digital Signal",
        "Analog Signal",
        "Discrete Signal",
        "Sampled Signal",
      ],
      answer: 1,
    },
  ],
  "Electric Vehicle Technology": [
    {
      question:
        "What is the primary component that powers an electric vehicle?",
      options: [
        "Internal combustion engine",
        "Battery pack",
        "Fuel cell",
        "Solar panels",
      ],
      answer: 1,
    },
    {
      question: "What does EV stand for?",
      options: [
        "Electric Vehicle",
        "Electric Voltage",
        "Energy Vehicle",
        "Electromagnetic Vehicle",
      ],
      answer: 0,
    },
    {
      question:
        "Which of the following is a common type of battery used in electric vehicles?",
      options: [
        "Lead-acid battery",
        "Nickel-cadmium battery",
        "Lithium-ion battery",
        "Alkaline battery",
      ],
      answer: 2,
    },
    {
      question: "What is regenerative braking in electric vehicles?",
      options: [
        "A method of charging the battery while braking",
        "A technique to reduce vehicle weight",
        "A way to improve aerodynamics",
        "A system to enhance acceleration",
      ],
      answer: 0,
    },
    {
      question:
        "What is the main advantage of electric vehicles over traditional vehicles?",
      options: [
        "Lower emissions and reduced environmental impact",
        "Higher fuel efficiency",
        "More storage space",
        "Faster acceleration",
      ],
      answer: 0,
    },
  ],
};

export default questionsData;
