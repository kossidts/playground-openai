import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [content, setContent] = useState("");
    const [summary, setSummary] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        const response = await fetch("/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });
        const data = await response.json();

        setSummary(data.result);
        // setContent("")
    }

    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
            </Head>

            <main className={styles.main}>
                <h3>Summarize</h3>
                <form onSubmit={onSubmit}>
                    <textarea
                        name="text"
                        placeholder="Enter a text to summarize"
                        cols="40"
                        rows="15"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></textarea>
                    <input type="submit" value="Generate summary" />
                </form>
                <div className="summary">{summary}</div>
            </main>
        </div>
    );
}
