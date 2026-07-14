import './pages.css'
import './Shop.css'

function Shop() {
  const products = [
    { id: 1, name: 'Guild Logo T-Shirt', price: '$24.99', category: 'Apparel' },
    { id: 2, name: 'Character Art Print', price: '$14.99', category: 'Prints' },
    { id: 3, name: 'Adventure Mug', price: '$12.99', category: 'Drinkware' },
    { id: 4, name: 'Multiverse Hoodie', price: '$49.99', category: 'Apparel' },
    { id: 5, name: 'Episode Collection Book', price: '$29.99', category: 'Books' },
    { id: 6, name: 'Guild Badge Enamel Pin', price: '$8.99', category: 'Accessories' },
    { id: 7, name: 'Character Poster Set', price: '$19.99', category: 'Prints' },
    { id: 8, name: 'Exclusive Comic Bundle', price: '$39.99', category: 'Digital' },
  ]

  return (
    <div className="page shop-page">
      <section className="shop-header">
        <h1>Guild Shop</h1>
        <p>Support the Guild and get exclusive merchandise</p>
      </section>

      <section className="shop-info">
        <h2>Support the Adventure</h2>
        <p>Every purchase helps us continue creating amazing content for our community!</p>
      </section>

      <section className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">📦</div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </section>

      <section className="shop-footer">
        <h2>Limited Edition Items</h2>
        <p>Check back regularly for exclusive, limited edition merchandise and special offers!</p>
        <p>Secure checkout powered by industry-leading payment processors</p>
      </section>
    </div>
  )
}

export default Shop
