import { LangAndCurrency } from './inside-components/LangAndCurrency';
import { SearchBox } from './inside-components/SearchBox';
export const Header = () => {
  return (
    <header className='header'>
      <div className='header-top-bar'>
        <div className='header-top-left'>
          <LangAndCurrency />
        </div>
        <div className='header-top-right'>
          <SearchBox />
        </div>
      </div>
    </header>
  );
};
