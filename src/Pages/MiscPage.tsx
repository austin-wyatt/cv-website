import { useEffect } from "react"
import SnakeGame from "../Games/SnakeGame"

interface IProps {
    setTitle: (title: string) => void
}

const MiscPage = (props: IProps) => {
    useEffect(() => {
        props.setTitle("Miscellaneous")
    }, [])

    return (
        <div className="App Dark-primary">
            <div style={{marginTop: 50}}/>
            <SnakeGame />
        </div>
    )
}

export default MiscPage;