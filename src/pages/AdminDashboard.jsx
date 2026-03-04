import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const quickActions = [
    {
      title: 'Add Listing',
      desc: 'Add a new property to the site',
      icon: 'fas fa-plus-circle',
      link: '/admin/add-listing',
      external: false,
      gradient: 'linear-gradient(135deg, #F69220 0%, #F05A22 100%)',
    },
    {
      title: 'View Site',
      desc: 'Go to the public website',
      icon: 'fas fa-external-link-alt',
      link: '/',
      external: true,
      gradient: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
    },
    {
      title: 'Properties',
      desc: 'Browse all listings',
      icon: 'fas fa-building',
      link: '/property',
      external: false,
      gradient: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <i className="fas fa-home me-2"></i>
          MyHome Admin
        </div>
        <nav className="admin-sidebar__nav">
          <Link to="/admin" className="admin-sidebar__link active">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/add-listing" className="admin-sidebar__link">
            <i className="fas fa-plus-circle"></i>
            <span>Add Listing</span>
          </Link>
          <a href="/" className="admin-sidebar__link" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i>
            <span>View Site</span>
          </a>
        </nav>
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="admin-sidebar__user-info">
              <span className="admin-sidebar__user-name">{user?.name || 'Admin'}</span>
              <span className="admin-sidebar__user-email">{user?.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-sidebar__logout">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-header__title">Welcome back, {user?.name || 'Admin'}</h1>
            <p className="admin-header__subtitle">Manage your real estate listings</p>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-section">
            <h2 className="admin-section__title">Quick Actions</h2>
            <div className="admin-cards">
              {quickActions.map((action, i) => {
                const cardContent = (
                  <>
                    <div className="admin-card__icon">
                      <i className={action.icon}></i>
                    </div>
                    <div className="admin-card__body">
                      <h3 className="admin-card__title">{action.title}</h3>
                      <p className="admin-card__desc">{action.desc}</p>
                    </div>
                    <i className="fas fa-arrow-right admin-card__arrow"></i>
                  </>
                );
                return action.external ? (
                  <a
                    key={i}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-card"
                    style={{ '--card-gradient': action.gradient }}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    key={i}
                    to={action.link}
                    className="admin-card"
                    style={{ '--card-gradient': action.gradient }}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="admin-section">
            <h2 className="admin-section__title">Getting Started</h2>
            <div className="admin-tips">
              <div className="admin-tip">
                <span className="admin-tip__num">1</span>
                <div>
                  <strong>Add a property</strong> — Use the Add Listing form to create new listings.
                </div>
              </div>
              <div className="admin-tip">
                <span className="admin-tip__num">2</span>
                <div>
                  <strong>View your site</strong> — Check how listings appear to visitors.
                </div>
              </div>
              <div className="admin-tip">
                <span className="admin-tip__num">3</span>
                <div>
                  <strong>Manage content</strong> — Edit or remove listings as needed.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f7fafc;
        }
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        .admin-sidebar__brand {
          padding: 1.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
        }
        .admin-sidebar__nav {
          flex: 1;
          padding: 1rem 0;
        }
        .admin-sidebar__link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: all 0.2s;
        }
        .admin-sidebar__link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .admin-sidebar__link.active {
          background: linear-gradient(90deg, #F69220, #F05A22);
          color: #fff;
        }
        .admin-sidebar__link i {
          width: 20px;
          text-align: center;
        }
        .admin-sidebar__footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .admin-sidebar__user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .admin-sidebar__avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #F69220, #F05A22);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-sidebar__user-info {
          display: flex;
          flex-direction: column;
        }
        .admin-sidebar__user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .admin-sidebar__user-email {
          font-size: 0.75rem;
          opacity: 0.8;
        }
        .admin-sidebar__logout {
          width: 100%;
          padding: 0.5rem;
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .admin-sidebar__logout:hover {
          background: rgba(229,62,62,0.8);
        }
        .admin-main {
          flex: 1;
          overflow-y: auto;
        }
        .admin-header {
          background: #fff;
          padding: 2rem 2.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .admin-header__title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.25rem 0;
        }
        .admin-header__subtitle {
          color: #718096;
          margin: 0;
          font-size: 1rem;
        }
        .admin-content {
          padding: 2rem 2.5rem;
        }
        .admin-section {
          margin-bottom: 2.5rem;
        }
        .admin-section__title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1.25rem;
        }
        .admin-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .admin-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition: all 0.25s ease;
          border: 1px solid #e2e8f0;
        }
        .admin-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.12);
          border-color: transparent;
        }
        .admin-card__icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--card-gradient);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .admin-card__body {
          flex: 1;
        }
        .admin-card__title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin: 0 0 0.25rem 0;
        }
        .admin-card__desc {
          font-size: 0.875rem;
          color: #718096;
          margin: 0;
        }
        .admin-card__arrow {
          color: #cbd5e0;
          font-size: 0.875rem;
          transition: transform 0.2s;
        }
        .admin-card:hover .admin-card__arrow {
          transform: translateX(4px);
          color: #F69220;
        }
        .admin-tips {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .admin-tip {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-tip:last-child {
          border-bottom: none;
        }
        .admin-tip__num {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #F69220, #F05A22);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
        }
        .admin-tip div {
          color: #4a5568;
          font-size: 0.95rem;
        }
        .admin-tip strong {
          color: #2d3748;
        }
        @media (max-width: 768px) {
          .admin-dashboard {
            flex-direction: column;
          }
          .admin-sidebar {
            width: 100%;
          }
          .admin-sidebar__nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .admin-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
