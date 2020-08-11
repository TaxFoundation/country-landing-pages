import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto+Mono&display=swap'
          rel='stylesheet'
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        <script src='/pym.js'></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== undefined) {
              console.log('Starting pym');

              const pymChild = new pym.Child({
                polling: 25,
              });
              pymChild.sendHeight();

              console.log(pymChild);
            }`,
          }}
        ></script>
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
