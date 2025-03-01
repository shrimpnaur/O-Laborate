const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readExcelFile() {
    const filePath = path.join(__dirname, 'Book1.xlsx');
    try {
        if (!require('fs').existsSync(filePath)) {
            throw new Error(`Excel file not found at: ${filePath}`);
        }

        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Log the structure of first row to understand available fields
        if (data.length > 0) {
            console.log('Excel columns:', Object.keys(data[0]));
        }

        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
}

// Get categories
app.get('/api/categories', (req, res) => {
    try {
        const data = readExcelFile();
        const categories = [...new Set(data.map(item => item.Category))];
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get subjects for a category
app.get('/api/subjects/:category', (req, res) => {
    try {
        const data = readExcelFile();
        const subjects = data
            .filter(item => item.Category === req.params.category)
            .map(item => item['Subjects/Streams']);

        // Remove duplicates and filter out empty/null values
        const uniqueSubjects = [...new Set(subjects)].filter(Boolean);
        res.json(uniqueSubjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
});

// Get results for category and subject combination
app.get('/api/results/:category/:subject', (req, res) => {
    try {
        const { category, subject } = req.params;
        const decodedCategory = decodeURIComponent(category);
        const decodedSubject = decodeURIComponent(subject);

        console.log(`Searching for - Category: ${decodedCategory}, Subject: ${decodedSubject}`);

        const data = readExcelFile();

        // Find exact matches
        const exactMatches = data.filter(item =>
            item.Category === decodedCategory &&
            item['Subjects/Streams'] === decodedSubject
        );

        // Find related matches
        const relatedMatches = data.filter(item => {
            // Check if category contains the search term
            const categoryMatch = item.Category.includes(decodedCategory) ||
                decodedCategory.includes(item.Category);

            // Check if subjects overlap
            const subjectMatch = item['Subjects/Streams'].includes(decodedSubject) ||
                decodedSubject.includes(item['Subjects/Streams']);

            // Include if either category or subject matches, but not already in exact matches
            return (categoryMatch || subjectMatch) &&
                !exactMatches.includes(item);
        });

        // Combine exact and related matches
        const results = [...exactMatches, ...relatedMatches];

        console.log(`Found ${results.length} total matches (${exactMatches.length} exact, ${relatedMatches.length} related)`);
        res.json(results);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Failed to fetch results',
            details: error.message
        });
    }
});

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Test Excel file reading on startup
    try {
        const data = readExcelFile();
        console.log('Excel file loaded successfully with columns:', Object.keys(data[0]));
    } catch (error) {
        console.error('Failed to load Excel file on startup');
    }
});