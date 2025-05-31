
export const NewLayerContent = () => {
  return (
    <div className="space-y-8">
      {/* Blank dashboard content */}
      <div className="bg-white rounded-xl p-12 shadow-xl border-2 border-dashed border-gray-300 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Ready to Build</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start creating your next component or layer. This workspace is ready for your development needs.
          </p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105">
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
};
