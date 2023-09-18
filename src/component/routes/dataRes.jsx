
import * as React from "react";

// antd
import { Avatar, List } from 'antd';
import { Modal } from 'antd';
// axios call api
import axios, { isCancel, AxiosError } from 'axios';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { envApi } from "../../environtment";

import { useSelector, useDispatch } from 'react-redux';
import {updateText} from './../../counter/counterSlice';


export default function DataComponent() {
    // data list user
    const [data, setData] = useState([]);

    // show modal info
    const [isModalOpen, setIsModalOpen] = useState(false);

    // show modal delete
    const [isModalOpenDelete, setisModalOpenDelete] = useState(false);

    // show item
    const [itemInfo, setItemInfo] = useState(null);

    const [value, setValue] = useState('');

    // khai bao store va lay du lieu tu store
    // lay ra gia tri tu store
    const count = useSelector((state) => state.counter.nameContact);
    // lay ra hanh dong tang giam, value
    const dispatch = useDispatch();

    const handleUpdateStore = (e) => {
        console.log(value, "adda");
        dispatch(updateText(value));
    }

    useEffect(() => {
        callapi();
    }, []);

    const callapi = () => {
        const data = axios.get(envApi)
            .then(res => {
                console.log('res', res);
                setData(res.data)
            })
            .catch(err => console.log(err));

        return () => data;
    }

    const handleShowModal = (item, index) => {
        console.log(item, index, "=====");
        setIsModalOpen(true);

        // click ban ghi thi setiTEMINFO is item
        setItemInfo(item);

    }

    const handleOk = () => {
        setItemInfo(null);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setItemInfo(null);
        setIsModalOpen(false);
    };


    // delete
    const handleDelete = (item, index) => {
        setisModalOpenDelete(true);
        setItemInfo(item);
    };

    const handleOkeDelete = () => {
        const data = axios.delete(envApi + `/${itemInfo.id}`)
            .then(res => {
                console.log('res', res);

                // setData(res.data)
            }).then(() => {
                callapi();
                setisModalOpenDelete(false);
                setItemInfo(null);
            })
            .catch(err => console.log(err));

        return () => data;
    }

    const handleCancelDelete = () => {
        setItemInfo(null);
        setisModalOpenDelete(false);
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <NavLink
                                to={`dataDeatail/${item.id}`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                            ? "pending"
                                            : ""
                                }
                            ><p key="list-loadmore-edit">edit</p></NavLink>,
                            <p key="list-loadmore-more"
                                onClick={() => handleShowModal(item, index)}>more</p>,
                            <p key="list-loadmore-delete"
                                onClick={() => handleDelete(item, index)}>delete</p>
                        ]
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<>{item.name}</>}
                            description={item.address + '--' + item.phone}
                        />
                    </List.Item>
                )}
            />

            <Modal title="model detail" open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}>
                <p>{itemInfo?.name}</p>
                <p>{itemInfo?.phone}</p>
                <p>Some contents...</p>
                <span> this is state of Store : {count}</span>
                <form>
                    <input name="name" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button type="button" onClick={(e) => handleUpdateStore(e)}>handle click</button>
                </form>
            </Modal>

            <Modal title="model confirm" open={isModalOpenDelete} onOk={handleOkeDelete}
                onCancel={handleCancelDelete}>
                Do u want delete item ?
            </Modal>

        </>
    )
}