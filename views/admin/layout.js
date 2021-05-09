module.exports = ({ authContents }) => {
  return `<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        ${authContents}
    </body>
    </html>`;
};
