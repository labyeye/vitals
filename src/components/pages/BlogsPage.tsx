import React from "react";
import { Calendar, Clock, ArrowRight, Tag, Heart, BookOpen, Share2 } from "lucide-react";

const BlogsPage: React.FC = () => {
  const blogs = [
    {
      id: 1,
      title: "The Complete Guide to Plant-Based Protein",
      date: "December 15, 2024",
      time: "2 hours ago",
      category: "Nutrition",
      description: "Discover the best plant-based protein sources and learn how to incorporate them into your daily diet for optimal health and muscle building.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      author: "Dr. Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 124,
      views: 2340
    },
    {
      id: 2,
      title: "Morning Nutrition: Fueling Your Day Right",
      date: "December 12, 2024",
      time: "1 day ago",
      category: "Wellness",
      description: "Start your day with the right nutrition. Learn about the best breakfast options that provide sustained energy and keep you focused throughout the day.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      author: "Nutritionist Mike Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 89,
      views: 1567
    },
    {
      id: 3,
      title: "Understanding Macronutrients: Protein, Carbs, and Fats",
      date: "December 10, 2024",
      time: "3 days ago",
      category: "Education",
      description: "A comprehensive guide to understanding macronutrients and how they work together to support your health and fitness goals.",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "10 min read",
      author: "Dr. Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 156,
      views: 3120
    },
    {
      id: 4,
      title: "Post-Workout Nutrition: What to Eat After Exercise",
      date: "December 8, 2024",
      time: "5 days ago",
      category: "Fitness",
      description: "Optimize your recovery with the right post-workout nutrition. Learn about the timing, types, and amounts of nutrients your body needs after exercise.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      author: "Fitness Coach David Wilson",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 203,
      views: 4456
    },
    {
      id: 5,
      title: "The Science Behind Protein Timing",
      date: "December 5, 2024",
      time: "1 week ago",
      category: "Research",
      description: "Explore the latest research on protein timing and how it affects muscle growth, recovery, and overall athletic performance.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "12 min read",
      author: "Dr. Lisa Thompson",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 178,
      views: 3890
    },
    {
      id: 6,
      title: "Healthy Snacking: Smart Choices for Busy Lifestyles",
      date: "December 1, 2024",
      time: "2 weeks ago",
      category: "Lifestyle",
      description: "Discover nutritious snack options that fit into your busy lifestyle. Learn how to make smart choices that keep you energized and satisfied.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      author: "Wellness Coach James Brown",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      likes: 92,
      views: 1876
    }
  ];

  const categories = [
    { name: "All", count: blogs.length, icon: BookOpen },
    { name: "Nutrition", count: 1, icon: Tag },
    { name: "Wellness", count: 1, icon: Heart },
    { name: "Education", count: 1, icon: BookOpen },
    { name: "Fitness", count: 1, icon: Tag },
    { name: "Research", count: 1, icon: BookOpen },
    { name: "Lifestyle", count: 1, icon: Heart }
  ];

  const featuredBlog = blogs[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-[#688F4E] to-[#5a7a42]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nutrition & Wellness Blog
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Expert insights, research-backed articles, and practical tips for your health and wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#688F4E] hover:text-white border border-[#B1D182]/30"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs bg-[#688F4E]/10 text-[#688F4E] px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B463C] mb-8 text-center">
            Featured Article
          </h2>
          <article className="bg-white rounded-xl shadow-lg overflow-hidden group max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#688F4E] text-white text-xs px-3 py-1 rounded-full font-medium">
                  {featuredBlog.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredBlog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{featuredBlog.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{featuredBlog.likes}</span>
                </div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-[#2B463C] mb-4 group-hover:text-[#688F4E] transition-colors duration-300">
                {featuredBlog.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {featuredBlog.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredBlog.authorImage}
                    alt={featuredBlog.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#2B463C]">{featuredBlog.author}</p>
                    <p className="text-sm text-gray-500">{featuredBlog.views} views</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[#688F4E] hover:text-[#5a7a42] transition-colors duration-300 group">
                  <span className="text-sm font-medium">Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B463C] mb-8 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#688F4E] text-white text-xs px-3 py-1 rounded-full font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#2B463C] mb-3 group-hover:text-[#688F4E] transition-colors duration-300">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-[#2B463C]">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-[#688F4E] hover:text-[#5a7a42] transition-colors duration-300 group">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#688F4E] transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#688F4E]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2B463C] mb-4">
              Never Miss an Article
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our blog newsletter and get the latest nutrition insights, health tips, and wellness advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-[#B1D182]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#688F4E] text-white font-medium rounded-lg hover:bg-[#5a7a42] transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage; 