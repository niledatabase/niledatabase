"use client";

import { useState } from 'react';

export default function Page({
    params,
  }: {
    params: { tenantid: string };
  }) {
    const [question, setQuestion] = useState('');
    const [data, setData] = useState<any>();

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
                const data = response.json().then((data) => {
                    console.log(data);
                    setData(data);
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
            {data === undefined ? null : 
            <div>
                <h2>Files used:</h2>
                <ul>
                    {console.log(data)}
                    {data.files.map((fileName: string) => (
                        <li>{fileName}</li>
                    ))}
                </ul>
                <h2>Content:</h2>
                <ul>
                    {data.content.map((content: string) => (
                        <li>{content}</li>
                    ))}
                </ul>
                <h2>Answer:</h2>
                <p>{data.answer}</p>
            </div>
                            }
        </div>
    );
}
