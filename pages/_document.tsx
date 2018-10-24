import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import { hydrate } from 'react-emotion';

if (typeof window !== 'undefined') {
  hydrate((window as any).__NEXT_DATA__.ids)
}

export default class App extends Document {
  public constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  public render(): JSX.Element {
    return (
      <html>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link
            rel="preload"
            as="font"
            href="https://fonts.googleapis.com/css?family=Hind:400,700" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

App.getInitialProps = ({ renderPage }) => {
  const page = renderPage();
  const styles = extractCritical(page.html);
  return {
    ...page,
    ...styles
  }
}
