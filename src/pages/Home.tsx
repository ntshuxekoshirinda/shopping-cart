import boutiqueHero from './assets/fav.png';
const Home = () => {
  return (
    <div className="home-page">
      <h2>Elevated Essentials</h2>
      <p>Explore our curated collection of high-quality goods.</p>
      <div className="hero-image">
        
        <img
          alt="BOUTIQUE"
          src={boutiqueHero}
          />
      </div>
    </div>
  );
};

export default Home;