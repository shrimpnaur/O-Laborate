import React, { useState, useEffect } from "react";

const MCQ = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8501/")  // Update with your actual backend URL
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data.questions);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching quiz:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-center text-purple-700 text-3xl font-bold mb-4">AI-Generated MCQs</h1>

            {loading ? (
                <p className="text-center">Generating Questions...</p>
            ) : (
                questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-lg font-semibold">{question.text}</h2>
                        {question.options.map((option, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="radio" name={`question-${index}`} value={option} />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                ))
            )}

            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Submit Answers
            </button>
        </div>
    );
};

export default MCQ;
