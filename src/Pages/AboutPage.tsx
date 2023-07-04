import { useEffect } from 'react';

interface IProps {
  setTitle: (title: string) => void
}

const AboutPage = (props: IProps) => {
  useEffect(() => {
    props.setTitle("About")
  }, [])

  return (
    <div className="App Dark-primary">
      This is the about page
    </div>
  );
}

export default AboutPage;
