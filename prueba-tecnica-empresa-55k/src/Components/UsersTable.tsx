import React from 'react';
import {SortBy, type  User} from '../types.d.ts'

interface Props {
    users: User[];
    showColors: boolean,
    handleDelete:  (uuid: string) => void,
    changeSorting: (sort: SortBy) => void
}

export function UsersTable({ users, showColors, handleDelete, changeSorting }: Props){
        
    return (
    <table width='100%' >
        <thead >            
            <th>Photo</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>First Name</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.LAST)}}>Last Name</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY)}}>Country</th>
            <th>Email</th>
            <th>Phone</th>            
        </thead>
        <tbody >
            {                   
            users.map((user, index) => {                
                const backgroundColor = index % 2 == 0 ? '#333' : '#555'
                const color = showColors ? backgroundColor :  'transparent'
                return(
                <tr key={user.login.uuid} style={{ backgroundColor: color}} >                    
                    <td><img src={user.picture.thumbnail}/></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>          
                    <td><button onClick={() => {
                        handleDelete(user.login.uuid)
                    }}>Borrar</button></td>          
                </tr>
                )
            })
            }
            
        </tbody>
    </table>
    )

}

