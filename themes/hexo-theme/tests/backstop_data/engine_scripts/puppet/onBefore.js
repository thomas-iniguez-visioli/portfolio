module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Wait for fonts to load
  await page.evaluateOnNewDocument(() => {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  });
  
  // Disable animations for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });
};