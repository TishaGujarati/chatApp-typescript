import { AppProps } from 'next/app';
import SocketsProvider from '../context/socket.context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default MyApp;