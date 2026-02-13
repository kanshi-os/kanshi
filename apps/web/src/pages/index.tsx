import React from 'react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  lastSeen: string;
  tags: string[];
}

// Mock agent data
const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Research Agent',
    status: 'active',
    lastSeen: new Date().toISOString(),
    tags: ['research', 'production'],
  },
  {
    id: 'agent-002',
    name: 'Content Generator',
    status: 'inactive',
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    tags: ['content'],
  },
];

function AgentFeed() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Agent Feed</h2>
      <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0' }}>{agent.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{agent.id}</p>
              </div>
              <span
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  backgroundColor: agent.status === 'active' ? '#d1fae5' : '#f3f4f6',
                  color: agent.status === 'active' ? '#065f46' : '#374151',
                }}
              >
                {agent.status}
              </span>
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <p style={{ margin: '0.25rem 0' }}>Last seen: {new Date(agent.lastSeen).toLocaleString()}</p>
              <p style={{ margin: '0.25rem 0' }}>Tags: {agent.tags.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>Kanshi OS</h1>
        <p style={{ color: '#6b7280', margin: '0' }}>
          Control plane for AI agents — event ingestion, policy evaluation, and audit trails without runtime custody.
        </p>
      </header>

      <section style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>System Status</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#10b981' }}>●</p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>All systems operational</p>
        </div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Active Agents</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>2</p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>From {mockAgents.length} total</p>
        </div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Events Today</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>1,234</p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>Avg risk: 12</p>
        </div>
      </section>

      <AgentFeed />

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', color: '#9ca3af', fontSize: '0.875rem' }}>
        <p>
          <a href="https://github.com/kanshi-os/kanshi" style={{ color: '#3b82f6' }}>
            GitHub
          </a>
          {' • '}
          <a href="/docs" style={{ color: '#3b82f6' }}>
            Docs
          </a>
        </p>
      </footer>
    </main>
  );
}
