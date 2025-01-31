import cse_image from "./../assets/cse_image.png";
import it_image from "./../assets/it_image.png";
import aids_image from "./../assets/aids_image.png";
import aiml_image from "./../assets/aiml_image.png";
import ece_image from "./../assets/ece_image.png";
import eee_image from "./../assets/eee_image.png";
import mech_image from "./../assets/mech_image.png";
import civil_image from "./../assets/civil_image.png";
import csbs_image from "./../assets/csbs_image.png";

const image = {
  cse: cse_image,
  it: it_image,
  aids: aids_image,
  aiml: aiml_image,
  ece: ece_image,
  eee: eee_image,
  mech: mech_image,
  civil: civil_image,
  csbs: csbs_image,
};

export default image;

export const studentsData = {
  CSE: [
    { rollNo: "CSE001", name: "John Smith", year: "4th Year", cgpa: "9.2" },
    { rollNo: "CSE002", name: "Emma Wilson", year: "4th Year", cgpa: "8.9" },
    { rollNo: "CSE003", name: "Michael Brown", year: "3rd Year", cgpa: "8.7" },
    { rollNo: "CSE004", name: "Sarah Davis", year: "3rd Year", cgpa: "9.1" },
    { rollNo: "CSE005", name: "James Johnson", year: "2nd Year", cgpa: "8.5" },
    { rollNo: "CSE006", name: "Sophia White", year: "2nd Year", cgpa: "8.8" },
    {
      rollNo: "CSE007",
      name: "Daniel Martinez",
      year: "4th Year",
      cgpa: "9.3",
    },
    { rollNo: "CSE008", name: "Olivia Lopez", year: "3rd Year", cgpa: "9.0" },
    { rollNo: "CSE009", name: "Liam Gonzalez", year: "2nd Year", cgpa: "8.6" },
    {
      rollNo: "CSE010",
      name: "Charlotte Hernandez",
      year: "1st Year",
      cgpa: "9.4",
    },
    {
      rollNo: "CSE011",
      name: "Benjamin Carter",
      year: "4th Year",
      cgpa: "8.7",
    },
    { rollNo: "CSE012", name: "Ava Robinson", year: "3rd Year", cgpa: "9.2" },
    { rollNo: "CSE013", name: "Ethan Walker", year: "2nd Year", cgpa: "8.4" },
    { rollNo: "CSE014", name: "Mia Lewis", year: "1st Year", cgpa: "9.1" },
    { rollNo: "CSE015", name: "Noah Scott", year: "4th Year", cgpa: "9.0" },
    { rollNo: "CSE016", name: "Isabella King", year: "3rd Year", cgpa: "8.9" },
    { rollNo: "CSE017", name: "Mason Wright", year: "2nd Year", cgpa: "8.3" },
    { rollNo: "CSE018", name: "Harper Hall", year: "1st Year", cgpa: "9.5" },
    { rollNo: "CSE019", name: "Elijah Young", year: "3rd Year", cgpa: "8.6" },
    { rollNo: "CSE020", name: "Amelia Allen", year: "1st Year", cgpa: "9.2" },
  ],
  IT: [
    { rollNo: "IT001", name: "Mason Allen", year: "4th Year", cgpa: "9.1" },
    { rollNo: "IT002", name: "Ella Young", year: "3rd Year", cgpa: "8.7" },
    { rollNo: "IT003", name: "Henry Harris", year: "3rd Year", cgpa: "8.9" },
    { rollNo: "IT004", name: "Ava Clark", year: "2nd Year", cgpa: "9.0" },
    { rollNo: "IT005", name: "Benjamin Lewis", year: "2nd Year", cgpa: "8.8" },
    { rollNo: "IT006", name: "Ethan Walker", year: "4th Year", cgpa: "8.6" },
    { rollNo: "IT007", name: "Sophie Hall", year: "3rd Year", cgpa: "9.2" },
    { rollNo: "IT008", name: "Lucas Robinson", year: "2nd Year", cgpa: "9.3" },
  ],
  ECE: [
    { rollNo: "ECE001", name: "David Miller", year: "4th Year", cgpa: "8.8" },
    { rollNo: "ECE002", name: "Lisa Anderson", year: "4th Year", cgpa: "9.3" },
    { rollNo: "ECE003", name: "Robert Taylor", year: "3rd Year", cgpa: "8.6" },
    { rollNo: "ECE004", name: "Jennifer White", year: "2nd Year", cgpa: "9.0" },
    { rollNo: "ECE005", name: "Kevin Carter", year: "2nd Year", cgpa: "8.7" },
    { rollNo: "ECE006", name: "Lily Adams", year: "3rd Year", cgpa: "9.1" },
    { rollNo: "ECE007", name: "Jacob Nelson", year: "1st Year", cgpa: "8.9" },
    { rollNo: "ECE008", name: "Mia Wright", year: "1st Year", cgpa: "9.2" },
  ],
  EEE: [
    { rollNo: "EEE001", name: "Andrew Scott", year: "4th Year", cgpa: "8.9" },
    { rollNo: "EEE002", name: "Isabella Baker", year: "3rd Year", cgpa: "9.1" },
    { rollNo: "EEE003", name: "Matthew Green", year: "3rd Year", cgpa: "8.7" },
    { rollNo: "EEE004", name: "Ava Phillips", year: "2nd Year", cgpa: "9.0" },
    { rollNo: "EEE005", name: "Noah Cooper", year: "2nd Year", cgpa: "8.6" },
    { rollNo: "EEE006", name: "Liam Parker", year: "3rd Year", cgpa: "9.4" },
  ],
  AIDS: [
    {
      rollNo: "AIDS001",
      name: "Olivia Sanchez",
      year: "4th Year",
      cgpa: "8.5",
    },
    { rollNo: "AIDS002", name: "William Brown", year: "3rd Year", cgpa: "9.0" },
    { rollNo: "AIDS003", name: "Sophia Garcia", year: "3rd Year", cgpa: "8.8" },
    { rollNo: "AIDS004", name: "Daniel Lopez", year: "2nd Year", cgpa: "9.3" },
    {
      rollNo: "AIDS005",
      name: "Emma Rodriguez",
      year: "2nd Year",
      cgpa: "8.7",
    },
  ],
  AIML: [
    { rollNo: "AIML001", name: "Lucas Hall", year: "4th Year", cgpa: "9.2" },
    { rollNo: "AIML002", name: "Mia Scott", year: "3rd Year", cgpa: "8.9" },
    { rollNo: "AIML003", name: "Henry King", year: "3rd Year", cgpa: "9.0" },
    {
      rollNo: "AIML004",
      name: "Evelyn Mitchell",
      year: "2nd Year",
      cgpa: "8.8",
    },
    { rollNo: "AIML005", name: "Oliver Walker", year: "1st Year", cgpa: "9.1" },
  ],
  MECH: [
    { rollNo: "MECH001", name: "Thomas Clark", year: "4th Year", cgpa: "8.7" },
    { rollNo: "MECH002", name: "Emily Harris", year: "3rd Year", cgpa: "9.1" },
    { rollNo: "MECH003", name: "Daniel Lee", year: "3rd Year", cgpa: "8.9" },
    {
      rollNo: "MECH004",
      name: "Jessica Martin",
      year: "2nd Year",
      cgpa: "8.8",
    },
    { rollNo: "MECH005", name: "Ryan Turner", year: "2nd Year", cgpa: "9.0" },
  ],
  CIVIL: [
    {
      rollNo: "CIVIL001",
      name: "William Turner",
      year: "4th Year",
      cgpa: "8.6",
    },
    { rollNo: "CIVIL002", name: "Olivia Moore", year: "4th Year", cgpa: "9.2" },
    {
      rollNo: "CIVIL003",
      name: "Christopher King",
      year: "3rd Year",
      cgpa: "8.8",
    },
    {
      rollNo: "CIVIL004",
      name: "Sophia Wright",
      year: "2nd Year",
      cgpa: "9.0",
    },
    { rollNo: "CIVIL005", name: "Elijah Hall", year: "2nd Year", cgpa: "8.9" },
  ],
};

