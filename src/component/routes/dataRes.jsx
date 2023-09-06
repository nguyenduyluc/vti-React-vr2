
import * as React from "react";

// antd
import { Avatar, List } from 'antd';
// axios call api
import axios, { isCancel, AxiosError } from 'axios';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { envApi } from "../../environtment";


export default function DataComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = axios.get(envApi)
            .then(res => {
                console.log('res', res);
                setData(res.data)
            })
            .catch(err => console.log(err));

        return () => data;
    }, [])

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <NavLink
                        to={`dataDeatail/${item.id}`}
                        className={({ isActive, isPending }) =>
                            isActive
                                ? "active"
                                : isPending
                                    ? "pending"
                                    : ""
                        }
                    >
                        <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<h4>{item.name}</h4>}
                                description={item.address + '--' + item.phone}
                            />
                        </List.Item>
                    </NavLink>
                )}
            />
        </>
    )
}