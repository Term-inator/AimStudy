import axios from '@/utils/axios.js'

/**
 * listCampusLocation
 */
export function listCampusLocation(){
  return axios({
    url: '/api/admin/campus-location',
    method: 'get'
  })
}

/**
 * addCampusLocation
 */
export function addCampusLocation(data){
  return axios({
    url: '/api/admin/campus-location',
    method: 'post',
    data: data
  })
}

/**
 * updateCampusLocation
 */
export function updateCampusLocation(data){
  return axios({
    url: '/api/admin/campus-location',
    method: 'put',
    data: data
  })
}

/**
 * deleteCampusLocation
 */
export function deleteCampusLocation(data){
  return axios({
    url: '/api/admin/campus-location',
    method: 'delete',
    data: data
  })
}
