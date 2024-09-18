const History = props => {
  let localStorageName = 'password';
  let localStoragePassword = localStorage.getItem(localStorageName);

  console.log(localStoragePassword && JSON.parse(localStoragePassword));
  return (
    <div>History</div>
  )
}

export default History;