import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/configure";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function EditPost() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // For storing image URL
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(async (post) => {
                if (post) {
                    setPost(post);
                    // If the post has a featured image, fetch the image URL
                    if (post.featuredImage) {
                        const imageFile = await appwriteService.getFileView(post.featuredImage);
                        setImageUrl(imageFile.href);  // Assuming `href` is the URL of the file
                    }
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="min-h-screen py-12 bg-gray-100">
            <Container>
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>
                    
                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Edit Post
                    </h1>
                    
                    {/* Post Form */}
                    <PostForm 
                        post={post} 
                        imageUrl={imageUrl}  // Pass imageUrl to PostForm
                    />
                </div>
            </Container>
        </div>
    ) : null;
}

export default EditPost;
