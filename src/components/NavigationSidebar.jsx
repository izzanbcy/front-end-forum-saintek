import { Link, useLocation } from 'react-router-dom';

export default function NavigationSidebar({ subforums = [] }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'Popular', path: '/popular', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )},
    { name: 'All', path: '/all', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )},
  ];

  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Feeds</h3>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Communities</h3>
        <ul className="space-y-1">
          {subforums.map((sub) => (
            <li key={sub.id}>
              <Link
                to={`/subforums/${sub.slug}`}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="w-5 h-5 mr-3 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold">
                  s/
                </span>
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
