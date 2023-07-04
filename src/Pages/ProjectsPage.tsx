import { useEffect } from 'react';

interface IProps {
  setTitle: (title: string) => void
}

const ProjectsPage = (props: IProps) => {
  useEffect(() => {
    props.setTitle("Projects")
  }, [])

  return (
    <div className="App Dark-primary">
      This is the projects page
    </div>
  );
}

export default ProjectsPage;
