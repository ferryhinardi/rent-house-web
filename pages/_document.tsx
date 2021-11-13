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
    overflow: auto;
  }
`;

class RynaDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps({ renderPage }: NextPageContext & { renderPage: any }) {
    AppRegistry.registerComponent(config.name, () => Main);
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication(config.name);
    const page = await renderPage();
    const styles = [
      <style key={Math.random()} dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
          {/* new font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Abel&family=Playball&family=Playfair+Display:wght@400;600;700&family=Tenor+Sans&display=swap"
            rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RynaDocument;
