
import { ConfigProvider } from 'antd';
import BiasAuditDashboard from './components/BiasAuditDashboard';
import './App.css';

// Configure Ant Design theme
const theme = {
  token: {
    colorPrimary: '#3b82f6',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    borderRadius: 8,
    fontSize: 14,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <BiasAuditDashboard />
      </div>
    </ConfigProvider>
  );
}

export default App;