'use client'
import React from 'react';
import './globals.css'
import { useState } from 'react'
import axios from 'axios';
export default function Home() {

    const [userName, setUserName] = useState(null)
    const [followers, setFollowers] = useState([])
    const [data, setData] = useState(null)
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }
    const onClickHandler = async () => {
        setFollowers([])

        let response = await fetch(`https://api.github.com/users/${userName}`)
        response = await response.json()
        setData(response)
        console.log(response);

    }
    const onFollowerHandler = async () => {
        let response = await axios.get(data.followers_url)
        console.log("response", response.data);
        setFollowers(response.data)

    }

    return (
        <div className='back'>
            <h1 className='text-3xl pt-14 text-center  text-red-600 font-bold'>GITHUB USER INFORMATION</h1>
            <div className='text-center mt-5'>
                <label htmlFor="inp">Enter Github User Name :</label>
                <input id='inp' onChange={onChangeHandler} type="text" className='border' />

            </div>
            <button onClick={onClickHandler} className='text-red-500 font-bold text-2xl px-2 flex mx-auto btn'>Search User</button>
            <hr className='mt-3' />
            {data &&
                <div className=''>
                    <h1 className='text-3xl text-center text-red-500 font-bold mt-5'>Github user</h1>
                    <img src={data.avatar_url} width={150} alt="" className='flex mx-auto mt-4' />
                    <p className='text-3xl text-red-500 font-bold text-center'>Bio :<span className='text-lg text-green-700 font-bold'> {data.bio}</span></p>
                    <p className='text-3xl text-red-500 mt-3 font-bold text-center'>Followers :

                        <span className='text-lg text-green-700 font-bold'> {data.followers}</span>
                    </p>

                    <p className='text-3xl text-red-500 mt-3 font-bold text-center'>Following :

<span className='text-lg text-green-700 font-bold'> {data.following}</span>
</p>
                    <button className='text-red-500 font-bold text-2xl px-2 flex mx-auto btn' onClick={onFollowerHandler}>Get followers</button>
                </div>
            }


            {followers.length >= 1 &&
                <div className='flex justify-center  '>
                    <table className='border text-center mt-5 '>
                        <tr className='border'>
                            <th className='border'>id</th>
                            <th className='border'>avator</th>
                            <th className='border'>name</th>
                           
                            <th className='border'>Followers Url</th>
                        </tr>
                        {followers.map((element) => {
                            return (
                                <tr>
                                    <td className='border px-3 py-2'>{element.id}</td>
                                    <td className='border px-3 py-2'> <img src={element.avatar_url} width={50} alt="" /></td>
                                    <td className='border px-3 py-2'>{element.login}</td>
                                 
                                    <td className='border px-3 py-2'>
                                        <a href={element.html_url
} target='blank'>

                                        {element.html_url
}
                                        </a>
                                        </td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            }
        </div>
    )
}
