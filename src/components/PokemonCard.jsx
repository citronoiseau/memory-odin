export default function PokemonCard({ name, image, onClick }) {
  return (
    <button className="pokemon-card" onClick={onClick}>
      <div>{name}</div>
      <div className="image-container">
        <img src={image} />
      </div>
    </button>
  );
}
