const History = () => {
  let localStorageName = 'password';
  let localStoragePassword = localStorage.getItem(localStorageName);

  console.log(localStoragePassword && JSON.parse(localStoragePassword));
  return (
    <div>{JSON.parse(localStoragePassword).map(item => <div>{item}</div>)}</div>
  )
}

export default History;