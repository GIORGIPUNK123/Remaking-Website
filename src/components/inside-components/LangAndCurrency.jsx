export const LangAndCurrency = () => {
  return (
    <>
      <select name='lang' id='langSelect'>
        <option value='ge'>GE</option>
        <option value='en'>EN</option>
      </select>
      <select name='currency' id='currecnySelect'>
        <option value='ge'>GEL</option>
        <option value='en'>USD</option>
      </select>
    </>
  );
};
