import React, { useState, useLayoutEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import DogListItem from '../../Components/ListItems/DogListItem'
import DogItemImage from '../../Components/ListItems/DogItemImage'

import DropDown from '../../Components/DropDown'
import DogsApiService from '../../services/api-service'
import TokenService from '../../services/token-service'
import UpdateBar from '../../Components/UpdateBar'
import { Modal } from 'react-responsive-modal'
import UpdateStatusForm from '../../Components/BatchUpdateForms/UpdateStatusForm'
import DeleteDogForm from '../../Components/Forms/DeleteDogForm'
import BatchShotForm from '../../Components/BatchUpdateForms/BatchShotForm'
import OverviewCount from '../../Components/OverviewSection'

import moment from 'moment'

const DogList = (props) => {
  const [error, setError] = useState('')
  const [dogs, setDogs] = useState([])
  const [dogSearch, setDogSearch] = useState('')
  const [view, setView] = useState('')
  const [selected, setSelected] = useState([])
  const [updateType, setType] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const shelterId = TokenService.getShelterToken()
  const [count, setCounts] = useState({
    'Total Dogs': '',
    'Current Dogs': '',
    'Adopted Dogs': '',
    'Fostered Dogs': '',
  })

  const getDogs = useCallback(() => {
    DogsApiService.getDogs(shelterId)
      .then((responsejson) => {
        if (responsejson.length === 0) {
          setError('Something went wrong, try again')
        }

        responsejson
          .map((dog) => (dog.checked = false))
          .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

        setDogs([...responsejson])

        const totalDogs = responsejson.length

        const currentDogs = responsejson.filter(
          (a) => a.dog_status !== 'Adopted' && a.dog_status !== 'Fostered'
        ).length

        const adoptedDogs = responsejson.filter(
          (a) => a.dog_status === 'Adopted'
        ).length

        const fosteredDogs = responsejson.filter(
          (a) => a.dog_status === 'Fostered'
        ).length

        setCounts({
          'Total Dogs': totalDogs,
          'Current Dogs': currentDogs,
          'Adopted Dogs': adoptedDogs,
          'Fostered Dogs': fosteredDogs,
        })
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [shelterId])

  useLayoutEffect(() => {
    getDogs()
  }, [getDogs])

  let filteredDogs = dogs.filter((d) => {
    return d.dog_name.toLowerCase().indexOf(dogSearch.toLowerCase()) !== -1
  })

  const updateSelected = (id) => {
    let newList

    selected.includes(id)
      ? (newList = selected.filter((i) => i !== id))
      : (newList = [...selected, id])

    setSelected([...newList])

    dogs.map((dog) => {
      if (dog.id === id) {
        dog.checked = !dog.checked
      }
      return dog
    })
  }

  const handleSort = (sortType) => {
    let sorted
    if (sortType === 'A-Z') {
      sorted = dogs.sort((a, b) =>
        a.dog_name > b.dog_name ? 1 : a.dog_name < b.dog_name ? -1 : 0
      )
    } else if (sortType === 'Z-A') {
      sorted = dogs.sort((a, b) =>
        a.dog_name > b.dog_name ? -1 : a.dog_name < b.dog_name ? 1 : 0
      )
    }

    setDogs([...sorted])
  }

  const handleChange = (e) => {
    const { value } = e.target
    setDogSearch(value)
  }

  const setFilter = (value) => {
    value === 'None' ? setView('') : setView(value)
  }

  const setUpdateType = (type) => {
    setType(type)
    setModalIsOpen(true)
  }

  const setChecked = () => {
    dogs.map((dog) => (dog.checked = false))
  }

  const formatDate = (date) => {
    let formattedDate = moment(date).format('LL')
    if (formattedDate === 'Invalid date') {
      return 'N/A'
    } else {
      return formattedDate
    }
  }

  return (
    <DogListStyles>
      <OverviewCountStyles>
        {Object.keys(count).map((i, index) => (
          <OverviewCount key={index} title={i} value={count[i]} />
        ))}
      </OverviewCountStyles>
      <section className="search-filter-container">
        {selected.length > 0 && !modalIsOpen && (
          <UpdateBar onClick={(type) => setUpdateType(type)} />
        )}

        <label className="search-box " aria-label="search">
          <input
            className="search-dog dog-list-actions"
            type="text"
            name="dogSearch"
            value={dogSearch}
            onChange={handleChange}
            placeholder="Search by name..."
          />
        </label>
        <div className="filters-container">
          <DropDown
            label="Filter"
            list={['Current', 'Adopted', 'Archived', 'Fostered', 'None']}
            onClick={(value) => setFilter(value)}
          />
          <DropDown
            label="Sort"
            list={['A-Z', 'Z-A']}
            onClick={(sortType) => handleSort(sortType)}
          />
        </div>
      </section>

      <section className="dog-list-container">
        <ul className="dogs-list">
          {view === '' && !error
            ? filteredDogs.map((d) => {
                return (
                  <DogListItem
                    key={d.id}
                    onChange={(id) => updateSelected(id)}
                    checked={d.checked}
                    info={d}
                    formatDate={(date) => formatDate(date)}
                  />
                )
              })
            : filteredDogs.map((d) => {
                return (
                  d.dog_status === view && (
                    <DogListItem
                      key={d.id}
                      onChange={(id) => updateSelected(id)}
                      checked={d.checked}
                      info={d}
                      formatDate={(date) => formatDate(date)}
                    >
                      {/* <DogItemImage img={d.profile_img} name={d.dog_name} /> */}
                    </DogListItem>
                  )
                )
              })}
        </ul>
      </section>

      <button className="add-a-dog-button add-dog">
        <Link className="add-dog-link" to={'/add-new-dog'}>
          Add Dog
        </Link>
      </button>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(!modalIsOpen)}
        showCloseIcon={false}
        center
      >
        {updateType === 'status' ? (
          <UpdateStatusForm
            selectedDogs={selected}
            setModal={() => setModalIsOpen()}
            updateDogs={() => getDogs()}
            setChecked={() => setChecked()}
            resetSelected={setSelected}
          />
        ) : updateType === 'delete' ? (
          <DeleteDogForm
            selectedDogs={selected}
            setModal={() => setModalIsOpen()}
            updateDogs={() => getDogs()}
            setChecked={() => setChecked()}
            resetSelected={setSelected}
          />
        ) : (
          <BatchShotForm
            selectedDogs={selected}
            setModal={() => setModalIsOpen()}
            updateDogs={() => getDogs()}
            resetSelected={setSelected}
            singleShotUpdate={true}
          />
        )}
      </Modal>
    </DogListStyles>
  )
}

const DogListStyles = styled.main`
  padding-top: 60px;
  width: 100%;

  .add-a-dog-button {
    background-color: #009fb7;
    border: 2px solid black;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    font-size: 1em;
    position: fixed;
    bottom: 0px;
    right: 0px;
    margin: 20px;
  }

  .add-dog-link:hover {
    color: white;
    font-weight: bolder;
  }

  .add-a-dog-button:hover {
    cursor: pointer;
  }

  .add-a-dog-button a {
    color: white;
  }

  .dogs-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .dog-list-container {
    padding: 5px 5% 10px 5%;
  }

  .dog-list-actions {
    border: 1px solid black;
    background-color: #fcfcfc;
    padding: 10px 30px;
  }

  .search-dog {
    padding-left: 10px;
    height: 40px;
    display: block;
    margin: 0px auto 0px auto;
    width: 90%;
    font-size: 0.8em;
  }

  .filter-links {
    display: inline-block;
  }

  .filter-links li {
    display: inline-block;
    list-style: none;
    margin: 10px;
  }

  .search-filter-container {
    width: 100%;
    height: 100px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
  }

  .filters-container {
    display: flex;
    /* border: 1px solid black; */
    padding: 10px;
    justify-content: space-around;
    height: 150px;
    font-size: 0.8em;
  }

  .drop-down {
    flex-grow: 1;
    margin: 20px;
  }

  @media (min-width: 500px) {
    .search-filter-container {
      flex-direction: row;
      justify-content: space-around;
    }

    .filters-container {
      padding: 0px;
    }
  }

  @media (min-width: 768px) {
    .search-dog {
      width: 30vw;
    }
  }
`

const OverviewCountStyles = styled.section`
  width: 100%;
  padding: 10px 7%;
  display: flex;
  justify-content: flex-start;

  .container {
    padding: 10px;
    font-weight: bold;
  }

  .container-title {
    font-weight: 500;
  }
`

export default DogList
