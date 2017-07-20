import React from 'react'
import { Modal, Button ,Table,Card,Row,Col,Form,Collapse,Carousel} from 'antd';
import styles from './RiverDetail.less'

const FormItem = Form.Item;
const Panel = Collapse.Panel
const RiverDetail=({visible,maskClosable,onOk,onCancel,item,columns})=>{
	console.log(item)
  console.log(columns)
	const modalProps = {visible,maskClosable,onOk,onCancel}
	const showModal = () => {

	}
	const handleOk = (e) => {

	}
	const handleCancel = (e) => {

	}
  const formItemLayout={
    labelCol:{span:12},
    wrapperCol:{span:12},
    style:{
      "fontSize":"16px",
      "marginBottom":"5px"
    },
  }
  const textInfo = [];
  for(let i = 0;i<columns.length;i++){
    let title = columns[i].title
    let dataIndex = columns[i].dataIndex
    if(item[dataIndex]){
      textInfo.push(
          <Col span={12} key={Math.random(0,1)}>
            <FormItem {...formItemLayout} label={`${title}:`}>{item[dataIndex]}</FormItem>
          </Col>
        )
    }
  }
  const picInfo = [];
  const picUrl = [
    "http://tse2.mm.bing.net/th?id=OIP.fkXTL7VA58-qGHL9Y76ctAD5D6&pid=15.1",
    "http://tse3.mm.bing.net/th?id=OIP.I7rLEI8ZFdJMap0t0cOuBQEsEh&pid=15.1",
    "http://a4.att.hudong.com/16/26/19300131134329132102266261316_950.jpg"
  ]
  for(let i = 0;i<picUrl.length;i++){
    picInfo.push(
        <div  key={picUrl[i]}>
          <img src={picUrl[i]} alt="" style={{margin:"0 auto"}}/>
        </div>
      )
  }
    return (
      <div>
        <Modal
          title={`${item['he_liu_ming_cheng']}详细信息`}
          {...modalProps}
        >
          
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header="属性信息" key="textInfo">
              <Row>
                {textInfo}
              </Row>
            </Panel>
            <Panel header="照片及视频" key="picInfo">
              <Carousel autoplay arrows={true} className={styles.carousel} dotsClass={styles.dots}>
                {picInfo}
              </Carousel>
            </Panel>
            <Panel header="空间位置" key="spaceInfo">
              
            </Panel>
          </Collapse>
        </Modal>
      </div>
    );
}

export default RiverDetail;
