# Cross-Browser Testing Suite

This testing suite ensures the Hexo developer theme works consistently across all target browsers and meets performance and accessibility standards.

## Test Types

### 1. Visual Testing (Playwright)
- **Purpose**: Ensures consistent rendering across browsers
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Command**: `npm run test:visual`
- **Output**: HTML report with screenshots

### 2. Performance Testing (Lighthouse)
- **Purpose**: Validates Core Web Vitals and performance metrics
- **Metrics**: FCP, LCP, CLS, FID, Speed Index, TBT
- **Command**: `npm run test:performance`
- **Output**: JSON report with detailed metrics

### 3. Accessibility Testing (axe-core)
- **Purpose**: Ensures WCAG 2.1 AA compliance
- **Tests**: Screen reader compatibility, keyboard navigation, color contrast
- **Command**: `npm run test:accessibility`
- **Output**: JSON report with violations and recommendations

### 4. Regression Testing (BackstopJS)
- **Purpose**: Detects visual regressions between releases
- **Command**: `npm run test:regression`
- **Output**: HTML report with before/after comparisons

## Setup

1. Install dependencies:
```bash
cd themes/hexo-theme/tests
npm install
```

2. Start the test server:
```bash
npm run serve:test
```

3. Run all tests:
```bash
npm test
```

## Individual Test Commands

```bash
# Visual tests only
npm run test:visual

# Performance tests only
npm run test:performance

# Accessibility tests only
npm run test:accessibility

# Regression tests only
npm run test:regression

# Create new regression baseline
npm run test:reference

# Approve regression changes
npm run test:approve
```

## Browser Support Matrix

| Browser | Version | Desktop | Mobile |
|---------|---------|---------|--------|
| Chrome  | 90+     | ✅      | ✅     |
| Firefox | 88+     | ✅      | ❌     |
| Safari  | 14+     | ✅      | ✅     |
| Edge    | 90+     | ✅      | ❌     |

## Performance Thresholds

| Metric | Threshold |
|--------|-----------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| First Input Delay | < 100ms |
| Speed Index | < 3s |
| Total Blocking Time | < 200ms |

## Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio ≥ 4.5:1
- Focus indicators visible
- Semantic HTML structure

## CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Run Cross-Browser Tests
  run: |
    cd themes/hexo-theme/tests
    npm install
    npm test
```

## Troubleshooting

### Common Issues

1. **Tests failing on CI**: Ensure headless mode is enabled
2. **Screenshot differences**: Check font loading and animations
3. **Performance variations**: Run tests multiple times for consistency
4. **Accessibility false positives**: Review axe-core rules configuration

### Debug Mode

Enable debug output:
```bash
DEBUG=true npm test
```

## Reports Location

- Visual: `test-results/`
- Performance: `reports/performance-report.json`
- Accessibility: `reports/accessibility-report.json`
- Regression: `backstop_data/html_report/`