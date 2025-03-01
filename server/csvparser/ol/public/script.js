document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const subjectSelect = document.getElementById('subject');
    const resultDiv = document.getElementById('result');
    const selectedInfo = document.getElementById('selectedInfo');
    const resultContent = document.getElementById('resultContent');

    // Predefined categories array
    const categories = [
        "Actuarial Science", "Agriculture", "All Undergraduate Programs", "Architecture",
        "Commerce/Accounting", "Commerce/Company Law", "Commerce/Cost Accounting",
        "Dental (PG)", "Design", "Design (PG)", "Engineering", "Engineering (PG)",
        "Engineering/Agriculture/Medical", "Engineering/Architecture/Medical",
        "Engineering/Management/Law", "Engineering/Medical", "Engineering/Medical/Agriculture",
        "Engineering/Medical/Dental", "Engineering/Medical/MBA", "Engineering/Pharmacy",
        "Engineering/Pharmacy/Architecture", "English Proficiency", "Fashion Design",
        "Hotel Management", "Law", "Management", "Management/BBA",
        "Management/Commerce/Economics", "Marine Engineering/Nautical Science",
        "Mathematics/Computer Science", "Medical", "Medical Super Specialty",
        "Multiple disciplines", "Physics/Theoretical Computer Science", "Pharmacy",
        "Scholarship", "Science", "Science Olympiads", "Science Research",
        "Social Work/Social Sciences", "Statistics/Mathematics", "Tourism/Hospitality",
        "Undergraduate Admission (International)", "Various undergraduate courses",
        "Various undergraduate/postgraduate courses"
    ];

    // Predefined subjects array
    const subjects = [
        "PCM", "PCB", "Multiple domains", "PCM/PCB", "General aptitude",
        "Design aptitude", "Drawing/Aptitude", "Commerce",
        "Quantitative Ability/Verbal Ability", "Mathematics/Statistics",
        "Mathematics", "PCB/Agriculture", "Dental Sciences", "Subject specific",
        "PCM/Management Aptitude/Legal Aptitude", "Quantitative/Verbal/Logical Reasoning",
        "English/Mathematics", "English/Mathematics/Science/Reading", "English",
        "Physics/Chemistry/Biology/Astronomy", "General Knowledge/MAT/SAT",
        "English/Aptitude/Reasoning", "PCB/Pharmacy", "Medical Sciences",
        "Engineering disciplines", "English/General Knowledge/Tourism",
        "General Knowledge/Social Sciences", "Quantitative Ability/Verbal Ability/Reasoning",
        "Reading/Logical Reasoning", "Legal Reasoning/Logical Reasoning",
        "PCM/PCB/Management", "Quantitative/Verbal/Reasoning", "Physics/Mathematics"
    ];

    // Populate category dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Category Change Event
    categorySelect.addEventListener('change', async () => {
        populateSubjects();
        await updateResult();
    });

    // Subject Change Event
    subjectSelect.addEventListener('change', updateResult);

    function populateSubjects() {
        const selectedCategory = categorySelect.value;
        subjectSelect.innerHTML = '<option value="">Choose a subject...</option>';

        if (selectedCategory) {
            subjectSelect.disabled = false;
            // Filter subjects based on category if needed
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        } else {
            subjectSelect.disabled = true;
        }
    }

    async function updateResult() {
        const category = categorySelect.value;
        const subject = subjectSelect.value;

        if (category && subject) {
            try {
                console.log(`Fetching results for ${category}/${subject}`);
                const response = await fetch(`http://localhost:1000/api/results/${encodeURIComponent(category)}/${encodeURIComponent(subject)}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const results = await response.json();
                console.log('Results:', results);

                resultDiv.classList.remove('d-none');

                // Show selected criteria
                selectedInfo.innerHTML = `
                    <div class="selected-info mb-3">
                        <h5 class="fw-bold">Selected Criteria:</h5>
                        <p><strong>Category:</strong> ${category}</p>
                        <p><strong>Subject/Stream:</strong> ${subject}</p>
                    </div>`;

                if (results && results.length > 0) {
                    const headers = Object.keys(results[0]);
                    resultContent.innerHTML = `
                        <div class="results-table">
                            <h5 class="fw-bold mb-3">Found ${results.length} Matching Courses:</h5>
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered">
                                    <thead class="table-primary">
                                        <tr>
                                            ${headers.map(header => `
                                                <th>${header.replace(/([A-Z])/g, ' $1').trim()}</th>
                                            `).join('')}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${results.map(result => `
                                            <tr>
                                                ${headers.map(header => `
                                                    <td>${result[header] || '-'}</td>
                                                `).join('')}
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>`;
                } else {
                    resultContent.innerHTML = `
                        <div class="alert alert-warning">
                            <h5 class="fw-bold">No Direct Matches Found</h5>
                            <p>Try these suggestions:</p>
                            <ul>
                                <li>Check for similar categories</li>
                                <li>Try different subject combinations</li>
                                <li>Look for related courses</li>
                            </ul>
                        </div>`;
                }
            } catch (error) {
                console.error('Error details:', error);
                resultContent.innerHTML = `
                    <div class="alert alert-danger">
                        <p>Error fetching results: ${error.message}</p>
                    </div>`;
            }
        } else {
            resultDiv.classList.add('d-none');
        }
    }
});