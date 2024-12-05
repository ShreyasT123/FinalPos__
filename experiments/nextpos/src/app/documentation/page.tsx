const Docs = () => {
    return (
        <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-6 py-10">
            {/* General Information Section */}
            <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Welcome to the Quantum Project
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    This platform is designed to help you learn and experiment with quantum computing concepts in an intuitive way. With interactive circuit building, simulation, and 3D visualizations, you can get hands-on experience with quantum gates and algorithms. Explore the resources provided below to get started.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    Whether you&apos;re a beginner or an advanced learner, our tool provides the flexibility to define, simulate, and visualize quantum circuits easily. The educational resources are structured to guide you step by step through quantum concepts, from the basic gates to complex algorithms.
                </p>
            </section>

            <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-8">
                Quantum Project Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
                Explore detailed guides to help you build and simulate quantum circuits using our platform.
            </p>

            {/* Cards for Quantum Gates and JSON Input Syntax */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Quantum Gates Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Quantum Gates Documentation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Learn about all the quantum gates supported by our tool, including definitions and usage examples.
                    </p>
                    <a
                        href="documentation/gates"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 transition-colors"
                    >
                        Explore Gates
                    </a>
                </div>

                {/* JSON Syntax Guide Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        JSON Input Syntax Guide
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Discover the syntax for defining quantum circuits using JSON, with examples and tips.
                    </p>
                    <a
                        href="documentation/json-syntax"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 transition-colors"
                    >
                        View JSON Guide
                    </a>
                </div>
            </div>

            <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
                Need more help? Check out our detailed guides or contact us for support.
            </footer>
        </div>
    );
};

export default Docs;
