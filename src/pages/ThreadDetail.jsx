import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import VoteButton from '../components/VoteButton';
import CommentSection from '../components/CommentSection';
import NavigationSidebar from '../components/NavigationSidebar';
import SubforumSidebar from '../components/SubforumSidebar';

export default function ThreadDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [subforums, setSubforums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [threadRes, subforumsRes] = await Promise.all([
          api.get(`/threads/${id}`),
          api.get('/subforums')
        ]);

        setThread(threadRes.data?.data);
        setSubforums(subforumsRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load thread details. It may have been deleted or doesn\'t exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error || 'Thread not found.'}</span>
        </div>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const { id: threadId, title, content, createdAt, author, subforum, _count } = thread;
  const upvotes = _count?.votes || 0;
  const downvotes = 0;
  const userVote = null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Navigation */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="sticky top-24">
            <NavigationSidebar subforums={subforums} />
          </div>
        </aside>

        {/* Main Content: Thread Detail */}
        <div className="w-full lg:col-span-6 xl:col-span-7">
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden flex">
            {/* Vote Column */}
            <div className="w-10 md:w-12 bg-gray-50 flex flex-col items-center py-4 shrink-0 border-r border-gray-100">
              <VoteButton
                threadId={threadId}
                initialUpvotes={upvotes}
                initialDownvotes={downvotes}
                initialUserVote={userVote}
                className="flex-col"
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 md:p-6">
              {/* Header Info */}
              <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                {subforum && (
                  <Link to={`/subforums/${subforum.slug}`} className="font-bold text-gray-900 hover:underline">
                    s/{subforum.name}
                  </Link>
                )}
                <span>•</span>
                <span>Posted by u/{author?.username || 'anonymous'}</span>
                <span>•</span>
                <span>{new Date(createdAt).toLocaleString()}</span>
              </div>

              {/* Thread Content */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">{title}</h1>

              <div className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-8">
                {content}
              </div>

              {/* Action Bar */}
              <div className="flex items-center space-x-6 text-gray-500 text-xs font-bold border-t border-gray-100 pt-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>COMMENTS</span>
                </div>
                <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>SHARE</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-4 bg-white border border-gray-200 rounded-md p-4 md:p-6">
            <CommentSection threadId={threadId} />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <h3 className="font-bold text-sm mb-2 uppercase text-gray-500 tracking-wider">About Community</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {subforum?.description || 'Welcome to this community!'}
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
            </div>
            <SubforumSidebar subforums={subforums} />
          </div>
        </aside>
      </div>
    </div>
  );
}
