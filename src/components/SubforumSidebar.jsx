import { Link } from 'react-router-dom';

export default function SubforumSidebar({ subforums }) {
  const topSubforums = subforums.slice(0, 5);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="relative h-12 bg-blue-600 flex items-end px-4 pb-2">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider">Top Communities</h2>
      </div>
      <div className="p-2">
        {topSubforums.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {topSubforums.map((subforum, index) => (
              <li key={subforum.id}>
                <Link
                  to={`/subforums/${subforum.slug}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-4">{index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold shrink-0">
                      s/
                    </div>
                    <span className="text-gray-900 font-bold text-sm group-hover:underline">s/{subforum.name}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-xs font-bold transition-colors">
                    Join
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm p-4 italic text-center">No subforums found.</p>
        )}
        {subforums.length > 5 && (
          <button className="w-full mt-2 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            View All
          </button>
        )}
      </div>
    </div>
  );
}