export const departmentsData = [
  {
    id: 1,
    name: "Computer Science and Engineering",
    code: "CSE",
    description:
      "Study of computer systems, software development, and advanced computing concepts.",
    image: cse_image,
    students: "240+ Students",
    facultyCount: "25+ Faculty",
    pin: "1234",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "CS101", name: "Programming Fundamentals", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "CS102", name: "Programming Lab", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "CS103", name: "Object Oriented Programming", credits: 4 },
          { code: "EE101", name: "Basic Electrical Engineering", credits: 4 },
          { code: "CS104", name: "Digital Logic Design", credits: 4 },
          { code: "CS105", name: "OOP Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "CS201", name: "Data Structures", credits: 4 },
          { code: "CS202", name: "Computer Organization", credits: 4 },
          { code: "CS203", name: "Discrete Mathematics", credits: 4 },
          { code: "CS204", name: "Database Management Systems", credits: 4 },
          {
            code: "CS205",
            name: "Design and Analysis of Algorithms",
            credits: 4,
          },
          { code: "CS206", name: "Data Structures Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "CS207", name: "Operating Systems", credits: 4 },
          { code: "CS208", name: "Computer Networks", credits: 4 },
          { code: "CS209", name: "Software Engineering", credits: 4 },
          { code: "CS210", name: "Theory of Computation", credits: 4 },
          { code: "CS211", name: "Web Technologies", credits: 4 },
          { code: "CS212", name: "OS & Networks Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "CS301", name: "Compiler Design", credits: 4 },
          { code: "CS302", name: "Artificial Intelligence", credits: 4 },
          { code: "CS303", name: "Machine Learning", credits: 4 },
          { code: "CS304", name: "Cloud Computing", credits: 4 },
          { code: "CS305", name: "Information Security", credits: 4 },
          { code: "CS306", name: "ML Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "CS307", name: "Big Data Analytics", credits: 4 },
          { code: "CS308", name: "Internet of Things", credits: 4 },
          { code: "CS309", name: "Mobile Computing", credits: 4 },
          { code: "CS310", name: "Distributed Systems", credits: 4 },
          { code: "CS311", name: "Software Testing", credits: 4 },
          { code: "CS312", name: "Project Phase I", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "CS401", name: "Deep Learning", credits: 4 },
          { code: "CS402", name: "Blockchain Technology", credits: 4 },
          { code: "CS403", name: "Natural Language Processing", credits: 4 },
          { code: "CS404", name: "Cryptography", credits: 4 },
          { code: "CS405", name: "Project Phase II", credits: 4 },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "CS406", name: "Project Phase III", credits: 8 },
          { code: "CS407", name: "Industrial Training", credits: 4 },
          { code: "CS408", name: "Professional Ethics", credits: 4 },
          { code: "CS409", name: "Technical Seminar", credits: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Information Technology",
    code: "IT",
    pin: "1234",
    description:
      "Focus on information systems, data management, and network technologies.",
    image: it_image,
    students: "180+ Students",
    facultyCount: "20+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "IT101", name: "Introduction to IT", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "IT102", name: "IT Workshop", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "IT103", name: "Data Structures", credits: 4 },
          { code: "IT104", name: "Digital Systems", credits: 4 },
          { code: "IT105", name: "Web Programming", credits: 4 },
          { code: "IT106", name: "DS Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "IT201", name: "Database Management", credits: 4 },
          { code: "IT202", name: "Operating Systems", credits: 4 },
          { code: "IT203", name: "Computer Networks", credits: 4 },
          { code: "IT204", name: "Software Engineering", credits: 4 },
          { code: "IT205", name: "Internet Programming", credits: 4 },
          { code: "IT206", name: "DBMS Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "IT207", name: "Information Security", credits: 4 },
          { code: "IT208", name: "Cloud Computing", credits: 4 },
          { code: "IT209", name: "Mobile Applications", credits: 4 },
          { code: "IT210", name: "Data Analytics", credits: 4 },
          { code: "IT211", name: "System Administration", credits: 4 },
          { code: "IT212", name: "Security Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "IT301", name: "Artificial Intelligence", credits: 4 },
          { code: "IT302", name: "IoT Systems", credits: 4 },
          { code: "IT303", name: "Enterprise Computing", credits: 4 },
          { code: "IT304", name: "Data Mining", credits: 4 },
          { code: "IT305", name: "Software Testing", credits: 4 },
          { code: "IT306", name: "AI Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "IT307", name: "Machine Learning", credits: 4 },
          { code: "IT308", name: "DevOps", credits: 4 },
          { code: "IT309", name: "Blockchain Technology", credits: 4 },
          { code: "IT310", name: "Natural Language Processing", credits: 4 },
          { code: "IT311", name: "Deep Learning", credits: 4 },
          { code: "IT312", name: "Project Phase I", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "IT401", name: "Big Data Systems", credits: 4 },
          { code: "IT402", name: "Cyber Security", credits: 4 },
          { code: "IT403", name: "Cloud Services", credits: 4 },
          { code: "IT404", name: "IT Management", credits: 4 },
          { code: "IT405", name: "Project Phase II", credits: 4 },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "IT406", name: "Project Phase III", credits: 8 },
          { code: "IT407", name: "Industrial Internship", credits: 4 },
          { code: "IT408", name: "Professional Ethics", credits: 4 },
          { code: "IT409", name: "Technical Seminar", credits: 4 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Artificial Intelligence and Data Science",
    code: "AIDS",
    pin: "1234",
    description:
      "Cutting-edge study of AI, machine learning, and data analytics applications.",
    image: aids_image,
    students: "120+ Students",
    facultyCount: "15+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "AI101", name: "Introduction to AI", credits: 4 },
          { code: "CS101", name: "Programming Fundamentals", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "AI102", name: "Python Programming Lab", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "CS102", name: "Data Structures & Algorithms", credits: 4 },
          { code: "AI103", name: "Machine Learning Basics", credits: 4 },
          { code: "EE101", name: "Basic Electrical Engineering", credits: 4 },
          { code: "CS103", name: "Data Structures Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "MA201", name: "Discrete Mathematics", credits: 4 },
          { code: "AI201", name: "Deep Learning Fundamentals", credits: 4 },
          { code: "CS201", name: "Database Management Systems", credits: 4 },
          { code: "AI202", name: "Computer Vision", credits: 4 },
          { code: "CS202", name: "Operating Systems", credits: 4 },
          { code: "AI203", name: "AI Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Probability & Statistics", credits: 4 },
          { code: "CS203", name: "Computer Networks", credits: 4 },
          { code: "AI204", name: "Natural Language Processing", credits: 4 },
          { code: "CS204", name: "Software Engineering", credits: 4 },
          { code: "AI205", name: "Big Data Analytics", credits: 4 },
          { code: "AI206", name: "AI & ML Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "CS301", name: "Cloud Computing", credits: 4 },
          { code: "AI301", name: "Reinforcement Learning", credits: 4 },
          { code: "AI302", name: "Explainable AI", credits: 4 },
          { code: "CS302", name: "Cyber Security", credits: 4 },
          { code: "AI303", name: "AI Ethics & Governance", credits: 4 },
          { code: "AI304", name: "AI Research Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "AI305", name: "IoT & Edge Computing", credits: 4 },
          { code: "AI306", name: "AI in Healthcare", credits: 4 },
          { code: "AI307", name: "AI for Robotics", credits: 4 },
          { code: "AI308", name: "Generative AI & GANs", credits: 4 },
          { code: "CS303", name: "Blockchain Technology", credits: 4 },
          { code: "AI309", name: "AI Capstone Project", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "AI401", name: "AI & Business Strategy", credits: 4 },
          { code: "CS401", name: "Edge AI & Real-time Processing", credits: 4 },
          { code: "AI402", name: "Quantum Computing Basics", credits: 4 },
          { code: "AI403", name: "AI Model Optimization", credits: 4 },
          {
            code: "AI404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "AI405", name: "AI for Sustainability", credits: 4 },
          { code: "CS402", name: "Autonomous Systems", credits: 4 },
          { code: "AI406", name: "Thesis / Research Project", credits: 8 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "AI and Machine Learning",
    code: "AIML",
    pin: "1234",
    description:
      "Advanced focus on artificial intelligence algorithms and machine learning systems.",
    image: aiml_image,
    students: "120+ Students",
    facultyCount: "15+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "ML101", name: "Introduction to ML", credits: 4 },
          { code: "CS101", name: "Programming Fundamentals", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "ML102", name: "Python for ML Lab", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "CS102", name: "Data Structures & Algorithms", credits: 4 },
          { code: "ML103", name: "Linear Algebra for ML", credits: 4 },
          { code: "EE101", name: "Basic Electrical Engineering", credits: 4 },
          { code: "CS103", name: "Data Structures Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "MA201", name: "Discrete Mathematics", credits: 4 },
          {
            code: "ML201",
            name: "Supervised & Unsupervised Learning",
            credits: 4,
          },
          { code: "CS201", name: "Database Management Systems", credits: 4 },
          { code: "ML202", name: "Computer Vision", credits: 4 },
          { code: "CS202", name: "Operating Systems", credits: 4 },
          { code: "ML203", name: "Machine Learning Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Probability & Statistics", credits: 4 },
          { code: "CS203", name: "Computer Networks", credits: 4 },
          { code: "ML204", name: "Natural Language Processing", credits: 4 },
          { code: "CS204", name: "Software Engineering", credits: 4 },
          { code: "ML205", name: "Big Data Analytics", credits: 4 },
          { code: "ML206", name: "ML & NLP Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "CS301", name: "Cloud Computing", credits: 4 },
          { code: "ML301", name: "Deep Learning", credits: 4 },
          { code: "ML302", name: "Reinforcement Learning", credits: 4 },
          { code: "CS302", name: "Cyber Security", credits: 4 },
          { code: "ML303", name: "AI Ethics & Governance", credits: 4 },
          { code: "ML304", name: "ML Research Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "ML305", name: "IoT & AI Applications", credits: 4 },
          { code: "ML306", name: "AI in Healthcare", credits: 4 },
          { code: "ML307", name: "AI for Robotics", credits: 4 },
          { code: "ML308", name: "Generative AI & GANs", credits: 4 },
          { code: "CS303", name: "Blockchain Technology", credits: 4 },
          { code: "ML309", name: "AI Capstone Project", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "ML401", name: "AI & Business Strategy", credits: 4 },
          { code: "CS401", name: "Edge AI & Real-time Processing", credits: 4 },
          { code: "ML402", name: "Quantum Computing Basics", credits: 4 },
          {
            code: "ML403",
            name: "Model Compression & Optimization",
            credits: 4,
          },
          {
            code: "ML404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "ML405", name: "AI for Sustainability", credits: 4 },
          { code: "CS402", name: "Autonomous Systems", credits: 4 },
          { code: "ML406", name: "Thesis / Research Project", credits: 8 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Electronics and Communication",
    code: "ECE",
    pin: "1234",
    description:
      "Study of electronic systems, communication technologies, and signal processing.",
    image: ece_image,
    students: "180+ Students",
    facultyCount: "22+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "EC101", name: "Basic Electronics", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "EC102", name: "Electronics Lab", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "EC103", name: "Digital Logic Design", credits: 4 },
          { code: "CS101", name: "Programming Fundamentals", credits: 4 },
          { code: "EE101", name: "Electrical Circuits", credits: 4 },
          { code: "EC104", name: "Digital Electronics Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "MA201", name: "Signals and Systems", credits: 4 },
          { code: "EC201", name: "Electronic Devices & Circuits", credits: 4 },
          {
            code: "EC202",
            name: "Microprocessors & Microcontrollers",
            credits: 4,
          },
          { code: "EC203", name: "Analog Communication", credits: 4 },
          { code: "EC204", name: "Electromagnetic Theory", credits: 4 },
          { code: "EC205", name: "Analog & Digital Circuits Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Probability & Random Processes", credits: 4 },
          { code: "EC206", name: "Control Systems", credits: 4 },
          { code: "EC207", name: "Digital Communication", credits: 4 },
          { code: "EC208", name: "Embedded Systems", credits: 4 },
          { code: "CS202", name: "Computer Networks", credits: 4 },
          { code: "EC209", name: "Communication Systems Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "EC301", name: "Wireless Communication", credits: 4 },
          { code: "EC302", name: "VLSI Design", credits: 4 },
          { code: "EC303", name: "Internet of Things (IoT)", credits: 4 },
          { code: "CS301", name: "Artificial Intelligence & ML", credits: 4 },
          { code: "EC304", name: "Biomedical Instrumentation", credits: 4 },
          { code: "EC305", name: "VLSI & IoT Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "EC306", name: "Microwave Engineering", credits: 4 },
          { code: "EC307", name: "Optical Communication", credits: 4 },
          {
            code: "EC308",
            name: "Radar & Satellite Communication",
            credits: 4,
          },
          { code: "CS302", name: "Cyber Security", credits: 4 },
          { code: "EC309", name: "Nanoelectronics", credits: 4 },
          { code: "EC310", name: "Microwave & Optical Lab", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "EC401", name: "5G & Advanced Wireless Systems", credits: 4 },
          { code: "EC402", name: "Robotics & Automation", credits: 4 },
          { code: "EC403", name: "DSP & FPGA Applications", credits: 4 },
          {
            code: "EC404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "EC405", name: "Internet of Everything (IoE)", credits: 4 },
          { code: "EC406", name: "Cognitive Radio Networks", credits: 4 },
          { code: "EC407", name: "Final Year Project / Thesis", credits: 8 },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Electrical and Electronics",
    code: "EEE",
    pin: "1234",
    description:
      "Focus on electrical systems, power electronics, and control engineering.",
    image: eee_image,
    students: "160+ Students",
    facultyCount: "20+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "EE101", name: "Basic Electrical", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "EE102", name: "Electrical Lab", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "EE103", name: "Circuit Theory", credits: 4 },
          { code: "CS101", name: "Programming Fundamentals", credits: 4 },
          { code: "EC101", name: "Electronic Devices", credits: 4 },
          { code: "EE104", name: "Circuit Simulation Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          {
            code: "MA201",
            name: "Transforms & Partial Differential Equations",
            credits: 4,
          },
          { code: "EE201", name: "Electromagnetic Fields", credits: 4 },
          { code: "EE202", name: "Electrical Machines I", credits: 4 },
          { code: "EC201", name: "Digital Electronics", credits: 4 },
          { code: "EE203", name: "Power Systems I", credits: 4 },
          { code: "EE204", name: "Electrical Machines Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Probability & Statistics", credits: 4 },
          { code: "EE205", name: "Control Systems", credits: 4 },
          { code: "EE206", name: "Electrical Machines II", credits: 4 },
          { code: "EE207", name: "Power Electronics", credits: 4 },
          {
            code: "EE208",
            name: "Microcontrollers & Embedded Systems",
            credits: 4,
          },
          { code: "EE209", name: "Power Electronics Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "EE301", name: "Renewable Energy Systems", credits: 4 },
          { code: "EE302", name: "Power Systems II", credits: 4 },
          { code: "EE303", name: "Electrical Drives & Control", credits: 4 },
          {
            code: "EE304",
            name: "Artificial Intelligence for Electrical Systems",
            credits: 4,
          },
          { code: "EE305", name: "Industrial Automation", credits: 4 },
          { code: "EE306", name: "Electrical Systems Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "EE307", name: "High Voltage Engineering", credits: 4 },
          { code: "EE308", name: "Digital Signal Processing", credits: 4 },
          { code: "EE309", name: "Electric Vehicles & Smart Grid", credits: 4 },
          { code: "CS302", name: "Internet of Things (IoT)", credits: 4 },
          { code: "EE310", name: "Smart Grid Technologies", credits: 4 },
          { code: "EE311", name: "DSP & Embedded Systems Lab", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "EE401", name: "Electrical Safety & Standards", credits: 4 },
          { code: "EE402", name: "Industrial Robotics", credits: 4 },
          {
            code: "EE403",
            name: "Machine Learning for Power Systems",
            credits: 4,
          },
          {
            code: "EE404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          { code: "EE405", name: "Energy Management & Auditing", credits: 4 },
          {
            code: "EE406",
            name: "Microgrid & Distributed Energy Systems",
            credits: 4,
          },
          { code: "EE407", name: "Final Year Project / Thesis", credits: 8 },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Mechanical Engineering",
    code: "MECH",
    pin: "1234",
    description:
      "Study of mechanical systems, thermal engineering, and manufacturing processes.",
    image: mech_image,
    students: "200+ Students",
    facultyCount: "24+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "ME102", name: "Manufacturing Processes", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "ME103", name: "Workshop Practice", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          { code: "ME104", name: "Thermodynamics", credits: 4 },
          { code: "ME105", name: "Engineering Drawing", credits: 4 },
          { code: "CS101", name: "Programming for Engineers", credits: 4 },
          { code: "ME106", name: "CAD Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          {
            code: "MA201",
            name: "Differential Equations & Numerical Methods",
            credits: 4,
          },
          { code: "ME201", name: "Fluid Mechanics", credits: 4 },
          { code: "ME202", name: "Strength of Materials", credits: 4 },
          { code: "ME203", name: "Material Science & Metallurgy", credits: 4 },
          { code: "EE201", name: "Basic Electrical & Electronics", credits: 4 },
          { code: "ME204", name: "Material Testing Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Statistics & Probability", credits: 4 },
          { code: "ME205", name: "Kinematics of Machinery", credits: 4 },
          { code: "ME206", name: "Applied Thermodynamics", credits: 4 },
          { code: "ME207", name: "Manufacturing Technology", credits: 4 },
          { code: "ME208", name: "Instrumentation & Control", credits: 4 },
          { code: "ME209", name: "Manufacturing Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          { code: "ME301", name: "Dynamics of Machinery", credits: 4 },
          { code: "ME302", name: "Heat & Mass Transfer", credits: 4 },
          { code: "ME303", name: "Design of Machine Elements", credits: 4 },
          { code: "ME304", name: "Automobile Engineering", credits: 4 },
          { code: "ME305", name: "Robotics & Automation", credits: 4 },
          { code: "ME306", name: "Thermal Engineering Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "ME307", name: "Finite Element Analysis", credits: 4 },
          { code: "ME308", name: "Mechatronics", credits: 4 },
          { code: "ME309", name: "Operations Research", credits: 4 },
          { code: "ME310", name: "Renewable Energy Systems", credits: 4 },
          { code: "ME311", name: "Industrial Engineering", credits: 4 },
          { code: "ME312", name: "Mechatronics Lab", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          {
            code: "ME401",
            name: "Advanced Manufacturing Techniques",
            credits: 4,
          },
          { code: "ME402", name: "Computational Fluid Dynamics", credits: 4 },
          { code: "ME403", name: "Additive Manufacturing", credits: 4 },
          {
            code: "ME404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          {
            code: "ME405",
            name: "Energy Conservation & Management",
            credits: 4,
          },
          {
            code: "ME406",
            name: "Artificial Intelligence in Manufacturing",
            credits: 4,
          },
          { code: "ME407", name: "Final Year Project / Thesis", credits: 8 },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Civil Engineering",
    code: "CIVIL",
    pin: "1234",
    description:
      "Focus on structural engineering, construction, and infrastructure development.",
    image: civil_image,
    students: "160+ Students",
    facultyCount: "18+ Faculty",
    semesters: [
      {
        number: 1,
        subjects: [
          { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
          { code: "PH101", name: "Engineering Physics", credits: 4 },
          { code: "CE101", name: "Engineering Drawing", credits: 4 },
          { code: "ME101", name: "Engineering Mechanics", credits: 4 },
          { code: "EN101", name: "Technical English", credits: 4 },
          { code: "CE102", name: "Civil Workshop", credits: 2 },
        ],
      },
      {
        number: 2,
        subjects: [
          { code: "MA102", name: "Engineering Mathematics II", credits: 4 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4 },
          {
            code: "CE103",
            name: "Building Materials & Construction",
            credits: 4,
          },
          { code: "CE104", name: "Surveying", credits: 4 },
          { code: "CS101", name: "Programming for Engineers", credits: 4 },
          { code: "CE105", name: "Surveying Lab", credits: 2 },
        ],
      },
      {
        number: 3,
        subjects: [
          { code: "MA201", name: "Numerical Methods & Statistics", credits: 4 },
          { code: "CE201", name: "Strength of Materials", credits: 4 },
          { code: "CE202", name: "Fluid Mechanics", credits: 4 },
          { code: "CE203", name: "Geotechnical Engineering", credits: 4 },
          { code: "EE201", name: "Basic Electrical & Electronics", credits: 4 },
          { code: "CE204", name: "Material Testing Lab", credits: 2 },
        ],
      },
      {
        number: 4,
        subjects: [
          { code: "MA202", name: "Structural Analysis", credits: 4 },
          {
            code: "CE205",
            name: "Hydraulics & Water Resources Engineering",
            credits: 4,
          },
          { code: "CE206", name: "Transportation Engineering", credits: 4 },
          { code: "CE207", name: "Concrete Technology", credits: 4 },
          { code: "CE208", name: "Environmental Engineering", credits: 4 },
          { code: "CE209", name: "Hydraulics Lab", credits: 2 },
        ],
      },
      {
        number: 5,
        subjects: [
          {
            code: "CE301",
            name: "Design of Reinforced Concrete Structures",
            credits: 4,
          },
          { code: "CE302", name: "Structural Analysis II", credits: 4 },
          { code: "CE303", name: "Foundation Engineering", credits: 4 },
          { code: "CE304", name: "Construction Management", credits: 4 },
          { code: "CE305", name: "Remote Sensing & GIS", credits: 4 },
          { code: "CE306", name: "Structural Design Lab", credits: 2 },
        ],
      },
      {
        number: 6,
        subjects: [
          { code: "CE307", name: "Design of Steel Structures", credits: 4 },
          { code: "CE308", name: "Earthquake Engineering", credits: 4 },
          { code: "CE309", name: "Pavement Design", credits: 4 },
          {
            code: "CE310",
            name: "Environmental Impact Assessment",
            credits: 4,
          },
          { code: "CE311", name: "Bridge Engineering", credits: 4 },
          { code: "CE312", name: "Construction Materials Lab", credits: 2 },
        ],
      },
      {
        number: 7,
        subjects: [
          { code: "CE401", name: "Advanced Structural Analysis", credits: 4 },
          {
            code: "CE402",
            name: "Pre-stressed Concrete Structures",
            credits: 4,
          },
          { code: "CE403", name: "Urban & Regional Planning", credits: 4 },
          {
            code: "CE404",
            name: "Internship / Industrial Training",
            credits: 2,
          },
        ],
      },
      {
        number: 8,
        subjects: [
          {
            code: "CE405",
            name: "Sustainable Construction Techniques",
            credits: 4,
          },
          { code: "CE406", name: "Smart Infrastructure & IoT", credits: 4 },
          { code: "CE407", name: "Final Year Project / Thesis", credits: 8 },
        ],
      },
    ],
  },
];

export const resourcesData = {
  // Semester 1
  MA101: {
    lectureVideos: [
      {
        title: "Introduction to Programming Concepts",
        duration: "45:30",
        thumbnail: "/thumbnails/cs101/intro.jpg",
        url: "https://example.com/videos/cs101/intro",
      },
      {
        title: "Introduction to Programming Concepts",
        duration: "45:30",
        thumbnail: "/thumbnails/cs101/intro.jpg",
        url: "https://example.com/videos/cs101/intro",
      },
      {
        title: "Introduction to Programming Concepts",
        duration: "45:30",
        thumbnail: "/thumbnails/cs101/intro.jpg",
        url: "https://example.com/videos/cs101/intro",
      },
    ],

    lectureNotes: [
      { title: "Unit 1 - Calculus", url: "/files/MA101/unit1.pdf" },
      { title: "Unit 2 - Linear Algebra", url: "/files/MA101/unit2.pdf" },
      {
        title: "Unit 3 - Differential Equations",
        url: "/files/MA101/unit3.pdf",
      },
      {
        title: "Unit 4 - Probability and Statistics",
        url: "/files/MA101/unit4.pdf",
      },
      { title: "Unit 5 - Numerical Methods", url: "/files/MA101/unit5.pdf" },
    ],
    assignments: [
      {
        title: "Assignment 1 - Integration",
        url: "/files/MA101/assignment1.pdf",
        dueDate: "2025-02-15",
      },
      {
        title: "Assignment 2 - Matrices",
        url: "/files/MA101/assignment2.pdf",
        dueDate: "2025-03-01",
      },
    ],
    referenceBooks: [
      {
        title: "Advanced Engineering Mathematics",
        author: "Erwin Kreyszig",
        edition: "10th Edition",
      },
      {
        title: "Higher Engineering Mathematics",
        author: "B.S. Grewal",
        edition: "44th Edition",
      },
    ],
  },
  CS101: {
    lectureNotes: [
      {
        title: "Unit 1 - Introduction to Programming",
        url: "/files/CS101/intro.pdf",
      },
      { title: "Unit 2 - Control Structures", url: "/files/CS101/control.pdf" },
      {
        title: "Unit 3 - Functions and Arrays",
        url: "/files/CS101/functions.pdf",
      },
      {
        title: "Unit 4 - Object-Oriented Programming",
        url: "/files/CS101/oop.pdf",
      },
      {
        title: "Unit 5 - Data Structures",
        url: "/files/CS101/data_structures.pdf",
      },
    ],
    assignments: [
      {
        title: "Programming Assignment 1",
        url: "/files/CS101/assignment1.pdf",
        dueDate: "2025-02-20",
      },
      {
        title: "Programming Assignment 2",
        url: "/files/CS101/assignment2.pdf",
        dueDate: "2025-03-10",
      },
    ],
    referenceBooks: [
      {
        title: "C Programming Language",
        author: "Brian Kernighan, Dennis Ritchie",
        edition: "2nd Edition",
      },
      {
        title: "Problem Solving and Program Design in C",
        author: "Jeri R. Hanly",
        edition: "8th Edition",
      },
    ],
  },
  PH101: {
    lectureNotes: [
      { title: "Unit 1 - Mechanics", url: "/files/PH101/unit1.pdf" },
      { title: "Unit 2 - Thermodynamics", url: "/files/PH101/unit2.pdf" },
      {
        title: "Unit 3 - Waves and Oscillations",
        url: "/files/PH101/unit3.pdf",
      },
      {
        title: "Unit 4 - Optics and Modern Physics",
        url: "/files/PH101/unit4.pdf",
      },
      { title: "Unit 5 - Electromagnetism", url: "/files/PH101/unit5.pdf" },
    ],
    assignments: [
      {
        title: "Assignment 1 - Newton's Laws",
        url: "/files/PH101/assignment1.pdf",
        dueDate: "2025-02-22",
      },
      {
        title: "Assignment 2 - Heat Transfer",
        url: "/files/PH101/assignment2.pdf",
        dueDate: "2025-03-05",
      },
    ],
    referenceBooks: [
      {
        title: "Fundamentals of Physics",
        author: "David Halliday, Robert Resnick",
        edition: "10th Edition",
      },
      {
        title: "University Physics",
        author: "Hugh D. Young, Roger A. Freedman",
        edition: "14th Edition",
      },
    ],
  },
  ME101: {
    lectureNotes: [
      {
        title: "Unit 1 - Engineering Mechanics",
        url: "/files/ME101/unit1.pdf",
      },
      { title: "Unit 2 - Fluid Mechanics", url: "/files/ME101/unit2.pdf" },
      {
        title: "Unit 3 - Manufacturing Processes",
        url: "/files/ME101/unit3.pdf",
      },
      { title: "Unit 4 - Thermodynamics", url: "/files/ME101/unit4.pdf" },
      { title: "Unit 5 - Machine Design", url: "/files/ME101/unit5.pdf" },
    ],
    assignments: [
      {
        title: "Assignment 1 - Statics and Dynamics",
        url: "/files/ME101/assignment1.pdf",
        dueDate: "2025-02-18",
      },
      {
        title: "Assignment 2 - Thermodynamics",
        url: "/files/ME101/assignment2.pdf",
        dueDate: "2025-03-03",
      },
    ],
    referenceBooks: [
      {
        title: "Engineering Mechanics: Dynamics",
        author: "J.L. Meriam, L.G. Kraige",
        edition: "8th Edition",
      },
      {
        title: "Fluid Mechanics",
        author: "Frank M. White",
        edition: "7th Edition",
      },
    ],
  },
  EN101: {
    lectureNotes: [
      { title: "Unit 1 - Communication Skills", url: "/files/EN101/unit1.pdf" },
      { title: "Unit 2 - Technical Writing", url: "/files/EN101/unit2.pdf" },
      { title: "Unit 3 - Public Speaking", url: "/files/EN101/unit3.pdf" },
      {
        title: "Unit 4 - Business Communication",
        url: "/files/EN101/unit4.pdf",
      },
      { title: "Unit 5 - Report Writing", url: "/files/EN101/unit5.pdf" },
    ],
    assignments: [
      {
        title: "Assignment 1 - Essay Writing",
        url: "/files/EN101/assignment1.pdf",
        dueDate: "2025-02-25",
      },
      {
        title: "Assignment 2 - Report Writing",
        url: "/files/EN101/assignment2.pdf",
        dueDate: "2025-03-08",
      },
    ],
    referenceBooks: [
      {
        title: "Technical Writing for Engineers",
        author: "David F. Beer, David K. Johnston",
        edition: "4th Edition",
      },
      {
        title: "The Elements of Style",
        author: "William Strunk Jr., E.B. White",
        edition: "4th Edition",
      },
    ],
  },
  CS102: {
    lectureNotes: [
      { title: "Unit 1 - Data Structures", url: "/files/CS102/unit1.pdf" },
      { title: "Unit 2 - Algorithms", url: "/files/CS102/unit2.pdf" },
      {
        title: "Unit 3 - Object-Oriented Programming",
        url: "/files/CS102/unit3.pdf",
      },
      {
        title: "Unit 4 - Database Management Systems",
        url: "/files/CS102/unit4.pdf",
      },
      { title: "Unit 5 - Computer Networks", url: "/files/CS102/unit5.pdf" },
    ],
    assignments: [
      {
        title: "Assignment 1 - Linked Lists",
        url: "/files/CS102/assignment1.pdf",
        dueDate: "2025-02-28",
      },
      {
        title: "Assignment 2 - Sorting Algorithms",
        url: "/files/CS102/assignment2.pdf",
        dueDate: "2025-03-12",
      },
    ],
    referenceBooks: [
      {
        title: "Data Structures and Algorithms in C++",
        author: "Adam Drozdek",
        edition: "4th Edition",
      },
      {
        title: "Algorithms",
        author: "Robert Sedgewick, Kevin Wayne",
        edition: "4th Edition",
      },
    ],
  },
};
