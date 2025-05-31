
export const NewLayerContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">New Layer</h1>
        <p className="text-slate-600">Create and manage your layers from this dashboard.</p>
      </div>

      {/* Blank dashboard content */}
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Ready to create</h3>
          <p className="text-slate-600 max-w-md mx-auto">
            This is your blank dashboard for the New Layer section. Add your content and functionality here.
          </p>
        </div>
      </div>
    </div>
  );
};
