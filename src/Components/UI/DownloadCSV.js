import React, { useState, useCallback, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { CSVLink } from 'react-csv'

import DogsApiService from '../../services/api-service'
import TokenService from '../../services/token-service'

const DownloadCSV = (props) => {
  const [dogs, setDogs] = useState('')
  const [headerList, setHeaderList] = useState([])
  const shelterId = TokenService.getShelterToken()

  const getList = useCallback(async () => {
    const list = await DogsApiService.getDogsList(shelterId)
    list.forEach((i) => {
      i.arrival_date = !i.arrival_date
        ? ''
        : new Date(i.arrival_date).toLocaleDateString('en-UK')
      i.age = !i.age ? '' : new Date(i.age).toLocaleDateString('en-UK')
      i.microchip_date = !i.microchip_date
        ? ''
        : new Date(i.microchip_date).toLocaleDateString('en-UK')
      i.shotsCompleted.forEach((shot) => {
        const dateItem = !shot.shot_date
          ? ''
          : new Date(shot.shot_date).toLocaleDateString('en-UK')
        i[shot.shot_name] = dateItem
      })
      delete i.shotsCompleted
    })

    const headers = []

    list.forEach((i) =>
      Object.keys(i).map((k) => !headers.includes(k) && headers.push(k))
    )

    const headerList = headers.map((i) => {
      const newObj = {
        label: i,
        key: i,
      }
      return newObj
    })

    setHeaderList(headerList)
    setDogs(list)
  }, [shelterId])

  useLayoutEffect(() => {
    getList()
  }, [getList])

  return (
    <DownloadStyles>
      <CSVLink data={dogs} headers={headerList}>
        Download CSV File
      </CSVLink>
    </DownloadStyles>
  )
}

const DownloadStyles = styled.div`
  display: inline;
  position: relative;
  float: right;
  font-size: 10px;
  bottom: 20px;
  right: 10px;
  border: 1px solid black;
  padding: 5px;
`

export default DownloadCSV
