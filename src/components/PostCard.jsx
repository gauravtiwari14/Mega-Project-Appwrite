import React from "react";
import appwriteService from "../appwrite/configure";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    const imageUrl = featuredImage
    ? appwriteService.getFileView(featuredImage).href
    : "/assets/placeholder.png";


    console.log("Image ID:", featuredImage);


    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-xl object-cover w-full h-48"
                        onError={(e) => (e.target.src = "/assets/placeholder.png")} // Fallback image
                    />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
