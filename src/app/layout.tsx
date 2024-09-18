import { Providers } from '../component/Providers/providers'
import bg from '../bg.jpg'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='it'>
      <body style={{ position: 'relative', margin: 0, padding: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            backgroundColor: "#2f2f2f",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            width: '100%',
            height: '100vh',
          }}
        >
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}