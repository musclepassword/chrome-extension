import { usePasswordStore } from '../../stores';

const History = () => {
  const passwordState = usePasswordStore((state) => state.password)

  return (
    <div>{passwordState.map(item => <div>{item}</div>)}</div>
  )
}

export default History;