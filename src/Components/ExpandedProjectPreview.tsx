import { Link } from "react-router-dom"


interface IProps{
    projectData: {
        title: string,
        image: string,
        url: string,
        description: string
    },
}

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    lineHeight: 1
}

const columnStyle: React.CSSProperties = {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}

const ExpandedProjectPreview = (props: IProps) => {
    return (
        <div style={containerStyle}>
            <div style={columnStyle}>

                <h4 style={{width: 150}}>
                    <Link to={props.projectData.url} style={{color: "inherit"}}>
                        {props.projectData.title}
                    </Link>
                </h4>
                <div style={{wordWrap: "break-word", margin: "0px 0px 0px 10px", textAlign: "left", whiteSpace: "pre-line", overflow: "hidden", height: "fit-content", width: 140}}>
                    {props.projectData.description}
                </div>

                <div style={{height: "auto", marginLeft: 10}}>
                    <Link to={props.projectData.url} style={{color: "inherit", position: "absolute", bottom: 10, left: 10}}>
                        Go to
                    </Link>
                </div>

            </div>
            <div style={{...columnStyle, alignItems: "center"}}>
                <img src={props.projectData.image} width={130} height="auto" style={{margin: "auto"}}/>
            </div>
        </div>
    )
}

export default ExpandedProjectPreview;
