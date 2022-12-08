import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* // 1. metadata */}
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#197602" />
          {/* // 2. static resources (from CDN) */}
          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />
          <link
            rel="sytlesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400:latin"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <link rel="stylesheet" href="https://storage.googleapis.com/builderbook/vs.min.css" />
          {/* // 3. global styles */}
          <style>
            {`
										a {
										font-weight: 400;
										color: #58a6ff;
										text-decoration: none;
										outline: none;
										}
										blockquote {
										padding: 0 1em;
										color: #555;
										border-left: 0.25em solid #dfe2e5;
										}
										pre {
										display: block;
										overflow-x: auto;
										padding: 0.5em;
										background: #fff;
										color: #000;
										border: 1px solid #ddd;
										font-size: 14px;
										}
										code {
										font-size: 14px;
										}
										`}
          </style>
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