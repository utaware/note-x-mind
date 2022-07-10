import mitt from 'mitt'

type Events = {
  toggleTotalModalVisible: boolean,
  toggleAddModalVisible: boolean,
  getBillList: void
}

const emitter = mitt<Events>()

export default emitter
