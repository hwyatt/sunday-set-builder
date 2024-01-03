import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            property="og:title"
            content="Build an Ableton Set in 60 seconds"
            key="ogtitle"
          />
          <meta
            property="og:description"
            content="Sunday Set Builder - a tool for Worship Pastors"
            key="ogdesc"
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/ySBt1Jm/SSB-Logo.png"
            key="ogimage"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
