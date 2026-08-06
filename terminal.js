/* ============================================
   TERMINAL.JS - Terminal Commands & AI Assistant
   ============================================ */

const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const chatMessages = document.getElementById('chatMessages');

// Terminal Commands Database
const commands = {
    help: {
        description: 'Display all available commands',
        execute: () => {
            return `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
about      - Information about Priyadharshini S
skills     - Display technical skills
projects   - List all projects
testing    - Automation testing expertise
resume     - Show resume and qualifications
contact    - Display contact information
github     - GitHub profile information
clear      - Clear terminal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
        }
    },

    about: {
        description: 'Information about Priyadharshini S',
        execute: () => {
            return `
PRIYADHARSHINI S
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role: Computer Science Engineering Graduate
Focus: Automation Testing & Backend Development
Location: Chennai, Tamil Nadu, India

Education:
  • B.E Computer Science Engineering (2022-2026)
  • K Ramakrishnan College of Engineering
  • CGPA: 7.98/10

Passion:
  • Quality Assurance & Test Automation
  • Python Backend Development
  • Problem Solving & Continuous Learning

Status: Open to Full-Time Opportunities ✓`;
        }
    },

    skills: {
        description: 'Display technical skills',
        execute: () => {
            return `
TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:
  ✓ HTML5 (95%) | CSS3 (90%) | JavaScript (85%)

Backend:
  ✓ Python (92%) | Java (80%)

Database:
  ✓ SQL (88%) | MySQL (87%) | PostgreSQL

Testing:
  ✓ Selenium WebDriver (94%)
  ✓ TestNG (90%)
  ✓ Maven (85%)
  ✓ JUnit (83%)
  ✓ Data-Driven Testing

Tools:
  ✓ Git/GitHub | VS Code | IntelliJ IDEA
  ✓ Jenkins (Basics) | Extent Reports

Soft Skills:
  ✓ Communication | Adaptability | Creativity
  ✓ Time Management | Team Collaboration`;
        }
    },

    projects: {
        description: 'List all projects',
        execute: () => {
            return `
PORTFOLIO PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Finance Tracking Application
   Stack: Python, Flask, MySQL
   Features: Expense tracking, Budget management, Reports
   
2. Personal Portfolio Website
   Stack: HTML, CSS, JavaScript
   Features: Responsive design, Animations, GitHub deployment
   
3. Amazon Automation Testing Framework
   Stack: Selenium, TestNG, Maven
   Features: Data-driven testing, Screenshot capture, Reports
   
Use 'projects' command for more details.`;
        }
    },

    testing: {
        description: 'Automation testing expertise',
        execute: () => {
            return `
AUTOMATION TESTING EXPERTISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework: Selenium WebDriver
Test Management: TestNG
Build Tool: Maven
Reporting: Extent Reports
Integration: Excel Data-Driven Framework

Key Competencies:
  ✓ UI Automation
  ✓ Data-Driven Testing
  ✓ Page Object Model
  ✓ Test Case Creation & Execution
  ✓ Defect Logging & Reporting
  ✓ Cross-Browser Testing
  ✓ Screenshot & Video Capture

Current Project: Amazon Product Automation Framework
Test Coverage: 156+ test cases | 94% pass rate`;
        }
    },

    resume: {
        description: 'Show resume and qualifications',
        execute: () => {
            return `
RESUME SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION
  B.E Computer Science Engineering (KRCET)
  CGPA: 7.98/10 | 2022-2026
  
  12th: 85% | 10th: 74.4%

INTERNSHIP
  Python Backend Development
  Mallow Technologies | 6 Months
  • Backend service development
  • Database integration
  • API development
  • Code review participation

CERTIFICATIONS
  ✓ AWS Cloud Practitioner
  ✓ NPTEL IoT
  ✓ Project Management Foundations
  
LANGUAGES
  • English (Fluent)
  • Tamil (Native)`;
        }
    },

    github: {
        description: 'GitHub profile information',
        execute: () => {
            return `
GITHUB PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Username: priyadharshini-s
Profile: github.com/priyadharshini-s

Statistics:
  📊 20+ Repositories
  ⭐ 100+ Stars
  🔀 50+ Forks
  📈 150+ Contributions

Languages:
  • Python
  • Java
  • JavaScript
  • HTML/CSS
  • SQL

Featured Projects:
  • Finance Tracker
  • Automation Testing Framework
  • Portfolio Website
  • Python Backend Projects
  • Web Development Projects`;
        }
    },

    contact: {
        description: 'Display contact information',
        execute: () => {
            return `
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: priyadharshini@email.com
Phone: +91 98765 43210
Location: Chennai, Tamil Nadu, India

Social Links:
  🔗 GitHub: github.com/priyadharshini-s
  💼 LinkedIn: linkedin.com/in/priyadharshini-s
  
Status: ✅ Available for Full-Time Opportunities
        ✅ Open to Freelance Projects
        ✅ Interested in Collaborations`;
        }
    },

    clear: {
        description: 'Clear terminal',
        execute: () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    }
};

// AI Assistant Responses
const aiResponses = {
    'tell me about her projects': `Priyadharshini has built 3 main projects:

1. **Finance Tracking Application**: A comprehensive financial management app with expense tracking, income management, budget planning, and financial reports. Built with Python, Flask, and MySQL.

2. **Personal Portfolio Website**: A modern, responsive portfolio with premium UI/UX design, smooth animations, and form validation. Created with HTML, CSS, and JavaScript.

3. **Amazon Automation Testing Framework**: A robust Selenium automation framework for Amazon with data-driven testing, screenshot capture, and TestNG reports. Built with Java, Selenium, and Maven.

All projects showcase her full-stack capabilities!`,

    'show her technical skills': `Priyadharshini is proficient in:

🖥️ **Frontend**: HTML (95%), CSS (90%), JavaScript (85%)
🐍 **Backend**: Python (92%), Java (80%)
💾 **Database**: SQL (88%), MySQL (87%), PostgreSQL
🧪 **Testing**: Selenium (94%), TestNG (90%), Maven (85%)
🔧 **Tools**: Git, GitHub, VS Code, IntelliJ IDEA, Jenkins

She has a strong foundation across the full stack with specialization in test automation!`,

    'show certifications': `Priyadharshini has completed:

✅ AWS Cloud Practitioner
✅ NPTEL IoT Specialization
✅ Project Management Foundations

And is pursuing:
📚 Selenium Certification
📚 Java Professional Certification
📚 AWS Associate Certification
📚 ISTQB Foundation Certification

She's committed to continuous professional development!`,

    'tell me about internship': `Priyadharshini completed a 6-month internship at **Mallow Technologies** as a Python Backend Development Intern.

Key Responsibilities:
• Developed and maintained Python backend services
• Integrated databases and optimized queries
• Developed RESTful APIs
• Debugged and fixed production issues
• Participated in code reviews

This hands-on experience gave her practical knowledge in backend development and professional development practices.`,

    'automation testing expertise': `Priyadharshini specializes in:

🎯 **Framework**: Selenium WebDriver
📋 **Test Management**: TestNG
🔨 **Build Tool**: Maven
📊 **Reporting**: Extent Reports
📁 **Data Management**: Excel Integration

Competencies:
✓ UI Automation
✓ Data-Driven Testing
✓ Page Object Model Design
✓ Cross-Browser Testing
✓ Defect Logging & Reporting
✓ Test Case Creation & Execution

Current Project: Amazon Product Automation Framework with 156+ test cases and 94% pass rate!`,

    'contact information': `You can reach Priyadharshini at:

📧 Email: priyadharshini@email.com
📱 Phone: +91 98765 43210
📍 Location: Chennai, Tamil Nadu, India

Connect with her on:
🐙 GitHub: github.com/priyadharshini-s
💼 LinkedIn: linkedin.com/in/priyadharshini-s

She's currently available for full-time opportunities and open to collaborations!`
};

// Terminal Input Handler
if (terminalInput) {
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            // Display user input
            addTerminalLine(`portfolio@ps:~$ ${command}`, 'info');

            // Process command
            if (command === '') {
                return;
            }

            if (commands[command]) {
                const output = commands[command].execute();
                if (output) {
                    addTerminalLine(output, 'success');
                }
            } else {
                addTerminalLine(`Command not found: '${command}'. Type 'help' for available commands.`, 'error');
            }

            // Auto-scroll to bottom
            setTimeout(() => {
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 100);
        }
    });
}

