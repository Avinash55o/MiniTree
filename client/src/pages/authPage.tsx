import { useState } from "react";
import { api } from "../utils/api";

export default function AuthPage({ onLogin }: { onLogin: (id: string) => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(false);
        setError('');

        try {
            const res = isLogin
                ? await api.auth.login(username, password)
                : await api.auth.signup(username, password);

            if (res.error) {
                setError(res.error);
            } else {
                onLogin(res.userId || res.message ? (await api.auth.login(username, password)).userId : '');
            }
        } catch (error) {
            setError('network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded disabled:opacity-50"
                    >
                        {loading ? '...' : isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-sm text-blue-400 hover:underline w-full"
                >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}