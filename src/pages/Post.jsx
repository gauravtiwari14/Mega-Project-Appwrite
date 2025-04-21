import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/configure";

function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await appwriteService.getPost(slug);
                if (response) {
                    setPost(response);
                    // Fetch image URL if needed
                    const imageUrl = await fetchImageUrl(response.featuredImage);
                    setPost(prevPost => ({ ...prevPost, imageUrl }));
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        // Function to fetch image URL
        const fetchImageUrl = async (imageId) => {
            try {
                const imageFile = await appwriteService.getFileView(imageId);
                return imageFile.href;  // Returns the URL of the file for display
            } catch (error) {
                console.error("Error fetching image URL:", error);
                return null;
            }
        };

        fetchPost();
    }, [slug]);

    // Handle delete post
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await appwriteService.deletePost(post.$id);
            navigate("/all-posts"); // Redirect after delete
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 bg-gray-100">
            {loading ? (
                <p className="text-gray-500">Loading post...</p>
            ) : post ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                    {/* Back Button positioned at the top left with "Back" text */}
                    <button
                        onClick={() => navigate(-1)}  // Go back to the previous page
                        className="absolute top-40 left-48 p-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors duration-300 hover:bg-gray-200 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mr-2"  // Add margin-right to separate icon and text
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span>Back</span>  {/* Add the Back text */}
                    </button>

                    {/* Post Content */}
                    <img
                        src={post.imageUrl || post.featuredImage}  // Use imageUrl if available
                        alt={post.title}
                        className="w-full rounded-lg mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }}></p>

                    {/* Edit & Delete Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => navigate(`/edit-post/${post.$id}`)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-blue-700"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-red-700"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Post not found.</p>
            )}
        </div>
    );
}

export default Post;
