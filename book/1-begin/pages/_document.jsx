/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import PropTypes from 'prop-types';

import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

const propTypes = {
  styles: PropTypes.arrayOf(
    PropTypes.string || PropTypes.number || PropTypes.ReactElementLike || React.ReactFragment,
  ).isRequired,
};

class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createCache({
      key: 'css',
      prepend: true,
    });
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const chunks = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = chunks.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  };

  render() {
    return (
      <Html lang="en" style={{ height: '100%' }}>
        <Head>
          {/* // 1. metadata */}
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#1976D2" />
          {/* // 2. static resources (from CDN) */}
          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />
          <link
            rel="stylesheet"
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
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.propTypes = propTypes;
export default MyDocument;
