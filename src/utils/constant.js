import { listDepartment } from '@/api/department-controller'

const queryDepartment = () => {
  console.log(111)
  return new Promise((resolve, reject) => {
    listDepartment({ size: 10000 }).then(response => {
      let majors =  response.data.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
      sessionStorage.setItem('majors', JSON.stringify(majors))
      console.log(majors)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export async function queryConstant() {
  await queryDepartment()
}