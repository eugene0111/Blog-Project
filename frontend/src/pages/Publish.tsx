import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ChangeEvent } from "react"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handler() {
        const response = await axios.post(`${BACKEND_URL}/blog`, {
            title,
            content
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        navigate(`/blog/${response.data.id}`)
    }

    return <div>
        <Appbar />
        <div className="pt-4 flex justify-center">
            <div className="max-w-screen-md w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Title:</label>
                <input
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    id="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                    placeholder="Write your title here..."
                />
            </div>
        </div>
        <div className="pt-8 flex justify-center">
            <div className="max-w-screen-md w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Content:</label>
                <TextEditor onChange={(e) => {
                    setContent(e.target.value);
                }} />
                <button type="submit" onClick={handler} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="px-4 py-2 bg-white rounded-b-lg">
                <label className="sr-only">Publish post</label>
                <textarea
                    onChange={onChange}
                    rows={12}
                    id="editor"
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none focus:ring-0 focus:border-0"
                    placeholder="Write an article..."
                    required
                ></textarea>
            </div>
        </div>
    </div>
}