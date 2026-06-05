import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ThreadCard from '../components/ThreadCard';
import SubforumSidebar from '../components/SubforumSidebar';
import NavigationSidebar from '../components/NavigationSidebar';
import useAuthStore from '../store/authStore';

export default function Home() {
  const { token } = useAuthStore();
  const [threads, setThreads] = useState([]);
  const [subforums, setSubforums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [threadsRes, subforumsRes] = await Promise.all([
          api.get('/threads'),
          api.get('/subforums'),
        ]);

        // Handling both possible response structures (direct array or data property)
        const threadsData = threadsRes.data?.data || [];
        const subforumsData = subforumsRes.data?.data || [];

        setThreads(threadsData);
        setSubforums(subforumsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Navigation */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="sticky top-24">
            <NavigationSidebar subforums={subforums} />
          </div>
        </aside>

        {/* Main Content: Feed Thread */}
        <div className="w-full lg:col-span-6 xl:col-span-7">
          {token && (
            <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <Link
                to="/create-thread"
                className="flex-1 bg-gray-50 border border-gray-200 rounded py-2 px-4 text-sm text-gray-500 hover:bg-white hover:border-blue-400 transition-colors"
              >
                Create Post
              </Link>
              <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 px-1 lg:px-0">
            <h1 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recent Threads</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="text-blue-600">New</span>
              <span className="hover:text-blue-600 cursor-pointer">Hot</span>
              <span className="hover:text-blue-600 cursor-pointer">Top</span>
            </div>
          </div>

          {threads.length > 0 ? (
            <div className="space-y-4">
              {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-md shadow text-center">
              <p className="text-gray-500">No threads found. Be the first to start a conversation!</p>
            </div>
          )}
        </div>

        {/* Right Sidebar: Subforums & Info */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <SubforumSidebar subforums={subforums} />
            <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <h3 className="font-bold text-sm mb-2">About Forum SAINTEK</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Welcome to the SAINTEK community! A place to discuss Science, Technology, Engineering, and Mathematics.
              </p>
              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-gray-400 font-medium">
                <span className="hover:underline cursor-pointer">Content Policy</span>
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span className="hover:underline cursor-pointer">User Agreement</span>
                <span className="hover:underline cursor-pointer">Mod Policy</span>
                <span>© 2024 Forum SAINTEK, Inc.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
