import { Link, useNavigate } from 'react-router-dom';
import VoteButton from './VoteButton';

export default function ThreadCard({ thread }) {
  const { id: threadId, title, content, createdAt, author, subforum, _count } = thread;
  const upvotes = _count?.votes || 0; // Backend currently only gives total votes in _count
  const downvotes = 0; 
  const userVote = null;
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Navigate to thread detail if the click wasn't on a link or button
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    navigate(`/threads/${threadId}`);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-md shadow-sm hover:border-gray-400 transition-colors duration-200 mb-4 overflow-hidden cursor-pointer flex"
      onClick={handleCardClick}
    >
      {/* Left side: Vote button column */}
      <div className="w-10 md:w-12 bg-gray-50 flex flex-col items-center py-2 shrink-0 border-r border-gray-100">
        <VoteButton
          threadId={threadId}
          initialUpvotes={upvotes}
          initialDownvotes={downvotes}
          initialUserVote={userVote}
          className="rounded-sm flex-col"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-2 md:p-3">
        <div className="flex items-center text-[10px] md:text-xs text-gray-500 mb-1 space-x-2">
          {subforum && (
            <Link to={`/subforums/${subforum.slug}`} className="font-bold text-gray-900 hover:underline">
              s/{subforum.name}
            </Link>
          )}
          <span>•</span>
          <span>Posted by u/{author?.username || 'anonymous'}</span>
          <span>•</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <Link to={`/threads/${threadId}`} className="block group">
          <h2 className="text-base md:text-lg font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{title}</h2>
        </Link>

        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {content}
        </p>

        <div className="flex items-center space-x-1 text-gray-500 text-[10px] md:text-xs font-bold">
          <Link to={`/threads/${threadId}`} className="flex items-center space-x-2 hover:bg-gray-100 p-1.5 md:px-2 rounded-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comments</span>
          </Link>
          <button className="flex items-center space-x-2 hover:bg-gray-100 p-1.5 md:px-2 rounded-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          <button className="hidden sm:flex items-center space-x-2 hover:bg-gray-100 p-1.5 md:px-2 rounded-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
