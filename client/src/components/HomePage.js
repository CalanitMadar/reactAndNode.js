import '../App.css';


function HomePageComp() {
  return (
    <div className="App">
      <p className='hellouser'>Hello {localStorage.getItem('name')}</p>
    </div>
  );
}

export default HomePageComp;
