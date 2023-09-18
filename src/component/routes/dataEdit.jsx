import axios from "axios";
import * as React from "react";
import { useState, useContext } from "react";
import { Form, Navigate, redirect, useParams } from 'react-router-dom';
import { getByIdApi , noverUpdateApi} from "../../environtment";

import { Button, Divider, Space, notification } from 'antd';
import { Context } from './../../routes/root';

// redirect data
import { useNavigate } from "react-router-dom";

import { useRef } from 'react';

import { ContextValue } from "./contexValue";

export default function DataEditComponent() {

    const [contact, setContact] = useState({ novelsTitle: '', author: '', image: '', categoryName: '' });
    const paramUrl = useParams('dataId');

    // const theme = useContext(Context);



    const navigate = useNavigate();

    // khai bao context khoi tao 
    const [api, contextHolder] = notification.useNotification();
    // khoi tao mở ra thông báo lấy dữ liệu từ contex
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name, file }) => `Hello, ${name} - ${file}!`}</Context.Consumer>,
            placement,
        });
    };

    // kahi bao input ref name
    const inputRefNovelsTitle = useRef(null);
    const inputRefAuthor = useRef(null);
    const inputRefImage = useRef(null);
    const inputRefCategoryName = useRef(null);

    React.useEffect(() => {
        console.log(paramUrl?.dataId);
        // call api get lay ra chi tiet cua item user data
        if (paramUrl?.dataId) {
            axios.get(getByIdApi + `/${paramUrl?.dataId}`, {   
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            ).then(res => setContact(res.data));
        }
    }, []);

//     const handleCancel = () => {
// navigate{'./data'};
//     }
    const handlePutData = async () => {
        // lay name tuong ung khi nhap
      
        // btvn kiem tra du lieu dung dang so hay bat buoc nhap chua thi moi gui api
        const dataPost = {
            id : `${paramUrl?.dataId}`,
            novelsTitle: inputRefNovelsTitle.current.value,
            author: inputRefAuthor.current.value,
            image: inputRefImage.current.value,
            categoryName: inputRefCategoryName.current.value,
        }
        // call api
        await axios.put(noverUpdateApi , dataPost,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            // console.log('oke');
        }).then ( () => {
            openNotification('topLeft');
        }).then(() => {
            setTimeout(() => {
                navigate('/data');
            }, 3000);
        }).catch(err => console.log(err, 'opp'));
        // debugger;
        redirect("/data");
        
        return;

    }

    return (
        <>
            {contextHolder}

            <ContextValue></ContextValue>
            
            <Form id="contact-form">
                <p>
                    <span>Novels Title</span>
                    <input
                        placeholder="Novels Title"
                        type="text"
                        name="novelsTitle"
                        ref={inputRefNovelsTitle}
                        defaultValue={contact.novelsTitle}
                    />
                </p>
                <label>
                    <span>Author</span>
                    <input
                        type="text"
                        name="Author"
                        placeholder="Author"
                        defaultValue={contact.author}
                        // lấy data từ input này
                        ref={inputRefAuthor}
                    />
                </label>
                <label>
                    <span>image</span>
                    <input
                         placeholder="them anh"
                         type="text"
                         name="image"
                         defaultValue={contact.image}
                         ref={inputRefImage}
                    />
                </label>
                <label>
                    <span>categoryName</span>
                    <input
                        type="text"
                        name="categoryName"
                        placeholder="categoryName"
                        defaultValue={contact.categoryName}
                        ref={inputRefCategoryName}
                    />
                </label>
                <p>
                    <button type="button" onClick={handlePutData}>Save</button>
                    {/* <button type="button" onClick={handleCancel}>Cancel</button> */}
                </p>
            </Form>

            
        </>
    )
} 