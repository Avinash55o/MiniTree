import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LinkForm from '../components/linkForm';
import LinkItem from '../components/linkItem';

export default function Dashboard({ userId, onLogout }: { userId: string; onLogout: () => void }) {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLinks = () => {
        api.links.getAllByUser(userId).then(setLinks).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLinks();
    }, [userId]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Your Links</h1>
                    <button
                        onClick={onLogout}
                        className="text-sm text-red-400 hover:underline"
                    >
                        Logout
                    </button>
                </div>

                <LinkForm userId={userId} onAdd={fetchLinks} />

                {loading ? (
                    <p className="text-center py-4">Loading...</p>
                ) : links.length === 0 ? (
                    <p className="text-center py-4 text-gray-400">No links yet. Add one above!</p>
                ) : (
                    <div className="space-y-3 mt-6">
                        {links.map(link => (
                            <LinkItem key={link.id} link={link} onUpdate={fetchLinks} onDelete={fetchLinks} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}