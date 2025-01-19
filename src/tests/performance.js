import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

// Custom metrics for Grafana visualization
const customTrend = new Trend('custom_trend');
const customCounter = new Counter('custom_counter');

// Test configuration
export const options = {
  // Configure thresholds for Grafana alerts
  thresholds: {
    http_req_failed: ['rate<0.01'],  // Error rate should be less than 1%
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    custom_trend: ['p(95)<500'],      // Custom metric threshold
  },
  // Configure scenarios for different load patterns
  scenarios: {
    average_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 20 },   // Ramp up to 20 users
        { duration: '3m', target: 20 },   // Stay at 20 users
        { duration: '1m', target: 0 },    // Ramp down to 0
      ],
    },
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 100 },  // Ramp up to 100 users
        { duration: '5m', target: 100 },  // Stay at 100 users
        { duration: '2m', target: 0 },    // Ramp down to 0
      ],
    },
  },
};

// Default function that will be executed for each VU
export default function () {
  // Test homepage load
  const homeResponse = http.get('http://localhost:3000/');
  check(homeResponse, {
    'homepage status is 200': (r) => r.status === 200,
  });
  customTrend.add(homeResponse.timings.duration);
  customCounter.add(1);

  // Test search functionality
  const searchResponse = http.get('http://localhost:3000/api/search?q=test');
  check(searchResponse, {
    'search status is 200': (r) => r.status === 200,
  });
  customTrend.add(searchResponse.timings.duration);
  
  sleep(1);
} 