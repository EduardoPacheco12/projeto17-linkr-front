import styled from "styled-components";
import axios from 'axios';
import {useEffect, useState} from 'react';
// import urlMetadata from 'url-metadata';

function MetaData({metadata}){

    return(
        
         <Link href={metadata&&metadata.url} target="_blank" rel="noopener noreferrer">
                <div>
                    <Attrib className="title" >{metadata ?metadata.title:'Como aplicar o Material UI em um projeto React'}</Attrib>
                    <Attrib className="description" >{metadata ?metadata.description:'Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.'}</Attrib>
                    <Attrib className="url">{metadata ?metadata.url:'https://medium.com/@pshrmn/a-simple-react-router'}</Attrib>
                </div>
                <img src={metadata ?metadata.image:'https://theclassicpw.com//assets/img/divulgacao/inauguracao.png'} alt="image" />
         </Link>

    )

}



const Link = styled.a`
    width: 503px;
    height: 155px;
    display: flex;
    color: white;
    gap: 5px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    padding: 20px 23px;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    text-decoration: none;

    div{
        display: flex;
        width: 300px;
        flex-direction: column;
        gap: 5px;
        text-decoration: none;
    }
    img{
        position: absolute;
        right: 0;
        top: 0;
        width: 155px;
        height: 153px;
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
`

const Attrib = styled.span`
    font-size: 16px;
    margin-bottom: 5px;
`


export default MetaData;