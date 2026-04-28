/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

const mockProducts = [
  {
    id: 1,
    title: 'Luxury Silk Shirt',
    price: 120.0,
    image: 'https://via.placeholder.com/150',
    description: 'High-end apparel',
    category: 'clothing',
  },
];

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  })
) as any;

describe('Shopping Cart Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // We removed the 'delete window.location' lines. 
    // They were likely preventing React Router from navigating correctly.
  });

  it('renders the homepage by default', () => {
    render(<App />);
    expect(screen.getByText(/Elevated Essentials/i)).toBeInTheDocument();
  });

  it('navigates to shop and adds an item to the cart', async () => {
    const user = userEvent.setup();
    render(<App />);

    // 1. Click Shop
    const shopLink = screen.getByRole('link', { name: /shop/i });
    await user.click(shopLink);

    // 2. Wait for the product to appear directly
    // Since we saw 'Luxury Silk Shirt' in your HTML dump, this is our best anchor.
    const productTitle = await screen.findByText(/Luxury Silk Shirt/i, {}, { timeout: 5000 });
    expect(productTitle).toBeInTheDocument();

    // 3. Add to cart
    // Using findByRole here to ensure we wait for the button to be ready
    const addBtn = await screen.findByRole('button', { name: /add to cart/i });
    await user.click(addBtn);

    // 4. Verify the Navbar update
    const cartLink = await screen.findByRole('link', { name: /cart \(1\)/i });
    expect(cartLink).toBeInTheDocument();
  });

  it('updates total price in the cart page when quantity changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to shop and wait for content
    await user.click(screen.getByRole('link', { name: /shop/i }));
    
    // Ensure we are actually on the shop page
    const addBtn = await screen.findByRole('button', { name: /add to cart/i }, { timeout: 5000 });
    await user.click(addBtn);

    // Go to cart
    await user.click(screen.getByRole('link', { name: /cart/i }));
    
    // Check initial total
    const initialTotal = await screen.findByText(/Total: \$120.00/i);
    expect(initialTotal).toBeInTheDocument();

    // Change quantity
    const incrementBtn = screen.getByRole('button', { name: /\+/i });
    await user.click(incrementBtn);

    // Check final total
    const updatedTotal = await screen.findByText(/Total: \$240.00/i);
    expect(updatedTotal).toBeInTheDocument();
  });
});