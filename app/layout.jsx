import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "Bus Booking System",
    description: "Instantly pay bus fees from your seat."
}

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"></div>
                </div>

                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;