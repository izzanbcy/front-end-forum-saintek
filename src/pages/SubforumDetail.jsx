import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ThreadCard from '../components/ThreadCard';
import SubforumSidebar from '../components/SubforumSidebar';
import NavigationSidebar from '../components/NavigationSidebar';

export default function SubforumDetail() {
  const { slug } = useParams();
  const [subforum, setSubforum] = useState(null);
  const [threads, setThreads] = useState([]);
  const [subforums, setSubforums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubforumData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch subforum details, all subforums (for sidebar), and threads for this subforum
        const [subforumRes, subforumsRes, threadsRes] = await Promise.all([
          api.get(`/subforums/${slug}`),
          api.get('/subforums'),
          api.get('/threads', { params: { subforum: slug } })
        ]);

        const subforumData = subforumRes.data?.data;
        const subforumsListData = subforumsRes.data?.data || [];
        const threadsData = threadsRes.data?.data || [];

        setSubforum(subforumData);
        setSubforums(subforumsListData);
        setThreads(threadsData);
      } catch (err) {
        console.error('Failed to fetch subforum data:', err);
        if (err.response?.status === 404) {
          setError('Subforum tidak ditemukan.');
        } else {
          setError('Gagal memuat detail subforum. Silakan coba lagi nanti.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubforumData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !subforum) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error || 'Subforum not found.'}</span>
        </div>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Subforum Banner */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm mb-8 overflow-hidden">
        <div className="h-24 bg-blue-600"></div>
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-end -mt-12 md:-mt-8 gap-4">
          <div className="bg-white p-2 rounded-full border-4 border-white shadow-md inline-block shrink-0">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
              s/
            </div>
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-extrabold text-gray-900">s/{subforum.name}</h1>
            <p className="text-gray-600">{subforum.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Navigation */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="sticky top-24">
            <NavigationSidebar subforums={subforums} />
          </div>
        </aside>

        {/* Main Content: Thread List */}
        <div className="w-full lg:col-span-6 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between px-1 lg:px-0">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recent Posts in s/{subforum.name}</h2>
            <Link
              to="/create-thread"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Create Post
            </Link>
          </div>

          {threads.length > 0 ? (
            <div className="space-y-4">
              {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-md shadow text-center border border-gray-200">
              <p className="text-gray-500">No threads yet in this subforum. Why not start one?</p>
              <Link
                to="/create-thread"
                className="inline-block mt-4 text-blue-600 font-bold hover:underline"
              >
                Create the first thread
              </Link>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <h3 className="font-bold text-sm mb-2 uppercase text-gray-500 tracking-wider">About Community</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {subforum.description || `Welcome to the ${subforum.name} subforum!`}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Created</span>
                  <span className="text-gray-500">Feb 20, 2024</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Members</span>
                  <span className="text-gray-500">1.2k</span>
                </div>
              </div>
              <Link
                to="/create-thread"
                className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-full text-sm font-bold transition-colors"
              >
                Create Post
              </Link>
            </div>
            <SubforumSidebar subforums={subforums} />
          </div>
        </aside>
      </div>
    </div>
  );
}
