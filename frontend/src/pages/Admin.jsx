import { useState, useEffect } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const [usersRes, appsRes, activeUsersRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/users', { headers }),
        fetch('http://localhost:5000/api/admin/applications', { headers }),
        fetch('http://localhost:5000/api/admin/active-users', { headers })
      ]);
      
      if (usersRes.ok) setUsers(await usersRes.json());
      if (appsRes.ok) setApplications(await appsRes.json());
      if (activeUsersRes.ok) setActiveUsers(await activeUsersRes.json());
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading admin data...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Active Users ({activeUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Applications ({applications.length})
          </button>
        </nav>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600">{user.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.education || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          📧 {user.email}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          📍 {user.location_preference || 'Not specified'}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Skills: {user.skills || 'None listed'}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Sector: {user.sector_preference || 'Not specified'} | 
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'active' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-3 bg-green-50 border-b">
            <h3 className="text-lg font-medium text-green-800">Users Active in Last 7 Days</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {activeUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600">{user.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Online
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          📧 {user.email}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          📍 {user.location_preference || 'Not specified'}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Last seen: {new Date(user.last_login).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Skills: {user.skills || 'None listed'} | 
                      Applications: {user.application_count || 0}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600">{app.user_name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-900">{app.internship_title}</p>
                      <p className="text-sm text-gray-500">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;