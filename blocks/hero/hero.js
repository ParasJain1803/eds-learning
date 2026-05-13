export default function decorate(block) {
  // Make the hero image load early (important for page speed)
  const img = block.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.fetchpriority = 'high';
  }
}