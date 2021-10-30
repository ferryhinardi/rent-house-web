import { Children } from 'react';
import { NextPageContext } from 'next';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';
import config from '../app.json';
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

class RynaDocument extends Document {
  static async getInitialProps({ renderPage }: NextPageContext & { renderPage: () => void }) {
    AppRegistry.registerComponent(config.name, () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication(config.name)
    const page = await renderPage()
    const styles = [
      <style key={Math.random()} dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ]
    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RynaDocument;
