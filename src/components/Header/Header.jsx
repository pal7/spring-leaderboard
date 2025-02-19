import "./Header.css";

export default function Header({ onSearch }) {
  return (
    <header className='header__container'>
      <h2>Leaderboard</h2>
      <label htmlFor='search' className='visually-hidden'>
        Search by name
      </label>
      <input
        id='search'
        type='text'
        placeholder='Search by name'
        onChange={(e) => onSearch(e.target.value)}
        className='header__searchbar'
        aria-label='Search users by name'
      />
    </header>
  );
}
