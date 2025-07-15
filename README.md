# Battery Data Visualization Dashboard

A modern, interactive web application for real-time battery monitoring and analysis. This dashboard fetches time-series data from a REST API and provides comprehensive visualization and analytics for battery performance metrics.

![Dashboard Preview](https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality
- **Real-time Data Fetching**: Automatically retrieves battery data from REST API
- **Interactive Time Series Plots**: Zoom, pan, and explore data with Chart.js
- **Multi-metric Visualization**: SOC, Voltage, Current, Power, and Energy analysis
- **Auto-refresh**: Updates every 30 seconds for continuous monitoring
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Analytics
- **Power Calculation**: Real-time power analysis (P = V × I)
- **Energy Metrics**: Cumulative energy consumption tracking
- **Ampere-hours Calculation**: Battery capacity utilization (Ah = I × t)
- **Cycle Detection**: Automatic charging/discharging cycle identification
- **Statistical Analysis**: Min/max/average values for all metrics
- **Battery Health Insights**: Comprehensive performance statistics

### User Experience
- **Clean, Modern UI**: Professional dashboard design with intuitive navigation
- **Loading States**: Smooth loading animations and error handling
- **Interactive Charts**: Hover tooltips with precise data points
- **Color-coded Metrics**: Visual distinction between different measurements
- **Time-based Navigation**: Easy exploration of historical data

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Charts**: Chart.js with React Chart.js 2 for interactive visualizations
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for time series processing
- **Code Quality**: ESLint with TypeScript support

## 📊 Data Visualization

### Chart Types
1. **SOC and Voltage vs Time**: Dual-axis chart showing battery state of charge and voltage
2. **Current vs Time**: Current flow analysis with positive/negative indicators
3. **Power vs Time**: Real-time power consumption/generation tracking
4. **Energy and Ampere-hours vs Time**: Cumulative energy metrics

### Interactive Features
- **Zoom Controls**: Mouse wheel and drag-to-zoom functionality
- **Pan Navigation**: Click and drag to explore different time ranges
- **Hover Tooltips**: Detailed information on data points
- **Legend Toggle**: Show/hide specific metrics
- **Time Scale**: Automatic time formatting based on data range

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── BatteryChart.tsx    # Interactive chart component
│   ├── Header.tsx          # Dashboard header with stats
│   ├── StatsCard.tsx       # Statistics display
│   ├── LoadingSpinner.tsx  # Loading state component
│   └── ErrorMessage.tsx    # Error handling component
├── services/           # API and data processing
│   └── batteryService.ts   # Data fetching and calculations
├── types/              # TypeScript type definitions
│   └── battery.ts          # Battery data interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

### Data Flow
1. **API Integration**: Fetch data from battery monitoring API
2. **Data Processing**: Transform raw data into structured format
3. **Statistical Analysis**: Calculate derived metrics and statistics
4. **Visualization**: Render interactive charts and displays
5. **Real-time Updates**: Continuous data refresh and state management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES2020 support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd battery-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📈 Key Metrics & Calculations

### Primary Metrics
- **SOC (State of Charge)**: Battery charge level percentage
- **Voltage**: Battery terminal voltage in volts
- **Current**: Current flow in amperes (positive = charging, negative = discharging)

### Derived Calculations
- **Power**: P = V × I (instantaneous power in watts)
- **Energy**: ∫P dt (cumulative energy in watt-hours)
- **Ampere-hours**: ∫I dt (cumulative charge in ampere-hours)
- **Charging Cycles**: Detected from SOC increase patterns
- **Discharging Cycles**: Detected from SOC decrease patterns

### Statistical Analysis
- Min/Max/Average values for all metrics
- Cycle counting for battery health assessment
- Real-time performance indicators

## 🎯 Assignment Requirements Fulfilled

### ✅ Core Requirements
- [x] Fetch data from provided API endpoint
- [x] Develop functional front-end application
- [x] Interactive time series plots for all required metrics
- [x] Clean, intuitive user interface
- [x] Zoom and pan functionality on charts

### ✅ Advanced Features
- [x] Ampere-hours calculation and visualization
- [x] Power analysis and energy tracking
- [x] Battery cycle detection
- [x] Comprehensive statistical analysis
- [x] Real-time data updates
- [x] Professional presentation and design

## 🔧 Configuration

### API Configuration
The application connects to the battery data API:
```
API Endpoint: https://batterydemoapi-521905205220.asia-south1.run.app/battery-data
Update Interval: 30 seconds
Data Format: JSON with timestamp, soc, voltage, current fields
```

### Chart Configuration
- **Time Scale**: Automatic formatting based on data range
- **Responsive**: Adapts to container size
- **Performance**: Optimized for large datasets
- **Accessibility**: Screen reader compatible

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project follows modern React development practices:
- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Performance optimization
- Error boundary implementation

## 📄 License

This project is developed as part of a technical assessment for battery monitoring system development.

---

**Developed with ⚡ by Bivishan**
*Demonstrating expertise in React, TypeScript, data visualization, and modern web development practices*