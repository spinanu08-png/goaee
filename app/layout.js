import './globals.css';

export const metadata = {
  title: 'Calculator',
  description: 'Calculator app with Google login and MongoDB history'
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
