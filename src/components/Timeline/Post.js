import styled from "styled-components";
import axios from 'axios';
import {useEffect, useState} from 'react';
// import urlMetadata from 'url-metadata';


function Post(){
    const [dados, setdados] = useState('')

    // useEffect(()=>{
    //     urlMetadata('https://cors-anywhere.herokuapp.com/'+'https://antoniamalchik.medium.com/why-gym-class-is-ineffective-8253a8c9aeb6')
    // .then((e)=>{setdados(e)})
    // .catch((erro)=>{console.log("PARA", erro)})
    // }, [])
    

    return(
        <Container>
            <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
            <div className="data">
                <h5>Juvenal Juvêncio</h5>
                <span>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</span>
            <Link>
                <div>
                    <Attrib color="#CECECE" size="16px">{dados ?dados.title:'Como aplicar o Material UI em um projeto React'}</Attrib>
                    <Attrib color="#9B9595" size="11px">{dados ?dados.description:'Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.'}</Attrib>
                    <Attrib color="#CECECE" size="11px">{dados ?dados.url:'https://medium.com/@pshrmn/a-simple-react-router'}</Attrib>
                </div>
                <img src={dados ?dados.image:'https://theclassicpw.com//assets/img/divulgacao/inauguracao.png'} alt="image" />
            </Link>
            </div>
        </Container>
    )

}


const Container = styled.div`
    width: 611px;
    height: 276px;
    padding: 16px 20px;
    display: flex;
    gap: 18px;
    background-color: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    box-sizing: border-box;

    img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  h5{
    color: white;
    font-weight: 400;
    font-size: 19px;
    margin-bottom: 7px;
  }

  span{
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-bottom: 7px;

  }
  .data{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

`

const Link = styled.div`
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

    div{
        display: flex;
        width: 300px;
        flex-direction: column;
        gap: 5px;
    }
    img{
        position: absolute;
        right: 0;
        top: 0;
        width: 155px;
        height: 153px;
        border-radius: 0px 11px 11px 0px !important;
    }
`

const Attrib = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.size};
    margin-bottom: 3px;
`


export default Post;