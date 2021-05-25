const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
            <h1>Products</h1>
            <div>${product.title}</div>

        `;
    })
    .join("");

  return layout({
    content: `
            
            ${renderedProducts}
        `,
  });
};
