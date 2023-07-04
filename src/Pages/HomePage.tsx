import { useEffect } from 'react';

interface IProps {
  setTitle: (title: string) => void
}

const HomePage = (props: IProps) => {
  useEffect(() => {
    props.setTitle("Overview")
  }, [])

  return (
    <div className="App Dark-primary">
      This is the home page
    </div>
  );
}

export default HomePage;
