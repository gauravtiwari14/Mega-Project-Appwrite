import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configure";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";  // Added for navigation

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    // 🟢 Enhanced Skeleton Loader (Smooth & Modern)
    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-4">
                <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center animate-fade-in">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        👋 Welcome to Our Platform!
                    </h1>
                    <p className="text-lg text-gray-600">
                        It looks like there are no posts just yet. Be the first to spark a story, an idea, or a moment worth sharing!
                    </p>
                    <p className="mt-4 text-gray-500 text-md">
                        To explore and contribute, please{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-600 font-medium hover:underline transition"
                        >
                            log in
                        </button>{" "}
                        to your account.
                    </p>
                    <p className="mt-2 text-gray-500 text-md">
                        New here?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-blue-600 font-medium hover:underline transition"
                        >
                            Sign up now
                        </button>
                    </p>
    
                    <div className="mt-6">
                        <div className="h-2 w-40 mx-auto bg-blue-200 rounded-full animate-pulse"></div>
                        <p className="text-sm text-gray-400 mt-2">Loading content for you...</p>
                    </div>
                </div>
            </div>
        );
    }
    

    // 🔴 No Posts UI - Elegant & Engaging with Login Prompt
    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center px-6">
                <div className="max-w-xl bg-white shadow-xl rounded-2xl p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        It’s Empty Here...
                    </h1>
                    <p className="text-lg text-gray-600">
                        No posts have been shared yet. You could be the first to inspire others!
                    </p>
                    <p className="text-md text-gray-500 mt-4">
                        Start by sharing your thoughts, an idea, or a moment you care about. Make your mark!
                    </p>
    
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => navigate("/add-post")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            ✨ Create Your First Post
                        </button>
                       
                    </div>
                </div>
            </div>
        );
    }
    
    

    // ✅ Posts UI - Smooth, Responsive, and Elegant
    return (
        <div className="w-full py-12 bg-gray-50 min-h-screen">
            <Container>
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-wide">
                    Latest Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl transform"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