function addTerminalLine(text, type = 'info') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="output-${type}">${escapeHtml(text)}</span>`;
    terminalOutput.appendChild(line);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// AI Assistant
function askQuestion(question) {
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message message-user';
    userMessage.innerHTML = `<div class="message-content"><strong>You:</strong> ${question}</div>`;
    chatMessages.appendChild(userMessage);

    // Get response
    const response = aiResponses[question.toLowerCase()] || 
        `I can help you learn about Priyadharshini's skills, projects, experience, and more. Try asking about her projects, technical skills, certifications, or internship experience!`;

    // Simulate typing effect
    setTimeout(() => {
        const assistantMessage = document.createElement('div');
        assistantMessage.className = 'chat-message';
        assistantMessage.innerHTML = `<div class="message-content"><strong>Assistant:</strong> ${response}</div>`;
        chatMessages.appendChild(assistantMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);

    // Auto scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Make askQuestion globally accessible
window.askQuestion = askQuestion;

// Welcome message on load
document.addEventListener('DOMContentLoaded', () => {
    const welcomeLines = [
        { text: '> Welcome to Priyadharshini\'s Portfolio Terminal', type: 'info' },
        { text: '> Type "help" to see available commands', type: 'info' },
        { text: '> Connected to: github.com/priyadharshini-s', type: 'success' }
    ];

    welcomeLines.forEach((line, index) => {
        setTimeout(() => {
            addTerminalLine(line.text, line.type);
        }, index * 300);
    });
});