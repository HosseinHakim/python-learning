const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Tutorials data (same as in server.js)
const tutorials = [
  {
    id:  1,
    title:  'Getting Started with Python',
    description: 'Learn the basics of Python programming',
    content:  `
      <h2>Getting Started with Python</h2>
      <p>Python is a beginner-friendly programming language.  Here's how to get started: </p>
      <ol>
        <li>Download Python from python.org</li>
        <li>Install it on your computer</li>
        <li>Open a terminal or command prompt</li>
        <li>Type 'python --version' to verify installation</li>
      </ol>
      <h3>Your First Program</h3>
      <pre><code>print("Hello, World!")</code></pre>
    `
  },
  {
    id: 2,
    title: 'Variables and Data Types',
    description: 'Understanding variables and basic data types in Python',
    content: `
      <h2>Variables and Data Types</h2>
      <p>Variables are containers for storing data values. </p>
      <h3>Example: </h3>
      <pre><code>name = "Alice"
age = 25
height = 5.6
is_student = True

print(name)
print(age)
print(height)
print(is_student)</code></pre>
      <h3>Data Types:</h3>
      <ul>
        <li><strong>String: </strong> Text data (e.g., "Hello")</li>
        <li><strong>Integer:</strong> Whole numbers (e.g., 42)</li>
        <li><strong>Float:</strong> Decimal numbers (e.g., 3.14)</li>
        <li><strong>Boolean:</strong> True or False</li>
      </ul>
    `
  },
  {
    id:  3,
    title: 'If Statements',
    description: 'Making decisions in your code',
    content: `
      <h2>If Statements</h2>
      <p>If statements allow your program to make decisions. </p>
      <h3>Example:</h3>
      <pre><code>age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")</code></pre>
      <h3>Comparison Operators:</h3>
      <ul>
        <li>== (equal to)</li>
        <li>! = (not equal to)</li>
        <li>&gt; (greater than)</li>
        <li>&lt; (less than)</li>
        <li>&gt;= (greater than or equal to)</li>
        <li>&lt;= (less than or equal to)</li>
      </ul>
    `
  },
  {
    id: 4,
    title: 'Loops',
    description: 'Repeating code with loops',
    content: `
      <h2>Loops</h2>
      <p>Loops allow you to repeat code multiple times.</p>
      <h3>For Loop Example:</h3>
      <pre><code>for i in range(5):
    print(i)</code></pre>
      <h3>While Loop Example:</h3>
      <pre><code>count = 0
while count < 5:
    print(count)
    count += 1</code></pre>
      <p>The range() function generates numbers from 0 to the specified number (not including the last number).</p>
    `
  },
  {
    id: 5,
    title: 'Functions',
    description: 'Organizing code with functions',
    content: `
      <h2>Functions</h2>
      <p>Functions are reusable blocks of code. </p>
      <h3>Example:</h3>
      <pre><code>def greet(name):
    print(f"Hello, {name}!")

def add(a, b):
    return a + b

greet("Alice")
result = add(5, 3)
print(result)</code></pre>
      <h3>Key Points:</h3>
      <ul>
        <li>Use 'def' to define a function</li>
        <li>Functions can accept parameters</li>
        <li>Functions can return values</li>
        <li>Call a function by using its name with parentheses</li>
      </ul>
    `
  }
];

// Create dist folder
const distDir = path.join(__dirname, 'docs');  // Changed from 'dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy public files
console.log('Copying public files.. .');
const publicDir = path. join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  fs.readdirSync(publicDir).forEach(file => {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file}`);
  });
}

// Render index page
console.log('\nGenerating index.html...');
ejs.renderFile(
  path.join(__dirname, 'views/index.ejs'),
  { tutorials },
  (err, html) => {
    if (err) {
      console.error('Error rendering index. ejs:', err);
      return;
    }
    fs.writeFileSync(path.join(distDir, 'index. html'), html);
    console.log('✓ index.html created');
  }
);

// Render tutorial pages
console.log('\nGenerating tutorial pages...');
tutorials.forEach((tutorial) => {
  ejs.renderFile(
    path.join(__dirname, 'views/tutorial.ejs'),
    { tutorial },
    (err, html) => {
      if (err) {
        console.error(`Error rendering tutorial ${tutorial.id}:`, err);
        return;
      }
      fs.writeFileSync(path.join(distDir, `tutorial-${tutorial.id}.html`), html);
      console.log(`✓ tutorial-${tutorial.id}.html created`);
    }
  );
});

// Create 404 page
console.log('\nGenerating 404.html...');
ejs.renderFile(
  path.join(__dirname, 'views/404.ejs'),
  {},
  (err, html) => {
    if (err) {
      console.error('Error rendering 404.ejs:', err);
      return;
    }
    fs.writeFileSync(path.join(distDir, '404.html'), html);
    console.log('✓ 404.html created');
  }
);

console.log('\n✅ Build complete! Static files are in the "dist" folder.');