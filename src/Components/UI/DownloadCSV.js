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
      i.shotsCompleted.forEach((shot) => {
        i[shot.shot_name] = shot.shot_date
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
    <div>
      <CSVLink data={dogs} headers={headerList}>
        Download CSV File
      </CSVLink>
      ;
    </div>
  )
}

export default DownloadCSV
