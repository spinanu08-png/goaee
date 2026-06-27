import './globals.css';

export const metadata = {
  title: 'Stock Count App',
  description: 'Simple stock counting web app with MongoDB'
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
