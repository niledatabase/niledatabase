"use client";

import { useState } from 'react';

export default function Page({
    params,
  }: {
    params: { tenantid: string };
  }) {
    const [question, setQuestion] = useState('');
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const response = fetch('/api/embed-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                question: question,
                tenant_id: params.tenantid, 
            }),
        }).then((response) => {
            if (response.ok) {
                const data = response.json().then((data) => {;
                    setFileNames(data);
                });
            } else {
                console.error('Failed to fetch data');
            }
        });
    };

    return (
        <div>
            <h1>Find Similar Files</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Question:
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Closest Files:</h2>
                <ul>
                    {fileNames.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
