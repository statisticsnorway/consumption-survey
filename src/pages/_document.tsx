import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet='utf-8'/>
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
                    <meta name='viewport'
                          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1'/>
                    <meta name='description' content='Description'/>
                    <meta name='keywords' content='Keywords'/>
                    <title>SSB Forbruksundersøkelse 2021</title>
                    <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
                    <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>

                    <link rel="icon" href='/favicon-16x16.png' type='image/png' sizes='16x16'/>
                    <link rel="icon" href='/favicon-32x32.png' type='image/png' sizes='32x32'/>
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                    <meta name="theme-color" content="#0b2e13"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
