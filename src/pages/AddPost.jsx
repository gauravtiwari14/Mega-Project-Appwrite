import React from "react";
import { Container, PostForm } from "../components";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create a New Post
          </h1>
          <p className="text-gray-500 text-center mb-4">
            Share your thoughts, ideas, and images with the world!
          </p>
          <PostForm />
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
