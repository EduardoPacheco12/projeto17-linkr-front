import styled from "styled-components";
import {useEffect, useState, useContext} from 'react';
import { useAxios } from "../../hooks/useAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

function Publish(){
    const {header} = useContext(DataContext);
    const [carregando, setCarregando] = useState(false);
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const postData = useAxios();

    useEffect(()=>{
        if(!header){
            navigate("/")
        }
        console.log(header)
    }, [])

   
    function atribuirDados(event) {
        setPost({ ...post, [event.target.name]: event.target.value });
    }

    async function sendPost(event){
        event.preventDefault();
        console.log(post)
        setCarregando(true);
        const config = header
        const { response, error, loading } = postData({ method: 'post', path: 'publish', body: post, header: config })
        // axios.post('http://localhost:5000/publish', post, )
        // .then((e)=>{
        //     setCarregando(false);
        //     setPost({link:'', description:''})
        //     return
        // }).catch(e=>{
        //     setCarregando(false);
        //     alert("Houve um erro ao publicar seu link");
        //     return
        // })

    }

    return(
        <Container>
            <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
            <Form onSubmit={(e)=>sendPost(e)}>
                <h3>What are you going to share today?</h3>
                <input required  disabled={carregando} name="link" placeholder="http://..." onChange={(e)=>{atribuirDados(e)}} value={post.link}/>
                <textarea name="description" disabled={carregando} placeholder="Awesome article about #javascript" onChange={(e)=>{atribuirDados(e)}} value={post.description}/>
                <input type="submit" value={carregando ? "Publishing..." : "Publish"} disabled={carregando}/>
            </Form>
        </Container>
    )

}

const Container = styled.div`
    min-width: 611px;
    height: 209px;
    padding: 16px 20px;
    display: flex;
    gap: 18px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    box-sizing: border-box;
    margin-bottom: 29px;
    img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    align-items: end;

    h3{ 
        margin-top: 5px;
        width: 100%;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
    }
    input, textarea{
        background: #EFEFEF;
        border-radius: 5px;
        border: none;
        padding: 8px 12px;
        width: 100%;
    box-sizing: border-box;

    }
    input:disabled, textarea:disabled{
        border: 1px solid #a84e32;
    }

    input{
        height: 30px;
    }

    input[type="submit"]{
        width: 112px;
        height: 31px;
        background-color: #1877F2;
        border-radius: 5px;
        color: white;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
    }

    input[type="submit"]:disabled{
        background-color: gray;
        border: none;
    }
    textarea{
        height: 66px;
    }

`

export default Publish;