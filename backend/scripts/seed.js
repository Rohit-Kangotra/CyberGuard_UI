import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vulnerability from '../models/Vulnerability.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const vulnerabilities = [
    {
        cveId: 'CVE-2024-1001',
        title: 'SQL Injection in Login Portal',
        description: 'A SQL injection vulnerability in the login portal allows attackers to bypass authentication and access sensitive user data.',
        severity: 'Critical',
        status: 'Open',
        affectedSystems: ['Authentication Service', 'User Database'],
        remediation: 'Use parameterized queries and input validation.',
        reportedDate: '2024-01-15'
    },
    {
        cveId: 'CVE-2024-1002',
        title: 'Cross-Site Scripting (XSS) in Comments Section',
        description: 'Stored XSS vulnerability in the comments section allows attackers to inject malicious scripts that execute in other users\' browsers.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['Frontend Web App'],
        remediation: 'Sanitize user input and implement Content Security Policy (CSP).',
        reportedDate: '2024-01-18'
    },
    {
        cveId: 'CVE-2024-1003',
        title: 'Insecure Direct Object Reference (IDOR) in User Profile',
        description: 'An IDOR vulnerability allows users to access other users\' profiles by changing the user ID in the URL.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['User Profile Service'],
        remediation: 'Implement proper access control checks.',
        reportedDate: '2024-01-20'
    },
    {
        cveId: 'CVE-2024-1004',
        title: 'Sensitive Data Exposure in API Response',
        description: 'API endpoint returns excessive data, including user passwords and API keys.',
        severity: 'Medium',
        status: 'Resolved',
        affectedSystems: ['API Gateway'],
        remediation: 'Filter API responses to include only necessary data.',
        reportedDate: '2024-01-22'
    },
    {
        cveId: 'CVE-2024-1005',
        title: 'Weak Password Policy',
        description: 'The application allows users to set weak passwords, making them susceptible to brute-force attacks.',
        severity: 'Medium',
        status: 'Resolved',
        affectedSystems: ['Authentication Service'],
        remediation: 'Enforce strong password complexity requirements.',
        reportedDate: '2024-01-25'
    },
    {
        cveId: 'CVE-2024-1006',
        title: 'Unpatched Server Software',
        description: 'Running an outdated version of Nginx with known vulnerabilities.',
        severity: 'Critical',
        status: 'Open',
        affectedSystems: ['Web Server'],
        remediation: 'Update Nginx to the latest stable version.',
        reportedDate: '2024-01-28'
    },
    {
        cveId: 'CVE-2024-1007',
        title: 'Missing Security Headers',
        description: 'The web application is missing important security headers like X-Frame-Options and X-XSS-Protection.',
        severity: 'Low',
        status: 'Open',
        affectedSystems: ['Web Server'],
        remediation: 'Configure the web server to send appropriate security headers.',
        reportedDate: '2024-01-30'
    },
    {
        cveId: 'CVE-2024-1008',
        title: 'Broken Authentication Session Management',
        description: 'Session tokens are not invalidated after logout, allowing session hijacking.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['Authentication Service'],
        remediation: 'Invalidate session tokens on logout and implement short session timeouts.',
        reportedDate: '2024-02-01'
    },
    {
        cveId: 'CVE-2024-1009',
        title: 'Directory Traversal',
        description: 'Attackers can access arbitrary files on the server by manipulating file paths.',
        severity: 'Critical',
        status: 'Open',
        affectedSystems: ['File Server'],
        remediation: 'Validate and sanitize file paths.',
        reportedDate: '2024-02-03'
    },
    {
        cveId: 'CVE-2024-1010',
        title: 'Open Redirect',
        description: 'The application redirects users to untrusted URLs based on user input.',
        severity: 'Medium',
        status: 'Resolved',
        affectedSystems: ['Web App'],
        remediation: 'Validate redirect URLs against a whitelist.',
        reportedDate: '2024-02-05'
    },
    {
        cveId: 'CVE-2024-1011',
        title: 'XML External Entity (XXE) Injection',
        description: 'The application parses XML input without disabling external entities, leading to data disclosure.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['XML Parser Service'],
        remediation: 'Disable external entity processing in the XML parser.',
        reportedDate: '2024-02-08'
    },
    {
        cveId: 'CVE-2024-1012',
        title: 'Command Injection',
        description: 'Attackers can execute arbitrary system commands via a vulnerable input field.',
        severity: 'Critical',
        status: 'Open',
        affectedSystems: ['System Utilities'],
        remediation: 'Avoid using system calls with user input.',
        reportedDate: '2024-02-10'
    },
    {
        cveId: 'CVE-2024-1013',
        title: 'Insecure Deserialization',
        description: 'Deserializing untrusted data allows attackers to execute arbitrary code.',
        severity: 'Critical',
        status: 'Open',
        affectedSystems: ['Backend Service'],
        remediation: 'Avoid deserializing data from untrusted sources.',
        reportedDate: '2024-02-12'
    },
    {
        cveId: 'CVE-2024-1014',
        title: 'Insufficient Logging and Monitoring',
        description: 'Critical security events are not logged, making incident detection difficult.',
        severity: 'Medium',
        status: 'Open',
        affectedSystems: ['Logging Service'],
        remediation: 'Implement comprehensive logging for security-relevant events.',
        reportedDate: '2024-02-15'
    },
    {
        cveId: 'CVE-2024-1015',
        title: 'Server-Side Request Forgery (SSRF)',
        description: 'The application can be induced to make requests to internal resources.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['Web App'],
        remediation: 'Validate and restrict destination URLs.',
        reportedDate: '2024-02-18'
    },
    {
        cveId: 'CVE-2024-1016',
        title: 'Lack of Rate Limiting',
        description: 'API endpoints are vulnerable to DoS attacks due to missing rate limiting.',
        severity: 'Medium',
        status: 'Resolved',
        affectedSystems: ['API Gateway'],
        remediation: 'Implement rate limiting on all API endpoints.',
        reportedDate: '2024-02-20'
    },
    {
        cveId: 'CVE-2024-1017',
        title: 'Use of Hardcoded Credentials',
        description: 'Database credentials are hardcoded in the source code.',
        severity: 'High',
        status: 'Resolved',
        affectedSystems: ['Source Code'],
        remediation: 'Use environment variables or a secrets manager.',
        reportedDate: '2024-02-22'
    },
    {
        cveId: 'CVE-2024-1018',
        title: 'Weak Encryption Algorithm',
        description: 'The application uses MD5 for hashing passwords.',
        severity: 'High',
        status: 'Open',
        affectedSystems: ['Authentication Service'],
        remediation: 'Migrate to a strong hashing algorithm like Argon2 or bcrypt.',
        reportedDate: '2024-02-25'
    },
    {
        cveId: 'CVE-2024-1019',
        title: 'Clickjacking',
        description: 'The application is vulnerable to clickjacking attacks.',
        severity: 'Low',
        status: 'Open',
        affectedSystems: ['Frontend UI'],
        remediation: 'Set X-Frame-Options to DENY or SAMEORIGIN.',
        reportedDate: '2024-02-27'
    },
    {
        cveId: 'CVE-2024-1020',
        title: 'Information Leakage in Error Messages',
        description: 'Detailed error messages expose internal system structure to attackers.',
        severity: 'Low',
        status: 'Resolved',
        affectedSystems: ['Web App'],
        remediation: 'Display generic error messages to users.',
        reportedDate: '2024-03-01'
    }
];

const seedData = async () => {
    await connectDB();

    // Check if we are destroying or importing
    if (process.argv[2] === '-d') {
        try {
            await Vulnerability.deleteMany();
            console.log('Data Destroyed!');
            process.exit();
        } catch (error) {
            console.error(`${error}`);
            process.exit(1);
        }
    } else {
        try {
            await Vulnerability.deleteMany();
            console.log('Existing data cleared');

            await Vulnerability.create(vulnerabilities);
            console.log('20 vulnerabilities inserted');
            console.log('Database seeded successfully');

            process.exit();
        } catch (error) {
            console.error(`${error}`);
            process.exit(1);
        }
    }
};

seedData();
