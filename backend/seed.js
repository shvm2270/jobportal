import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Job } from "./models/job.model.js";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedJobs = async () => {
    try {
        // Get or create recruiter user
        let recruiter = await User.findOne({ role: 'recruiter' });
        
        if (!recruiter) {
            console.log('Creating test recruiter account...');
            const hashedPassword = await bcrypt.hash('testpassword123', 10);
            recruiter = await User.create({
                fullname: "Test Recruiter",
                email: "recruiter@test.com",
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: "https://via.placeholder.com/150"
                }
            });
            console.log('✅ Recruiter account created');
        }

        // Get or create company
        let company = await Company.findOne({ userId: recruiter._id });
        
        if (!company) {
            console.log('Creating test company...');
            company = await Company.create({
                name: "Tech Solutions Inc",
                userId: recruiter._id,
                description: "Leading technology solutions provider",
                website: "https://techsolutions.com",
                location: "Bangalore",
                logo: "https://via.placeholder.com/200"
            });
            console.log('✅ Company created');
        }

        const jobsData = [
            {
                title: "Senior Full Stack Developer",
                description: "Looking for experienced full stack developer with React and Node.js expertise",
                requirements: "React, Node.js, MongoDB, Express, REST APIs",
                salary: 1200000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 5,
                position: 3
            },
            {
                title: "Frontend Developer",
                description: "Build responsive web applications using modern frameworks",
                requirements: "React, TypeScript, CSS, HTML, Redux",
                salary: 900000,
                location: "Mumbai",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Backend Developer",
                description: "Develop scalable backend services and APIs",
                requirements: "Node.js, Express, MongoDB, PostgreSQL, Docker",
                salary: 950000,
                location: "Pune",
                jobType: "Full-time",
                experience: 3,
                position: 2
            },
            {
                title: "DevOps Engineer",
                description: "Manage infrastructure, CI/CD pipelines and cloud deployment",
                requirements: "Docker, Kubernetes, AWS, Jenkins, Linux",
                salary: 1100000,
                location: "Delhi",
                jobType: "Full-time",
                experience: 4,
                position: 1
            },
            {
                title: "Mobile App Developer",
                description: "Develop cross-platform mobile applications",
                requirements: "React Native, JavaScript, Firebase, REST APIs",
                salary: 850000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Data Science Engineer",
                description: "Build ML models and data pipelines",
                requirements: "Python, Machine Learning, SQL, TensorFlow, Pandas",
                salary: 1300000,
                location: "Hyderabad",
                jobType: "Full-time",
                experience: 3,
                position: 1
            },
            {
                title: "QA Automation Engineer",
                description: "Automate testing and ensure product quality",
                requirements: "Selenium, Java, Python, TestNG, Git",
                salary: 700000,
                location: "Noida",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Cloud Architect",
                description: "Design cloud infrastructure and solutions",
                requirements: "AWS, Azure, Cloud Architecture, Linux, Networking",
                salary: 1500000,
                location: "Mumbai",
                jobType: "Full-time",
                experience: 6,
                position: 1
            },
            {
                title: "UI/UX Designer",
                description: "Create beautiful and intuitive user interfaces",
                requirements: "Figma, Sketch, Adobe XD, Prototyping, User Research",
                salary: 750000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Database Administrator",
                description: "Manage and optimize databases",
                requirements: "PostgreSQL, MongoDB, MySQL, Database Design, Optimization",
                salary: 900000,
                location: "Chennai",
                jobType: "Full-time",
                experience: 3,
                position: 1
            },
            {
                title: "Security Engineer",
                description: "Ensure application and infrastructure security",
                requirements: "Cybersecurity, Linux, Penetration Testing, SSL/TLS, OWASP",
                salary: 1250000,
                location: "Delhi",
                jobType: "Full-time",
                experience: 4,
                position: 1
            },
            {
                title: "Machine Learning Engineer",
                description: "Develop ML solutions for real-world problems",
                requirements: "Python, TensorFlow, PyTorch, ML Algorithms, Data Science",
                salary: 1400000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 3,
                position: 2
            },
            {
                title: "Java Developer",
                description: "Build enterprise Java applications",
                requirements: "Java, Spring Boot, Microservices, Maven, Git",
                salary: 950000,
                location: "Pune",
                jobType: "Full-time",
                experience: 3,
                position: 2
            },
            {
                title: "Python Developer",
                description: "Develop Python-based applications and scripts",
                requirements: "Python, Django, Flask, REST APIs, PostgreSQL",
                salary: 850000,
                location: "Hyderabad",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Angular Developer",
                description: "Build enterprise web applications with Angular",
                requirements: "Angular, TypeScript, RxJS, Material Design, REST APIs",
                salary: 900000,
                location: "Gurgaon",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Product Manager",
                description: "Drive product strategy and roadmap",
                requirements: "Product Strategy, Data Analysis, Communication, Agile",
                salary: 1200000,
                location: "Mumbai",
                jobType: "Full-time",
                experience: 4,
                position: 1
            },
            {
                title: "Solutions Architect",
                description: "Design technical solutions for client requirements",
                requirements: "System Design, AWS, Architecture, Communication, SDLC",
                salary: 1350000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 5,
                position: 1
            },
            {
                title: "API Developer",
                description: "Design and develop RESTful APIs",
                requirements: "REST APIs, Node.js, Express, MongoDB, API Documentation",
                salary: 450000,
                location: "Chennai",
                jobType: "Full-time",
                experience: 2,
                position: 2
            },
            {
                title: "Blockchain Developer",
                description: "Develop blockchain and smart contract solutions",
                requirements: "Solidity, Ethereum, Web3.js, Smart Contracts, Cryptocurrency",
                salary: 1600000,
                location: "Bangalore",
                jobType: "Full-time",
                experience: 2,
                position: 1
            },
            {
                title: "Technical Lead",
                description: "Lead engineering team and drive technical excellence",
                requirements: "Leadership, System Design, Code Review, Mentoring, Architecture",
                salary: 1400000,
                location: "Pune",
                jobType: "Full-time",
                experience: 6,
                position: 1
            }
        ];

        // Clear existing jobs for this company
        await Job.deleteMany({ company: company._id });

        // Create jobs
        const createdJobs = await Job.insertMany(
            jobsData.map(job => ({
                ...job,
                experienceLevel: job.experience,
                requirements: job.requirements.split(", "),
                company: company._id,
                created_by: recruiter._id
            }))
        );

        console.log(`✅ Successfully created ${createdJobs.length} jobs!`);
        console.log('\nJobs created:');
        createdJobs.forEach((job, index) => {
            console.log(`${index + 1}. ${job.title} - ${job.location} (₹${job.salary})`);
        });

    } catch (error) {
        console.error('Error seeding jobs:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

connectDB().then(() => seedJobs());
