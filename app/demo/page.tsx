import CaseInboxLayout from "@/components/CaseInboxLayout";

export default function DemoPage() {
  return (
    <CaseInboxLayout>
      <div className="p-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Case Inbox Navigation
          </h1>
          <p className="text-xl text-gray-600">
            A pixel-perfect implementation of the Figma design with three interactive states
          </p>
        </div>

        {/* Demo content that looks like a case detail view */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Edeka Weiß #2411124254
                </h2>
                <p className="text-sm text-gray-500 mt-1">Item Substitution • Opened 30s ago</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Resolve
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Case Details</h3>
              <p className="text-gray-700 leading-relaxed">
                Red Bull Sugar Free 250ml (x4) is out of stock. We suggest Red Bull Original 250ml (x4) as a substitute.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="text-sm font-medium">Approve Substitute</div>
                </button>
                <button className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <div className="text-sm font-medium">Cancel Item</div>
                </button>
                <button className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm font-medium">Message Customer</div>
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">30 seconds ago</p>
                    <p className="text-gray-900">Case opened - Item substitution required</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                    <p className="text-gray-900">Order placed - Item preparation started</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseInboxLayout>
  );
}

