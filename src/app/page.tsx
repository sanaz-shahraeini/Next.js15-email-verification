const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to My Project
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            modern database management solution powered by Drizzle ORM and PostgreSQL
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Fast & Efficient",
              description: "Built with modern technologies for optimal performance",
              icon: "⚡"
            },
            {
              title: "Secure",
              description: "Enterprise-grade security with authentication built-in",
              icon: "🔒"
            },
            {
              title: "Easy to Use",
              description: "Intuitive interface for seamless data management",
              icon: "🎯"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="/api/auth/signin"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition duration-300"
          >
            Sign In to Get Started
          </a>
          <p className="mt-4 text-gray-400">
            Experience the next generation of database management
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home
