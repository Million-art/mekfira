// src/components/NotFound.jsx
 import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex align-middle justify-center h-screen w-screen'>
        <div className="flex flex-col  items-center justify-center h-screen">

        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go Back to Home
        </Link>
        </div>
    </div>
  );
};

export default NotFound;
