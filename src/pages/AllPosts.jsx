import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/configure";
import { useNavigate } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                console.log("Fetched Posts:", response); // Debugging
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Handle delete post
    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            await appwriteService.deletePost(postId);
            setPosts(posts.filter(post => post.$id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="w-full py-10 min-h-screen bg-gray-50">
            <Container>
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">All Posts</h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div key={post.$id} className="relative bg-white shadow-md hover:shadow-lg rounded-lg transition-all duration-300">
                                <PostCard {...post} />
                                {/* Action buttons with a dropdown */}
                                <div className="absolute top-2 right-2">
                                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none group">
                                        ⋮
                                        <div className="hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-10">
                                            <button
                                                onClick={() => navigate(`/edit-post/${post.$id}`)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.$id)}
                                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">No posts available.</p>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
