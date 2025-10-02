# -Bias-Audits-for-LMS-AI-demo
# 🔍⚖️ Bias Audits for LMS AI

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/python-v3.11+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18.2+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-00a393.svg)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg)](https://www.docker.com/)

> **Comprehensive bias detection and analysis platform for AI-powered learning management systems** - Ensuring fairness and equity in educational AI through advanced statistical analysis, real-time monitoring, and actionable insights.

## 🎯 Overview

Bias Audits for LMS AI is a comprehensive platform designed to detect, analyze, and mitigate bias in AI-driven educational systems. Built with cutting-edge statistical methods and modern web technologies, it provides educators, administrators, and researchers with the tools needed to ensure fair and equitable learning experiences for all students.

### 🌟 Key Features

- **🔬 Advanced Bias Detection**: Multi-dimensional analysis across gender, age, ethnicity, socioeconomic status, and intersectional attributes
- **📊 Interactive Visualizations**: Real-time dashboards with Plotly heatmaps, trend analysis, and demographic distributions
- **📈 Statistical Analysis**: Comprehensive statistical testing including ANOVA, t-tests, chi-square, effect sizes, and confidence intervals
- **⚡ Real-time Monitoring**: Live bias score tracking with automated alerts and notifications
- **🎨 Modern UI/UX**: Responsive React TypeScript dashboard with Ant Design components
- **📋 Comprehensive Reporting**: Export options in PDF, CSV, JSON, and Excel formats
- **🔧 Enterprise Ready**: Docker containerization, horizontal scaling, and monitoring capabilities

## 🎬 Demo & Screenshots

### 📺 YouTube Demo
> **[Watch the Complete Demo on YouTube](https://youtube.com/your-demo-link)**

### 🖼️ Dashboard Screenshots

| Overview Dashboard | Real-time Monitoring |
|:------------------:|:--------------------:|
| ![Overview](docs/images/overview-dashboard.png) | ![Monitoring](docs/images/realtime-monitoring.png) |

| Bias Heatmap | Demographic Analysis |
|:------------:|:-------------------:|
| ![Heatmap](docs/images/bias-heatmap.png) | ![Demographics](docs/images/demographic-analysis.png) |

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** with pip
- **Node.js 18+** with npm
- **Docker & Docker Compose**
- **PostgreSQL 15+** (or use Docker)
- **Redis 7+** (or use Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bias-audits-lms-ai.git
cd bias-audits-lms-ai
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configurations
nano .env
```

### 3. Docker Compose Setup (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Manual Setup (Development)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Database setup
alembic upgrade head

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm start
```

### 5. Access the Application

- 🌐 **Frontend Dashboard**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000
- 📖 **API Documentation**: http://localhost:8000/docs
- 📊 **Monitoring** (if enabled): http://localhost:3001

## 🏗️ Architecture

### System Overview

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React TypeScript Dashboard]
        B[Ant Design Components]
        C[Plotly Visualizations]
        D[Real-time WebSocket]
    end
    
    subgraph "API Layer"
        E[FastAPI Backend]
        F[WebSocket Handler]
        G[Authentication]
        H[Rate Limiting]
    end
    
    subgraph "Analysis Engine"
        I[Bias Detection Pipeline]
        J[Statistical Analysis]
        K[Visualization Generator]
        L[Report Builder]
    end
    
    subgraph "Data Layer"
        M[PostgreSQL Database]
        N[Redis Cache]
        O[File Storage]
        P[Audit Logs]
    end
    
    subgraph "Infrastructure"
        Q[Docker Containers]
        R[Nginx Load Balancer]
        S[Prometheus Monitoring]
        T[Grafana Dashboards]
    end
    
    A --> E
    B --> F
    C --> K
    D --> F
    E --> I
    I --> J
    J --> M
    K --> N
    E --> M
    F --> N
```

### Tech Stack

#### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Alembic**: Database migration tool
- **Celery**: Distributed task queue
- **Redis**: Caching and session storage
- **PostgreSQL**: Primary database

#### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Ant Design**: Professional UI components
- **Plotly.js**: Interactive visualizations
- **Socket.io**: Real-time communications

#### Analysis & ML
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **SciPy**: Scientific computing
- **Scikit-learn**: Machine learning
- **Fairlearn**: Fairness assessment
- **AIF360**: Bias detection toolkit

#### Infrastructure
- **Docker**: Containerization
- **Nginx**: Web server and reverse proxy
- **Prometheus**: Monitoring and alerting
- **Grafana**: Visualization and dashboards

## 📊 Bias Analysis Methodology

### Supported Bias Metrics

#### 1. Demographic Parity
```python
# Measures equal positive outcome rates across groups
demographic_parity_diff = max(group_rates) - min(group_rates)
passes_80_percent_rule = (min_rate / max_rate) >= 0.8
```

#### 2. Equality of Opportunity
```python
# Ensures equal true positive rates across groups
tpr_difference = max(group_tprs) - min(group_tprs)
equality_achieved = tpr_difference < 0.1
```

#### 3. Intersectional Analysis
- Multi-attribute bias detection
- Interaction effects analysis
- Compound disadvantage identification

#### 4. Statistical Significance Testing
- ANOVA for multiple groups
- T-tests for pairwise comparisons
- Chi-square tests for independence
- Effect size calculations (Cohen's d, η²)
- Multiple comparison corrections

### Analysis Pipeline

```python
# Example bias analysis workflow
from bias_analysis import ComprehensiveBiasAnalyzer

analyzer = ComprehensiveBiasAnalyzer()

# 1. Load and preprocess data
df = load_dataset("student_outcomes.csv")
df_clean = analyzer.preprocess_data(df)

# 2. Calculate bias metrics
bias_results = analyzer.calculate_demographic_parity(
    df_clean, 
    protected_attributes=['gender', 'age', 'ethnicity'],
    outcome_variable='completion_rate'
)

# 3. Statistical testing
stat_results = analyzer.perform_statistical_tests(
    df_clean, 
    protected_attributes=['gender', 'age', 'ethnicity'],
    outcome_variable='completion_rate'
)

# 4. Generate visualizations
visualizations = analyzer.create_bias_visualizations(bias_results)
```

## 📈 Data Sources & Integration

### Supported Data Formats
- **CSV Files**: Standard comma-separated values
- **Excel Files**: .xlsx and .xls formats
- **JSON**: Structured data format
- **Database Connections**: PostgreSQL, MySQL, SQLite
- **API Integrations**: REST APIs for real-time data

### LMS Integrations
- **Canvas**: Direct API integration
- **Blackboard**: Data export/import
- **Moodle**: Plugin support
- **Custom LMS**: RESTful API adapter

### Sample Data Structure
```json
{
  "student_id": "STU_001",
  "gender": "female",
  "age": 23,
  "ethnicity": "hispanic",
  "socioeconomic_status": "low",
  "course_id": "CS_101",
  "completion_rate": 0.85,
  "grade_average": 87.3,
  "time_to_completion": 14.5,
  "engagement_score": 0.78
}
```

## 🎨 Dashboard Features

### Real-time Monitoring
- **Live Bias Scores**: Continuously updated metrics
- **Automated Alerts**: Threshold-based notifications
- **Trend Analysis**: Historical pattern recognition
- **System Health**: Performance monitoring

### Interactive Visualizations

#### Bias Heatmap
```typescript
// Example heatmap configuration
const heatmapData = {
  z: biasScoreMatrix,
  x: ['Gender', 'Age', 'Ethnicity', 'Socioeconomic'],
  y: ['Completion Rate', 'Grade Average', 'Engagement'],
  type: 'heatmap',
  colorscale: 'RdYlBu_r'
};
```

#### Time Series Analysis
- 30-day bias trend tracking
- Comparative group analysis
- Seasonal pattern detection
- Intervention impact assessment

### Advanced Filtering
- **Multi-dimensional**: Filter by multiple attributes
- **Date Ranges**: Historical analysis periods
- **Threshold Settings**: Customizable bias sensitivity
- **Sample Size**: Minimum group size requirements

## 📋 API Documentation

### Core Endpoints

#### Generate Bias Audit
```http
POST /api/v1/audit/generate-report
Content-Type: application/json

{
  "dataset_id": "dataset_123",
  "protected_attributes": ["gender", "age", "ethnicity"],
  "outcome_variable": "completion_rate",
  "analysis_type": "comprehensive",
  "time_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

#### Get Audit Results
```http
GET /api/v1/audit/{audit_id}/results

Response:
{
  "audit_summary": {
    "audit_id": 12345,
    "dataset_name": "Computer Science Courses",
    "completion_time": "2024-01-15T10:30:00Z"
  },
  "bias_metrics": {
    "gender_bias": {
      "value": 0.087,
      "significance": 0.023,
      "interpretation": "Moderate gender bias detected"
    }
  },
  "visualizations": {
    "bias_heatmap": { /* Plotly chart data */ }
  }
}
```

#### Real-time Monitoring
```javascript
// WebSocket connection
const socket = io('/bias-monitoring');

socket.on('bias_update', (data) => {
  console.log('New bias score:', data.biasScore);
  updateDashboard(data);
});

socket.on('bias_alert', (alert) => {
  showNotification(alert);
});
```

### Export Endpoints
```http
GET /api/v1/audit/{audit_id}/export?format=pdf
GET /api/v1/audit/{audit_id}/export?format=csv
GET /api/v1/audit/{audit_id}/export?format=json
GET /api/v1/audit/{audit_id}/export?format=xlsx
```

## 🔧 Configuration

### Environment Variables

```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/bias_audit_db
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-jwt-key
ENVIRONMENT=production

# External APIs
OPENAI_API_KEY=sk-your-openai-key
HUGGINGFACE_API_KEY=hf_your-token

# Bias Analysis Settings
BIAS_THRESHOLD_LOW=0.05
BIAS_THRESHOLD_MEDIUM=0.1
BIAS_THRESHOLD_HIGH=0.2
MIN_SAMPLE_SIZE=30
CONFIDENCE_LEVEL=0.95

# Notifications
SENDGRID_API_KEY=SG.your-sendgrid-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
```

### Analysis Configuration
```yaml
# config/analysis.yml
bias_metrics:
  demographic_parity:
    enabled: true
    threshold: 0.1
    weight: 0.4
  
  equality_of_opportunity:
    enabled: true
    threshold: 0.1
    weight: 0.3

protected_attributes:
  - name: "gender"
    type: "categorical"
    values: ["male", "female", "non_binary"]
  
  - name: "age_group" 
    type: "ordinal"
    bins: ["18-25", "26-35", "36-45", "46+"]
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
pytest tests/ -v --cov=app --cov-report=html

# Frontend tests
cd frontend
npm test -- --coverage --watchAll=false

# End-to-end tests
npm run test:e2e
```

### Test Coverage
- **Backend**: >90% code coverage
- **Frontend**: >85% component coverage
- **Integration**: API endpoint testing
- **E2E**: Critical user flows

### Sample Test Case
```python
def test_demographic_parity_calculation():
    """Test demographic parity calculation accuracy"""
    analyzer = ComprehensiveBiasAnalyzer()
    
    # Test data with known bias
    test_data = pd.DataFrame({
        'gender': ['male', 'male', 'female', 'female'],
        'outcome': [0.9, 0.85, 0.75, 0.72]
    })
    
    result = analyzer.calculate_demographic_parity(
        test_data, ['gender'], 'outcome'
    )
    
    expected_diff = 0.875 - 0.735  # Expected difference
    assert abs(result['gender'].metric_value - expected_diff) < 0.001
```

## 📦 Deployment

### Docker Production Deployment

```bash
# Build and deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3 --scale celery-worker=2

# Monitor deployment
docker-compose ps
docker-compose logs -f backend
```

### Kubernetes Deployment

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bias-audit-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bias-audit-backend
  template:
    metadata:
      labels:
        app: bias-audit-backend
    spec:
      containers:
      - name: backend
        image: bias-audit/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
```

### Health Checks & Monitoring

```bash
# Health check endpoints
curl http://localhost:8000/health
curl http://localhost:8000/metrics  # Prometheus metrics
```



### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/bias-audits-lms-ai.git
cd bias-audits-lms-ai

# Create feature branch
git checkout -b feature/your-feature-name

# Set up development environment
./scripts/setup-dev.sh

# Make changes and test
npm run lint
npm run test
npm run type-check

# Submit pull request
git push origin feature/your-feature-name
```

### Code Standards
- **Python**: Black formatting, flake8 linting, type hints
- **TypeScript**: ESLint, Prettier, strict mode
- **Testing**: Comprehensive test coverage required
- **Documentation**: Update docs for new features



## 🔍 Use Cases

### Educational Institutions
- **Course Evaluation**: Assess fairness in AI-powered grading systems
- **Admission Processes**: Monitor bias in automated application reviews
- **Learning Platforms**: Ensure equitable content recommendations

### Corporate Training
- **Employee Development**: Fair assessment in corporate learning programs
- **Compliance Training**: Monitor bias in mandatory training completion
- **Performance Evaluation**: Ensure equitable skill assessments

### Research Applications
- **Educational Research**: Study bias patterns in learning technologies
- **Policy Development**: Inform regulations for AI in education
- **Methodology Validation**: Test bias detection algorithms

## 📊 Performance & Scalability

### System Specifications
- **Data Processing**: 1M+ records per hour
- **Response Time**: <200ms API response average
- **Concurrent Users**: 1000+ simultaneous dashboard users
- **Storage**: Scalable PostgreSQL with read replicas

### Optimization Features
- **Caching**: Redis for frequently accessed data
- **Background Processing**: Celery for large dataset analysis
- **CDN Integration**: Static asset optimization
- **Database Indexing**: Optimized query performance

## 🛡️ Security & Privacy

### Data Protection
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control
- **Audit Logging**: Complete action tracking

### Privacy Compliance
- **GDPR**: Right to erasure and data portability
- **FERPA**: Educational records protection
- **HIPAA**: Healthcare data compliance ready
- **Data Anonymization**: Automatic PII scrubbing

### Security Best Practices
```python
# Example security implementation
from security import encrypt_sensitive_data, audit_log

@audit_log("bias_analysis_access")
@require_permission("view_bias_data")
async def get_bias_analysis(user: User, dataset_id: str):
    # Encrypt sensitive fields
    data = encrypt_sensitive_data(raw_data)
    return BiasAnalysisResponse(data)
```

## 🚨 Monitoring & Alerts

### Real-time Alerts
- **High Bias Detection**: Automated notifications when thresholds exceeded
- **System Health**: Performance degradation alerts
- **Data Quality**: Missing or inconsistent data warnings
- **Security Events**: Unauthorized access attempts

### Monitoring Dashboard
```yaml
# Grafana dashboard configuration
dashboard:
  title: "Bias Audit System Monitoring"
  panels:
    - title: "Bias Detection Rate"
      type: "graph"
      metrics: ["bias_detections_per_minute"]
    
    - title: "API Response Time"
      type: "graph" 
      metrics: ["api_response_time_percentile"]
    
    - title: "Active Users"
      type: "singlestat"
      metrics: ["active_dashboard_users"]
```


### Community Guidelines
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Share knowledge and resources

## 📄 License

Copyright (c) 2025 MONTEYcodes. All rights reserved.

This software and associated documentation files (the "Software") are proprietary 
to MONTEYcodes and are protected by copyright law.

VIEWING PERMITTED: This code is available for viewing, educational, and 
evaluation purposes only.

RESTRICTIONS:
- No commercial use without explicit written permission from MONTEYcodes
- No redistribution, modification, or derivative works
- No reverse engineering or decompilation
- No use in production environments without valid license


```

## 🙏 Acknowledgments

- **Fairlearn Team**: For the foundational fairness metrics library
- **AIF360 Contributors**: For comprehensive bias detection algorithms  
- **React & Ant Design Communities**: For excellent UI/UX components
- **Plotly Team**: For powerful visualization capabilities
- **FastAPI Community**: For the modern Python web framework
- **Open Source Community**: For continuous inspiration and collaboration

## 📈 Roadmap

### Q1 2024
- [x] Core bias detection engine
- [x] React TypeScript dashboard
- [x] Docker containerization
- [x] Basic statistical analysis

### Q2 2024
- [ ] Advanced ML fairness metrics
- [ ] Causal inference analysis
- [ ] Mobile-responsive design
- [ ] API marketplace integrations

### Q3 2024
- [ ] Multi-tenant architecture
- [ ] Advanced visualization types
- [ ] Automated bias mitigation
- [ ] Integration with major LMS platforms

### Q4 2024
- [ ] AI-powered bias explanations
- [ ] Predictive bias modeling
- [ ] Regulatory compliance automation
- [ ] Global localization support

---

<div align="center">


---

Made with ❤️ by the MonteyAI LLC

</div>
