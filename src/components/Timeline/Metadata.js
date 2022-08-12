import styled from "styled-components";
// import urlMetadata from 'url-metadata';

function MetaData({metadata}){
    return(
        
         <Link href={metadata&&metadata.url} target="_blank" rel="noopener noreferrer">
                <div>
                    <Attrib className="title" >{metadata ? metadata.title:'Como aplicar o Material UI em um projeto React'}</Attrib>
                    <Attrib className="description" >{metadata ?metadata.description:'Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.'}</Attrib>
                    <Attrib className="url">{metadata ?metadata.url:'https://medium.com/@pshrmn/a-simple-react-router'}</Attrib>
                </div>
                <img src={metadata ?metadata.image:'https://muhimasri.com/wp-content/uploads/2021/09/react-3-small-300x300.jpg'} alt="image" />
         </Link>

    )

}

const Link = styled.a`
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    gap: 5px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    text-decoration: none;
    
    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;
        padding: 20px 24px;
        gap: 5px;
        text-decoration: none;
    }
    img{
        width: 40%;
        height: auto;
        border-radius: 0px 11px 11px 0px !important;
    }

    .title{
        color: #CECECE;
        font-size: 16px;
    }
    
    .description{
        color: #9B9595;
        font-size: 11px;
        height: 33px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .url{
        color: #CECECE;
        font-size: 11px;
        height: 11px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    @media screen and (max-width: 900px) {
      width: 100%;

      div {
        padding: 8px 8px 8px 12px;
      }

      .title {
        font-size: 12px;
      }

      .description {
        font-size: 10px;
      }
    }
`;

const Attrib = styled.span`
    font-size: 16px;
    margin-bottom: 5px;
`;

export default MetaData;