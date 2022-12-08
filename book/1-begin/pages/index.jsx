import Head from 'next/head';

const Index = () => {
  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>Index page</title>
        <meta name="description" content="This is the description of the Index page" />
      </Head>
      <p>Content on Index Page</p>
    </div>
  );
};

export default Index;
