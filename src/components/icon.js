import { createVNode } from 'vue'
import * as $Icon from '@ant-design/icons-vue'

export const Icon = (props) => {
  const {icon} = props
  console.log(props)
  return createVNode($Icon[icon])
};
