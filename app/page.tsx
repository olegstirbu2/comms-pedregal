import CaseInboxLayout from "@/components/CaseInboxLayout";

export default function Home() {
  return (
    <CaseInboxLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Case Inbox Navigation Prototype</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Click "Case Inbox" in the left nav to toggle the secondary panel</li>
              <li>Three panel states: Closed (hidden), Peeked (80px, avatars only), Open (272px, full list)</li>
              <li>Click avatars in peeked view to expand to full list</li>
              <li>Smooth transitions between all states</li>
              <li>Pixel-perfect match to Figma design</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Case Inbox States</h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">1. Open State (272px)</h3>
                <p className="text-sm text-gray-600 mt-1">Full case list with names, case IDs, timestamps, categories, and message previews</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">2. Peeked State (80px)</h3>
                <p className="text-sm text-gray-600 mt-1">Collapsed to show only case avatars with unread indicators</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">3. Closed State (0px)</h3>
                <p className="text-sm text-gray-600 mt-1">Completely hidden, only primary navigation visible</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interactive Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Filter Dropdown</h3>
                <p className="text-sm text-gray-600">"Open" tag with chevron in header (ready for implementation)</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Search Cases</h3>
                <p className="text-sm text-gray-600">Search icon button in both open and peeked states</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Case Selection</h3>
                <p className="text-sm text-gray-600">Selected case highlighted with left border indicator</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Unread Badges</h3>
                <p className="text-sm text-gray-600">Blue dot indicators for new/unread cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseInboxLayout>
  );
}
