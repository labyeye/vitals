import React from "react";
import { Instagram, Heart, Users, Camera } from "lucide-react";

const SocialProof: React.FC = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "https://ik.imagekit.io/os1mzoooe/ChatGPT%20Image%20Aug%208,%202025,%2012_38_03%20AM.png?updatedAt=1754593693555",
      caption: "Morning protein shake routine with Thryv! ✨ #ThryvFam #ProteinLife",
      likes: 2340,
      user: "@fitness_sarah"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1594737626072-90dc274bc2dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      caption: "Convenient Thryv sachets for my gym bag 💪 #ThryvFam #OnTheGo",
      likes: 1890,
      user: "@gymrat_mike"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506629905607-ce95d8b15b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      caption: "Chocolate shake = dessert vibes with Thryv 🍫 #ThryvFam #HealthyTreats",
      likes: 3120,
      user: "@healthy_priya"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#F4F1E9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="w-8 h-8 text-[#688F4E]" />
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2B463C]">
              #ThryvFam
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join our community of health enthusiasts sharing their Thryv journey
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-[#688F4E]" />
                <span className="text-2xl font-bold text-[#2B463C]">25K+</span>
              </div>
              <p className="text-gray-600 text-sm">Community Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Instagram className="w-5 h-5 text-[#688F4E]" />
                <span className="text-2xl font-bold text-[#2B463C]">50K+</span>
              </div>
              <p className="text-gray-600 text-sm">Instagram Posts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-[#688F4E]" />
                <span className="text-2xl font-bold text-[#2B463C]">2M+</span>
              </div>
              <p className="text-gray-600 text-sm">Total Likes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Camera className="w-5 h-5 text-[#688F4E]" />
                <span className="text-2xl font-bold text-[#2B463C]">1K+</span>
              </div>
              <p className="text-gray-600 text-sm">Weekly Posts</p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#688F4E] to-[#2B463C] rounded-2xl p-6 text-white mb-12">
            <h3 className="text-xl font-bold mb-2">Share Your Thryv Moment!</h3>
            <p className="mb-4 opacity-90">
              Tag us @thryv_nutrition and use #ThryvFam to be featured
            </p>
            <button className="bg-white text-[#2B463C] px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
              <Instagram className="w-5 h-5" />
              <span>Follow Us</span>
            </button>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-gray-200 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <p className="text-xs">{post.user}</p>
                  </div>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#2B463C] mb-4">
              Become Part of the #ThryvFam
            </h3>
            <p className="text-gray-600 mb-8">
              Share your fitness journey, inspire others, and get featured on our official page. 
              Plus, get a chance to win exclusive Thryv merchandise!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <button className="bg-gradient-to-r from-[#E4405F] to-[#C13584] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center space-x-2">
                <Instagram className="w-5 h-5" />
                <span>Follow @thryv_nutrition</span>
              </button>
              <button className="border-2 border-[#688F4E] text-[#688F4E] px-6 py-3 rounded-xl font-semibold hover:bg-[#688F4E] hover:text-white transition-all duration-300">
                Use #ThryvFam
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
