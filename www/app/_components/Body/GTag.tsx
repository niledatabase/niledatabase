import Script from 'next/script';

export default function GTag() {
  const gtagEnabled = process.env.NODE_ENV === 'production';
  const gtag = process.env.NEXT_PUBLIC_GTAG;

  return gtagEnabled ? (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`} />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag}');
          `}
      </Script>
    </>
  ) : (
    <></>
  );
}
