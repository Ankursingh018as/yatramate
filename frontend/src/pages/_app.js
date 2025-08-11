import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';
import Layout from '../layouts/Layout';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
