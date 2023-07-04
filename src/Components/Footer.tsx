import { useEffect, useState } from "react";

const columnHeaderStyle: React.CSSProperties = 
{
    margin: "15px 0px 0px 0px",
    fontSize: 18,
    fontWeight: 700,
}

const listItemStyle: React.CSSProperties = 
{
    marginTop: 4,
    fontSize: 14,
}


const Footer = () => {
    const [screenWidth, setScreenWidth] = useState(500);

    useEffect(() => {
          const updateDimension = () => {
                setScreenWidth(window.innerWidth)
          }
          window.addEventListener('resize', updateDimension);
          
          updateDimension();
      
          return(() => {
              window.removeEventListener('resize', updateDimension);
          })
    }, [screenWidth])

    //fix issues that occur when the width of the screen is below the desired width
    let tableWidth = screenWidth < 500 ? screenWidth : 500;

    return (
        <div className='App-Footer Dark-tertiary'>
            <table width={tableWidth} style={{tableLayout:"fixed"}}>
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                <tr>
                    <td style={{textAlign:"center"}}>
                        <div style={{marginBottom: 10, ...columnHeaderStyle}}>
                            Contact
                        </div>
                    </td>
                    <td style={{textAlign:"center"}}>
                        <div style={{marginBottom: 10, ...columnHeaderStyle}}>
                            Social
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign:"center"}}>
                        <a style={{...listItemStyle, color: "inherit"}} href="mailto:austinjohnston.030@gmail.com">
                            austinjohnston.030@gmail.com
                        </a>
                    </td>
                    <td style={{textAlign:"center"}}>
                        <a style={{...listItemStyle, color: "inherit"}} href="https://github.com/austin-wyatt">
                            GitHub
                        </a>
                    </td>
                </tr>
                <tr>
                    <td/>
                    <td style={{textAlign:"center"}}>
                        <a style={{...listItemStyle, color: "inherit"}} href="https://www.linkedin.com/in/austin-johnston/">
                            LinkedIn
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Footer;