import { useState } from 'react';
import { api } from '../utils/api';

export default function LinkForm({ userId, onAdd }: { userId: string; onAdd: () => void }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.links.create(userId, name, url);
            setName('');
            setUrl('');
            onAdd();
        } catch (err) {
            alert('Failed to add link');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                    type="text"
                    placeholder="Link name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded w-full"
                    required
                />
                <input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded w-full"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded disabled:opacity-50"
            >
                {submitting ? 'Adding...' : 'Add Link'}
            </button>
        </form>
    );
}