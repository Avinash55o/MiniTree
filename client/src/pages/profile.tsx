import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Link {
    id: string;
    name: string;
    url: string;
    active: boolean;
}

export default function PublicProfile() {
    const { username } = useParams<{ username: string }>();
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!username) return;

        fetch(`https://minitree.onrender.com/link/${username}`)
            .then(res => {
                if (!res.ok) throw new Error('User not found');
                return res.json();
            })
            .then(data => {
                setLinks(data);
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    if (notFound || links.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold text-red-400">Profile not found</h1>
                <p className="text-gray-400 mt-2">No active links for @{username}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">@{username}</h1>
                    <p className="text-gray-400 text-sm mt-1">All links below are active and verified.</p>
                </div>

                <div className="space-y-4">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-center transition-all duration-150 border border-gray-700 hover:border-blue-500"
                        >
                            <span className="font-medium">{link.name}</span>
                            <br />
                            {/* <span className="text-sm text-blue-400 mt-1 block">{link.url}</span> */}
                        </a>
                    ))}
                </div>

                <div className="text-center mt-12 text-gray-500 text-xs">
                    Powered by sprout
                </div>
            </div>
        </div>
    );
}