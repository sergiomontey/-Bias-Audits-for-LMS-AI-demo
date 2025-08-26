/**
 * Bias Audits for LMS AI - Demo Dashboard
 * ======================================
 *
 * Complete React TypeScript dashboard with realistic dummy data
 * for YouTube demonstration and proof of concept.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card, Row, Col, Select, DatePicker, Button, Slider,
  Statistic, Alert, Timeline, Badge, Progress, Tabs, Table, Tooltip,
  Space, Modal, Switch, Tag, Typography
} from 'antd';
import {
  ExclamationCircleOutlined, CheckCircleOutlined,
  DownloadOutlined, ReloadOutlined, FilterOutlined, AlertOutlined,
  WarningOutlined, EyeOutlined, PlayCircleOutlined, PauseCircleOutlined
} from '@ant-design/icons';
import Plot from 'react-plotly.js';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Types
interface BiasMetric {
  name: string;
  value: number;
  pValue: number;
  status: 'excellent' | 'moderate' | 'high-risk';
  interpretation: string;
  trend: 'uptrend' | 'stable' | 'dropping';
}

interface AlertItem {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  metric: string;
}

interface DemographicData {
  gender: { male: number; female: number; 'non-binary': number };
  age: { '18-25': number; '26-35': number; '36-45': number; '46+': number };
  ethnicity: { white: number; black: number; hispanic: number; asian: number; other: number };
}

// Dummy Data Generation
const generateDummyData = () => {
  const biasMetrics: BiasMetric[] = [
    {
      name: 'Gender Bias',
      value: 0.087,
      pValue: 0.023,
      status: 'moderate',
      interpretation: 'Moderate gender bias detected in course completion rates',
      trend: 'uptrend'
    },
    {
      name: 'Age Discrimination',
      value: 0.156,
      pValue: 0.001,
      status: 'high-risk',
      interpretation: 'Significant age-based disparities in grade distributions',
      trend: 'dropping'
    },
    {
      name: 'Ethnic Fairness',
      value: 0.043,
      pValue: 0.124,
      status: 'excellent',
      interpretation: 'No significant ethnic bias detected',
      trend: 'stable'
    },
    {
      name: 'Socioeconomic Impact',
      value: 0.112,
      pValue: 0.008,
      status: 'high-risk',
      interpretation: 'Concerning socioeconomic disparities in learning outcomes',
      trend: 'dropping'
    }
  ];

  const alerts: AlertItem[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      severity: 'high',
      title: 'Age Bias Threshold Exceeded',
      message: 'Completion rate gap between age groups exceeded 15%',
      metric: 'age_discrimination'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      severity: 'medium',
      title: 'Gender Performance Gap',
      message: 'Statistical significance detected in grade distributions',
      metric: 'gender_bias'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      severity: 'low',
      title: 'Sample Size Warning',
      message: 'Insufficient data for reliable analysis in Computer Science course',
      metric: 'sample_size'
    }
  ];

  const demographicData: DemographicData = {
    gender: { male: 2847, female: 3156, 'non-binary': 97 },
    age: { '18-25': 2890, '26-35': 2045, '36-45': 998, '46+': 167 },
    ethnicity: { white: 2456, black: 1234, hispanic: 1456, asian: 789, other: 165 }
  };

  // Generate time series data
  const dates = Array.from({ length: 30 }, (_, i) =>
    dayjs().subtract(29 - i, 'day').toDate()
  );

  const timeSeriesData = dates.map((date, i) => ({
    date,
    overall_bias: 0.08 + Math.sin(i * 0.2) * 0.02 + Math.random() * 0.01,
    gender_bias: 0.087 + Math.sin(i * 0.15) * 0.015 + Math.random() * 0.008,
    age_bias: 0.156 - i * 0.002 + Math.random() * 0.01,
    ethnic_bias: 0.043 + Math.random() * 0.005,
    socioeconomic_bias: 0.112 + Math.sin(i * 0.1) * 0.02 + Math.random() * 0.008
  }));

  return { biasMetrics, alerts, demographicData, timeSeriesData };
};

type Viz = { data: any; layout: any } | null;

const BiasAuditDashboard: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [selectedVisualization, setSelectedVisualization] = useState<Viz>(null);
  const [filters, setFilters] = useState({
    protectedAttributes: ['gender', 'age'] as string[],
    outcomeVariable: 'completion_rate',
    dateRange: [dayjs().subtract(30, 'days'), dayjs()] as [Dayjs, Dayjs],
    biasThreshold: 0.1,
    minimumSampleSize: 30
  });

  // Generate dummy data
  const { biasMetrics, alerts, demographicData, timeSeriesData } = useMemo(
    () => generateDummyData(),
    []
  );

  // Real-time simulation
  const [currentBiasScore, setCurrentBiasScore] = useState(0.092);
  const [realtimeData, setRealtimeData] = useState(timeSeriesData);

  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      const newScore = 0.092 + (Math.random() - 0.5) * 0.02;
      setCurrentBiasScore(Math.max(0, Math.min(0.3, newScore)));

      setRealtimeData(prev => [
        ...prev.slice(1),
        {
          date: new Date(),
          overall_bias: newScore,
          gender_bias: 0.087 + (Math.random() - 0.5) * 0.01,
          age_bias: 0.156 + (Math.random() - 0.5) * 0.015,
          ethnic_bias: 0.043 + (Math.random() - 0.5) * 0.005,
          socioeconomic_bias: 0.112 + (Math.random() - 0.5) * 0.02
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  // Helpers
  const getBiasStatus = (score: number) => {
    if (score < 0.05) return { status: 'success' as const, text: 'Excellent', color: '#52c41a' };
    if (score < 0.1) return { status: 'warning' as const, text: 'Moderate', color: '#faad14' };
    return { status: 'error' as const, text: 'High Risk', color: '#f5222d' };
  };

  const getTrendIcon = (trend: BiasMetric['trend']) => {
    switch (trend) {
      case 'uptrend':
        return <WarningOutlined style={{ color: '#52c41a' }} />;
      case 'dropping':
        return <WarningOutlined style={{ color: '#f5222d', transform: 'rotate(180deg)' }} />;
      default:
        return <WarningOutlined style={{ color: '#faad14', transform: 'rotate(90deg)' }} />;
    }
  };

  // Visualizations
  const createBiasHeatmap = () => {
    const attributes = ['Gender', 'Age', 'Ethnicity', 'Socioeconomic'];
    const metrics = ['Completion Rate', 'Grade Average', 'Time to Complete', 'Engagement'];

    const z = [
      [0.087, 0.034, 0.021, 0.045],
      [0.156, 0.189, 0.134, 0.167],
      [0.043, 0.012, 0.008, 0.019],
      [0.112, 0.145, 0.098, 0.123]
    ];

    return {
      data: [
        {
          z,
          x: metrics,
          y: attributes,
          type: 'heatmap' as const,
          colorscale: [
            [0, '#2E8B57'],
            [0.25, '#90EE90'],
            [0.5, '#FFFF00'],
            [0.75, '#FF6347'],
            [1, '#DC143C']
          ],
          hoverongaps: false,
          hovertemplate: '<b>%{y}</b><br><b>%{x}</b><br>Bias Score: %{z:.3f}<extra></extra>'
        }
      ],
      layout: {
        title: 'Bias Analysis Heatmap',
        xaxis: { title: 'Outcome Metrics' },
        yaxis: { title: 'Protected Attributes' },
        height: 400
      }
    };
  };

  const createDemographicChart = () => {
    const data = [
      {
        labels: Object.keys(demographicData.gender),
        values: Object.values(demographicData.gender),
        type: 'pie' as const,
        name: 'Gender',
        domain: { x: [0, 0.48] },
        marker: { colors: ['#1f77b4', '#ff7f0e', '#2ca02c'] }
      },
      {
        labels: Object.keys(demographicData.age),
        values: Object.values(demographicData.age),
        type: 'pie' as const,
        name: 'Age Groups',
        domain: { x: [0.52, 1] },
        marker: { colors: ['#d62728', '#9467bd', '#8c564b', '#e377c2'] }
      }
    ];

    const layout = {
      title: 'Demographic Distribution',
      height: 400,
      showlegend: true,
      annotations: [
        {
          text: 'Gender',
          x: 0.24,
          y: 1.1,
          xref: 'paper' as const,
          yref: 'paper' as const,
          showarrow: false,
          font: { size: 16 }
        },
        {
          text: 'Age Groups',
          x: 0.76,
          y: 1.1,
          xref: 'paper' as const,
          yref: 'paper' as const,
          showarrow: false,
          font: { size: 16 }
        }
      ]
    };

    return { data, layout };
  };

  const createTrendChart = () => {
    const traces = [
      {
        x: realtimeData.map(d => d.date),
        y: realtimeData.map(d => d.overall_bias),
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: 'Overall Bias',
        line: { color: '#1f77b4', width: 3 }
      },
      {
        x: realtimeData.map(d => d.date),
        y: realtimeData.map(d => d.gender_bias),
        type: 'scatter' as const,
        mode: 'lines' as const,
        name: 'Gender Bias',
        line: { color: '#ff7f0e' }
      },
      {
        x: realtimeData.map(d => d.date),
        y: realtimeData.map(d => d.age_bias),
        type: 'scatter' as const,
        mode: 'lines' as const,
        name: 'Age Bias',
        line: { color: '#2ca02c' }
      },
      {
        x: realtimeData.map(d => d.date),
        y: realtimeData.map(d => d.ethnic_bias),
        type: 'scatter' as const,
        mode: 'lines' as const,
        name: 'Ethnic Bias',
        line: { color: '#d62728' }
      }
    ];

    const layout = {
      title: 'Real-time Bias Trends',
      xaxis: { title: 'Time' },
      yaxis: { title: 'Bias Score' },
      height: 400,
      hovermode: 'x unified' as const,
      shapes: [
        {
          type: 'line' as const,
          x0: realtimeData[0]?.date,
          x1: realtimeData[realtimeData.length - 1]?.date,
          y0: 0.05,
          y1: 0.05,
          line: { color: 'green', width: 2, dash: 'dash' }
        },
        {
          type: 'line' as const,
          x0: realtimeData[0]?.date,
          x1: realtimeData[realtimeData.length - 1]?.date,
          y0: 0.1,
          y1: 0.1,
          line: { color: 'orange', width: 2, dash: 'dash' }
        },
        {
          type: 'line' as const,
          x0: realtimeData[0]?.date,
          x1: realtimeData[realtimeData.length - 1]?.date,
          y0: 0.2,
          y1: 0.2,
          line: { color: 'red', width: 2, dash: 'dash' }
        }
      ]
    };

    return { data: traces, layout };
  };

  // Component renders
  const FilterPanel: React.FC = () => (
    <Card title={<><FilterOutlined /> Audit Configuration</>} size="small" style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Text strong>Protected Attributes</Text>
          <Select
            mode="multiple"
            placeholder="Select attributes"
            value={filters.protectedAttributes}
            onChange={(value) => setFilters(prev => ({ ...prev, protectedAttributes: value }))}
            style={{ width: '100%', marginTop: 8 }}
            options={[
              { label: 'Gender', value: 'gender' },
              { label: 'Age Group', value: 'age' },
              { label: 'Ethnicity', value: 'ethnicity' },
              { label: 'Socioeconomic Status', value: 'socioeconomic' }
            ]}
          />
        </Col>

        <Col span={4}>
          <Text strong>Outcome Variable</Text>
          <Select
            placeholder="Select outcome"
            value={filters.outcomeVariable}
            onChange={(value) => setFilters(prev => ({ ...prev, outcomeVariable: value }))}
            style={{ width: '100%', marginTop: 8 }}
            options={[
              { label: 'Completion Rate', value: 'completion_rate' },
              { label: 'Grade Average', value: 'grade_average' },
              { label: 'Time to Completion', value: 'time_to_completion' },
              { label: 'Engagement Score', value: 'engagement_score' }
            ]}
          />
        </Col>

        <Col span={6}>
          <Text strong>Date Range</Text>
          <RangePicker
            value={filters.dateRange}
            onChange={(dates) => {
              if (!dates || dates.length !== 2 || !dates[0] || !dates[1]) return;
              setFilters(prev => ({ ...prev, dateRange: [dates[0], dates[1]] as [Dayjs, Dayjs] }));
            }}
            style={{ width: '100%', marginTop: 8 }}
          />
        </Col>

        <Col span={4}>
          <Text strong>Bias Threshold: {filters.biasThreshold.toFixed(2)}</Text>
          <Slider
            min={0.01}
            max={0.3}
            step={0.01}
            value={filters.biasThreshold}
            onChange={(value) =>
              setFilters(prev => ({
                ...prev,
                biasThreshold: Array.isArray(value) ? Number(value[0]) : Number(value)
              }))
            }
            marks={{
              0.05: 'Low',
              0.1: 'Medium',
              0.2: 'High'
            }}
            style={{ marginTop: 8 }}
          />
        </Col>

        <Col span={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Refresh Analysis
            </Button>
            <Button icon={<DownloadOutlined />}>
              Export Report
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );

  const RealTimeMonitoring: React.FC = () => (
    <div>
      {/* Real-time Status */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Alert
            message={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span>Real-time Monitoring Active</span>
                <Switch
                  checked={realTimeEnabled}
                  onChange={setRealTimeEnabled}
                  checkedChildren={<PlayCircleOutlined />}
                  unCheckedChildren={<PauseCircleOutlined />}
                />
              </div>
            }
            type="success"
            icon={<CheckCircleOutlined />}
            showIcon
            closable={false}
          />
        </Col>
      </Row>

      {/* Current Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Current Bias Score"
              value={currentBiasScore}
              precision={4}
              valueStyle={{ color: getBiasStatus(currentBiasScore).color }}
              suffix={
                <Badge
                  status={getBiasStatus(currentBiasScore).status}
                  text={getBiasStatus(currentBiasScore).text}
                />
              }
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Active Alerts"
              value={alerts.length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: alerts.length > 0 ? '#f5222d' : '#52c41a' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Data Points Analyzed"
              value={6100}
              prefix={<WarningOutlined />}
              suffix="records"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="System Health"
              value={99.9}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Real-time Chart */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={18}>
          <Card title="Real-time Bias Monitoring">
            <Plot
              data={createTrendChart().data}
              layout={createTrendChart().layout}
              config={{ responsive: true }}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>

        {/* Recent Alerts */}
        <Col span={6}>
          <Card title="Recent Alerts" size="small">
            <Timeline size="small">
              {alerts.map((alert) => (
                <Timeline.Item
                  key={alert.id}
                  color={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'orange' : 'blue'}
                  dot={<ExclamationCircleOutlined style={{ fontSize: '16px' }} />}
                >
                  <div>
                    <Text strong>{alert.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {alert.message}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      {alert.timestamp.toLocaleTimeString()}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const OverviewTab: React.FC = () => (
    <div>
      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {biasMetrics.map((metric) => (
          <Col span={6} key={metric.name}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Statistic
                    title={metric.name}
                    value={metric.value}
                    precision={4}
                    valueStyle={{
                      color: getBiasStatus(metric.value).color,
                      fontSize: '24px'
                    }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Tag color={metric.status === 'excellent' ? 'green' : metric.status === 'moderate' ? 'orange' : 'red'}>
                      {getBiasStatus(metric.value).text}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: '12px', marginLeft: 8 }}>
                      p = {metric.pValue.toFixed(3)}
                    </Text>
                  </div>
                </div>
                <Tooltip title={`Trend: ${metric.trend}`}>
                  {getTrendIcon(metric.trend)}
                </Tooltip>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Visualizations */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card
            title="Bias Analysis Heatmap"
            extra={
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => setSelectedVisualization(createBiasHeatmap())}
              >
                Full View
              </Button>
            }
          >
            <Plot
              data={createBiasHeatmap().data}
              layout={{ ...createBiasHeatmap().layout, height: 300 }}
              config={{ responsive: true }}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Demographic Distribution"
            extra={
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => setSelectedVisualization(createDemographicChart())}
              >
                Full View
              </Button>
            }
          >
            <Plot
              data={createDemographicChart().data}
              layout={{ ...createDemographicChart().layout, height: 300 }}
              config={{ responsive: true }}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Detailed Results Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Detailed Bias Analysis Results">
            <Table
              dataSource={biasMetrics.map((metric, index) => ({
                key: index,
                metric: metric.name,
                value: metric.value,
                pValue: metric.pValue,
                status: metric.status,
                interpretation: metric.interpretation,
                trend: metric.trend
              }))}
              columns={[
                {
                  title: 'Bias Metric',
                  dataIndex: 'metric',
                  key: 'metric',
                  width: 150
                },
                {
                  title: 'Bias Score',
                  dataIndex: 'value',
                  key: 'value',
                  render: (value: number) => (
                    <Text style={{ color: getBiasStatus(value).color, fontWeight: 600 }}>
                      {value.toFixed(4)}
                    </Text>
                  ),
                  width: 120
                },
                {
                  title: 'P-Value',
                  dataIndex: 'pValue',
                  key: 'pValue',
                  render: (value: number) => (
                    <Text style={{ color: value < 0.05 ? '#f5222d' : '#52c41a' }}>
                      {value.toFixed(4)}
                    </Text>
                  ),
                  width: 100
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: BiasMetric['status']) => (
                    <Badge
                      status={status === 'excellent' ? 'success' : status === 'moderate' ? 'warning' : 'error'}
                      text={status === 'excellent' ? 'Excellent' : status === 'moderate' ? 'Moderate' : 'High Risk'}
                    />
                  ),
                  width: 120
                },
                {
                  title: 'Trend',
                  dataIndex: 'trend',
                  key: 'trend',
                  render: (trend: BiasMetric['trend']) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {getTrendIcon(trend)}
                      <Text>{trend}</Text>
                    </div>
                  ),
                  width: 100
                },
                {
                  title: 'Interpretation',
                  dataIndex: 'interpretation',
                  key: 'interpretation',
                  ellipsis: true
                }
              ]}
              size="small"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Row style={{ marginBottom: 24 }}>
        <Col span={18}>
          <Title level={1} style={{ margin: 0, color: '#1f2937' }}>
            🔍⚖️ Bias Audits for LMS AI
          </Title>
          <Text type="secondary" style={{ fontSize: '18px' }}>
            Comprehensive bias detection and analysis for AI-powered learning management systems
          </Text>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Space>
            <Button icon={<DownloadOutlined />} type="primary">
              Export Dashboard
            </Button>
            <Badge count={alerts.length} offset={[-5, 5]}>
              <Button icon={<AlertOutlined />}>
                Alerts
              </Button>
            </Badge>
          </Space>
        </Col>
      </Row>

      {/* Filter Panel */}
      <FilterPanel />

      {/* Main Dashboard Tabs (AntD v5 items API) */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        size="large"
        items={[
          {
            key: 'overview',
            label: '📊 Overview & Analysis',
            children: <OverviewTab />
          },
          {
            key: 'monitoring',
            label: '📈 Real-time Monitoring',
            children: <RealTimeMonitoring />
          },
          {
            key: 'mitigation',
            label: '🎯 Bias Mitigation',
            children: (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Bias Mitigation Recommendations">
                    <Timeline>
                      <Timeline.Item color="red" dot={<ExclamationCircleOutlined />}>
                        <div>
                          <Text strong>Priority Action: Address Age Discrimination</Text>
                          <p>Implement age-blind grading mechanisms and review course material accessibility for different age groups. Consider adaptive learning paths that don't penalize slower-paced learners.</p>
                          <Progress percent={30} status="active" size="small" />
                        </div>
                      </Timeline.Item>

                      <Timeline.Item color="orange">
                        <div>
                          <Text strong>Review Socioeconomic Barriers</Text>
                          <p>Analyze resource requirements and time commitments that may disadvantage students from lower socioeconomic backgrounds. Consider providing additional support materials.</p>
                          <Progress percent={15} size="small" />
                        </div>
                      </Timeline.Item>

                      <Timeline.Item color="blue">
                        <div>
                          <Text strong>Gender Bias Monitoring</Text>
                          <p>Continue monitoring gender-based performance gaps. Implement diverse examples and case studies in course materials to ensure representation.</p>
                          <Progress percent={60} size="small" />
                        </div>
                      </Timeline.Item>

                      <Timeline.Item color="green">
                        <div>
                          <Text strong>Maintain Ethnic Fairness Standards</Text>
                          <p>Current ethnic fairness levels are excellent. Continue regular monitoring and maintain diverse content representation.</p>
                          <Progress percent={90} size="small" />
                        </div>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </Col>
              </Row>
            )
          },
          {
            key: 'history',
            label: '📋 Audit History',
            children: (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Previous Audit Reports">
                    <Table
                      dataSource={[
                        {
                          key: '1',
                          auditId: 'AUDIT-2024-001',
                          date: '2024-01-15',
                          dataset: 'Computer Science Courses',
                          overallScore: 0.087,
                          status: 'Completed',
                          issues: 2,
                          trend: 'uptrend'
                        },
                        {
                          key: '2',
                          auditId: 'AUDIT-2024-002',
                          date: '2024-01-08',
                          dataset: 'Mathematics Courses',
                          overallScore: 0.156,
                          status: 'Completed',
                          issues: 4,
                          trend: 'dropping'
                        },
                        {
                          key: '3',
                          auditId: 'AUDIT-2024-003',
                          date: '2024-01-01',
                          dataset: 'Language Arts Courses',
                          overallScore: 0.043,
                          status: 'Completed',
                          issues: 0,
                          trend: 'stable'
                        }
                      ]}
                      columns={[
                        {
                          title: 'Audit ID',
                          dataIndex: 'auditId',
                          key: 'auditId',
                          render: (text: string) => <Text code>{text}</Text>
                        },
                        {
                          title: 'Date',
                          dataIndex: 'date',
                          key: 'date'
                        },
                        {
                          title: 'Dataset',
                          dataIndex: 'dataset',
                          key: 'dataset'
                        },
                        {
                          title: 'Overall Score',
                          dataIndex: 'overallScore',
                          key: 'overallScore',
                          render: (score: number) => (
                            <Text style={{ color: getBiasStatus(score).color, fontWeight: 600 }}>
                              {score.toFixed(3)}
                            </Text>
                          )
                        },
                        {
                          title: 'Status',
                          dataIndex: 'status',
                          key: 'status',
                          render: (status: string) => (
                            <Badge status="success" text={status} />
                          )
                        },
                        {
                          title: 'Issues Found',
                          dataIndex: 'issues',
                          key: 'issues',
                          render: (issues: number) => (
                            <Tag color={issues === 0 ? 'green' : issues < 3 ? 'orange' : 'red'}>
                              {issues} issues
                            </Tag>
                          )
                        },
                        {
                          title: 'Trend',
                          dataIndex: 'trend',
                          key: 'trend',
                          render: (trend: BiasMetric['trend']) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {getTrendIcon(trend)}
                              <Text>{trend}</Text>
                            </div>
                          )
                        },
                        {
                          title: 'Actions',
                          key: 'actions',
                          render: () => (
                            <Space>
                              <Button size="small" icon={<EyeOutlined />}>View</Button>
                              <Button size="small" icon={<DownloadOutlined />}>Export</Button>
                            </Space>
                          )
                        }
                      ]}
                    />
                  </Card>
                </Col>
              </Row>
            )
          }
        ]}
      />

      {/* Full-screen Visualization Modal */}
      <Modal
        title="Full Visualization View"
        open={!!selectedVisualization}
        onCancel={() => setSelectedVisualization(null)}
        footer={null}
        width="90%"
        style={{ top: 20 }}
      >
        {selectedVisualization && (
          <Plot
            data={selectedVisualization.data}
            layout={{
              ...selectedVisualization.layout,
              height: 600
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default BiasAuditDashboard;
