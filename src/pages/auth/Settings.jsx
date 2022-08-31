import React from 'react'
import Location from "../../helpers/location"
import { useFirestoreId, useFirestore, useFirestoreRoles, useFirestoreRolesAcademy, useFirestoreMemberships } from "../../helpers/useFirestore"
import { doc, updateDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from '../../libs/firebase'
import saveFile from '../../components/core/saveFile';
import { useState, useEffect } from "react";
import ButtonClicked from '../../hooks/ButtonClicked';
import uuid from 'react-uuid';
import DeleteIcon from '../../assets/icons/delete-icon.png'
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"

const Settings = () => {
  const [auth] = useContext(Auth)

  const [avatar, setAvatar] = useState(null)
  const [author, setAuthor] = useState(null)
  const [academyAdminAcademy, setAcademyAdminAcademy] = useState(null)
  const [academyAdminUser, setAcademyAdminUser] = useState(null)
  const [academyAuthorAcademy, setAcademyAuthorAcademy] = useState(null)
  const [academyAuthorUser, setAcademyAuthorUser] = useState(null)
  const [allAcademyAdmins, setAllAcademyAdmins] = useState([])

  const id = Location()[3]
  const navigate = useNavigate()

  const users = useFirestoreId('users', id)
  const allUsers = useFirestore('users')
  const authors = useFirestoreRoles('author')
  const academyAdmins = useFirestoreRoles('academyAdmin')
  const academies = useFirestore('academies')
  const authAcademies = useFirestoreRolesAcademy('academyAdmin', auth.id)
  const groupsMember = useFirestoreMemberships('type', 'group',  auth.id)

  // Set all academyadmins
  useEffect(() => {

    academyAdmins && academyAdmins.forEach(item => {
      setAllAcademyAdmins([...allAcademyAdmins, item.user])
    })

  },[academyAdmins])

  // Avatar default state
  useEffect(() => {
    users && users.forEach(user => {
      setAvatar(user.avatar)
    })
  }, [users])

  const nameHandler = async (e) => {

    const value = e.target.value 
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, 'users', docid), {
      name: value
      })

  }

  const avatarHandler = async (e) => {

    const files = e.target.files 

    saveFile(files, setAvatar)

  }

  const saveAvatar = async (e) => {

    const docid = e.target.dataset.docid

    ButtonClicked(e, 'Opgeslagen')

    await updateDoc(doc(db, 'users', docid), {
      avatar: avatar
      })

  }

  const authorHandler = (e) => {

    const option = e.target.options

    const value = option[option.selectedIndex].value

    setAuthor(value)
    
  }

  const saveAuthor = async (e) => {

    ButtonClicked(e, 'Toegevoegd')

    await setDoc(doc(db, 'roles', uuid()),{
      user: author,
      timestamp: serverTimestamp(),
      role: 'author',
      id: uuid(),
    })

  }

  const Author = ({author}) => {

    const users = useFirestoreId('users', author.user)

    const deleteAuthor = async (e) => {

      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "roles", docid));
    }

    return(
      <>
        {users && users.map(user => (
          <div key={user.id} className='role-item-container'>
              <img src={user.avatar} alt="user avatar" />
              <p>{user.name}</p>
              <div className='role-actions-container'>
                <img src={DeleteIcon} alt="delete icon" data-docid={author.docid} onClick={deleteAuthor} />
              </div>
          </div>
        ))}
      </>
    )
  }

  const academyAdminAcademyHandler = (e) => {

    const option = e.target.options

    const value = option[option.selectedIndex].value

    setAcademyAdminAcademy(value)

  }

  const academyAdminUserHandler = (e) => {

    const option = e.target.options

    const value = option[option.selectedIndex].value

    setAcademyAdminUser(value)

  }

  const saveAcademyAdmin = async (e) => {

    ButtonClicked(e, 'Toegevoegd')

    await setDoc(doc(db, 'roles', uuid()),{
      user: academyAdminUser,
      academy: academyAdminAcademy,
      timestamp: serverTimestamp(),
      role: 'academyAdmin',
      id: uuid(),
    })

  }

  const AcademyAdmin = ({item}) => {
    const users = useFirestoreId('users', item.user)
    const academies = useFirestoreId('academies', item.academy)

    const deleteAcademyAdmin = async (e) => {

      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "roles", docid));
    }

    return(
      <>
        {users && users.map(user => (
          <div key={user.id} className='role-item-container'>
              <img src={user.avatar} alt="user avatar" />
              <p>{user.name}</p>
              {academies && academies.map(item => (
                <p className='role-academy-admin-academy' key={item.id}>{item.name}</p>
              ))}
              <div className='role-actions-container'>
                <img src={DeleteIcon} alt="delete icon" data-docid={item.docid} onClick={deleteAcademyAdmin} />
              </div>
          </div>
        ))}
      </>
    )
  }

  const AuthAcademy = ({item}) => {

    const academyAuthors = useFirestoreRoles('academyAuthor')

    const Authors = ({}) => {

      const academyAuthorUserHandler = (e) => {

        const option = e.target.options
    
        const value = option[option.selectedIndex].value
    
        setAcademyAuthorUser(value)
    
      }

      const saveAcademyAuthor = async (e) => {

        ButtonClicked(e, 'Toegevoegd')
    
        await setDoc(doc(db, 'roles', uuid()),{
          user: academyAuthorUser,
          academy: academyAuthorAcademy,
          timestamp: serverTimestamp(),
          role: 'academyAuthor',
          id: uuid(),
        })
    
      }


      <div>
        <h3>Academy author</h3>
        <h4>Authors</h4>
        {academyAuthors && academyAuthors.map(item => (
          <AcademyAuthor item={item} key={item.id} />
        ))}
        <h4>Author toevoegen</h4>
        <select name="" id="" onChange={academyAuthorUserHandler}>
          <option value="">-- Selecteer lid --</option>
          {allUsers && allUsers.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <div className='button-container'>
          <button onClick={saveAcademyAuthor}>Toevoegen</button>
        </div>
      </div>
    }

    return(
      <div>
        <Authors />
      </div>
    )
  }

  const AcademyAuthor = ({item}) => {
    const users = useFirestoreId('users', item.user)
    const academies = useFirestoreId('academies', item.academy)

    const deleteAcademyAuthor = async (e) => {

      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "roles", docid));
    }

    return(
      <>
        {users && users.map(user => (
          <div key={user.id} className='role-item-container'>
              <img src={user.avatar} alt="user avatar" />
              <p>{user.name}</p>
              {academies && academies.map(item => (
                <p className='role-academy-admin-academy' key={item.id}>{item.name}</p>
              ))}
              <div className='role-actions-container'>
                <img src={DeleteIcon} alt="delete icon" data-docid={item.docid} onClick={deleteAcademyAuthor} />
              </div>
          </div>
        ))}
      </>
    )
  }

  const Group = ({item}) => {

    const groups = useFirestoreId('groups', item.group)

    return(
      <>
        {groups && groups.map(group => (
          <div key={group.id}>
            <p>{group.name}</p>
            <div className='button-container card-button-container'>
                <button onClick={() => navigate(`/dashboard/group/${group.id}`)}>Bekijk</button>
            </div>
          </div>
        ))}
      </>
    )
  }

  const showGroup = (e) => {
    const id = e.target.dataset.id
  }

  const deleteMembership = async (e) => {

    const docid = e.target.dataset.docid 

    await deleteDoc(doc(db, "memberships", docid));
  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Instellingen</h1>
        </div>
        {users && users.map(user => (
          <div key={user.id}>
            <h2>Wijzig naam</h2>
            <input type="text" defaultValue={user.name} data-docid={user.docid} onChange={nameHandler} />

            <div className='line-div-settings'></div>

            <h2>Wijzig profielfoto</h2>
            <img className='profile-avatar' src={avatar} alt="avatar" />
            <div>
              <input type="file" data-docid={user.docid} onChange={avatarHandler} />
            </div>
            <div className='button-container'>
              <button className='button-simple' data-docid={user.docid} onClick={saveAvatar}>Opslaan</button>
            </div>

            <div className='line-div-settings'></div>

            <div>
              <h2>Lidmaatschappen</h2>
              <h3>Groepen</h3>
              <div>
                {groupsMember && groupsMember.map(item => (
                  <div className='banner' key={item.id}>
                    <Group item={item}/>
                    <img src={DeleteIcon} alt="delete icon" className='delete-icon-settings' data-docid={item.docid} onClick={deleteMembership}/>
                </div>
                ))}
              </div>
            </div>

            <div className='line-div-settings'></div>

            <h2>Super admin</h2>
            <div>
              <h3>Auteurs</h3>
              {authors && authors.map(author => (
                <div key={author.id}>
                  <Author author={author}/>
                </div>
              ))}
              <h4>Auteur toevoegen</h4>
              <select name="" id="" onChange={authorHandler}>
                <option value="">-- Selecteer lid --</option>
                {allUsers && allUsers.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
              <div className='button-container'>
                  <button onClick={saveAuthor}>Toevoegen</button>
              </div>
            </div>
            <div>
                <h3>Academy admins</h3>
                <h4>Admins</h4>
                {academyAdmins && academyAdmins.map(item => (
                  <AcademyAdmin item={item} />
                ))}
                <h4>Admin toevoegen</h4>
                <select name="" id="" onChange={academyAdminAcademyHandler}>
                  <option value="">-- Selecteer academie --</option>
                  {academies && academies.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select name="" id="" onChange={academyAdminUserHandler}>
                  <option value="">-- Selecteer lid --</option>
                  {allUsers && allUsers.map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                <div className='button-container'>
                  <button onClick={saveAcademyAdmin}>Toevoegen</button>
              </div>
            </div>

            <div className='line-div-settings'></div>

            <div style={{display: allAcademyAdmins.includes(auth.id) ? 'block' : 'none'}}>
                <h2>Herstelacademie instellingen</h2>
                {authAcademies && authAcademies.map(item => (
                  <AuthAcademy item={item}/>
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Settings