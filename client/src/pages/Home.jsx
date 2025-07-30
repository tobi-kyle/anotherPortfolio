import { Link } from 'react-router-dom'; 
import auth from '../lib/auth-helper';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center overflow-hidden px-4">
      <EnhancedFloatingCodeParticles count={25} />

      <div className="relative z-10 bg-black/40 backdrop-blur-md text-white p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg mb-6 text-slate-200 leading-relaxed">
          I craft responsive, scalable, and visually engaging web applications with a focus on performance and user experience.
        </p>
        <Link
          to="/about"
          className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Learn More About Me
        </Link>

        {auth.isAdmin() && (
          <div className="mt-6">
            <Link
              to="/admin"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function EnhancedFloatingCodeParticles({ count = 30 }) {
  const codeSnippets = [
    '<div />',
    'console.log("Hello")',
    'const [x, setX] = useState()',
    '<Route path="/home" />',
    'fetch("/api")',
    'useEffect(() => {})',
    'if (auth) {...}',
    '<Link to="/admin" />',
    'return <Home />',
    'map(item => ...)',
  ];

  const glowColors = ['#00ffff', '#ff66cc', '#99ff66', '#ffcc00', '#66ccff'];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const size = `${0.75 + Math.random() * 1.25}rem`;
        const duration = `${6 + Math.random() * 6}s`;
        const delay = `${Math.random() * 3}s`;
        const glow = glowColors[Math.floor(Math.random() * glowColors.length)];

        return (
          <div
            key={i}
            className="absolute text-white pointer-events-none"
            style={{
              top,
              left,
              fontSize: size,
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              zIndex: 0,
              color: glow,
              textShadow: `0 0 6px ${glow}, 0 0 10px ${glow}`,
              animation: `floatUp ${duration} ease-in-out ${delay} infinite`,
              opacity: 0.6,
            }}
          >
            {code}
          </div>
        );
      })}
    </>
  );
}
