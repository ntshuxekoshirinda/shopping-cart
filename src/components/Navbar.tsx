import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <h1>THE BOUTIQUE</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          Cart {cartCount > 0 && <span className="cart-badge">({cartCount})</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;