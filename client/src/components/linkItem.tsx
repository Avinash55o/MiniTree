import { useState } from 'react';
import { api } from '../utils/api';

export default function LinkItem({ link, onUpdate, onDelete }: { link: any; onUpdate: () => void; onDelete: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newUrl, setNewUrl] = useState(link.url);
    const [saving, setSaving] = useState(false);

    const handleToggle = async () => {
        await api.links.toggle(link.id);
        onUpdate();
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            await api.links.update(link.id, link.userId, newUrl);
            setIsEditing(false);
            onUpdate();
        } catch (err) {
            alert('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Delete this link?')) {
            await api.links.delete(link.id);
            onDelete();
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{link.name}</h3>
                    {isEditing ? (
                        <input
                            type="url"
                            value={newUrl}
                            onChange={e => setNewUrl(e.target.value)}
                            className="mt-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded w-full text-sm"
                        />
                    ) : (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                            {link.url}
                        </a>
                    )}
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-xs bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleToggle}
                        className={`text-xs px-2 py-1 rounded ${link.active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {link.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-xs bg-red-800 hover:bg-red-900 px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <span className={`text-xs ${link.active ? 'text-green-400' : 'text-red-400'}`}>
                {link.active ? 'Active' : 'Inactive'}
            </span>
        </div>
    );
}