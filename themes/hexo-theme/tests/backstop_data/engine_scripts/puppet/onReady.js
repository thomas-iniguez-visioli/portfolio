module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Wait for any lazy-loaded content
  await page.waitForTimeout(500);
  
  // Ensure all images are loaded
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      })
    );
  });
  
  // Wait for fonts to be fully loaded
  await page.evaluate(() => document.fonts.ready);
};