import React, { createContext, useContext, useState } from "react";

const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React Native",
    body: "Learn the basics of React Native and build your first cross-platform mobile app. We'll cover the fundamentals and best practices.",
    author: "Sarah Chen",
    date: "2 hours ago",
    likes: 245,
    comments: 18,
    shares: 32,
  },
  {
    id: "2",
    title: "Advanced State Management Patterns",
    body: "Explore different approaches to managing state in your React Native applications. From Redux to Context API and more.",
    author: "John Developer",
    date: "5 hours ago",
    likes: 189,
    comments: 24,
    shares: 15,
  },
  {
    id: "3",
    title: "Performance Optimization Tips",
    body: "Discover techniques to optimize your React Native app's performance. Learn about memory management and rendering optimization.",
    author: "Alex Kumar",
    date: "1 day ago",
    likes: 412,
    comments: 56,
    shares: 89,
  },
  {
    id: "4",
    title: "Mobile UI/UX Design Best Practices",
    body: "Master the art of creating beautiful and user-friendly mobile interfaces. Design patterns and principles for modern apps.",
    author: "Emma Design",
    date: "2 days ago",
    likes: 567,
    comments: 72,
    shares: 124,
  },
];

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (newPost) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
